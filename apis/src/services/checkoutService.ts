import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/errors.js";
import type { CheckoutBody } from "@repo/shared";
import type { Server as SocketServer } from "socket.io";

type TransactionClient = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

/**
 * Checkout: create order from cart, decrement stock (optimistic locking), clear cart.
 * Optimistic locking: Product.version is incremented on update; if updateMany
 * affects 0 rows (another checkout took the stock), we rollback and return 409.
 */
export async function checkout(
  userId: string,
  body: CheckoutBody,
  io?: SocketServer
) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });
  if (!cart || cart.items.length === 0) throw new AppError(400, "Cart is empty");

  const order = await prisma.$transaction(async (tx: TransactionClient) => {
    for (const item of cart.items) {
      const p = item.product;
      const res = await tx.product.updateMany({
        where: { id: p.id, version: p.version },
        data: { stock: { decrement: item.quantity }, version: { increment: 1 } },
      });
      if (res.count === 0) throw new AppError(409, "Insufficient stock or concurrent update; please retry");
    }

    const order = await tx.order.create({
      data: {
        userId,
        status: "placed",
        shippingAddress: body.shippingAddress,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone ?? null,
        items: {
          create: cart.items.map((item: (typeof cart.items)[number]) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAt: item.product.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
    return order;
  });

  if (io) {
    io.to(`user:${userId}`).emit("order.created", order);
  }
  return order;
}

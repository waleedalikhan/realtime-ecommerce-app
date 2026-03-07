import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/errors.js";
import type {
  AdminCreateProductBody,
  AdminUpdateProductBody,
  AdminOrderStatusBody,
} from "@repo/shared";
import type { Server as SocketServer } from "socket.io";
import { updateOrderStatus } from "./orderService.js";

/**
 * Create product (admin).
 */
export async function createProduct(body: AdminCreateProductBody) {
  return prisma.product.create({
    data: {
      name: body.name,
      description: body.description ?? null,
      price: body.price,
      category: body.category,
      stock: body.stock ?? 0,
    },
  });
}

/**
 * Update product (admin); partial fields.
 */
export async function updateProduct(id: string, body: AdminUpdateProductBody) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw new AppError(404, "Product not found");

  return prisma.product.update({
    where: { id },
    data: {
      ...(body.name != null && { name: body.name }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.price != null && { price: body.price }),
      ...(body.category != null && { category: body.category }),
      ...(body.stock != null && { stock: body.stock }),
    },
  });
}

/**
 * Force order status update (admin); emits order.status_updated.
 */
export async function setOrderStatus(
  orderId: string,
  body: AdminOrderStatusBody,
  io?: SocketServer
) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new AppError(404, "Order not found");
  return updateOrderStatus(orderId, body.status, io);
}

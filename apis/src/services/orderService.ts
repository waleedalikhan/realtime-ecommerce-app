import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/errors.js";
import type { OrderStatus } from "@repo/shared";
import type { TokenPayload } from "../utils/jwt.js";
import type { Server as SocketServer } from "socket.io";

/**
 * List orders for user (or all for admin if needed; here we filter by userId only).
 */
export async function listOrders(user: TokenPayload) {
  const orders = await prisma.order.findMany({
    where: { userId: user.sub },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  return orders;
}

/**
 * Get one order by id; must belong to user (or admin can see any).
 */
export async function getOrderById(orderId: string, user: TokenPayload) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  });
  if (!order) throw new AppError(404, "Order not found");
  if (order.userId !== user.sub && user.role !== "admin")
    throw new AppError(403, "Forbidden");
  return order;
}

/**
 * Update order status (admin). Emit order.status_updated to user room.
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  io?: SocketServer
) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: { items: { include: { product: true } } },
  });
  if (io) {
    io.to(`user:${order.userId}`).emit("order.status_updated", {
      orderId: order.id,
      status: order.status,
      order,
    });
  }
  return order;
}

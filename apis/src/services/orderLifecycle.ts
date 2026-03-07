import { prisma } from "../lib/prisma.js";
import type { Server as SocketServer } from "socket.io";
import type { OrderStatus } from "@repo/shared";

const STATUS_FLOW: OrderStatus[] = ["placed", "paid", "packed", "shipped", "delivered"];
const DELAY_MS = 5000; // 5s between steps for demo

/**
 * Simulate order lifecycle: placed -> paid -> packed -> shipped -> delivered.
 * In production this would be a job queue; here we use setTimeout for demo.
 */
export function startOrderLifecycle(orderId: string, io: SocketServer): void {
  let stepIndex = 0;

  function next() {
    stepIndex++;
    if (stepIndex >= STATUS_FLOW.length) return;
    const nextStatus = STATUS_FLOW[stepIndex];
    if (nextStatus === undefined) return;
    setTimeout(async () => {
      try {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: nextStatus },
        });
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { items: { include: { product: true } } },
        });
        if (order) {
          io.to(`user:${order.userId}`).emit("order.status_updated", {
            orderId: order.id,
            status: order.status,
            order,
          });
        }
        next();
      } catch (e) {
        console.error("Lifecycle step failed", e);
      }
    }, DELAY_MS);
  }

  next();
}

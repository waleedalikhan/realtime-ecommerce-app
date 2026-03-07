import type { Request, Response, NextFunction } from "express";
import { checkout } from "../services/checkoutService.js";
import { startOrderLifecycle } from "../services/orderLifecycle.js";
import type { TokenPayload } from "../utils/jwt.js";
import type { Server as SocketServer } from "socket.io";
import { AppError } from "../utils/errors.js";

function getUserId(req: Request): string {
  const user = (req as Request & { user?: TokenPayload }).user;
  if (!user) throw new AppError(401, "Unauthorized");
  return user.sub;
}

/** POST /checkout — create order from cart, emit order.created, start lifecycle simulation */
export async function checkoutHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const body = req.body as { shippingAddress: string; contactEmail: string; contactPhone?: string };
    const io = (req as Request & { app?: { get?: (k: string) => SocketServer } }).app?.get?.("io") as SocketServer | undefined;
    const order = await checkout(getUserId(req), body, io);
    if (io) startOrderLifecycle(order.id, io);
    res.status(201).json(order);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
}

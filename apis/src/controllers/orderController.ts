import type { Request, Response, NextFunction } from "express";
import { listOrders, getOrderById } from "../services/orderService.js";
import type { TokenPayload } from "../utils/jwt.js";
import { AppError } from "../utils/errors.js";

function getUser(req: Request): TokenPayload {
  const user = (req as Request & { user?: TokenPayload }).user;
  if (!user) throw new AppError(401, "Unauthorized");
  return user;
}

/** GET /orders */
export async function listHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const orders = await listOrders(getUser(req));
    res.json(orders);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
}

/** GET /orders/:id */
export async function getByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const order = await getOrderById(id, getUser(req));
    res.json(order);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
}

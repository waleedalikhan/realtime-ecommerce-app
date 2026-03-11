import type { Request, Response, NextFunction } from "express";
import {
  createProduct,
  updateProduct,
  setOrderStatus,
} from "../services/adminService.js";
import type { Server as SocketServer } from "socket.io";

const getIo = (req: Request): SocketServer | undefined =>
  (req as Request & { app?: { get?: (k: string) => SocketServer } }).app?.get?.(
    "io"
  ) as SocketServer | undefined;

/** POST /admin/products */
export const createProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await createProduct(
      req.body as Parameters<typeof createProduct>[0]
    );
    res.status(201).json(product);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
};

/** PATCH /admin/products/:id */
export const updateProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const product = await updateProduct(
      id,
      req.body as Parameters<typeof updateProduct>[1]
    );
    res.json(product);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
};

/** PATCH /admin/orders/:id/status — force status, emit order.status_updated */
export const updateOrderStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const body = req.body as {
      status: "placed" | "paid" | "packed" | "shipped" | "delivered";
    };
    const order = await setOrderStatus(id, body, getIo(req));
    res.json(order);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
};

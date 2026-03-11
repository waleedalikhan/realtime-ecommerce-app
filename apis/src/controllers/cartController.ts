import type { Request, Response, NextFunction } from "express";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "../services/cartService.js";
import type { TokenPayload } from "../utils/jwt.js";
import { AppError } from "../utils/errors.js";

const getUserId = (req: Request): string => {
  const user = (req as Request & { user?: TokenPayload }).user;
  if (!user) throw new AppError(401, "Unauthorized");
  return user.sub;
};

/** GET /cart */
export const getHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cart = await getCart(getUserId(req));
    res.json(cart);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
};

/** POST /cart/items */
export const addItemHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = req.body as { productId: string; quantity: number };
    const cart = await addCartItem(getUserId(req), body);
    res.status(201).json(cart);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
};

/** PATCH /cart/items/:itemId */
export const updateItemHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { itemId } = req.params as { itemId: string };
    const body = req.body as { quantity: number };
    const cart = await updateCartItem(getUserId(req), itemId, body);
    res.json(cart);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
};

/** DELETE /cart/items/:itemId */
export const removeItemHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { itemId } = req.params as { itemId: string };
    const cart = await removeCartItem(getUserId(req), itemId);
    res.json(cart);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
};

import type { Request, Response, NextFunction } from "express";
import { listProducts, getProductById } from "../services/productService.js";
import { AppError } from "../utils/errors.js";

/** GET /products — list with pagination, category, sort */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const query = req.query as unknown as Parameters<typeof listProducts>[0];
    const result = await listProducts(query);
    res.json(result);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
}

/** GET /products/:id — single product */
export async function getByIdHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const product = await getProductById(id);
    if (!product) {
      next(new AppError(404, "Product not found"));
      return;
    }
    res.json(product);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(e);
  }
}

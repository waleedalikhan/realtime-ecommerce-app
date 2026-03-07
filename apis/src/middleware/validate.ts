import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";
import { AppError } from "../utils/errors.js";

type Source = "body" | "query" | "params";

/**
 * Validate req[source] with Zod schema; attach result to req[source] and next().
 * On error, next(AppError(400)) with message and optional details.
 */
export function validate(schema: z.ZodType, source: Source = "body") {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join("; ");
      next(new AppError(400, message, result.error.flatten()));
      return;
    }
    (req as unknown as Record<string, unknown>)[source] = result.data;
    next();
  };
}

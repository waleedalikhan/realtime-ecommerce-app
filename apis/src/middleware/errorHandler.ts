import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

/** Global error handler: map AppError to JSON { statusCode, message, details? }; log and 500 for unknown. */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      ...(err.details !== undefined && { details: err.details }),
    });
    return;
  }
  logger.error({ err }, "Unhandled error");
  res.status(500).json({
    statusCode: 500,
    message: "Internal server error",
  });
};

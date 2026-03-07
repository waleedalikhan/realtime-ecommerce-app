import type { Request, Response, NextFunction } from "express";
import { verifyToken, type TokenPayload } from "../utils/jwt.js";
import { AppError } from "../utils/errors.js";
import { logger } from "../utils/logger.js";

const ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET ?? "";
if (!ACCESS_SECRET) throw new Error("JWT_ACCESS_SECRET is required");

/** Attach req.user from Bearer token. Use on all protected routes. */
export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    next(new AppError(401, "Missing or invalid Authorization header"));
    return;
  }
  const token = authHeader.slice(7);
  try {
    const payload = verifyToken<TokenPayload>(token, ACCESS_SECRET);
    (req as Request & { user: TokenPayload }).user = payload;
    next();
  } catch (e) {
    logger.debug({ err: e }, "JWT verify failed");
    next(new AppError(401, "Invalid or expired token"));
  }
}

/** Require req.user.role === "admin". Use after authMiddleware on admin routes. */
export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
  const user = (req as Request & { user?: TokenPayload }).user;
  if (!user || user.role !== "admin") {
    next(new AppError(403, "Admin access required"));
    return;
  }
  next();
}

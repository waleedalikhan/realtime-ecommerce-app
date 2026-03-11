import type { Request, Response, NextFunction } from "express";
import { register, login, refresh } from "../services/authService.js";
import type { RegisterBody, LoginBody } from "@repo/shared";
import { AppError } from "../utils/errors.js";

/** POST /auth/register — body validated by middleware; register and return tokens */
export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await register(req.body as RegisterBody);
    res.status(201).json(result);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(new AppError(400, "Invalid body"));
  }
};

/** POST /auth/login — body validated by middleware; login and return tokens */
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await login(req.body as LoginBody);
    res.json(result);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(new AppError(400, "Invalid body"));
  }
};

/** POST /auth/refresh — body.refreshToken or cookie; return new tokens */
export const refreshHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = req.body as { refreshToken?: string };
    const token =
      body?.refreshToken ??
      (req.cookies as { refreshToken?: string })?.refreshToken;
    if (!token) {
      next(new AppError(401, "Refresh token required"));
      return;
    }
    const result = await refresh(token);
    res.json(result);
  } catch (e) {
    if (e instanceof Error && "statusCode" in e) return next(e);
    next(new AppError(401, "Invalid refresh token"));
  }
};

/** GET /auth/me — return current user (used by app to restore session) */
export const meHandler = async (req: Request, res: Response): Promise<void> => {
  const user = (
    req as Request & { user: { sub: string; email: string; role: string } }
  ).user;
  res.json({ id: user.sub, email: user.email, name: null, role: user.role });
};

import { prisma } from "../lib/prisma.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyToken,
} from "../utils/jwt.js";
import { AppError } from "../utils/errors.js";
import type { RegisterBody, LoginBody } from "@repo/shared";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXP = process.env.JWT_ACCESS_EXPIRES_IN ?? "15m";
const REFRESH_EXP = process.env.JWT_REFRESH_EXPIRES_IN ?? "7d";

export type AuthResult = {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name: string | null; role: string };
};

/**
 * Register: hash password, create user, return tokens.
 */
export const register = async (data: RegisterBody): Promise<AuthResult> => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) throw new AppError(409, "Email already registered");

  const hashed = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashed,
      name: data.name ?? null,
      role: "user",
    },
  });

  const accessToken = signAccessToken(
    { sub: user.id, email: user.email, role: user.role },
    ACCESS_SECRET,
    ACCESS_EXP
  );
  const refreshToken = signRefreshToken(
    { sub: user.id },
    REFRESH_SECRET,
    REFRESH_EXP
  );
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  };
};

/**
 * Login: verify password, return tokens.
 */
export const login = async (data: LoginBody): Promise<AuthResult> => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new AppError(401, "Invalid email or password");

  const ok = await verifyPassword(data.password, user.password);
  if (!ok) throw new AppError(401, "Invalid email or password");

  const accessToken = signAccessToken(
    { sub: user.id, email: user.email, role: user.role },
    ACCESS_SECRET,
    ACCESS_EXP
  );
  const refreshToken = signRefreshToken(
    { sub: user.id },
    REFRESH_SECRET,
    REFRESH_EXP
  );
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  };
};

/**
 * Refresh: validate refresh token from DB, issue new access (and optionally rotate refresh).
 */
export const refresh = async (
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
  user: AuthResult["user"];
}> => {
  verifyToken<{ sub: string }>(refreshToken, REFRESH_SECRET);
  const stored = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  });
  if (!stored || stored.expiresAt < new Date()) {
    if (stored)
      await prisma.refreshToken
        .delete({ where: { id: stored.id } })
        .catch(() => {});
    throw new AppError(401, "Invalid or expired refresh token");
  }

  const user = stored.user;
  const accessToken = signAccessToken(
    { sub: user.id, email: user.email, role: user.role },
    ACCESS_SECRET,
    ACCESS_EXP
  );
  const newRefresh = signRefreshToken(
    { sub: user.id },
    REFRESH_SECRET,
    REFRESH_EXP
  );
  await prisma.refreshToken.delete({ where: { id: stored.id } });
  await prisma.refreshToken.create({
    data: {
      token: newRefresh,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    accessToken,
    refreshToken: newRefresh,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  };
};

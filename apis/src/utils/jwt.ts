import jwt from "jsonwebtoken";

export type TokenPayload = {
  sub: string;   // userId
  email: string;
  role: string;   // "user" | "admin"
  iat?: number;
  exp?: number;
};

/**
 * Sign an access token (short-lived). Used after login/register/refresh.
 */
export function signAccessToken(payload: Omit<TokenPayload, "iat" | "exp">, secret: string, expiresIn: string): string {
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}

/**
 * Sign a refresh token (long-lived). Stored in DB or sent in cookie.
 */
export function signRefreshToken(payload: { sub: string }, secret: string, expiresIn: string): string {
  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
}

/**
 * Verify access or refresh token; throws if invalid/expired.
 */
export function verifyToken<T = TokenPayload>(token: string, secret: string): T {
  return jwt.verify(token, secret) as T;
}

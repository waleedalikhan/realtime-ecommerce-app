import { z } from "zod";

/** Used by POST /auth/register and web/app register form */
export const registerBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1).optional(),
});

/** Used by POST /auth/login and web/app login form */
export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(0, 'Password is required')
});

/** Optional: refresh token in body (e.g. mobile); web may use httpOnly cookie */
export const refreshBodySchema = z.object({
  refreshToken: z.string().optional(),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
export type RefreshBody = z.infer<typeof refreshBodySchema>;

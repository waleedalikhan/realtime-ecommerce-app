import { z } from "zod";
import { orderStatusSchema } from "./orders.js";

/** Used by POST /admin/products - create product */
export const adminCreateProductBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.string().min(1),
  stock: z.number().int().min(0).default(0),
});

/** Used by PATCH /admin/products/:id - partial update */
export const adminUpdateProductBodySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  category: z.string().min(1).optional(),
  stock: z.number().int().min(0).optional(),
});

/** Path param for PATCH /admin/products/:id and PATCH /admin/orders/:id/status */
export const adminIdParamSchema = z.object({
  id: z.string().uuid(),
});

/** Used by PATCH /admin/orders/:id/status */
export const adminOrderStatusBodySchema = z.object({
  status: orderStatusSchema,
});

export type AdminCreateProductBody = z.infer<typeof adminCreateProductBodySchema>;
export type AdminUpdateProductBody = z.infer<typeof adminUpdateProductBodySchema>;
export type AdminIdParam = z.infer<typeof adminIdParamSchema>;
export type AdminOrderStatusBody = z.infer<typeof adminOrderStatusBodySchema>;

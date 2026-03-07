import { z } from "zod";

/** Used by GET /products query params: pagination, filter, sort */
export const productsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  category: z.string().optional(),
  sort: z.enum(["price_asc", "price_desc"]).optional(),
});

/** Used by GET /products/:id - path param */
export const productIdParamSchema = z.object({
  id: z.string().uuid(),
});

export type ProductsQuery = z.infer<typeof productsQuerySchema>;
export type ProductIdParam = z.infer<typeof productIdParamSchema>;

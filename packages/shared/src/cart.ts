import { z } from "zod";

/** Used by POST /cart/items - add item with quantity */
export const addCartItemBodySchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1),
});

/** Used by PATCH /cart/items/:itemId - update quantity only */
export const updateCartItemBodySchema = z.object({
  quantity: z.number().int().min(0),
});

/** Path param for PATCH/DELETE /cart/items/:itemId */
export const cartItemIdParamSchema = z.object({
  itemId: z.string().uuid(),
});

export type AddCartItemBody = z.infer<typeof addCartItemBodySchema>;
export type UpdateCartItemBody = z.infer<typeof updateCartItemBodySchema>;
export type CartItemIdParam = z.infer<typeof cartItemIdParamSchema>;

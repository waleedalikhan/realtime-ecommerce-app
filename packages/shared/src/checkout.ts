import { z } from "zod";

/** Used by POST /checkout - address and contact for order */
export const checkoutBodySchema = z.object({
  shippingAddress: z.string().min(1, "Shipping address is required"),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(1, "Contact phone is required").optional(),
});

export type CheckoutBody = z.infer<typeof checkoutBodySchema>;

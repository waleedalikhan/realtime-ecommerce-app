import { z } from "zod";
import { ORDER_STATUSES } from "./orderStatus.js"; // Order lifecycle enum for validation

/** Path param for GET /orders/:id */
export const orderIdParamSchema = z.object({
  id: z.string().uuid(),
});

export type OrderIdParam = z.infer<typeof orderIdParamSchema>;

/** Schema for admin order status update (status enum). Type OrderStatus from orderStatus.ts */
export const orderStatusSchema = z.enum(ORDER_STATUSES);

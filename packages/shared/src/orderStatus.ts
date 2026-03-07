/**
 * Order lifecycle status. Used by GET/PATCH orders and Socket.io events.
 * Flow: placed -> paid -> packed -> shipped -> delivered
 */
export const ORDER_STATUSES = [
  "placed",
  "paid",
  "packed",
  "shipped",
  "delivered",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

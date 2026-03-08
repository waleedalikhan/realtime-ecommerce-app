/** TanStack Query keys for cache invalidation */
export const queryKeys = {
  products: (
    params?: Record<string, unknown>
  ): readonly [string, ...unknown[]] =>
    params ? ["products", params] : ["products"],
  product: (id: string) => ["products", id] as const,
  cart: () => ["cart"] as const,
  orders: () => ["orders"] as const,
  order: (id: string) => ["orders", id] as const,
};

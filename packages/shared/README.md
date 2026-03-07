# @repo/shared

Shared Zod schemas and TypeScript types for the realtime commerce monorepo.

## Purpose

- **Single contract**: APIs validate with the same schemas the web and mobile apps use for forms and request bodies, so we never drift between client and server.
- **No runtime dependency** on Express or React; only `zod` and TypeScript. Keeps the package small for mobile.

## Usage

- **apis**: Import schemas and call `.parse()` or `.safeParse()` on `req.body`, `req.query`, `req.params`.
- **web / app**: Import schemas for React Hook Form resolver (`zodResolver(schema)`) and for typed API client payloads.

## Exports

| Export        | Use                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------- |
| `auth`        | `registerBodySchema`, `loginBodySchema`, `refreshBodySchema` — POST /auth/\*                  |
| `products`    | `productsQuerySchema`, `productIdParamSchema` — GET /products, GET /products/:id              |
| `cart`        | `addCartItemBodySchema`, `updateCartItemBodySchema`, `cartItemIdParamSchema` — cart endpoints |
| `checkout`    | `checkoutBodySchema` — POST /checkout                                                         |
| `orders`      | `orderIdParamSchema`, `orderStatusSchema` — GET /orders/:id, admin status                     |
| `orderStatus` | `ORDER_STATUSES`, `OrderStatus` — lifecycle enum                                              |
| `admin`       | Admin product create/update and order status schemas                                          |

Build before use: from repo root, `pnpm --filter shared build` (or run as part of `pnpm build`).

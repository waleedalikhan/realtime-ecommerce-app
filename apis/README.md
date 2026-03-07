# apis — Express + TypeScript backend

REST API and Socket.io for realtime commerce. Uses Prisma (PostgreSQL), JWT auth, shared Zod schemas from `@repo/shared`.

## Architecture

- **Routes** → **Controllers** → **Services** → Prisma / Socket.io
- Auth: `authMiddleware` (JWT), `requireAdmin` for admin routes
- Checkout: Prisma transaction + optimistic locking (Product.version)
- Realtime: Socket.io, room `user:${userId}`, events `order.created`, `order.status_updated`

## Setup

- `pnpm install` (from repo root)
- Copy `.env.example` to `.env`, set `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
- `pnpm db:migrate` then `pnpm db:seed` (from root) or `pnpm exec prisma migrate deploy && pnpm exec prisma db seed` from apis
- `pnpm dev` (from root) or `pnpm exec tsx watch src/index.ts` from apis

## Tests

- **Unit**: `pnpm test` runs Vitest. Requires `prisma generate` to be run first (for integration test module load).
- **Integration** (checkout flow): Skipped unless `DATABASE_URL` is set. With a test DB, the full flow (register → cart → checkout → get order) runs.

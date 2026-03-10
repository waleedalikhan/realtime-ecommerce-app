# Backend API Documentation

This folder contains **beginner-friendly** documentation for the `apis` backend. The backend is a **Node.js + Express** server that powers a small e-commerce API with auth, cart, checkout, orders, and real-time updates via Socket.io.

---

## How to read these docs

- **Assume you're new to backend development.** Concepts are explained from the ground up.
- Each doc focuses on **one major part** of the codebase.
- **Mermaid diagrams** are used to show flow and structure (you can view them in GitHub, VS Code with a Mermaid extension, or any Markdown viewer that supports Mermaid).

---

## Document index

| Doc | Topic | What you'll learn |
|-----|--------|--------------------|
| [01-overview.md](./01-overview.md) | **Overview & architecture** | High-level structure, request flow, folder layout |
| [02-entry-and-app.md](./02-entry-and-app.md) | **Entry point & Express app** | How the server starts, env loading, route mounting |
| [03-database.md](./03-database.md) | **Database (Prisma)** | Data models, relations, migrations, seed |
| [04-auth.md](./04-auth.md) | **Authentication** | Register, login, JWT, refresh tokens |
| [05-routes-controllers-services.md](./05-routes-controllers-services.md) | **Routes, controllers, services** | How a request becomes a response |
| [06-middleware.md](./06-middleware.md) | **Middleware** | Auth, validation, error handling |
| [07-checkout-and-orders.md](./07-checkout-and-orders.md) | **Checkout & orders** | Cart → order, optimistic locking, order lifecycle |
| [08-realtime.md](./08-realtime.md) | **Real-time (Socket.io)** | WebSockets, rooms, order events |
| [09-utilities-and-lib.md](./09-utilities-and-lib.md) | **Utilities & lib** | JWT, hashing, errors, logger, Prisma client |

---

## Quick start (for reference)

From the **repo root**:

```bash
pnpm install
pnpm db:migrate   # or from apis: pnpm db:migrate
pnpm db:seed      # optional: demo user + products
pnpm dev:apis     # starts the API server (default port 4000)
```

- **Health:** `GET http://localhost:4000/health`
- **API docs (Swagger):** `http://localhost:4000/api-docs`

---

## Tech stack summary

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express |
| Database | PostgreSQL via Prisma ORM |
| Auth | JWT (access + refresh), bcrypt for passwords |
| Validation | Zod (schemas live in `@repo/shared`) |
| Real-time | Socket.io |
| Logging | Pino |

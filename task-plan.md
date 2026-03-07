# Task Round: Build a “Realtime Commerce Checkout + Order Tracking” Slice

**Backend**: Express (TypeScript)\
**_Web_**: Next.js 15\
**_Mobile_**: React Native (Expo ok)\
**_Time allowed_**: Up to 7 days\
**_Tools allowed_**: Any, but you must explain your code line-by-line.

## Product Goal

Build a small commerce experience that supports:

- Product browsing
- Cart + checkout
- Order creation
- Realtime order status updates (web + mobile)

Think “mini Shopify flow” but scoped to 4 days.

## 1) Backend — Express + TypeScript (Required)

### Core Tech Expectations

- Express in TypeScript
- Modular routing (routes/controllers/services)
- Input validation (Zod or Joi)
- Auth middleware (JWT)
- Swagger or OpenAPI (can be generated from spec file)

### Data Layer (Pick one)

- **_PostgreSQL_** (Prisma recommended) OR **_MongoDB_** (Mongoose)
- Provide seed script (few products, one demo user)

### REST APIs (Required)

#### Auth

- POST /auth/register
- POST /auth/login
- JWT required for cart/checkout/order endpoints

#### Catalog

- GET /products (pagination + filter by category + sort by price)
- GET /products/:id

#### Cart

- GET /cart
- POST /cart/items (add item, qty)
- PATCH /cart/items/:itemId (update qty)
- DELETE /cart/items/:itemId

#### Checkout & Orders

- POST /checkout
  - Creates an order from cart
  - Reduces stock (handle concurrency simply; explain approach)
- GET /orders
- GET /orders/:id

### Realtime Requirement (Required)

Implement **_Socket.io_** (or WS) in Express:

- When an order is created, emit order.created
- Order lifecycle simulation:
  - placed -> paid -> packed -> shipped -> delivered
- Emit order.status_updated events to the customer “room”

You can simulate payment & fulfillment with timeouts or a background worker module (in-process is fine). The point is the architecture + events.

### Admin Endpoints (Required)

- POST /admin/products (create)
- PATCH /admin/products/:id (edit)
- PATCH /admin/orders/:id/status (force status update)
- Simple role check (isAdmin claim or hardcoded admin user)

## 2) Web — Next.js 15 App (Required)

**_User-facing flows_**

1. **_Login/Register_**
2. **_Browse products_**
   - Search, filter, sort, pagination
3. **_Product detail_**
4. **_Cart_**
5. **_Checkout_**
   - Address + contact form using React Hook Form + Zod
6. **_Order confirmation_**
7. **_Order tracking_**
   - Live status updates via WebSockets

#### State & Data Requirements

- **_TanStack Query_** for server state (products, cart, orders)
- **_Redux Toolkit_** for one meaningful client state domain, e.g.:
  - cart UI (drawer open, optimistic items),
  - user session token handling strategy,
  - websocket connection + subscriptions,
  - checkout draft state.

#### UI Requirements

- Tailwind CSS
- Reusable components (button, input, select, modal, table/list)
- Accessibility basics: labels, focus, keyboard for cart operations

## 3) Mobile — React Native (Required)

#### Required screens

- Login/Register
- Product list + product detail
- Cart
- Checkout form
- Order list
- Order tracking screen with realtime status updates

#### Requirements

- Uses same backend
- WebSocket integration
- Navigation (React Navigation / Expo Router)
- Clear separation of:
  - API client
  - Socket client
  - Screen components

## 4) Quality & Engineering Requirements (Required)

#### Testing

Backend:

- At least 3 unit tests (services/utilities)
- At least 1 integration/e2e test (supertest) for checkout flow
  Frontend:
- At least 2 tests (React Testing Library) OR explain why you chose not to and what you’d test

#### Observability & Errors

- Consistent error responses (status + message + details)
- Structured logging (pino/winston/morgan acceptable)

#### Security basics

- Password hashing (bcrypt/argon2)
- Auth middleware
- Input validation everywhere

#### Docker & Local Running

- docker-compose.yml to run:
  - database
  - backend
- Clear scripts:
  - pnpm dev for web
  - pnpm mobile (or expo start) for mobile
  - pnpm test across packages (preferred)

## 5) Deliverables

#### Repository Structure (suggested)

- /apps/web (Next.js)
- /apps/mobile (RN)
- /apps/api (Express)
- /packages/shared (optional: shared types/zod schemas)

### README.md (Required)

Include:

- Architecture overview (diagram optional)
- Setup steps
- Env vars (.env.example)
- Demo flow steps
- Key tradeoffs & future improvements
- How realtime is implemented

#### Demo Script (Required)

In your README, add a “Demo Path” section:

1. register/login
2. browse products → add to cart
3. checkout → order created
4. open tracking on web AND mobile
5. see order status update live

## 6) Next Call Interview: Line-by-Line Walkthrough Checklist

Candidate must be ready to walk through:

### Backend

- Express app setup (middleware, routing, error handling)
- Auth flow (JWT issuance + middleware)
- Checkout logic (transaction/stock handling)
- WebSocket event flow (rooms, emits, auth)
- One test: why it exists, what it covers

### Web

- TanStack Query setup + one query/mutation
- RHF+Zod checkout form + validation strategy
- Redux slice usage and why
- WebSocket subscription and UI updates

### Mobile

- API client + auth storage approach
- Checkout form handling
- Socket connection lifecycle (connect, subscribe, cleanup)

## Evaluation Rubric (Same as your earlier structure)

- **_Backend (Express, DB, realtime): 30%_**
- **_Web (Next.js, forms, state): 30%_**
- **_Mobile (RN, sockets): 20%_**
- **_Quality (tests, Docker, docs): 10%_**
- **_Communication (line-by-line clarity): 10%_**

# Realtime Commerce — Mobile (Expo)

React Native app using **Expo** and **Expo Router** (file-based routing). Same backend as web; auth, cart, checkout, and order tracking with realtime updates.

## API client and auth storage

- **src/lib/api.ts**: Base URL from `EXPO_PUBLIC_API_URL`; all requests attach `Authorization: Bearer <token>` (from Redux or **expo-secure-store** via `src/store/authStorage`). On 401, the client tries refresh (POST /auth/refresh) and retries once; otherwise it clears tokens and the app shows login.
- **Auth storage**: Access and refresh tokens are stored in **expo-secure-store** (`src/store/authStorage.ts`) so they are not visible to other apps or to JavaScript in a webview. Auth state is also in Redux (`authSlice`).

## Checkout form

- Checkout screen uses **React Hook Form** with **Zod** (schemas from `@repo/shared`). Same validation as web and API. Controlled inputs with `Controller`; validation errors shown under each field.

## Socket lifecycle

- **src/lib/socket.ts**: Connect with JWT (token passed in); join user room on the server. Expose `getSocket(token)` and `disconnectSocket()`.
- **useOrderUpdates(token)**: When the user is logged in, the hook connects the socket and subscribes to `order.status_updated`. On event it updates Redux and TanStack Query cache so order list and detail screens update in real time. Only disconnect when token is cleared (logout).

## Running

- From repo root: `pnpm mobile` (or `pnpm --filter mobile start`).
- Set `EXPO_PUBLIC_API_URL` to your API base (e.g. `http://localhost:4000` or your machine IP for device).

## Navigation

- **Expo Router**: File-based routes under `app/`. Groups: `(auth)` (login, register), `(mobile)` (home, products, cart, checkout, orders). Stack screens: products/[id], checkout, orders/[id] (tracking).
- Index redirects to `/(mobile)` (main app).

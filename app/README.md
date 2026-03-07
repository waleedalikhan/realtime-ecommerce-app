# Realtime Commerce — Mobile (Expo)

React Native app using **Expo** and **Expo Router** (file-based routing). Same backend as web; auth, cart, checkout, and order tracking with realtime updates.

## API client and auth storage

- **api/client.ts**: Base URL from `EXPO_PUBLIC_API_URL`; all requests attach `Authorization: Bearer <token>` from **expo-secure-store**. On 401, the client tries refresh (POST /auth/refresh) and retries once; otherwise it clears tokens and the app shows login.
- **Auth storage**: Access and refresh tokens are stored in **expo-secure-store** so they are not visible to other apps or to JavaScript in a webview. On launch, we restore the session by calling GET /auth/me with the stored token; if it fails we clear storage.

## Checkout form

- Checkout screen uses **React Hook Form** with **Zod** (schemas from `@repo/shared`). Same validation as web and API. Controlled inputs with `Controller`; validation errors shown under each field.

## Socket lifecycle

- **socket/client.ts**: Connect with JWT from secure storage; join user room on the server. Expose `getSocket(token)` and `disconnectSocket()`.
- **useOrderUpdates(token, onUpdate)**: When the user is logged in, the hook connects the socket and subscribes to `order.status_updated`. On event it calls `onUpdate(payload)`; the order-tracking screen uses this to update local state so status changes appear in real time. On logout or unmount we disconnect and leave the room.

## Running

- From repo root: `pnpm mobile` (or `pnpm --filter app start`).
- Set `EXPO_PUBLIC_API_URL` to your API base (e.g. `http://localhost:4000` or your machine IP for device).

## Navigation

- **Expo Router**: File-based routes under `app/`. Groups: `(auth)` (login, register), `(tabs)` (products, cart, orders). Stack screens: product/[id], checkout, orders/[id] (tracking).
- Index redirects to login if no token, otherwise to (tabs).

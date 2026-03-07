/**
 * @repo/shared — Single source of truth for API contracts and validation.
 * Used by: apis (request validation), web and app (forms + API client types).
 * No Express/React deps; only Zod + TypeScript.
 */

export * from "./auth.js";
export * from "./cart.js";
export * from "./checkout.js";
export * from "./orderStatus.js";
export * from "./orders.js";
export * from "./products.js";
export * from "./admin.js";
// OrderStatus type comes from orderStatus.ts only to avoid duplicate export

import { Router, type IRouter } from "express";
import swaggerUi from "swagger-ui-express";
import type { Request } from "express";

const router: IRouter = Router();

// Minimal OpenAPI spec for demo; full spec can be generated or maintained separately
const spec = {
  openapi: "3.0.0",
  info: { title: "Realtime Commerce API", version: "0.0.1" },
  paths: {
    "/health": { get: { summary: "Health check", responses: { 200: { description: "OK" } } } },
    "/auth/register": { post: { summary: "Register", requestBody: { content: { "application/json": { schema: { type: "object", properties: { email: {}, password: {}, name: {} } } } } }, responses: { 201: { description: "Created" } } } },
    "/auth/login": { post: { summary: "Login", requestBody: { content: { "application/json": { schema: { type: "object", properties: { email: {}, password: {} } } } } }, responses: { 200: { description: "OK" } } } },
    "/products": { get: { summary: "List products", parameters: [{ name: "page", in: "query" }, { name: "limit", in: "query" }, { name: "category", in: "query" }, { name: "sort", in: "query" }], responses: { 200: { description: "OK" } } } },
    "/cart": { get: { summary: "Get cart", security: [{ bearerAuth: [] }], responses: { 200: { description: "OK" } } } },
    "/checkout": { post: { summary: "Checkout", security: [{ bearerAuth: [] }], responses: { 201: { description: "Created" } } } },
    "/orders": { get: { summary: "List orders", security: [{ bearerAuth: [] }], responses: { 200: { description: "OK" } } } },
  },
  components: { securitySchemes: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } } },
};

router.get("/openapi.json", (_req: Request, res) => res.json(spec));
router.use("/", swaggerUi.serve, swaggerUi.setup(spec, { swaggerOptions: { url: "/api-docs/openapi.json" } }));

export default router;

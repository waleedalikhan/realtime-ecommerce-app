/**
 * Express app factory (no server listen). Used by index.ts and by integration tests.
 * Callers must set app.set("io", io) for checkout/order status emits.
 */
import express, { type Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import apiDocsRoutes from "./routes/apiDocs.js";

const app: Application = express();
const corsOrigins = process.env.CORS_ORIGINS?.split(",").map((o) =>
  o.trim()
) ?? ["http://localhost:3000"];

app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/orders", orderRoutes);
app.use("/admin", adminRoutes);
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api-docs", apiDocsRoutes);
app.use(errorHandler);

export default app;

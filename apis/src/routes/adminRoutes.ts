import { Router, type IRouter } from "express";
import {
  createProductHandler,
  updateProductHandler,
  updateOrderStatusHandler,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  adminCreateProductBodySchema,
  adminUpdateProductBodySchema,
  adminIdParamSchema,
  adminOrderStatusBodySchema,
} from "@repo/shared";

const router: IRouter = Router();

// Admin routes: JWT + role admin
router.use(authMiddleware, requireAdmin);

// POST /admin/products
router.post(
  "/products",
  validate(adminCreateProductBodySchema),
  createProductHandler
);

// PATCH /admin/products/:id
router.patch(
  "/products/:id",
  validate(adminIdParamSchema, "params"),
  validate(adminUpdateProductBodySchema),
  updateProductHandler
);

// PATCH /admin/orders/:id/status
router.patch(
  "/orders/:id/status",
  validate(adminIdParamSchema, "params"),
  validate(adminOrderStatusBodySchema),
  updateOrderStatusHandler
);

export default router;

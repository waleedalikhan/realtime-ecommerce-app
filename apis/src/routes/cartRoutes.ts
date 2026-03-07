import { Router, type IRouter } from "express";
import {
  getHandler,
  addItemHandler,
  updateItemHandler,
  removeItemHandler,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  addCartItemBodySchema,
  updateCartItemBodySchema,
  cartItemIdParamSchema,
} from "@repo/shared";

const router: IRouter = Router();

// All cart routes require JWT
router.use(authMiddleware);

// GET /cart
router.get("/", getHandler);

// POST /cart/items
router.post("/items", validate(addCartItemBodySchema), addItemHandler);

// PATCH /cart/items/:itemId
router.patch(
  "/items/:itemId",
  validate(cartItemIdParamSchema, "params"),
  validate(updateCartItemBodySchema),
  updateItemHandler
);

// DELETE /cart/items/:itemId
router.delete(
  "/items/:itemId",
  validate(cartItemIdParamSchema, "params"),
  removeItemHandler
);

export default router;

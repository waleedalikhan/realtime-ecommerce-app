import { Router, type IRouter } from "express";
import { checkoutHandler } from "../controllers/checkoutController.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { checkoutBodySchema } from "@repo/shared";

const router: IRouter = Router();

// POST /checkout — JWT required
router.post("/", authMiddleware, validate(checkoutBodySchema), checkoutHandler);

export default router;

import { Router, type IRouter } from "express";
import { listHandler, getByIdHandler } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { orderIdParamSchema } from "@repo/shared";

const router: IRouter = Router();

router.use(authMiddleware);

// GET /orders
router.get("/", listHandler);

// GET /orders/:id
router.get("/:id", validate(orderIdParamSchema, "params"), getByIdHandler);

export default router;

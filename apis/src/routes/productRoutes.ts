import { Router, type IRouter } from "express";
import { listHandler, getByIdHandler } from "../controllers/productController.js";
import { validate } from "../middleware/validate.js";
import { productsQuerySchema, productIdParamSchema } from "@repo/shared";

const router: IRouter = Router();

// GET /products — pagination, category, sort
router.get("/", validate(productsQuerySchema, "query"), listHandler);

// GET /products/:id
router.get("/:id", validate(productIdParamSchema, "params"), getByIdHandler);

export default router;

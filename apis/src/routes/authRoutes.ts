import { Router, type IRouter } from "express";
import { registerHandler, loginHandler, refreshHandler, meHandler } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { authMiddleware } from "../middleware/auth.js";
import { registerBodySchema, loginBodySchema, refreshBodySchema } from "@repo/shared";

const router: IRouter = Router();

// POST /auth/register — validate body, register, return tokens
router.post("/register", validate(registerBodySchema), registerHandler);

// POST /auth/login — validate body, login, return tokens
router.post("/login", validate(loginBodySchema), loginHandler);

// POST /auth/refresh — optional body.refreshToken; cookie also supported
router.post("/refresh", validate(refreshBodySchema), refreshHandler);

// GET /auth/me — return current user (id, email, name, role) for app restore
router.get("/me", authMiddleware, meHandler);

export default router;

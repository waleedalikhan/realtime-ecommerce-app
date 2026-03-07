/**
 * Load .env before any other code. Run from repo root (pnpm dev) or apis dir.
 * When pnpm runs from root, cwd is often the apis package dir, so we also load parent .env.
 */
import { config } from "dotenv";
import { resolve } from "path";

const cwd = process.cwd();
config({ path: resolve(cwd, ".env") });
config({ path: resolve(cwd, "apis/.env") });
config({ path: resolve(cwd, "../.env") });

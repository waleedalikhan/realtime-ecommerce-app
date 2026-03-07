/**
 * Load .env before any other code. Run from repo root (pnpm dev) or apis dir.
 */
import { config } from "dotenv";
import { resolve } from "path";

const cwd = process.cwd();
config({ path: resolve(cwd, ".env") });
config({ path: resolve(cwd, "apis/.env") });

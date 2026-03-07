import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger.js";

/** Single Prisma client instance. Connect on first use. */
export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? [{ emit: "event", level: "query" }]
      : [],
});

if (process.env.NODE_ENV === "development") {
  (
    prisma as unknown as {
      $on: (e: string, cb: (q: { query: string }) => void) => void;
    }
  ).$on("query", (e) => logger.debug({ query: e.query }, "prisma query"));
}

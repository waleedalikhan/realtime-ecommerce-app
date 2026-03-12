import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

// Load test DB env vars for integration tests
dotenv.config({ path: ".env.test" });

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  server: {
    // @ts-ignore
    deps: {
      external: ["bcryptjs"],
    },
  },
});

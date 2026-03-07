import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    globals: true,
    testTimeout: 10000,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});

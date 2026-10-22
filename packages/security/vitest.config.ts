import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    env: { SKIP_ENV_VALIDATION: "1", NODE_ENV: "test" },
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      include: ["src/crypto.ts", "src/headers.ts", "src/audit.ts", "src/ratelimit.ts"],
    },
  },
});

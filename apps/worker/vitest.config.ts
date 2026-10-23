import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    env: { SKIP_ENV_VALIDATION: "1", NODE_ENV: "test", QUEUE_DRIVER: "bullmq" },
  },
});

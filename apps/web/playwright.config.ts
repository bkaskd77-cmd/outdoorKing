import { defineConfig, devices } from "@playwright/test";

const port = 3000;
const baseURL = `http://127.0.0.1:${String(port)}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: process.env.CI ? "pnpm start" : "pnpm dev",
    url: `${baseURL}/api/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION ?? "1",
      AI_MOCK: process.env.AI_MOCK ?? "1",
      AI_CONCIERGE_ENABLED: process.env.AI_CONCIERGE_ENABLED ?? "1",
    },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});

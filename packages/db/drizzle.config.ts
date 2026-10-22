import { defineConfig } from "drizzle-kit";

import { env } from "@ok/env/server";

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  schemaFilter: ["app"],
  dbCredentials: {
    url: env.DATABASE_URL_UNPOOLED,
  },
});

import { z } from "zod";

import { clientEnv } from "./client";
import { serverDefaults } from "./defaults";
import { loadEnvFiles, skipValidation } from "./load";

loadEnvFiles();

const boolish = z
  .union([z.boolean(), z.enum(["true", "false", "1", "0", "yes", "no"])])
  .transform(
    (value) => value === true || value === "true" || value === "1" || value === "yes",
  );

const optionalString = z.string().optional().default("");

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
  CI: boolish.optional().default(false),
  DATABASE_URL: z.string().min(1),
  DATABASE_URL_UNPOOLED: z.string().min(1),
  DATABASE_DRIVER: z.enum(["neon", "pg"]),
  PAYLOAD_SECRET: z.string().min(32),
  PAYLOAD_PREVIEW_SECRET: z.string().min(32).optional().default(""),
  REVALIDATE_SECRET: z.string().min(32).optional().default(""),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
  AUTH_RP_ID: z.string().min(1),
  AUTH_TRUSTED_ORIGINS: z.string().min(1),
  STAFF_EMAIL_DOMAINS: z.string().min(1),
  BOOTSTRAP_SUPER_ADMIN_EMAIL: optionalString,
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  RATE_LIMIT_PREFIX: z.string().default("local:"),
  R2_ACCOUNT_ID: z.string().min(1),
  R2_ENDPOINT: z.string().url(),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET_MEDIA: z.string().min(1),
  R2_BUCKET_PRIVATE: z.string().min(1),
  R2_PUBLIC_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().min(1),
  EMAIL_SALES_TO: z.string().email(),
  SMTP_URL: optionalString,
  TURNSTILE_SECRET_KEY: z.string().min(1),
  AI_GATEWAY_API_KEY: optionalString,
  ANTHROPIC_API_KEY: optionalString,
  OPENAI_API_KEY: optionalString,
  GOOGLE_GENERATIVE_AI_API_KEY: optionalString,
  AI_MOCK: boolish.optional().default(false),
  AI_DAILY_BUDGET_USD: z.coerce.number().positive().default(5),
  AI_DESIGNER_ENABLED: boolish.optional().default(false),
  AI_CONCIERGE_ENABLED: boolish.optional().default(false),
  AI_CONTENT_AGENTS_ENABLED: boolish.optional().default(true),
  PII_KEK_LOCAL: z.string().min(1),
  PII_HMAC_KEY: z.string().min(1),
  CSP_REPORT_ONLY: boolish.optional().default(true),
  CSP_REPORT_URI: optionalString,
  SENTRY_AUTH_TOKEN: optionalString,
  SENTRY_ORG: optionalString,
  SENTRY_PROJECT: optionalString,
  OTEL_EXPORTER_OTLP_ENDPOINT: optionalString,
  OTEL_EXPORTER_OTLP_HEADERS: optionalString,
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

function readRaw(): Record<string, string | undefined> {
  const raw: Record<string, string | undefined> = {};
  for (const key of Object.keys(serverDefaults) as (keyof typeof serverDefaults)[]) {
    const fromProcess = process.env[key];
    if (fromProcess !== undefined && fromProcess !== "") {
      raw[key] = fromProcess;
    } else if (skipValidation()) {
      raw[key] = serverDefaults[key];
    } else {
      raw[key] = fromProcess;
    }
  }
  return raw;
}

function parseServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse(readRaw());
  if (parsed.success) return parsed.data;
  if (skipValidation()) return serverEnvSchema.parse(serverDefaults);
  console.error("Invalid server environment:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid server environment. See packages/env.");
}

const data = parseServerEnv();

export const env = {
  ...data,
  AUTH_TRUSTED_ORIGINS_LIST: data.AUTH_TRUSTED_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  STAFF_EMAIL_DOMAINS_LIST: data.STAFF_EMAIL_DOMAINS.split(",")
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean),
  client: clientEnv,
};

export type Env = typeof env;

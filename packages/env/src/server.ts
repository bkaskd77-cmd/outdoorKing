import { z } from "zod";

import { clientEnv } from "./client";
import { serverDefaults } from "./defaults";
import { loadEnvFiles, skipValidation } from "./load";
import { exactStaffEmails, isBlockedStaffDomain } from "./staff-email";

loadEnvFiles();

const boolish = z
  .union([z.boolean(), z.enum(["true", "false", "1", "0", "yes", "no"])])
  .transform(
    (value) => value === true || value === "true" || value === "1" || value === "yes",
  );

const optionalString = z.string().optional().default("");
const firstStaffEmail = "bkaskd@gmail.com";
const staffDomain = "outdoorking.com";

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
  STAFF_EMAIL_DOMAINS: z.string().min(1).default(staffDomain),
  STAFF_EMAIL_ALLOWLIST: z.string().optional().default(""),
  BOOTSTRAP_SUPER_ADMIN_EMAIL: z.string().default(firstStaffEmail),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  RATE_LIMIT_PREFIX: z.string().default("local:"),
  REDIS_URL: optionalString,
  QUEUE_DRIVER: z.enum(["inline", "bullmq", "qstash"]).default("inline"),
  QSTASH_TOKEN: optionalString,
  QSTASH_URL: z.string().url().optional().default("https://qstash.upstash.io"),
  QSTASH_CURRENT_SIGNING_KEY: optionalString,
  QSTASH_NEXT_SIGNING_KEY: optionalString,
  JOBS_CALLBACK_URL: optionalString,
  R2_ACCOUNT_ID: z.string().min(1),
  R2_ENDPOINT: z.string().url(),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET_MEDIA: z.string().min(1),
  R2_BUCKET_PRIVATE: z.string().min(1),
  R2_PUBLIC_URL: z.string().url(),
  BLOB_READ_WRITE_TOKEN: optionalString,
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().min(1),
  EMAIL_SALES_TO: z.string().email(),
  WHATSAPP_NUMBER: optionalString,
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
  PAYMENT_PROVIDER: z
    .enum(["mock", "wire", "hbl_cybersource", "nabil_2c2p"])
    .default("mock"),
  PAYMENT_WEBHOOK_SECRET: z
    .string()
    .min(16)
    .default("payment-webhook-secret-must-be-32ch"),
  PAYMENT_GATEWAY_ORIGINS: optionalString,
  PAYMENT_HOSTED_PAGE_URL: optionalString,
  WIRE_BENEFICIARY: optionalString,
  WIRE_BANK_NAME: optionalString,
  WIRE_ACCOUNT: optionalString,
  WIRE_SWIFT: optionalString,
  INTEL_BASE_URL: optionalString,
  INTEL_HMAC_SECRET: optionalString,
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

// Vercel's Upstash integration manages these names and updates them when the
// store's secrets are rotated, so they win over hand-copied UPSTASH_* values.
const integrationAliases = {
  UPSTASH_REDIS_REST_URL: "KV_REST_API_URL",
  UPSTASH_REDIS_REST_TOKEN: "KV_REST_API_TOKEN",
} as const;

export function applyIntegrationAliases(
  raw: Record<string, string | undefined>,
  source: Record<string, string | undefined> = process.env,
): Record<string, string | undefined> {
  for (const [key, alias] of Object.entries(integrationAliases)) {
    const value = source[alias];
    if (value) raw[key] = value;
  }
  return raw;
}

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
  return applyIntegrationAliases(raw);
}

function parseServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse(readRaw());
  if (parsed.success) return parsed.data;
  if (skipValidation()) return serverEnvSchema.parse(serverDefaults);
  console.error("Invalid server environment:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid server environment. See packages/env.");
}

const data = parseServerEnv();

export function staffEmailDomains(raw: string): string[] {
  const domains = raw
    .split(",")
    .map((domain) => domain.trim().toLowerCase())
    .filter((domain) => domain && !isBlockedStaffDomain(domain));
  if (!domains.includes(staffDomain)) domains.push(staffDomain);
  return domains;
}

export function bootstrapStaffEmail(raw: string | undefined): string {
  return raw?.trim().toLowerCase() || firstStaffEmail;
}

const staffDomains = staffEmailDomains(data.STAFF_EMAIL_DOMAINS);
const bootstrapEmail = bootstrapStaffEmail(data.BOOTSTRAP_SUPER_ADMIN_EMAIL);
const exactEmails = exactStaffEmails(bootstrapEmail, data.STAFF_EMAIL_ALLOWLIST);

export const env = {
  ...data,
  BOOTSTRAP_SUPER_ADMIN_EMAIL: bootstrapEmail,
  STAFF_EMAIL_DOMAINS: staffDomains.join(","),
  AUTH_TRUSTED_ORIGINS_LIST: data.AUTH_TRUSTED_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  STAFF_EMAIL_DOMAINS_LIST: staffDomains,
  STAFF_EXACT_EMAILS: exactEmails,
  PAYMENT_GATEWAY_ORIGINS_LIST: data.PAYMENT_GATEWAY_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  client: clientEnv,
};

export type Env = typeof env;

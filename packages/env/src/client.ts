import { z } from "zod";

import { clientDefaults } from "./defaults";
import { skipValidation } from "./load";

export const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_MEDIA_URL: z.string().url(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional().default(""),
  NEXT_PUBLIC_MAPTILER_KEY: z.string().optional().default(""),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

function readClientRaw(): Record<string, string | undefined> {
  return {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_MEDIA_URL: process.env.NEXT_PUBLIC_MEDIA_URL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_MAPTILER_KEY: process.env.NEXT_PUBLIC_MAPTILER_KEY,
  };
}

function parseClientEnv(): ClientEnv {
  const raw = readClientRaw();
  const filled = skipValidation()
    ? {
        ...clientDefaults,
        ...Object.fromEntries(
          Object.entries(raw).filter(([, value]) => value !== undefined && value !== ""),
        ),
      }
    : raw;
  const parsed = clientEnvSchema.safeParse(filled);
  if (parsed.success) return parsed.data;
  if (skipValidation()) return clientEnvSchema.parse(clientDefaults);
  console.error("Invalid client environment:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid client environment. See packages/env.");
}

export const clientEnv: ClientEnv = parseClientEnv();

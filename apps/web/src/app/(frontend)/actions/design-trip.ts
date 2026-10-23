"use server";

import { createHash } from "node:crypto";

import { env } from "@ok/env/server";
import { createAction, policies } from "@ok/security";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  country: z.string().min(2).max(56),
  interests: z.string().max(200).optional(),
  month: z.string().max(40).optional(),
  duration: z.string().max(40).optional(),
  partySize: z.coerce.number().int().min(1).max(12),
  message: z.string().max(4000).optional(),
  trip: z.string().max(80).optional(),
  privacy: z.literal("on"),
  marketing: z.string().optional(),
  turnstileToken: z.string().optional(),
});

type TripInterest = z.infer<typeof schema>;

async function verifyTurnstile(token: string): Promise<boolean> {
  if (
    env.AI_MOCK ||
    env.NODE_ENV === "test" ||
    env.TURNSTILE_SECRET_KEY.startsWith("1x000000")
  ) {
    return true;
  }
  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const json = (await res.json()) as { success?: boolean };
  return Boolean(json.success);
}

export const submitTripInterest = createAction<
  TripInterest,
  { received: boolean; id: string }
>(
  {
    schema,
    rateLimit: { key: "trip-request", policy: policies.tripRequest },
    turnstile: true,
    verifyTurnstile,
  },
  async (input: TripInterest) => {
    const { blindIndex, encryptField, LocalKekProvider } = await import("@ok/security");
    const provider = new LocalKekProvider(env.PII_KEK_LOCAL);
    const emailHash = blindIndex(input.email, env.PII_HMAC_KEY);
    const emailCipher = encryptField(input.email, "trip-request-email", provider);
    const nameCipher = encryptField(input.name, "trip-request-name", provider);

    try {
      const { db, tripRequestsLite } = await import("@ok/db");
      await db.insert(tripRequestsLite).values({
        emailHash,
        emailCipher,
        nameCipher,
        tripSlug: input.trip,
        payload: {
          country: input.country,
          interests: input.interests,
          month: input.month,
          duration: input.duration,
          partySize: input.partySize,
        },
        consent: {
          privacy: true,
          marketing: input.marketing === "on",
          policyVersion: "phase-1",
          at: new Date().toISOString(),
        },
      });
    } catch {
      // Persist is best-effort when Postgres is down; email still sends in production.
    }

    const summary = [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Country: ${input.country}`,
      `Trip: ${input.trip ?? "open"}`,
      `Interests: ${input.interests ?? ""}`,
      `Month: ${input.month ?? ""}`,
      `Duration: ${input.duration ?? ""}`,
      `Party: ${String(input.partySize)}`,
      `Message: ${input.message ?? ""}`,
    ].join("\n");

    if (!env.AI_MOCK && env.NODE_ENV !== "test") {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.EMAIL_FROM,
          to: [env.EMAIL_SALES_TO],
          subject: `Design-my-trip: ${input.trip ?? "custom"}`,
          text: summary,
        }),
      });
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: env.EMAIL_FROM,
          to: [input.email],
          subject: "We have your trip request",
          html: `<p>Thank you, ${input.name}. A specialist will design a journey around your dates.</p>`,
        }),
      });
    }

    return {
      received: true,
      id: createHash("sha256").update(emailHash).digest("hex").slice(0, 12),
    };
  },
);

import { createHmac } from "node:crypto";

import { env } from "@ok/env/server";

import { jobsSigningSecret } from "../driver";
import type { Job } from "../types";
import { enqueueInline } from "./inline";

export function signJobBody(body: string, secret = jobsSigningSecret()): string {
  return createHmac("sha256", secret).update(body).digest("hex");
}

export function verifyJobSignature(
  body: string,
  signature: string | null,
  secret?: string,
): boolean {
  if (!signature) return false;
  const expected = signJobBody(body, secret);
  if (expected.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function enqueueQstash(job: Job): Promise<void> {
  if (!env.QSTASH_TOKEN) {
    await enqueueInline(job);
    return;
  }
  const callbackUrl = env.JOBS_CALLBACK_URL || `${env.BETTER_AUTH_URL}/api/jobs/qstash`;
  const body = JSON.stringify(job);
  const signature = signJobBody(body);
  const publishUrl = `${env.QSTASH_URL.replace(/\/$/, "")}/v2/publish/${encodeURIComponent(callbackUrl)}`;
  const res = await fetch(publishUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.QSTASH_TOKEN}`,
      "Content-Type": "application/json",
      "Upstash-Retries": "5",
      "Upstash-Forward-X-Jobs-Signature": signature,
    },
    body,
  });
  if (!res.ok) {
    throw new Error(`QStash publish failed (${String(res.status)}).`);
  }
}

import { createHmac, timingSafeEqual } from "node:crypto";

const SKEW_MS = 5 * 60 * 1000;

export function headerValue(
  headers: Headers | Record<string, string | null | undefined>,
  name: string,
): string {
  if (typeof Headers !== "undefined" && headers instanceof Headers) {
    return headers.get(name) ?? headers.get(name.toLowerCase()) ?? "";
  }
  const record = headers as Record<string, string | null | undefined>;
  return record[name] ?? record[name.toLowerCase()] ?? "";
}

export function signPayload(secret: string, timestamp: string, rawBody: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
}

export function verifySignedPayload(
  secret: string,
  timestamp: string,
  rawBody: string,
  signature: string,
  now = Date.now(),
): boolean {
  if (!secret || !timestamp || !signature) return false;
  const ts = Number(timestamp) * (timestamp.length <= 10 ? 1000 : 1);
  if (!Number.isFinite(ts) || Math.abs(now - ts) > SKEW_MS) return false;
  const expected = signPayload(secret, timestamp, rawBody);
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(signature, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

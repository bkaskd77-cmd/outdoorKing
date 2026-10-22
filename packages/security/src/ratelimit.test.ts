import { describe, expect, it } from "vitest";

import { limit, policies, shouldSkipRateLimit } from "./ratelimit";

describe("rate-limit policies", () => {
  it("matches security.md defaults", () => {
    expect(policies.global).toMatchObject({ limit: 300, windowMs: 5 * 60 * 1000 });
    expect(policies.signIn.limit).toBe(5);
    expect(policies.magicLink.limit).toBe(3);
    expect(policies.tripRequest.limit).toBe(5);
    expect(policies.payloadPublic.limit).toBe(120);
  });

  it("skips static, images and health", () => {
    expect(shouldSkipRateLimit("/_next/static/chunk.js")).toBe(true);
    expect(shouldSkipRateLimit("/api/health")).toBe(true);
    expect(shouldSkipRateLimit("/api/health/ready")).toBe(true);
    expect(shouldSkipRateLimit("/hero.webp")).toBe(true);
    expect(shouldSkipRateLimit("/api/payments/webhook/mock")).toBe(true);
    expect(shouldSkipRateLimit("/admin/login")).toBe(false);
  });

  it("uses the in-memory fallback in test", async () => {
    const key = `test-${String(Date.now())}`;
    const first = await limit(key, { name: "tiny", limit: 1, windowMs: 60_000 });
    const second = await limit(key, { name: "tiny", limit: 1, windowMs: 60_000 });
    expect(first.success).toBe(true);
    expect(second.success).toBe(false);
  });
});

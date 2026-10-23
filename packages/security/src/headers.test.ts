import { describe, expect, it } from "vitest";

import { STATIC_HEADER_NAMES, buildCsp, staticSecurityHeaders } from "./headers";

describe("CSP builder", () => {
  it("embeds the nonce and strict-dynamic", () => {
    const csp = buildCsp("abc123", { r2AccountId: "acct" });
    expect(csp).toContain("'nonce-abc123'");
    expect(csp).toContain("'strict-dynamic'");
    expect(csp).toContain("https://challenges.cloudflare.com");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("worker-src 'self' blob:");
    expect(csp).toContain("media-src 'self'");
  });

  it("allows unsafe-eval only when requested (admin/dev)", () => {
    expect(buildCsp("n")).not.toContain("'unsafe-eval'");
    expect(buildCsp("n", { unsafeEval: true })).toContain("'unsafe-eval'");
  });

  it("allows configured Nepal gateway origins in form-action and frame-src", () => {
    const csp = buildCsp("n", {
      gatewayOrigins: ["https://sandbox.hbl.example"],
    });
    expect(csp).toContain("https://sandbox.hbl.example");
    expect(csp).toContain("form-action");
  });
});

describe("static security headers", () => {
  it("includes every header from security.md section 5", () => {
    const config = staticSecurityHeaders();
    const names = new Set(config[0]?.headers.map((h) => h.key));
    for (const name of STATIC_HEADER_NAMES) {
      expect(names.has(name)).toBe(true);
    }
  });
});

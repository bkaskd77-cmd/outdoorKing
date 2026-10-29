import { describe, expect, it } from "vitest";

import { serverDefaults } from "./defaults";
import {
  applyIntegrationAliases,
  bootstrapStaffEmail,
  serverEnvSchema,
  staffEmailDomains,
} from "./server";

describe("server env schema", () => {
  it("parses local defaults", () => {
    const parsed = serverEnvSchema.parse(serverDefaults);
    expect(parsed.DATABASE_DRIVER).toBe("pg");
    expect(parsed.PAYLOAD_SECRET.length).toBeGreaterThanOrEqual(32);
    expect(parsed.PAYMENT_PROVIDER).toBe("mock");
    expect(parsed.AI_CONCIERGE_ENABLED).toBe(true);
    expect(parsed.WHATSAPP_NUMBER).toBe("");
    expect(parsed.QUEUE_DRIVER).toBe("inline");
    expect(parsed.REDIS_URL).toBe("");
    expect(parsed.STAFF_EMAIL_DOMAINS.split(",")).toContain("outdoorking.com");
    expect(parsed.BOOTSTRAP_SUPER_ADMIN_EMAIL).toBe("bkaskd@gmail.com");
    expect(parsed.STAFF_EMAIL_ALLOWLIST).toBe("");
  });

  it("uses bkaskd@gmail.com when the bootstrap email is blank", () => {
    expect(bootstrapStaffEmail("")).toBe("bkaskd@gmail.com");
    expect(bootstrapStaffEmail(undefined)).toBe("bkaskd@gmail.com");
    expect(bootstrapStaffEmail("  Owner@Example.com ")).toBe("owner@example.com");
  });

  it("keeps outdoorking.com on the staff domain list", () => {
    expect(staffEmailDomains("example.com")).toEqual(["example.com", "outdoorking.com"]);
    expect(staffEmailDomains("OutdoorKing.com")).toEqual(["outdoorking.com"]);
    expect(staffEmailDomains("gmail.com")).toEqual(["outdoorking.com"]);
    expect(staffEmailDomains("gmail.com,outdoorking.com")).toEqual(["outdoorking.com"]);
  });

  it("prefers the Upstash integration's KV_REST_API_* values", () => {
    const raw = {
      UPSTASH_REDIS_REST_URL: "https://old",
      UPSTASH_REDIS_REST_TOKEN: "old",
    };
    expect(
      applyIntegrationAliases(
        { ...raw },
        { KV_REST_API_URL: "https://new", KV_REST_API_TOKEN: "new" },
      ),
    ).toEqual({ UPSTASH_REDIS_REST_URL: "https://new", UPSTASH_REDIS_REST_TOKEN: "new" });
    expect(applyIntegrationAliases({ ...raw }, {})).toEqual(raw);
    expect(applyIntegrationAliases({ ...raw }, { KV_REST_API_TOKEN: "" })).toEqual(raw);
  });
});

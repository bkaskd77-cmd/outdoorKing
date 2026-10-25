import { describe, expect, it } from "vitest";

import { serverDefaults } from "./defaults";
import { bootstrapStaffEmail, serverEnvSchema, staffEmailDomains } from "./server";

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
    expect(parsed.BOOTSTRAP_SUPER_ADMIN_EMAIL).toBe("booking@outdoorking.com");
  });

  it("uses booking@outdoorking.com when the bootstrap email is blank", () => {
    expect(bootstrapStaffEmail("")).toBe("booking@outdoorking.com");
    expect(bootstrapStaffEmail(undefined)).toBe("booking@outdoorking.com");
    expect(bootstrapStaffEmail("  Owner@Example.com ")).toBe("owner@example.com");
  });

  it("keeps outdoorking.com on the staff domain list", () => {
    expect(staffEmailDomains("example.com")).toEqual(["example.com", "outdoorking.com"]);
    expect(staffEmailDomains("OutdoorKing.com")).toEqual(["outdoorking.com"]);
  });
});

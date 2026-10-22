import { describe, expect, it } from "vitest";

import { serverDefaults } from "./defaults";
import { serverEnvSchema } from "./server";

describe("server env schema", () => {
  it("parses local defaults", () => {
    const parsed = serverEnvSchema.parse(serverDefaults);
    expect(parsed.DATABASE_DRIVER).toBe("pg");
    expect(parsed.PAYLOAD_SECRET.length).toBeGreaterThanOrEqual(32);
    expect(parsed.PAYMENT_PROVIDER).toBe("mock");
  });
});

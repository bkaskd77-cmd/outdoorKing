import { describe, expect, it } from "vitest";

import { serverEnvSchema } from "./server";
import { serverDefaults } from "./defaults";

describe("server env schema", () => {
  it("parses local defaults", () => {
    const parsed = serverEnvSchema.parse(serverDefaults);
    expect(parsed.DATABASE_DRIVER).toBe("pg");
    expect(parsed.PAYLOAD_SECRET.length).toBeGreaterThanOrEqual(32);
  });
});

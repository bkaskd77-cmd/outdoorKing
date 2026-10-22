import { describe, expect, it } from "vitest";

import { shouldRunIntl } from "./intl-gate";

describe("shouldRunIntl", () => {
  it("runs locale middleware on marketing pages", () => {
    expect(shouldRunIntl("/")).toBe(true);
    expect(shouldRunIntl("/en")).toBe(true);
    expect(shouldRunIntl("/design")).toBe(true);
    expect(shouldRunIntl("/_design")).toBe(true);
  });

  it("skips API, admin, and monitoring", () => {
    expect(shouldRunIntl("/api/health")).toBe(false);
    expect(shouldRunIntl("/api/health/ready")).toBe(false);
    expect(shouldRunIntl("/admin/login")).toBe(false);
    expect(shouldRunIntl("/monitoring")).toBe(false);
  });
});

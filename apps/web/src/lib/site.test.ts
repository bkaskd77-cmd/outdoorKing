import { describe, expect, it } from "vitest";

import { hreflangMap, localizedPath } from "./site";

describe("locale paths", () => {
  it("prefixes non-default locales and keeps English unprefixed", () => {
    expect(localizedPath("en", "/trips")).toBe("/trips");
    expect(localizedPath("de", "/trips")).toBe("/de/trips");
    expect(localizedPath("zh-Hans", "/")).toBe("/zh-Hans");
    expect(hreflangMap("/")["de"]).toMatch(/\/de$/);
  });
});

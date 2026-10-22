import { describe, expect, it } from "vitest";

import { brand, brandName } from "./brand";

describe("brand config", () => {
  it("keeps the public name in one module", () => {
    expect(brandName).toBe("OutdoorKing");
    expect(brand.name).toBe(brandName);
    expect(brand.domain).toBe("outdoorking.com");
  });
});

import { describe, expect, it } from "vitest";

import { findPriceMentions } from "./no-prices";

describe("no public prices", () => {
  it("flags currency amounts", () => {
    expect(findPriceMentions("From USD 2400 per person")).not.toEqual([]);
    expect(findPriceMentions("Private quote. No public price.")).toEqual([]);
  });
});

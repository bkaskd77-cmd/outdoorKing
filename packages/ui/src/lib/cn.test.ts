import { describe, expect, it } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});

describe("cn with the type scale", () => {
  it("keeps a heading size next to a text colour", () => {
    expect(cn("text-h2", "text-snow-50")).toBe("text-h2 text-snow-50");
  });

  it("still lets a later size replace an earlier one", () => {
    expect(cn("text-h2", "text-display-lg")).toBe("text-display-lg");
  });
});

import { describe, expect, it } from "vitest";

import { indexCatalog, stripTbdMarkers } from "./chunker";
import { fixtureCatalog } from "./fixture-catalog";

describe("stripTbdMarkers", () => {
  it("removes closed markers including those with a label", () => {
    expect(stripTbdMarkers("[[TBD]]")).toBe("");
    expect(stripTbdMarkers("Fees [[TBD: 2026 TIMS fee table]] done")).toBe("Fees  done");
    expect(stripTbdMarkers("Licensed guide [[TBD: named guide / ratio]].")).toBe(
      "Licensed guide .",
    );
  });

  it("leaves unmatched [[TBD prefixes in place", () => {
    expect(stripTbdMarkers("see [[TBD later")).toBe("see [[TBD later");
    expect(stripTbdMarkers("keep [[TBDx]]")).toBe("keep [[TBDx]]");
  });

  it("scans repeated [[TBD: prefixes in linear time", () => {
    const repeated = `${"[[TBD:".repeat(8000)} trailing`;
    const started = Date.now();
    expect(stripTbdMarkers(repeated)).toBe(repeated);
    expect(Date.now() - started).toBeLessThan(250);
    expect(stripTbdMarkers(`${"[[TBD:".repeat(40)}inner]]`)).toBe("");
  });
});

describe("indexCatalog", () => {
  it("does not index raw TBD markers from catalog copy", () => {
    const blob = indexCatalog(fixtureCatalog)
      .map((chunk) => chunk.content)
      .join("\n");
    expect(blob).not.toContain("[[TBD");
    expect(blob).toMatch(/TIMS/);
  });
});

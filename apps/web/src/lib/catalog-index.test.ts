import { describe, expect, it } from "vitest";

import { codeCatalog } from "../content/catalog";

import { indexCatalog } from "@ok/ai";

import { publishedCatalogIndex } from "./catalog-index";

describe("published catalog index", () => {
  it("indexes published trips and never PII-looking fields", () => {
    const catalog = publishedCatalogIndex(codeCatalog);
    expect(catalog.trips.length).toBeGreaterThan(0);
    expect(catalog.pages.every((p) => p.status === "published")).toBe(true);
    const blob = JSON.stringify(catalog);
    expect(blob).not.toMatch(/"email"|"passport"|"phoneCipher"/i);
    expect(blob).not.toContain("[[TBD");
    const chunks = indexCatalog(catalog);
    expect(chunks.some((c) => c.sourceType === "trip")).toBe(true);
    expect(chunks.every((c) => !c.content.includes("@guest"))).toBe(true);
  });
});

import { describe, expect, it } from "vitest";

import { codeCatalog } from "../content/catalog";

import { offlineCatalog } from "./offline-catalog";

describe("offline catalog", () => {
  it("ships published itineraries and static rescue copy without prices", () => {
    const catalog = offlineCatalog(codeCatalog);
    expect(catalog.trips.length).toBeGreaterThan(0);
    expect(catalog.trips.some((trip) => trip.slug === "everest-base-camp-trek")).toBe(
      true,
    );
    expect(catalog.rescue.policyPath).toBe("/trust/safety-and-rescue");
    expect(catalog.rescue.contacts.length).toBeGreaterThan(0);
    const blob = JSON.stringify(catalog);
    expect(blob).not.toMatch(/USD\s+\d|\$\s?\d|unitPrice|depositAmount/i);
    expect(blob).not.toContain("[[TBD");
  });
});

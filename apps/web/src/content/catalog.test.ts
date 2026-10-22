import { describe, expect, it } from "vitest";

import { findPriceMentions } from "../lib/no-prices";
import { publicTripFields } from "../lib/trip-public";
import { getTrips, tripView } from "./catalog";

describe("flagship catalog", () => {
  it("publishes EBC, Annapurna Circuit and Island Peak without rule errors", () => {
    const published = getTrips("published");
    expect(published.map((t) => t.slug).sort()).toEqual([
      "annapurna-circuit-trek",
      "everest-base-camp-trek",
      "island-peak-climbing",
    ]);
    for (const trip of published) {
      const view = tripView(trip);
      expect(view.ruleReport.violations, trip.slug).toEqual([]);
    }
  });

  it("keeps other flagship trips as drafts", () => {
    const drafts = getTrips("draft");
    expect(drafts.length).toBeGreaterThanOrEqual(4);
  });

  it("does not leak public trip prices", () => {
    for (const trip of getTrips("published")) {
      const html = [
        trip.overview,
        trip.subtitle,
        ...trip.inclusions,
        ...trip.exclusions,
      ].join("\n");
      expect(findPriceMentions(html), trip.slug).toEqual([]);
    }
  });

  it("strips internalNotes from the public trip field set", () => {
    const publicDoc = publicTripFields({
      title: "Everest Base Camp Trek",
      internalNotes: "staff only margin notes",
      designerDefaults: { pace: "slow" },
    });
    expect(publicDoc).not.toHaveProperty("internalNotes");
    expect(publicDoc).not.toHaveProperty("designerDefaults");
    expect(publicDoc.title).toBe("Everest Base Camp Trek");
  });
});

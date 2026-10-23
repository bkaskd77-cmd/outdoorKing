import { describe, expect, it } from "vitest";

import { findPriceMentions } from "../lib/no-prices";
import { publicTripFields } from "../lib/trip-public";
import { getTrip, getTrips, tripView } from "./catalog";

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

  it("imports the 53-product library as catalog rows (unpublished except three flagships)", () => {
    const all = getTrips();
    expect(all.length).toBeGreaterThanOrEqual(53);
    expect(getTrips("published")).toHaveLength(3);
    expect(getTrips("draft").length).toBeGreaterThanOrEqual(50);
    expect(all.some((t) => t.slug === "gokyo-lakes-trek" && t.status === "draft")).toBe(
      true,
    );
  });

  it("routes library products into the right activity hubs", () => {
    expect(getTrip("everest-base-camp-trek")?.activity).toBe("trekking");
    expect(getTrip("island-peak-climbing")?.activity).toBe("peak-climbing");
    expect(getTrip("everest-expedition-south-col")?.activity).toBe("expeditions");
    expect(getTrip("everest-helicopter-tour")?.activity).toBe("heli-treks");
    expect(getTrip("chitwan-national-park-safari")?.activity).toBe("wildlife");
    expect(getTrip("lumbini-pilgrimage-tour")?.activity).toBe("pilgrimage");
    expect(getTrip("kathmandu-valley-heritage-tour")?.activity).toBe("cultural");
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
      depositPolicy: { depositPct: 30, balanceDueDaysBefore: 45 },
    });
    expect(publicDoc).not.toHaveProperty("internalNotes");
    expect(publicDoc).not.toHaveProperty("designerDefaults");
    expect(publicDoc).not.toHaveProperty("depositPolicy");
    expect(publicDoc.title).toBe("Everest Base Camp Trek");
  });
});

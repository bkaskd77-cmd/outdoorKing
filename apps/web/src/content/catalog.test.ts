import { describe, expect, it } from "vitest";

import { findPriceMentions } from "../lib/no-prices";
import { publicTripFields } from "../lib/trip-public";
import {
  getHomeJourneys,
  getRegionShowcase,
  getTrip,
  getTrips,
  regions,
  tripView,
} from "./catalog";

describe("flagship catalog", () => {
  it("publishes EBC, Annapurna Circuit and Island Peak without rule errors", () => {
    const flagships = [
      "annapurna-circuit-trek",
      "everest-base-camp-trek",
      "island-peak-climbing",
    ];
    for (const slug of flagships) {
      const trip = getTrip(slug);
      expect(trip?.status).toBe("published");
      const view = tripView(trip!);
      expect(view.ruleReport.violations, slug).toEqual([]);
    }
  });

  it("puts six unique published journeys on the home page", () => {
    const home = getHomeJourneys();
    expect(home).toHaveLength(6);
    expect(new Set(home.map((trip) => trip.slug)).size).toBe(6);
    expect(home.every((trip) => trip.status === "published")).toBe(true);
    expect(home.map((trip) => trip.slug)).toEqual(
      expect.arrayContaining([
        "annapurna-circuit-trek",
        "everest-base-camp-trek",
        "island-peak-climbing",
        "annapurna-base-camp-trek",
        "manaslu-circuit-trek",
        "langtang-valley-trek",
      ]),
    );
  });

  it("publishes the sourced catalog library, not only three flagships", () => {
    const all = getTrips();
    const published = getTrips("published");
    expect(all.length).toBeGreaterThanOrEqual(53);
    expect(published.length).toBe(all.length);
    expect(getTrips("draft")).toHaveLength(0);
    expect(published.some((t) => t.slug === "annapurna-base-camp-trek")).toBe(true);
    expect(published.some((t) => t.slug === "ghorepani-poon-hill-trek")).toBe(true);
    expect(published.some((t) => t.slug === "mardi-himal-trek")).toBe(true);
    expect(published.some((t) => t.slug === "khopra-danda-trek")).toBe(true);
    expect(getTrip("upper-mustang-trek")?.regions).toEqual(["mustang"]);
  });

  it("maps the home region showcase to catalog regions and their journeys", () => {
    const showcase = getRegionShowcase();
    expect(showcase.map((item) => item.slug)).toEqual(
      regions.map((region) => region.slug),
    );
    for (const item of showcase) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.summary.length).toBeGreaterThan(0);
      expect(new Set(item.trips.map((trip) => trip.slug)).size).toBe(item.trips.length);
      for (const trip of item.trips) {
        expect(getTrip(trip.slug)?.status).toBe("published");
        expect(getTrip(trip.slug)?.regions).toContain(item.slug);
      }
    }
    const everest = showcase[0];
    expect(everest?.slug).toBe("everest");
    expect(everest?.trips.some((trip) => trip.slug === "everest-base-camp-trek")).toBe(
      true,
    );
    expect(everest?.trips.some((trip) => trip.slug === "annapurna-circuit-trek")).toBe(
      false,
    );
    expect(
      showcase.find((item) => item.slug === "mustang")?.trips.map((trip) => trip.slug),
    ).toEqual(["upper-mustang-trek"]);
    expect(
      showcase.some((item) => item.trips.some((trip) => trip.slug === "rara-lake-trek")),
    ).toBe(false);
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

import { describe, expect, it } from "vitest";

import { getTrips } from "@/content/catalog";

import { findPriceMentions } from "./no-prices";
import {
  filterChooserTrips,
  matchingTripSlug,
  wizardSeedFromTrip,
  type ChooserTrip,
} from "./trip-chooser";

function catalogChooserTrips(status?: "published" | "draft"): ChooserTrip[] {
  return getTrips(status).map((trip) => ({
    slug: trip.slug,
    title: trip.title,
    activity: trip.activity,
    regions: trip.regions,
    durationMin: trip.durationMin,
    durationMax: trip.durationMax,
    durationTypical: trip.durationTypical,
  }));
}

describe("trip chooser", () => {
  const catalog = catalogChooserTrips();
  const published = catalogChooserTrips("published");

  it("uses catalog rows rather than a hardcoded handful", () => {
    expect(catalog.length).toBeGreaterThanOrEqual(53);
    expect(new Set(catalog.map((trip) => trip.slug)).size).toBe(catalog.length);
  });

  it("lets Tour list tours and never Annapurna Circuit", () => {
    const tours = filterChooserTrips(catalog, {
      activitySlug: "tours",
      regionSlugs: [],
      durationBand: "any",
    });
    expect(tours.length).toBeGreaterThan(0);
    expect(tours.every((trip) => trip.activity === "tours")).toBe(true);
    expect(tours.some((trip) => trip.slug === "annapurna-circuit-trek")).toBe(false);
    expect(tours.some((trip) => /annapurna circuit/i.test(trip.title))).toBe(false);
  });

  it("lists every published Annapurna trek for Trek + Annapurna", () => {
    const treks = filterChooserTrips(published, {
      activitySlug: "trekking",
      regionSlugs: ["annapurna"],
      durationBand: "any",
    });
    expect(treks.length).toBeGreaterThan(4);
    expect(treks.every((trip) => trip.activity === "trekking")).toBe(true);
    expect(treks.every((trip) => trip.regions.includes("annapurna"))).toBe(true);
    for (const slug of [
      "annapurna-circuit-trek",
      "annapurna-base-camp-trek",
      "ghorepani-poon-hill-trek",
      "mardi-himal-trek",
      "khopra-danda-trek",
    ]) {
      expect(
        treks.some((trip) => trip.slug === slug),
        slug,
      ).toBe(true);
    }
    expect(treks.some((trip) => trip.slug === "everest-base-camp-trek")).toBe(false);
    expect(treks.some((trip) => trip.slug === "island-peak-climbing")).toBe(false);
    expect(treks.some((trip) => trip.slug === "upper-mustang-trek")).toBe(false);
  });

  it("lists every published trek when no region is selected", () => {
    const treks = filterChooserTrips(published, {
      activitySlug: "trekking",
      regionSlugs: [],
      durationBand: "any",
    });
    const catalogTreks = published.filter((trip) => trip.activity === "trekking");
    expect(treks.map((trip) => trip.slug).sort()).toEqual(
      catalogTreks.map((trip) => trip.slug).sort(),
    );
    expect(treks.length).toBeGreaterThan(10);
  });

  it("narrows Trek + Annapurna when a days band is applied", () => {
    const anyLength = filterChooserTrips(catalog, {
      activitySlug: "trekking",
      regionSlugs: ["annapurna"],
      durationBand: "any",
    });
    const short = filterChooserTrips(catalog, {
      activitySlug: "trekking",
      regionSlugs: ["annapurna"],
      durationBand: "up-to-7",
    });
    expect(short.length).toBeGreaterThan(0);
    expect(short.length).toBeLessThan(anyLength.length);
    expect(short.every((trip) => trip.durationMin <= 7 && trip.durationMax >= 1)).toBe(
      true,
    );
  });

  it("does not filter by activity when Not sure, and skips region when none are selected", () => {
    const open = filterChooserTrips(catalog, {
      activitySlug: "not-sure",
      regionSlugs: [],
      durationBand: "any",
    });
    expect(open.map((trip) => trip.slug).sort()).toEqual(
      catalog.map((trip) => trip.slug).sort(),
    );
  });

  it("clears a trip that no longer matches and keeps one that still does", () => {
    const tours = filterChooserTrips(published, {
      activitySlug: "tours",
      regionSlugs: [],
      durationBand: "any",
    });
    expect(matchingTripSlug(tours, "annapurna-circuit-trek")).toBe("");
    const treks = filterChooserTrips(published, {
      activitySlug: "trekking",
      regionSlugs: ["annapurna"],
      durationBand: "any",
    });
    expect(matchingTripSlug(treks, "annapurna-circuit-trek")).toBe(
      "annapurna-circuit-trek",
    );
  });

  it("seeds activity, region and typical days from a known trip", () => {
    const seed = wizardSeedFromTrip(published, "annapurna-base-camp-trek");
    expect(seed).toMatchObject({
      activitySlugs: ["trekking"],
      regionSlugs: ["annapurna"],
      tripSlug: "annapurna-base-camp-trek",
      durationBand: "any",
    });
    expect(seed?.durationDays).toBeGreaterThanOrEqual(5);
    expect(wizardSeedFromTrip(published, undefined)).toBeNull();
    expect(wizardSeedFromTrip(published, "not-a-trip")).toBeNull();
  });

  it("does not put prices on matching titles", () => {
    const blob = catalog.map((trip) => trip.title).join("\n");
    expect(findPriceMentions(blob)).toEqual([]);
  });
});

import { describe, expect, it } from "vitest";

import {
  catalogToDraft,
  designItinerary,
  retrieveCatalog,
  type CatalogTripLike,
} from "./designer";
import { autoFixItinerary, evaluateItinerary } from "./rules";
import { PRICE_IN_TEXT } from "./schemas/itinerary-draft";

const ebc: CatalogTripLike = {
  slug: "everest-base-camp-trek",
  title: "Everest Base Camp Trek",
  activity: "trekking",
  regions: ["everest"],
  durationMin: 12,
  durationMax: 16,
  usesLukla: true,
  permits: ["sagarmatha-national-park"],
  peaks: [],
  seasons: ["spring", "autumn"],
  days: [
    {
      dayNumber: 1,
      title: "Arrive Kathmandu",
      fromPlace: "Airport",
      toPlace: "Kathmandu",
      startAltitudeM: 1400,
      highPointM: 1400,
      sleepAltitudeM: 1400,
      dayType: "city",
    },
    {
      dayNumber: 2,
      title: "Fly Lukla to Phakding",
      fromPlace: "Kathmandu",
      toPlace: "Phakding",
      startAltitudeM: 1400,
      highPointM: 2860,
      sleepAltitudeM: 2610,
      dayType: "flight",
    },
    {
      dayNumber: 3,
      title: "Namche",
      fromPlace: "Phakding",
      toPlace: "Namche",
      startAltitudeM: 2610,
      highPointM: 3440,
      sleepAltitudeM: 3440,
      dayType: "trek",
    },
  ],
};

describe("trip designer", () => {
  it("retrieves a catalog trip by slug and copies altitudes from IDs", async () => {
    const retrieved = retrieveCatalog([ebc], { tripSlug: "everest-base-camp-trek" });
    expect(retrieved.trip.slug).toBe("everest-base-camp-trek");
    const draft = catalogToDraft(retrieved.trip);
    expect(draft.days[0]?.itineraryDayId).toBe("everest-base-camp-trek:1");
    const result = await designItinerary([ebc], { tripSlug: "everest-base-camp-trek" });
    expect(result.mocked).toBe(true);
    expect(result.resolvedDays[0]?.sleepAltitudeM).toBe(1400);
    expect(result.resolvedDays[1]?.sleepAltitudeM).toBe(2610);
    expect(PRICE_IN_TEXT.test(result.draft.narrative ?? "")).toBe(false);
  });

  it("auto-fixes missing Lukla contingency", () => {
    const input = ebc.days.map((d) => ({
      dayNumber: d.dayNumber,
      title: d.title,
      fromPlace: d.fromPlace,
      toPlace: d.toPlace,
      startAltitudeM: d.startAltitudeM,
      highPointM: d.highPointM,
      sleepAltitudeM: d.sleepAltitudeM,
      dayType: d.dayType,
    }));
    const before = evaluateItinerary(input, { usesLukla: true });
    expect(before.violations.some((v) => v.id === "LOG-001")).toBe(true);
    const fixed = autoFixItinerary(input, { usesLukla: true });
    expect(fixed.applied).toContain("LOG-001");
    expect(fixed.report.violations.some((v) => v.id === "LOG-001")).toBe(false);
  });

  it("explains an Everest Base Camp catalog plan when intel is down", async () => {
    const result = await designItinerary([ebc], {
      tripSlug: "everest-base-camp-trek",
      month: 7,
      pace: "fast",
      maxPriorAltitudeM: 3000,
    });
    expect(result.plannerSource).toBe("catalog");
    expect(result.planReasons.some((reason) => reason.id === "SEASON")).toBe(true);
    expect(result.seasonFit.fit).toBe("poor");
    expect(result.seasonFit.message).toMatch(/monsoon/i);
    expect(result.seasonFit.message).toMatch(/spring/i);
    expect(result.planReasons.some((reason) => /ALT-002/.test(reason.text))).toBe(true);
    expect(
      PRICE_IN_TEXT.test(result.planReasons.map((reason) => reason.text).join(" ")),
    ).toBe(false);
  });

  it("shows the intel plan only after evaluateItinerary passes", async () => {
    const result = await designItinerary(
      [ebc],
      { tripSlug: "everest-base-camp-trek", month: 4, pace: "steady" },
      async () => ({
        days: [
          ...ebc.days,
          {
            dayNumber: 4,
            title: "Buffer day / departure",
            fromPlace: "Kathmandu",
            toPlace: "Kathmandu",
            startAltitudeM: 1400,
            highPointM: 1400,
            sleepAltitudeM: 1400,
            dayType: "contingency",
          },
        ],
        seasonFit: {
          month: 4,
          season: "spring",
          tripSeasons: ["spring", "autumn"],
          fit: "good",
          message: "April is spring (Mar–May), which fits this trip (spring, autumn).",
        },
        reasons: [
          {
            id: "PACE",
            text: "Steady pace keeps the catalog days, including sourced rest and contingency.",
          },
        ],
      }),
    );
    expect(result.plannerSource).toBe("intel");
    expect(result.planReasons.some((reason) => reason.id === "PACE")).toBe(true);
    expect(result.report.violations.length).toBe(0);
    expect(result.resolvedDays.some((day) => day.dayType === "contingency")).toBe(true);
  });

  it("keeps catalog-and-autofix when the planner is unavailable", async () => {
    const result = await designItinerary(
      [ebc],
      { tripSlug: "everest-base-camp-trek" },
      async () => null,
    );
    expect(result.plannerSource).toBe("catalog");
    expect(result.mocked).toBe(true);
    expect(result.resolvedDays[0]?.sleepAltitudeM).toBe(1400);
  });
});

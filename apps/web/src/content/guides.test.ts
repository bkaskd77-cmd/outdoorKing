import { describe, expect, it } from "vitest";

import { pages } from "./catalog";
import { guidesForTrip, guidesOf } from "./guides";

const all = guidesOf(pages);

describe("travel guides", () => {
  it("lists every guide page under /guides", () => {
    expect(all.length).toBeGreaterThanOrEqual(11);
    expect(all.every((guide) => guide.path === `/guides/${guide.urlSlug}`)).toBe(true);
    expect(all.every((guide) => guide.summary.length > 0)).toBe(true);
  });

  it("picks the climbing, flight and altitude guides for a Lukla climb", () => {
    const picked = guidesForTrip(
      {
        slug: "island-peak-climbing",
        activity: "peak-climbing",
        maxAltitudeM: 6165,
        usesLukla: true,
      },
      all,
    ).map((guide) => guide.slug);
    expect(picked).toEqual([
      "your-first-trekking-peak",
      "lukla-and-mountain-flights",
      "acclimatization-explained",
    ]);
  });

  it("skips altitude and trail guides for a low tour", () => {
    const picked = guidesForTrip(
      {
        slug: "chitwan-national-park-safari",
        activity: "wildlife",
        maxAltitudeM: 1400,
        usesLukla: false,
      },
      all,
    ).map((guide) => guide.slug);
    expect(picked).toEqual(["best-time-to-trek", "nepal-visa-and-arrival"]);
  });
});

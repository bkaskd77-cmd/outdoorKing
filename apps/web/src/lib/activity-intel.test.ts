import { describe, expect, it } from "vitest";

import { activityHeroCopy, activityIntel, altitudeChip } from "./activity-intel";

describe("activityIntel", () => {
  it("describes trekking from published and library routes", () => {
    const intel = activityIntel("trekking");
    expect(intel?.activity.slug).toBe("trekking");
    expect(intel?.published.some((trip) => trip.slug === "everest-base-camp-trek")).toBe(
      true,
    );
    expect(intel?.published.some((trip) => trip.slug === "island-peak-climbing")).toBe(
      false,
    );
    expect(intel?.maxAltitudeM).toBeGreaterThan(5000);
    expect(intel?.permits.length).toBeGreaterThan(0);
    expect(intel?.faqs.every((faq) => !faq.answer.includes("[[TBD"))).toBe(true);
  });

  it("places Island Peak in peak climbing, not trekking", () => {
    const peaks = activityIntel("peak-climbing");
    expect(peaks?.published.map((trip) => trip.slug)).toContain("island-peak-climbing");
    expect(activityHeroCopy("peak-climbing").title).toMatch(/Trekking peaks/i);
  });

  it("fills previously empty wildlife and pilgrimage registers from sourced trips", () => {
    expect(activityIntel("wildlife")?.drafts.length).toBeGreaterThan(0);
    expect(activityIntel("pilgrimage")?.drafts.length).toBeGreaterThan(0);
    expect(activityIntel("heli-treks")?.drafts.length).toBeGreaterThan(0);
  });

  it("drops a degenerate wildlife altitude chip instead of 1400–1400 m", () => {
    const wildlife = activityIntel("wildlife");
    expect(altitudeChip(wildlife?.minAltitudeM, wildlife?.maxAltitudeM)).toBeNull();
    expect(altitudeChip(3210, 5545)).toBe("3210–5545 m");
    expect(altitudeChip(1400, 1400)).toBeNull();
  });
});

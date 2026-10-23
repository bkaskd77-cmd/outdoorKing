import { describe, expect, it } from "vitest";

import { galleryForActivity, galleryForTrip, heroPicture } from "./media";

describe("cinematic media helpers", () => {
  it("gives flagship trips their own landscape hero, not the shared composite", () => {
    expect(heroPicture("everest-base-camp-trek", "EBC").src).toContain("ebc-1");
    expect(heroPicture("annapurna-circuit-trek", "Annapurna").src).toContain("trek-3");
    expect(heroPicture("island-peak-climbing", "Island Peak").src).toContain("ebc-4");
  });

  it("keeps Island Peak in the high-country gallery", () => {
    const peak = galleryForTrip("island-peak-climbing", "peak-climbing");
    expect(peak.some((item) => item.src.includes("ebc-4"))).toBe(true);
    expect(galleryForActivity("peak-climbing")).toEqual(peak);
  });
});

import { describe, expect, it } from "vitest";

import { cardPicture, galleryForActivity, galleryForTrip, heroPicture } from "./media";

describe("cinematic media helpers", () => {
  it("gives home journeys distinct catalog landscapes, not invented portraits", () => {
    expect(cardPicture("annapurna-base-camp-trek", "ABC").src).toContain("trekking");
    expect(cardPicture("manaslu-circuit-trek", "Manaslu").src).toContain("ebc-2");
    expect(cardPicture("langtang-valley-trek", "Langtang").src).toContain("trek-1");
  });

  it("gives flagship trips their own landscape hero, not the shared composite", () => {
    expect(heroPicture("everest-base-camp-trek", "EBC").src).toContain("ebc-1");
    expect(heroPicture("annapurna-circuit-trek", "Annapurna").src).toContain("trek-3");
    expect(heroPicture("island-peak-climbing", "Island Peak").src).toContain("ebc-4");
  });

  it("keeps Island Peak in the high-country gallery", () => {
    const peak = galleryForTrip("island-peak-climbing", "peak-climbing");
    expect(peak.some((item) => item.src.includes("ebc-4"))).toBe(true);
  });

  it("does not reuse the stupa composite on wildlife, peaks, or heli hubs", () => {
    expect(heroPicture("wildlife", "Wildlife").src).toContain("wildlife-1");
    expect(heroPicture("peak-climbing", "Peak climbing").src).toContain("peak-1");
    expect(heroPicture("heli-treks", "Heli treks").src).toContain("heli-1");
    expect(galleryForActivity("wildlife")[0]?.src).toContain("wildlife-1");
    expect(galleryForActivity("peak-climbing")[0]?.src).toContain("peak-1");
    expect(galleryForActivity("heli-treks")[0]?.src).toContain("heli-1");
  });
});

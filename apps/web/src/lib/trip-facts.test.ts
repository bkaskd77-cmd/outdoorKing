import { describe, expect, it } from "vitest";

import { tripFacts } from "./trip-facts";

describe("tripFacts", () => {
  it("reads as one short line", () => {
    expect(
      tripFacts({ durationTypical: 14, maxAltitudeM: 5364, difficulty: "strenuous" }),
    ).toBe("14 days · up to 5,364 m · Strenuous");
  });

  it("uses the singular for a one-day trip", () => {
    expect(
      tripFacts({ durationTypical: 1, maxAltitudeM: 1400, difficulty: "easy" }),
    ).toBe("1 day · up to 1,400 m · Easy");
  });
});

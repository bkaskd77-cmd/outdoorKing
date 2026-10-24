import { describe, expect, it } from "vitest";

import {
  gapsForStep,
  gapsUntilStep,
  resolvedDurationDays,
  resolvedEarliestStart,
} from "./wizard-gaps";

const base = {
  activitySlugs: [] as string[],
  freeText: "",
  durationBand: "any" as const,
  durationDays: 0,
  earliestStart: "",
  latestStart: "",
  travelMonth: "",
  adults: 0,
  children: 0,
  experience: "",
  maxPriorAltitudeM: "",
  pace: "",
  name: "",
  email: "",
};

describe("wizard gaps", () => {
  it("requires an activity on the journey step", () => {
    const gaps = gapsForStep(1, base);
    expect(gaps.map((g) => g.id)).toEqual(["activity"]);
  });

  it("lets Not sure continue without a description", () => {
    expect(gapsForStep(1, { ...base, activitySlugs: ["not-sure"] })).toEqual([]);
  });

  it("lets Trek continue without region, days, trip, or description", () => {
    expect(gapsForStep(1, { ...base, activitySlugs: ["trekking"] })).toEqual([]);
  });

  it("requires a month or dates, and a duration when days is Any length", () => {
    const empty = gapsForStep(2, { ...base, activitySlugs: ["trekking"] });
    expect(empty.map((g) => g.id)).toEqual(["window", "duration"]);
    expect(
      gapsForStep(2, {
        ...base,
        activitySlugs: ["trekking"],
        travelMonth: "2026-10",
        durationDays: 12,
      }),
    ).toEqual([]);
    expect(
      gapsForStep(2, {
        ...base,
        activitySlugs: ["trekking"],
        earliestStart: "2026-04-10",
        durationBand: "8-14",
      }),
    ).toEqual([]);
  });

  it("requires a party of at least one and experience or prior altitude", () => {
    expect(gapsForStep(3, { ...base, adults: 0 }).map((g) => g.id)).toEqual([
      "party",
      "experience",
    ]);
    expect(gapsForStep(3, { ...base, adults: 1, experience: "regular" })).toEqual([]);
    expect(gapsForStep(3, { ...base, adults: 1, maxPriorAltitudeM: "3500" })).toEqual([]);
  });

  it("requires pace and nothing else on style", () => {
    expect(gapsForStep(4, base).map((g) => g.id)).toEqual(["pace"]);
    expect(gapsForStep(4, { ...base, pace: "balanced" })).toEqual([]);
  });

  it("requires name and email on details", () => {
    const gaps = gapsForStep(6, base, { privacy: true });
    expect(gaps.map((g) => g.id)).toEqual(["name", "email"]);
    expect(
      gapsForStep(
        6,
        { ...base, name: "Bikash Tester", email: "bikash@example.com" },
        { privacy: true },
      ),
    ).toEqual([]);
  });

  it("collects earlier gaps when skipping ahead", () => {
    const gaps = gapsUntilStep(1, 3, { ...base, activitySlugs: ["trekking"] });
    expect(gaps.map((g) => g.id)).toEqual(["window", "duration"]);
  });

  it("derives a catalog duration and a month start", () => {
    expect(resolvedDurationDays({ durationBand: "8-14", durationDays: 0 })).toBe(14);
    expect(
      resolvedEarliestStart({
        earliestStart: "",
        latestStart: "",
        travelMonth: "2026-10",
      }),
    ).toBe("2026-10-01");
  });
});

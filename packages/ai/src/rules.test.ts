import { describe, expect, it } from "vitest";

import { assertPublishable, evaluateItinerary, type ItineraryDayInput } from "./rules";

function day(
  partial: Partial<ItineraryDayInput> &
    Pick<ItineraryDayInput, "dayNumber" | "sleepAltitudeM">,
): ItineraryDayInput {
  const sleep = partial.sleepAltitudeM;
  return {
    title: `Day ${String(partial.dayNumber)}`,
    startAltitudeM: partial.startAltitudeM ?? sleep,
    highPointM: partial.highPointM ?? sleep,
    dayType: partial.dayType ?? "trek",
    ...partial,
  };
}

describe("altitude rule engine", () => {
  it("measures gain from the highest night in the last week", () => {
    const report = evaluateItinerary([
      day({ dayNumber: 1, sleepAltitudeM: 3500 }),
      day({ dayNumber: 2, sleepAltitudeM: 4000 }),
      day({ dayNumber: 3, sleepAltitudeM: 4400 }),
      day({ dayNumber: 4, sleepAltitudeM: 3300 }),
      day({ dayNumber: 5, sleepAltitudeM: 4300 }),
    ]);
    expect(report.violations.some((v) => v.id === "ALT-001")).toBe(false);
  });

  it("makes a fast gain straight after an acclimatisation day advice", () => {
    const report = evaluateItinerary([
      day({ dayNumber: 1, sleepAltitudeM: 3050 }),
      day({ dayNumber: 2, sleepAltitudeM: 3050, dayType: "rest-acclimatization" }),
      day({ dayNumber: 3, sleepAltitudeM: 3800 }),
    ]);
    expect(report.violations.some((v) => v.id === "ALT-001")).toBe(false);
    expect(report.warnings.some((v) => v.id === "ALT-001")).toBe(true);
  });

  it("still blocks a fast gain to a new highest night", () => {
    const report = evaluateItinerary([
      day({ dayNumber: 1, sleepAltitudeM: 3500 }),
      day({ dayNumber: 2, sleepAltitudeM: 3300 }),
      day({ dayNumber: 3, sleepAltitudeM: 4100 }),
    ]);
    expect(report.violations.some((v) => v.id === "ALT-001")).toBe(true);
  });

  it("makes fast gains on expeditions advice, not blockers", () => {
    const report = evaluateItinerary(
      [
        day({ dayNumber: 1, sleepAltitudeM: 5200 }),
        day({ dayNumber: 2, sleepAltitudeM: 6400, toPlace: "Camp 2" }),
      ],
      { expedition: true },
    );
    expect(report.violations.some((v) => v.id === "ALT-001")).toBe(false);
    expect(report.warnings.some((v) => v.id === "ALT-001")).toBe(true);
  });

  it("makes peak-climb moves into tented camps advice, but not teahouse nights", () => {
    const camp = evaluateItinerary(
      [
        day({ dayNumber: 1, sleepAltitudeM: 3300 }),
        day({ dayNumber: 2, sleepAltitudeM: 4400, toPlace: "Base Camp (tents)" }),
      ],
      { peakClimb: true },
    );
    expect(camp.violations.some((v) => v.id === "ALT-001")).toBe(false);
    const village = evaluateItinerary(
      [
        day({ dayNumber: 1, sleepAltitudeM: 3300 }),
        day({ dayNumber: 2, sleepAltitudeM: 4400, toPlace: "Ledar" }),
      ],
      { peakClimb: true },
    );
    expect(village.violations.some((v) => v.id === "ALT-001")).toBe(true);
  });

  it("blocks ALT-001 when sleep gain above 3,000 m exceeds the threshold", () => {
    const report = evaluateItinerary([
      day({ dayNumber: 1, sleepAltitudeM: 1400, dayType: "city" }),
      day({ dayNumber: 2, sleepAltitudeM: 3100 }),
      day({ dayNumber: 3, sleepAltitudeM: 3900 }),
    ]);
    expect(report.violations.some((v) => v.id === "ALT-001")).toBe(true);
    expect(() => assertPublishable(report)).toThrow(/ALT-001/);
  });

  it("allows the Lukla fly-in then descend pattern as ALT-003 warning", () => {
    const report = evaluateItinerary(
      [
        day({
          dayNumber: 1,
          sleepAltitudeM: 2610,
          highPointM: 2860,
          dayType: "flight",
          title: "Lukla to Phakding",
        }),
      ],
      { usesLukla: true },
    );
    expect(report.violations.some((v) => v.id === "ALT-003")).toBe(false);
    expect(report.warnings.some((v) => v.id === "ALT-003")).toBe(false);
  });

  it("requires a Lukla contingency day (LOG-001)", () => {
    const report = evaluateItinerary(
      [
        day({ dayNumber: 1, sleepAltitudeM: 1400, dayType: "city" }),
        day({ dayNumber: 2, sleepAltitudeM: 2610, dayType: "flight" }),
      ],
      { usesLukla: true },
    );
    expect(report.violations.some((v) => v.id === "LOG-001")).toBe(true);
  });

  it("records climb-high-sleep-low as ALT-004 info", () => {
    const report = evaluateItinerary([
      day({
        dayNumber: 1,
        sleepAltitudeM: 3440,
        highPointM: 3880,
        dayType: "rest-acclimatization",
      }),
    ]);
    expect(report.infos.some((v) => v.id === "ALT-004")).toBe(true);
  });

  it("blocks a summit without a reserve day (ALT-007)", () => {
    const report = evaluateItinerary([
      day({
        dayNumber: 1,
        sleepAltitudeM: 5087,
        highPointM: 6165,
        dayType: "summit",
        peakHeightM: 6165,
        hasPeakPermit: true,
      }),
    ]);
    expect(report.violations.some((v) => v.id === "ALT-007")).toBe(true);
  });
});

import { describe, expect, it } from "vitest";

import { checkTrip, publishRefusal, type SafetyDay } from "./safety";

const day = (
  dayNumber: number,
  sleepAltitudeM: number,
  extra: Partial<SafetyDay> = {},
) => ({
  dayNumber,
  title: `Day ${String(dayNumber)}`,
  startAltitudeM: sleepAltitudeM,
  highPointM: sleepAltitudeM,
  sleepAltitudeM,
  dayType: "trek",
  ...extra,
});

describe("checkTrip", () => {
  const gentle = [day(1, 1400), day(2, 2600), day(3, 2900), day(4, 3400)];

  it("passes a gentle itinerary whose max altitude matches", () => {
    const result = checkTrip({ maxAltitudeM: 3400 }, gentle);
    expect(result.problems).toEqual([]);
    expect(result.itineraryMaxM).toBe(3400);
  });

  it("explains a max altitude that does not match the itinerary", () => {
    const result = checkTrip({ maxAltitudeM: 5545 }, gentle);
    expect(result.problems[0]?.message).toBe(
      "Max altitude says 5,545 m but the highest point in the itinerary is 3,400 m. Make them match.",
    );
  });

  it("names multi-day blocks by their label", () => {
    const result = checkTrip({ maxAltitudeM: 4600 }, [
      ...gentle,
      day(5, 4600, { dayLabel: "5-8" }),
    ]);
    expect(result.problems.map((p) => p.message).join(" ")).toContain(
      "on day 5-8, from 3400 m to 4600 m",
    );
  });

  it("needs a spare day when the trip flies to Lukla", () => {
    const result = checkTrip({ maxAltitudeM: 3400, usesLukla: true }, gentle);
    expect(result.problems.map((p) => p.id)).toContain("LOG-001");
  });

  it("has nothing to check without days", () => {
    expect(checkTrip({ maxAltitudeM: 5000 }, []).problems).toEqual([]);
  });

  it("lists every problem in the refusal, one per comma for the error toast", () => {
    const message = publishRefusal(
      checkTrip({ maxAltitudeM: 9000, usesLukla: true }, gentle),
    );
    const [, list = ""] = message.split(": ");
    expect(list.split(",")).toHaveLength(2);
    expect(list).toContain("Max altitude says 9000 m but the highest point");
  });
});

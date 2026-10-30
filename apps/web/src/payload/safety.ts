import {
  evaluateItinerary,
  type DayType,
  type RuleFinding,
  type RuleReport,
} from "@ok/ai/rules";

import { climbingOptions } from "../content/climbing";

export type SafetyDay = {
  dayNumber?: number | null;
  dayLabel?: string | null;
  title?: string | null;
  fromPlace?: string | null;
  toPlace?: string | null;
  startAltitudeM?: number | null;
  highPointM?: number | null;
  sleepAltitudeM?: number | null;
  dayType?: string | null;
};

export type SafetyTrip = {
  maxAltitudeM?: number | null;
  usesLukla?: boolean | null;
  /** Activity slug; expeditions and peak climbs use the climbing rule options. */
  activity?: string;
};

export type SafetyProblem = { id: string; message: string; dayNumber?: number };

export type SafetyResult = {
  /** Problems that block publishing. */
  problems: SafetyProblem[];
  /** Advice that does not block publishing. */
  warnings: SafetyProblem[];
  /** Highest point in the itinerary, if it has days. */
  itineraryMaxM?: number;
  /** The full rule report, stored on the trip when it publishes. */
  report?: RuleReport;
};

function metres(value: number): string {
  return `${value.toLocaleString("en-US")} m`;
}

function plain(finding: RuleFinding): SafetyProblem {
  return {
    id: finding.id,
    message: finding.message,
    ...(finding.dayNumber === undefined ? {} : { dayNumber: finding.dayNumber }),
  };
}

/**
 * The publish gate for a trip: altitude and logistics rules over its itinerary days,
 * plus the trip's stated maximum altitude matching the itinerary.
 */
export function checkTrip(trip: SafetyTrip, days: SafetyDay[]): SafetyResult {
  if (days.length === 0) return { problems: [], warnings: [] };

  const itineraryMaxM = Math.max(
    ...days.map((d) => Math.max(d.highPointM ?? 0, d.sleepAltitudeM ?? 0)),
  );
  const problems: SafetyProblem[] = [];
  if (typeof trip.maxAltitudeM === "number" && trip.maxAltitudeM !== itineraryMaxM) {
    problems.push({
      id: "MAX-ALT",
      message: `Max altitude says ${metres(trip.maxAltitudeM)} but the highest point in the itinerary is ${metres(itineraryMaxM)}. Make them match.`,
    });
  }

  const report = evaluateItinerary(
    days.map((d) => ({
      dayNumber: d.dayNumber ?? 0,
      ...(d.dayLabel ? { dayLabel: d.dayLabel } : {}),
      title: d.title ?? "",
      fromPlace: d.fromPlace ?? undefined,
      toPlace: d.toPlace ?? undefined,
      startAltitudeM: d.startAltitudeM ?? d.sleepAltitudeM ?? 0,
      highPointM: d.highPointM ?? d.sleepAltitudeM ?? 0,
      sleepAltitudeM: d.sleepAltitudeM ?? 0,
      dayType: (d.dayType ?? "trek") as DayType,
    })),
    { usesLukla: Boolean(trip.usesLukla), ...climbingOptions(trip.activity) },
  );

  return {
    problems: [...problems, ...report.violations.map(plain)],
    warnings: report.warnings.map(plain),
    itineraryMaxM,
    report,
  };
}

/**
 * The error shown when publishing is refused. Payload's error toast lists the parts of
 * "Intro: one, two, three" as bullets, so each problem is kept free of commas.
 */
export function publishRefusal(result: SafetyResult): string {
  const items = result.problems.map((p) =>
    p.message
      .replace(/(\d),(\d{3})/g, "$1$2")
      .replaceAll(", ", " – ")
      .replaceAll(",", ""),
  );
  return `This trip can't be published until its safety check passes. Save it as a draft and fix: ${items.join(", ")}`;
}

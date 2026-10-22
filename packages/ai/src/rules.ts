export const RULESET_VERSION = "2026.10.1";

export type DayType =
  | "trek"
  | "rest-acclimatization"
  | "summit"
  | "travel"
  | "flight"
  | "contingency"
  | "city";

export type ItineraryDayInput = {
  dayNumber: number;
  title: string;
  fromPlace?: string;
  toPlace?: string;
  startAltitudeM: number;
  highPointM: number;
  sleepAltitudeM: number;
  dayType: DayType;
  peakHeightM?: number;
  hasPeakPermit?: boolean;
};

export type RuleSeverity = "error" | "warn" | "info";

export type RuleFinding = {
  id: string;
  severity: RuleSeverity;
  message: string;
  dayNumber?: number;
};

export type RuleReport = {
  version: typeof RULESET_VERSION;
  violations: RuleFinding[];
  warnings: RuleFinding[];
  infos: RuleFinding[];
  score: number;
  explanations: { id: string; text: string }[];
};

export type SafetyThresholds = {
  maxSleepGainAbove3000M: number;
  restEveryDays: number;
  restEverySleepGainM: number;
  firstNightMaxM: number;
  luklaSleepM: number;
  climbHighDeltaM: number;
  highSleepWarnM: number;
  highSleepConsecutiveNights: number;
  noviceAltitudeM: number;
};

export const defaultThresholds: SafetyThresholds = {
  maxSleepGainAbove3000M: 550,
  restEveryDays: 4,
  restEverySleepGainM: 1000,
  firstNightMaxM: 2750,
  luklaSleepM: 2860,
  climbHighDeltaM: 600,
  highSleepWarnM: 5000,
  highSleepConsecutiveNights: 2,
  noviceAltitudeM: 3500,
};

export type EvaluateOptions = {
  thresholds?: Partial<SafetyThresholds>;
  usesLukla?: boolean;
  durationMin?: number;
  durationMax?: number;
  partyMaxPriorAltitudeM?: number;
};

function finding(
  id: string,
  severity: RuleSeverity,
  message: string,
  dayNumber?: number,
): RuleFinding {
  return { id, severity, message, dayNumber };
}

export function evaluateItinerary(
  days: ItineraryDayInput[],
  options: EvaluateOptions = {},
): RuleReport {
  const t = { ...defaultThresholds, ...options.thresholds };
  const ordered = [...days].sort((a, b) => a.dayNumber - b.dayNumber);
  const violations: RuleFinding[] = [];
  const warnings: RuleFinding[] = [];
  const infos: RuleFinding[] = [];

  const push = (item: RuleFinding) => {
    if (item.severity === "error") violations.push(item);
    else if (item.severity === "warn") warnings.push(item);
    else infos.push(item);
  };

  if (ordered.length === 0) {
    push(finding("LOG-002", "error", "Itinerary has no days."));
  }

  const firstSleep = ordered[0]?.sleepAltitudeM ?? 0;
  if (firstSleep > t.firstNightMaxM) {
    const luklaException = Boolean(options.usesLukla) && firstSleep <= t.luklaSleepM + 20;
    push(
      finding(
        "ALT-003",
        luklaException ? "warn" : "error",
        luklaException
          ? `First night ${String(firstSleep)} m is a Lukla fly-in exception (descend if possible).`
          : `First night ${String(firstSleep)} m exceeds ${String(t.firstNightMaxM)} m.`,
        ordered[0]?.dayNumber,
      ),
    );
  }

  let daysSinceRest = 0;
  let sleepGainAbove3000 = 0;
  let highSleepStreak = 0;

  for (let i = 0; i < ordered.length; i += 1) {
    const day = ordered[i];
    if (!day) continue;
    const prev = ordered[i - 1];

    if (day.dayType === "rest-acclimatization") {
      daysSinceRest = 0;
      const delta = day.highPointM - day.sleepAltitudeM;
      if (delta > 0 && delta <= t.climbHighDeltaM) {
        push(
          finding(
            "ALT-004",
            "info",
            `Climb high, sleep low on day ${String(day.dayNumber)}: high ${String(day.highPointM)} m, sleep ${String(day.sleepAltitudeM)} m.`,
            day.dayNumber,
          ),
        );
      }
    } else if (day.sleepAltitudeM >= 3000) {
      if (prev && day.sleepAltitudeM + 200 < prev.sleepAltitudeM) {
        daysSinceRest = 0;
      } else {
        daysSinceRest += 1;
      }
    } else {
      daysSinceRest = 0;
    }

    if (prev && prev.sleepAltitudeM >= 3000 && day.sleepAltitudeM > prev.sleepAltitudeM) {
      const gain = day.sleepAltitudeM - prev.sleepAltitudeM;
      sleepGainAbove3000 += gain;
      if (gain > t.maxSleepGainAbove3000M) {
        push(
          finding(
            "ALT-001",
            "error",
            `Sleeping altitude rises ${String(gain)} m (over ${String(t.maxSleepGainAbove3000M)} m) from day ${String(prev.dayNumber)} to ${String(day.dayNumber)}.`,
            day.dayNumber,
          ),
        );
      }
    }

    if (daysSinceRest > t.restEveryDays && day.sleepAltitudeM >= 3000) {
      push(
        finding(
          "ALT-002",
          "error",
          `No rest/acclimatization day in ${String(daysSinceRest)} days above 3,000 m (day ${String(day.dayNumber)}).`,
          day.dayNumber,
        ),
      );
    }
    if (sleepGainAbove3000 >= t.restEverySleepGainM) {
      const recentRest = ordered
        .slice(Math.max(0, i - t.restEveryDays), i + 1)
        .some((d) => d.dayType === "rest-acclimatization");
      if (!recentRest) {
        push(
          finding(
            "ALT-002",
            "error",
            `About ${String(sleepGainAbove3000)} m of sleep gain above 3,000 m without a rest day.`,
            day.dayNumber,
          ),
        );
      }
      sleepGainAbove3000 = 0;
    }

    if (day.sleepAltitudeM > t.highSleepWarnM) {
      highSleepStreak += 1;
      if (highSleepStreak > t.highSleepConsecutiveNights) {
        push(
          finding(
            "ALT-005",
            "warn",
            `Sleeping above ${String(t.highSleepWarnM)} m for ${String(highSleepStreak)} consecutive nights.`,
            day.dayNumber,
          ),
        );
      }
    } else {
      highSleepStreak = 0;
    }

    if (day.dayType === "summit") {
      if (day.peakHeightM !== undefined && day.highPointM > day.peakHeightM) {
        push(
          finding(
            "ALT-007",
            "error",
            `Summit high point ${String(day.highPointM)} m exceeds peak height ${String(day.peakHeightM)} m.`,
            day.dayNumber,
          ),
        );
      }
      if (day.hasPeakPermit === false) {
        push(
          finding(
            "PRM-001",
            "error",
            "Summit day is missing the required peak permit.",
            day.dayNumber,
          ),
        );
      }
      const hasReserve = ordered.some(
        (d) => d.dayType === "contingency" && d.dayNumber > day.dayNumber,
      );
      if (!hasReserve) {
        push(
          finding(
            "ALT-007",
            "error",
            "Summit day requires a later reserve/contingency day.",
            day.dayNumber,
          ),
        );
      }
    }

    if (prev && prev.toPlace && day.fromPlace && prev.toPlace !== day.fromPlace) {
      push(
        finding(
          "LOG-003",
          "error",
          `Place continuity break: day ${String(prev.dayNumber)} ends at ${prev.toPlace}, day ${String(day.dayNumber)} starts at ${day.fromPlace}.`,
          day.dayNumber,
        ),
      );
    }
  }

  if (
    options.partyMaxPriorAltitudeM !== undefined &&
    options.partyMaxPriorAltitudeM < t.noviceAltitudeM
  ) {
    const before4000 = ordered.find((d) => d.sleepAltitudeM >= 4000);
    const restBefore = ordered.some(
      (d) => d.dayType === "rest-acclimatization" && d.sleepAltitudeM < 4000,
    );
    if (before4000 && !restBefore) {
      push(
        finding(
          "ALT-006",
          "warn",
          "Party has no prior altitude above 3,500 m; add an extra rest day before 4,000 m.",
          before4000.dayNumber,
        ),
      );
    }
  }

  if (options.usesLukla) {
    const hasContingency = ordered.some((d) => d.dayType === "contingency");
    if (!hasContingency) {
      push(
        finding(
          "LOG-001",
          "error",
          "Lukla/Ramechhap itineraries need at least one contingency day before international departure.",
        ),
      );
    }
  }

  if (options.durationMin !== undefined && options.durationMax !== undefined) {
    const span = ordered.length;
    if (span < options.durationMin || span > options.durationMax) {
      push(
        finding(
          "LOG-002",
          "warn",
          `Itinerary length ${String(span)} is outside ${String(options.durationMin)}–${String(options.durationMax)} days.`,
        ),
      );
    }
  }

  const explanations = [
    ...violations,
    ...warnings,
    ...infos.filter((i) => i.id === "ALT-004"),
  ].map((item) => ({ id: item.id, text: item.message }));

  const score = Math.max(0, 100 - violations.length * 20 - warnings.length * 5);

  return {
    version: RULESET_VERSION,
    violations,
    warnings,
    infos,
    score,
    explanations,
  };
}

export function assertPublishable(report: RuleReport): void {
  if (report.violations.length > 0) {
    const ids = report.violations.map((v) => v.id).join(", ");
    throw new Error(`Cannot publish: ${ids}`);
  }
}

function renumber(days: ItineraryDayInput[]): ItineraryDayInput[] {
  return days.map((day, index) => ({ ...day, dayNumber: index + 1 }));
}

function insertAfter(
  days: ItineraryDayInput[],
  afterDayNumber: number,
  extra: Omit<ItineraryDayInput, "dayNumber">,
): ItineraryDayInput[] {
  const index = days.findIndex((d) => d.dayNumber === afterDayNumber);
  const next = [...days];
  const at = index >= 0 ? index + 1 : next.length;
  next.splice(at, 0, { ...extra, dayNumber: at + 1 });
  return renumber(next);
}

/** Deterministic auto-fix: insert rest/contingency days and repair place continuity. */
export function autoFixItinerary(
  days: ItineraryDayInput[],
  options: EvaluateOptions = {},
): { days: ItineraryDayInput[]; report: RuleReport; applied: string[] } {
  let current = renumber(days);
  const applied: string[] = [];
  for (let pass = 0; pass < 8; pass += 1) {
    const report = evaluateItinerary(current, options);
    const error = report.violations[0];
    if (!error) return { days: current, report, applied };

    if (error.id === "LOG-003") {
      current = current.map((day, i) => {
        const prev = current[i - 1];
        if (!prev?.toPlace) return day;
        return { ...day, fromPlace: prev.toPlace };
      });
      applied.push("LOG-003");
      continue;
    }

    if (
      error.id === "LOG-001" ||
      (error.id === "ALT-007" && error.message.includes("reserve"))
    ) {
      const last = current[current.length - 1];
      if (!last) break;
      current = insertAfter(current, last.dayNumber, {
        title: "Contingency / buffer day",
        fromPlace: last.toPlace,
        toPlace: last.toPlace,
        startAltitudeM: last.sleepAltitudeM,
        highPointM: last.sleepAltitudeM,
        sleepAltitudeM: last.sleepAltitudeM,
        dayType: "contingency",
      });
      applied.push(error.id);
      continue;
    }

    if (error.id === "ALT-001" || error.id === "ALT-002") {
      const target = current.find((d) => d.dayNumber === error.dayNumber) ?? current[1];
      const prev =
        current.find((d) => d.dayNumber === (target?.dayNumber ?? 2) - 1) ?? current[0];
      if (!prev) break;
      current = insertAfter(current, prev.dayNumber, {
        title: `Acclimatisation at ${prev.toPlace ?? prev.title}`,
        fromPlace: prev.toPlace,
        toPlace: prev.toPlace,
        startAltitudeM: prev.sleepAltitudeM,
        highPointM: Math.min(prev.sleepAltitudeM + 400, prev.highPointM + 200),
        sleepAltitudeM: prev.sleepAltitudeM,
        dayType: "rest-acclimatization",
      });
      applied.push(error.id);
      continue;
    }

    break;
  }
  return { days: current, report: evaluateItinerary(current, options), applied };
}

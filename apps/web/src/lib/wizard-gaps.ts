import { isChooserActivity, type DurationBandId } from "@/lib/trip-chooser";

export type WizardGap = { id: string; message: string };

export type WizardGapValues = {
  activitySlugs: readonly string[];
  freeText: string;
  durationBand: DurationBandId;
  durationDays: number;
  earliestStart: string;
  latestStart: string;
  travelMonth: string;
  adults: number;
  children: number;
  experience: string;
  maxPriorAltitudeM: string;
  pace: string;
  name: string;
  email: string;
};

const EXPERIENCE = new Set(["first-multi-day", "regular", "high-altitude", "technical"]);
const PACES = new Set(["relaxed", "balanced", "ambitious"]);

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isYearMonth(value: string): boolean {
  if (!/^\d{4}-\d{2}$/.test(value)) return false;
  const month = Number(value.slice(5, 7));
  return month >= 1 && month <= 12;
}

export function hasTimeWindow(
  values: Pick<WizardGapValues, "earliestStart" | "latestStart" | "travelMonth">,
): boolean {
  return (
    isIsoDate(values.earliestStart) ||
    isIsoDate(values.latestStart) ||
    isYearMonth(values.travelMonth)
  );
}

export function hasDuration(
  values: Pick<WizardGapValues, "durationBand" | "durationDays">,
): boolean {
  if (values.durationBand !== "any") return true;
  return (
    Number.isInteger(values.durationDays) &&
    values.durationDays >= 5 &&
    values.durationDays <= 40
  );
}

export function resolvedDurationDays(
  values: Pick<WizardGapValues, "durationBand" | "durationDays">,
): number | undefined {
  if (Number.isInteger(values.durationDays) && values.durationDays >= 5) {
    return Math.min(40, values.durationDays);
  }
  switch (values.durationBand) {
    case "up-to-7":
      return 7;
    case "8-14":
      return 14;
    case "15-21":
      return 18;
    case "22-plus":
      return 22;
    default:
      return undefined;
  }
}

export function resolvedEarliestStart(
  values: Pick<WizardGapValues, "earliestStart" | "latestStart" | "travelMonth">,
): string | undefined {
  if (isIsoDate(values.earliestStart)) return values.earliestStart;
  if (isIsoDate(values.latestStart)) return values.latestStart;
  if (isYearMonth(values.travelMonth)) return `${values.travelMonth}-01`;
  return undefined;
}

export function gapsForStep(
  step: number,
  values: WizardGapValues,
  extras: { privacy?: boolean } = {},
): WizardGap[] {
  if (step === 1) {
    const activity = values.activitySlugs[0];
    const gaps: WizardGap[] = [];
    if (!isChooserActivity(activity)) {
      gaps.push({ id: "activity", message: "Choose an activity, or Not sure." });
    } else if (activity === "not-sure" && !values.freeText.trim()) {
      gaps.push({
        id: "description",
        message: "Describe the journey you have in mind.",
      });
    }
    return gaps;
  }

  if (step === 2) {
    const gaps: WizardGap[] = [];
    if (!hasTimeWindow(values)) {
      gaps.push({ id: "window", message: "Choose a month or add travel dates." });
    }
    if (!hasDuration(values)) {
      gaps.push({
        id: "duration",
        message: "Tell us how many days, or pick a length on the first step.",
      });
    }
    return gaps;
  }

  if (step === 3) {
    const gaps: WizardGap[] = [];
    if (values.adults + values.children < 1) {
      gaps.push({ id: "party", message: "Add at least one traveller." });
    }
    const hasExperience = EXPERIENCE.has(values.experience);
    const hasAltitude = values.maxPriorAltitudeM.trim() !== "";
    if (!hasExperience && !hasAltitude) {
      gaps.push({
        id: "experience",
        message: "Choose your experience, or the highest altitude you've slept at.",
      });
    }
    return gaps;
  }

  if (step === 4) {
    if (!PACES.has(values.pace)) {
      return [{ id: "pace", message: "Choose a pace." }];
    }
    return [];
  }

  if (step === 6) {
    const gaps: WizardGap[] = [];
    if (values.name.trim().length < 2) {
      gaps.push({ id: "name", message: "Add your name." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      gaps.push({ id: "email", message: "Add an email address." });
    }
    if (extras.privacy === false) {
      gaps.push({
        id: "privacy",
        message: "Confirm you've read the privacy policy.",
      });
    }
    return gaps;
  }

  return [];
}

export function gapsUntilStep(
  fromStep: number,
  toStep: number,
  values: WizardGapValues,
  extras: { privacy?: boolean } = {},
): WizardGap[] {
  if (toStep <= fromStep) return [];
  const gaps: WizardGap[] = [];
  for (let step = fromStep; step < toStep; step += 1) {
    gaps.push(...gapsForStep(step, values, extras));
  }
  return gaps;
}

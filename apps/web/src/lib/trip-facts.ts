import type { CatalogTrip } from "@/content/types";

type Difficulty = CatalogTrip["difficulty"];

/** The words and number format the fact lines use, in one language. */
export type FactLabels = {
  days: (count: number) => string;
  upTo: (height: string) => string;
  difficulty: Record<Difficulty, string>;
  /** A whole number, grouped the local way (5,545 or 5.545). */
  number: (value: number) => string;
};

const englishNumber = new Intl.NumberFormat("en-US");

export const englishFacts: FactLabels = {
  days: (count) => `${String(count)} ${count === 1 ? "day" : "days"}`,
  upTo: (height) => `up to ${height} m`,
  difficulty: {
    easy: "Easy",
    moderate: "Moderate",
    challenging: "Challenging",
    strenuous: "Strenuous",
    technical: "Technical",
  },
  number: (value) => englishNumber.format(value),
};

/** Below this the highest point is a town or lowland stop, not worth a mention. */
export const NOTABLE_ALTITUDE_M = 2000;

/**
 * One line for trip cards, e.g. "14 days · up to 5,364 m · Strenuous". Trips that stay
 * low leave the height out.
 */
export function tripFacts(
  trip: Pick<CatalogTrip, "durationTypical" | "maxAltitudeM" | "difficulty">,
  labels: FactLabels = englishFacts,
): string {
  const height =
    trip.maxAltitudeM >= NOTABLE_ALTITUDE_M
      ? labels.upTo(labels.number(trip.maxAltitudeM))
      : "";
  return [labels.days(trip.durationTypical), height, labels.difficulty[trip.difficulty]]
    .filter(Boolean)
    .join(" · ");
}

export function difficultyName(
  difficulty: Difficulty,
  labels: FactLabels = englishFacts,
): string {
  return labels.difficulty[difficulty];
}

import type { CatalogTrip } from "@/content/types";

const difficultyLabel: Record<CatalogTrip["difficulty"], string> = {
  easy: "Easy",
  moderate: "Moderate",
  challenging: "Challenging",
  strenuous: "Strenuous",
  technical: "Technical",
};

/** One line for trip cards, e.g. "14 days · up to 5,364 m · Strenuous". */
export function tripFacts(
  trip: Pick<CatalogTrip, "durationTypical" | "maxAltitudeM" | "difficulty">,
): string {
  const days = `${String(trip.durationTypical)} ${trip.durationTypical === 1 ? "day" : "days"}`;
  const height = `up to ${trip.maxAltitudeM.toLocaleString("en-US")} m`;
  return [days, height, difficultyLabel[trip.difficulty]].filter(Boolean).join(" · ");
}

export function difficultyName(difficulty: CatalogTrip["difficulty"]): string {
  return difficultyLabel[difficulty];
}

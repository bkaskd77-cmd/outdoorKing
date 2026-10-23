import type { DayType } from "./rules";
import type { DesignerParty } from "./schemas/itinerary-draft";

type DayLike = {
  dayNumber: number;
  title: string;
  toPlace?: string;
  sleepAltitudeM: number;
  dayType: DayType;
};

type TripLike = {
  seasons: string[];
  usesLukla: boolean;
};

export type PlanReason = { id: string; text: string };

export type SeasonFit = {
  month?: number;
  season?: string;
  tripSeasons: string[];
  fit: "good" | "poor" | "unknown";
  message: string;
};

export type PlannedItinerary = {
  days: (DayLike & {
    fromPlace: string;
    startAltitudeM: number;
    highPointM: number;
  })[];
  seasonFit: SeasonFit;
  reasons: PlanReason[];
};

export type PlanItineraryRequest = {
  days: PlannedItinerary["days"];
  month?: number;
  pace: "relaxed" | "steady" | "fast";
  maxPriorAltitudeM?: number;
  usesLukla: boolean;
  seasons: string[];
};

export type ItineraryPlanner = (
  input: PlanItineraryRequest,
) => Promise<PlannedItinerary | null>;

const SEASON_SPANS: Record<string, string> = {
  winter: "Dec–Feb",
  spring: "Mar–May",
  monsoon: "Jun–Aug",
  autumn: "Sep–Nov",
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function plannerPace(pace?: string): "relaxed" | "steady" | "fast" {
  if (pace === "relaxed") return "relaxed";
  if (pace === "fast" || pace === "ambitious") return "fast";
  return "steady";
}

export function seasonForMonth(month: number): string {
  if (month === 12 || month === 1 || month === 2) return "winter";
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "monsoon";
  return "autumn";
}

function seasonLabel(season: string): string {
  const span = SEASON_SPANS[season];
  return span ? `${season} (${span})` : season;
}

export function describeSeasonFit(
  month: number | undefined,
  tripSeasons: string[],
): SeasonFit {
  if (!month) {
    return {
      tripSeasons,
      fit: "unknown",
      message: "No travel month was given, so season fit is not scored.",
    };
  }
  const season = seasonForMonth(month);
  const named = tripSeasons.map(seasonLabel).join(", ") || "the trip's listed seasons";
  const monthLabel = MONTH_NAMES[month - 1] ?? `month ${String(month)}`;
  if (tripSeasons.length > 0 && tripSeasons.includes(season)) {
    return {
      month,
      season,
      tripSeasons,
      fit: "good",
      message: `${monthLabel} is ${seasonLabel(season)}, which fits this trip (${named}).`,
    };
  }
  return {
    month,
    season,
    tripSeasons,
    fit: "poor",
    message: `${monthLabel} is ${seasonLabel(season)}, which sits outside this trip's seasons: ${named}.`,
  };
}

/** Reasons for the catalog-and-autofix path when Python intel is down. */
export function explainCatalogPlan(
  days: DayLike[],
  trip: TripLike,
  party: DesignerParty,
): { seasonFit: SeasonFit; reasons: PlanReason[] } {
  const seasonFit = describeSeasonFit(party.month, trip.seasons);
  const reasons: PlanReason[] = [{ id: "SEASON", text: seasonFit.message }];
  const pace = plannerPace(party.pace);
  const rests = days.filter((day) => day.dayType === "rest-acclimatization");
  const restPlaces = [
    ...new Set(rests.map((day) => day.toPlace || day.title).filter(Boolean)),
  ];
  if (pace === "fast") {
    reasons.push({
      id: "ALT-002",
      text: restPlaces.length
        ? `Fast pace still keeps required rest at ${restPlaces.join(" and ")}. A shorter plan would skip a rest the altitude rules require.`
        : "Fast pace keeps rest days the safety rules require. A shorter plan would skip a rest after too much sleep gain above 3,000 m.",
    });
  } else if (pace === "relaxed") {
    reasons.push({
      id: "PACE",
      text: restPlaces.length
        ? `Relaxed pace keeps catalog acclimatisation at ${restPlaces.join(" and ")}.`
        : "Relaxed pace keeps the catalog days.",
    });
  } else {
    reasons.push({
      id: "PACE",
      text: restPlaces.length
        ? `Steady pace keeps the catalog days, including rest at ${restPlaces.join(" and ")}.`
        : "Steady pace keeps the catalog days, including sourced rest and contingency.",
    });
  }

  if (party.maxPriorAltitudeM !== undefined && party.maxPriorAltitudeM < 3500) {
    const firstHigh = days.find((day) => day.sleepAltitudeM >= 4000);
    const restBefore = days.find(
      (day) =>
        day.dayType === "rest-acclimatization" &&
        day.sleepAltitudeM < 4000 &&
        (firstHigh ? day.dayNumber < firstHigh.dayNumber : true),
    );
    if (restBefore) {
      reasons.push({
        id: "ALT-006",
        text: `A rest day at ${restBefore.toPlace || restBefore.title} sits before 4,000 m because prior sleep altitude is under 3,500 m.`,
      });
    }
  }

  if (days.some((day) => day.dayType === "summit")) {
    reasons.push({
      id: "ALT-007",
      text: "Summit day keeps a later reserve/contingency day on the itinerary.",
    });
  }
  if (trip.usesLukla || party.usesLuklaHint) {
    reasons.push({
      id: "LOG-001",
      text: "Lukla itineraries keep a contingency day before international departure.",
    });
  }
  return { seasonFit, reasons };
}

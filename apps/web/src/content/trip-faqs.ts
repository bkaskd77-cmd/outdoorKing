import type { CatalogTrip } from "./types";

/** Most questions shown on one trip page. */
const LIMIT = 5;

const ADVENTURE = new Set([
  "bungee-and-canyon-swing-adventure",
  "nepal-white-water-rafting",
  "pokhara-paragliding",
]);
const NEEDS_PERMIT_PAPERS = new Set(["bhutan-add-on-tour", "tibet-add-on-tour"]);

/**
 * The questions a trip page shows, most specific first: what this kind of journey
 * raises (flights, restricted areas, altitude, climbing, wildlife), then everyday
 * questions about life on the trail or on tour.
 */
export function faqsForTrip(
  trip: Pick<CatalogTrip, "slug" | "activity" | "maxAltitudeM" | "usesLukla" | "permits">,
): string[] {
  const lukla = trip.usesLukla ? ["lukla-flights"] : [];
  const restricted = trip.permits.some((slug) => slug.endsWith("-rap"))
    ? ["restricted-area-group"]
    : [];
  const high = trip.maxAltitudeM >= 3000;
  let wanted: string[];
  switch (trip.activity) {
    case "trekking":
      wanted = [
        ...lukla,
        ...restricted,
        high ? "how-hard-is-altitude" : "how-fit",
        "food-and-water",
        trip.maxAltitudeM >= 4000 ? "insurance-altitude" : "do-i-need-insurance",
        "toilets-and-showers",
        ...(trip.maxAltitudeM >= 4000 ? ["how-cold"] : []),
      ];
      break;
    case "peak-climbing":
      wanted = [
        "climbing-experience",
        ...lukla,
        "how-hard-is-altitude",
        "rent-gear",
        "turn-back",
        "insurance-altitude",
      ];
      break;
    case "expeditions":
      wanted = [
        "expedition-permit",
        ...lukla,
        ...restricted,
        "insurance-altitude",
        "rescue",
        "turn-back",
      ];
      break;
    case "heli-treks":
      wanted = [
        "helicopter-acclimatisation",
        "do-i-need-insurance",
        "best-season",
        "children-and-families",
      ];
      break;
    case "wildlife":
      wanted = [
        "wildlife-safety",
        "best-season",
        "children-and-families",
        "tour-fitness",
        "do-i-need-insurance",
      ];
      break;
    default:
      wanted = [
        ...(ADVENTURE.has(trip.slug) ? ["adventure-limits"] : []),
        ...(NEEDS_PERMIT_PAPERS.has(trip.slug) ? ["permit-documents"] : []),
        ...(high ? ["how-hard-is-altitude"] : ["tour-fitness"]),
        "best-season",
        "children-and-families",
        "change-itinerary",
        "do-i-need-insurance",
      ];
  }
  return [...new Set(wanted)].slice(0, LIMIT);
}

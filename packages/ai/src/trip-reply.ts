import { distinctiveTokens } from "./rag/tokens";
import type { CatalogIndex, Citation } from "./rag/types";
import { searchTrips } from "./tools";

type CatalogTrip = CatalogIndex["trips"][number];

const GENERIC = new Set([
  "trek",
  "trekking",
  "tour",
  "tours",
  "climb",
  "climbing",
  "peak",
  "expedition",
  "expeditions",
  "journey",
  "trip",
  "walk",
]);

function titleCaseRegion(region: string): string {
  if (region === "everest") return "Everest / Khumbu";
  return region
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function activityLabel(activity: string): { singular: string; plural: string } {
  if (activity === "trekking") return { singular: "trek", plural: "treks" };
  if (activity === "peak-climbing") return { singular: "climb", plural: "climbs" };
  if (activity === "expeditions")
    return { singular: "expedition", plural: "expeditions" };
  if (activity === "tours") return { singular: "tour", plural: "tours" };
  return { singular: "journey", plural: "journeys" };
}

function joinTitles(titles: string[]): string {
  if (titles.length === 1) return titles[0] ?? "";
  if (titles.length === 2) return `${titles[0]} and ${titles[1]}`;
  return `${titles.slice(0, -1).join(", ")}, and ${titles[titles.length - 1]}`;
}

function titleTokens(title: string): string[] {
  return distinctiveTokens(title).filter((token) => !GENERIC.has(token));
}

function isSpecificTrip(query: string, title: string): boolean {
  const needed = titleTokens(title);
  if (needed.length === 0) return false;
  const q = new Set(distinctiveTokens(query));
  return needed.every((token) => q.has(token));
}

function formatDays(days: number): string {
  return days === 1 ? "1 day" : `${String(days)} days`;
}

function formatMeters(meters: number): string {
  return `${new Intl.NumberFormat("en-US").format(meters)} m`;
}

function seasonPhrase(slugs: string[]): string | null {
  const labels = slugs
    .map((slug) => {
      if (slug === "spring") return "spring";
      if (slug === "autumn") return "autumn";
      if (slug === "winter") return "winter";
      if (slug === "monsoon") return "monsoon";
      return slug.replace(/[-_]/g, " ");
    })
    .filter(Boolean);
  if (labels.length === 0) return null;
  if (labels.length === 1) return `The usual season is ${labels[0]}.`;
  return `The usual seasons are ${joinTitles(labels)}.`;
}

function tripBySlug(catalog: CatalogIndex, slug: string): CatalogTrip | undefined {
  return catalog.trips.find((trip) => trip.slug === slug);
}

function describeOne(trip: CatalogTrip): string {
  const where = trip.regions.map(titleCaseRegion).join(", ");
  const kind = activityLabel(trip.activity).singular;
  const parts = [`${trip.title} is a private ${kind} in the ${where} region.`];
  if (trip.durationTypical != null) {
    parts.push(`It is typically ${formatDays(trip.durationTypical)}.`);
  }
  if (trip.maxAltitudeM != null) {
    parts.push(`The high point is ${formatMeters(trip.maxAltitudeM)}.`);
  }
  const seasons = seasonPhrase(trip.seasons);
  if (seasons) parts.push(seasons);
  parts.push("It is designed around your dates.");
  return parts.join(" ");
}

function tripContrast(trip: CatalogTrip): string {
  const daysBit =
    trip.durationTypical != null ? `typically ${formatDays(trip.durationTypical)}` : null;
  const altBit =
    trip.maxAltitudeM != null ? `up to ${formatMeters(trip.maxAltitudeM)}` : null;
  if (daysBit && altBit) return `${trip.title} is ${daysBit}, ${altBit}`;
  if (daysBit) return `${trip.title} is ${daysBit}`;
  if (altBit) return `${trip.title} reaches ${altBit}`;
  return trip.title;
}

function describeFamily(region: string, activity: string, family: CatalogTrip[]): string {
  const kind = activityLabel(activity).plural;
  const names = joinTitles(family.map((trip) => trip.title));
  const diffs = family.map(tripContrast).join(". ");
  return `Published ${titleCaseRegion(region)} ${kind} include ${names}. They differ in length and height. ${diffs}. Each is a private journey designed around your dates.`;
}

function familyRank(title: string): number {
  const name = title.toLowerCase();
  if (name.includes("circuit")) return 0;
  if (name.includes("base camp")) return 1;
  if (name.includes("poon hill")) return 2;
  return 3;
}

function queryNamesRegion(query: string, region: string): boolean {
  const q = distinctiveTokens(query);
  return q.some(
    (token) => token === region || token.includes(region) || region.includes(token),
  );
}

function citationsFor(trips: CatalogTrip[]): Citation[] {
  return trips.map((trip) => ({
    chunkId: `trip:${trip.slug}:0`,
    title: trip.title,
    url: `/trips/${trip.slug}`,
  }));
}

export function publicTripReply(
  catalog: CatalogIndex,
  message: string,
): { text: string; citations: Citation[] } {
  const hits = searchTrips(catalog, { text: message });
  const specificHit = hits.find((hit) => isSpecificTrip(message, hit.title));
  const specific = specificHit ? tripBySlug(catalog, specificHit.slug) : undefined;

  const luklaFlight =
    !specific &&
    /\blukla\b/i.test(message) &&
    /\b(flight|cancel|delay|buffer|contingency|weather)\b/i.test(message);
  if (luklaFlight) {
    const lukla = catalog.trips.filter((trip) => trip.usesLukla);
    const named = lukla[0]?.title ?? "Everest Base Camp Trek";
    return {
      text: `Several Khumbu journeys use the Lukla flight, including ${named}. We keep a contingency day because that flight can be delayed. Each journey is designed around your dates.`,
      citations: citationsFor(lukla.slice(0, 4)),
    };
  }

  const regionHits = new Map<string, number>();
  const activityHits = new Map<string, number>();
  for (const hit of hits) {
    for (const region of hit.regions) {
      regionHits.set(region, (regionHits.get(region) ?? 0) + 1);
    }
    activityHits.set(hit.activity, (activityHits.get(hit.activity) ?? 0) + 1);
  }
  const region = [...regionHits.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  const activity = [...activityHits.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

  const family =
    region && activity && queryNamesRegion(message, region)
      ? catalog.trips
          .filter((trip) => trip.regions.includes(region) && trip.activity === activity)
          .sort(
            (a, b) =>
              familyRank(a.title) - familyRank(b.title) || a.title.localeCompare(b.title),
          )
      : [];

  if (family.length >= 2 && !specific && region && activity) {
    return {
      text: describeFamily(region, activity, family),
      citations: citationsFor(family),
    };
  }

  const chosen = specific ?? (hits[0] ? tripBySlug(catalog, hits[0].slug) : undefined);
  if (!chosen) {
    return {
      text: "I'm not certain from our published pages — let me connect you with our team.",
      citations: [],
    };
  }
  return {
    text: describeOne(chosen),
    citations: citationsFor([chosen]),
  };
}

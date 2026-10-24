import { distinctiveTokens } from "./rag/tokens";
import type { CatalogIndex, Citation } from "./rag/types";
import { searchTrips } from "./tools";

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

function describeOne(title: string, activity: string, regions: string[]): string {
  const where = regions.map(titleCaseRegion).join(", ");
  const kind = activityLabel(activity).singular;
  return `${title} is a private ${kind} in the ${where} region. It is designed around your dates.`;
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

export function publicTripReply(
  catalog: CatalogIndex,
  message: string,
): { text: string; citations: Citation[] } {
  const hits = searchTrips(catalog, { text: message });
  const specific = hits.find((hit) => isSpecificTrip(message, hit.title));

  const luklaFlight =
    !specific &&
    /\blukla\b/i.test(message) &&
    /\b(flight|cancel|delay|buffer|contingency|weather)\b/i.test(message);
  if (luklaFlight) {
    const lukla = catalog.trips.filter((trip) => trip.usesLukla);
    const named = lukla[0]?.title ?? "Everest Base Camp Trek";
    return {
      text: `Several Khumbu journeys use the Lukla flight, including ${named}. We keep a contingency day because that flight can be delayed. Each journey is designed around your dates.`,
      citations: lukla.slice(0, 4).map((trip) => ({
        chunkId: `trip:${trip.slug}:0`,
        title: trip.title,
        url: `/trips/${trip.slug}`,
      })),
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
    const titles = family.map((trip) => trip.title);
    const kind = activityLabel(activity).plural;
    const text = `Published ${titleCaseRegion(region)} ${kind} include ${joinTitles(titles)}. Each is a private journey designed around your dates.`;
    return {
      text,
      citations: family.map((trip) => ({
        chunkId: `trip:${trip.slug}:0`,
        title: trip.title,
        url: `/trips/${trip.slug}`,
      })),
    };
  }

  const chosen = specific ?? hits[0];
  if (!chosen) {
    return {
      text: "I'm not certain from our published pages — let me connect you with our team.",
      citations: [],
    };
  }
  return {
    text: describeOne(chosen.title, chosen.activity, chosen.regions),
    citations: [
      {
        chunkId: `trip:${chosen.slug}:0`,
        title: chosen.title,
        url: chosen.url,
      },
    ],
  };
}

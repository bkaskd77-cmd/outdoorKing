export type ChooserTrip = {
  slug: string;
  title: string;
  activity: string;
  regions: string[];
  durationMin: number;
  durationMax: number;
};

export const DURATION_BANDS = [
  { id: "any", label: "Any length", min: null, max: null },
  { id: "up-to-7", label: "Up to 7 days", min: 1, max: 7 },
  { id: "8-14", label: "8–14", min: 8, max: 14 },
  { id: "15-21", label: "15–21", min: 15, max: 21 },
  { id: "22-plus", label: "22 days or more", min: 22, max: Number.POSITIVE_INFINITY },
] as const;

export type DurationBandId = (typeof DURATION_BANDS)[number]["id"];

export const CHOOSER_ACTIVITIES = [
  { slug: "trekking", label: "Trek" },
  { slug: "tours", label: "Tour" },
  { slug: "peak-climbing", label: "Peak" },
  { slug: "expeditions", label: "Expedition" },
  { slug: "not-sure", label: "Not sure" },
] as const;

export type ChooserActivitySlug = (typeof CHOOSER_ACTIVITIES)[number]["slug"];

const ACTIVITY_SLUGS = new Set<string>(CHOOSER_ACTIVITIES.map((item) => item.slug));

export type ChooserFilters = {
  activitySlug: string;
  regionSlugs: readonly string[];
  durationBand: DurationBandId;
};

export function isChooserActivity(slug: string | undefined): slug is ChooserActivitySlug {
  return Boolean(slug && ACTIVITY_SLUGS.has(slug));
}

export function isDurationBand(value: string | undefined): value is DurationBandId {
  return DURATION_BANDS.some((band) => band.id === value);
}

function bandById(id: DurationBandId) {
  return DURATION_BANDS.find((band) => band.id === id) ?? DURATION_BANDS[0];
}

export function durationOverlapsBand(
  trip: Pick<ChooserTrip, "durationMin" | "durationMax">,
  bandId: DurationBandId,
): boolean {
  const band = bandById(bandId);
  if (band.min == null || band.max == null) return true;
  return trip.durationMin <= band.max && trip.durationMax >= band.min;
}

export function filterChooserTrips(
  trips: readonly ChooserTrip[],
  filters: ChooserFilters,
): ChooserTrip[] {
  const activity = filters.activitySlug;
  const regions = filters.regionSlugs;
  return trips.filter((trip) => {
    if (activity && activity !== "not-sure" && trip.activity !== activity) return false;
    if (regions.length > 0 && !regions.some((region) => trip.regions.includes(region))) {
      return false;
    }
    return durationOverlapsBand(trip, filters.durationBand);
  });
}

export function matchingTripSlug(
  trips: readonly ChooserTrip[],
  slug: string | undefined,
): string {
  if (!slug) return "";
  return trips.some((trip) => trip.slug === slug) ? slug : "";
}

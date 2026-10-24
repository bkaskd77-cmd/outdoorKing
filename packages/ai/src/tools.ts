import { distinctiveTokens } from "./rag/tokens";
import type { BookingSnapshot, CatalogIndex, ConciergeSession } from "./rag/types";

function overlaps(query: string, hay: string): boolean {
  const needle = query.trim().toLowerCase();
  const h = hay.toLowerCase();
  if (needle.length > 3 && h.includes(needle)) return true;
  const distinctive = distinctiveTokens(query);
  if (distinctive.length === 0) return false;
  return distinctive.some((t) => h.includes(t));
}

export function searchTrips(
  catalog: CatalogIndex,
  query: {
    text?: string;
    region?: string;
    activity?: string;
  },
) {
  const needle = query.text ?? "";
  return catalog.trips
    .filter((trip) => {
      if (query.region && !trip.regions.includes(query.region)) return false;
      if (query.activity && trip.activity !== query.activity) return false;
      if (!needle.trim()) return true;
      const hay = `${trip.title} ${trip.slug} ${trip.regions.join(" ")} ${trip.activity} ${trip.overview ?? ""}`;
      return overlaps(needle, hay);
    })
    .slice(0, 8)
    .map((trip) => ({
      slug: trip.slug,
      title: trip.title,
      activity: trip.activity,
      regions: trip.regions,
      durationTypical: trip.durationTypical,
      url: `/trips/${trip.slug}`,
    }));
}

export function getTrip(catalog: CatalogIndex, slug: string) {
  const trip = catalog.trips.find((t) => t.slug === slug);
  if (!trip) return null;
  return {
    slug: trip.slug,
    title: trip.title,
    activity: trip.activity,
    regions: trip.regions,
    maxAltitudeM: trip.maxAltitudeM,
    permits: trip.permits,
    seasons: trip.seasons,
    usesLukla: trip.usesLukla,
    days: trip.days.map((d) => ({
      dayNumber: d.dayNumber,
      title: d.title,
      sleepAltitudeM: d.sleepAltitudeM,
      highPointM: d.highPointM,
      dayType: d.dayType,
    })),
    url: `/trips/${trip.slug}`,
    publicPrice: null as null,
  };
}

export function getPermitRules(catalog: CatalogIndex, slugOrText: string) {
  return catalog.permits
    .filter((p) => overlaps(slugOrText, `${p.slug} ${p.name} ${p.notes} ${p.authority}`))
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      authority: p.authority,
      notes: p.notes,
      lastVerifiedAt: p.lastVerifiedAt,
      requiresLicensedGuide: Boolean(p.requiresLicensedGuide),
      url: `/permits/${p.slug}`,
    }));
}

export function getSeasonAdvice(catalog: CatalogIndex, monthOrName?: string) {
  const seasons = catalog.seasons;
  if (!monthOrName) return seasons;
  const needle = monthOrName.toLowerCase();
  const month = Number(monthOrName);
  return seasons.filter((s) => {
    if (Number.isFinite(month) && month >= 1 && month <= 12) {
      return s.months.includes(month);
    }
    return overlaps(needle, `${s.slug} ${s.name}`);
  });
}

/** Stub seasonal outlook — not a live forecast. */
export function getWeatherOutlook(catalog: CatalogIndex, region?: string) {
  const match = region
    ? catalog.regions.find(
        (r) => r.slug === region || r.name.toLowerCase().includes(region.toLowerCase()),
      )
    : catalog.regions[0];
  return {
    stub: true as const,
    region: match?.slug ?? "nepal",
    outlook:
      "Live mountain weather is not connected yet. Spring and autumn are the usual high-trek windows; monsoon is usually avoided in the Khumbu; Mustang and Dolpo sit in a rain shadow. Confirm closer to travel with a specialist.",
    seasons: catalog.seasons.map((s) => s.name),
  };
}

export function getMyBooking(session: ConciergeSession): {
  ok: boolean;
  reason?: string;
  bookings: BookingSnapshot[];
} {
  if (!session.authenticated) {
    return { ok: false, reason: "Sign in to see your booking.", bookings: [] };
  }
  return { ok: true, bookings: session.bookings };
}

export function requestHuman(message: string): {
  queued: true;
  summary: string;
} {
  return {
    queued: true,
    summary: message.slice(0, 280),
  };
}

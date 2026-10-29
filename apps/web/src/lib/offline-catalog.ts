import { publicRescue } from "@ok/ai";

import type { Catalog } from "@/content/catalog";
import { withoutPlaceholders } from "@/lib/placeholders";

export function offlineCatalog(catalog: Catalog) {
  const trips = catalog.getTrips("published").map((trip) => ({
    slug: trip.slug,
    title: trip.title,
    subtitle: trip.subtitle,
    activity: trip.activity,
    regions: trip.regions,
    durationTypical: trip.durationTypical,
    maxAltitudeM: trip.maxAltitudeM,
    maxAltitudePoint: trip.maxAltitudePoint,
    startPoint: trip.startPoint,
    endPoint: trip.endPoint,
    overview: withoutPlaceholders(trip.overview),
    acclimatizationNotes: trip.acclimatizationNotes,
    contingency: trip.contingency,
    days: trip.days.map((day) => ({
      dayNumber: day.dayNumber,
      title: day.title,
      fromPlace: day.fromPlace,
      toPlace: day.toPlace,
      sleepAltitudeM: day.sleepAltitudeM,
      highPointM: day.highPointM,
      dayType: day.dayType,
    })),
  }));
  return {
    generatedAt: new Date().toISOString(),
    trips,
    rescue: publicRescue(),
  };
}

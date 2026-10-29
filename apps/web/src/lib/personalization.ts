import type { Catalog } from "@/content/catalog";
import { listRequestsForEmail } from "@/lib/quote-store";

export function tripsForRequester(catalog: Catalog, email: string) {
  const requests = listRequestsForEmail(email);
  if (requests.length === 0) return [];
  const slugs = new Set<string>();
  const regions = new Set<string>();
  const activities = new Set<string>();
  for (const request of requests) {
    if (request.tripSlug) slugs.add(request.tripSlug);
    for (const region of request.regionSlugs) regions.add(region);
    for (const activity of request.activitySlugs) activities.add(activity);
  }
  const published = catalog.getTrips("published");
  const preferred = published.filter((trip) => slugs.has(trip.slug));
  const related = published.filter(
    (trip) =>
      !slugs.has(trip.slug) &&
      (trip.regions.some((region) => regions.has(region)) ||
        activities.has(trip.activity)),
  );
  return [...preferred, ...related].slice(0, 6);
}

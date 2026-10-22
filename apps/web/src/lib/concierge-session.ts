import type { ConciergeSession } from "@ok/ai";

import { listBookingsForEmail } from "@/lib/booking-store";
import { listRequestsForEmail } from "@/lib/quote-store";
import type { AuthSession } from "@/lib/session";

export function conciergeSessionFromAuth(session: AuthSession): ConciergeSession {
  const email = session?.user.email ?? undefined;
  if (!email) {
    return { authenticated: false, bookings: [], requestTripSlugs: [] };
  }
  return {
    authenticated: true,
    email,
    bookings: listBookingsForEmail(email).map((b) => ({
      number: b.number,
      status: b.status,
      tripSlug: b.tripSlug,
      startDate: b.startDate,
    })),
    requestTripSlugs: listRequestsForEmail(email)
      .map((r) => r.tripSlug)
      .filter((slug): slug is string => Boolean(slug)),
  };
}

import { canonical } from "@/lib/site";

import {
  attachIntent,
  createBookingFromQuote,
  listPayments,
  type StoredBooking,
} from "./booking-store";
import { loadConfiguredDepositPolicy } from "./deposit-policy";
import { paymentProvider } from "./payment-config";
import type { StoredQuote, StoredRequest } from "./quote-store";

export async function acceptQuoteToBooking(quote: StoredQuote, request: StoredRequest) {
  const booking = createBookingFromQuote(
    quote,
    request,
    await loadConfiguredDepositPolicy(request.tripSlug),
  );
  const deposit = listPayments(booking.id).find((row) => row.kind === "deposit");
  if (!deposit)
    return { booking, payUrl: undefined as string | undefined, wireRef: undefined };
  const provider = paymentProvider();
  const returnPath = provider.id === "mock" ? "/pay/mock" : "/pay/return";
  const intent = await provider.createIntent({
    bookingId: booking.id,
    paymentId: deposit.id,
    amount: { amount: deposit.amount, currency: deposit.currency },
    customer: { email: request.email, name: request.name },
    returnUrl: canonical(returnPath),
    idempotencyKey: deposit.idempotencyKey,
  });
  attachIntent(deposit.id, provider.id, intent);
  return {
    booking,
    payUrl: intent.redirectUrl,
    wireRef: intent.instructions?.reference,
    instructions: intent.instructions,
  };
}

export function portalBooking(booking: StoredBooking) {
  return {
    id: booking.id,
    number: booking.number,
    status: booking.status,
    tripSlug: booking.tripSlug,
    startDate: booking.startDate,
    endDate: booking.endDate,
    total: booking.total,
    currency: booking.currency,
    balanceDueAt: booking.balanceDueAt,
    itinerary: booking.itinerarySnapshot,
    insurance: booking.insurance,
    permitStatus: booking.permitStatus,
    payments: listPayments(booking.id).map((p) => ({
      id: p.id,
      kind: p.kind,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      dueAt: p.dueAt,
      redirectUrl: p.redirectUrl,
      wireReference: p.wireReference,
      instructions: p.instructions,
    })),
  };
}

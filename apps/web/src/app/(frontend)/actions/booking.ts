"use server";

import { can, isStaff } from "@ok/auth/rbac";
import { similarTrips, suggestPricing } from "@ok/intel-client";
import { createAction } from "@ok/security";
import { z } from "zod";

import { getTrips } from "@/content/catalog";
import {
  getBooking,
  getPayment,
  listBookingsForEmail,
  listDocuments,
  markWireCaptured,
  recordPaymentEvent,
  updateInsurance,
} from "@/lib/booking-store";
import { portalBooking } from "@/lib/checkout";
import { intelConfig, paymentProvider } from "@/lib/payment-config";
import { getAuthSession } from "@/lib/session";

export async function loadPortal() {
  const session = await getAuthSession();
  const email = session?.user?.email;
  if (!email) return { ok: false as const, bookings: [] };
  return {
    ok: true as const,
    bookings: listBookingsForEmail(email).map((b) => ({
      id: b.id,
      number: b.number,
      status: b.status,
      tripSlug: b.tripSlug,
      startDate: b.startDate,
    })),
  };
}

export async function loadPortalBooking(id: string) {
  const session = await getAuthSession();
  const email = session?.user?.email;
  if (!email) return null;
  const booking = getBooking(id);
  if (!booking || booking.email.toLowerCase() !== email.toLowerCase()) {
    if (!isStaff({ role: session.user?.role })) return null;
  }
  if (!booking) return null;
  return {
    ...portalBooking(booking),
    documents: listDocuments(booking.id),
  };
}

const insuranceSchema = z.object({
  bookingId: z.string(),
  provider: z.string().min(2).max(80),
});

export const saveInsurance = createAction<
  z.infer<typeof insuranceSchema>,
  { saved: boolean }
>({ schema: insuranceSchema }, async (input) => {
  const session = await getAuthSession();
  const booking = getBooking(input.bookingId);
  if (!booking) throw new Error("Booking not found.");
  if (
    booking.email.toLowerCase() !== session?.user?.email?.toLowerCase() &&
    !isStaff({ role: session?.user?.role })
  ) {
    throw new Error("Forbidden.");
  }
  updateInsurance(input.bookingId, { provider: input.provider });
  return { saved: true };
});

const mockCaptureSchema = z.object({
  paymentId: z.string(),
});

export const simulateMockCapture = createAction<
  z.infer<typeof mockCaptureSchema>,
  { status: string; bookingStatus?: string }
>({ schema: mockCaptureSchema }, async (input) => {
  const provider = paymentProvider();
  if (provider.id !== "mock")
    throw new Error("Mock capture is only for the mock provider.");
  const payment = getPayment(input.paymentId);
  if (!payment?.providerRef) throw new Error("Payment not found.");
  const rawBody = JSON.stringify({
    providerEventId: `sim-${payment.id}`,
    providerRef: payment.providerRef,
    type: "captured",
    amount: { amount: payment.amount, currency: payment.currency },
  });
  const { signPayload } = await import("@ok/payments");
  const { env } = await import("@ok/env/server");
  const timestamp = String(Math.floor(Date.now() / 1000));
  const event = await provider.verifyCallback({
    headers: {
      "x-ok-timestamp": timestamp,
      "x-ok-signature": signPayload(env.PAYMENT_WEBHOOK_SECRET, timestamp, rawBody),
    },
    rawBody,
  });
  const applied = recordPaymentEvent(payment.id, provider.id, event);
  const booking = getBooking(payment.bookingId);
  return {
    status: applied.payment?.status ?? "captured",
    bookingStatus: booking?.status,
  };
});

const markWireSchema = z.object({
  paymentId: z.string(),
});

export const markWireReceived = createAction<
  z.infer<typeof markWireSchema>,
  { status: string; fourEyesRequired?: boolean }
>(
  {
    schema: markWireSchema,
    permission: "payment:mark_wire",
    getSession: async () => {
      const session = await getAuthSession();
      if (!session?.user) return null;
      return { user: { id: session.user.id, role: session.user.role } };
    },
    can: (session, permission) =>
      can(
        { role: session.user?.role, id: session.user?.id },
        permission as "payment:mark_wire",
      ),
  },
  async (input, session) => {
    const row = markWireCaptured(input.paymentId, session?.user?.id);
    if (!row) throw new Error("Wire payment not found.");
    return {
      status: row.status,
      fourEyesRequired: row.status !== "captured",
    };
  },
);

export async function loadStaffPricing(tripSlug?: string) {
  const session = await getAuthSession();
  if (!can({ role: session?.user?.role }, "finance:read")) return null;
  const trip = tripSlug ? getTrips().find((t) => t.slug === tripSlug) : getTrips()[0];
  if (!trip) return null;
  const suggestion = await suggestPricing(intelConfig(), {
    tripSlug: trip.slug,
    activity: trip.activity,
    durationDays: trip.durationTypical,
    partySize: 2,
    difficulty: trip.difficulty,
  });
  const recs = await similarTrips(intelConfig(), {
    tripSlug: trip.slug,
    regionSlugs: trip.regions,
    activity: trip.activity,
    durationDays: trip.durationTypical,
    catalog: getTrips("published").map((item) => ({
      slug: item.slug,
      activity: item.activity,
      regions: item.regions,
      durationTypical: item.durationTypical,
    })),
  });
  return { suggestion, recs };
}

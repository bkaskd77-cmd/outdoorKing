"use server";

import { randomUUID } from "node:crypto";

import { designItinerary } from "@ok/ai/designer";
import { can, isStaff } from "@ok/auth/rbac";
import { env } from "@ok/env/server";
import { createAction, policies } from "@ok/security";
import { z } from "zod";

import { getTrips } from "@/content/catalog";
import { draftReadyHtml, quoteSentHtml, requestReceivedHtml, sendMail } from "@/lib/mail";
import {
  decideQuote,
  getDraft,
  getQuoteByToken,
  getRequest,
  listQuotesForEmail,
  listQuotesForRequest,
  listRequests,
  markQuoteSent,
  saveDraft,
  saveQuote,
  saveRequest,
} from "@/lib/quote-store";
import { getAuthSession } from "@/lib/session";
import { canonical } from "@/lib/site";
import { generateDraftSchema, tripRequestSchema } from "@/lib/trip-request";

async function verifyTurnstile(token: string): Promise<boolean> {
  if (
    env.AI_MOCK ||
    env.NODE_ENV === "test" ||
    env.TURNSTILE_SECRET_KEY.startsWith("1x000000")
  ) {
    return true;
  }
  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const json = (await res.json()) as { success?: boolean };
  return Boolean(json.success);
}

function catalogTrips() {
  return getTrips().map((trip) => ({
    slug: trip.slug,
    title: trip.title,
    activity: trip.activity,
    regions: trip.regions,
    durationMin: trip.durationMin,
    durationMax: trip.durationMax,
    usesLukla: trip.usesLukla,
    permits: trip.permits,
    peaks: trip.peaks,
    seasons: trip.seasons,
    days: trip.days.map((d) => ({
      dayNumber: d.dayNumber,
      title: d.title,
      fromPlace: d.fromPlace,
      toPlace: d.toPlace,
      startAltitudeM: d.startAltitudeM,
      highPointM: d.highPointM,
      sleepAltitudeM: d.sleepAltitudeM,
      dayType: d.dayType,
    })),
  }));
}

export const generateDraft = createAction<
  z.infer<typeof generateDraftSchema>,
  {
    draftId: string;
    requestId: string;
    mocked: boolean;
    narrative: string | undefined;
    days: {
      dayNumber: number;
      title: string;
      fromPlace: string;
      toPlace: string;
      sleepAltitudeM: number;
      highPointM: number;
      dayType: string;
    }[];
    explanations: { id: string; message: string }[];
    violations: { id: string; message: string }[];
    score: number;
  }
>(
  {
    schema: generateDraftSchema,
    rateLimit: { key: "ai-designer-anon", policy: policies.aiDesignerAnon },
  },
  async (input) => {
    const result = await designItinerary(catalogTrips(), {
      tripSlug: input.tripSlug,
      activitySlugs: input.activitySlugs,
      regionSlugs: input.regionSlugs,
      durationDays: input.durationDays,
      month: input.month,
      fitness: input.fitness,
      experience: input.experience,
      maxPriorAltitudeM: input.maxPriorAltitudeM,
      pace: input.pace,
      comfort: input.comfort,
      usesLuklaHint:
        input.tripSlug?.includes("everest") || input.tripSlug?.includes("island"),
    });
    const draft = saveDraft("pending", result);
    return {
      draftId: draft.id,
      requestId: "",
      mocked: result.mocked,
      narrative: result.draft.narrative,
      days: result.resolvedDays.map((d) => ({
        dayNumber: d.dayNumber,
        title: d.title,
        fromPlace: d.fromPlace,
        toPlace: d.toPlace,
        sleepAltitudeM: d.sleepAltitudeM,
        highPointM: d.highPointM,
        dayType: d.dayType,
      })),
      explanations: result.report.explanations.map((item) => ({
        id: item.id,
        message: item.text,
      })),
      violations: result.report.violations.map((item) => ({
        id: item.id,
        message: item.message,
      })),
      score: result.report.score,
    };
  },
);

export const submitTripRequest = createAction<
  z.infer<typeof tripRequestSchema>,
  { received: boolean; id: string }
>(
  {
    schema: tripRequestSchema,
    rateLimit: { key: "trip-request", policy: policies.tripRequest },
    turnstile: true,
    verifyTurnstile,
  },
  async (input) => {
    if (input.website) return { received: false, id: "" };
    const existingDraft = input.draftId ? getDraft(input.draftId) : undefined;
    const row = saveRequest({
      customerId: randomUUID(),
      email: input.email,
      name: input.name,
      country: input.country,
      tripSlug: input.tripSlug,
      activitySlugs: input.activitySlugs,
      regionSlugs: input.regionSlugs,
      status: existingDraft ? "designing" : "new",
      party: {
        adults: input.adults,
        children: input.children,
        ages: [],
        groupType: input.groupType,
        fitness: input.fitness,
        experience: input.experience,
        maxPriorAltitudeM: input.maxPriorAltitudeM,
      },
      dates: {
        earliestStart: input.earliestStart,
        latestStart: input.latestStart,
        flexibleDays: input.flexibleDays,
        durationDays: input.durationDays,
        arrivalCity: input.arrivalCity,
      },
      budgetBand: input.budgetBand,
      preferences: {
        comfort: input.comfort,
        pace: input.pace,
        mustHaves: input.mustHaves,
        message: input.freeText,
      },
      consent: {
        privacy: true,
        marketing: input.marketing === "on",
        health: input.healthConsent === "on",
        policyVersion: "phase-2",
        at: new Date().toISOString(),
      },
    });
    if (existingDraft) {
      const linked = saveDraft(row.id, existingDraft.result);
      row.aiDraftId = linked.id;
      await sendMail(
        env.EMAIL_SALES_TO,
        `Draft ready: ${row.tripSlug ?? "custom"}`,
        draftReadyHtml(input.name),
      );
    }
    await sendMail(
      input.email,
      "We have your trip request",
      requestReceivedHtml(input.name),
    );
    await sendMail(
      env.EMAIL_SALES_TO,
      `Design-my-trip: ${input.tripSlug ?? "custom"}`,
      `<p>${input.name} (${input.email}) requested a private quote.</p>`,
    );
    return { received: true, id: row.id };
  },
);

const sendQuoteSchema = z.object({
  requestId: z.string(),
  description: z.string().min(4).max(200),
  amount: z.coerce.number().min(0).max(1_000_000),
  currency: z.string().length(3).default("USD"),
  staffNotes: z.string().max(2000).optional(),
});

export const sendPrivateQuote = createAction<
  z.infer<typeof sendQuoteSchema>,
  { id: string; number: string; url: string }
>(
  {
    schema: sendQuoteSchema,
    permission: "quote:send",
    getSession: async () => {
      const session = await getAuthSession();
      if (!session?.user) return null;
      return { user: { id: session.user.id, role: session.user.role } };
    },
    can: (session, permission) =>
      can({ role: session.user?.role, id: session.user?.id }, permission as "quote:send"),
  },
  async (input) => {
    const request = getRequest(input.requestId);
    if (!request) throw new Error("Request not found.");
    const draft = request.aiDraftId ? getDraft(request.aiDraftId) : undefined;
    const quote = saveQuote({
      tripRequestId: request.id,
      itinerarySnapshot: {
        tripSlug: request.tripSlug,
        days: draft?.result.resolvedDays ?? [],
        narrative: draft?.result.draft.narrative,
        staffNotes: input.staffNotes,
      },
      lines: [
        {
          position: 1,
          kind: "land_package",
          description: input.description,
          quantity: 1,
          unitPrice: input.amount,
          amount: input.amount,
          currency: input.currency,
        },
      ],
    });
    const sent = markQuoteSent(quote.id);
    const url = canonical(`/quotes/${sent?.token ?? quote.token ?? ""}`);
    await sendMail(
      request.email,
      `Your private quote ${quote.number}`,
      quoteSentHtml(request.name, quote.number, url),
    );
    return { id: quote.id, number: quote.number, url };
  },
);

const decideSchema = z.object({
  token: z.string().min(8),
  decision: z.enum(["accepted", "declined"]),
});

export const decidePrivateQuote = createAction<
  z.infer<typeof decideSchema>,
  {
    status: string;
    number: string;
    bookingNumber?: string;
    payUrl?: string;
    wireRef?: string;
  }
>(
  {
    schema: decideSchema,
    rateLimit: { key: "quote-decide", policy: policies.tripRequest },
  },
  async (input) => {
    const quote = decideQuote(input.token, input.decision);
    if (!quote) throw new Error("Quote not found.");
    if (input.decision !== "accepted") {
      return { status: quote.status, number: quote.number };
    }
    const request = getRequest(quote.tripRequestId);
    if (!request) return { status: quote.status, number: quote.number };
    const { acceptQuoteToBooking } = await import("@/lib/checkout");
    const started = await acceptQuoteToBooking(quote, request);
    return {
      status: quote.status,
      number: quote.number,
      bookingNumber: started.booking.number,
      payUrl: started.payUrl,
      wireRef: started.wireRef,
    };
  },
);

export async function loadDesk() {
  const session = await getAuthSession();
  if (!isStaff({ role: session?.user?.role })) return { ok: false as const, rows: [] };
  return {
    ok: true as const,
    rows: listRequests().map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      tripSlug: row.tripSlug,
      status: row.status,
      createdAt: row.createdAt,
    })),
  };
}

export async function loadDeskRequest(id: string) {
  const session = await getAuthSession();
  if (!isStaff({ role: session?.user?.role })) return null;
  const request = getRequest(id);
  if (!request) return null;
  const draft = request.aiDraftId ? getDraft(request.aiDraftId) : undefined;
  const quotes = listQuotesForRequest(request.id).map((q) => ({
    id: q.id,
    number: q.number,
    status: q.status,
    total: q.total,
    currency: q.currency,
    token: q.token,
  }));
  return { request, draft, quotes };
}

export async function loadInbox() {
  const session = await getAuthSession();
  const email = session?.user?.email;
  if (!email) return { ok: false as const, quotes: [] };
  return {
    ok: true as const,
    quotes: listQuotesForEmail(email).map((q) => ({
      id: q.id,
      number: q.number,
      status: q.status,
      validUntil: q.validUntil,
      token: q.token,
    })),
  };
}

export async function loadPublicQuote(token: string) {
  const row = getQuoteByToken(token);
  if (
    !row ||
    (row.status !== "sent" && row.status !== "accepted" && row.status !== "declined")
  ) {
    return null;
  }
  const request = getRequest(row.tripRequestId);
  return { quote: row, request };
}

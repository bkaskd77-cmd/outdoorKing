"use server";

import { can, isStaff } from "@ok/auth/rbac";
import { analyticsSummary } from "@ok/intel-client";
import { createAction, policies } from "@ok/security";
import { z } from "zod";

import { mergeAnalytics, tableAnalytics } from "@/lib/analytics";
import { listBookings } from "@/lib/booking-store";
import {
  assignGuide,
  listDepartures,
  listGuideAssignments,
  listPermitApplications,
  scheduleDeparture,
  trackPermit,
  updatePermitStatus,
} from "@/lib/ops-store";
import { intelConfig } from "@/lib/payment-config";
import { listQuotes, listRequests } from "@/lib/quote-store";
import { getAuthSession } from "@/lib/session";

export type StaffContext = {
  ok: true;
  role?: string;
  canFinance: boolean;
  canAnalytics: boolean;
  canOps: boolean;
  canLeads: boolean;
  canQuotes: boolean;
  canBookings: boolean;
  canWriteContent: boolean;
  canPublish: boolean;
};

export async function loadStaffContext(): Promise<
  StaffContext | { ok: false; rows?: never }
> {
  const session = await getAuthSession();
  const principal = { role: session?.user?.role, id: session?.user?.id };
  if (!isStaff(principal)) return { ok: false };
  return {
    ok: true,
    role: session?.user?.role,
    canFinance: can(principal, "finance:read"),
    canAnalytics: can(principal, "analytics:read"),
    canOps: can(principal, "ops:write"),
    canLeads: can(principal, "lead:read_all"),
    canQuotes: can(principal, "quote:send") || can(principal, "lead:read_all"),
    canBookings: can(principal, "booking:read"),
    canWriteContent: can(principal, "content:write_draft"),
    canPublish: can(principal, "content:publish"),
  };
}

export async function loadPipeline() {
  const ctx = await loadStaffContext();
  if (!ctx.ok || !ctx.canLeads) return { ok: false as const, rows: [] };
  return {
    ok: true as const,
    canFinance: ctx.canFinance,
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

export async function loadQuotePipeline() {
  const ctx = await loadStaffContext();
  if (!ctx.ok || !ctx.canQuotes) return { ok: false as const, rows: [] };
  const requests = Object.fromEntries(listRequests().map((row) => [row.id, row]));
  return {
    ok: true as const,
    canFinance: ctx.canFinance,
    rows: listQuotes().map((quote) => ({
      id: quote.id,
      number: quote.number,
      status: quote.status,
      total: ctx.canFinance ? quote.total : null,
      currency: quote.currency,
      tripSlug: requests[quote.tripRequestId]?.tripSlug,
      name: requests[quote.tripRequestId]?.name,
      requestId: quote.tripRequestId,
      createdAt: quote.createdAt,
    })),
  };
}

export async function loadBookingPipeline() {
  const ctx = await loadStaffContext();
  if (!ctx.ok || !ctx.canBookings) return { ok: false as const, rows: [] };
  return {
    ok: true as const,
    canFinance: ctx.canFinance,
    rows: listBookings().map((booking) => ({
      id: booking.id,
      number: booking.number,
      status: booking.status,
      tripSlug: booking.tripSlug,
      name: booking.name,
      email: booking.email,
      startDate: booking.startDate,
      total: ctx.canFinance ? booking.total : null,
      currency: booking.currency,
    })),
  };
}

export async function loadOpsBoard() {
  const ctx = await loadStaffContext();
  if (!ctx.ok || (!ctx.canOps && !ctx.canBookings)) {
    return { ok: false as const };
  }
  return {
    ok: true as const,
    canWrite: ctx.canOps,
    assignments: listGuideAssignments(),
    departures: listDepartures(),
    permits: listPermitApplications().map((row) => ({
      ...row,
      reference: ctx.canOps ? row.reference : undefined,
    })),
  };
}

export async function loadAnalyticsDashboard() {
  const ctx = await loadStaffContext();
  if (!ctx.ok || !ctx.canAnalytics) return { ok: false as const };
  const tables = tableAnalytics();
  const intel = await analyticsSummary(intelConfig(), {
    requests: tables.requests,
    quotesSent: tables.quotesSent,
    quotesAccepted: tables.quotesAccepted,
    bookings: tables.bookings,
  });
  const summary = mergeAnalytics(tables, intel);
  return {
    ok: true as const,
    canFinance: ctx.canFinance,
    summary: {
      ...summary,
      quotes: ctx.canFinance ? summary.quotes : summary.quotes,
      conversionRate: ctx.canFinance ? summary.conversionRate : summary.conversionRate,
    },
  };
}

function staffCan(permission: "ops:write") {
  return {
    permission,
    getSession: async () => {
      const session = await getAuthSession();
      if (!session?.user) return null;
      return { user: { id: session.user.id, role: session.user.role } };
    },
    can: (session: { user?: { role?: string; id?: string } | null }, perm: string) =>
      can({ role: session.user?.role, id: session.user?.id }, perm as "ops:write"),
  };
}

const assignSchema = z.object({
  bookingId: z.string().min(1).max(80),
  guidePayloadId: z.string().min(1).max(80),
  role: z.string().min(2).max(40).default("lead"),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});

export const createGuideAssignment = createAction(
  { schema: assignSchema, ...staffCan("ops:write") },
  async (input) => assignGuide(input),
);

const departureSchema = z.object({
  tripSlug: z.string().min(2).max(80),
  startDate: z.string().min(8).max(12),
  endDate: z.string().optional(),
  capacity: z.string().max(40).optional(),
});

export const createDeparture = createAction(
  { schema: departureSchema, ...staffCan("ops:write") },
  async (input) => scheduleDeparture(input),
);

const permitSchema = z.object({
  bookingId: z.string().min(1).max(80),
  permitPayloadId: z.string().min(1).max(80),
  status: z.string().min(2).max(40).optional(),
  reference: z.string().max(80).optional(),
});

export const createPermitApplication = createAction(
  { schema: permitSchema, ...staffCan("ops:write") },
  async (input) => trackPermit(input),
);

const permitStatusSchema = z.object({
  id: z.string().min(1),
  status: z.string().min(2).max(40),
});

export const setPermitStatus = createAction(
  {
    schema: permitStatusSchema,
    ...staffCan("ops:write"),
    rateLimit: { key: "ops-permit", policy: policies.tripRequest },
  },
  async (input) => {
    const row = updatePermitStatus(input.id, input.status);
    if (!row) throw new Error("Permit application not found.");
    return row;
  },
);

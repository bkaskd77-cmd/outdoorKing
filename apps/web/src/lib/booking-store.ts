import { randomUUID } from "node:crypto";

import {
  DEFAULT_DEPOSIT_POLICY,
  WIRE_FOUR_EYES_USD,
  splitDepositBalance,
  type CreateIntentResult,
  type PaymentStatus,
  type VerifiedEvent,
  type WireInstructions,
} from "@ok/payments";

import type { StoredQuote, StoredRequest } from "./quote-store";

export type StoredBooking = {
  id: string;
  number: string;
  quoteId: string;
  customerId: string;
  email: string;
  name: string;
  tripSlug?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  itinerarySnapshot: Record<string, unknown>;
  total: number;
  currency: string;
  balanceDueAt?: string;
  depositPct: number;
  insurance: {
    provider?: string;
    verifiedAt?: string;
    coversHeliRescueToAltitudeM?: number;
  };
  permitStatus: { slug: string; name: string; status: string }[];
  createdAt: string;
};

export type StoredPayment = {
  id: string;
  bookingId: string;
  kind: "deposit" | "balance" | "extra" | "refund";
  provider: string;
  providerRef?: string;
  idempotencyKey: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  wireReference?: string;
  instructions?: WireInstructions;
  redirectUrl?: string;
  dueAt?: string;
  capturedAt?: string;
  approvedBy?: string;
  createdAt: string;
};

export type StoredDocument = {
  id: string;
  bookingId: string;
  kind: string;
  status: string;
};

export type StoredPaymentEvent = {
  id: string;
  paymentId: string;
  provider: string;
  providerEventId: string;
  type: string;
};

const bookings = new Map<string, StoredBooking>();
const payments = new Map<string, StoredPayment>();
const documents = new Map<string, StoredDocument>();
const events = new Map<string, StoredPaymentEvent>();
const bookingsByQuote = new Map<string, string>();
let bookingSeq = 1;

function bookingNumber() {
  const year = new Date().getUTCFullYear();
  const n = String(bookingSeq).padStart(6, "0");
  bookingSeq += 1;
  return `B-${String(year)}-${n}`;
}

export function createBookingFromQuote(
  quote: StoredQuote,
  request: StoredRequest,
  policy: { depositPct: number; balanceDueDaysBefore: number } = DEFAULT_DEPOSIT_POLICY,
): StoredBooking {
  const existingId = bookingsByQuote.get(quote.id);
  if (existingId) {
    const existing = bookings.get(existingId);
    if (existing) return existing;
  }
  const startDate = request.dates.earliestStart;
  const duration = request.dates.durationDays;
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + duration);
  const balanceDue = new Date(start);
  balanceDue.setUTCDate(balanceDue.getUTCDate() - policy.balanceDueDaysBefore);
  const id = randomUUID();
  const row: StoredBooking = {
    id,
    number: bookingNumber(),
    quoteId: quote.id,
    customerId: request.customerId,
    email: request.email,
    name: request.name,
    tripSlug: request.tripSlug,
    status: "pending_deposit",
    startDate,
    endDate: end.toISOString().slice(0, 10),
    itinerarySnapshot: quote.itinerarySnapshot,
    total: quote.total,
    currency: quote.currency,
    balanceDueAt: balanceDue.toISOString().slice(0, 10),
    depositPct: policy.depositPct,
    insurance: {},
    permitStatus: (request.tripSlug
      ? [{ slug: request.tripSlug, name: "Trip permits", status: "not_started" }]
      : []
    ).concat(
      (quote.itinerarySnapshot.permits as string[] | undefined)?.map((slug) => ({
        slug,
        name: slug,
        status: "not_started",
      })) ?? [],
    ),
    createdAt: new Date().toISOString(),
  };
  bookings.set(id, row);
  bookingsByQuote.set(quote.id, id);
  for (const kind of ["passport", "insurance", "permit", "visa"] as const) {
    const doc: StoredDocument = {
      id: randomUUID(),
      bookingId: id,
      kind,
      status: "missing",
    };
    documents.set(doc.id, doc);
  }
  const split = splitDepositBalance(quote.total, policy.depositPct);
  savePayment({
    bookingId: id,
    kind: "deposit",
    amount: split.deposit,
    currency: quote.currency,
    dueAt: new Date().toISOString().slice(0, 10),
  });
  savePayment({
    bookingId: id,
    kind: "balance",
    amount: split.balance,
    currency: quote.currency,
    dueAt: row.balanceDueAt,
  });
  void persistBooking(row);
  for (const payment of listPayments(id)) void persistPayment(payment);
  return row;
}

export function savePayment(input: {
  bookingId: string;
  kind: StoredPayment["kind"];
  amount: number;
  currency: string;
  dueAt?: string;
}): StoredPayment {
  const row: StoredPayment = {
    id: randomUUID(),
    bookingId: input.bookingId,
    kind: input.kind,
    provider: "pending",
    idempotencyKey: `${input.bookingId}:${input.kind}`,
    amount: input.amount,
    currency: input.currency,
    status: "pending",
    dueAt: input.dueAt,
    createdAt: new Date().toISOString(),
  };
  payments.set(row.id, row);
  return row;
}

export function attachIntent(
  paymentId: string,
  provider: string,
  intent: CreateIntentResult,
): StoredPayment | undefined {
  const row = payments.get(paymentId);
  if (!row) return undefined;
  row.provider = provider;
  row.providerRef = intent.providerRef;
  row.redirectUrl = intent.redirectUrl;
  row.instructions = intent.instructions;
  row.wireReference = intent.instructions?.reference;
  row.status = intent.redirectUrl ? "requires_action" : "pending";
  payments.set(paymentId, row);
  void persistPayment(row);
  return row;
}

export function recordPaymentEvent(
  paymentId: string,
  provider: string,
  event: VerifiedEvent,
): { duplicate: boolean; payment?: StoredPayment } {
  const key = `${provider}:${event.providerEventId}`;
  if (events.has(key)) return { duplicate: true, payment: payments.get(paymentId) };
  const stored: StoredPaymentEvent = {
    id: randomUUID(),
    paymentId,
    provider,
    providerEventId: event.providerEventId,
    type: event.type,
  };
  events.set(key, stored);
  void persistPaymentEvent(stored);
  const payment =
    payments.get(paymentId) ??
    [...payments.values()].find((p) => p.providerRef === event.providerRef);
  if (!payment) return { duplicate: false };
  if (event.type === "captured" || event.type === "authorized") {
    payment.status = event.type;
    payment.capturedAt = new Date().toISOString();
  } else if (event.type === "failed" || event.type === "cancelled") {
    payment.status = event.type;
  } else if (event.type === "refunded") {
    payment.status = "refunded";
  }
  payments.set(payment.id, payment);
  refreshBookingStatus(payment.bookingId);
  void persistPayment(payment);
  return { duplicate: false, payment };
}

function refreshBookingStatus(bookingId: string) {
  const booking = bookings.get(bookingId);
  if (!booking) return;
  const rows = [...payments.values()].filter((p) => p.bookingId === bookingId);
  const deposit = rows.find((p) => p.kind === "deposit");
  const balance = rows.find((p) => p.kind === "balance");
  const depositPaid = deposit?.status === "captured" || deposit?.status === "authorized";
  const balancePaid = balance?.status === "captured" || balance?.status === "authorized";
  if (balancePaid && depositPaid) booking.status = "paid_in_full";
  else if (depositPaid) {
    const due = booking.balanceDueAt ? Date.parse(booking.balanceDueAt) : NaN;
    booking.status =
      Number.isFinite(due) && due <= Date.now() ? "balance_due" : "confirmed";
  }
  bookings.set(bookingId, booking);
  void persistBooking(booking);
}

export function markWireCaptured(
  paymentId: string,
  actorId?: string,
): StoredPayment | undefined {
  const row = payments.get(paymentId);
  if (!row || row.provider !== "wire") return undefined;
  if (row.amount >= WIRE_FOUR_EYES_USD) {
    if (!row.approvedBy) {
      row.approvedBy = actorId ?? "unknown";
      payments.set(paymentId, row);
      return row;
    }
    if (actorId && row.approvedBy === actorId) {
      return row;
    }
  }
  row.status = "captured";
  row.capturedAt = new Date().toISOString();
  if (actorId) row.approvedBy = actorId;
  payments.set(paymentId, row);
  refreshBookingStatus(row.bookingId);
  void persistPayment(row);
  return row;
}

export function getBooking(id: string) {
  return bookings.get(id);
}

export function getBookingByQuote(quoteId: string) {
  const id = bookingsByQuote.get(quoteId);
  return id ? bookings.get(id) : undefined;
}

export function listBookingsForEmail(email: string) {
  return [...bookings.values()].filter(
    (b) => b.email.toLowerCase() === email.toLowerCase(),
  );
}

export function listBookings() {
  return [...bookings.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function listPayments(bookingId: string) {
  return [...payments.values()]
    .filter((p) => p.bookingId === bookingId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function listDocuments(bookingId: string) {
  return [...documents.values()].filter((d) => d.bookingId === bookingId);
}

export function getPayment(id: string) {
  return payments.get(id);
}

export function getPaymentByProviderRef(ref: string) {
  return [...payments.values()].find((p) => p.providerRef === ref);
}

export function updateInsurance(
  bookingId: string,
  insurance: StoredBooking["insurance"],
): StoredBooking | undefined {
  const row = bookings.get(bookingId);
  if (!row) return undefined;
  row.insurance = { ...row.insurance, ...insurance };
  bookings.set(bookingId, row);
  void persistBooking(row);
  return row;
}

async function persistBooking(row: StoredBooking) {
  try {
    const { db, bookings: table } = await import("@ok/db");
    await db
      .insert(table)
      .values({
        id: row.id,
        number: row.number,
        quoteId: row.quoteId,
        customerId: row.customerId,
        tripSlug: row.tripSlug,
        status: row.status,
        startDate: row.startDate,
        endDate: row.endDate,
        itinerarySnapshot: row.itinerarySnapshot,
        total: String(row.total),
        currency: row.currency,
        balanceDueAt: row.balanceDueAt,
        depositPct: String(row.depositPct),
        insurance: row.insurance,
        permitStatus: row.permitStatus,
      })
      .onConflictDoUpdate({
        target: table.id,
        set: {
          status: row.status,
          insurance: row.insurance,
          permitStatus: row.permitStatus,
        },
      });
  } catch {
    // preview/CI without Postgres
  }
}

async function persistPayment(row: StoredPayment) {
  try {
    const { db, payments: table } = await import("@ok/db");
    await db
      .insert(table)
      .values({
        id: row.id,
        bookingId: row.bookingId,
        kind: row.kind,
        provider: row.provider,
        providerRef: row.providerRef,
        idempotencyKey: row.idempotencyKey,
        amount: String(row.amount),
        currency: row.currency,
        status: row.status,
        wireReference: row.wireReference,
        dueAt: row.dueAt,
      })
      .onConflictDoUpdate({
        target: table.id,
        set: {
          provider: row.provider,
          providerRef: row.providerRef,
          status: row.status,
          wireReference: row.wireReference,
        },
      });
  } catch {
    // best-effort
  }
}

async function persistPaymentEvent(row: StoredPaymentEvent) {
  try {
    const { db, paymentEvents: table } = await import("@ok/db");
    await db
      .insert(table)
      .values({
        id: row.id,
        paymentId: row.paymentId,
        provider: row.provider,
        providerEventId: row.providerEventId,
        type: row.type,
        payload: { type: row.type },
        signatureValid: true,
      })
      .onConflictDoNothing();
  } catch {
    // unique (provider, provider_event_id) or preview without Postgres
  }
}

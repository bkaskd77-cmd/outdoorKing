import { createHash, randomBytes, randomUUID } from "node:crypto";

import type { DesignerResult } from "@ok/ai";
import { env } from "@ok/env/server";
import { blindIndex, encryptField, LocalKekProvider } from "@ok/security";

export type StoredParty = {
  adults: number;
  children: number;
  ages: number[];
  groupType: string;
  fitness: string;
  experience: string;
  maxPriorAltitudeM?: number;
};

export type StoredRequest = {
  id: string;
  customerId: string;
  emailHash: string;
  email: string;
  name: string;
  country: string;
  tripSlug?: string;
  activitySlugs: string[];
  regionSlugs: string[];
  status: string;
  party: StoredParty;
  dates: {
    earliestStart: string;
    latestStart?: string;
    flexibleDays: number;
    durationDays: number;
    arrivalCity: string;
  };
  budgetBand: string;
  preferences: {
    comfort: string;
    pace: string;
    mustHaves: string[];
    message?: string;
  };
  aiDraftId?: string;
  consent: {
    privacy: boolean;
    marketing: boolean;
    health: boolean;
    policyVersion: string;
    at: string;
  };
  createdAt: string;
};

export type StoredDraft = {
  id: string;
  tripRequestId: string;
  result: DesignerResult;
  createdAt: string;
};

export type StoredLine = {
  id: string;
  position: number;
  kind: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  currency: string;
};

export type StoredQuote = {
  id: string;
  number: string;
  tripRequestId: string;
  version: number;
  status: string;
  currency: string;
  total: number;
  lines: StoredLine[];
  itinerarySnapshot: Record<string, unknown>;
  token?: string;
  tokenHash?: string;
  validUntil: string;
  createdAt: string;
  sentAt?: string;
  acceptedAt?: string;
};

const requests = new Map<string, StoredRequest>();
const drafts = new Map<string, StoredDraft>();
const quotes = new Map<string, StoredQuote>();
const quotesByTokenHash = new Map<string, string>();
let quoteSeq = 1;

function kek() {
  return new LocalKekProvider(env.PII_KEK_LOCAL);
}

export function emailBlind(email: string): string {
  return blindIndex(email, env.PII_HMAC_KEY);
}

export function saveRequest(
  input: Omit<StoredRequest, "id" | "createdAt" | "emailHash">,
) {
  const id = randomUUID();
  const row: StoredRequest = {
    ...input,
    id,
    emailHash: emailBlind(input.email),
    createdAt: new Date().toISOString(),
  };
  requests.set(id, row);
  void persistRequest(row);
  return row;
}

export function saveDraft(tripRequestId: string, result: DesignerResult): StoredDraft {
  const row: StoredDraft = {
    id: randomUUID(),
    tripRequestId,
    result,
    createdAt: new Date().toISOString(),
  };
  drafts.set(row.id, row);
  const request = requests.get(tripRequestId);
  if (request) {
    request.aiDraftId = row.id;
    request.status = "designing";
    requests.set(tripRequestId, request);
  }
  if (tripRequestId && tripRequestId !== "pending") {
    void persistDraft(row);
  }
  return row;
}

export function saveQuote(input: {
  tripRequestId: string;
  lines: Omit<StoredLine, "id">[];
  itinerarySnapshot: Record<string, unknown>;
}): StoredQuote {
  const total = input.lines.reduce((sum, line) => sum + line.amount, 0);
  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const year = new Date().getUTCFullYear();
  const row: StoredQuote = {
    id: randomUUID(),
    number: `Q-${String(year)}-${String(quoteSeq).padStart(6, "0")}`,
    tripRequestId: input.tripRequestId,
    version: 1,
    status: "draft",
    currency: "USD",
    total,
    lines: input.lines.map((line) => ({ ...line, id: randomUUID() })),
    itinerarySnapshot: input.itinerarySnapshot,
    token,
    tokenHash,
    validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21)
      .toISOString()
      .slice(0, 10),
    createdAt: new Date().toISOString(),
  };
  quoteSeq += 1;
  quotes.set(row.id, row);
  quotesByTokenHash.set(tokenHash, row.id);
  const request = requests.get(input.tripRequestId);
  if (request) {
    request.status = "designing";
    requests.set(input.tripRequestId, request);
  }
  void persistQuote(row);
  return row;
}

export function markQuoteSent(id: string): StoredQuote | undefined {
  const row = quotes.get(id);
  if (!row) return undefined;
  row.status = "sent";
  row.sentAt = new Date().toISOString();
  quotes.set(id, row);
  const request = requests.get(row.tripRequestId);
  if (request) {
    request.status = "quoted";
    requests.set(request.id, request);
  }
  return row;
}

export function decideQuote(
  token: string,
  decision: "accepted" | "declined",
): StoredQuote | undefined {
  const hash = createHash("sha256").update(token).digest("hex");
  const id = quotesByTokenHash.get(hash);
  if (!id) return undefined;
  const row = quotes.get(id);
  if (!row || row.status !== "sent") return undefined;
  row.status = decision;
  if (decision === "accepted") row.acceptedAt = new Date().toISOString();
  quotes.set(id, row);
  const request = requests.get(row.tripRequestId);
  if (request) {
    request.status = decision === "accepted" ? "won" : "lost";
    requests.set(request.id, request);
  }
  return row;
}

export function getRequest(id: string) {
  return requests.get(id);
}

export function getDraft(id: string) {
  return drafts.get(id);
}

export function getQuote(id: string) {
  return quotes.get(id);
}

export function getQuoteByToken(token: string) {
  const hash = createHash("sha256").update(token).digest("hex");
  const id = quotesByTokenHash.get(hash);
  return id ? quotes.get(id) : undefined;
}

export function listRequests() {
  return [...requests.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function listQuotesForEmail(email: string) {
  const hash = emailBlind(email);
  const mine = [...requests.values()].filter((r) => r.emailHash === hash);
  return [...quotes.values()].filter((q) => mine.some((r) => r.id === q.tripRequestId));
}

export function listQuotesForRequest(tripRequestId: string) {
  return [...quotes.values()]
    .filter((q) => q.tripRequestId === tripRequestId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function persistRequest(row: StoredRequest) {
  try {
    const { db, customers, tripRequests, consents, travelers } = await import("@ok/db");
    const provider = kek();
    const [customer] = await db
      .insert(customers)
      .values({
        emailHash: row.emailHash,
        emailCipher: encryptField(row.email, "customer-email", provider),
        nameCipher: encryptField(row.name, "customer-name", provider),
        country: row.country,
        marketingConsent: {
          email: row.consent.marketing,
          at: row.consent.at,
          source: "design-my-trip",
          policyVersion: row.consent.policyVersion,
        },
      })
      .onConflictDoNothing()
      .returning();
    const customerId = customer?.id ?? row.customerId;
    await db.insert(tripRequests).values({
      id: row.id,
      customerId,
      tripSlug: row.tripSlug,
      activitySlugs: row.activitySlugs,
      regionSlugs: row.regionSlugs,
      status: row.status,
      party: row.party,
      dates: row.dates,
      budgetBand: row.budgetBand,
      preferences: row.preferences,
      consent: row.consent,
      turnstileOk: true,
    });
    await db.insert(consents).values({
      customerId,
      purpose: "privacy",
      granted: row.consent.privacy,
      policyVersion: row.consent.policyVersion,
      source: "design-my-trip",
    });
    await db.insert(travelers).values({
      tripRequestId: row.id,
      customerId,
      fullNameCipher: encryptField(row.name, "traveler-name", provider),
      isLead: true,
      maxAltitudeExperienceM: row.party.maxPriorAltitudeM,
    });
  } catch {
    // Preview/CI without a reachable Postgres keep the in-memory row.
  }
}

async function persistDraft(row: StoredDraft) {
  try {
    const { db, aiItineraryDrafts } = await import("@ok/db");
    await db.insert(aiItineraryDrafts).values({
      id: row.id,
      tripRequestId: row.tripRequestId,
      modelAlias: "designer.plan",
      modelId: row.result.modelId,
      promptVersion: row.result.promptVersion,
      input: { mocked: row.result.mocked },
      output: row.result.draft as unknown as Record<string, unknown>,
      ruleReport: row.result.report as unknown as Record<string, unknown>,
      status: row.result.report.violations.length ? "needs_review" : "ok",
      createdBy: "system",
    });
  } catch {
    // best-effort
  }
}

async function persistQuote(row: StoredQuote) {
  try {
    const { db, quotes: quoteTable, quoteLineItems } = await import("@ok/db");
    await db.insert(quoteTable).values({
      id: row.id,
      number: row.number,
      tripRequestId: row.tripRequestId,
      version: row.version,
      status: row.status,
      currency: row.currency,
      total: String(row.total),
      subtotal: String(row.total),
      itinerarySnapshot: row.itinerarySnapshot,
      publicTokenHash: row.tokenHash,
      validUntil: row.validUntil,
    });
    if (row.lines.length > 0) {
      await db.insert(quoteLineItems).values(
        row.lines.map((line) => ({
          id: line.id,
          quoteId: row.id,
          position: line.position,
          kind: line.kind,
          description: line.description,
          quantity: String(line.quantity),
          unitPrice: String(line.unitPrice),
          amount: String(line.amount),
          currency: line.currency,
        })),
      );
    }
  } catch {
    // best-effort
  }
}

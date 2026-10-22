import { env } from "@ok/env/server";

import {
  isAltitudeEmergency,
  isInjectionAttempt,
  sanitizeUserText,
  tokenizePii,
} from "./guards";
import { CONCIERGE_CHAT_VERSION } from "./prompts/concierge.chat.v1";
import { classifyIntent } from "./rag/classify";
import { indexCatalog } from "./rag/chunker";
import { hybridRetrieve } from "./rag/retrieve";
import type {
  CatalogIndex,
  Citation,
  ConciergeAnswer,
  ConciergeIntent,
  ConciergeSession,
  RetrievedChunk,
} from "./rag/types";
import { formatRescueMessage } from "./rescue";
import {
  getMyBooking,
  getPermitRules,
  getSeasonAdvice,
  getTrip,
  getWeatherOutlook,
  requestHuman,
  searchTrips,
} from "./tools";

const UNCERTAIN =
  "I'm not certain from our published pages — let me connect you with our team.";

const TRIP_PRICE =
  /(?:USD|EUR|GBP)\s*\$?\s*\d|\$\s?\d|€\s?\d|£\s?\d|per\s+person\s+from/i;

function citationsOf(chunks: RetrievedChunk[]): Citation[] {
  return chunks.map((c) => ({ chunkId: c.id, title: c.title, url: c.url }));
}

function cite(chunk: { id: string }): string {
  return `[source:${chunk.id}]`;
}

export function stripTripPrices(text: string): string {
  if (!TRIP_PRICE.test(text)) return text;
  return "Every journey is quoted privately after we know your dates and party. We do not list a public trip price.";
}

function mockAnswer(chunks: RetrievedChunk[], extras: string[]): string {
  if (chunks.length === 0 && extras.length === 0) return UNCERTAIN;
  const fromChunks = chunks.slice(0, 3).map((c) => {
    const body = c.content.split("\n").slice(1).join(" ").slice(0, 420);
    return `${body} ${cite(c)}`;
  });
  return [...extras, ...fromChunks].join("\n\n") || UNCERTAIN;
}

export type AnswerInput = {
  catalog: CatalogIndex;
  message: string;
  locale?: string;
  session?: ConciergeSession;
  mocked?: boolean;
};

export function emptySession(): ConciergeSession {
  return { authenticated: false, bookings: [], requestTripSlugs: [] };
}

export function answerConcierge(input: AnswerInput): ConciergeAnswer {
  const mocked = input.mocked ?? env.AI_MOCK;
  const session = input.session ?? emptySession();
  const message = tokenizePii(sanitizeUserText(input.message));
  const toolsUsed: string[] = [];
  const locale = input.locale ?? "en";

  if (isInjectionAttempt(message)) {
    return {
      intent: "injection_attempt",
      text: "I can only help with OutdoorKing journeys from our published pages. Ask about a trek, permit or season.",
      citations: [],
      mocked,
      handoff: false,
      emergency: false,
      pageOps: false,
      toolsUsed,
      promptVersion: CONCIERGE_CHAT_VERSION,
    };
  }

  if (isAltitudeEmergency(message)) {
    void requestHuman(message);
    return {
      intent: "emergency",
      text: formatRescueMessage(),
      citations: [
        {
          chunkId: "page:safety-and-rescue:0",
          title: "Safety and rescue",
          url: "/trust/safety-and-rescue",
        },
      ],
      mocked,
      handoff: true,
      emergency: true,
      pageOps: true,
      toolsUsed: ["requestHuman"],
      promptVersion: CONCIERGE_CHAT_VERSION,
    };
  }

  const intent: ConciergeIntent = classifyIntent(message);

  if (intent === "human") {
    toolsUsed.push("requestHuman");
    const queued = requestHuman(message);
    return {
      intent,
      text: `A specialist will follow up. I passed along: “${queued.summary}”. No quote amounts are sent in chat.`,
      citations: [],
      mocked,
      handoff: true,
      emergency: false,
      pageOps: false,
      toolsUsed,
      promptVersion: CONCIERGE_CHAT_VERSION,
    };
  }

  const chunks = indexCatalog(input.catalog, locale);
  const retrieved = hybridRetrieve(message, chunks, 8);
  const extras: string[] = [];
  const extraCitations: Citation[] = [];

  if (intent === "permit") {
    toolsUsed.push("getPermitRules");
    const rules = getPermitRules(input.catalog, message);
    const rule = rules[0];
    if (rule) {
      const chunk =
        retrieved.find((c) => c.sourceId === rule.slug) ??
        chunks.find((c) => c.sourceId === rule.slug);
      extras.push(
        `${rule.name}: ${rule.notes} Last verified ${rule.lastVerifiedAt}. ${chunk ? cite(chunk) : ""}`.trim(),
      );
      if (chunk)
        extraCitations.push({ chunkId: chunk.id, title: chunk.title, url: chunk.url });
    }
  }
  if (intent === "season") {
    toolsUsed.push("getSeasonAdvice", "getWeatherOutlook");
    extras.push(getWeatherOutlook(input.catalog).outlook);
    extras.push(
      getSeasonAdvice(input.catalog)
        .map((s) => s.name)
        .join("; "),
    );
  }
  if (intent === "trip_info") {
    toolsUsed.push("searchTrips");
    const preferred = session.requestTripSlugs;
    const hits = searchTrips(input.catalog, { text: message });
    const slug = hits[0]?.slug ?? preferred[0];
    if (slug) {
      toolsUsed.push("getTrip");
      const trip = getTrip(input.catalog, slug);
      if (trip) {
        extras.push(
          `${trip.title} is a private ${trip.activity} journey in ${trip.regions.join(", ")}. Max altitude ${String(trip.maxAltitudeM ?? "")} m. Permits: ${trip.permits.join(", ") || "listed on the trip page"}. Quoted privately — never a public trip price.`,
        );
      }
    }
  }
  if (intent === "booking_status") {
    toolsUsed.push("getMyBooking");
    const mine = getMyBooking(session);
    if (!mine.ok) {
      return {
        intent,
        text: "Sign in to see your booking, documents and deposit schedule. I will not guess another traveller's data.",
        citations: [],
        mocked,
        handoff: false,
        emergency: false,
        pageOps: false,
        toolsUsed,
        promptVersion: CONCIERGE_CHAT_VERSION,
      };
    }
    extras.push(
      mine.bookings.length === 0
        ? "I do not see a booking on this account yet. Accept a private quote to open a deposit schedule."
        : mine.bookings
            .map(
              (b) =>
                `${b.number}: ${b.status}${b.tripSlug ? ` (${b.tripSlug})` : ""}. Amounts stay in your portal.`,
            )
            .join("\n"),
    );
  }
  if (intent === "smalltalk") {
    const personal =
      session.authenticated && session.requestTripSlugs[0]
        ? ` I can also pick up from your request around ${session.requestTripSlugs[0]}.`
        : "";
    return {
      intent,
      text: `Namaste. Ask about a route, a permit, a season, or your booking after you sign in. I only use our published pages.${personal}`,
      citations: [],
      mocked,
      handoff: false,
      emergency: false,
      pageOps: false,
      toolsUsed,
      promptVersion: CONCIERGE_CHAT_VERSION,
    };
  }
  if (intent === "out_of_scope") {
    return {
      intent,
      text: "That sits outside OutdoorKing journeys. I can help with Nepal treks, permits, seasons and bookings.",
      citations: [],
      mocked,
      handoff: false,
      emergency: false,
      pageOps: false,
      toolsUsed,
      promptVersion: CONCIERGE_CHAT_VERSION,
    };
  }

  const needsCite = intent === "trip_info" || intent === "permit" || intent === "season";
  if (needsCite && retrieved.length === 0 && extras.length === 0) {
    return {
      intent,
      text: UNCERTAIN,
      citations: [],
      mocked,
      handoff: true,
      emergency: false,
      pageOps: false,
      toolsUsed,
      promptVersion: CONCIERGE_CHAT_VERSION,
    };
  }

  let text = mockAnswer(retrieved, extras);
  if (/how much|price|cost|usd|\$\s?\d/i.test(message)) {
    const faq =
      retrieved.find((c) => c.sourceId === "are-there-public-prices") ??
      chunks.find((c) => c.sourceId === "are-there-public-prices");
    if (faq) {
      text = `There is no public trip price. Every journey is quoted privately after we know your dates and party. ${cite(faq)}`;
    }
  }
  text = stripTripPrices(text);
  if (needsCite && !text.includes("[source:") && retrieved[0]) {
    text = `${text} ${cite(retrieved[0])}`;
  }

  const citations = [...extraCitations, ...citationsOf(retrieved)].filter(
    (c, i, all) => all.findIndex((x) => x.chunkId === c.chunkId) === i,
  );

  return {
    intent,
    text,
    citations,
    mocked,
    handoff: false,
    emergency: false,
    pageOps: false,
    toolsUsed,
    promptVersion: CONCIERGE_CHAT_VERSION,
  };
}

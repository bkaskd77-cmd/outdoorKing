import { summarizeAiUsage } from "./ai-usage";
import { listBookings } from "./booking-store";
import { listQuotes, listRequests } from "./quote-store";

export type AnalyticsSummary = {
  requests: number;
  quotes: number;
  quotesSent: number;
  quotesAccepted: number;
  conversionRate: number;
  bookings: number;
  bookingsByStatus: Record<string, number>;
  aiUsage: { alias: string; tokens: number; costUsd: number; calls: number }[];
  commentary: string;
  source: "tables" | "tables+intel" | "tables+mock";
};

export function tableAnalytics(): Omit<AnalyticsSummary, "commentary" | "source"> {
  const requests = listRequests();
  const quotes = listQuotes();
  const bookings = listBookings();
  const quotesSent = quotes.filter((q) =>
    ["sent", "viewed", "accepted", "declined"].includes(q.status),
  ).length;
  const quotesAccepted = quotes.filter((q) => q.status === "accepted").length;
  const bookingsByStatus: Record<string, number> = {};
  for (const booking of bookings) {
    bookingsByStatus[booking.status] = (bookingsByStatus[booking.status] ?? 0) + 1;
  }
  return {
    requests: requests.length,
    quotes: quotes.length,
    quotesSent,
    quotesAccepted,
    conversionRate: quotesSent === 0 ? 0 : quotesAccepted / quotesSent,
    bookings: bookings.length,
    bookingsByStatus,
    aiUsage: summarizeAiUsage(),
  };
}

export function mockIntelCommentary(input: {
  requests: number;
  quotesSent: number;
  quotesAccepted: number;
  bookings: number;
}): string {
  if (input.requests === 0) {
    return "Mock intel: no requests yet. Conversion stays at zero until a quote is sent.";
  }
  const rate =
    input.quotesSent === 0
      ? 0
      : Math.round((input.quotesAccepted / input.quotesSent) * 100);
  return `Mock intel: ${String(input.requests)} requests, ${String(input.quotesSent)} sent quotes, ${String(rate)}% accept, ${String(input.bookings)} bookings. Advisory only — not a public price.`;
}

export function mergeAnalytics(
  tables: Omit<AnalyticsSummary, "commentary" | "source">,
  intel?: { commentary?: string } | null,
): AnalyticsSummary {
  return {
    ...tables,
    commentary: intel?.commentary ?? mockIntelCommentary(tables),
    source: intel?.commentary ? "tables+intel" : "tables+mock",
  };
}

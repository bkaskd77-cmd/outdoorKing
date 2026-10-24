import { answerConcierge, firstWhatsAppNumber, sanitizeUserText } from "@ok/ai";
import { env } from "@ok/env/server";
import { limit, policies } from "@ok/security";
import { NextResponse } from "next/server";
import { z } from "zod";

import { companyFacts } from "@/content/catalog";
import { publishedCatalogIndex } from "@/lib/catalog-index";
import { notifyHandoff, persistConciergeTurn, sessionHash } from "@/lib/concierge-log";
import { conciergeSessionFromAuth } from "@/lib/concierge-session";
import { getAuthSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  message: z.string().min(1).max(2000),
  locale: z.string().max(16).optional(),
  conversationId: z.string().uuid().optional(),
});

function sse(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(request: Request) {
  if (!env.AI_CONCIERGE_ENABLED && !env.AI_MOCK) {
    return NextResponse.json({ error: "Concierge is disabled." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  try {
    const limited = await limit(ip, policies.concierge);
    if (!limited.success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  } catch {
    // fail open
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const message = sanitizeUserText(parsed.data.message);
  const locale = parsed.data.locale ?? "en";
  const auth = await getAuthSession();
  const session = conciergeSessionFromAuth(auth);
  const answer = answerConcierge({
    catalog: publishedCatalogIndex(),
    message,
    locale,
    session,
    whatsappNumber: firstWhatsAppNumber(companyFacts.whatsapp, env.WHATSAPP_NUMBER),
  });

  const conversationId = await persistConciergeTurn({
    conversationId: parsed.data.conversationId,
    sessionHash: sessionHash(session.email ?? ip),
    locale,
    userText: message,
    answer,
  });
  await notifyHandoff({ answer, locale, message });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          sse("meta", {
            conversationId,
            intent: answer.intent,
            citations: answer.citations,
            emergency: answer.emergency,
            pageOps: answer.pageOps,
            handoff: answer.handoff,
            mocked: answer.mocked,
            toolsUsed: answer.toolsUsed,
          }),
        ),
      );
      const words = answer.text.split(/(\s+)/);
      let acc = "";
      for (const word of words) {
        acc += word;
        if (acc.length >= 24 || word.includes("\n")) {
          controller.enqueue(encoder.encode(sse("delta", { text: acc })));
          acc = "";
        }
      }
      if (acc) controller.enqueue(encoder.encode(sse("delta", { text: acc })));
      controller.enqueue(encoder.encode(sse("done", { ...answer, conversationId })));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store",
      Connection: "keep-alive",
    },
  });
}

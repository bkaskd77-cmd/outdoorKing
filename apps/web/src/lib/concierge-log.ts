import { createHash, randomUUID } from "node:crypto";

import { tokenizePii, type ConciergeAnswer } from "@ok/ai";
import { env } from "@ok/env/server";

import { recordAiUsage } from "@/lib/ai-usage";
import { conciergeHandoffHtml, sendMail } from "@/lib/mail";

export function sessionHash(seed: string): string {
  return createHash("sha256").update(seed).digest("hex").slice(0, 32);
}

export async function persistConciergeTurn(input: {
  conversationId?: string;
  sessionHash: string;
  locale: string;
  userText: string;
  answer: ConciergeAnswer;
}): Promise<string> {
  const conversationId = input.conversationId ?? randomUUID();
  try {
    const { db, conciergeConversations, conciergeMessages, aiUsageDaily } =
      await import("@ok/db");
    await db
      .insert(conciergeConversations)
      .values({
        id: conversationId,
        sessionHash: input.sessionHash,
        locale: input.locale,
        handedOffTo: input.answer.handoff
          ? input.answer.emergency
            ? "ops"
            : "sales"
          : null,
        flagged: input.answer.emergency || input.answer.intent === "injection_attempt",
      })
      .onConflictDoNothing();
    await db.insert(conciergeMessages).values([
      {
        conversationId,
        role: "user",
        content: tokenizePii(input.userText),
        intent: input.answer.intent,
      },
      {
        conversationId,
        role: "assistant",
        content: input.answer.text,
        toolCalls: input.answer.toolsUsed,
        citations: input.answer.citations,
        intent: input.answer.intent,
        modelId: input.answer.mocked ? "mock" : "concierge.chat",
      },
    ]);
    await db
      .insert(aiUsageDaily)
      .values({
        day: new Date().toISOString().slice(0, 10),
        alias: "concierge.chat",
        model: input.answer.mocked ? "mock" : "concierge.chat",
        tokens: 0,
        costUsd: "0",
      })
      .onConflictDoNothing();
  } catch {
    // Preview/CI without Postgres keep the in-memory answer.
  }
  recordAiUsage({
    alias: "concierge.chat",
    model: input.answer.mocked ? "mock" : "concierge.chat",
  });
  return conversationId;
}

export async function notifyHandoff(input: {
  answer: ConciergeAnswer;
  locale: string;
  message: string;
}): Promise<void> {
  if (!input.answer.handoff && !input.answer.pageOps) return;
  const subject = input.answer.emergency
    ? "[ops] Altitude emergency — page on-call"
    : "Concierge human handoff";
  await sendMail(
    env.EMAIL_SALES_TO,
    subject,
    conciergeHandoffHtml({
      summary: tokenizePii(input.message).slice(0, 500),
      emergency: input.answer.emergency,
      locale: input.locale,
    }),
  );
}

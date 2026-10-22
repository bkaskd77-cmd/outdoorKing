import { createHash } from "node:crypto";

import { env } from "@ok/env/server";

import type { Job } from "./types";

export async function handleEmailSend(job: Extract<Job, { name: "email.send" }>) {
  if (env.AI_MOCK || env.NODE_ENV === "test") {
    console.info(`[mail] ${job.payload.subject} -> ${job.payload.to}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [job.payload.to],
      subject: job.payload.subject,
      html: job.payload.html,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend rejected email (${String(res.status)}).`);
  }
}

export async function handleContentEmbed(job: Extract<Job, { name: "content.embed" }>) {
  const { db, contentChunks } = await import("@ok/db");
  const contentHash = createHash("sha256")
    .update(`${job.payload.locale}:${job.payload.content}`)
    .digest("hex");
  await db.insert(contentChunks).values({
    sourceType: job.payload.sourceType,
    sourceId: job.payload.sourceId,
    locale: job.payload.locale,
    chunkIndex: 0,
    content: job.payload.content,
    contentHash,
    publishedAt: new Date(),
  });
}

export async function processJob(job: Job): Promise<void> {
  if (job.name === "email.send") {
    await handleEmailSend(job);
    return;
  }
  if (job.name === "content.embed") {
    await handleContentEmbed(job);
  }
}

import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { can } from "@ok/auth/rbac";
import {
  runPipeline,
  type AgentDraft,
  type ContentType,
  type ContentWriter,
} from "@ok/content-agents";

import { recordAiUsage } from "./ai-usage";

const AI_AGENT_USER = {
  id: "ai_agent",
  email: "ai@outdoorking.com",
  collection: "users",
  role: "ai_agent",
};

function runsDirectory(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return resolve(here, "../../../../packages/content-agents/runs");
}

function collectionFor(type: ContentType): "faqs" | "posts" | "trips" | null {
  if (type === "faq") return "faqs";
  if (type === "post") return "posts";
  if (type === "trip") return "trips";
  return null;
}

function draftPayload(draft: AgentDraft): Record<string, unknown> {
  if (draft.type === "faq") {
    return {
      question: draft.title,
      slug: draft.slug,
      answer: draft.body,
      sources: draft.sources,
      _status: "draft",
    };
  }
  if (draft.type === "post") {
    return {
      title: draft.title,
      slug: draft.slug,
      excerpt: draft.seo.description,
      body: draft.body,
      aiAssisted: true,
      sources: draft.sources,
      seo: draft.seo,
      _status: "draft",
    };
  }
  return {
    title: draft.title,
    slug: draft.slug,
    overview: draft.body,
    difficulty: "moderate",
    durationDays: { min: 5, typical: 10, max: 14 },
    maxAltitudeM: 1400,
    sources: draft.sources,
    seo: draft.seo,
    _status: "draft",
  };
}

export async function payloadContentWriter(): Promise<ContentWriter> {
  return {
    async createDraft(draft) {
      if (draft.status !== "draft") {
        throw new Error("AI writer may only create drafts.");
      }
      if (can({ role: "ai_agent" }, "content:publish")) {
        throw new Error("ai_agent must not publish.");
      }
      const collection = collectionFor(draft.type);
      if (!collection) {
        return { id: "skipped-unsupported-type" };
      }
      const { getPayload } = await import("payload");
      const { default: config } = await import("@payload-config");
      const payload = await getPayload({ config });
      const data = draftPayload(draft);
      if (collection === "trips") {
        const activities = await payload.find({
          collection: "activities",
          limit: 1,
          overrideAccess: true,
        });
        const activity = activities.docs[0];
        if (!activity) return { id: "skipped-missing-activity" };
        data.activity = activity.id;
      }
      const doc = await payload.create({
        collection,
        draft: true,
        overrideAccess: false,
        user: AI_AGENT_USER,
        data: data as never,
      });
      const status = (doc as { _status?: string })._status;
      if (status === "published") {
        throw new Error("AI writer refused a published document.");
      }
      return { id: String(doc.id) };
    },
  };
}

export async function writeContentDraft(input: {
  type: ContentType;
  slug: string;
  brief?: string;
}): Promise<{
  draft: AgentDraft;
  written: { id: string } | null;
  publishAllowed: boolean;
  mocked: boolean;
}> {
  const runsDir = runsDirectory();
  await mkdir(runsDir, { recursive: true });
  let writer: ContentWriter | undefined;
  try {
    writer = await payloadContentWriter();
  } catch {
    writer = undefined;
  }
  const result = await runPipeline({
    type: input.type,
    slug: input.slug,
    brief: input.brief,
    runsDir,
    writer,
  });
  recordAiUsage({ alias: "content.write", model: "mock", tokens: 0, costUsd: 0 });
  return {
    draft: result.draft,
    written: result.written,
    publishAllowed: result.publishAllowed,
    mocked: true,
  };
}

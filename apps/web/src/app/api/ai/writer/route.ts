import { can } from "@ok/auth/rbac";
import type { ContentType } from "@ok/content-agents";
import { env } from "@ok/env/server";
import { limit, policies } from "@ok/security";
import { NextResponse } from "next/server";
import { z } from "zod";

import { writeContentDraft } from "@/lib/ai-writer";
import { getAuthSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  type: z.enum(["trip", "post", "faq"]),
  slug: z.string().min(2).max(80),
  brief: z.string().max(4000).optional(),
});

export async function POST(request: Request) {
  if (!env.AI_MOCK && !env.AI_DESIGNER_ENABLED) {
    return NextResponse.json({ error: "AI writer is disabled." }, { status: 503 });
  }
  const session = await getAuthSession();
  if (!can({ role: session?.user?.role }, "content:write_draft")) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  try {
    const limited = await limit(ip, policies.aiDesignerAnon);
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
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const result = await writeContentDraft({
    type: parsed.data.type as ContentType,
    slug: parsed.data.slug,
    brief: parsed.data.brief,
  });
  if (result.publishAllowed) {
    return NextResponse.json({ error: "ai_agent must not publish." }, { status: 500 });
  }
  return NextResponse.json({
    status: result.draft.status,
    slug: result.draft.slug,
    title: result.draft.title,
    body: result.draft.body,
    sources: result.draft.sources,
    written: result.written,
    publishAllowed: false,
    mocked: result.mocked,
  });
}

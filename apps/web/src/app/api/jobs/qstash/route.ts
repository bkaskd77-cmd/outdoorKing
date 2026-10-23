import { processJob, verifyJobSignature } from "@ok/jobs";
import type { Job } from "@ok/jobs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();
  const signature =
    request.headers.get("x-jobs-signature") ??
    request.headers.get("Upstash-Forward-X-Jobs-Signature");
  if (!verifyJobSignature(body, signature)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }
  const job = JSON.parse(body) as Job;
  await processJob(job);
  return NextResponse.json({ ok: true });
}

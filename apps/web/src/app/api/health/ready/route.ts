import { pingDatabase } from "@ok/db";
import { env } from "@ok/env/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await pingDatabase();
    const redis = await fetch(`${env.UPSTASH_REDIS_REST_URL}/ping`, {
      headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}` },
    });
    if (!redis.ok) throw new Error("redis");
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ status: "degraded" }, { status: 503 });
  }
}

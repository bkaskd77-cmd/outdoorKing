import { pingDatabase } from "@ok/db";
import { pingRedis } from "@ok/security";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await pingDatabase();
    await pingRedis();
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ status: "degraded" }, { status: 503 });
  }
}

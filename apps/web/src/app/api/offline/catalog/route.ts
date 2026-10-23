import { NextResponse } from "next/server";

import { offlineCatalog } from "@/lib/offline-catalog";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(offlineCatalog(), {
    headers: {
      "Cache-Control": "public, max-age=300",
    },
  });
}

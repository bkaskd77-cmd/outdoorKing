import { NextResponse } from "next/server";

import { getCatalog } from "@/content/store";
import { offlineCatalog } from "@/lib/offline-catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(offlineCatalog(await getCatalog()), {
    headers: {
      "Cache-Control": "public, max-age=300",
    },
  });
}

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/** Vercel-only. Self-host skips these adapters. */
export function HostedInsights() {
  if (process.env.VERCEL !== "1") return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

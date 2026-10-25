import { loadStaffContext } from "@/app/(frontend)/actions/desk";

import { AiScreen } from "./AiScreen";
import { AnalyticsScreen } from "./AnalyticsScreen";
import { BookingsScreen } from "./BookingsScreen";
import { DeskNav } from "./DeskNav";
import { OpsScreen } from "./OpsScreen";
import { PartnersScreen } from "./PartnersScreen";
import { PipelineScreen } from "./PipelineScreen";
import { QuotesScreen } from "./QuotesScreen";
import { RequestScreen } from "./RequestScreen";

const sections = new Set(["quotes", "bookings", "ops", "analytics", "partners", "ai"]);

export async function DeskSection({ segments }: { segments: string[] }) {
  const ctx = await loadStaffContext();
  if (!ctx.ok) {
    return <p>Sign in with your invited staff account to open quotes.</p>;
  }

  const head = segments[0] ?? "";

  return (
    <div className="quotes-desk">
      <DeskNav ctx={ctx} />
      {head === "" ? <PipelineScreen /> : null}
      {head === "quotes" ? <QuotesScreen /> : null}
      {head === "bookings" ? <BookingsScreen /> : null}
      {head === "ops" ? <OpsScreen /> : null}
      {head === "analytics" ? <AnalyticsScreen /> : null}
      {head === "partners" ? <PartnersScreen /> : null}
      {head === "ai" ? <AiScreen /> : null}
      {head && !sections.has(head) ? <RequestScreen id={head} /> : null}
    </div>
  );
}

import { DefaultTemplate } from "@payloadcms/next/templates";
import { Gutter } from "@payloadcms/ui";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { AdminViewServerProps } from "payload";

import { DeskSection } from "@/components/desk/DeskSection";
import { QUOTES_ADMIN_PATH } from "@/components/desk/paths";

import "@ok/ui/globals.css";

function quoteSegments(pathname: string): string[] {
  const clean = pathname.split("?")[0] ?? pathname;
  const index = clean.indexOf(QUOTES_ADMIN_PATH);
  if (index === -1) return [];
  return clean
    .slice(index + QUOTES_ADMIN_PATH.length)
    .split("/")
    .filter(Boolean);
}

export async function QuotesView({
  initPageResult,
  params,
  searchParams,
}: AdminViewServerProps) {
  if (!initPageResult.req.user) {
    redirect("/admin/login");
  }

  const headerList = await headers();
  const pathname =
    headerList.get("x-pathname") || headerList.get("next-url") || QUOTES_ADMIN_PATH;

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <header className="ok-staff-page">
          <p className="ok-staff-kicker">OutdoorKing</p>
          <h1>Quotes</h1>
        </header>
        <DeskSection segments={quoteSegments(pathname)} />
      </Gutter>
    </DefaultTemplate>
  );
}

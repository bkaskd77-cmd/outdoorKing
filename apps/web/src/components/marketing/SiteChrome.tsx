import { firstWhatsAppNumber, publicWhatsAppHref } from "@ok/ai";
import { brandName } from "@ok/config";
import { env } from "@ok/env/server";
import { Container, siteLinkClass } from "@ok/ui";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import {
  ConciergeLauncher,
  ConciergePanel,
  ConciergeProvider,
} from "@/components/ai/ConciergeWidget";
import { LocaleSwitcher } from "@/components/ai/LocaleSwitcher";
import { companyFacts } from "@/content/catalog";
import { getCatalog } from "@/content/store";
import { isPlaceholder, publicTrustItems } from "@/lib/placeholders";
import { localizedPath } from "@/lib/site";

import { CookieBanner, CookieConsentProvider } from "./CookieBanner";
import { DesignCta } from "./DesignCta";
import { MobilePublicMenu } from "./MobilePublicMenu";
import { PublicMenu, PublicMenuLink, PublicMenuProvider } from "./PublicMenu";

const trustItems = publicTrustItems(companyFacts);
const footerLine = [companyFacts.legalEntity, companyFacts.address]
  .filter((value) => !isPlaceholder(value))
  .join(" · ");
const memberships = isPlaceholder(companyFacts.memberships)
  ? ""
  : companyFacts.memberships;

const whatsappHref = publicWhatsAppHref(
  firstWhatsAppNumber(companyFacts.whatsapp, env.WHATSAPP_NUMBER),
);

const footerColumns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "explore",
    links: [
      { href: "/trips", label: "allJourneys" },
      { href: "/activities", label: "activities" },
      { href: "/regions", label: "regions" },
      { href: "/peaks", label: "peaks" },
      { href: "/permits", label: "permits" },
      { href: "/guides", label: "guides" },
      { href: "/faq", label: "faq" },
      { href: "/design-my-trip", label: "designMyTrip" },
    ],
  },
  {
    title: "company",
    links: [
      { href: "/about", label: "about" },
      { href: "/team", label: "team" },
      { href: "/purpose", label: "purpose" },
      { href: "/trust/reviews", label: "reviews" },
      { href: "/contact", label: "contact" },
    ],
  },
  {
    title: "trustLegal",
    links: [
      { href: "/trust/licence-and-legal", label: "licence" },
      { href: "/trust/safety-and-rescue", label: "safety" },
      { href: "/trust/insurance", label: "insurance" },
      { href: "/privacy", label: "privacy" },
      { href: "/terms", label: "terms" },
      { href: "/cookies", label: "cookies" },
    ],
  },
];

export async function SiteChrome({ children }: { children: ReactNode }) {
  const t = await getTranslations();
  const tc = await getTranslations("chrome");
  const locale = await getLocale();
  const { activities, regions } = await getCatalog();
  const activityLinks = activities.slice(0, 6).map((a) => ({
    href: `/activities/${a.slug}`,
    label: a.title,
  }));
  const regionLinks = regions.slice(0, 6).map((r) => ({
    href: `/regions/${r.slug}`,
    label: r.name,
  }));
  const purposeHref = localizedPath(locale, "/purpose");
  const conciergeEnabled = env.AI_CONCIERGE_ENABLED || env.AI_MOCK;
  return (
    <ConciergeProvider enabled={conciergeEnabled} whatsappHref={whatsappHref}>
      <CookieConsentProvider>
        <div className="sticky top-0 z-200 bg-background">
          <header className="relative border-b border-border bg-background">
            <Container className="flex h-[var(--header-h)] items-center justify-between gap-2 sm:gap-4">
              <PublicMenuProvider>
                <a
                  className={`${siteLinkClass} shrink-0 font-display text-[1.15rem] min-[420px]:text-[1.35rem] sm:text-h3`}
                  href="/"
                >
                  {brandName}
                </a>
                <nav
                  aria-label={tc("primaryNav")}
                  className="hidden items-center gap-2 lg:flex"
                >
                  <PublicMenu id="activities" label={t("navActivities")}>
                    <PublicMenuLink href="/activities">
                      {tc("allActivities")}
                    </PublicMenuLink>
                    {activityLinks.map((item) => (
                      <PublicMenuLink key={item.href} href={item.href}>
                        {item.label}
                      </PublicMenuLink>
                    ))}
                  </PublicMenu>
                  <PublicMenu id="regions" label={t("navRegions")}>
                    <PublicMenuLink href="/regions">{tc("allRegions")}</PublicMenuLink>
                    {regionLinks.map((item) => (
                      <PublicMenuLink key={item.href} href={item.href}>
                        {item.label}
                      </PublicMenuLink>
                    ))}
                  </PublicMenu>
                  <PublicMenu id="trips" label={t("navTrips")}>
                    <PublicMenuLink href="/trips">{t("navAllJourneys")}</PublicMenuLink>
                    <PublicMenuLink href="/trips/everest-base-camp-trek">
                      Everest Base Camp
                    </PublicMenuLink>
                    <PublicMenuLink href="/trips/annapurna-circuit-trek">
                      Annapurna Circuit
                    </PublicMenuLink>
                    <PublicMenuLink href="/trips/island-peak-climbing">
                      Island Peak
                    </PublicMenuLink>
                  </PublicMenu>
                  <a
                    className={`${siteLinkClass} rounded-sm px-1.5 text-small font-semibold`}
                    href="/trust/licence-and-legal"
                  >
                    {t("navTrust")}
                  </a>
                  <a
                    className={`${siteLinkClass} rounded-sm px-1.5 text-small font-semibold`}
                    href={purposeHref}
                  >
                    {t("navPurpose")}
                  </a>
                </nav>
                <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
                  <MobilePublicMenu regions={regionLinks} />
                  <div className="hidden lg:block">
                    <LocaleSwitcher />
                  </div>
                  <DesignCta href="/design-my-trip">{t("designCta")}</DesignCta>
                </div>
              </PublicMenuProvider>
            </Container>
          </header>
          {trustItems.length > 0 ? (
            <div className="border-b border-border bg-surface-sunken">
              <Container className="flex items-center gap-3 py-2 text-caption text-muted-foreground">
                <div className="flex min-w-0 flex-wrap gap-x-6 gap-y-2">
                  {trustItems.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </Container>
            </div>
          ) : null}
        </div>
        {children}
        <footer className="border-t border-border bg-surface-sunken py-14">
          <Container>
            <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
              <div>
                <p className="font-display text-h3">{brandName}</p>
                <p className="mt-3 max-w-[32ch] text-small text-muted-foreground">
                  {tc("tagline")}
                </p>
                {whatsappHref ? (
                  <p className="mt-4 text-small">
                    <a className={siteLinkClass} href={whatsappHref}>
                      WhatsApp {companyFacts.whatsapp}
                    </a>
                  </p>
                ) : null}
                <p className="mt-2 text-small">
                  <a className={siteLinkClass} href="/contact">
                    {tc("contactUs")}
                  </a>
                </p>
              </div>
              {footerColumns.map((column) => (
                <nav key={column.title} aria-label={tc(column.title)}>
                  <p className="text-eyebrow text-muted-foreground uppercase">
                    {tc(column.title)}
                  </p>
                  <ul className="mt-3 grid gap-2 text-small">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <a
                          className={siteLinkClass}
                          href={link.href === "/purpose" ? purposeHref : link.href}
                        >
                          {tc(link.label)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-caption text-muted-foreground">
              <p>
                {footerLine ? `${footerLine} · ` : ""}
                {memberships ? `${memberships} · ` : ""}© {new Date().getFullYear()}{" "}
                {brandName}
              </p>
              <p className="flex gap-4">
                <a className={siteLinkClass} href="/account">
                  {tc("yourQuotes")}
                </a>
                <a className={siteLinkClass} href="/account/bookings">
                  {tc("yourBookings")}
                </a>
              </p>
            </div>
          </Container>
        </footer>
        <CookieBanner />
        <ConciergeLauncher />
        <ConciergePanel />
      </CookieConsentProvider>
    </ConciergeProvider>
  );
}

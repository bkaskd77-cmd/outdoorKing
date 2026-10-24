import { brandName } from "@ok/config";
import { env } from "@ok/env/server";
import { Button, Container, MagneticLabel, siteLinkClass } from "@ok/ui";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import {
  ConciergePanel,
  ConciergeProvider,
  ConciergeTrigger,
} from "@/components/ai/ConciergeWidget";
import { LocaleSwitcher } from "@/components/ai/LocaleSwitcher";
import { activities, companyFacts, regions } from "@/content/catalog";
import { isPlaceholder, publicTrustItems } from "@/lib/placeholders";

import { CookieBanner } from "./CookieBanner";
import { PublicMenu, PublicMenuLink, PublicMenuProvider } from "./PublicMenu";

const trustItems = publicTrustItems(companyFacts);
const footerLine = [companyFacts.legalEntity, companyFacts.address]
  .filter((value) => !isPlaceholder(value))
  .join(" · ");
const memberships = isPlaceholder(companyFacts.memberships)
  ? ""
  : companyFacts.memberships;

const activityLinks = activities.slice(0, 6).map((a) => ({
  href: `/activities/${a.slug}`,
  label: a.title,
}));
const regionLinks = regions.slice(0, 6).map((r) => ({
  href: `/regions/${r.slug}`,
  label: r.name,
}));

export async function SiteChrome({ children }: { children: ReactNode }) {
  const t = await getTranslations();
  const conciergeEnabled = env.AI_CONCIERGE_ENABLED || env.AI_MOCK;
  return (
    <ConciergeProvider enabled={conciergeEnabled}>
      <div className="sticky top-0 z-200 bg-background">
        <header className="border-b border-border bg-background">
          <Container className="flex h-[var(--header-h)] items-center justify-between gap-2 sm:gap-4">
            <PublicMenuProvider>
              <a
                className={`${siteLinkClass} shrink-0 font-display text-[1.35rem] sm:text-h3`}
                href="/"
              >
                {brandName}
              </a>
              <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
                <PublicMenu id="activities" label={t("navActivities")}>
                  <PublicMenuLink href="/activities">All activities</PublicMenuLink>
                  {activityLinks.map((item) => (
                    <PublicMenuLink key={item.href} href={item.href}>
                      {item.label}
                    </PublicMenuLink>
                  ))}
                </PublicMenu>
                <PublicMenu id="regions" label={t("navRegions")}>
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
              </nav>
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <LocaleSwitcher />
                <Button
                  variant="magnetic"
                  className="shrink-0 px-2.5 text-[0.8125rem] leading-[1.4] whitespace-nowrap text-primary-foreground sm:px-5 sm:text-small"
                  asChild
                >
                  <a href="/design-my-trip">
                    <MagneticLabel>{t("designCta")}</MagneticLabel>
                  </a>
                </Button>
              </div>
            </PublicMenuProvider>
          </Container>
        </header>
        <div className="border-b border-border bg-surface-sunken">
          <Container className="flex items-center justify-between gap-3 py-2 text-caption text-muted-foreground">
            <div className="flex min-w-0 flex-wrap gap-x-6 gap-y-2">
              {trustItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
              <a
                className={`${siteLinkClass} underline-offset-4 hover:underline`}
                href="/trust/safety-and-rescue"
              >
                Published rescue policy
              </a>
            </div>
            <ConciergeTrigger />
          </Container>
        </div>
      </div>
      {children}
      <footer className="border-t border-border py-12">
        <Container className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-h3">{brandName}</p>
            {footerLine ? (
              <p className="mt-2 text-small text-muted-foreground">{footerLine}</p>
            ) : null}
            {memberships ? (
              <p className="mt-2 text-small text-muted-foreground">{memberships}</p>
            ) : null}
          </div>
          <nav aria-label="Footer">
            <ul className="grid gap-2 text-small">
              <li>
                <a className={siteLinkClass} href="/about">
                  About
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/team">
                  Team
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/trust/licence-and-legal">
                  Licence and legal
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/trust/safety-and-rescue">
                  Safety and rescue
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/trust/insurance">
                  Insurance
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/trust/reviews">
                  Reviews
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/.well-known/security.txt">
                  security.txt
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <ul className="grid gap-2 text-small">
              <li>
                <a className={siteLinkClass} href="/privacy">
                  Privacy
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/terms">
                  Terms
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/cookies">
                  Cookies
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/contact">
                  Contact
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/permits">
                  Permits
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/account">
                  Quote inbox
                </a>
              </li>
              <li>
                <a className={siteLinkClass} href="/account/bookings">
                  Bookings
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </footer>
      <CookieBanner />
      <ConciergePanel />
    </ConciergeProvider>
  );
}

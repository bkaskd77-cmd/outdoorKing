import { brandName } from "@ok/config";
import { env } from "@ok/env/server";
import { Button, Container, MagneticLabel } from "@ok/ui";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { ConciergeWidget } from "@/components/ai/ConciergeWidget";
import { LocaleSwitcher } from "@/components/ai/LocaleSwitcher";
import { activities, companyFacts, regions } from "@/content/catalog";
import { isPlaceholder, publicTrustItems } from "@/lib/placeholders";

import { CookieBanner } from "./CookieBanner";

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
  return (
    <>
      <header className="sticky top-0 z-200 glass">
        <Container className="flex h-[var(--header-h)] items-center justify-between gap-2 sm:gap-4">
          <a className="shrink-0 font-display text-[1.35rem] sm:text-h3" href="/">
            {brandName}
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            <details className="group relative">
              <summary className="cursor-pointer list-none text-small font-semibold">
                {t("navActivities")}
              </summary>
              <ul className="absolute top-full left-0 z-300 mt-2 min-w-56 rounded-md border border-border bg-surface p-3 shadow-3">
                <li>
                  <a className="block min-h-11 py-2" href="/activities">
                    All activities
                  </a>
                </li>
                {activityLinks.map((item) => (
                  <li key={item.href}>
                    <a className="block min-h-11 py-2" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
            <details className="group relative">
              <summary className="cursor-pointer list-none text-small font-semibold">
                {t("navRegions")}
              </summary>
              <ul className="absolute top-full left-0 z-300 mt-2 min-w-56 rounded-md border border-border bg-surface p-3 shadow-3">
                {regionLinks.map((item) => (
                  <li key={item.href}>
                    <a className="block min-h-11 py-2" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
            <details className="group relative">
              <summary className="cursor-pointer list-none text-small font-semibold">
                {t("navTrips")}
              </summary>
              <ul className="absolute top-full left-0 z-300 mt-2 min-w-56 rounded-md border border-border bg-surface p-3 shadow-3">
                <li>
                  <a className="block min-h-11 py-2" href="/trips">
                    {t("navAllJourneys")}
                  </a>
                </li>
                <li>
                  <a className="block min-h-11 py-2" href="/trips/everest-base-camp-trek">
                    Everest Base Camp
                  </a>
                </li>
                <li>
                  <a className="block min-h-11 py-2" href="/trips/annapurna-circuit-trek">
                    Annapurna Circuit
                  </a>
                </li>
                <li>
                  <a className="block min-h-11 py-2" href="/trips/island-peak-climbing">
                    Island Peak
                  </a>
                </li>
              </ul>
            </details>
            <a className="text-small font-semibold" href="/trust/licence-and-legal">
              {t("navTrust")}
            </a>
          </nav>
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <LocaleSwitcher />
            <Button
              variant="magnetic"
              className="shrink-0 whitespace-nowrap px-2.5 text-caption sm:px-5 sm:text-small"
              asChild
            >
              <a href="/design-my-trip">
                <MagneticLabel>{t("designCta")}</MagneticLabel>
              </a>
            </Button>
          </div>
        </Container>
      </header>
      <div className="border-b border-border bg-surface-sunken">
        <Container className="flex flex-wrap gap-x-6 gap-y-2 py-2 text-caption text-muted-foreground">
          {trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
          <a
            className="underline-offset-4 hover:underline"
            href="/trust/safety-and-rescue"
          >
            Published rescue policy
          </a>
        </Container>
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
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/team">Team</a>
              </li>
              <li>
                <a href="/trust/licence-and-legal">Licence and legal</a>
              </li>
              <li>
                <a href="/trust/safety-and-rescue">Safety and rescue</a>
              </li>
              <li>
                <a href="/trust/insurance">Insurance</a>
              </li>
              <li>
                <a href="/trust/reviews">Reviews</a>
              </li>
              <li>
                <a href="/.well-known/security.txt">security.txt</a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <ul className="grid gap-2 text-small">
              <li>
                <a href="/privacy">Privacy</a>
              </li>
              <li>
                <a href="/terms">Terms</a>
              </li>
              <li>
                <a href="/cookies">Cookies</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
              <li>
                <a href="/permits">Permits</a>
              </li>
              <li>
                <a href="/account">Quote inbox</a>
              </li>
              <li>
                <a href="/account/bookings">Bookings</a>
              </li>
            </ul>
          </nav>
        </Container>
      </footer>
      <CookieBanner />
      <ConciergeWidget enabled={env.AI_CONCIERGE_ENABLED || env.AI_MOCK} />
    </>
  );
}

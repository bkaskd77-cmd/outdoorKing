import { brandName } from "@ok/config";
import { Button, Container } from "@ok/ui";
import type { ReactNode } from "react";

import { activities, companyFacts, regions } from "@/content/catalog";

import { CookieBanner } from "./CookieBanner";

const activityLinks = activities.slice(0, 6).map((a) => ({
  href: `/activities/${a.slug}`,
  label: a.title,
}));
const regionLinks = regions.slice(0, 6).map((r) => ({
  href: `/regions/${r.slug}`,
  label: r.name,
}));

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-200 glass">
        <Container className="flex h-[var(--header-h)] items-center justify-between gap-4">
          <a className="font-display text-h3" href="/">
            {brandName}
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            <details className="group relative">
              <summary className="cursor-pointer list-none text-small font-semibold">
                Activities
              </summary>
              <ul className="absolute top-full left-0 z-300 mt-2 min-w-56 rounded-md border border-border bg-surface p-3 shadow-3">
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
                Regions
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
                Trips
              </summary>
              <ul className="absolute top-full left-0 z-300 mt-2 min-w-56 rounded-md border border-border bg-surface p-3 shadow-3">
                <li>
                  <a className="block min-h-11 py-2" href="/trips">
                    All journeys
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
              Trust
            </a>
          </nav>
          <Button variant="magnetic" asChild>
            <a href="/design-my-trip">Design my trip</a>
          </Button>
        </Container>
      </header>
      <div className="border-b border-border bg-surface-sunken">
        <Container className="flex flex-wrap gap-x-6 gap-y-2 py-2 text-caption text-muted-foreground">
          <span>Licensed by Nepal Tourism Board #{companyFacts.licenceNo}</span>
          <span>{companyFacts.years} years on the trail</span>
          <span>{companyFacts.reviewSummary}</span>
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
            <p className="mt-2 text-small text-muted-foreground">
              {companyFacts.legalEntity} · {companyFacts.address}
            </p>
            <p className="mt-2 text-small text-muted-foreground">
              {companyFacts.memberships}
            </p>
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
            </ul>
          </nav>
        </Container>
      </footer>
      <CookieBanner />
    </>
  );
}

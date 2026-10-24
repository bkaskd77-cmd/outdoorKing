"use client";

import {
  Button,
  chipClass,
  cn,
  Container,
  controlFocusClass,
  controlMotionClass,
  Heading,
  Section,
  Text,
} from "@ok/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Picture } from "@/components/media/Picture";
import type { PictureSrc } from "@/content/media";

const HOME_REGION_TRIPS = 3;

export type RegionShowcaseTrip = {
  slug: string;
  title: string;
  durationTypical: number;
  maxAltitudeM: number;
  image: PictureSrc;
};

export type RegionShowcaseRegion = {
  slug: string;
  name: string;
  trips: RegionShowcaseTrip[];
};

function journeyMeta(trip: Pick<RegionShowcaseTrip, "durationTypical" | "maxAltitudeM">) {
  return `${String(trip.durationTypical)} days typical · max ${String(trip.maxAltitudeM)} m`;
}

export function RegionShowcase({ regions }: { regions: RegionShowcaseRegion[] }) {
  const t = useTranslations();
  const [activeSlug, setActiveSlug] = useState(regions[0]?.slug ?? "");
  const active = regions.find((region) => region.slug === activeSlug) ?? regions[0];
  if (!active) return null;
  const trips = active.trips.slice(0, HOME_REGION_TRIPS);

  return (
    <Section id="region-showcase" aria-labelledby="regions-heading">
      <Container>
        <Heading as="h2" id="regions-heading">
          {t("regionsHeading")}
        </Heading>
        <Text muted className="mt-3">
          {t("regionsLead")}
        </Text>
        <div
          role="group"
          aria-label={t("regionsHeading")}
          className="mt-8 flex flex-wrap gap-2"
        >
          {regions.map((region) => {
            const selected = region.slug === active.slug;
            return (
              <button
                key={region.slug}
                type="button"
                aria-pressed={selected}
                className={cn(chipClass(selected), "shrink-0")}
                onClick={() => setActiveSlug(region.slug)}
              >
                {region.name}
              </button>
            );
          })}
        </div>
        {trips.length > 0 ? (
          <ul key={active.slug} className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {trips.map((trip) => (
              <li key={trip.slug} className="min-w-0">
                <a
                  href={`/trips/${trip.slug}`}
                  className={cn(
                    "group flex h-full min-w-0 flex-col overflow-hidden rounded-xl bg-surface shadow-1",
                    controlMotionClass,
                    controlFocusClass,
                    "hover:-translate-y-px hover:shadow-2 active:translate-y-0 active:scale-[0.99]",
                  )}
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <Picture
                      image={{ ...trip.image, alt: "" }}
                      className="h-full w-full"
                      imgClassName="h-full w-full object-cover transition-transform duration-slow ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                      sizes="(min-width: 80rem) 24rem, (min-width: 40rem) 46vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-sans text-h3 font-semibold">{trip.title}</h3>
                    <p className="mt-2 text-small text-muted-foreground">
                      {journeyMeta(trip)}
                    </p>
                    <p className="mt-4 text-small font-semibold text-primary">
                      {t("openJourney")}
                      <span className="duration-fast inline-block transition-transform group-hover:translate-x-1">
                        {" "}
                        →
                      </span>
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-8">
          <Button variant="secondary" asChild>
            <a href={`/regions/${active.slug}`}>{t("seeMoreTrips")}</a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

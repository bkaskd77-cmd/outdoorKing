"use client";

import { Button, cn, controlFocusClass } from "@ok/ui";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import type { PictureSrc } from "@/content/media";

import { TripCard } from "./TripCard";

export type BrowserTrip = {
  slug: string;
  title: string;
  activity: string;
  regions: string[];
  difficulty: string;
  days: number;
  eyebrow: string;
  facts: string;
  photo?: PictureSrc;
};

type Option = { value: string; label: string };

type Filters = { activity: string; region: string; difficulty: string; length: string };

const empty: Filters = { activity: "", region: "", difficulty: "", length: "" };

const lengths: { value: string; min: number; max: number }[] = [
  { value: "short", min: 0, max: 7 },
  { value: "two-weeks", min: 8, max: 14 },
  { value: "three-weeks", min: 15, max: 21 },
  { value: "long", min: 22, max: Number.POSITIVE_INFINITY },
];

const keys = Object.keys(empty) as (keyof Filters)[];

function fromUrl(): Filters {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(keys.map((key) => [key, params.get(key) ?? ""])) as Filters;
}

function toUrl(filters: Filters) {
  const url = new URL(window.location.href);
  for (const key of keys) {
    if (filters[key]) url.searchParams.set(key, filters[key]);
    else url.searchParams.delete(key);
  }
  window.history.replaceState(null, "", url);
}

const selectClass = cn(
  controlFocusClass,
  "h-11 w-full rounded-md border border-border bg-surface px-3 text-small",
);

/** The journeys list with filters. Filters live in the URL so a filtered list can be shared. */
export function TripBrowser({
  trips,
  activities,
  regions,
  difficulties,
}: {
  trips: BrowserTrip[];
  activities: Option[];
  regions: Option[];
  difficulties: Option[];
}) {
  const t = useTranslations("browser");
  const [filters, setFilters] = useState<Filters>(empty);

  useEffect(() => {
    setFilters(fromUrl());
  }, []);

  function update(next: Partial<Filters>) {
    setFilters((current) => {
      const merged = { ...current, ...next };
      toUrl(merged);
      return merged;
    });
  }

  const shown = useMemo(() => {
    const length = lengths.find((item) => item.value === filters.length);
    return trips.filter(
      (trip) =>
        (!filters.activity || trip.activity === filters.activity) &&
        (!filters.region || trip.regions.includes(filters.region)) &&
        (!filters.difficulty || trip.difficulty === filters.difficulty) &&
        (!length || (trip.days >= length.min && trip.days <= length.max)),
    );
  }, [trips, filters]);

  const filtered = keys.some((key) => filters[key]);

  return (
    <div>
      <div
        role="group"
        aria-label={t("activity")}
        className="flex flex-wrap gap-2 border-b border-border pb-4"
      >
        {[{ value: "", label: t("allJourneys") }, ...activities].map((option) => {
          const active = filters.activity === option.value;
          return (
            <button
              key={option.value || "all"}
              type="button"
              aria-pressed={active}
              onClick={() => update({ activity: option.value })}
              className={cn(
                controlFocusClass,
                "min-h-10 rounded-pill border px-4 text-small transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface hover:border-foreground/40",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-caption text-muted-foreground">
          {t("region")}
          <select
            className={selectClass}
            value={filters.region}
            onChange={(event) => update({ region: event.target.value })}
          >
            <option value="">{t("anyRegion")}</option>
            {regions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-caption text-muted-foreground">
          {t("difficulty")}
          <select
            className={selectClass}
            value={filters.difficulty}
            onChange={(event) => update({ difficulty: event.target.value })}
          >
            <option value="">{t("anyDifficulty")}</option>
            {difficulties.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-caption text-muted-foreground">
          {t("length")}
          <select
            className={selectClass}
            value={filters.length}
            onChange={(event) => update({ length: event.target.value })}
          >
            <option value="">{t("anyLength")}</option>
            {lengths.map((option) => (
              <option key={option.value} value={option.value}>
                {t(`lengths.${option.value}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-small text-muted-foreground" aria-live="polite">
          {filtered
            ? t("shownOf", { shown: shown.length, total: trips.length })
            : t("total", { total: trips.length })}
        </p>
        {filtered ? (
          <Button variant="secondary" onClick={() => update(empty)}>
            {t("clear")}
          </Button>
        ) : null}
      </div>

      {shown.length > 0 ? (
        <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((trip) => (
            <li key={trip.slug}>
              <TripCard
                href={`/trips/${trip.slug}`}
                slug={trip.slug}
                title={trip.title}
                summary={trip.facts}
                eyebrow={trip.eyebrow}
                photo={trip.photo}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-xl border border-border bg-surface p-8">
          <p className="text-body">{t("none")}</p>
          <p className="mt-2 text-small text-muted-foreground">{t("noneLead")}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => update(empty)}>
              {t("clear")}
            </Button>
            <Button asChild>
              <a href="/design-my-trip">{t("designMyTrip")}</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

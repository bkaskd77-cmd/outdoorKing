"use client";

import {
  Button,
  chipClass,
  cn,
  controlFocusClass,
  controlMotionClass,
  Heading,
  Input,
  Label,
  listControlClass,
  Text,
  Textarea,
} from "@ok/ui";
import { useEffect, useMemo, useState } from "react";

import { generateDraft, submitTripRequest } from "@/app/(frontend)/actions/quote";
import {
  CHOOSER_ACTIVITIES,
  DURATION_BANDS,
  filterChooserTrips,
  isChooserActivity,
  isDurationBand,
  matchingTripSlug,
  type ChooserTrip,
  type DurationBandId,
} from "@/lib/trip-chooser";
import {
  gapsForStep,
  gapsUntilStep,
  resolvedDurationDays,
  resolvedEarliestStart,
  type WizardGap,
} from "@/lib/wizard-gaps";

const STORAGE_KEY = "ok-design-wizard";
const DUMMY_TURNSTILE = "1x00000000000000000000AA";

const STEPS = [
  { id: 1, name: "The journey" },
  { id: 2, name: "When and how long" },
  { id: 3, name: "Who's coming" },
  { id: 4, name: "Style and comfort" },
  { id: 5, name: "Your draft" },
  { id: 6, name: "Your details" },
] as const;

const REGIONS = [
  { slug: "everest", label: "Everest / Khumbu" },
  { slug: "annapurna", label: "Annapurna" },
  { slug: "langtang", label: "Langtang" },
  { slug: "manaslu", label: "Manaslu" },
  { slug: "mustang", label: "Mustang" },
  { slug: "dolpo", label: "Dolpo" },
] as const;

function exclusiveSlug(current: readonly string[], slug: string): string[] {
  return current[0] === slug ? [] : [slug];
}

const MUST_HAVES = [
  "helicopter options",
  "photography",
  "wildlife",
  "culture",
  "monasteries",
  "hot showers",
  "private bathrooms",
  "vegetarian/vegan",
] as const;

type DraftPreview = {
  draftId: string;
  narrative: string;
  days: {
    dayNumber: number;
    title: string;
    fromPlace: string;
    toPlace: string;
    sleepAltitudeM: number;
    highPointM: number;
    dayType: string;
  }[];
  explanations: { id: string; message: string }[];
  planReasons: { id: string; message: string }[];
  violations: { id: string; message: string }[];
  mocked: boolean;
};

type WizardState = {
  activitySlugs: string[];
  regionSlugs: string[];
  durationBand: DurationBandId;
  tripSlug: string;
  freeText: string;
  earliestStart: string;
  latestStart: string;
  travelMonth: string;
  flexibleDays: number;
  durationDays: number;
  arrivalCity: string;
  adults: number;
  children: number;
  groupType: string;
  fitness: string;
  experience: string;
  maxPriorAltitudeM: string;
  comfort: string;
  pace: string;
  mustHaves: string[];
  budgetBand: string;
  name: string;
  email: string;
  country: string;
  phone: string;
};

const defaults: WizardState = {
  activitySlugs: [],
  regionSlugs: [],
  durationBand: "any",
  tripSlug: "",
  freeText: "",
  earliestStart: "",
  latestStart: "",
  travelMonth: "",
  flexibleDays: 3,
  durationDays: 0,
  arrivalCity: "Kathmandu",
  adults: 0,
  children: 0,
  groupType: "couple",
  fitness: "balanced",
  experience: "",
  maxPriorAltitudeM: "",
  comfort: "teahouse",
  pace: "",
  mustHaves: [],
  budgetBand: "undisclosed",
  name: "",
  email: "",
  country: "",
  phone: "",
};

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function plainReason(text: string): string {
  return text
    .replace(/\b(?:ALT|LOG|PRM)-\d{3}\b:?\s*/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,])/g, "$1")
    .trim();
}

function loadSaved(): Partial<WizardState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<WizardState>) : {};
  } catch {
    return {};
  }
}

export function DesignWizard({
  trip,
  trips,
  activity,
}: {
  trip?: string;
  trips: ChooserTrip[];
  activity?: string;
}) {
  const saved = useMemo(() => loadSaved(), []);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<WizardState>(() => {
    const requestedTrip = trip || saved.tripSlug || "";
    const fromCatalog = trips.find((item) => item.slug === requestedTrip);
    const activitySlugs = isChooserActivity(activity)
      ? [activity]
      : fromCatalog
        ? [fromCatalog.activity]
        : saved.activitySlugs?.length
          ? saved.activitySlugs
          : defaults.activitySlugs;
    const durationBand = isDurationBand(saved.durationBand)
      ? saved.durationBand
      : defaults.durationBand;
    const regionSlugs = saved.regionSlugs?.[0]
      ? [saved.regionSlugs[0]]
      : defaults.regionSlugs;
    const matching = filterChooserTrips(trips, {
      activitySlug: activitySlugs[0] ?? "not-sure",
      regionSlugs,
      durationBand,
    });
    return {
      ...defaults,
      ...saved,
      activitySlugs,
      regionSlugs,
      durationBand,
      tripSlug: matchingTripSlug(matching, requestedTrip),
      earliestStart: saved.earliestStart || defaults.earliestStart,
      travelMonth: saved.travelMonth || defaults.travelMonth,
      durationDays: saved.durationDays || defaults.durationDays,
      adults: saved.adults ?? defaults.adults,
      experience: saved.experience || defaults.experience,
      pace: saved.pace || defaults.pace,
    };
  });
  const [draft, setDraft] = useState<DraftPreview | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [gaps, setGaps] = useState<WizardGap[]>([]);
  const [requestId, setRequestId] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [healthConsent, setHealthConsent] = useState(false);
  const [healthNotes, setHealthNotes] = useState("");

  useEffect(() => {
    const { name: _n, email: _e, phone: _p, ...safe } = values;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
  }, [values]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("step", String(step));
    if (values.tripSlug) url.searchParams.set("trip", values.tripSlug);
    else url.searchParams.delete("trip");
    window.history.replaceState(null, "", url.toString());
  }, [step, values.tripSlug]);

  const startDate = resolvedEarliestStart(values);
  const month = Number((startDate ?? values.travelMonth).slice(5, 7) || "0");
  const durationDays = resolvedDurationDays(values);
  const activityChosen = isChooserActivity(values.activitySlugs[0]);
  const gapIds = new Set(gaps.map((gap) => gap.id));
  const monsoon = month >= 6 && month <= 8;
  const matchingTrips = useMemo(
    () =>
      filterChooserTrips(trips, {
        activitySlug: values.activitySlugs[0] ?? "not-sure",
        regionSlugs: values.regionSlugs,
        durationBand: values.durationBand,
      }),
    [trips, values.activitySlugs, values.regionSlugs, values.durationBand],
  );

  function patch(next: Partial<WizardState>) {
    setGaps([]);
    setValues((prev) => ({ ...prev, ...next }));
  }

  function attemptStep(next: number) {
    const missing = gapsUntilStep(step, next, values, { privacy });
    if (missing.length > 0) {
      setGaps(missing);
      return;
    }
    setGaps([]);
    setStep(next);
  }

  function applyChooser(next: Partial<WizardState>) {
    setGaps([]);
    setValues((prev) => {
      const merged = { ...prev, ...next };
      const matching = filterChooserTrips(trips, {
        activitySlug: merged.activitySlugs[0] ?? "not-sure",
        regionSlugs: merged.regionSlugs,
        durationBand: merged.durationBand,
      });
      return { ...merged, tripSlug: matchingTripSlug(matching, merged.tripSlug) };
    });
  }

  async function onGenerate() {
    setBusy(true);
    setError("");
    try {
      const result = await generateDraft({
        tripSlug: values.tripSlug || undefined,
        activitySlugs: values.activitySlugs.filter((s) => s !== "not-sure"),
        regionSlugs: values.regionSlugs,
        durationDays,
        month: month || undefined,
        fitness: values.fitness,
        experience: values.experience,
        maxPriorAltitudeM: values.maxPriorAltitudeM
          ? Number(values.maxPriorAltitudeM)
          : undefined,
        pace: values.pace,
        comfort: values.comfort,
      });
      if (!result.ok) {
        setError(result.error);
        setStep(6);
        return;
      }
      setDraft({
        draftId: result.data.draftId,
        narrative: result.data.narrative ?? "",
        days: result.data.days,
        explanations: result.data.explanations,
        planReasons: result.data.planReasons,
        violations: result.data.violations,
        mocked: result.data.mocked,
      });
    } catch {
      setError("The designer could not run. You can still send your request.");
      setStep(6);
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(formData: FormData) {
    const nextValues = {
      ...values,
      name: String(formData.get("name") ?? values.name),
      email: String(formData.get("email") ?? values.email),
      country: String(formData.get("country") ?? values.country),
      phone: String(formData.get("phone") ?? values.phone),
    };
    setValues(nextValues);
    const missing = gapsForStep(6, nextValues, { privacy });
    if (missing.length > 0) {
      setGaps(missing);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const payload = {
        tripSlug: values.tripSlug || undefined,
        activitySlugs: values.activitySlugs.filter((s) => s !== "not-sure"),
        regionSlugs: values.regionSlugs,
        freeText: values.freeText || undefined,
        earliestStart: startDate ?? values.earliestStart,
        latestStart: values.latestStart || undefined,
        flexibleDays: values.flexibleDays,
        durationDays: durationDays ?? values.durationDays,
        arrivalCity: values.arrivalCity,
        adults: values.adults,
        children: values.children,
        groupType: values.groupType,
        fitness: values.fitness,
        experience: values.experience,
        maxPriorAltitudeM: values.maxPriorAltitudeM
          ? Number(values.maxPriorAltitudeM)
          : undefined,
        healthNotes: healthNotes || undefined,
        healthConsent: healthConsent ? "on" : undefined,
        comfort: values.comfort,
        pace: values.pace,
        mustHaves: values.mustHaves,
        budgetBand: values.budgetBand,
        name: nextValues.name,
        email: nextValues.email,
        country: nextValues.country,
        phone: nextValues.phone || undefined,
        draftId: draft?.draftId,
        privacy: "on" as const,
        marketing: marketing ? "on" : undefined,
        website: "",
        turnstileToken: DUMMY_TURNSTILE,
      };
      const result = await submitTripRequest(payload);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      window.localStorage.removeItem(STORAGE_KEY);
      setRequestId(result.data.id);
    } catch {
      setError("Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (requestId) {
    return (
      <div>
        <Heading as="h1">Thank you. Your journey is with a specialist now.</Heading>
        <Text className="mt-4" role="status">
          We have your request ({requestId}). A specialist will design it around your
          dates. This is not a booking.
        </Text>
        <p className="mt-4 text-small">
          Check your inbox, then open your{" "}
          <a className="underline" href="/account">
            quote inbox
          </a>{" "}
          with a magic link.
        </p>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <ol
        className="hidden self-start lg:sticky lg:top-[var(--header-h)] lg:grid lg:gap-2"
        aria-label="Request steps"
      >
        {STEPS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={cn(
                listControlClass(step === item.id),
                step !== item.id && "text-muted-foreground",
              )}
              aria-current={step === item.id ? "step" : undefined}
              onClick={() => attemptStep(item.id)}
            >
              Step {item.id}: {item.name}
            </button>
          </li>
        ))}
      </ol>
      <div>
        <p className="text-caption text-muted-foreground" aria-live="polite">
          Step {step} of 6: {STEPS[step - 1]?.name}
        </p>
        <div
          className="mt-2 h-1 rounded-pill bg-muted"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={6}
          aria-valuenow={step}
        >
          <div
            className="h-1 rounded-pill bg-primary"
            style={{ width: `${String((step / 6) * 100)}%` }}
          />
        </div>
        {error ? (
          <p role="alert" className="mt-4 text-small text-prayer-red">
            {error}
          </p>
        ) : null}
        {gaps.length > 0 ? (
          <div
            role="alert"
            data-testid="wizard-gaps"
            className="mt-4 rounded-md border border-prayer-red bg-ember-50 px-4 py-3 text-small text-prayer-red"
          >
            <p className="font-semibold">Please add what’s missing:</p>
            <ul className="mt-2 grid gap-1">
              {gaps.map((gap) => (
                <li key={gap.id}>{gap.message}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {step === 1 ? (
          <section className="mt-6 grid gap-6">
            <Heading as="h2">What are you dreaming of?</Heading>
            <fieldset
              aria-invalid={gapIds.has("activity") || undefined}
              className={
                gapIds.has("activity")
                  ? "rounded-md ring-2 ring-prayer-red/70"
                  : undefined
              }
            >
              <legend className="text-small font-medium">Activity (required)</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {CHOOSER_ACTIVITIES.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    aria-pressed={values.activitySlugs[0] === item.slug}
                    className={chipClass(values.activitySlugs[0] === item.slug)}
                    onClick={() => applyChooser({ activitySlugs: [item.slug] })}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-small font-medium">Regions</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {REGIONS.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    aria-pressed={values.regionSlugs[0] === item.slug}
                    className={chipClass(values.regionSlugs[0] === item.slug)}
                    onClick={() =>
                      applyChooser({
                        regionSlugs: exclusiveSlug(values.regionSlugs, item.slug),
                      })
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-small font-medium">Days</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {DURATION_BANDS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={values.durationBand === item.id}
                    className={chipClass(values.durationBand === item.id)}
                    onClick={() => applyChooser({ durationBand: item.id })}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-small font-medium">Specific trip (optional)</legend>
              {!activityChosen ? (
                <p className="mt-2 text-small text-muted-foreground" role="status">
                  Choose an activity to see matching published trips.
                </p>
              ) : matchingTrips.length === 0 ? (
                <p className="mt-2 text-small text-muted-foreground" role="status">
                  No matching published trip.
                </p>
              ) : (
                <>
                  <p className="mt-2 text-caption text-muted-foreground">
                    {matchingTrips.length} matching published{" "}
                    {matchingTrips.length === 1 ? "trip" : "trips"}
                  </p>
                  <ul
                    className="mt-2 divide-y divide-border rounded-md border border-border"
                    data-testid="matching-trips"
                  >
                    <li>
                      <button
                        type="button"
                        aria-pressed={values.tripSlug === ""}
                        className={listControlClass(values.tripSlug === "")}
                        onClick={() => patch({ tripSlug: "" })}
                      >
                        Start from scratch
                      </button>
                    </li>
                    {matchingTrips.map((item) => (
                      <li key={item.slug}>
                        <button
                          type="button"
                          aria-pressed={values.tripSlug === item.slug}
                          className={listControlClass(values.tripSlug === item.slug)}
                          onClick={() => patch({ tripSlug: item.slug })}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </fieldset>
            <div
              className={cn(
                "grid gap-2",
                gapIds.has("description") && "rounded-md ring-2 ring-prayer-red/70",
              )}
            >
              <Label htmlFor="freeText">
                Describe it in your own words
                {values.activitySlugs[0] === "not-sure" ? " (required)" : ""}
              </Label>
              <Textarea
                id="freeText"
                aria-required={values.activitySlugs[0] === "not-sure"}
                aria-invalid={gapIds.has("description") || undefined}
                value={values.freeText}
                onChange={(event) => patch({ freeText: event.target.value })}
              />
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="mt-6 grid gap-4">
            <Heading as="h2">When can you travel?</Heading>
            <div
              className={cn(
                "grid gap-2",
                gapIds.has("window") && "rounded-md ring-2 ring-prayer-red/70",
              )}
            >
              <Label htmlFor="travelMonth">Month you want to travel</Label>
              <Input
                id="travelMonth"
                type="month"
                aria-invalid={gapIds.has("window") || undefined}
                value={values.travelMonth}
                onChange={(event) => patch({ travelMonth: event.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="earliestStart">Earliest start</Label>
              <Input
                id="earliestStart"
                name="earliestStart"
                type="date"
                aria-invalid={gapIds.has("window") || undefined}
                value={values.earliestStart}
                onChange={(event) => patch({ earliestStart: event.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="latestStart">Latest start (optional)</Label>
              <Input
                id="latestStart"
                type="date"
                value={values.latestStart}
                onChange={(event) => patch({ latestStart: event.target.value })}
              />
            </div>
            <div
              className={cn(
                "grid gap-2",
                gapIds.has("duration") && "rounded-md ring-2 ring-prayer-red/70",
              )}
            >
              <Label htmlFor="durationDays">
                Trip length (days)
                {values.durationBand === "any" ? " (required)" : ""}
              </Label>
              <Input
                id="durationDays"
                type="number"
                min={5}
                max={40}
                aria-required={values.durationBand === "any"}
                aria-invalid={gapIds.has("duration") || undefined}
                value={values.durationDays || ""}
                onChange={(event) =>
                  patch({ durationDays: Number(event.target.value) || 0 })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="flexibleDays">Flexible ± days</Label>
              <Input
                id="flexibleDays"
                type="number"
                min={0}
                max={14}
                value={values.flexibleDays}
                onChange={(event) => patch({ flexibleDays: Number(event.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="arrivalCity">Arrival city</Label>
              <Input
                id="arrivalCity"
                value={values.arrivalCity}
                onChange={(event) => patch({ arrivalCity: event.target.value })}
              />
            </div>
            {monsoon ? (
              <p className="text-small text-muted-foreground">
                Monsoon in July: we would often suggest Mustang or Dolpo. This is
                guidance, not a block.
              </p>
            ) : null}
          </section>
        ) : null}

        {step === 3 ? (
          <section className="mt-6 grid gap-4">
            <Heading as="h2">Tell us about your group.</Heading>
            <div
              className={cn(
                "grid gap-2",
                gapIds.has("party") && "rounded-md ring-2 ring-prayer-red/70",
              )}
            >
              <Label htmlFor="adults">Adults (required)</Label>
              <Input
                id="adults"
                type="number"
                min={1}
                max={12}
                aria-required
                aria-invalid={gapIds.has("party") || undefined}
                value={values.adults || ""}
                onChange={(event) => patch({ adults: Number(event.target.value) || 0 })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="children">Children</Label>
              <Input
                id="children"
                type="number"
                min={0}
                max={8}
                value={values.children}
                onChange={(event) => patch({ children: Number(event.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="groupType">Group type</Label>
              <select
                id="groupType"
                className={cn(
                  "h-11 rounded-sm border border-border-strong bg-surface px-3",
                  controlMotionClass,
                  controlFocusClass,
                  "hover:border-primary",
                )}
                value={values.groupType}
                onChange={(event) => patch({ groupType: event.target.value })}
              >
                <option value="solo">Solo</option>
                <option value="couple">Couple</option>
                <option value="friends">Friends</option>
                <option value="family">Family</option>
                <option value="corporate">Corporate</option>
                <option value="private">Private</option>
              </select>
            </div>
            <fieldset
              aria-invalid={gapIds.has("experience") || undefined}
              className={
                gapIds.has("experience")
                  ? "rounded-md ring-2 ring-prayer-red/70"
                  : undefined
              }
            >
              <legend className="text-small font-medium">
                Experience or prior altitude (required)
              </legend>
              {[
                ["first-multi-day", "First multi-day hike"],
                ["regular", "Regular hiker"],
                ["high-altitude", "High-altitude experience above 4,000 m"],
                ["technical", "Technical climbing"],
              ].map(([value, label]) => (
                <label key={value} className="mt-2 flex min-h-11 items-center gap-3">
                  <input
                    type="radio"
                    name="experience"
                    checked={values.experience === value}
                    onChange={() => patch({ experience: value })}
                  />
                  {label}
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend className="text-small font-medium">Fitness</legend>
              {[
                ["easy", "Easy — shorter days"],
                ["balanced", "Balanced"],
                ["strong", "Strong mountain days"],
              ].map(([value, label]) => (
                <label key={value} className="mt-2 flex min-h-11 items-center gap-3">
                  <input
                    type="radio"
                    name="fitness"
                    checked={values.fitness === value}
                    onChange={() => patch({ fitness: value })}
                  />
                  {label}
                </label>
              ))}
            </fieldset>
            <div className="grid gap-2">
              <Label htmlFor="maxPriorAltitudeM">Highest sleep altitude before (m)</Label>
              <Input
                id="maxPriorAltitudeM"
                type="number"
                min={0}
                max={9000}
                value={values.maxPriorAltitudeM}
                onChange={(event) => patch({ maxPriorAltitudeM: event.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="healthNotes">Health or mobility notes (optional)</Label>
              <Textarea
                id="healthNotes"
                value={healthNotes}
                onChange={(event) => setHealthNotes(event.target.value)}
              />
            </div>
            <label className="flex min-h-11 items-center gap-3 text-small">
              <input
                type="checkbox"
                checked={healthConsent}
                onChange={(event) => setHealthConsent(event.target.checked)}
              />
              I consent to storing these health notes only to design a safer itinerary
            </label>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="mt-6 grid gap-4">
            <Heading as="h2">How do you like to travel?</Heading>
            <fieldset>
              <legend className="text-small font-medium">Accommodation</legend>
              {[
                ["teahouse", "Teahouse"],
                ["comfort", "Comfort lodge"],
                ["luxury", "Luxury lodge"],
              ].map(([value, label]) => (
                <label key={value} className="mt-2 flex min-h-11 items-center gap-3">
                  <input
                    type="radio"
                    name="comfort"
                    checked={values.comfort === value}
                    onChange={() => patch({ comfort: value })}
                  />
                  {label}
                </label>
              ))}
            </fieldset>
            <fieldset
              aria-invalid={gapIds.has("pace") || undefined}
              className={
                gapIds.has("pace") ? "rounded-md ring-2 ring-prayer-red/70" : undefined
              }
            >
              <legend className="text-small font-medium">Pace (required)</legend>
              {[
                ["relaxed", "Relaxed"],
                ["balanced", "Balanced"],
                ["ambitious", "Ambitious"],
              ].map(([value, label]) => (
                <label key={value} className="mt-2 flex min-h-11 items-center gap-3">
                  <input
                    type="radio"
                    name="pace"
                    checked={values.pace === value}
                    onChange={() => patch({ pace: value })}
                  />
                  {label}
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend className="text-small font-medium">Must-haves</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {MUST_HAVES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={values.mustHaves.includes(item)}
                    className={chipClass(values.mustHaves.includes(item))}
                    onClick={() => patch({ mustHaves: toggle(values.mustHaves, item) })}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-2">
              <Label htmlFor="budgetBand">How you’d like the journey to feel</Label>
              <select
                id="budgetBand"
                className={cn(
                  "h-11 rounded-sm border border-border-strong bg-surface px-3",
                  controlMotionClass,
                  controlFocusClass,
                  "hover:border-primary",
                )}
                value={values.budgetBand}
                onChange={(event) => patch({ budgetBand: event.target.value })}
              >
                <option value="undisclosed">Prefer not to say</option>
                <option value="modest">Modest</option>
                <option value="comfortable">Comfortable</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </section>
        ) : null}

        {step === 5 ? (
          <section
            className="mt-6 grid scroll-mt-[var(--header-h)] gap-4"
            aria-busy={busy}
          >
            <Heading as="h2" className="scroll-mt-[var(--header-h)]">
              Here is a first sketch.
            </Heading>
            <p className="rounded-md border border-border bg-muted px-4 py-3 text-small">
              AI-assisted draft. Not a confirmed itinerary or quote. Planning guidance,
              not medical advice. Altitudes are copied from catalog days, never invented.
            </p>
            {!draft ? (
              <Button
                type="button"
                variant="magnetic"
                onClick={onGenerate}
                disabled={busy}
              >
                {busy ? "Designing…" : "Generate draft"}
              </Button>
            ) : (
              <div>
                <p className="sr-only" role="status">
                  Draft ready
                </p>
                <Text>{draft.narrative}</Text>
                {draft.planReasons.length > 0 ? (
                  <div className="mt-6" data-testid="plan-reasons">
                    <Heading as="h3">Why this plan</Heading>
                    <ul className="mt-3 grid gap-2">
                      {draft.planReasons.map((item) => (
                        <li key={`${item.id}-${item.message}`} className="text-small">
                          {plainReason(item.message)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <ol className="mt-6 grid gap-3">
                  {draft.days.map((day) => (
                    <li
                      key={day.dayNumber}
                      className="rounded-md border border-border p-4"
                    >
                      <p className="font-semibold">
                        Day {day.dayNumber}: {day.title}
                      </p>
                      <p className="text-small text-muted-foreground">
                        {day.fromPlace} → {day.toPlace} · sleep {day.sleepAltitudeM} m ·
                        high {day.highPointM} m · {day.dayType}
                      </p>
                    </li>
                  ))}
                </ol>
                {draft.explanations.length > 0 ? (
                  <ul className="mt-4 text-small text-muted-foreground">
                    {draft.explanations.map((item) => (
                      <li key={item.id}>{plainReason(item.message)}</li>
                    ))}
                  </ul>
                ) : null}
                <Button
                  className="mt-4"
                  type="button"
                  variant="secondary"
                  onClick={onGenerate}
                  disabled={busy}
                >
                  Regenerate
                </Button>
              </div>
            )}
            <button
              type="button"
              className="text-left text-small underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] hover:text-primary hover:decoration-primary active:text-primary-hover"
              onClick={() => attemptStep(6)}
            >
              Skip — send without a draft
            </button>
          </section>
        ) : null}

        {step === 6 ? (
          <form action={onSubmit} className="mt-6 grid max-w-xl gap-4">
            <Heading as="h2">Where should we send your private quote?</Heading>
            <input type="hidden" name="turnstileToken" value={DUMMY_TURNSTILE} />
            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="grid gap-2">
              <Label htmlFor="name">Name (required)</Label>
              <Input
                id="name"
                name="name"
                aria-required
                aria-invalid={gapIds.has("name") || undefined}
                autoComplete="name"
                value={values.name}
                onChange={(event) => patch({ name: event.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email (required)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                aria-required
                aria-invalid={gapIds.has("email") || undefined}
                autoComplete="email"
                value={values.email}
                onChange={(event) => patch({ email: event.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country (optional)</Label>
              <Input
                id="country"
                name="country"
                autoComplete="country-name"
                value={values.country}
                onChange={(event) => patch({ country: event.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone / WhatsApp (optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(event) => patch({ phone: event.target.value })}
              />
            </div>
            <label className="flex min-h-11 items-center gap-3 text-small">
              <input
                type="checkbox"
                name="privacy"
                required
                checked={privacy}
                onChange={(event) => {
                  setPrivacy(event.target.checked);
                  setGaps([]);
                }}
              />
              I have read the privacy policy (required)
            </label>
            <label className="flex min-h-11 items-center gap-3 text-small">
              <input
                type="checkbox"
                name="marketing"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
              Optional updates about new journeys
            </label>
            <Button type="submit" variant="magnetic" disabled={busy}>
              {busy ? "Sending…" : "Send my request"}
            </Button>
          </form>
        ) : null}

        <div className="mt-8 mb-28 flex flex-wrap gap-3 border-t border-border bg-background py-4">
          {step > 1 ? (
            <Button
              type="button"
              variant="secondary"
              className="shrink-0"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          ) : null}
          {step < 6 ? (
            <Button
              type="button"
              className="shrink-0"
              onClick={() => attemptStep(step + 1)}
            >
              Next
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button, Heading, Input, Label, Text, Textarea } from "@ok/ui";
import { useEffect, useMemo, useState } from "react";

import { generateDraft, submitTripRequest } from "@/app/(frontend)/actions/quote";

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

const ACTIVITIES = [
  { slug: "trekking", label: "Trek" },
  { slug: "tours", label: "Tour" },
  { slug: "peak-climbing", label: "Peak" },
  { slug: "expeditions", label: "Expedition" },
  { slug: "not-sure", label: "Not sure" },
] as const;

const REGIONS = [
  { slug: "everest", label: "Everest / Khumbu" },
  { slug: "annapurna", label: "Annapurna" },
  { slug: "langtang", label: "Langtang" },
  { slug: "manaslu", label: "Manaslu" },
  { slug: "mustang", label: "Mustang" },
  { slug: "dolpo", label: "Dolpo" },
] as const;

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

type TripOption = { slug: string; title: string };

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
  violations: { id: string; message: string }[];
  mocked: boolean;
};

type WizardState = {
  activitySlugs: string[];
  regionSlugs: string[];
  tripSlug: string;
  freeText: string;
  earliestStart: string;
  latestStart: string;
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
  activitySlugs: ["trekking"],
  regionSlugs: [],
  tripSlug: "",
  freeText: "",
  earliestStart: "",
  latestStart: "",
  flexibleDays: 3,
  durationDays: 14,
  arrivalCity: "Kathmandu",
  adults: 2,
  children: 0,
  groupType: "couple",
  fitness: "balanced",
  experience: "regular",
  maxPriorAltitudeM: "",
  comfort: "teahouse",
  pace: "balanced",
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

function defaultStart(): string {
  const date = new Date();
  date.setUTCMonth(date.getUTCMonth() + 3);
  return date.toISOString().slice(0, 10);
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

export function DesignWizard({ trip, trips }: { trip?: string; trips: TripOption[] }) {
  const saved = useMemo(() => loadSaved(), []);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<WizardState>({
    ...defaults,
    ...saved,
    tripSlug: trip || saved.tripSlug || "",
    earliestStart: saved.earliestStart || defaultStart(),
  });
  const [draft, setDraft] = useState<DraftPreview | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
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
    window.history.replaceState(null, "", url.toString());
  }, [step, values.tripSlug]);

  const month = Number(values.earliestStart.slice(5, 7) || "0");
  const monsoon = month >= 6 && month <= 8;

  function patch(next: Partial<WizardState>) {
    setValues((prev) => ({ ...prev, ...next }));
  }

  async function onGenerate() {
    setBusy(true);
    setError("");
    try {
      const result = await generateDraft({
        tripSlug: values.tripSlug || undefined,
        activitySlugs: values.activitySlugs.filter((s) => s !== "not-sure"),
        regionSlugs: values.regionSlugs,
        durationDays: values.durationDays,
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
    setBusy(true);
    setError("");
    try {
      const payload = {
        tripSlug: values.tripSlug || undefined,
        activitySlugs: values.activitySlugs.filter((s) => s !== "not-sure"),
        regionSlugs: values.regionSlugs,
        freeText: values.freeText || undefined,
        earliestStart: values.earliestStart,
        latestStart: values.latestStart || undefined,
        flexibleDays: values.flexibleDays,
        durationDays: values.durationDays,
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
        name: String(formData.get("name") ?? values.name),
        email: String(formData.get("email") ?? values.email),
        country: String(formData.get("country") ?? values.country),
        phone: String(formData.get("phone") ?? values.phone) || undefined,
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
          We have your request ({requestId}). A specialist will send a private quote —
          never a public price. This is not a booking or a payment.
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
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <ol className="hidden gap-2 lg:grid" aria-label="Request steps">
        {STEPS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`block min-h-11 w-full rounded-sm px-3 text-left text-small ${
                step === item.id ? "bg-muted font-semibold" : "text-muted-foreground"
              }`}
              aria-current={step === item.id ? "step" : undefined}
              onClick={() => setStep(item.id)}
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

        {step === 1 ? (
          <section className="mt-6 grid gap-6">
            <Heading as="h2">What are you dreaming of?</Heading>
            <fieldset>
              <legend className="text-small font-medium">Activity</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {ACTIVITIES.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    aria-pressed={values.activitySlugs.includes(item.slug)}
                    className={`min-h-11 rounded-md border px-4 ${
                      values.activitySlugs.includes(item.slug)
                        ? "border-primary bg-muted"
                        : "border-border"
                    }`}
                    onClick={() =>
                      patch({ activitySlugs: toggle(values.activitySlugs, item.slug) })
                    }
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
                    aria-pressed={values.regionSlugs.includes(item.slug)}
                    className={`min-h-11 rounded-md border px-4 ${
                      values.regionSlugs.includes(item.slug)
                        ? "border-primary bg-muted"
                        : "border-border"
                    }`}
                    onClick={() =>
                      patch({ regionSlugs: toggle(values.regionSlugs, item.slug) })
                    }
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-2">
              <Label htmlFor="tripSlug">Specific trip (optional)</Label>
              <select
                id="tripSlug"
                className="h-11 rounded-sm border border-border-strong bg-surface px-3"
                value={values.tripSlug}
                onChange={(event) => patch({ tripSlug: event.target.value })}
              >
                <option value="">Start from scratch</option>
                {trips.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="freeText">Describe it in your own words</Label>
              <Textarea
                id="freeText"
                value={values.freeText}
                onChange={(event) => patch({ freeText: event.target.value })}
              />
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="mt-6 grid gap-4">
            <Heading as="h2">When can you travel?</Heading>
            <div className="grid gap-2">
              <Label htmlFor="earliestStart">Earliest start</Label>
              <Input
                id="earliestStart"
                name="earliestStart"
                type="date"
                required
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
            <div className="grid gap-2">
              <Label htmlFor="durationDays">Trip length (days)</Label>
              <Input
                id="durationDays"
                type="number"
                min={5}
                max={40}
                value={values.durationDays}
                onChange={(event) => patch({ durationDays: Number(event.target.value) })}
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
            <div className="grid gap-2">
              <Label htmlFor="adults">Adults</Label>
              <Input
                id="adults"
                type="number"
                min={1}
                max={12}
                value={values.adults}
                onChange={(event) => patch({ adults: Number(event.target.value) })}
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
                className="h-11 rounded-sm border border-border-strong bg-surface px-3"
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
            <fieldset>
              <legend className="text-small font-medium">Experience</legend>
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
            <fieldset>
              <legend className="text-small font-medium">Pace</legend>
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
                    className={`min-h-11 rounded-md border px-4 text-small ${
                      values.mustHaves.includes(item)
                        ? "border-primary bg-muted"
                        : "border-border"
                    }`}
                    onClick={() => patch({ mustHaves: toggle(values.mustHaves, item) })}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-2">
              <Label htmlFor="budgetBand">
                Budget expectation (helps us tailor; not a price)
              </Label>
              <select
                id="budgetBand"
                className="h-11 rounded-sm border border-border-strong bg-surface px-3"
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
          <section className="mt-6 grid gap-4" aria-busy={busy}>
            <Heading as="h2">Here is a first sketch.</Heading>
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
                      <li key={item.id}>
                        {item.id}: {item.message}
                      </li>
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
              className="text-left text-small underline"
              onClick={() => setStep(6)}
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                autoComplete="name"
                defaultValue={values.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                defaultValue={values.email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                required
                autoComplete="country-name"
                defaultValue={values.country}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone / WhatsApp (optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                defaultValue={values.phone}
              />
            </div>
            <label className="flex min-h-11 items-center gap-3 text-small">
              <input
                type="checkbox"
                name="privacy"
                required
                checked={privacy}
                onChange={(event) => setPrivacy(event.target.checked)}
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
            <Button type="submit" variant="magnetic" disabled={busy || !privacy}>
              {busy ? "Sending…" : "Send my request"}
            </Button>
          </form>
        ) : null}

        <div className="sticky bottom-0 mt-8 flex gap-3 bg-background py-4">
          {step > 1 ? (
            <Button type="button" variant="secondary" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : null}
          {step < 6 ? (
            <Button type="button" onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

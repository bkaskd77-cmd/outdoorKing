import { env } from "@ok/env/server";
import { z } from "zod";

import { aliases } from "./models.config";
import {
  explainCatalogPlan,
  plannerPace,
  type ItineraryPlanner,
  type PlanReason,
  type PlannedItinerary,
  type SeasonFit,
} from "./plan-reasons";
import { DESIGNER_PLAN_VERSION, designerPlanSystem } from "./prompts/designer.plan.v1";
import {
  autoFixItinerary,
  evaluateItinerary,
  type DayType,
  type ItineraryDayInput,
  type RuleReport,
} from "./rules";
import {
  assertNoCustomerPrices,
  itineraryDraftSchema,
  type DesignerParty,
  type ItineraryDraft,
  type ResolvedDraftDay,
} from "./schemas/itinerary-draft";

export type {
  ItineraryPlanner,
  PlanItineraryRequest,
  PlanReason,
  PlannedItinerary,
  SeasonFit,
} from "./plan-reasons";
export { plannerPace } from "./plan-reasons";

export type CatalogDayLike = {
  dayNumber: number;
  title: string;
  fromPlace: string;
  toPlace: string;
  startAltitudeM: number;
  highPointM: number;
  sleepAltitudeM: number;
  dayType: DayType;
};

export type CatalogTripLike = {
  slug: string;
  title: string;
  activity: string;
  regions: string[];
  durationMin: number;
  durationMax: number;
  usesLukla: boolean;
  permits: string[];
  peaks: string[];
  seasons: string[];
  days: CatalogDayLike[];
};

export type RetrievedCatalog = {
  trip: CatalogTripLike;
  facts: string;
};

export function retrieveCatalog(
  trips: CatalogTripLike[],
  party: DesignerParty,
): RetrievedCatalog {
  const bySlug = party.tripSlug
    ? trips.find((t) => t.slug === party.tripSlug)
    : undefined;
  const byRegion = party.regionSlugs?.length
    ? trips.find((t) => t.regions.some((r) => party.regionSlugs?.includes(r)))
    : undefined;
  const byActivity = party.activitySlugs?.length
    ? trips.find((t) => party.activitySlugs?.includes(t.activity))
    : undefined;
  const trip =
    bySlug ??
    byRegion ??
    byActivity ??
    trips.find((t) => t.slug === "everest-base-camp-trek") ??
    trips[0];
  if (!trip) throw new Error("No catalog trips available.");
  const facts = [
    `tripId=${trip.slug}`,
    `title=${trip.title}`,
    `lukla=${String(trip.usesLukla)}`,
    `permits=${trip.permits.join(",")}`,
    ...trip.days.map(
      (d) =>
        `day ${String(d.dayNumber)} id=${trip.slug}:${String(d.dayNumber)} ${d.fromPlace}->${d.toPlace} sleep=${String(d.sleepAltitudeM)} high=${String(d.highPointM)} type=${d.dayType}`,
    ),
  ].join("\n");
  return { trip, facts };
}

export function catalogToDraft(trip: CatalogTripLike): ItineraryDraft {
  return {
    baseTripId: trip.slug,
    days: trip.days.map((d) => ({
      dayNumber: d.dayNumber,
      itineraryDayId: `${trip.slug}:${String(d.dayNumber)}`,
      fromPlaceId: d.fromPlace || trip.slug,
      toPlaceId: d.toPlace || trip.slug,
      dayType: d.dayType,
      rationale: d.title,
    })),
    assumptions: [
      `Draft reuses catalog itinerary ${trip.slug}. Altitudes copied from sourced days.`,
    ],
    questionsForCustomer: [],
    narrative: `${trip.title} draft for specialist review. AI-assisted, not a confirmed itinerary or quote. Planning guidance, not medical advice.`,
  };
}

function lookupDay(
  trips: CatalogTripLike[],
  id: string | null,
): CatalogDayLike | undefined {
  if (!id) return undefined;
  const [slug, num] = id.split(":");
  const trip = trips.find((t) => t.slug === slug);
  const dayNumber = Number(num);
  return trip?.days.find((d) => d.dayNumber === dayNumber);
}

export function resolveDraft(
  draft: ItineraryDraft,
  trips: CatalogTripLike[],
  fallback: CatalogTripLike,
): ResolvedDraftDay[] {
  return draft.days.map((day) => {
    const catalog =
      lookupDay(trips, day.itineraryDayId) ??
      fallback.days.find((item) => item.dayNumber === day.dayNumber) ??
      fallback.days[0];
    const from = catalog?.fromPlace ?? day.fromPlaceId;
    const to = catalog?.toPlace ?? day.toPlaceId;
    return {
      ...day,
      title: catalog?.title ?? `${from} to ${to}`,
      fromPlace: from,
      toPlace: to,
      startAltitudeM: catalog?.startAltitudeM ?? fallback.days[0]?.startAltitudeM ?? 0,
      highPointM:
        catalog?.highPointM ??
        catalog?.sleepAltitudeM ??
        fallback.days[0]?.sleepAltitudeM ??
        0,
      sleepAltitudeM: catalog?.sleepAltitudeM ?? fallback.days[0]?.sleepAltitudeM ?? 0,
    };
  });
}

function resolvedToInput(days: ResolvedDraftDay[], trip: CatalogTripLike) {
  return days.map((d) => ({
    dayNumber: d.dayNumber,
    title: d.title,
    fromPlace: d.fromPlace,
    toPlace: d.toPlace,
    startAltitudeM: d.startAltitudeM,
    highPointM: d.highPointM,
    sleepAltitudeM: d.sleepAltitudeM,
    dayType: d.dayType,
    peakHeightM: trip.peaks.includes("island-peak") ? 6165 : undefined,
    hasPeakPermit: trip.permits.includes("nma-island-peak") || !trip.peaks.length,
  }));
}

async function planWithModel(
  facts: string,
  party: DesignerParty,
  fallback: ItineraryDraft,
): Promise<{ draft: ItineraryDraft; modelId: string; mocked: boolean }> {
  if (env.AI_MOCK || !env.AI_DESIGNER_ENABLED) {
    return { draft: fallback, modelId: "mock", mocked: true };
  }
  try {
    const { streamObject } = await import("ai");
    const { gateway } = await import("@ai-sdk/gateway");
    const spec = aliases["designer.plan"];
    const result = streamObject({
      model: gateway(spec.primary),
      schema: itineraryDraftSchema,
      system: designerPlanSystem,
      prompt: `<retrieved_facts>\n${facts}\n</retrieved_facts>\nParty: ${JSON.stringify(party)}`,
    });
    const object = await result.object;
    return { draft: object, modelId: spec.primary, mocked: false };
  } catch {
    return { draft: fallback, modelId: "fallback-catalog", mocked: true };
  }
}

export type DesignerResult = {
  draft: ItineraryDraft;
  resolvedDays: ResolvedDraftDay[];
  report: RuleReport;
  appliedFixes: string[];
  repaired: boolean;
  mocked: boolean;
  modelId: string;
  promptVersion: typeof DESIGNER_PLAN_VERSION;
  planReasons: PlanReason[];
  seasonFit: SeasonFit;
  plannerSource: "intel" | "catalog";
};

function plannedDaysToInput(
  days: PlannedItinerary["days"],
  trip: CatalogTripLike,
): ItineraryDayInput[] {
  return days.map((day) => ({
    dayNumber: day.dayNumber,
    title: day.title,
    fromPlace: day.fromPlace,
    toPlace: day.toPlace,
    startAltitudeM: day.startAltitudeM,
    highPointM: day.highPointM,
    sleepAltitudeM: day.sleepAltitudeM,
    dayType: day.dayType,
    peakHeightM: trip.peaks.includes("island-peak") ? 6165 : undefined,
    hasPeakPermit: trip.permits.includes("nma-island-peak") || !trip.peaks.length,
  }));
}

function daysToResolved(
  days: ItineraryDayInput[],
  trip: CatalogTripLike,
): ResolvedDraftDay[] {
  return days.map((day) => ({
    dayNumber: day.dayNumber,
    itineraryDayId: `${trip.slug}:${String(day.dayNumber)}`,
    fromPlaceId: day.fromPlace ?? day.title,
    toPlaceId: day.toPlace ?? day.title,
    dayType: day.dayType,
    rationale: day.title,
    title: day.title,
    fromPlace: day.fromPlace ?? "",
    toPlace: day.toPlace ?? "",
    startAltitudeM: day.startAltitudeM,
    highPointM: day.highPointM,
    sleepAltitudeM: day.sleepAltitudeM,
  }));
}

function draftFromDays(
  days: ItineraryDayInput[],
  trip: CatalogTripLike,
  narrative: string,
  assumptions: string[],
): ItineraryDraft {
  return {
    baseTripId: trip.slug,
    days: days.map((day) => ({
      dayNumber: day.dayNumber,
      itineraryDayId: `${trip.slug}:${String(day.dayNumber)}`,
      fromPlaceId: day.fromPlace ?? day.title,
      toPlaceId: day.toPlace ?? day.title,
      dayType: day.dayType,
      rationale: day.title,
    })),
    assumptions,
    questionsForCustomer: [],
    narrative,
  };
}

function reasonsFromIntel(planned: PlannedItinerary): PlanReason[] {
  return planned.reasons.map((reason) => ({
    id: reason.id,
    text: reason.text,
  }));
}

async function tryIntelPlan(
  trip: CatalogTripLike,
  party: DesignerParty,
  options: {
    usesLukla: boolean;
    durationMin: number;
    durationMax: number;
    partyMaxPriorAltitudeM?: number;
  },
  planner: ItineraryPlanner,
): Promise<{
  days: ItineraryDayInput[];
  report: RuleReport;
  appliedFixes: string[];
  reasons: PlanReason[];
  seasonFit: SeasonFit;
} | null> {
  const planned = await planner({
    days: trip.days,
    month: party.month,
    pace: plannerPace(party.pace),
    maxPriorAltitudeM: party.maxPriorAltitudeM,
    usesLukla: options.usesLukla,
    seasons: trip.seasons,
  });
  if (!planned?.days.length) return null;
  const input = plannedDaysToInput(planned.days, trip);
  const first = evaluateItinerary(input, options);
  const fixed =
    first.violations.length > 0
      ? autoFixItinerary(input, options)
      : { days: input, report: first, applied: [] };
  if (fixed.report.violations.length > 0) return null;
  return {
    days: fixed.days,
    report: fixed.report,
    appliedFixes: fixed.applied,
    reasons: reasonsFromIntel(planned),
    seasonFit: planned.seasonFit,
  };
}

export async function designItinerary(
  trips: CatalogTripLike[],
  party: DesignerParty,
  planner?: ItineraryPlanner,
): Promise<DesignerResult> {
  const retrieved = retrieveCatalog(trips, party);
  const fallback = catalogToDraft(retrieved.trip);
  const options = {
    usesLukla: retrieved.trip.usesLukla || Boolean(party.usesLuklaHint),
    durationMin: retrieved.trip.durationMin,
    durationMax: retrieved.trip.durationMax,
    partyMaxPriorAltitudeM: party.maxPriorAltitudeM,
  };

  if (planner) {
    try {
      const intel = await tryIntelPlan(retrieved.trip, party, options, planner);
      if (intel) {
        const narrative = `${retrieved.trip.title} private plan for specialist review. AI-assisted, not a confirmed itinerary or quote. Planning guidance, not medical advice.`;
        const assumptions = intel.reasons.map((reason) => reason.text);
        const draft = draftFromDays(intel.days, retrieved.trip, narrative, assumptions);
        const text = `${draft.narrative ?? ""} ${intel.reasons.map((reason) => reason.text).join(" ")}`;
        assertNoCustomerPrices(text);
        return {
          draft,
          resolvedDays: daysToResolved(intel.days, retrieved.trip),
          report: intel.report,
          appliedFixes: intel.appliedFixes,
          repaired: intel.appliedFixes.length > 0,
          mocked: false,
          modelId: "intel-planner",
          promptVersion: DESIGNER_PLAN_VERSION,
          planReasons: intel.reasons,
          seasonFit: intel.seasonFit,
          plannerSource: "intel",
        };
      }
    } catch {
      // Catalog-and-autofix path below.
    }
  }

  const planned = await planWithModel(retrieved.facts, party, fallback);
  let draft = planned.draft;
  if (planned.mocked) draft = fallback;

  const grounded = resolveDraft(draft, trips, retrieved.trip);
  const fixed = autoFixItinerary(resolvedToInput(grounded, retrieved.trip), options);
  let repaired = false;
  if (fixed.report.violations.length > 0 && !planned.mocked) {
    const retry = await planWithModel(
      `${retrieved.facts}\nViolations: ${JSON.stringify(fixed.report.violations)}`,
      party,
      fallback,
    );
    const retryDays = resolveDraft(retry.draft, trips, retrieved.trip);
    const retryFixed = autoFixItinerary(
      resolvedToInput(retryDays, retrieved.trip),
      options,
    );
    repaired = true;
    const narrative = retry.draft.narrative ?? fallback.narrative ?? "";
    assertNoCustomerPrices(narrative);
    const explained = explainCatalogPlan(retryFixed.days, retrieved.trip, party);
    return {
      draft: {
        ...retry.draft,
        days: retryFixed.days.map((d, i) => ({
          dayNumber: d.dayNumber,
          itineraryDayId:
            retry.draft.days[i]?.itineraryDayId ??
            `${retrieved.trip.slug}:${String(d.dayNumber)}`,
          fromPlaceId: d.fromPlace ?? d.title,
          toPlaceId: d.toPlace ?? d.title,
          dayType: d.dayType,
          rationale: retry.draft.days[i]?.rationale ?? d.title,
        })),
        narrative,
      },
      resolvedDays: resolveDraft(
        {
          ...retry.draft,
          days: retryFixed.days.map((d, i) => ({
            dayNumber: d.dayNumber,
            itineraryDayId:
              retry.draft.days[i]?.itineraryDayId ??
              `${retrieved.trip.slug}:${String(d.dayNumber)}`,
            fromPlaceId: d.fromPlace ?? d.title,
            toPlaceId: d.toPlace ?? d.title,
            dayType: d.dayType,
            rationale: retry.draft.days[i]?.rationale ?? d.title,
          })),
        },
        trips,
        retrieved.trip,
      ),
      report: retryFixed.report,
      appliedFixes: retryFixed.applied,
      repaired,
      mocked: retry.mocked,
      modelId: retry.modelId,
      promptVersion: DESIGNER_PLAN_VERSION,
      planReasons: explained.reasons,
      seasonFit: explained.seasonFit,
      plannerSource: "catalog",
    };
  }

  const nextDraft: ItineraryDraft = {
    ...draft,
    days: fixed.days.map((d, i) => ({
      dayNumber: d.dayNumber,
      itineraryDayId:
        draft.days[i]?.itineraryDayId ?? `${retrieved.trip.slug}:${String(d.dayNumber)}`,
      fromPlaceId: d.fromPlace ?? d.title,
      toPlaceId: d.toPlace ?? d.title,
      dayType: d.dayType,
      rationale: draft.days[i]?.rationale ?? d.title,
    })),
    narrative: draft.narrative ?? fallback.narrative,
  };
  const text = `${nextDraft.narrative ?? ""} ${nextDraft.days.map((d) => d.rationale).join(" ")}`;
  assertNoCustomerPrices(text);
  const explained = explainCatalogPlan(fixed.days, retrieved.trip, party);

  return {
    draft: nextDraft,
    resolvedDays: resolveDraft(nextDraft, trips, retrieved.trip),
    report: fixed.report,
    appliedFixes: fixed.applied,
    repaired,
    mocked: planned.mocked,
    modelId: planned.modelId,
    promptVersion: DESIGNER_PLAN_VERSION,
    planReasons: explained.reasons,
    seasonFit: explained.seasonFit,
    plannerSource: "catalog",
  };
}

export const designerPartySchema = z.object({
  durationDays: z.number().int().min(5).max(40).optional(),
  month: z.number().int().min(1).max(12).optional(),
  fitness: z.string().optional(),
  experience: z.string().optional(),
  maxPriorAltitudeM: z.number().int().min(0).max(9000).optional(),
  usesLuklaHint: z.boolean().optional(),
  tripSlug: z.string().max(80).optional(),
  activitySlugs: z.array(z.string()).optional(),
  regionSlugs: z.array(z.string()).optional(),
  pace: z.string().optional(),
  comfort: z.string().optional(),
});

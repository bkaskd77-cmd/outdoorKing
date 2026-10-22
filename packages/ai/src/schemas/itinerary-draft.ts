import { z } from "zod";

export const itineraryDraftDaySchema = z.object({
  dayNumber: z.number().int().min(1),
  itineraryDayId: z.string().nullable(),
  fromPlaceId: z.string(),
  toPlaceId: z.string(),
  dayType: z.enum([
    "trek",
    "rest-acclimatization",
    "summit",
    "travel",
    "flight",
    "contingency",
    "city",
  ]),
  rationale: z.string().max(400),
});

export const itineraryDraftSchema = z.object({
  baseTripId: z.string().nullable(),
  days: z.array(itineraryDraftDaySchema).min(1).max(60),
  assumptions: z.array(z.string()).max(10),
  questionsForCustomer: z.array(z.string()).max(5),
  narrative: z.string().max(4000).optional(),
});

export type ItineraryDraftDay = z.infer<typeof itineraryDraftDaySchema>;
export type ItineraryDraft = z.infer<typeof itineraryDraftSchema>;

export type ResolvedDraftDay = ItineraryDraftDay & {
  title: string;
  startAltitudeM: number;
  highPointM: number;
  sleepAltitudeM: number;
  fromPlace: string;
  toPlace: string;
};

export type DesignerParty = {
  durationDays?: number;
  month?: number;
  fitness?: string;
  experience?: string;
  maxPriorAltitudeM?: number;
  usesLuklaHint?: boolean;
  tripSlug?: string;
  activitySlugs?: string[];
  regionSlugs?: string[];
  pace?: string;
  comfort?: string;
};

export const PRICE_IN_TEXT = /(?:USD|EUR|GBP|NPR)\s*\$?\s*\d|\$\s?\d|€\s?\d|£\s?\d/i;

export function assertNoCustomerPrices(text: string): void {
  if (PRICE_IN_TEXT.test(text)) {
    throw new Error("Customer-facing AI text must not include prices.");
  }
}

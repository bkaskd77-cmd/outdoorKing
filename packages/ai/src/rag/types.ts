export type ConciergeIntent =
  | "trip_info"
  | "permit"
  | "season"
  | "booking_status"
  | "smalltalk"
  | "human"
  | "emergency"
  | "injection_attempt"
  | "out_of_scope";

export type CatalogDayChunk = {
  dayNumber: number;
  title: string;
  fromPlace: string;
  toPlace: string;
  sleepAltitudeM: number;
  highPointM: number;
  dayType: string;
};

export type CatalogIndex = {
  trips: {
    slug: string;
    title: string;
    activity: string;
    regions: string[];
    difficulty?: string;
    durationTypical?: number;
    durationMin?: number;
    durationMax?: number;
    maxAltitudeM?: number;
    overview?: string;
    permits: string[];
    seasons: string[];
    usesLukla?: boolean;
    days: CatalogDayChunk[];
  }[];
  permits: {
    slug: string;
    name: string;
    authority: string;
    notes: string;
    lastVerifiedAt: string;
    requiresLicensedGuide?: boolean;
  }[];
  seasons: { slug: string; name: string; months: number[] }[];
  regions: { slug: string; name: string; summary: string; access: string }[];
  peaks: { slug: string; name: string; heightM: number; region: string }[];
  faqs: { slug: string; question: string; answer: string; category: string }[];
  pages: {
    slug: string;
    title: string;
    path: string;
    body: string;
    status: "published" | "draft";
  }[];
};

export type SourceChunk = {
  id: string;
  sourceType: string;
  sourceId: string;
  locale: string;
  url: string;
  title: string;
  content: string;
};

export type RetrievedChunk = SourceChunk & { score: number };

export type Citation = {
  chunkId: string;
  title: string;
  url: string;
};

export type BookingSnapshot = {
  number: string;
  status: string;
  tripSlug?: string;
  startDate?: string;
};

export type ConciergeSession = {
  email?: string;
  authenticated: boolean;
  bookings: BookingSnapshot[];
  requestTripSlugs: string[];
};

export type ConciergeAnswer = {
  intent: ConciergeIntent;
  text: string;
  citations: Citation[];
  mocked: boolean;
  handoff: boolean;
  emergency: boolean;
  pageOps: boolean;
  toolsUsed: string[];
  promptVersion?: string;
};

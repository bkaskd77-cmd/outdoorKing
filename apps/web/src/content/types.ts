import type { DayType, RuleReport } from "@ok/ai/rules";

export type Source = {
  url: string;
  title: string;
  accessedAt?: string;
  note?: string;
};

export type CatalogDay = {
  /** First day of the block; orders days and drives the itinerary rules. */
  dayNumber: number;
  /** Shown instead of the number for multi-day blocks, e.g. "9-12". */
  dayLabel?: string;
  title: string;
  description: string;
  fromPlace: string;
  toPlace: string;
  startAltitudeM: number;
  highPointM: number;
  sleepAltitudeM: number;
  walkingHours?: string;
  dayType: DayType;
  accommodation?: string;
};

export type CatalogPermit = {
  slug: string;
  name: string;
  authority: string;
  lastVerifiedAt: string;
  requiresLicensedGuide?: boolean;
  notes: string;
};

export type CatalogFaq = {
  slug: string;
  question: string;
  answer: string;
  category: string;
};

export type CatalogPage = {
  slug: string;
  title: string;
  path: string;
  body: string;
  status: "published" | "draft";
};

export type CatalogTrip = {
  slug: string;
  title: string;
  subtitle: string;
  activity: string;
  regions: string[];
  difficulty: "easy" | "moderate" | "challenging" | "strenuous" | "technical";
  technicalGrade?: string;
  durationMin: number;
  durationTypical: number;
  durationMax: number;
  maxAltitudeM: number;
  maxAltitudePoint: string;
  startPoint: string;
  endPoint: string;
  groupType: string[];
  highlights: string[];
  overview: string;
  inclusions: string[];
  exclusions: string[];
  contingency: string;
  acclimatizationNotes: string;
  days: CatalogDay[];
  permits: string[];
  seasons: string[];
  faqs: string[];
  related: string[];
  peaks: string[];
  usesLukla: boolean;
  route: {
    name: string;
    lng: number;
    lat: number;
    altitudeM: number;
    dayNumber: number;
    dayLabel?: string;
  }[];
  status: "published" | "draft";
  sources: Source[];
};

export type CatalogActivity = {
  slug: string;
  title: string;
  summary: string;
  order: number;
};

export type CatalogRegion = {
  slug: string;
  name: string;
  summary: string;
  access: string;
  altitudeMinM: number;
  altitudeMaxM: number;
};

export type CatalogPeak = {
  slug: string;
  name: string;
  heightM: number;
  region: string;
  classification: string;
};

export type CatalogSeason = {
  slug: string;
  name: string;
  months: number[];
};

export type CompanyFacts = {
  licenceNo: string;
  years: string;
  reviewSummary: string;
  legalEntity: string;
  address: string;
  pan: string;
  memberships: string;
  whatsapp: string;
};

export type TripView = CatalogTrip & {
  ruleReport: RuleReport;
};

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

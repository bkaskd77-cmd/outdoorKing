import { evaluateItinerary } from "@ok/ai/rules";

import { climbingOptions } from "./climbing";
import { faqCopy } from "./faq-copy";
import { pageCopy } from "./page-copy";
import { FLAGSHIP_SLUGS, tripsFromFacts } from "./facts";
import type {
  CatalogActivity,
  CatalogFaq,
  CatalogPage,
  CatalogPeak,
  CatalogPermit,
  CatalogRegion,
  CatalogSeason,
  CatalogTrip,
  CompanyFacts,
  TripView,
} from "./types";

export const companyFacts: CompanyFacts = {
  licenceNo: "[[TBD: licence no.]]",
  years: "[[TBD: years]]",
  reviewSummary: "[[TBD: review count]] verified reviews",
  legalEntity: "[[TBD: legal entity name]]",
  address: "[[TBD: registered address]]",
  pan: "[[TBD: PAN/VAT]]",
  memberships: "[[TBD: TAAN / NMA / NTB memberships]]",
  whatsapp: "+977 9843119897",
};

export const activities: CatalogActivity[] = [
  {
    slug: "trekking",
    title: "Trekking",
    summary: "Private teahouse and camping treks across Nepal.",
    order: 1,
  },
  {
    slug: "tours",
    title: "Tours",
    summary: "Cultural, wildlife and heritage journeys with a private guide.",
    order: 2,
  },
  {
    slug: "peak-climbing",
    title: "Peak climbing",
    summary: "NMA trekking peaks with skills training and a reserve day.",
    order: 3,
  },
  {
    slug: "expeditions",
    title: "Expeditions",
    summary: "High Himalayan expeditions, private and designed around your dates.",
    order: 4,
  },
  {
    slug: "heli-treks",
    title: "Heli treks",
    summary:
      "Helicopter access where it shortens a walk, not where it replaces the point of going.",
    order: 5,
  },
  {
    slug: "cultural",
    title: "Cultural journeys",
    summary: "Kathmandu Valley, Lumbini and living heritage — at a guest's pace.",
    order: 6,
  },
  {
    slug: "wildlife",
    title: "Wildlife",
    summary: "Chitwan and Bardia with licensed naturalists.",
    order: 7,
  },
  {
    slug: "family",
    title: "Family",
    summary: "Shorter days, extra rest, and itineraries that fit children.",
    order: 8,
  },
  {
    slug: "photography",
    title: "Photography",
    summary: "Light, lodges and extra time at the viewpoints that earn the wait.",
    order: 9,
  },
  {
    slug: "pilgrimage",
    title: "Pilgrimage",
    summary: "Muktinath, Lumbini and monastery trails walked as guests.",
    order: 10,
  },
];

export const regions: CatalogRegion[] = [
  {
    slug: "everest",
    name: "Everest / Khumbu",
    summary: "Sagarmatha National Park, Namche, and the Khumbu Icefall.",
    access: "Fly to Lukla, or via Manthali/Ramechhap in peak seasons. Keep a buffer day.",
    altitudeMinM: 1400,
    altitudeMaxM: 8849,
  },
  {
    slug: "annapurna",
    name: "Annapurna",
    summary: "Circuit, Sanctuary, and Poon Hill in the Annapurna Conservation Area.",
    access: "Road to Dharapani or Nayapul; Jomsom flights are morning-only.",
    altitudeMinM: 800,
    altitudeMaxM: 8091,
  },
  {
    slug: "langtang",
    name: "Langtang",
    summary: "The valley north of Kathmandu, rebuilt and walked again.",
    access: "Drive from Kathmandu to Syabrubesi.",
    altitudeMinM: 1400,
    altitudeMaxM: 7234,
  },
  {
    slug: "manaslu",
    name: "Manaslu",
    summary: "Restricted-area circuit with a licensed agency and RAP.",
    access: "Drive to Soti Khola / Machha Khola; Larkya La is the high pass.",
    altitudeMinM: 700,
    altitudeMaxM: 8163,
  },
  {
    slug: "mustang",
    name: "Mustang",
    summary: "Rain-shadow former kingdom. Restricted; RAP required.",
    access: "Fly or drive to Jomsom; Upper Mustang needs RAP.",
    altitudeMinM: 2700,
    altitudeMaxM: 8167,
  },
  {
    slug: "dolpo",
    name: "Dolpo",
    summary: "Remote west, Shey Phoksundo and the high valleys.",
    access: "Juphal flights; restricted in Inner Dolpo.",
    altitudeMinM: 2000,
    altitudeMaxM: 6883,
  },
  {
    slug: "kanchenjunga",
    name: "Kanchenjunga",
    summary: "Far-east base camp approaches.",
    access: "Flights to Bhadrapur then a long drive; restricted area.",
    altitudeMinM: 1200,
    altitudeMaxM: 8586,
  },
  {
    slug: "makalu",
    name: "Makalu",
    summary: "Makalu-Barun wilderness east of Everest.",
    access: "Tumlingtar flights plus a walk-in.",
    altitudeMinM: 400,
    altitudeMaxM: 8485,
  },
  {
    slug: "kathmandu-valley",
    name: "Kathmandu Valley",
    summary: "Heritage cities, and the start of most journeys.",
    access: "Tribhuvan International Airport.",
    altitudeMinM: 1300,
    altitudeMaxM: 2200,
  },
  {
    slug: "chitwan",
    name: "Chitwan and the Terai",
    summary:
      "The lowlands of southern Nepal: jungle safaris in Chitwan and Bardia, and Lumbini, the birthplace of the Buddha.",
    access: "Drive or fly from Kathmandu or Pokhara.",
    altitudeMinM: 100,
    altitudeMaxM: 800,
  },
];

export const seasons: CatalogSeason[] = [
  { slug: "spring", name: "Spring (Mar–May)", months: [3, 4, 5] },
  { slug: "autumn", name: "Autumn (Sep–Nov)", months: [9, 10, 11] },
  { slug: "winter", name: "Winter (Dec–Feb)", months: [12, 1, 2] },
  { slug: "monsoon", name: "Monsoon (Jun–Aug)", months: [6, 7, 8] },
];

export const permits: CatalogPermit[] = [
  {
    slug: "tims",
    name: "TIMS card",
    authority: "Nepal Tourism Board",
    lastVerifiedAt: "2026-10-20",
    requiresLicensedGuide: true,
    notes:
      "Trekkers' Information Management System. Enforcement varies by region; Khumbu uses a Trek-Card instead. [[TBD: 2026 TIMS fee table]]",
  },
  {
    slug: "sagarmatha-national-park",
    name: "Sagarmatha National Park entry",
    authority: "Sagarmatha National Park / DoT",
    lastVerifiedAt: "2026-10-20",
    notes:
      "Park entry for most foreign nationals. Sourced from NTB. Amounts are confirmed when we design your dates.",
  },
  {
    slug: "khumbu-trek-card",
    name: "Khumbu Pasang Lhamu Trek-Card",
    authority: "Khumbu Pasang Lhamu Rural Municipality",
    lastVerifiedAt: "2026-10-20",
    notes:
      "Required for Khumbu trails. Sourced from Khumbu Pasang Lhamu Rural Municipality. Amounts are confirmed when we design your dates.",
  },
  {
    slug: "acap",
    name: "Annapurna Conservation Area Permit (ACAP)",
    authority: "NTNC / ACAP",
    lastVerifiedAt: "2026-10-20",
    notes:
      "Required for Annapurna Circuit, ABC and Poon Hill. [[TBD: confirm 2026 fee table against NTB]]",
  },
  {
    slug: "manaslu-rap",
    name: "Manaslu Restricted Area Permit",
    authority: "Department of Immigration / DoT",
    lastVerifiedAt: "2026-10-20",
    requiresLicensedGuide: true,
    notes: "Restricted area; licensed agency and guide required. Min group size applies.",
  },
  {
    slug: "upper-mustang-rap",
    name: "Upper Mustang Restricted Area Permit",
    authority: "Department of Immigration / DoT",
    lastVerifiedAt: "2026-10-20",
    requiresLicensedGuide: true,
    notes: "Restricted area. RAP plus ACAP. Min group size applies.",
  },
  {
    slug: "nma-island-peak",
    name: "NMA Island Peak climbing permit",
    authority: "Nepal Mountaineering Association",
    lastVerifiedAt: "2026-10-20",
    notes:
      "Imja Tse / Island Peak is an NMA trekking peak. [[TBD: NMA 2026 PDF season fee table]]",
  },
];

export const peaks: CatalogPeak[] = [
  {
    slug: "island-peak",
    name: "Island Peak (Imja Tse)",
    heightM: 6165,
    region: "everest",
    classification: "nma-trekking-peak-group-a",
  },
  {
    slug: "ama-dablam",
    name: "Ama Dablam",
    heightM: 6812,
    region: "everest",
    classification: "expedition-peak",
  },
  {
    slug: "mera-peak",
    name: "Mera Peak",
    heightM: 6476,
    region: "everest",
    classification: "nma-trekking-peak-group-a",
  },
];

export const faqs: CatalogFaq[] = [
  {
    slug: "what-is-tims",
    question: "What is TIMS?",
    answer: faqCopy["what-is-tims"] ?? "",
    category: "permits",
  },
  {
    slug: "do-i-need-insurance",
    question: "Do I need insurance?",
    answer: faqCopy["do-i-need-insurance"] ?? "",
    category: "insurance",
  },
  {
    slug: "how-hard-is-altitude",
    question: "How do you handle altitude?",
    answer: faqCopy["how-hard-is-altitude"] ?? "",
    category: "altitude",
  },
  {
    slug: "are-there-public-prices",
    question: "How is a journey designed?",
    answer: faqCopy["are-there-public-prices"] ?? "",
    category: "booking",
  },
  {
    slug: "lukla-flights",
    question: "What if the Lukla flight is cancelled?",
    answer: faqCopy["lukla-flights"] ?? "",
    category: "booking",
  },
  {
    slug: "guide-required",
    question: "Do I need a licensed guide?",
    answer: faqCopy["guide-required"] ?? "",
    category: "permits",
  },
  {
    slug: "best-season",
    question: "When should I go?",
    answer: faqCopy["best-season"] ?? "",
    category: "packing",
  },
  {
    slug: "group-size",
    question: "How large is the group?",
    answer: faqCopy["group-size"] ?? "",
    category: "booking",
  },
  {
    slug: "rescue",
    question: "Who decides on a helicopter rescue?",
    answer: faqCopy["rescue"] ?? "",
    category: "safety",
  },
  {
    slug: "quote-sla",
    question: "How fast is a quote?",
    answer: faqCopy["quote-sla"] ?? "",
    category: "booking",
  },
];

export const pages: CatalogPage[] = [
  {
    slug: "home",
    title: "The Himalaya, designed around you.",
    path: "/",
    status: "published",
    body: pageCopy["home"] ?? "",
  },
  {
    slug: "about",
    title: "About",
    path: "/about",
    status: "published",
    body: pageCopy["about"] ?? "",
  },
  {
    slug: "purpose",
    title: "Travel with Purpose",
    path: "/purpose",
    status: "published",
    body: pageCopy["purpose"] ?? "",
  },
  {
    slug: "contact",
    title: "Contact",
    path: "/contact",
    status: "published",
    body: pageCopy["contact"] ?? "",
  },
  {
    slug: "privacy",
    title: "Privacy",
    path: "/privacy",
    status: "published",
    body: pageCopy["privacy"] ?? "",
  },
  {
    slug: "terms",
    title: "Terms",
    path: "/terms",
    status: "published",
    body: pageCopy["terms"] ?? "",
  },
  {
    slug: "cookies",
    title: "Cookies",
    path: "/cookies",
    status: "published",
    body: pageCopy["cookies"] ?? "",
  },
  {
    slug: "licence-and-legal",
    title: "Licence and legal",
    path: "/trust/licence-and-legal",
    status: "published",
    body: pageCopy["licence-and-legal"] ?? "",
  },
  {
    slug: "safety-and-rescue",
    title: "Safety and rescue",
    path: "/trust/safety-and-rescue",
    status: "published",
    body: pageCopy["safety-and-rescue"] ?? "",
  },
  {
    slug: "insurance",
    title: "Insurance",
    path: "/trust/insurance",
    status: "published",
    body: pageCopy["insurance"] ?? "",
  },
  {
    slug: "reviews",
    title: "Reviews",
    path: "/trust/reviews",
    status: "published",
    body: pageCopy["reviews"] ?? "",
  },
  {
    slug: "responsible-travel",
    title: "Responsible travel",
    path: "/trust/responsible-travel",
    status: "published",
    body: pageCopy["responsible-travel"] ?? "",
  },
  {
    slug: "acclimatization-explained",
    title: "Acclimatisation on Nepal treks",
    path: "/guides/acclimatization-explained",
    status: "published",
    body: pageCopy["acclimatization-explained"] ?? "",
  },
  {
    slug: "nepal-trekking-permits",
    title: "Nepal trekking permits",
    path: "/permits",
    status: "published",
    body: pageCopy["nepal-trekking-permits"] ?? "",
  },
  {
    slug: "best-time-to-trek",
    title: "Best time to trek",
    path: "/guides/best-time-to-trek",
    status: "published",
    body: pageCopy["best-time-to-trek"] ?? "",
  },
  {
    slug: "packing-list",
    title: "Packing list",
    path: "/guides/nepal-trekking-packing-list",
    status: "published",
    body: pageCopy["packing-list"] ?? "",
  },
  {
    slug: "team",
    title: "Team",
    path: "/team",
    status: "published",
    body: pageCopy["team"] ?? "",
  },
];

export type CatalogData = {
  activities: CatalogActivity[];
  regions: CatalogRegion[];
  seasons: CatalogSeason[];
  permits: CatalogPermit[];
  peaks: CatalogPeak[];
  faqs: CatalogFaq[];
  pages: CatalogPage[];
  trips: CatalogTrip[];
};

/** Strong first set on the home page — unique published catalog trips, never invented. */
const HOME_JOURNEY_SLUGS = [
  "annapurna-circuit-trek",
  "everest-base-camp-trek",
  "island-peak-climbing",
  "annapurna-base-camp-trek",
  "manaslu-circuit-trek",
  "langtang-valley-trek",
] as const;

export function tripView(trip: CatalogTrip): TripView {
  const report = evaluateItinerary(
    trip.days.map((d) => ({
      dayNumber: d.dayNumber,
      dayLabel: d.dayLabel,
      title: d.title,
      fromPlace: d.fromPlace,
      toPlace: d.toPlace,
      startAltitudeM: d.startAltitudeM,
      highPointM: d.highPointM,
      sleepAltitudeM: d.sleepAltitudeM,
      dayType: d.dayType,
      peakHeightM: trip.peaks.includes("island-peak") ? 6165 : undefined,
      hasPeakPermit: trip.permits.includes("nma-island-peak"),
    })),
    {
      usesLukla: trip.usesLukla,
      ...climbingOptions(trip.activity),
      durationMin: trip.durationMin,
      durationMax: trip.durationMax,
    },
  );
  return { ...trip, ruleReport: report };
}

/** Lookups over one snapshot of catalog data (from the CMS, or the code fallback). */
export function makeCatalog(data: CatalogData) {
  const { activities, regions, seasons, permits, peaks, faqs, pages, trips } = data;

  function getTrips(status?: CatalogTrip["status"]): CatalogTrip[] {
    return status ? trips.filter((t) => t.status === status) : trips;
  }

  function tripsByRegion(slug: string): CatalogTrip[] {
    return trips.filter((t) => t.regions.includes(slug));
  }

  return {
    activities,
    regions,
    seasons,
    permits,
    peaks,
    faqs,
    pages,
    getTrips,
    tripsByRegion,
    getFlagshipTrips(): CatalogTrip[] {
      return trips.filter((trip) => FLAGSHIP_SLUGS.has(trip.slug));
    },
    getHomeJourneys(): CatalogTrip[] {
      const bySlug = new Map(trips.map((trip) => [trip.slug, trip]));
      const selected = HOME_JOURNEY_SLUGS.map((slug) => bySlug.get(slug)).filter(
        (trip): trip is CatalogTrip => trip?.status === "published",
      );
      return [...new Map(selected.map((trip) => [trip.slug, trip])).values()];
    },
    getTrip(slug: string): CatalogTrip | undefined {
      return trips.find((t) => t.slug === slug);
    },
    tripsByActivity(slug: string): CatalogTrip[] {
      return trips.filter((t) => t.activity === slug);
    },
    /** Homepage map: each catalog region with the published journeys that belong to it. */
    getRegionShowcase(): {
      slug: string;
      name: string;
      summary: string;
      trips: {
        slug: string;
        title: string;
        durationTypical: number;
        maxAltitudeM: number;
        photos?: CatalogTrip["photos"];
      }[];
    }[] {
      return regions.map((region) => ({
        slug: region.slug,
        name: region.name,
        summary: region.summary,
        trips: tripsByRegion(region.slug)
          .filter((trip) => trip.status === "published")
          .map((trip) => ({
            slug: trip.slug,
            title: trip.title,
            durationTypical: trip.durationTypical,
            maxAltitudeM: trip.maxAltitudeM,
            ...(trip.photos ? { photos: trip.photos } : {}),
          }))
          .sort((a, b) => a.title.localeCompare(b.title)),
      }));
    },
    getPage(slug: string): CatalogPage | undefined {
      return pages.find((p) => p.slug === slug);
    },
    getPermit(slug: string): CatalogPermit | undefined {
      return permits.find((p) => p.slug === slug);
    },
    getPeak(slug: string): CatalogPeak | undefined {
      return peaks.find((p) => p.slug === slug);
    },
    getFaq(slug: string): CatalogFaq | undefined {
      return faqs.find((f) => f.slug === slug);
    },
  };
}

export type Catalog = ReturnType<typeof makeCatalog>;

/**
 * The catalog as written in code and the fact files. It seeds the CMS and is the
 * fallback when the CMS is unreachable or empty. Pages read the live catalog with
 * `getCatalog()` from `@/content/store`, never this directly.
 */
export const codeCatalog = makeCatalog({
  activities,
  regions,
  seasons,
  permits,
  peaks,
  faqs,
  pages,
  trips: tripsFromFacts(),
});

export const {
  getTrips,
  getFlagshipTrips,
  getHomeJourneys,
  getTrip,
  tripsByActivity,
  tripsByRegion,
  getRegionShowcase,
  getPage,
  getPermit,
  getPeak,
  getFaq,
} = codeCatalog;

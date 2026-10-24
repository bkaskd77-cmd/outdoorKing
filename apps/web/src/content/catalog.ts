import { evaluateItinerary } from "@ok/ai/rules";

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
    name: "Chitwan",
    summary: "Lowland national park and river safari country.",
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
    answer:
      "TIMS is the Trekkers' Information Management System used in Nepal to register trekkers. In Khumbu the local Trek-Card is used instead. OutdoorKing handles paperwork for private journeys. [[TBD: 2026 TIMS fee table]]",
    category: "permits",
  },
  {
    slug: "do-i-need-insurance",
    question: "Do I need insurance?",
    answer:
      "Yes. You need cover that includes helicopter rescue up to the trip's maximum altitude. We verify the policy before you fly to Lukla or start a restricted-area trek. See /trust/insurance.",
    category: "insurance",
  },
  {
    slug: "how-hard-is-altitude",
    question: "How do you handle altitude?",
    answer:
      "We place rest days and climb-high-sleep-low walks (Namche, Dingboche, Manang, Samagaon, Kyanjin). This is planning guidance, not medical advice. See /guides/acclimatization-explained.",
    category: "altitude",
  },
  {
    slug: "are-there-public-prices",
    question: "How is a journey designed?",
    answer:
      "Every trip is private and built around your dates, pace and party. Start with Design my trip.",
    category: "booking",
  },
  {
    slug: "lukla-flights",
    question: "What if the Lukla flight is cancelled?",
    answer:
      "It happens. Peak seasons often fly via Manthali/Ramechhap. We keep at least one buffer day before an international departure and plan helicopter or extra nights as a contingency, designed around your dates.",
    category: "booking",
  },
  {
    slug: "guide-required",
    question: "Do I need a licensed guide?",
    answer:
      "NTB lists a licensed-guide rule on many routes (from 31 March 2023). Enforcement in Khumbu is disputed. We always staff a licensed guide on private journeys we operate.",
    category: "permits",
  },
  {
    slug: "best-season",
    question: "When should I go?",
    answer:
      "For most high treks: March–May and October–November. Mustang and Dolpo are rain-shadow exceptions. Winter is quieter and colder. Monsoon is usually avoided in the Khumbu.",
    category: "packing",
  },
  {
    slug: "group-size",
    question: "How large is the group?",
    answer:
      "These are private journeys, not departure-date groups. Party size is yours. [[TBD: max party / guide ratio]].",
    category: "booking",
  },
  {
    slug: "rescue",
    question: "Who decides on a helicopter rescue?",
    answer:
      "The published policy is on /trust/safety-and-rescue. We do not invent rescue stories. [[TBD: rescue trigger, decision-maker and billing]]",
    category: "safety",
  },
  {
    slug: "quote-sla",
    question: "How fast is a quote?",
    answer:
      "No payment to request one. [[TBD: quote SLA; brand draft says about 24 hours]]",
    category: "booking",
  },
];

export const pages: CatalogPage[] = [
  {
    slug: "home",
    title: "The Himalaya, designed around you.",
    path: "/",
    status: "published",
    body: "Private treks, tours and climbs in Nepal. Designed around your dates, pace and party.",
  },
  {
    slug: "about",
    title: "About",
    path: "/about",
    status: "published",
    body: "OutdoorKing is a Nepali operator of private Himalayan journeys. We do not invent reviews, summits or certificates. Licence numbers, years of operation and legal-entity details will be published when the owner supplies them. [[TBD: legal entity, years, licence]]",
  },
  {
    slug: "contact",
    title: "Contact",
    path: "/contact",
    status: "published",
    body: "Design a trip at /design-my-trip. Security issues: see /.well-known/security.txt. [[TBD: sales channel]]",
  },
  {
    slug: "privacy",
    title: "Privacy",
    path: "/privacy",
    status: "published",
    body: "We collect only what a quote needs. Marketing email is optional. [[TBD: counsel]]",
  },
  {
    slug: "terms",
    title: "Terms",
    path: "/terms",
    status: "published",
    body: "Quotes are not tickets. Helicopter rescue depends on weather and your insurance. [[TBD: counsel]]",
  },
  {
    slug: "cookies",
    title: "Cookies",
    path: "/cookies",
    status: "published",
    body: "Essential cookies only by default. Vercel Web Analytics is cookieless. No third-party ad trackers in Phase 1.",
  },
  {
    slug: "licence-and-legal",
    title: "Licence and legal",
    path: "/trust/licence-and-legal",
    status: "published",
    body: "Certificates will be published here as images with alt text once the owner supplies licence numbers, company registration, PAN/VAT, memberships, legal entity and registered address. We do not invent those identifiers. [[TBD: licence no.]] [[TBD: PAN/VAT]] [[TBD: TAAN / NMA / NTB memberships]] [[TBD: legal entity name]] [[TBD: registered address]]",
  },
  {
    slug: "safety-and-rescue",
    title: "Safety and rescue",
    path: "/trust/safety-and-rescue",
    status: "published",
    body: "We do not stage or inflate rescues. Turn-around policy: the guide can end a day or a summit attempt. This is not medical advice. Helicopter trigger, decision-maker, billing, guide-to-client ratios, and first-aid protocol will be published here when the owner confirms them. [[TBD: trigger]] [[TBD: decision-maker]] [[TBD: billing]] [[TBD: guide-to-client ratios]] [[TBD: first-aid and oximeter protocol]]",
  },
  {
    slug: "insurance",
    title: "Insurance",
    path: "/trust/insurance",
    status: "published",
    body: "Required cover includes helicopter rescue up to the trip's maximum altitude. We verify policies before you travel. We do not sell insurance. [[TBD: named insurers we commonly see]].",
  },
  {
    slug: "reviews",
    title: "Reviews",
    path: "/trust/reviews",
    status: "published",
    body: "We never write or edit reviews. Verified first-party reviews will appear here when the owner supplies them. No AggregateRating schema is emitted without verified reviews. [[TBD: review count and source]]",
  },
  {
    slug: "responsible-travel",
    title: "Responsible travel",
    path: "/trust/responsible-travel",
    status: "published",
    body: "We walk as guests. Leave-no-trace and wildlife distances follow park rules. [[TBD: porter and local staff conditions]]",
  },
  {
    slug: "acclimatization-explained",
    title: "Acclimatisation on Nepal treks",
    path: "/guides/acclimatization-explained",
    status: "published",
    body: "Sample itineraries place rest days at Namche, Dingboche, Manang, Samagaon and Kyanjin. Climb high, sleep low. Rule IDs ALT-001 to ALT-007 are published on each trip page. Not medical advice.",
  },
  {
    slug: "nepal-trekking-permits",
    title: "Nepal trekking permits",
    path: "/permits",
    status: "published",
    body: "TIMS, park entry, local Trek-Cards and restricted-area permits are listed per trip.",
  },
  {
    slug: "best-time-to-trek",
    title: "Best time to trek",
    path: "/guides/best-time-to-trek",
    status: "published",
    body: "Spring (Mar–May) and autumn (Sep–Nov) for most high treks. Mustang and Dolpo differ. Winter is cold and quiet. Monsoon is usually avoided in the Khumbu.",
  },
  {
    slug: "packing-list",
    title: "Packing list",
    path: "/guides/nepal-trekking-packing-list",
    status: "published",
    body: "Layer for cold nights above Dingboche. Crampons and jumar for Island Peak are arranged with the climbing staff. [[TBD: owner kit PDF]]",
  },
  {
    slug: "team",
    title: "Team",
    path: "/team",
    status: "published",
    body: "Real people only. Profiles will be published when the owner supplies names, photos and certifications. Content agents cannot create team members.",
  },
];

const allTrips = tripsFromFacts();

export function getTrips(status?: CatalogTrip["status"]): CatalogTrip[] {
  return status ? allTrips.filter((t) => t.status === status) : allTrips;
}

export function getFlagshipTrips(): CatalogTrip[] {
  return allTrips.filter((trip) => FLAGSHIP_SLUGS.has(trip.slug));
}

/** Strong first set on the home page — unique published catalog trips, never invented. */
const HOME_JOURNEY_SLUGS = [
  "annapurna-circuit-trek",
  "everest-base-camp-trek",
  "island-peak-climbing",
  "annapurna-base-camp-trek",
  "manaslu-circuit-trek",
  "langtang-valley-trek",
] as const;

export function getHomeJourneys(): CatalogTrip[] {
  const bySlug = new Map(allTrips.map((trip) => [trip.slug, trip]));
  const selected = HOME_JOURNEY_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (trip): trip is CatalogTrip => trip?.status === "published",
  );
  const unique = [...new Map(selected.map((trip) => [trip.slug, trip])).values()];
  return unique;
}

export function getTrip(slug: string): CatalogTrip | undefined {
  return allTrips.find((t) => t.slug === slug);
}

export function tripView(trip: CatalogTrip): TripView {
  const report = evaluateItinerary(
    trip.days.map((d) => ({
      dayNumber: d.dayNumber,
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
      durationMin: trip.durationMin,
      durationMax: trip.durationMax,
    },
  );
  return { ...trip, ruleReport: report };
}

export function tripsByActivity(slug: string): CatalogTrip[] {
  return allTrips.filter((t) => t.activity === slug);
}

export function tripsByRegion(slug: string): CatalogTrip[] {
  return allTrips.filter((t) => t.regions.includes(slug));
}

export function getPage(slug: string): CatalogPage | undefined {
  return pages.find((p) => p.slug === slug);
}

export function getPermit(slug: string): CatalogPermit | undefined {
  return permits.find((p) => p.slug === slug);
}

export function getPeak(slug: string): CatalogPeak | undefined {
  return peaks.find((p) => p.slug === slug);
}

export function getFaq(slug: string): CatalogFaq | undefined {
  return faqs.find((f) => f.slug === slug);
}

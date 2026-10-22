import type { CatalogIndex } from "./types";

export const fixtureCatalog: CatalogIndex = {
  trips: [
    {
      slug: "everest-base-camp-trek",
      title: "Everest Base Camp Trek",
      activity: "trekking",
      regions: ["everest"],
      durationTypical: 14,
      durationMin: 12,
      durationMax: 16,
      maxAltitudeM: 5555,
      overview:
        "A private Khumbu trek to Everest Base Camp with rest days at Namche and Dingboche. Quoted privately — never a public trip price.",
      permits: ["sagarmatha-national-park", "khumbu-trek-card"],
      seasons: ["spring", "autumn"],
      usesLukla: true,
      days: [
        {
          dayNumber: 1,
          title: "Arrive Kathmandu",
          fromPlace: "Airport",
          toPlace: "Kathmandu",
          sleepAltitudeM: 1400,
          highPointM: 1400,
          dayType: "city",
        },
        {
          dayNumber: 2,
          title: "Fly Lukla to Phakding",
          fromPlace: "Kathmandu",
          toPlace: "Phakding",
          sleepAltitudeM: 2610,
          highPointM: 2860,
          dayType: "flight",
        },
        {
          dayNumber: 3,
          title: "Namche",
          fromPlace: "Phakding",
          toPlace: "Namche",
          sleepAltitudeM: 3440,
          highPointM: 3440,
          dayType: "trek",
        },
      ],
    },
    {
      slug: "island-peak-climbing",
      title: "Island Peak climbing",
      activity: "peak-climbing",
      regions: ["everest"],
      durationTypical: 18,
      durationMin: 16,
      durationMax: 21,
      maxAltitudeM: 6165,
      overview: "NMA trekking peak Imja Tse with a reserve day. No public trip price.",
      permits: ["sagarmatha-national-park", "nma-island-peak"],
      seasons: ["spring", "autumn"],
      usesLukla: true,
      days: [],
    },
    {
      slug: "manaslu-circuit-trek",
      title: "Manaslu Circuit Trek",
      activity: "trekking",
      regions: ["manaslu"],
      durationTypical: 16,
      durationMin: 14,
      durationMax: 18,
      maxAltitudeM: 5160,
      overview: "Restricted-area circuit. Licensed agency and RAP required.",
      permits: ["manaslu-rap"],
      seasons: ["spring", "autumn"],
      days: [],
    },
  ],
  permits: [
    {
      slug: "tims",
      name: "TIMS card",
      authority: "Nepal Tourism Board",
      notes:
        "Trekkers' Information Management System. Khumbu uses a Trek-Card instead. [[TBD: 2026 TIMS fee table]]",
      lastVerifiedAt: "2026-10-20",
      requiresLicensedGuide: true,
    },
    {
      slug: "sagarmatha-national-park",
      name: "Sagarmatha National Park entry",
      authority: "Sagarmatha National Park / DoT",
      notes:
        "NPR 3,000 per person per entry for most foreign nationals (SAARC NPR 1,500). Sourced from NTB park fees. This is a permit fee, not a trip price.",
      lastVerifiedAt: "2026-10-20",
    },
    {
      slug: "manaslu-rap",
      name: "Manaslu Restricted Area Permit",
      authority: "Department of Immigration / DoT",
      notes:
        "Restricted area; licensed agency and guide required. Min group size applies.",
      lastVerifiedAt: "2026-10-20",
      requiresLicensedGuide: true,
    },
    {
      slug: "nma-island-peak",
      name: "NMA Island Peak climbing permit",
      authority: "Nepal Mountaineering Association",
      notes: "Imja Tse / Island Peak is an NMA trekking peak. Season fee table [[TBD]].",
      lastVerifiedAt: "2026-10-20",
    },
    {
      slug: "khumbu-trek-card",
      name: "Khumbu Pasang Lhamu Trek-Card",
      authority: "Khumbu Pasang Lhamu Rural Municipality",
      notes: "Local Trek-Card used in Khumbu instead of TIMS.",
      lastVerifiedAt: "2026-10-20",
    },
  ],
  seasons: [
    { slug: "spring", name: "Spring (Mar–May)", months: [3, 4, 5] },
    { slug: "autumn", name: "Autumn (Sep–Nov)", months: [9, 10, 11] },
    { slug: "winter", name: "Winter (Dec–Feb)", months: [12, 1, 2] },
    { slug: "monsoon", name: "Monsoon (Jun–Aug)", months: [6, 7, 8] },
  ],
  regions: [
    {
      slug: "everest",
      name: "Everest / Khumbu",
      summary: "Sagarmatha National Park, Namche, and the Khumbu Icefall.",
      access: "Fly to Lukla, or via Manthali/Ramechhap in peak seasons.",
    },
    {
      slug: "manaslu",
      name: "Manaslu",
      summary: "Restricted-area circuit with a licensed agency and RAP.",
      access: "Drive to Soti Khola.",
    },
  ],
  peaks: [
    {
      slug: "island-peak",
      name: "Island Peak (Imja Tse)",
      heightM: 6165,
      region: "everest",
    },
  ],
  faqs: [
    {
      slug: "what-is-tims",
      question: "What is TIMS?",
      answer:
        "TIMS is the Trekkers' Information Management System used in Nepal to register trekkers. In Khumbu the local Trek-Card is used instead.",
      category: "permits",
    },
    {
      slug: "are-there-public-prices",
      question: "Where are the prices?",
      answer:
        "There are none in public. Every journey is quoted privately after we know your dates, pace and party. No payment is required to request a quote.",
      category: "booking",
    },
    {
      slug: "best-season",
      question: "When should I go?",
      answer:
        "For most high treks: March–May and October–November. Mustang and Dolpo are rain-shadow exceptions. Monsoon is usually avoided in the Khumbu.",
      category: "packing",
    },
    {
      slug: "do-i-need-insurance",
      question: "Do I need insurance?",
      answer:
        "Yes. You need cover that includes helicopter rescue up to the trip's maximum altitude. See /trust/insurance.",
      category: "insurance",
    },
    {
      slug: "lukla-flights",
      question: "What if the Lukla flight is cancelled?",
      answer:
        "Peak seasons often fly via Manthali/Ramechhap. We keep at least one buffer day before an international departure.",
      category: "booking",
    },
    {
      slug: "rescue",
      question: "Who decides on a helicopter rescue?",
      answer:
        "The published policy is on /trust/safety-and-rescue. We do not invent rescue stories.",
      category: "safety",
    },
  ],
  pages: [
    {
      slug: "safety-and-rescue",
      title: "Safety and rescue",
      path: "/trust/safety-and-rescue",
      body: "Helicopter rescue is triggered when [[TBD: trigger]]. We do not stage or inflate rescues. This is not medical advice.",
      status: "published",
    },
    {
      slug: "best-time-to-trek",
      title: "Best time to trek",
      path: "/guides/best-time-to-trek",
      body: "Spring (Mar–May) and autumn (Sep–Nov) for most high treks. Mustang and Dolpo differ. Monsoon is usually avoided in the Khumbu.",
      status: "published",
    },
    {
      slug: "draft-only",
      title: "Draft",
      path: "/draft",
      body: "Should not be indexed.",
      status: "draft",
    },
  ],
};

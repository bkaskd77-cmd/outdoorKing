import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { DayType } from "@ok/ai/rules";

import { dayCopy } from "./day-copy";
import { tripPeaks } from "./permit-peak-copy";
import { publicText } from "./public-text";
import { includedFor, tripCopy } from "./trip-copy";
import { faqsForTrip } from "./trip-faqs";
import { tripHighlights, tripOverviews } from "./trip-overviews";
import type { CatalogDay, CatalogTrip, Source } from "./types";

type FactDay = {
  day: number;
  route: string;
  overnight: string | null;
  overnight_altitude_m: number | null;
  walking_hours: string | null;
  notes: string | null;
  /** Highest point of the day, when it is above the night's altitude (summits, passes). */
  high_point_m?: number;
  /** Overrides the day type inferred from the route text. */
  day_type?: DayType;
};

type FactFile = {
  slug: string;
  name: string;
  region: string;
  activity_type: string;
  difficulty?: { grade: string; technical_grade: string | null; notes: string };
  duration_days?: { min: number; max: number; typical: number; notes: string };
  max_altitude_m?: number;
  max_altitude_point?: string;
  start_point?: string;
  end_point?: string;
  itinerary?: FactDay[];
  best_seasons?: { primary: string[]; notes?: string };
  permits?: { name: string; applies_to?: string }[];
  highlights?: string[];
  logistics?: { notes?: string; flights?: string[]; drives?: string[] };
  acclimatization?: { days: number; where: string[]; notes: string };
  sources?: { title: string; url: string; accessed?: string }[];
  /** Overrides the Lukla/Ramechhap flight detection from the itinerary text. */
  uses_lukla?: boolean;
};

export const FLAGSHIP_SLUGS = new Set([
  "everest-base-camp-trek",
  "annapurna-circuit-trek",
  "island-peak-climbing",
]);

function metersIn(text: string): number | undefined {
  const match = /(\d{1,2}[,\s]?\d{3})\s*m\b/i.exec(text);
  if (!match?.[1]) return undefined;
  return Number(match[1].replace(/[,\s]/g, ""));
}

function dayType(day: FactDay, trip: FactFile): DayType {
  if (day.day_type) return day.day_type;
  const blob = `${day.route} ${day.notes ?? ""}`.toLowerCase();
  const route = day.route.toLowerCase();
  if (
    blob.includes("reserve") ||
    blob.includes("buffer") ||
    blob.includes("contingency") ||
    route.includes("departure")
  ) {
    return "contingency";
  }
  if (
    route.startsWith("summit ") ||
    route.includes("summit island") ||
    route.includes("summit day")
  ) {
    return "summit";
  }
  if (blob.includes("acclimat") || blob.includes("training") || /\brest day\b/.test(blob))
    return "rest-acclimatization";
  if (blob.includes("flight") || blob.includes("fly")) return "flight";
  if (blob.includes("arrive") || blob.includes("departure") || blob.includes("drive")) {
    return day.walking_hours ? "trek" : "travel";
  }
  if ((day.overnight_altitude_m ?? 0) <= 1600 && !day.walking_hours) return "city";
  if (
    trip.activity_type === "peak-climb" &&
    day.route.toLowerCase().includes("island peak")
  ) {
    return blob.includes("training") ? "rest-acclimatization" : "trek";
  }
  return "trek";
}

function mapDay(day: FactDay, prevSleep: number, trip: FactFile): CatalogDay {
  const sleep = day.overnight_altitude_m ?? prevSleep;
  const fromNotes = metersIn(`${day.route} ${day.notes ?? ""}`);
  const highPointM = day.high_point_m ?? Math.max(sleep, fromNotes ?? sleep, prevSleep);
  const overnight = day.overnight ?? trip.end_point ?? "Kathmandu";
  return {
    dayNumber: day.day,
    title: day.route,
    description: publicText(day.notes),
    fromPlace: "",
    toPlace: overnight,
    startAltitudeM: prevSleep,
    highPointM,
    sleepAltitudeM: sleep,
    walkingHours: day.walking_hours ?? undefined,
    dayType: dayType(day, trip),
    accommodation: sleep > 1600 ? "teahouse" : "hotel",
  };
}

function difficulty(grade: string): CatalogTrip["difficulty"] {
  if (
    grade === "easy" ||
    grade === "moderate" ||
    grade === "challenging" ||
    grade === "strenuous"
  ) {
    return grade;
  }
  return "technical";
}

function regionSlug(region: string): string {
  const value = region.toLowerCase();
  if (value.includes("mustang")) return "mustang";
  if (value.includes("everest") || value.includes("khumbu")) return "everest";
  if (value.includes("annapurna") || value.includes("pokhara")) return "annapurna";
  if (value.includes("langtang") || value.includes("helambu") || value.includes("tamang"))
    return "langtang";
  if (value.includes("manaslu") || value.includes("tsum") || value.includes("nar phu"))
    return "manaslu";
  if (value.includes("dolpo")) return "dolpo";
  if (value.includes("kanchenjunga") || value.includes("kangchenjunga"))
    return "kanchenjunga";
  if (value.includes("makalu")) return "makalu";
  if (value.includes("bhutan") || value.includes("tibet")) return "";
  if (
    ["chitwan", "bardia", "bardiya", "terai", "lumbini"].some((name) =>
      value.includes(name),
    )
  )
    return "chitwan";
  if (value.includes("rara") || value.includes("karnali")) return "rara";
  return "kathmandu-valley";
}

function activitySlug(type: string, slug: string): string {
  if (slug.includes("helicopter") || slug.includes("heli-")) return "heli-treks";
  if (slug.includes("chitwan") || slug.includes("bardia")) return "wildlife";
  if (
    slug.includes("lumbini") ||
    slug.includes("pilgrimage") ||
    slug.includes("muktinath")
  ) {
    return "pilgrimage";
  }
  if (slug.includes("heritage") || slug.includes("cultural")) return "cultural";
  if (type === "peak-climb") return "peak-climbing";
  if (type === "expedition") return "expeditions";
  if (type === "tour") return "tours";
  if (type === "trek") return "trekking";
  if (type === "wildlife") return "wildlife";
  if (type === "heli" || type === "heli-trek") return "heli-treks";
  if (type === "add-on" || type === "activity") return "tours";
  return "trekking";
}

// Which catalog permit each researched permit name refers to.
const PERMIT_MATCHES: [RegExp, string][] = [
  [/sagarmatha/, "sagarmatha-national-park"],
  [/khumbu pasang lhamu|trek-card/, "khumbu-trek-card"],
  [/\btims\b/, "tims"],
  [/\bacap\b|annapurna conservation/, "acap"],
  [/manaslu restricted/, "manaslu-rap"],
  [/\bmcap\b|manaslu conservation/, "mcap"],
  [/tsum valley restricted/, "tsum-rap"],
  [/upper mustang restricted/, "upper-mustang-rap"],
  [/nar[- ]phu restricted/, "nar-phu-rap"],
  [/kanchenjunga restricted/, "kanchenjunga-rap"],
  [/kanchenjunga conservation/, "kanchenjunga-conservation-area"],
  [/sankhuwasabha restricted/, "makalu-rap"],
  [/makalu[- ]barun national park/, "makalu-barun-national-park"],
  [/langtang national park/, "langtang-national-park"],
  [/restricted area permit - rasuwa/, "rasuwa-rap"],
  [/shivapuri nagarjun national park entry/, "shivapuri-nagarjun-national-park"],
  [/upper dolpo/, "upper-dolpo-rap"],
  [/lower dolpo/, "lower-dolpo-rap"],
  [/phoksundo national park/, "shey-phoksundo-national-park"],
  [/rara national park/, "rara-national-park"],
  [/chitwan national park entry/, "chitwan-national-park"],
  [/bardia national park/, "bardia-national-park"],
  [/\bnma\b/, "nma-island-peak"],
  [/department of tourism|royalty/, "dot-expedition-permit"],
  [/durbar square|swayambhu|boudha|pashupati/, "kathmandu-valley-heritage-sites"],
  [/lumbini development/, "lumbini-entry"],
  [/tibet travel permit/, "tibet-travel-permit"],
  [/bhutan/, "bhutan-visa"],
];

function permitSlugs(trip: FactFile): string[] {
  const slugs = new Set<string>();
  for (const permit of trip.permits ?? []) {
    const name = permit.name.toLowerCase();
    // Permits only needed for an optional extension don't belong to the trip itself.
    const scope = (permit.applies_to ?? "").toLowerCase();
    if (name.includes("only if") || /^only if|not normally required/.test(scope))
      continue;
    for (const [pattern, slug] of PERMIT_MATCHES) {
      // NMA permits mention royalty too; they are not Department of Tourism permits.
      if (slug === "dot-expedition-permit" && /\bnma\b/.test(name)) continue;
      if (pattern.test(name)) slugs.add(slug);
    }
  }
  return [...slugs];
}

function seasonsFrom(trip: FactFile): string[] {
  const blob = (trip.best_seasons?.primary ?? []).join(" ").toLowerCase();
  const seasons: string[] = [];
  if (blob.includes("mar") || blob.includes("apr") || blob.includes("may"))
    seasons.push("spring");
  if (blob.includes("sep") || blob.includes("oct") || blob.includes("nov"))
    seasons.push("autumn");
  if (blob.includes("dec") || blob.includes("jan") || blob.includes("feb"))
    seasons.push("winter");
  return seasons.length > 0 ? seasons : ["spring", "autumn"];
}

function usesLukla(trip: FactFile): boolean {
  if (typeof trip.uses_lukla === "boolean") return trip.uses_lukla;
  const blob =
    `${trip.start_point ?? ""} ${trip.logistics?.flights?.join(" ") ?? ""}`.toLowerCase();
  return (
    blob.includes("lukla") || blob.includes("ramechhap") || blob.includes("manthali")
  );
}

export function waypoints(days: CatalogDay[], region: string): CatalogTrip["route"] {
  const origin =
    region === "annapurna"
      ? { lng: 84.0, lat: 28.5 }
      : region === "langtang"
        ? { lng: 85.5, lat: 28.2 }
        : region === "manaslu"
          ? { lng: 84.7, lat: 28.55 }
          : region === "mustang"
            ? { lng: 83.9, lat: 29.1 }
            : { lng: 86.73, lat: 27.7 };
  return days.map((d, i) => ({
    name: d.toPlace,
    lng: origin.lng + i * 0.04,
    lat: origin.lat + Math.sin(i / 3) * 0.03,
    altitudeM: d.sleepAltitudeM,
    dayNumber: d.dayNumber,
    ...(d.dayLabel ? { dayLabel: d.dayLabel } : {}),
  }));
}

function normalizeFact(file: FactFile): FactFile & {
  itinerary: FactDay[];
  permits: { name: string; applies_to?: string }[];
  highlights: string[];
  logistics: { notes?: string; flights?: string[]; drives?: string[] };
  sources: { title: string; url: string; accessed?: string }[];
  best_seasons: { primary: string[]; notes: string };
  difficulty: { grade: string; technical_grade: string | null; notes: string };
  duration_days: { min: number; max: number; typical: number; notes: string };
  max_altitude_m: number;
  max_altitude_point: string;
  start_point: string;
  end_point: string;
} {
  return {
    ...file,
    itinerary: file.itinerary ?? [],
    permits: file.permits ?? [],
    highlights: file.highlights ?? [],
    logistics: file.logistics ?? {},
    sources: file.sources ?? [],
    best_seasons: {
      primary: file.best_seasons?.primary ?? [],
      notes: file.best_seasons?.notes ?? "",
    },
    difficulty: file.difficulty ?? {
      grade: "moderate",
      technical_grade: null,
      notes: "",
    },
    duration_days: file.duration_days ?? { min: 5, max: 14, typical: 10, notes: "" },
    max_altitude_m: file.max_altitude_m ?? 1400,
    max_altitude_point: file.max_altitude_point ?? file.name,
    start_point: file.start_point ?? "Kathmandu",
    end_point: file.end_point ?? "Kathmandu",
  };
}

function mapTrip(raw: ReturnType<typeof normalizeFact>, overview: string): CatalogTrip {
  const days: CatalogDay[] = [];
  let prevSleep = 1400;
  for (const item of raw.itinerary) {
    const mapped = mapDay(item, prevSleep, raw);
    // Fact files write days as text, including blocks ("9-12") and unnumbered
    // alternatives; keep a real number for ordering and the label for display.
    const label = String(item.day).trim();
    if (/^\d+$/.test(label)) {
      mapped.dayNumber = Number(label);
    } else {
      const first = Number.parseInt(label, 10);
      mapped.dayNumber = Number.isFinite(first)
        ? first
        : (days[days.length - 1]?.dayNumber ?? 0) + 1;
      mapped.dayLabel = label;
    }
    const written = dayCopy[raw.slug]?.[mapped.dayLabel ?? String(mapped.dayNumber)];
    if (written) mapped.description = written;
    if (days.length > 0) {
      const prev = days[days.length - 1];
      if (prev) mapped.fromPlace = prev.toPlace;
    } else {
      mapped.fromPlace = "Kathmandu";
    }
    days.push(mapped);
    prevSleep = mapped.sleepAltitudeM;
  }

  const sources: Source[] = raw.sources.map((s) => ({
    url: s.url,
    title: s.title,
    accessedAt: s.accessed,
  }));

  const lukla = usesLukla(raw);
  const region = regionSlug(raw.region);
  const included = includedFor(activitySlug(raw.activity_type, raw.slug));

  return {
    slug: raw.slug,
    title: raw.name,
    subtitle: tripCopy[raw.slug]?.subtitle ?? raw.name,
    activity: activitySlug(raw.activity_type, raw.slug),
    regions: region ? [region] : [],
    difficulty: difficulty(raw.difficulty.grade),
    technicalGrade: raw.difficulty.technical_grade ?? undefined,
    durationMin: raw.duration_days.min,
    durationTypical: raw.duration_days.typical,
    durationMax: raw.duration_days.max,
    maxAltitudeM: raw.max_altitude_m,
    maxAltitudePoint: tripCopy[raw.slug]?.point ?? publicText(raw.max_altitude_point),
    startPoint: raw.start_point,
    endPoint: raw.end_point,
    groupType: ["private"],
    highlights: (tripHighlights[raw.slug] ?? raw.highlights)
      .map(publicText)
      .filter(Boolean),
    overview: tripOverviews[raw.slug] ?? publicText(overview),
    inclusions: included.included,
    exclusions: included.excluded,
    contingency: publicText(
      lukla
        ? [
            "Lukla and Ramechhap (Manthali) flights are weather-dependent.",
            "Peak seasons often divert Kathmandu–Lukla flights via Manthali after a 4–5 h pre-dawn drive.",
            "Keep at least one buffer day before an international departure.",
            raw.logistics.notes ?? "",
          ].join(" ")
        : (raw.logistics.notes ?? "Keep a buffer day for weather and road delays."),
    ),
    acclimatizationNotes: publicText(raw.acclimatization?.notes ?? raw.difficulty.notes),
    days,
    permits: permitSlugs(raw),
    seasons: seasonsFrom(raw),
    faqs: [],
    related: [],
    peaks: tripPeaks[raw.slug] ?? [],
    usesLukla: lukla,
    route: waypoints(days, region),
    status: "published",
    sources,
  };
}

const overviews: Record<string, string> = {
  "everest-base-camp-trek":
    "Walk to Everest Base Camp at a pace your body agrees with: typically 14 days Kathmandu to Kathmandu, two acclimatisation stops, one private guide. This is a teahouse trek, not a climb. Difficulty is altitude and the 7–8 hour days around Gorak Shep, not technical ice. The Khumbu is Sherpa country. We walk through it as guests. Sample variants (helicopter return, Gokyo and Cho La, Jiri walk-in) are designed around your dates.",
  "annapurna-circuit-trek":
    "A private circuit around the Annapurna massif, crossing Thorong La at 5,416 m. The sample is a 13-day Kathmandu-to-Kathmandu plan with a jeep to Dharapani, a rest day in Manang, and a Jomsom flight out. The road now reaches Manang and Muktinath; we use NATT side-trails to keep off as much dusty road as the route allows. We design the version you actually want to walk.",
  "island-peak-climbing":
    "Island Peak (Imja Tse) listed 6,165 m by the NMA service-charge table and the Himalayan Database, with Everest Base Camp and Kala Patthar on the acclimatisation walk. Glacier travel, a fixed-rope headwall, a short exposed summit ridge, and a reserve summit day. Operator grade Alpine F/PD to PD+. Technical, privately guided. NMA climbing permit required. We do not guarantee a summit.",
  "annapurna-base-camp-trek":
    "A published-ready draft of the Annapurna Sanctuary walk to Annapurna Base Camp. Full day-by-day copy is in review; altitudes come from the sourced fact file.",
  "manaslu-circuit-trek":
    "Restricted-area circuit around Manaslu. Draft page — permits and rest days are sourced. [[TBD: owner facts]]",
  "langtang-valley-trek":
    "Valley trek north of Kathmandu, with Kyanjin Gompa as the usual high sleep. Draft page from sourced facts.",
  "upper-mustang-trek":
    "Restricted rain-shadow former kingdom. Draft page; RAP and ACAP apply. [[TBD: owner licence facts]]",
  "ghorepani-poon-hill-trek":
    "Short Annapurna foothill trek to Poon Hill. Draft page from sourced facts.",
};

function factsDirectory(): string {
  const fromModule = join(dirname(fileURLToPath(import.meta.url)), "../../content/facts");
  if (existsSync(fromModule)) return fromModule;
  return join(process.cwd(), "content/facts");
}

export function loadFactFiles(): FactFile[] {
  const dir = factsDirectory();
  return readdirSync(dir)
    .filter((name) => name.endsWith(".json") && !name.startsWith("_"))
    .sort()
    .map((name) => JSON.parse(readFileSync(join(dir, name), "utf8")) as FactFile)
    .filter((file) => Boolean(file.slug && file.name));
}

export const factFiles = loadFactFiles();

export function tripsFromFacts(): CatalogTrip[] {
  const trips = factFiles.map((file) => {
    const raw = normalizeFact(file);
    return mapTrip(
      raw,
      overviews[file.slug] ??
        raw.difficulty.notes ??
        `${file.name} is a private OutdoorKing journey. Draft page. Designed around your dates. [[TBD: owner facts]]`,
    );
  });
  for (const trip of trips) trip.faqs = faqsForTrip(trip);
  const bySlug = Object.fromEntries(trips.map((t) => [t.slug, t]));
  const ebcTrip = bySlug["everest-base-camp-trek"];
  const islandTrip = bySlug["island-peak-climbing"];
  const circuitTrip = bySlug["annapurna-circuit-trek"];
  if (ebcTrip && islandTrip) {
    ebcTrip.related = ["island-peak-climbing"];
    islandTrip.related = ["everest-base-camp-trek"];
  }
  if (circuitTrip)
    circuitTrip.related = ["annapurna-base-camp-trek", "ghorepani-poon-hill-trek"];
  return trips;
}

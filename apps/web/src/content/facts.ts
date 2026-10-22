import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { DayType } from "@ok/ai/rules";

import type { CatalogDay, CatalogTrip, Source } from "./types";

type FactDay = {
  day: number;
  route: string;
  overnight: string | null;
  overnight_altitude_m: number | null;
  walking_hours: string | null;
  notes: string | null;
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
  permits?: { name: string }[];
  highlights?: string[];
  logistics?: { notes?: string; flights?: string[]; drives?: string[] };
  acclimatization?: { days: number; where: string[]; notes: string };
  sources?: { title: string; url: string; accessed?: string }[];
};

const FULL = new Set([
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
  if (blob.includes("acclimat") || blob.includes("training"))
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
  const highPointM = Math.max(sleep, fromNotes ?? sleep, prevSleep);
  const overnight = day.overnight ?? trip.end_point ?? "Kathmandu";
  return {
    dayNumber: day.day,
    title: day.route,
    description: day.notes ?? day.route,
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
  if (value.includes("everest") || value.includes("khumbu")) return "everest";
  if (value.includes("annapurna") || value.includes("pokhara")) return "annapurna";
  if (value.includes("langtang") || value.includes("helambu") || value.includes("tamang"))
    return "langtang";
  if (value.includes("manaslu") || value.includes("tsum") || value.includes("nar phu"))
    return "manaslu";
  if (value.includes("mustang")) return "mustang";
  if (value.includes("dolpo")) return "dolpo";
  if (value.includes("kanchenjunga") || value.includes("kangchenjunga"))
    return "kanchenjunga";
  if (value.includes("makalu")) return "makalu";
  if (value.includes("chitwan") || value.includes("bardia") || value.includes("bardiya"))
    return "chitwan";
  return "kathmandu-valley";
}

function activitySlug(type: string): string {
  if (type === "peak-climb") return "peak-climbing";
  if (type === "expedition") return "expeditions";
  if (type === "tour") return "tours";
  if (type === "activity") return "tours";
  if (type === "heli" || type === "heli-trek") return "heli-treks";
  if (type === "wildlife") return "wildlife";
  return "trekking";
}

function permitSlugs(trip: FactFile): string[] {
  const names = (trip.permits ?? []).map((p) => p.name.toLowerCase()).join(" ");
  const slugs: string[] = [];
  if (names.includes("sagarmatha")) slugs.push("sagarmatha-national-park");
  if (names.includes("khumbu") || names.includes("trek-card"))
    slugs.push("khumbu-trek-card");
  if (names.includes("tims")) slugs.push("tims");
  if (names.includes("acap") || names.includes("annapurna conservation"))
    slugs.push("acap");
  if (names.includes("manaslu")) slugs.push("manaslu-rap");
  if (names.includes("mustang")) slugs.push("upper-mustang-rap");
  if (trip.slug.includes("island-peak") || names.includes("island peak")) {
    slugs.push("nma-island-peak");
  }
  if (slugs.length === 0) slugs.push("tims");
  return slugs;
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
  const blob =
    `${trip.start_point ?? ""} ${trip.logistics?.flights?.join(" ") ?? ""}`.toLowerCase();
  return (
    blob.includes("lukla") || blob.includes("ramechhap") || blob.includes("manthali")
  );
}

function waypoints(days: CatalogDay[], region: string): CatalogTrip["route"] {
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
  }));
}

function normalizeFact(file: FactFile): FactFile & {
  itinerary: FactDay[];
  permits: { name: string }[];
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
  const full = FULL.has(raw.slug);

  return {
    slug: raw.slug,
    title: raw.name,
    subtitle: `${String(raw.duration_days.typical)} days typical · max ${String(raw.max_altitude_m)} m (${raw.max_altitude_point})`,
    activity: activitySlug(raw.activity_type),
    regions: [region],
    difficulty: difficulty(raw.difficulty.grade),
    technicalGrade: raw.difficulty.technical_grade ?? undefined,
    durationMin: raw.duration_days.min,
    durationTypical: raw.duration_days.typical,
    durationMax: raw.duration_days.max,
    maxAltitudeM: raw.max_altitude_m,
    maxAltitudePoint: raw.max_altitude_point,
    startPoint: raw.start_point,
    endPoint: raw.end_point,
    groupType: ["private"],
    highlights: highlightOverrides[raw.slug] ?? raw.highlights,
    overview,
    inclusions: [
      "Licensed guide [[TBD: named guide / ratio]]",
      "Permits arranged by the agency",
      "Teahouse or tent nights as the itinerary requires",
    ],
    exclusions: [
      "International flights",
      "Travel insurance with helicopter rescue to the trip's max altitude",
      "Personal equipment and drinks",
    ],
    contingency: lukla
      ? [
          "Lukla and Ramechhap (Manthali) flights are weather-dependent.",
          "Peak seasons often divert Kathmandu–Lukla flights via Manthali after a 4–5 h pre-dawn drive.",
          "Keep at least one buffer day before an international departure.",
          raw.logistics.notes ?? "",
        ].join(" ")
      : (raw.logistics.notes ?? "Keep a buffer day for weather and road delays."),
    acclimatizationNotes: raw.acclimatization?.notes ?? raw.difficulty.notes,
    days,
    permits: permitSlugs(raw),
    seasons: seasonsFrom(raw),
    faqs: FULL.has(raw.slug)
      ? raw.slug.includes("everest")
        ? ["lukla-flights", "do-i-need-insurance", "how-hard-is-altitude", "what-is-tims"]
        : raw.slug.includes("island")
          ? ["how-hard-is-altitude", "do-i-need-insurance", "rescue", "guide-required"]
          : ["do-i-need-insurance", "how-hard-is-altitude", "best-season", "what-is-tims"]
      : ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    related: [],
    peaks: raw.slug.includes("island") ? ["island-peak"] : [],
    usesLukla: lukla,
    route: waypoints(days, region),
    status: full ? "published" : "draft",
    sources,
  };
}

const overviews: Record<string, string> = {
  "everest-base-camp-trek":
    "Walk to Everest Base Camp at a pace your body agrees with: typically 14 days Kathmandu to Kathmandu, two acclimatisation stops, one private guide. This is a teahouse trek, not a climb. Difficulty is altitude and the 7–8 hour days around Gorak Shep, not technical ice. The Khumbu is Sherpa country. We walk through it as guests. Sample variants (helicopter return, Gokyo and Cho La, Jiri walk-in) are quoted privately.",
  "annapurna-circuit-trek":
    "A private circuit around the Annapurna massif, crossing Thorong La at 5,416 m. The sample is a 13-day Kathmandu-to-Kathmandu plan with a jeep to Dharapani, a rest day in Manang, and a Jomsom flight out. The road now reaches Manang and Muktinath; we use NATT side-trails to keep off as much dusty road as the route allows. No public price — we quote the version you actually want to walk.",
  "island-peak-climbing":
    "Island Peak (Imja Tse) listed 6,165 m by the NMA service-charge table and the Himalayan Database, with Everest Base Camp and Kala Patthar on the acclimatisation walk. Glacier travel, a fixed-rope headwall, a short exposed summit ridge, and a reserve summit day. Operator grade Alpine F/PD to PD+. Technical, privately guided. NMA climbing permit required. We do not guarantee a summit.",
  "annapurna-base-camp-trek":
    "A published-ready draft of the Annapurna Sanctuary walk to Annapurna Base Camp. Full day-by-day copy is in review; altitudes come from the sourced fact file.",
  "manaslu-circuit-trek":
    "Restricted-area circuit around Manaslu. Draft page — permits and rest days are sourced; owner facts stay [[TBD]].",
  "langtang-valley-trek":
    "Valley trek north of Kathmandu, with Kyanjin Gompa as the usual high sleep. Draft page from sourced facts.",
  "upper-mustang-trek":
    "Restricted rain-shadow former kingdom. Draft page; RAP and ACAP apply. Owner licence facts remain [[TBD]].",
  "ghorepani-poon-hill-trek":
    "Short Annapurna foothill trek to Poon Hill. Draft page from sourced facts.",
};

const highlightOverrides: Record<string, string[]> = {
  "everest-base-camp-trek": [
    "Everest Base Camp at 5,364 m, on the moraine beside the Khumbu Icefall.",
    "Sunrise from Kala Patthar — height used here 5,545 m (common operator figure; GPS of the prayer-flag summit is higher in some sources).",
    "Namche Bazaar and Tengboche Monastery, with Ama Dablam across the valley.",
    "Sagarmatha National Park, a UNESCO World Heritage Site.",
  ],
  "annapurna-circuit-trek": [
    "Thorong La, 5,416 m — a 7–9 hour day from Thorong Phedi or High Camp.",
    "Upper Pisang–Ghyaru–Ngawal high route, off the valley road.",
    "Manang’s Tibetan-influenced villages and a rest day before the pass.",
    "Muktinath, then the Kali Gandaki toward Kagbeni and Jomsom.",
  ],
  "island-peak-climbing": [
    "Summit of Imja Tse, listed 6,165 m by NMA and the Himalayan Database.",
    "Everest Base Camp and Kala Patthar on the acclimatisation trek.",
    "Imja Glacier, a 40–50° snow/ice headwall on fixed rope, and a reserve day.",
    "Crampon, ice-axe and jumar skills taught at base camp. This is still a climb.",
  ],
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
        `${file.name} is a private OutdoorKing journey. Draft page — owner facts stay [[TBD]]. No public trip price.`,
    );
  });
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

import type { CatalogIndex, SourceChunk } from "./types";

const TBD_OPEN = "[[TBD";

/**
 * Strip `[[TBD]]` / `[[TBD: …]]` markers with a linear scan.
 * Avoids `/\[\[TBD(?::[^\]]*)?\]\]/` which is polynomial on repeated `[[TBD:`.
 */
export function stripTbdMarkers(text: string): string {
  let out = "";
  let i = 0;
  while (i < text.length) {
    const start = text.indexOf(TBD_OPEN, i);
    if (start === -1) {
      out += text.slice(i);
      break;
    }
    out += text.slice(i, start);
    const afterMarker = start + TBD_OPEN.length;
    if (text.startsWith("]]", afterMarker)) {
      i = afterMarker + 2;
      continue;
    }
    if (text[afterMarker] === ":") {
      const end = text.indexOf("]]", afterMarker + 1);
      if (end === -1) {
        out += text.slice(start);
        break;
      }
      i = end + 2;
      continue;
    }
    out += TBD_OPEN;
    i = afterMarker;
  }
  return out;
}

function chunk(
  sourceType: string,
  sourceId: string,
  title: string,
  url: string,
  body: string,
  locale = "en",
): SourceChunk {
  const header = `title=${title} locale=${locale} url=${url} source=${sourceType}:${sourceId}`;
  return {
    id: `${sourceType}:${sourceId}:0`,
    sourceType,
    sourceId,
    locale,
    url,
    title,
    content: `${header}\n${stripTbdMarkers(body)
      .replace(/[ \t]{2,}/g, " ")
      .trim()}`,
  };
}

/** Published catalog only. Never index PII, quotes, bookings, or reviews. */
export function indexCatalog(catalog: CatalogIndex, locale = "en"): SourceChunk[] {
  const chunks: SourceChunk[] = [];
  for (const trip of catalog.trips) {
    chunks.push(
      chunk(
        "trip",
        trip.slug,
        trip.title,
        `/trips/${trip.slug}`,
        [
          trip.overview ?? "",
          `activity=${trip.activity}`,
          `regions=${trip.regions.join(",")}`,
          `duration=${String(trip.durationMin ?? "")}-${String(trip.durationMax ?? "")}d`,
          `maxAltitudeM=${String(trip.maxAltitudeM ?? "")}`,
          `permits=${trip.permits.join(",")}`,
          `seasons=${trip.seasons.join(",")}`,
          trip.usesLukla ? "Lukla/Ramechhap buffer day required." : "",
          "Private journey, designed around your dates.",
        ].join("\n"),
        locale,
      ),
    );
    for (const day of trip.days) {
      chunks.push(
        chunk(
          "itinerary_day",
          `${trip.slug}:${String(day.dayNumber)}`,
          `${trip.title} day ${String(day.dayNumber)}`,
          `/trips/${trip.slug}`,
          `Day ${String(day.dayNumber)} ${day.title}: ${day.fromPlace} to ${day.toPlace}. Sleep ${String(day.sleepAltitudeM)} m, high ${String(day.highPointM)} m, type ${day.dayType}.`,
          locale,
        ),
      );
    }
  }
  for (const permit of catalog.permits) {
    chunks.push(
      chunk(
        "permit",
        permit.slug,
        permit.name,
        `/permits/${permit.slug}`,
        `${permit.notes} Authority: ${permit.authority}. Last verified ${permit.lastVerifiedAt}.${permit.requiresLicensedGuide ? " Licensed guide required." : ""}`,
        locale,
      ),
    );
  }
  for (const season of catalog.seasons) {
    chunks.push(
      chunk(
        "season",
        season.slug,
        season.name,
        "/guides/best-time-to-trek",
        `${season.name} covers months ${season.months.join(", ")}.`,
        locale,
      ),
    );
  }
  for (const region of catalog.regions) {
    chunks.push(
      chunk(
        "region",
        region.slug,
        region.name,
        `/regions/${region.slug}`,
        `${region.summary} Access: ${region.access}`,
        locale,
      ),
    );
  }
  for (const peak of catalog.peaks) {
    chunks.push(
      chunk(
        "peak",
        peak.slug,
        peak.name,
        `/peaks/${peak.slug}`,
        `${peak.name} is ${String(peak.heightM)} m in ${peak.region}.`,
        locale,
      ),
    );
  }
  for (const faq of catalog.faqs) {
    chunks.push(
      chunk(
        "faq",
        faq.slug,
        faq.question,
        "/faq",
        `${faq.question} ${faq.answer}`,
        locale,
      ),
    );
  }
  for (const page of catalog.pages) {
    if (page.status !== "published") continue;
    chunks.push(chunk("page", page.slug, page.title, page.path, page.body, locale));
  }
  return chunks;
}

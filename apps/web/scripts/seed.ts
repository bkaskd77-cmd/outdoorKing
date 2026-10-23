import {
  activities,
  faqs,
  getTrips,
  pages,
  peaks,
  permits,
  regions,
  seasons,
} from "../src/content/catalog";

async function seed() {
  const all = getTrips();
  const published = getTrips("published");
  const drafts = getTrips("draft");
  console.log("Phase 5 content seed (catalog snapshot).");
  console.log(
    `activities=${String(activities.length)} regions=${String(regions.length)}`,
  );
  console.log(
    `trips=${String(all.length)} published=${String(published.length)} drafts=${String(drafts.length)}`,
  );
  console.log(
    `permits=${String(permits.length)} seasons=${String(seasons.length)} faqs=${String(faqs.length)}`,
  );
  console.log(`peaks=${String(peaks.length)} pages=${String(pages.length)}`);
  console.log(
    "The sourced catalog library is published. Flagship itineraries stay EBC / Annapurna Circuit / Island Peak.",
  );
  console.log(
    "When Postgres/Payload are up, this catalog is the source for payload.create calls. AI writer writes drafts only.",
  );
}

await seed();

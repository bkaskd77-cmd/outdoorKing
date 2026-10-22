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
  console.log("Phase 1 content seed (catalog snapshot).");
  console.log(
    `activities=${String(activities.length)} regions=${String(regions.length)}`,
  );
  console.log(
    `trips=${String(getTrips().length)} published=${String(getTrips("published").length)}`,
  );
  console.log(
    `permits=${String(permits.length)} seasons=${String(seasons.length)} faqs=${String(faqs.length)}`,
  );
  console.log(`peaks=${String(peaks.length)} pages=${String(pages.length)}`);
  console.log(
    "When Postgres/Payload are up, this catalog is the source for payload.create calls.",
  );
}

await seed();

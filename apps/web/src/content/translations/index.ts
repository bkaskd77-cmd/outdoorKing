import { activitiesDe, seasonsDe } from "./de/activities";
import { faqsDe } from "./de/faqs";
import { guidesDe } from "./de/guides";
import { pagesDe } from "./de/pages";
import { peaksDe } from "./de/peaks";
import { permitsDe } from "./de/permits";
import { regionsDe } from "./de/regions";
import { tripPhrasesDe } from "./de/trip-phrases";
import { tripsDeA } from "./de/trips-a";
import { tripsDeB } from "./de/trips-b";
import { tripsDeC } from "./de/trips-c";
import { tripsDeD } from "./de/trips-d";
import type { CatalogTranslation } from "./types";

export { translateCatalog, type CatalogTranslation } from "./types";

/** Translated catalog text by locale. English is the catalog itself. */
export const translations: Partial<Record<string, CatalogTranslation>> = {
  de: {
    pages: { ...pagesDe, ...guidesDe },
    faqs: faqsDe,
    activities: activitiesDe,
    regions: regionsDe,
    seasons: seasonsDe,
    permits: permitsDe,
    peaks: peaksDe,
    trips: { ...tripsDeA, ...tripsDeB, ...tripsDeC, ...tripsDeD },
    tripPhrases: tripPhrasesDe,
  },
};

import { faqsDe } from "./de/faqs";
import { guidesDe } from "./de/guides";
import { pagesDe } from "./de/pages";
import type { CatalogTranslation } from "./types";

export { translateCatalog, type CatalogTranslation } from "./types";

/** Translated catalog text by locale. English is the catalog itself. */
export const translations: Partial<Record<string, CatalogTranslation>> = {
  de: {
    pages: { ...pagesDe, ...guidesDe },
    faqs: faqsDe,
  },
};

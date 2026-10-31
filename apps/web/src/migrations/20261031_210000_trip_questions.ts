import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanNewFaqs, newFaqDocs, tripFaqLinks } from './data/20261031_trip_questions'
import { syncTripLinks, upsertCatalogDocs } from './lib/sync-catalog-links'
import { syncTranslations } from './lib/sync-translations'

/**
 * Trip pages show questions that fit the trip (flights, restricted areas, altitude,
 * climbing, wildlife, tours) instead of the same three everywhere. Eight new questions
 * are added in English and German. Lists and questions an editor has changed are kept.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await upsertCatalogDocs(payload, req, 'faqs', newFaqDocs)),
    ...(await syncTripLinks(payload, req, tripFaqLinks)),
    ...(await syncTranslations(payload, req, 'faqs', 'de', germanNewFaqs)),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`Trip questions kept edited content: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

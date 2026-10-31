import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanFaqs, germanPages } from './data/20261031_german_pages'
import { syncTranslations } from './lib/sync-translations'

/**
 * German text for every page, guide and FAQ. Only German fields that are still empty
 * are written, so translations an editor has made are kept. English is not touched.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await syncTranslations(payload, req, 'pages', 'de', germanPages)),
    ...(await syncTranslations(payload, req, 'faqs', 'de', germanFaqs)),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`German pages kept existing translations: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { faqDocs } from './data/20261031_faqs'
import { upsertCatalogDocs } from './lib/sync-catalog-links'

/**
 * October 2026 FAQ: twenty-one new questions, every question ordered and grouped by
 * topic, and "When should I go?" moved to planning. Edited questions are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await upsertCatalogDocs(payload, req, 'faqs', faqDocs)
  if (skipped.length > 0) {
    payload.logger.warn(`FAQ expansion skipped edited questions: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

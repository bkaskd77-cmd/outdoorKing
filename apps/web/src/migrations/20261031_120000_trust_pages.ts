import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { trustPageDocs } from './data/20261031_trust_pages'
import { upsertCatalogDocs } from './lib/sync-catalog-links'

/**
 * October 2026: fuller safety and rescue, insurance and responsible travel pages.
 * Pages an editor has changed are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await upsertCatalogDocs(payload, req, 'pages', trustPageDocs)
  if (skipped.length > 0) {
    payload.logger.warn(`Trust page update skipped edited pages: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

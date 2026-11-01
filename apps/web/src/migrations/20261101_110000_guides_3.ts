import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanGuides3, guideDocs3 } from './data/20261101_guides_3'
import { upsertCatalogDocs } from './lib/sync-catalog-links'
import { syncTranslations } from './lib/sync-translations'

/**
 * Six more travel guides under /guides, in English and German: short treks, Annapurna
 * or Manaslu Circuit, Island or Mera Peak, Chitwan or Bardia, Pokhara, and planning a
 * first trip. Pages an editor has changed are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await upsertCatalogDocs(payload, req, 'pages', guideDocs3)),
    ...(await syncTranslations(payload, req, 'pages', 'de', germanGuides3)),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`New travel guides kept edited pages: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

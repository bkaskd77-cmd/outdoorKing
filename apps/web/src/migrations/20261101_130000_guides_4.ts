import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanGuides4, guideDocs4 } from './data/20261101_guides_4'
import { upsertCatalogDocs } from './lib/sync-catalog-links'
import { syncTranslations } from './lib/sync-translations'

/**
 * Five more travel guides under /guides, in English and German: which Everest trek,
 * trekking alone, the remote treks, adventure activities, and adding Bhutan or Tibet.
 * Pages an editor has changed are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await upsertCatalogDocs(payload, req, 'pages', guideDocs4)),
    ...(await syncTranslations(payload, req, 'pages', 'de', germanGuides4)),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`New travel guides kept edited pages: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

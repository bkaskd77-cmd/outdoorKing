import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanGuides2, guideDocs2 } from './data/20261031_guides_2'
import { upsertCatalogDocs } from './lib/sync-catalog-links'
import { syncTranslations } from './lib/sync-translations'

/**
 * Six more travel guides under /guides, in English and German: Everest or Annapurna
 * Base Camp, restricted areas, food and water, culture and etiquette, Kathmandu, and
 * winter and monsoon trekking. Pages an editor has changed are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await upsertCatalogDocs(payload, req, 'pages', guideDocs2)),
    ...(await syncTranslations(payload, req, 'pages', 'de', germanGuides2)),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`New travel guides kept edited pages: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

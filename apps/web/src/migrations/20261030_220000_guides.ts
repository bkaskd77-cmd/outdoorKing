import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { guideDocs } from './data/20261030_guides'
import { upsertCatalogDocs } from './lib/sync-catalog-links'

/**
 * October 2026 travel guides: the three seeded guides are rewritten and eight new guide
 * pages are added under /guides. Edited guides are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await upsertCatalogDocs(payload, req, 'pages', guideDocs)
  if (skipped.length > 0) {
    payload.logger.warn(`Travel guides skipped edited pages: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

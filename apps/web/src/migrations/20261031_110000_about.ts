import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { aboutDocs } from './data/20261031_about'
import { upsertCatalogDocs } from './lib/sync-catalog-links'

/** October 2026 About page rewrite. An About page an editor has changed is left alone. */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await upsertCatalogDocs(payload, req, 'pages', aboutDocs)
  if (skipped.length > 0) {
    payload.logger.warn(`About rewrite skipped edited pages: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

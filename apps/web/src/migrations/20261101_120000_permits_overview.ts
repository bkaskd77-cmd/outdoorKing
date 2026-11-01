import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanPermitsOverview, permitsOverview } from './data/20261101_permits_overview'
import { syncDocs } from './lib/sync-docs'

/**
 * A longer permits overview page in English and German: the permits each region needs,
 * climbing permits, how we arrange them and how fees are set. Kept if an editor has
 * changed the page.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await syncDocs(payload, req, 'pages', permitsOverview, 'en')),
    ...(await syncDocs(payload, req, 'pages', germanPermitsOverview, 'de')),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`Permits overview kept edited text: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

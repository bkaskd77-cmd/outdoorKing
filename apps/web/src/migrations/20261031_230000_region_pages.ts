import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanRegionPages, regionPages } from './data/20261031_region_pages'
import { syncDocs } from './lib/sync-docs'

/**
 * Longer region pages in English and German: when to go, and the people, culture or
 * wildlife of each region. Pages an editor has changed are kept.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await syncDocs(payload, req, 'regions', regionPages, 'en')),
    ...(await syncDocs(payload, req, 'regions', germanRegionPages, 'de')),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`Region pages kept edited text: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

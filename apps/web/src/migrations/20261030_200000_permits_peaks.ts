import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { peakDocs, permitDocs, tripLinks } from './data/20261030_permits_peaks'
import { syncTripLinks, upsertCatalogDocs } from './lib/sync-catalog-links'

/**
 * October 2026 permits and peaks: every permit the trips need and every peak they
 * climb, each with page text, and trips linked to them. Documents and trip links an
 * editor has changed are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await upsertCatalogDocs(payload, req, 'permits', permitDocs)),
    ...(await upsertCatalogDocs(payload, req, 'peaks', peakDocs)),
    ...(await syncTripLinks(payload, req, tripLinks)),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`Permits and peaks skipped edited items: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

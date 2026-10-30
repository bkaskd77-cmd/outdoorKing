import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { permitFeeDocs, permitFeeLinks } from './data/20261030_permit_fees'
import { syncTripLinks, upsertCatalogDocs } from './lib/sync-catalog-links'

/**
 * October 2026 permit fees: each permit page lists its published fees. The Makalu
 * restricted-area permit is unlinked from Makalu trips, whose standard route does not
 * enter the restricted area. Edited permits and links are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await upsertCatalogDocs(payload, req, 'permits', permitFeeDocs)),
    ...(await syncTripLinks(payload, req, permitFeeLinks)),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`Permit fees skipped edited items: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

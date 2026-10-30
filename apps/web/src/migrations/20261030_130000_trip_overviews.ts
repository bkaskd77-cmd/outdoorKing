import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { tripOverviewRewrite } from './data/20261030_trip_overviews'
import { syncTrips } from './lib/sync-trips'

/**
 * October 2026 trip overviews: a full introduction and a clean highlight list for every
 * trip. Trips whose overview or highlights were edited in the admin keep the editor's text.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await syncTrips(payload, req, tripOverviewRewrite)
  if (skipped.length > 0) {
    payload.logger.warn(`Trip overviews skipped edited trips: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

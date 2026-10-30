import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { tripCopyCleanup } from './data/20261030_trip_copy'
import { syncTrips } from './lib/sync-trips'

/**
 * October 2026 trip copy: subtitles and highest-point names written for travellers,
 * research notes and citation markers removed from day descriptions, highlights and
 * notes, and standard inclusions by activity. Edited trips are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await syncTrips(payload, req, tripCopyCleanup)
  if (skipped.length > 0) {
    payload.logger.warn(`Trip copy skipped edited trips: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

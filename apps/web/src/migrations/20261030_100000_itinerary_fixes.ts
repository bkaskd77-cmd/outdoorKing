import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { itineraryFixes } from './data/20261030_itinerary_fixes'
import { syncTrips } from './lib/sync-trips'

/**
 * October 2026 itinerary corrections: records summit and viewpoint high points that
 * were missing, and adds acclimatisation days or intermediate nights where routes
 * climbed too fast. Trips an editor has already changed are left as they are.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await syncTrips(payload, req, itineraryFixes)
  if (skipped.length > 0) {
    payload.logger.warn(`Itinerary fixes skipped edited trips: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content corrections are not reverted automatically; restore from a backup if needed.
}

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { dayCopyRewrite } from './data/20261030_day_copy'
import { syncDayCopy } from './lib/sync-day-copy'

/**
 * October 2026 itinerary copy: a written description for every day of every trip.
 * Days whose description was edited in the admin keep the editor's text.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await syncDayCopy(payload, req, dayCopyRewrite)
  if (skipped.length > 0) {
    payload.logger.warn(`Day copy skipped edited days: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanDays3 } from './data/20261031_german_days_3'
import { syncDayTranslations } from './lib/sync-day-translations'

/**
 * German day-by-day itineraries for the expeditions and tours. Only German fields
 * that are still empty are written, so translations an editor has made are kept.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await syncDayTranslations(payload, req, 'de', germanDays3)
  if (skipped.length > 0) {
    payload.logger.warn(`German days kept existing translations: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanTrips } from './data/20261031_german_trips'
import { syncTranslations } from './lib/sync-translations'

/**
 * German text for the trip pages: titles, introductions, highlights, what is included
 * and the practical notes. Only German fields that are still empty are written, so
 * translations an editor has made are kept. Itinerary days follow separately.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await syncTranslations(payload, req, 'trips', 'de', germanTrips)
  if (skipped.length > 0) {
    payload.logger.warn(`German trips kept existing translations: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

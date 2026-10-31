import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanPlaces } from './data/20261031_german_places'
import { syncTranslations } from './lib/sync-translations'

/**
 * German text for activities, regions, seasons, permits and peaks. Only German fields
 * that are still empty are written, so translations an editor has made are kept.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped: string[] = []
  for (const collection of ['activities', 'regions', 'seasons', 'permits', 'peaks'] as const) {
    skipped.push(...(await syncTranslations(payload, req, collection, 'de', germanPlaces[collection])))
  }
  if (skipped.length > 0) {
    payload.logger.warn(`German places kept existing translations: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

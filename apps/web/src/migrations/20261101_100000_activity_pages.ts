import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { activityPages, germanActivityPages } from './data/20261101_activity_pages'
import { syncDocs } from './lib/sync-docs'

/**
 * Longer activity pages in English and German for tours, helicopter flights, culture,
 * wildlife, families, photography and pilgrimage. Pages an editor has changed are kept.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await syncDocs(payload, req, 'activities', activityPages, 'en')),
    ...(await syncDocs(payload, req, 'activities', germanActivityPages, 'de')),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`Activity pages kept edited text: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

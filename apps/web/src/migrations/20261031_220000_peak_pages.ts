import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanPeakPages, peakPages } from './data/20261031_peak_pages'
import { syncDocs } from './lib/sync-docs'

/**
 * Longer peak pages in English and German: the climb camp by camp, when to climb, who
 * it suits and how our trip climbs it. Descriptions an editor has changed are kept.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await syncDocs(payload, req, 'peaks', peakPages, 'en')),
    ...(await syncDocs(payload, req, 'peaks', germanPeakPages, 'de')),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`Peak pages kept edited descriptions: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { activityCopyRewrite, regionCopyRewrite } from './data/20261030_place_copy'
import { syncDocs } from './lib/sync-docs'

/**
 * October 2026 activity and region pages: fuller summaries, travel notes and page
 * text. Fields an editor has already changed are left alone.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await syncDocs(payload, req, 'activities', activityCopyRewrite)),
    ...(await syncDocs(payload, req, 'regions', regionCopyRewrite)),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`Activity and region copy skipped edited docs: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

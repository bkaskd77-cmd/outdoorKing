import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { germanPurposePage, purposePage } from './data/20261101_purpose_page'
import { syncDocs } from './lib/sync-docs'

/**
 * The Travel with Purpose page text now names who the share helps: people and animals
 * in need in Nepal. Kept if an editor has changed it.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await syncDocs(payload, req, 'pages', purposePage, 'en')),
    ...(await syncDocs(payload, req, 'pages', germanPurposePage, 'de')),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`Purpose page kept edited text: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

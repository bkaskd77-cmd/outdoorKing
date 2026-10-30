import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { faqCopyRewrite, pageCopyRewrite } from './data/20261030_page_copy'
import { syncDocs } from './lib/sync-docs'

/**
 * October 2026 copy: replaces placeholder text on pages and FAQs that editors have
 * not changed.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = [
    ...(await syncDocs(payload, req, 'pages', pageCopyRewrite)),
    ...(await syncDocs(payload, req, 'faqs', faqCopyRewrite)),
  ]
  if (skipped.length > 0) {
    payload.logger.warn(`Copy rewrite skipped edited documents: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

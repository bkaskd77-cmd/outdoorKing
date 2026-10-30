import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { syncDocs } from './lib/sync-docs'

// Trips the seed filed under the Kathmandu Valley because their region matched nothing.
const MOVES: Record<string, string | null> = {
  'bardia-national-park-safari': 'chitwan',
  'lumbini-pilgrimage-tour': 'chitwan',
  'bhutan-add-on-tour': null,
  'tibet-add-on-tour': null,
}

/**
 * October 2026: the Chitwan region becomes "Chitwan and the Terai" and takes in Bardia
 * and Lumbini; Bhutan and Tibet leave the Kathmandu Valley. Trips whose regions were
 * changed in the admin keep them.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const skipped = await syncDocs(payload, req, 'regions', [
    {
      slug: 'chitwan',
      before: {
        name: 'Chitwan',
        summary: 'Lowland national park and river safari country.',
      },
      after: {
        name: 'Chitwan and the Terai',
        summary:
          'The lowlands of southern Nepal: jungle safaris in Chitwan and Bardia, and Lumbini, the birthplace of the Buddha.',
      },
    },
  ])

  const regions = await payload.find({
    collection: 'regions',
    depth: 0,
    draft: true,
    overrideAccess: true,
    pagination: false,
    req,
    where: { slug: { in: ['kathmandu-valley', 'chitwan'] } },
  })
  const idOf: Record<string, number | string> = Object.fromEntries(
    (regions.docs as unknown as { id: number | string; slug: string }[]).map((doc) => [
      doc.slug,
      doc.id,
    ]),
  )
  const valley = idOf['kathmandu-valley']

  for (const [slug, target] of Object.entries(MOVES)) {
    const found = await payload.find({
      collection: 'trips',
      depth: 0,
      draft: true,
      limit: 1,
      overrideAccess: true,
      req,
      where: { slug: { equals: slug } },
    })
    const trip = found.docs[0] as unknown as
      | { id: number | string; regions?: (number | string | { id: number | string })[] | null }
      | undefined
    if (!trip) continue
    const current = (trip.regions ?? []).map((region) =>
      typeof region === 'object' ? region.id : region,
    )
    if (current.length !== 1 || current[0] !== valley) {
      skipped.push(slug)
      continue
    }
    const next = target ? idOf[target] : undefined
    if (target && next === undefined) continue
    await payload.update({
      collection: 'trips',
      context: { seedCatalog: true },
      data: { regions: next === undefined ? [] : [next], _status: 'published' } as never,
      draft: false,
      id: trip.id,
      overrideAccess: true,
      req,
    })
  }

  if (skipped.length > 0) {
    payload.logger.warn(`Lowland regions skipped edited docs: ${skipped.join(', ')}`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Content changes are not reverted automatically; restore from a backup if needed.
}

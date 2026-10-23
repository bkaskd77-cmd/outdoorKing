#!/usr/bin/env bash
# Build the Next app from the pnpm workspace root so a Vercel project whose
# Root Directory is still the repo root can publish apps/web.
set -euo pipefail
export SKIP_ENV_VALIDATION="${SKIP_ENV_VALIDATION:-1}"
pnpm --filter web generate:importmap
pnpm --filter web build
if [[ -d apps/web/.next ]]; then
  rm -rf .next
  cp -a apps/web/.next .next
fi
if [[ -d apps/web/.vercel/output ]]; then
  rm -rf .vercel/output
  mkdir -p .vercel
  cp -a apps/web/.vercel/output .vercel/output
fi

# apps/intel

Internal FastAPI intelligence service (Phase 3). See ADR-0001.

It is **not public**. Next.js calls it with HMAC (`X-OK-Timestamp`, `X-OK-Signature`, 5-minute skew). Suggestions are staff-only and never printed as public trip prices.

## Run with uv (Python 3.14)

```bash
cd apps/intel
uv python pin 3.14
uv sync --extra dev
INTEL_HMAC_SECRET=intel-hmac-secret-must-be-32-chars!! uv run uvicorn ok_intel.main:app --port 8100
```

## Checks

```bash
uv run ruff check .
uv run pytest
uv run mypy src
```

`openapi.json` is the committed contract. `packages/intel-client` must stay aligned with it.

## Docker

```bash
docker build -t ok-intel apps/intel
docker run --rm -p 8100:8100 -e INTEL_HMAC_SECRET=... ok-intel
```

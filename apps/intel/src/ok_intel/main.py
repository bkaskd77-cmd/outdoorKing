from __future__ import annotations

from fastapi import Depends, FastAPI, HTTPException, Request

from ok_intel.auth import configured_secret, verify_signature
from ok_intel.logic import (
    PricingIn,
    PricingOut,
    SimilarIn,
    SimilarOut,
    similar_trips,
    suggest_pricing,
)

app = FastAPI(
    title="OutdoorKing Intel",
    version="0.0.0",
    description="Internal pricing hints and similar-trip recommendations.",
)


async def require_hmac(request: Request) -> None:
    body = await request.body()
    timestamp = request.headers.get("x-ok-timestamp", "")
    signature = request.headers.get("x-ok-signature", "")
    if not verify_signature(timestamp, body, signature, configured_secret()):
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/v1/pricing/suggest", response_model=PricingOut)
async def pricing_suggest(
    payload: PricingIn,
    _: None = Depends(require_hmac),
) -> PricingOut:
    return suggest_pricing(payload)


@app.post("/v1/recommendations/similar", response_model=SimilarOut)
async def recommendations_similar(
    payload: SimilarIn,
    _: None = Depends(require_hmac),
) -> SimilarOut:
    return similar_trips(payload)

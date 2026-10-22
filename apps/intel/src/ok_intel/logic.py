from __future__ import annotations

from pydantic import BaseModel, Field


class CatalogTrip(BaseModel):
    slug: str
    activity: str
    regions: list[str] = Field(default_factory=list)
    durationTypical: int = 12


class PricingIn(BaseModel):
    tripSlug: str | None = None
    activity: str | None = None
    durationDays: int = Field(ge=1, le=60)
    partySize: int = Field(ge=1, le=12)
    difficulty: str | None = None


class PricingOut(BaseModel):
    suggestedDepositPct: int
    landPackageHint: str
    confidence: float
    similarTripSlugs: list[str]
    staffOnly: bool = True


class SimilarIn(BaseModel):
    tripSlug: str | None = None
    regionSlugs: list[str] = Field(default_factory=list)
    activity: str | None = None
    durationDays: int | None = None
    catalog: list[CatalogTrip] = Field(default_factory=list)


class SimilarOut(BaseModel):
    slugs: list[str]


DIFFICULTY_WEIGHT = {
    "easy": 1,
    "moderate": 2,
    "challenging": 3,
    "strenuous": 4,
    "technical": 5,
}


def suggest_pricing(payload: PricingIn) -> PricingOut:
    weight = DIFFICULTY_WEIGHT.get((payload.difficulty or "moderate").lower(), 2)
    deposit = 30 if weight < 4 else 35
    hint = (
        f"Staff-only index for {payload.durationDays}d "
        f"{payload.activity or 'private'} x{payload.partySize} "
        f"(weight {weight}). Not a public price."
    )
    return PricingOut(
        suggestedDepositPct=deposit,
        landPackageHint=hint,
        confidence=0.55 if payload.tripSlug else 0.35,
        similarTripSlugs=[payload.tripSlug] if payload.tripSlug else [],
        staffOnly=True,
    )


def similar_trips(payload: SimilarIn) -> SimilarOut:
    scored: list[tuple[int, str]] = []
    for trip in payload.catalog:
        if trip.slug == payload.tripSlug:
            continue
        score = 0
        if payload.activity and trip.activity == payload.activity:
            score += 3
        score += len(set(trip.regions) & set(payload.regionSlugs))
        if payload.durationDays:
            delta = abs(trip.durationTypical - payload.durationDays)
            score += max(0, 3 - delta // 4)
        if score > 0:
            scored.append((score, trip.slug))
    scored.sort(key=lambda item: (-item[0], item[1]))
    return SimilarOut(slugs=[slug for _, slug in scored[:5]])

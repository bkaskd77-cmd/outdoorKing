from ok_intel.logic import (
    CatalogTrip,
    PricingIn,
    SimilarIn,
    similar_trips,
    suggest_pricing,
)


def test_pricing_hint_is_staff_only() -> None:
    out = suggest_pricing(
        PricingIn(
            tripSlug="everest-base-camp-trek",
            activity="trekking",
            durationDays=14,
            partySize=2,
            difficulty="challenging",
        )
    )
    assert out.staffOnly is True
    assert out.suggestedDepositPct == 30
    hint = out.landPackageHint.lower()
    assert "public price" in hint


def test_similar_trips_ranks_same_region() -> None:
    out = similar_trips(
        SimilarIn(
            tripSlug="everest-base-camp-trek",
            regionSlugs=["everest"],
            activity="trekking",
            durationDays=14,
            catalog=[
                CatalogTrip(
                    slug="everest-base-camp-trek",
                    activity="trekking",
                    regions=["everest"],
                    durationTypical=14,
                ),
                CatalogTrip(
                    slug="gokyo-lakes-trek",
                    activity="trekking",
                    regions=["everest"],
                    durationTypical=12,
                ),
                CatalogTrip(
                    slug="annapurna-circuit-trek",
                    activity="trekking",
                    regions=["annapurna"],
                    durationTypical=16,
                ),
            ],
        )
    )
    assert out.slugs[0] == "gokyo-lakes-trek"
    assert "everest-base-camp-trek" not in out.slugs

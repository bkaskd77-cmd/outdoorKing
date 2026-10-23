from ok_intel.planner import PlanDay, PlanIn, plan_itinerary, public_plan


def _day(
    number: int,
    title: str,
    from_place: str,
    to_place: str,
    sleep: int,
    day_type: str,
    high: int | None = None,
    start: int | None = None,
) -> PlanDay:
    return PlanDay(
        dayNumber=number,
        title=title,
        fromPlace=from_place,
        toPlace=to_place,
        startAltitudeM=start if start is not None else sleep,
        highPointM=high if high is not None else sleep,
        sleepAltitudeM=sleep,
        dayType=day_type,  # type: ignore[arg-type]
    )


def ebc_days() -> list[PlanDay]:
    """Sourced Everest Base Camp altitudes and places (catalog itinerary)."""
    return [
        _day(1, "Arrive Kathmandu", "Kathmandu", "Kathmandu", 1400, "city"),
        _day(
            2,
            "Kathmandu - Lukla - Phakding",
            "Kathmandu",
            "Phakding",
            2610,
            "flight",
            high=2860,
            start=1400,
        ),
        _day(
            3,
            "Phakding - Namche Bazaar",
            "Phakding",
            "Namche Bazaar",
            3440,
            "trek",
            start=2610,
        ),
        _day(
            4,
            "Acclimatisation day: Namche - Hotel Everest View - Namche",
            "Namche Bazaar",
            "Namche Bazaar",
            3440,
            "rest-acclimatization",
            high=3880,
        ),
        _day(
            5,
            "Namche - Tengboche",
            "Namche Bazaar",
            "Tengboche",
            3860,
            "trek",
            start=3440,
        ),
        _day(
            6, "Tengboche - Dingboche", "Tengboche", "Dingboche", 4410, "trek", start=3860
        ),
        _day(
            7,
            "Acclimatisation day: Dingboche - Nangkartshang - Dingboche",
            "Dingboche",
            "Dingboche",
            4410,
            "rest-acclimatization",
            high=5083,
        ),
        _day(8, "Dingboche - Lobuche", "Dingboche", "Lobuche", 4940, "trek", start=4410),
        _day(
            9,
            "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
            "Lobuche",
            "Gorak Shep",
            5164,
            "trek",
            high=5364,
            start=4940,
        ),
        _day(
            10,
            "Gorak Shep - Kala Patthar - Pheriche",
            "Gorak Shep",
            "Pheriche",
            4371,
            "trek",
            high=5545,
            start=5164,
        ),
        _day(
            11,
            "Pheriche - Namche Bazaar",
            "Pheriche",
            "Namche Bazaar",
            3440,
            "trek",
            start=4371,
        ),
        _day(
            12,
            "Namche Bazaar - Lukla",
            "Namche Bazaar",
            "Lukla",
            2860,
            "trek",
            start=3440,
        ),
        _day(13, "Lukla - Kathmandu", "Lukla", "Kathmandu", 1400, "flight", start=2860),
        _day(14, "Buffer day / departure", "Kathmandu", "Kathmandu", 1400, "contingency"),
    ]


def island_peak_days() -> list[PlanDay]:
    return [
        _day(1, "Arrive Kathmandu", "Kathmandu", "Kathmandu", 1400, "city"),
        _day(
            2,
            "Kathmandu - Lukla - Phakding",
            "Kathmandu",
            "Phakding",
            2610,
            "flight",
            high=2860,
            start=1400,
        ),
        _day(
            3,
            "Phakding - Namche Bazaar",
            "Phakding",
            "Namche Bazaar",
            3440,
            "trek",
            start=2610,
        ),
        _day(
            4,
            "Acclimatisation day: Hotel Everest View / Khumjung",
            "Namche Bazaar",
            "Namche Bazaar",
            3440,
            "rest-acclimatization",
            high=3880,
        ),
        _day(
            5,
            "Namche - Tengboche",
            "Namche Bazaar",
            "Tengboche",
            3860,
            "trek",
            start=3440,
        ),
        _day(
            6, "Tengboche - Dingboche", "Tengboche", "Dingboche", 4410, "trek", start=3860
        ),
        _day(
            7,
            "Acclimatisation day: Nangkartshang",
            "Dingboche",
            "Dingboche",
            4410,
            "rest-acclimatization",
            high=5083,
        ),
        _day(
            8, "Dingboche - Chhukung", "Dingboche", "Chhukung", 4730, "trek", start=4410
        ),
        _day(
            9,
            "Chhukung - Island Peak Base Camp",
            "Chhukung",
            "Island Peak Base Camp",
            5087,
            "trek",
            start=4730,
        ),
        _day(
            10,
            "Summit Island Peak - return to Chhukung",
            "Island Peak Base Camp",
            "Chhukung",
            4730,
            "summit",
            high=5800,
            start=5087,
        ),
        _day(
            11,
            "Reserve summit day (weather)",
            "Chhukung",
            "Chhukung",
            4730,
            "contingency",
        ),
        _day(
            12,
            "Chhukung - Namche Bazaar",
            "Chhukung",
            "Namche Bazaar",
            3440,
            "trek",
            start=4730,
        ),
        _day(
            13,
            "Namche Bazaar - Lukla",
            "Namche Bazaar",
            "Lukla",
            2860,
            "trek",
            start=3440,
        ),
        _day(14, "Lukla - Kathmandu", "Lukla", "Kathmandu", 1400, "flight", start=2860),
        _day(15, "Departure", "Kathmandu", "Kathmandu", 1400, "contingency"),
    ]


def _places_and_altitudes(days: list[PlanDay]) -> set[tuple[str, int, int, int]]:
    return {
        (day.toPlace, day.startAltitudeM, day.highPointM, day.sleepAltitudeM)
        for day in days
    }


def test_ebc_fast_keeps_required_rest_and_names_blocking_rule() -> None:
    catalog = ebc_days()
    out = plan_itinerary(
        PlanIn(
            days=catalog,
            month=10,
            pace="fast",
            maxPriorAltitudeM=4000,
            usesLukla=True,
            seasons=["spring", "autumn"],
        )
    )
    rests = [day for day in out.days if day.dayType == "rest-acclimatization"]
    assert rests, "fast pace must keep a required rest"
    assert any(day.toPlace == "Namche Bazaar" for day in rests)
    blocking = [reason for reason in out.reasons if reason.id in {"ALT-001", "ALT-002"}]
    assert blocking, "fast pace must name the rule that blocked a shorter plan"
    assert blocking[0].id == "ALT-002"
    blob = " ".join(reason.message for reason in out.reasons)
    assert "ALT-002" not in blob
    assert "required rest" in blocking[0].message.lower()
    sourced = _places_and_altitudes(catalog)
    for day in out.days:
        assert (day.toPlace, day.sleepAltitudeM) in {
            (item.toPlace, item.sleepAltitudeM) for item in catalog
        }
        assert day.sleepAltitudeM in {item.sleepAltitudeM for item in catalog}
        assert day.highPointM in {item.highPointM for item in catalog} | {
            item.sleepAltitudeM for item in catalog
        }
    del sourced


def test_ebc_novice_has_rest_before_4000() -> None:
    out = plan_itinerary(
        PlanIn(
            days=ebc_days(),
            month=4,
            pace="steady",
            maxPriorAltitudeM=3200,
            usesLukla=True,
            seasons=["spring", "autumn"],
        )
    )
    first_high = next(day for day in out.days if day.sleepAltitudeM >= 4000)
    rest_before = [
        day
        for day in out.days
        if day.dayNumber < first_high.dayNumber
        and day.dayType == "rest-acclimatization"
        and day.sleepAltitudeM < 4000
    ]
    assert rest_before
    assert rest_before[0].toPlace == "Namche Bazaar"
    assert rest_before[0].sleepAltitudeM == 3440
    assert any(reason.id == "ALT-006" for reason in out.reasons)


def test_ebc_novice_inserts_rest_when_catalog_omits_it() -> None:
    stripped = [day for day in ebc_days() if day.dayType != "rest-acclimatization"]
    out = plan_itinerary(
        PlanIn(
            days=stripped,
            month=4,
            pace="steady",
            maxPriorAltitudeM=3000,
            usesLukla=True,
            seasons=["spring", "autumn"],
        )
    )
    first_high = next(day for day in out.days if day.sleepAltitudeM >= 4000)
    rest_before = [
        day
        for day in out.days
        if day.dayNumber < first_high.dayNumber
        and day.dayType == "rest-acclimatization"
        and day.sleepAltitudeM < 4000
    ]
    assert rest_before
    source_places = {day.toPlace for day in stripped}
    assert rest_before[0].toPlace in source_places
    assert rest_before[0].sleepAltitudeM in {day.sleepAltitudeM for day in stripped}


def test_month_outside_seasons_names_mismatch_and_trip_seasons() -> None:
    out = plan_itinerary(
        PlanIn(
            days=ebc_days(),
            month=7,
            pace="steady",
            usesLukla=True,
            seasons=["spring", "autumn"],
        )
    )
    assert out.seasonFit.fit == "poor"
    assert out.seasonFit.season == "monsoon"
    blob = f"{out.seasonFit.message} " + " ".join(
        reason.message for reason in out.reasons
    )
    assert "monsoon" in blob
    assert "spring" in blob
    assert "autumn" in blob
    assert "July" in blob


def test_island_peak_summit_keeps_later_reserve() -> None:
    out = plan_itinerary(
        PlanIn(
            days=island_peak_days(),
            month=10,
            pace="fast",
            usesLukla=True,
            seasons=["spring", "autumn"],
        )
    )
    summit = next(day for day in out.days if day.dayType == "summit")
    reserve = [
        day
        for day in out.days
        if day.dayType == "contingency" and day.dayNumber > summit.dayNumber
    ]
    assert reserve
    assert any(reason.id == "ALT-007" for reason in out.reasons)
    catalog_sleeps = {day.sleepAltitudeM for day in island_peak_days()}
    assert summit.sleepAltitudeM in catalog_sleeps
    assert reserve[0].sleepAltitudeM in catalog_sleeps
    assert reserve[0].toPlace in {day.toPlace for day in island_peak_days()}


def test_plan_output_has_no_price_fields() -> None:
    out = plan_itinerary(
        PlanIn(
            days=ebc_days(),
            month=4,
            pace="relaxed",
            usesLukla=True,
            seasons=["spring", "autumn"],
        )
    )
    payload = public_plan(out)
    blob = str(payload).lower()
    for token in ("price", "deposit", "currency", "usd", "npr", "amount"):
        assert token not in blob
    assert "suggestedDepositPct" not in payload
    extra = next(day for day in out.days if "Extra acclimatisation" in day.title)
    assert extra.sleepAltitudeM < 4000
    assert extra.toPlace in {day.toPlace for day in ebc_days()}

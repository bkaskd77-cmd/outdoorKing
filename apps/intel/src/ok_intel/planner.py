"""Deterministic private itinerary planner.

No prices. Never invents places or altitudes.
"""

from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

DayType = Literal[
    "trek",
    "rest-acclimatization",
    "summit",
    "travel",
    "flight",
    "contingency",
    "city",
]
Pace = Literal["relaxed", "steady", "fast"]
Season = Literal["winter", "spring", "monsoon", "autumn"]

PRICE_KEY_TOKENS = ("price", "deposit", "currency", "amount")

MAX_SLEEP_GAIN_ABOVE_3000_M = 550
REST_EVERY_DAYS = 4
REST_EVERY_SLEEP_GAIN_M = 1000
NOVICE_ALTITUDE_M = 3500

SEASON_SPANS: dict[str, str] = {
    "winter": "Dec–Feb",
    "spring": "Mar–May",
    "monsoon": "Jun–Aug",
    "autumn": "Sep–Nov",
}


class PlanDay(BaseModel):
    model_config = ConfigDict(extra="ignore")

    dayNumber: int = Field(ge=1, le=60)
    title: str
    fromPlace: str = ""
    toPlace: str = ""
    startAltitudeM: int = Field(ge=0, le=9000)
    highPointM: int = Field(ge=0, le=9000)
    sleepAltitudeM: int = Field(ge=0, le=9000)
    dayType: DayType


class PlanReason(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    message: str


class SeasonFit(BaseModel):
    model_config = ConfigDict(extra="forbid")

    month: int | None = None
    season: str | None = None
    tripSeasons: list[str]
    fit: Literal["good", "poor", "unknown"]
    message: str


class PlanIn(BaseModel):
    model_config = ConfigDict(extra="ignore")

    days: list[PlanDay] = Field(min_length=1, max_length=60)
    month: int | None = Field(default=None, ge=1, le=12)
    pace: Pace = "steady"
    maxPriorAltitudeM: int | None = Field(default=None, ge=0, le=9000)
    usesLukla: bool = False
    seasons: list[str] = Field(default_factory=list)


class PlanOut(BaseModel):
    model_config = ConfigDict(extra="forbid")

    days: list[PlanDay]
    seasonFit: SeasonFit
    reasons: list[PlanReason]


class Finding(BaseModel):
    id: str
    severity: Literal["error", "warn", "info"]
    message: str
    dayNumber: int | None = None


def season_for_month(month: int) -> Season:
    if month in (12, 1, 2):
        return "winter"
    if month in (3, 4, 5):
        return "spring"
    if month in (6, 7, 8):
        return "monsoon"
    return "autumn"


def month_name(month: int) -> str:
    names = (
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    )
    return names[month - 1]


def season_label(season: str) -> str:
    span = SEASON_SPANS.get(season)
    return f"{season} ({span})" if span else season


def strip_price_fields(value: object) -> object:
    if isinstance(value, dict):
        cleaned: dict[str, object] = {}
        for key, item in value.items():
            lowered = key.lower()
            if any(token in lowered for token in PRICE_KEY_TOKENS):
                continue
            cleaned[key] = strip_price_fields(item)
        return cleaned
    if isinstance(value, list):
        return [strip_price_fields(item) for item in value]
    return value


def public_plan(out: PlanOut) -> dict[str, object]:
    payload = strip_price_fields(out.model_dump(mode="json"))
    assert isinstance(payload, dict)
    return payload


def clone_day(day: PlanDay) -> PlanDay:
    return day.model_copy(deep=True)


def renumber(days: list[PlanDay]) -> list[PlanDay]:
    out: list[PlanDay] = []
    for index, day in enumerate(days):
        copied = clone_day(day)
        copied.dayNumber = index + 1
        out.append(copied)
    return out


def stay_from(source: PlanDay, *, title: str, day_type: DayType) -> PlanDay:
    """Copy an existing place and its altitudes. Never invent a new altitude."""
    place = source.toPlace or source.fromPlace
    return PlanDay(
        dayNumber=1,
        title=title,
        fromPlace=place,
        toPlace=place,
        startAltitudeM=source.sleepAltitudeM,
        highPointM=source.highPointM,
        sleepAltitudeM=source.sleepAltitudeM,
        dayType=day_type,
    )


def insert_after(days: list[PlanDay], after_index: int, extra: PlanDay) -> list[PlanDay]:
    next_days = [clone_day(day) for day in days]
    at = after_index + 1
    if at < 0:
        at = 0
    if at > len(next_days):
        at = len(next_days)
    next_days.insert(at, extra)
    return renumber(next_days)


def evaluate_days(
    days: list[PlanDay],
    *,
    uses_lukla: bool,
    prior_altitude_m: int | None,
) -> list[Finding]:
    ordered = sorted(days, key=lambda day: day.dayNumber)
    findings: list[Finding] = []
    if not ordered:
        findings.append(
            Finding(id="LOG-002", severity="error", message="Itinerary has no days.")
        )
        return findings

    days_since_rest = 0
    sleep_gain_above_3000 = 0

    for index, day in enumerate(ordered):
        prev = ordered[index - 1] if index > 0 else None

        if day.dayType == "rest-acclimatization":
            days_since_rest = 0
        elif day.sleepAltitudeM >= 3000:
            if prev and day.sleepAltitudeM + 200 < prev.sleepAltitudeM:
                days_since_rest = 0
            else:
                days_since_rest += 1
        else:
            days_since_rest = 0

        if (
            prev
            and prev.sleepAltitudeM >= 3000
            and day.sleepAltitudeM > prev.sleepAltitudeM
        ):
            gain = day.sleepAltitudeM - prev.sleepAltitudeM
            sleep_gain_above_3000 += gain
            if gain > MAX_SLEEP_GAIN_ABOVE_3000_M:
                findings.append(
                    Finding(
                        id="ALT-001",
                        severity="error",
                        message=(
                            f"Sleeping altitude rises {gain} m "
                            f"(over {MAX_SLEEP_GAIN_ABOVE_3000_M} m) from day "
                            f"{prev.dayNumber} to {day.dayNumber}."
                        ),
                        dayNumber=day.dayNumber,
                    )
                )

        if days_since_rest > REST_EVERY_DAYS and day.sleepAltitudeM >= 3000:
            findings.append(
                Finding(
                    id="ALT-002",
                    severity="error",
                    message=(
                        f"No rest/acclimatization day in {days_since_rest} days "
                        f"above 3,000 m (day {day.dayNumber})."
                    ),
                    dayNumber=day.dayNumber,
                )
            )
        if sleep_gain_above_3000 >= REST_EVERY_SLEEP_GAIN_M:
            start = max(0, index - REST_EVERY_DAYS)
            recent_rest = any(
                item.dayType == "rest-acclimatization"
                for item in ordered[start : index + 1]
            )
            if not recent_rest:
                findings.append(
                    Finding(
                        id="ALT-002",
                        severity="error",
                        message=(
                            f"About {sleep_gain_above_3000} m of sleep gain above "
                            "3,000 m without a rest day."
                        ),
                        dayNumber=day.dayNumber,
                    )
                )
            sleep_gain_above_3000 = 0

        if day.dayType == "summit":
            has_reserve = any(
                item.dayType == "contingency" and item.dayNumber > day.dayNumber
                for item in ordered
            )
            if not has_reserve:
                findings.append(
                    Finding(
                        id="ALT-007",
                        severity="error",
                        message="Summit day requires a later reserve/contingency day.",
                        dayNumber=day.dayNumber,
                    )
                )

        if prev and prev.toPlace and day.fromPlace and prev.toPlace != day.fromPlace:
            findings.append(
                Finding(
                    id="LOG-003",
                    severity="error",
                    message=(
                        f"Place continuity break: day {prev.dayNumber} ends at "
                        f"{prev.toPlace}, day {day.dayNumber} starts at {day.fromPlace}."
                    ),
                    dayNumber=day.dayNumber,
                )
            )

    if prior_altitude_m is not None and prior_altitude_m < NOVICE_ALTITUDE_M:
        before_4000 = next((day for day in ordered if day.sleepAltitudeM >= 4000), None)
        rest_before = any(
            day.dayType == "rest-acclimatization" and day.sleepAltitudeM < 4000
            for day in ordered
        )
        if before_4000 and not rest_before:
            findings.append(
                Finding(
                    id="ALT-006",
                    severity="warn",
                    message=(
                        "Party has no prior altitude above 3,500 m; "
                        "add an extra rest day before 4,000 m."
                    ),
                    dayNumber=before_4000.dayNumber,
                )
            )

    if uses_lukla and not any(day.dayType == "contingency" for day in ordered):
        findings.append(
            Finding(
                id="LOG-001",
                severity="error",
                message=(
                    "Lukla/Ramechhap itineraries need at least one contingency "
                    "day before international departure."
                ),
            )
        )

    return findings


def errors_of(
    days: list[PlanDay],
    *,
    uses_lukla: bool,
    prior_altitude_m: int | None,
) -> list[Finding]:
    return [
        item
        for item in evaluate_days(
            days, uses_lukla=uses_lukla, prior_altitude_m=prior_altitude_m
        )
        if item.severity == "error"
    ]


def season_fit(month: int | None, trip_seasons: list[str]) -> SeasonFit:
    if month is None:
        return SeasonFit(
            month=None,
            season=None,
            tripSeasons=trip_seasons,
            fit="unknown",
            message="No travel month was given, so season fit is not scored.",
        )
    season = season_for_month(month)
    named = (
        ", ".join(season_label(item) for item in trip_seasons)
        or "the trip's listed seasons"
    )
    if trip_seasons and season in trip_seasons:
        return SeasonFit(
            month=month,
            season=season,
            tripSeasons=trip_seasons,
            fit="good",
            message=(
                f"{month_name(month)} is {season_label(season)}, which fits this trip "
                f"({named})."
            ),
        )
    return SeasonFit(
        month=month,
        season=season,
        tripSeasons=trip_seasons,
        fit="poor",
        message=(
            f"{month_name(month)} is {season_label(season)}, which sits outside this "
            f"trip's seasons: {named}."
        ),
    )


def extra_rest_below_4000(days: list[PlanDay]) -> list[PlanDay]:
    first_high = next(
        (index for index, day in enumerate(days) if day.sleepAltitudeM >= 4000),
        None,
    )
    search = days[:first_high] if first_high is not None else days
    rest_source = next(
        (
            (index, day)
            for index, day in enumerate(search)
            if day.dayType == "rest-acclimatization" and day.sleepAltitudeM < 4000
        ),
        None,
    )
    if rest_source is None:
        below = [
            (index, day) for index, day in enumerate(search) if day.sleepAltitudeM < 4000
        ]
        rest_source = below[-1] if below else None
    if rest_source is None:
        return days
    index, source = rest_source
    place = source.toPlace or source.fromPlace or source.title
    extra = stay_from(
        source,
        title=f"Extra acclimatisation at {place}",
        day_type="rest-acclimatization",
    )
    return insert_after(days, index, extra)


def apply_fast(
    days: list[PlanDay],
    *,
    uses_lukla: bool,
    prior_altitude_m: int | None,
) -> tuple[list[PlanDay], Finding | None]:
    current = renumber(days)
    blocked: Finding | None = None
    progressed = True
    while progressed:
        progressed = False
        rest_indices = [
            index
            for index, day in enumerate(current)
            if day.dayType == "rest-acclimatization"
        ]
        for index in reversed(rest_indices):
            candidate = renumber([day for i, day in enumerate(current) if i != index])
            faults = errors_of(
                candidate, uses_lukla=uses_lukla, prior_altitude_m=prior_altitude_m
            )
            if faults:
                blocked = faults[0]
                continue
            current = candidate
            progressed = True
            break
    return current, blocked


def ensure_novice_rest(
    days: list[PlanDay], prior_altitude_m: int | None
) -> list[PlanDay]:
    if prior_altitude_m is None or prior_altitude_m >= NOVICE_ALTITUDE_M:
        return days
    first_high = next(
        (index for index, day in enumerate(days) if day.sleepAltitudeM >= 4000),
        None,
    )
    if first_high is None:
        return days
    rest_before = any(
        day.dayType == "rest-acclimatization" and day.sleepAltitudeM < 4000
        for day in days[:first_high]
    )
    if rest_before:
        return days
    source = days[first_high - 1] if first_high > 0 else days[0]
    if source.sleepAltitudeM >= 4000:
        below = [day for day in days[:first_high] if day.sleepAltitudeM < 4000]
        if not below:
            return days
        source = below[-1]
    place = source.toPlace or source.fromPlace or source.title
    extra = stay_from(
        source,
        title=f"Acclimatisation at {place}",
        day_type="rest-acclimatization",
    )
    return insert_after(
        days, days.index(source) if source in days else first_high - 1, extra
    )


def ensure_lukla_contingency(days: list[PlanDay], uses_lukla: bool) -> list[PlanDay]:
    if not uses_lukla:
        return days
    if any(day.dayType == "contingency" for day in days):
        return days
    last = days[-1]
    extra = stay_from(
        last,
        title="Contingency / buffer day",
        day_type="contingency",
    )
    return insert_after(days, len(days) - 1, extra)


def ensure_summit_reserve(days: list[PlanDay]) -> list[PlanDay]:
    current = list(days)
    index = 0
    while index < len(current):
        day = current[index]
        if day.dayType == "summit":
            has_reserve = any(
                item.dayType == "contingency" and item.dayNumber > day.dayNumber
                for item in current
            )
            if not has_reserve:
                extra = stay_from(
                    day,
                    title="Reserve summit day",
                    day_type="contingency",
                )
                current = insert_after(current, index, extra)
        index += 1
    return current


def plan_itinerary(payload: PlanIn) -> PlanOut:
    days = renumber([clone_day(day) for day in payload.days])
    reasons: list[PlanReason] = []
    fit = season_fit(payload.month, payload.seasons)
    reasons.append(PlanReason(id="SEASON", message=fit.message))

    if payload.pace == "relaxed":
        before = len(days)
        days = extra_rest_below_4000(days)
        if len(days) > before:
            added = next(
                day
                for day in days
                if day.dayType == "rest-acclimatization"
                and "Extra acclimatisation" in day.title
            )
            reasons.append(
                PlanReason(
                    id="PACE",
                    message=(
                        f"Relaxed pace adds an extra acclimatisation day at "
                        f"{added.toPlace}, copied from an existing sleep below 4,000 m."
                    ),
                )
            )
        else:
            reasons.append(
                PlanReason(
                    id="PACE",
                    message=(
                        "Relaxed pace keeps the catalog days; "
                        "no sleep below 4,000 m to copy."
                    ),
                )
            )
    elif payload.pace == "fast":
        shortened, blocked = apply_fast(
            days,
            uses_lukla=payload.usesLukla,
            prior_altitude_m=payload.maxPriorAltitudeM,
        )
        days = shortened
        if blocked:
            reasons.append(
                PlanReason(
                    id=blocked.id,
                    message=(
                        f"Fast pace keeps the required rest. A shorter plan was blocked "
                        f"by {blocked.id}: {blocked.message}"
                    ),
                )
            )
        else:
            reasons.append(
                PlanReason(
                    id="PACE",
                    message=(
                        "Fast pace dropped rest days the safety rules do not require."
                    ),
                )
            )
    else:
        reasons.append(
            PlanReason(
                id="PACE",
                message=(
                    "Steady pace keeps the catalog days, including sourced rest "
                    "and contingency."
                ),
            )
        )

    before_novice = [
        (day.toPlace, day.sleepAltitudeM)
        for day in days
        if day.dayType == "rest-acclimatization" and day.sleepAltitudeM < 4000
    ]
    days = ensure_novice_rest(days, payload.maxPriorAltitudeM)
    after_novice = [
        day
        for day in days
        if day.dayType == "rest-acclimatization" and day.sleepAltitudeM < 4000
    ]
    if (
        payload.maxPriorAltitudeM is not None
        and payload.maxPriorAltitudeM < NOVICE_ALTITUDE_M
        and after_novice
    ):
        rest = after_novice[0]
        inserted = (rest.toPlace, rest.sleepAltitudeM) not in before_novice
        reasons.append(
            PlanReason(
                id="ALT-006",
                message=(
                    f"A rest day at {rest.toPlace} sits before 4,000 m because prior "
                    "sleep altitude is under 3,500 m"
                    + ("." if not inserted else " (copied from an existing place).")
                ),
            )
        )

    days = ensure_summit_reserve(days)
    if any(day.dayType == "summit" for day in days):
        reasons.append(
            PlanReason(
                id="ALT-007",
                message=(
                    "Summit day keeps a later reserve/contingency day on the itinerary."
                ),
            )
        )

    days = ensure_lukla_contingency(days, payload.usesLukla)
    if payload.usesLukla:
        reasons.append(
            PlanReason(
                id="LOG-001",
                message=(
                    "Lukla itineraries keep a contingency day before international "
                    "departure."
                ),
            )
        )

    return PlanOut(days=renumber(days), seasonFit=fit, reasons=reasons)

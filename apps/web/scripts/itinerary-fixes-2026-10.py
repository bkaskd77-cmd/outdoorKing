"""One-off corrections to content/facts itineraries (October 2026).

Records every day high point that was missing (summits, passes, viewpoints) and adds
acclimatisation days or intermediate nights where a route climbed too fast for the
altitude rules. Run from apps/web: python3 scripts/itinerary-fixes-2026-10.py
"""

import json
import re
from pathlib import Path

FACTS = Path("content/facts")

# Day -> highest point reached that day (m), where the summit or viewpoint is above
# the night's altitude and the trip's stated maximum was never recorded on a day.
HIGH_POINTS = {
    "ama-dablam-expedition": {"17-22": 6812},
    "annapurna-i-expedition": {"30-37": 8091},
    "bhutan-add-on-tour": {"2": 3100, "4": 3120},
    "dhaulagiri-expedition": {"28-34": 8167},
    "everest-expedition-south-col": {"34-45": 8849},
    "everest-base-camp-trek": {"10": 5545},
    "everest-helicopter-tour": {"1": 5545},
    "everest-three-passes-trek": {"11": 5545},
    "everest-view-trek": {"3": 3880},
    "gokyo-cho-la-everest-base-camp-trek": {"13": 5545},
    "himlung-himal-expedition": {"11-22": 7126},
    "island-peak-climbing": {"15": 6165},
    "kanchenjunga-expedition": {"36-45": 8586},
    "langtang-gosainkunda-trek": {"5": 4984},
    "lhotse-expedition": {"40-53": 8516},
    "lobuche-east-peak-climbing": {"13": 6119},
    "makalu-expedition": {"31-42": 8485},
    "manaslu-circuit-trek": {"10": 5106},
    "manaslu-expedition": {"22-32": 8163},
    "mardi-himal-trek": {"4": 4500},
    "mera-peak-climbing": {"11": 6470},
    "nepal-cultural-heritage-tour": {"4": 2175},
    "pokhara-lakeside-tour": {"1": 1592},
    "pokhara-paragliding": {"1": 1592},
    "tamang-heritage-trail": {"4": 3165},
    "tharpu-chuli-tent-peak-climbing": {"13": 5695},
    "tibet-add-on-tour": {"4": 4441},
    "yala-peak-climbing": {"7": 5732},
}

# Overnight altitudes that were blank.
OVERNIGHTS = {
    "bhutan-add-on-tour": {"1": 2320, "2": 1240, "3": 2200, "4": 2200, "5": 1400},
}

DAY_TYPES = {
    "yala-peak-climbing": {"8": "contingency"},
}

TRIP_FIELDS = {
    # A same-day helicopter flight, not a Lukla flight that strands trekkers.
    "everest-helicopter-tour": {"uses_lukla": False},
    "tibet-add-on-tour": {
        "max_altitude_m": 4441,
        "max_altitude_point": "Yamdrok Lake (day trip); nights in Lhasa at 3,656 m",
    },
}


def rest(where: str, hike: str, altitude: int, high: int, notes: str) -> dict:
    return {
        "route": f"Acclimatisation day at {where}: {hike}",
        "overnight": where,
        "overnight_altitude_m": altitude,
        "walking_hours": "3-4",
        "notes": notes,
        "high_point_m": high,
        "day_type": "rest-acclimatization",
    }


# (slug, day to act on, "after" inserts new days after it / "replace" swaps it out)
CHANGES = [
    (
        "annapurna-base-camp-trek",
        "7",
        "replace",
        [
            {
                "route": "Deurali - Machhapuchhre Base Camp",
                "overnight": "Machhapuchhre Base Camp",
                "overnight_altitude_m": 3700,
                "walking_hours": "2-3",
                "notes": "A short day into the Annapurna Sanctuary that eases the climb to "
                "Base Camp. The route crosses avalanche paths below MBC. [s4][s7]",
            },
            {
                "route": "Machhapuchhre Base Camp - Annapurna Base Camp",
                "overnight": "Annapurna Base Camp",
                "overnight_altitude_m": 4130,
                "walking_hours": "2-3",
                "notes": "Sunset on Annapurna I and the walls of the Sanctuary.",
            },
        ],
    ),
    (
        "kanchenjunga-base-camp-trek",
        "11",
        "replace",
        [
            {
                "route": "Khambachen - Ramtang",
                "overnight": "Ramtang",
                "overnight_altitude_m": 4370,
                "walking_hours": "3-4",
                "notes": "A shorter day past Ramtang monastery that eases the climb to Lhonak.",
            },
            {
                "route": "Ramtang - Lhonak",
                "overnight": "Lhonak",
                "overnight_altitude_m": 4780,
                "walking_hours": "3-4",
                "notes": "Highest overnight.",
            },
        ],
    ),
    (
        "makalu-base-camp-trek",
        "7",
        "after",
        [
            rest(
                "Yangle Kharka",
                "hike up the Barun valley and return",
                3600,
                4000,
                "Climb high, sleep low before the next night at Langmale Kharka.",
            )
        ],
    ),
    (
        "manaslu-circuit-trek",
        "8",
        "after",
        [
            rest(
                "Samdo",
                "hike up toward the Tibet border trail and return",
                3860,
                4500,
                "Climb high, sleep low before Dharamsala and the Larkya La.",
            )
        ],
    ),
    (
        "upper-dolpo-trek",
        "4",
        "after",
        [
            rest(
                "Rechi",
                "short hike above the village and return",
                3080,
                3400,
                "An easy day before the climb to Phoksundo Lake.",
            )
        ],
    ),
    (
        "upper-dolpo-trek",
        "7",
        "after",
        [
            rest(
                "Phoksundo Khola camp",
                "hike up the valley toward Kang La and return",
                3650,
                4100,
                "Climb high, sleep low before the camp below Kang La.",
            )
        ],
    ),
    (
        "upper-mustang-trek",
        "4",
        "after",
        [
            rest(
                "Chele",
                "hike above the village toward Taklam La and return",
                3050,
                3500,
                "Climb high, sleep low before the long climb to Syangboche.",
            )
        ],
    ),
    (
        "mera-peak-climbing",
        "6",
        "after",
        [
            rest(
                "Kothe",
                "hike up the Hinku valley and return",
                3600,
                4000,
                "Climb high, sleep low before Thangnak.",
            )
        ],
    ),
    (
        "mera-peak-climbing",
        "7",
        "after",
        [
            rest(
                "Thangnak",
                "hike above the village toward the Charpate glacier and return",
                4350,
                4700,
                "Climb high, sleep low before Khare.",
            )
        ],
    ),
    (
        "tibet-add-on-tour",
        "1",
        "before",
        [
            {
                "route": "Kathmandu: Tibet group visa formalities and briefing",
                "overnight": "Kathmandu",
                "overnight_altitude_m": 1400,
                "walking_hours": None,
                "notes": "Tibet group visas are arranged in Kathmandu before the flight to Lhasa.",
            }
        ],
    ),
    (
        "everest-view-trek",
        "7",
        "after",
        [
            {
                "route": "Spare day in Kathmandu for Lukla flight delays; departure",
                "overnight": "Kathmandu",
                "overnight_altitude_m": 1400,
                "walking_hours": None,
                "notes": "Lukla flights are weather-dependent; keep this day free before "
                "an international flight.",
                "day_type": "contingency",
            }
        ],
    ),
]

METERS = re.compile(r"(\d{1,2}[,\s]?\d{3})\s*m\b", re.I)


def load(slug: str) -> dict:
    return json.loads((FACTS / f"{slug}.json").read_text())


def save(slug: str, data: dict) -> None:
    (FACTS / f"{slug}.json").write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")


def renumber(days: list) -> None:
    for index, day in enumerate(days, start=1):
        day["day"] = index


def apply_change(data: dict, day: str, mode: str, new_days: list) -> int:
    days = data["itinerary"]
    if any(not isinstance(d["day"], int) for d in days):
        raise ValueError(f"{data['slug']} uses day blocks; renumbering is not supported")
    index = next(i for i, d in enumerate(days) if str(d["day"]) == day)
    added = [dict(d, day=0) for d in new_days]
    if mode == "replace":
        days[index : index + 1] = added
        extra = len(added) - 1
    elif mode == "after":
        days[index + 1 : index + 1] = added
        extra = len(added)
    else:
        days[index:index] = added
        extra = len(added)
    renumber(days)
    return extra


def main() -> None:
    touched: dict[str, dict] = {}

    def get(slug: str) -> dict:
        if slug not in touched:
            touched[slug] = load(slug)
        return touched[slug]

    for slug, highs in HIGH_POINTS.items():
        for day in get(slug)["itinerary"]:
            if str(day["day"]) in highs:
                day["high_point_m"] = highs[str(day["day"])]
    for slug, nights in OVERNIGHTS.items():
        for day in get(slug)["itinerary"]:
            if str(day["day"]) in nights:
                day["overnight_altitude_m"] = nights[str(day["day"])]
    for slug, types in DAY_TYPES.items():
        for day in get(slug)["itinerary"]:
            if str(day["day"]) in types:
                day["day_type"] = types[str(day["day"])]
    for slug, fields in TRIP_FIELDS.items():
        get(slug).update(fields)

    # Apply later days first so earlier day numbers stay valid.
    extra_days: dict[str, int] = {}
    for slug, day, mode, new_days in sorted(
        CHANGES, key=lambda c: (c[0], -int(c[1]))
    ):
        extra_days[slug] = extra_days.get(slug, 0) + apply_change(get(slug), day, mode, new_days)
    for slug, extra in extra_days.items():
        duration = get(slug)["duration_days"]
        duration["typical"] += extra
        duration["min"] = min(duration["min"], duration["typical"])
        duration["max"] = max(duration["max"], duration["typical"])

    # A number quoted in the notes (a distant peak, a range) is not a high point
    # when it is above the trip's own maximum.
    for path in sorted(FACTS.glob("*.json")):
        slug = path.stem
        data = get(slug)
        ceiling = data.get("max_altitude_m") or 0
        prev = 0
        for day in data.get("itinerary") or []:
            sleep = day.get("overnight_altitude_m") or prev
            if "high_point_m" not in day:
                quoted = METERS.search(f"{day['route']} {day.get('notes') or ''}")
                value = int(re.sub(r"[,\s]", "", quoted.group(1))) if quoted else 0
                if ceiling and value > ceiling:
                    day["high_point_m"] = max(sleep, prev)
            prev = sleep

    for slug, data in touched.items():
        if json.dumps(data, sort_keys=True) != json.dumps(load(slug), sort_keys=True):
            save(slug, data)
            print("updated", slug)


main()

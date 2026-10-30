// Generated: trip copy clean-up (October 2026). Do not edit by hand: "before" is the
// CMS content after the itinerary fixes, "after" is the cleaned catalog copy.
import type { TripSync } from "../lib/sync-trips";

export const tripCopyCleanup: TripSync[] = [
 {
  "slug": "ama-dablam-expedition",
  "before": {
   "fields": {
    "subtitle": "25 days typical · max 6812 m (Ama Dablam summit (DoT royalty table 6,812 m; Himalayan Database 6,814 m))",
    "maxAltitudePoint": "Ama Dablam summit (DoT royalty table 6,812 m; Himalayan Database 6,814 m)",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu: expedition briefing and permits",
     1400,
     1400,
     "city"
    ],
    [
     3,
     null,
     "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     2610,
     2610,
     "flight"
    ],
    [
     4,
     null,
     "Phakding - Namche Bazaar",
     3440,
     3440,
     "trek"
    ],
    [
     5,
     null,
     "Acclimatisation: Hotel Everest View / Khumjung",
     3440,
     3440,
     "rest-acclimatization"
    ],
    [
     6,
     null,
     "Namche - Tengboche / Deboche",
     3860,
     3860,
     "trek"
    ],
    [
     7,
     null,
     "Tengboche - Pangboche",
     3930,
     3930,
     "trek"
    ],
    [
     8,
     null,
     "Pangboche - Ama Dablam Base Camp",
     4600,
     4600,
     "trek"
    ],
    [
     9,
     "9-12",
     "Skills, puja, and rotation: Yak Camp / ABC (about 5,200 m) - touch Camp 1 (about 5,700 m) - return to Base Camp",
     4600,
     5200,
     "trek"
    ],
    [
     13,
     "13-16",
     "Second rotation: sleep Camp 1; touch Camp 2 (about 5,900-6,100 m, above the Yellow Tower) - return to Base Camp",
     4600,
     6100,
     "trek"
    ],
    [
     17,
     "17-22",
     "Rest, then summit window: Base Camp - Camp 1 - Camp 2 - Camp 3 (about 6,200-6,400 m, often not slept) - summit 6,812 m - descend",
     4600,
     6812,
     "contingency"
    ],
    [
     23,
     "23-24",
     "Base Camp - Pangboche - Namche - Lukla",
     2860,
     4600,
     "trek"
    ],
    [
     25,
     null,
     "Lukla - Kathmandu; departure buffer",
     1400,
     2860,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "The Matterhorn of the Himalaya, climbed by its Southwest Ridge",
    "maxAltitudePoint": "Ama Dablam summit",
    "inclusions": [
     "An experienced expedition leader and climbing Sherpa support as agreed in your plan",
     "The expedition permit and government fees",
     "Base camp tents, kitchen and cook team",
     "High-camp tents and fixed-rope fees",
     "Transport and domestic flights shown in the itinerary"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue and mountaineering cover",
     "Personal climbing equipment",
     "Summit bonus and tips for climbing Sherpas and staff"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "DoT briefing/permit, gear check.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu: expedition briefing and permits",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Phakding",
     "startAltitudeM": 1400,
     "highPointM": 2610,
     "sleepAltitudeM": 2610,
     "walkingHours": "3-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Phakding - Namche Bazaar",
     "description": "",
     "fromPlace": "Phakding",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 2610,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Acclimatisation: Hotel Everest View / Khumjung",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Namche - Tengboche / Deboche",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Tengboche or Deboche",
     "startAltitudeM": 3440,
     "highPointM": 3860,
     "sleepAltitudeM": 3860,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Tengboche - Pangboche",
     "description": "Leave the EBC trail the next day.",
     "fromPlace": "Tengboche or Deboche",
     "toPlace": "Pangboche",
     "startAltitudeM": 3860,
     "highPointM": 3930,
     "sleepAltitudeM": 3930,
     "walkingHours": "2-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Pangboche - Ama Dablam Base Camp",
     "description": "Puja.",
     "fromPlace": "Pangboche",
     "toPlace": "Base Camp",
     "startAltitudeM": 3930,
     "highPointM": 4600,
     "sleepAltitudeM": 4600,
     "walkingHours": "3-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": "9-12",
     "title": "Skills, puja, and rotation: Yak Camp / ABC (about 5,200 m) - touch Camp 1 (about 5,700 m) - return to Base Camp",
     "description": "Fixed-line practice. Camp altitudes vary by year.",
     "fromPlace": "Base Camp",
     "toPlace": "Base Camp / Yak Camp",
     "startAltitudeM": 4600,
     "highPointM": 5200,
     "sleepAltitudeM": 4600,
     "walkingHours": "4-6 on rotation days",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": "13-16",
     "title": "Second rotation: sleep Camp 1; touch Camp 2 (about 5,900-6,100 m, above the Yellow Tower) - return to Base Camp",
     "description": "Yellow Tower is the technical crux.",
     "fromPlace": "Base Camp / Yak Camp",
     "toPlace": "Camp 1 / Base Camp",
     "startAltitudeM": 4600,
     "highPointM": 6100,
     "sleepAltitudeM": 4600,
     "walkingHours": "4-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 17,
     "dayLabel": "17-22",
     "title": "Rest, then summit window: Base Camp - Camp 1 - Camp 2 - Camp 3 (about 6,200-6,400 m, often not slept) - summit 6,812 m - descend",
     "description": "Mushroom Ridge and hanging serac (the dablam) above. Weather buffers sit in this window.",
     "fromPlace": "Camp 1 / Base Camp",
     "toPlace": "Camps 1-2",
     "startAltitudeM": 4600,
     "highPointM": 6812,
     "sleepAltitudeM": 4600,
     "walkingHours": "Summit day from Camp 2 commonly pre-dawn; 40-50 degree snow/ice above Camp 3",
     "dayType": "contingency",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 23,
     "dayLabel": "23-24",
     "title": "Base Camp - Pangboche - Namche - Lukla",
     "description": "Some teams helicopter from Base Camp.",
     "fromPlace": "Camps 1-2",
     "toPlace": "Lukla",
     "startAltitudeM": 4600,
     "highPointM": 4600,
     "sleepAltitudeM": 2860,
     "walkingHours": "6-8 per day",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 25,
     "dayLabel": null,
     "title": "Lukla - Kathmandu; departure buffer",
     "description": "",
     "fromPlace": "Lukla",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2860,
     "highPointM": 2860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "annapurna-base-camp-trek",
  "before": {
   "fields": {
    "subtitle": "12 days typical · max 4130 m (Annapurna Base Camp)",
    "highlights": [
     "Annapurna Sanctuary amphitheatre with Annapurna I, Annapurna South, Hiunchuli, Gangapurna and Machhapuchhre [s7]",
     "Machhapuchhre Base Camp (3,700 m) [s4]",
     "Gurung villages Ghandruk and Chhomrong [s4]",
     "Rhododendron and bamboo forest of the Modi Khola gorge [s4]",
     "Jhinu Danda hot springs on the descent [s6]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Teahouses at every overnight stop; Chhomrong is the last large settlement with shops. [s4]",
    "acclimatizationNotes": "Standard itinerary has no dedicated rest day; sleeping at MBC (3,700 m) instead of Deurali splits the gain. Acclimatisation flagged as tight by planning tools for Deurali-ABC. [s5][s6]"
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu - Pokhara (drive 6-7 h or flight ~25 min)",
     822,
     1400,
     "flight"
    ],
    [
     3,
     null,
     "Pokhara - Nayapul (drive ~1-1.5 h) - Ghandruk",
     1940,
     2010,
     "trek"
    ],
    [
     4,
     null,
     "Ghandruk - Kimrong Khola - Chhomrong",
     2170,
     2170,
     "trek"
    ],
    [
     5,
     null,
     "Chhomrong - Sinuwa - Bamboo",
     2310,
     2310,
     "trek"
    ],
    [
     6,
     null,
     "Bamboo - Dovan - Himalaya - Deurali",
     3230,
     3230,
     "trek"
    ],
    [
     7,
     null,
     "Deurali - Machhapuchhre Base Camp",
     3700,
     3700,
     "trek"
    ],
    [
     8,
     null,
     "Machhapuchhre Base Camp - Annapurna Base Camp",
     4130,
     4130,
     "trek"
    ],
    [
     9,
     null,
     "ABC sunrise - descend to Bamboo",
     2310,
     4130,
     "trek"
    ],
    [
     10,
     null,
     "Bamboo - Chhomrong - Jhinu Danda (hot springs)",
     1780,
     2310,
     "trek"
    ],
    [
     11,
     null,
     "Jhinu Danda - Siwai/Nayapul - drive to Pokhara",
     822,
     1780,
     "trek"
    ],
    [
     12,
     null,
     "Pokhara - Kathmandu; departure or extra night",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Into the Annapurna Sanctuary, a ring of ice walls above the forest",
    "highlights": [
     "Annapurna Sanctuary amphitheatre with Annapurna I, Annapurna South, Hiunchuli, Gangapurna and Machhapuchhre",
     "Machhapuchhre Base Camp (3,700 m)",
     "Gurung villages Ghandruk and Chhomrong",
     "Rhododendron and bamboo forest of the Modi Khola gorge",
     "Jhinu Danda hot springs on the descent"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Teahouses at every overnight stop; Chhomrong is the last large settlement with shops.",
    "acclimatizationNotes": "Standard itinerary has no dedicated rest day; sleeping at MBC (3,700 m) instead of Deurali splits the gain. Acclimatisation flagged as tight by planning tools for Deurali-ABC."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu - Pokhara (drive 6-7 h or flight ~25 min)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Pokhara",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 822,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Pokhara - Nayapul (drive ~1-1.5 h) - Ghandruk",
     "description": "",
     "fromPlace": "Pokhara",
     "toPlace": "Ghandruk",
     "startAltitudeM": 822,
     "highPointM": 2010,
     "sleepAltitudeM": 1940,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Ghandruk - Kimrong Khola - Chhomrong",
     "description": "Last large settlement before the Sanctuary.",
     "fromPlace": "Ghandruk",
     "toPlace": "Chhomrong",
     "startAltitudeM": 1940,
     "highPointM": 2170,
     "sleepAltitudeM": 2170,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Chhomrong - Sinuwa - Bamboo",
     "description": "Steep staircase descent/ascent.",
     "fromPlace": "Chhomrong",
     "toPlace": "Bamboo",
     "startAltitudeM": 2170,
     "highPointM": 2310,
     "sleepAltitudeM": 2310,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Bamboo - Dovan - Himalaya - Deurali",
     "description": "",
     "fromPlace": "Bamboo",
     "toPlace": "Deurali",
     "startAltitudeM": 2310,
     "highPointM": 3230,
     "sleepAltitudeM": 3230,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Deurali - Machhapuchhre Base Camp",
     "description": "A short day into the Annapurna Sanctuary that eases the climb to Base Camp. The route crosses avalanche paths below MBC.",
     "fromPlace": "Deurali",
     "toPlace": "Machhapuchhre Base Camp",
     "startAltitudeM": 3230,
     "highPointM": 3700,
     "sleepAltitudeM": 3700,
     "walkingHours": "2-3",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Machhapuchhre Base Camp - Annapurna Base Camp",
     "description": "Sunset on Annapurna I and the walls of the Sanctuary.",
     "fromPlace": "Machhapuchhre Base Camp",
     "toPlace": "Annapurna Base Camp",
     "startAltitudeM": 3700,
     "highPointM": 4130,
     "sleepAltitudeM": 4130,
     "walkingHours": "2-3",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "ABC sunrise - descend to Bamboo",
     "description": "about 1,800 m of descent.",
     "fromPlace": "Annapurna Base Camp",
     "toPlace": "Bamboo",
     "startAltitudeM": 4130,
     "highPointM": 4130,
     "sleepAltitudeM": 2310,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Bamboo - Chhomrong - Jhinu Danda (hot springs)",
     "description": "",
     "fromPlace": "Bamboo",
     "toPlace": "Jhinu Danda",
     "startAltitudeM": 2310,
     "highPointM": 2310,
     "sleepAltitudeM": 1780,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Jhinu Danda - Siwai/Nayapul - drive to Pokhara",
     "description": "Jeep Siwai/Jhinu-Pokhara 2-3 h.",
     "fromPlace": "Jhinu Danda",
     "toPlace": "Pokhara",
     "startAltitudeM": 1780,
     "highPointM": 1780,
     "sleepAltitudeM": 822,
     "walkingHours": "2-3",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Pokhara - Kathmandu; departure or extra night",
     "description": "",
     "fromPlace": "Pokhara",
     "toPlace": "Kathmandu",
     "startAltitudeM": 822,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "annapurna-circuit-trek",
  "before": {
   "fields": {
    "subtitle": "13 days typical · max 5416 m (Thorong La pass)",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Teahouses throughout. Road now runs Besisahar to Manang and Beni to Muktinath; NATT side-trails (red-white and blue-white markers) avoid much of it. [s6][s9]",
    "acclimatizationNotes": "Standard is one rest day in Manang with a hike to ~4,600 m (Ice Lake); Tilicho variant adds extra nights above 4,000 m that help acclimatisation for the pass. [s5][s7]"
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu - Besisahar (drive) - Dharapani (jeep)",
     1860,
     1860,
     "travel"
    ],
    [
     3,
     null,
     "Dharapani - Timang - Chame",
     2670,
     2670,
     "trek"
    ],
    [
     4,
     null,
     "Chame - Bhratang - Upper Pisang",
     3300,
     3310,
     "trek"
    ],
    [
     5,
     null,
     "Upper Pisang - Ghyaru - Ngawal - Manang (high route)",
     3540,
     3540,
     "trek"
    ],
    [
     6,
     null,
     "Acclimatisation day in Manang",
     3540,
     4600,
     "rest-acclimatization"
    ],
    [
     7,
     null,
     "Manang - Gunsang - Yak Kharka",
     4050,
     4050,
     "trek"
    ],
    [
     8,
     null,
     "Yak Kharka - Ledar - Thorong Phedi",
     4450,
     4925,
     "trek"
    ],
    [
     9,
     null,
     "Thorong Phedi - Thorong La (5,416 m) - Muktinath",
     3800,
     5416,
     "trek"
    ],
    [
     10,
     null,
     "Muktinath - Kagbeni - Jomsom (walk or jeep)",
     2720,
     3800,
     "trek"
    ],
    [
     11,
     null,
     "Jomsom - Pokhara (flight)",
     822,
     2720,
     "flight"
    ],
    [
     12,
     null,
     "Pokhara - Kathmandu (flight ~25 min or drive 6-7 h)",
     1400,
     1400,
     "flight"
    ],
    [
     13,
     null,
     "Departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Round the Annapurna massif and over the Thorong La",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Teahouses throughout. Road now runs Besisahar to Manang and Beni to Muktinath; NATT side-trails (red-white and blue-white markers) avoid much of it.",
    "acclimatizationNotes": "Standard is one rest day in Manang with a hike to about 4,600 m (Ice Lake); Tilicho variant adds extra nights above 4,000 m that help acclimatisation for the pass."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "Briefing; permits arranged by agency.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu - Besisahar (drive) - Dharapani (jeep)",
     "description": "Kathmandu-Besisahar about 7-8 h (about 185 km); jeep up the Marsyangdi road to Dharapani skips the road-affected lower section.",
     "fromPlace": "Kathmandu",
     "toPlace": "Dharapani",
     "startAltitudeM": 1400,
     "highPointM": 1860,
     "sleepAltitudeM": 1860,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Dharapani - Timang - Chame",
     "description": "Chame is Manang district headquarters.",
     "fromPlace": "Dharapani",
     "toPlace": "Chame",
     "startAltitudeM": 1860,
     "highPointM": 2670,
     "sleepAltitudeM": 2670,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Chame - Bhratang - Upper Pisang",
     "description": "",
     "fromPlace": "Chame",
     "toPlace": "Upper Pisang",
     "startAltitudeM": 2670,
     "highPointM": 3310,
     "sleepAltitudeM": 3300,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Upper Pisang - Ghyaru - Ngawal - Manang (high route)",
     "description": "",
     "fromPlace": "Upper Pisang",
     "toPlace": "Manang",
     "startAltitudeM": 3300,
     "highPointM": 3540,
     "sleepAltitudeM": 3540,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Acclimatisation day in Manang",
     "description": "Optional hike to Ice Lake (Kicho Tal, about 4,600 m) or Gangapurna viewpoint; HRA clinic in Manang gives altitude talks.",
     "fromPlace": "Manang",
     "toPlace": "Manang",
     "startAltitudeM": 3540,
     "highPointM": 4600,
     "sleepAltitudeM": 3540,
     "walkingHours": "3-6",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Manang - Gunsang - Yak Kharka",
     "description": "",
     "fromPlace": "Manang",
     "toPlace": "Yak Kharka",
     "startAltitudeM": 3540,
     "highPointM": 4050,
     "sleepAltitudeM": 4050,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Yak Kharka - Ledar - Thorong Phedi",
     "description": "Some groups continue to Thorong High Camp (4,850-4,925 m) to shorten the pass day.",
     "fromPlace": "Yak Kharka",
     "toPlace": "Thorong Phedi",
     "startAltitudeM": 4050,
     "highPointM": 4925,
     "sleepAltitudeM": 4450,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Thorong Phedi - Thorong La (5,416 m) - Muktinath",
     "description": "Pre-dawn start; about 900 m up, about 1,600 m down.",
     "fromPlace": "Thorong Phedi",
     "toPlace": "Muktinath",
     "startAltitudeM": 4450,
     "highPointM": 5416,
     "sleepAltitudeM": 3800,
     "walkingHours": "7-9",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Muktinath - Kagbeni - Jomsom (walk or jeep)",
     "description": "Jeep option available.",
     "fromPlace": "Muktinath",
     "toPlace": "Jomsom",
     "startAltitudeM": 3800,
     "highPointM": 3800,
     "sleepAltitudeM": 2720,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Jomsom - Pokhara (flight)",
     "description": "about 20-25 min morning flight; afternoon winds stop operations.",
     "fromPlace": "Jomsom",
     "toPlace": "Pokhara",
     "startAltitudeM": 2720,
     "highPointM": 2720,
     "sleepAltitudeM": 822,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Pokhara - Kathmandu (flight ~25 min or drive 6-7 h)",
     "description": "",
     "fromPlace": "Pokhara",
     "toPlace": "Kathmandu",
     "startAltitudeM": 822,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Departure",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Muktinath / Jomsom",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "annapurna-i-expedition",
  "before": {
   "fields": {
    "subtitle": "41 days typical · max 8091 m (Annapurna I summit)",
    "overview": "8,091 m, 10th highest mountain. Normal north-side route (French route and variants such as the Dutch Rib / German route); crux is the avalanche- and serac-exposed section between Camp 2 and Camp 3 below the 'Sickle', with 45-55 degree ramps above. Historically the deadliest 8,000er by summit-to-fatality ratio (~32% per 8000ers.com data); The Himalayan Database later recorded 476 summits and 73 deaths. Prior 6,000-7,000 m experience expected by operators. [s5][s6][s7][s8]",
    "highlights": [
     "First 8,000 m peak ever climbed (Herzog and Lachenal, 3 June 1950) [s13]",
     "10th highest mountain in the world [s7]",
     "Remote north-side base camp above the Kali Gandaki [s3]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Hotels in Kathmandu/Pokhara, lodge in Dana, ~1 month in tented Base Camp; helicopter resupply common. [s3]",
    "acclimatizationNotes": "Rotation period of roughly days 6-29 in the commercial programme. [s3]"
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Briefing, permit formalities, gear check",
     1400,
     1400,
     "city"
    ],
    [
     3,
     null,
     "Kathmandu - Pokhara (flight)",
     822,
     1400,
     "flight"
    ],
    [
     4,
     null,
     "Pokhara - Dana (drive)",
     1440,
     1440,
     "travel"
    ],
    [
     5,
     null,
     "Dana - Annapurna I Base Camp (helicopter)",
     4190,
     4400,
     "trek"
    ],
    [
     6,
     "6-29",
     "Acclimatisation and rotations: BC - Camp I (5,150 m) - Camp II (5,700 m) - BC",
     4190,
     5150,
     "rest-acclimatization"
    ],
    [
     30,
     "30-37",
     "Summit window: BC - Camp II - Camp III (6,500 m) - Camp IV (7,400 m) - summit (8,091 m) - descend",
     4190,
     8091,
     "summit"
    ],
    [
     38,
     null,
     "Base Camp - Dana (helicopter)",
     1440,
     4190,
     "city"
    ],
    [
     39,
     null,
     "Dana - Pokhara (drive) - Kathmandu (flight)",
     1400,
     1440,
     "flight"
    ],
    [
     40,
     "40-41",
     "Contingency/leisure; departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "The first 8,000 m peak ever climbed, by its north side",
    "overview": "8,091 m, 10th highest mountain. Normal north-side route (French route and variants such as the Dutch Rib / German route); crux is the avalanche- and serac-exposed section between Camp 2 and Camp 3 below the 'Sickle', with 45-55 degree ramps above. Historically the deadliest 8,000er by summit-to-fatality ratio (about 32% per 8000ers.",
    "highlights": [
     "First 8,000 m peak ever climbed (Herzog and Lachenal, 3 June 1950)",
     "10th highest mountain in the world",
     "Remote north-side base camp above the Kali Gandaki"
    ],
    "inclusions": [
     "An experienced expedition leader and climbing Sherpa support as agreed in your plan",
     "The expedition permit and government fees",
     "Base camp tents, kitchen and cook team",
     "High-camp tents and fixed-rope fees",
     "Transport and domestic flights shown in the itinerary"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue and mountaineering cover",
     "Personal climbing equipment",
     "Summit bonus and tips for climbing Sherpas and staff"
    ],
    "contingency": "Hotels in Kathmandu/Pokhara, lodge in Dana, about 1 month in tented Base Camp; helicopter resupply common.",
    "acclimatizationNotes": "Rotation period of roughly days 6-29 in the commercial programme."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Briefing, permit formalities, gear check",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Kathmandu - Pokhara (flight)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Pokhara",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 822,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Pokhara - Dana (drive)",
     "description": "",
     "fromPlace": "Pokhara",
     "toPlace": "Dana",
     "startAltitudeM": 822,
     "highPointM": 1440,
     "sleepAltitudeM": 1440,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Dana - Annapurna I Base Camp (helicopter)",
     "description": "Puja at BC.",
     "fromPlace": "Dana",
     "toPlace": "Base Camp",
     "startAltitudeM": 1440,
     "highPointM": 4400,
     "sleepAltitudeM": 4190,
     "walkingHours": null,
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": "6-29",
     "title": "Acclimatisation and rotations: BC - Camp I (5,150 m) - Camp II (5,700 m) - BC",
     "description": "Camp I is mixed glacier terrain; Camp II is exposed and not suitable for long stays. Many clients rotate only to C1 and C2 to limit time in the C2-C3 avalanche zone.",
     "fromPlace": "Base Camp",
     "toPlace": "Base Camp / Camps I-II",
     "startAltitudeM": 4190,
     "highPointM": 5150,
     "sleepAltitudeM": 4190,
     "walkingHours": "4-5 per camp stage",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 30,
     "dayLabel": "30-37",
     "title": "Summit window: BC - Camp II - Camp III (6,500 m) - Camp IV (7,400 m) - summit (8,091 m) - descend",
     "description": "Late-night summit start, summit typically 8-10 am, descend to C3/C2. Supplemental oxygen used by commercial teams. Camp altitudes vary by year: C3 about 6,400-6,600 m, C4 about 6,850-7,400 m.",
     "fromPlace": "Base Camp / Camps I-II",
     "toPlace": "High camps",
     "startAltitudeM": 4190,
     "highPointM": 8091,
     "sleepAltitudeM": 4190,
     "walkingHours": "7-8 to summit from Camp IV",
     "dayType": "summit",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 38,
     "dayLabel": null,
     "title": "Base Camp - Dana (helicopter)",
     "description": "",
     "fromPlace": "High camps",
     "toPlace": "Dana",
     "startAltitudeM": 4190,
     "highPointM": 4190,
     "sleepAltitudeM": 1440,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 39,
     "dayLabel": null,
     "title": "Dana - Pokhara (drive) - Kathmandu (flight)",
     "description": "",
     "fromPlace": "Dana",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1440,
     "highPointM": 1440,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 40,
     "dayLabel": "40-41",
     "title": "Contingency/leisure; departure",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "bardia-national-park-safari",
  "before": {
   "fields": {
    "subtitle": "4 days typical · max 1400 m (Bardia National Park Safari)",
    "maxAltitudePoint": "Bardia National Park Safari",
    "highlights": [
     "Estimated 125 tigers in Bardia and adjoining forests (2022 survey) - Nepal's second-largest tiger population after Chitwan (128)",
     "On-foot tiger tracking with naturalist guides",
     "Wild elephants (park estimate ~120), one-horned rhino (38 in 2021 count), swamp deer, blackbuck",
     "Gangetic dolphin, gharial and mugger crocodile on the Karnali",
     "230 bird species incl. Bengal florican and sarus crane (NTB)",
     "Tharu culture around Thakurdwara"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   }
  },
  "after": {
   "fields": {
    "subtitle": "Tiger country in Nepal's quiet far west",
    "maxAltitudePoint": "Bardia National Park",
    "highlights": [
     "Estimated 125 tigers in Bardia and adjoining forests (2022 survey) - Nepal's second-largest tiger population after Chitwan (128)",
     "On-foot tiger tracking with naturalist guides",
     "Wild elephants (park estimate about 120), one-horned rhino (38 in 2021 count), swamp deer, blackbuck",
     "Gangetic dolphin, gharial and mugger crocodile on the Karnali",
     "230 bird species incl. Bengal florican and sarus crane (NTB)",
     "Tharu culture around Thakurdwara"
    ],
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ]
   }
  }
 },
 {
  "slug": "bhutan-add-on-tour",
  "before": {
   "fields": {
    "subtitle": "5 days typical · max 3120 m (Paro Taktsang (Tiger's Nest) - or Dochula Pass ~3,100 m)",
    "maxAltitudePoint": "Paro Taktsang (Tiger's Nest) - or Dochula Pass ~3,100 m",
    "overview": "Cultural touring by private vehicle; the Tiger's Nest (Paro Taktsang) hike is moderate, ~600 m ascent, 2-3 h up.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "acclimatizationNotes": "Overnights are below ~2,400 m; no formal acclimatization needed."
   }
  },
  "after": {
   "fields": {
    "subtitle": "Dzongs, prayer flags and the walk to Tiger's Nest",
    "maxAltitudePoint": "Paro Taktsang (Tiger's Nest)",
    "overview": "Cultural touring by private vehicle; the Tiger's Nest (Paro Taktsang) hike is moderate, about 600 m ascent, 2-3 h up.",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ],
    "acclimatizationNotes": "Overnights are below about 2,400 m; no formal acclimatization needed."
   }
  }
 },
 {
  "slug": "bungee-and-canyon-swing-adventure",
  "before": {
   "fields": {
    "subtitle": "1 days typical · max 1400 m (Bungee and Canyon Swing Adventure)",
    "maxAltitudePoint": "Bungee and Canyon Swing Adventure",
    "highlights": [
     "The Last Resort: Nepal's first bungee, a 160 m jump to the Bhote Koshi from a steel suspension bridge, designed by New Zealand bungee consultants (operating since ~1998)",
     "The Last Resort canyon swing: 160 m high, 100 m freefall, 240 m arc, ~150 km/h",
     "Kushma (The Cliff): 228 m bungee over the Kali Gandaki gorge from a 520 m bridge linking Parbat and Baglung; opened October 2020",
     "Kushma swing at 228 m (marketed as the world's highest swing), plus sky cycling",
     "Combine with Bhote Koshi rafting or canyoning at The Last Resort"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "The Last Resort location: Naya Pul near Tatopani, Sindhupalchok; sales office in Thamel. Kushma site is ~500 m from Kushma bazaar."
   }
  },
  "after": {
   "fields": {
    "subtitle": "A day of free fall above the Bhote Koshi gorge",
    "maxAltitudePoint": "Bhote Koshi gorge",
    "highlights": [
     "The Last Resort: Nepal's first bungee, a 160 m jump to the Bhote Koshi from a steel suspension bridge, designed by New Zealand bungee consultants (operating since about 1998)",
     "The Last Resort canyon swing: 160 m high, 100 m freefall, 240 m arc, about 150 km/h",
     "Kushma (The Cliff): 228 m bungee over the Kali Gandaki gorge from a 520 m bridge linking Parbat and Baglung; opened October 2020",
     "Kushma swing at 228 m (marketed as the world's highest swing), plus sky cycling",
     "Combine with Bhote Koshi rafting or canyoning at The Last Resort"
    ],
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ],
    "contingency": "The Last Resort location: Naya Pul near Tatopani, Sindhupalchok; sales office in Thamel. Kushma site is about 500 m from Kushma bazaar."
   }
  }
 },
 {
  "slug": "chitwan-national-park-safari",
  "before": {
   "fields": {
    "subtitle": "3 days typical · max 1400 m (Chitwan National Park Safari)",
    "maxAltitudePoint": "Chitwan National Park Safari",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   }
  },
  "after": {
   "fields": {
    "subtitle": "Rhinos, jungle walks and Tharu villages in the lowlands",
    "maxAltitudePoint": "Chitwan National Park",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ]
   }
  }
 },
 {
  "slug": "cho-oyu-expedition",
  "before": {
   "fields": {
    "subtitle": "45 days typical · max 8188 m (Cho Oyu summit (Himalayan Database 8,188 m; some operators still print 8,201 m))",
    "maxAltitudePoint": "Cho Oyu summit (Himalayan Database 8,188 m; some operators still print 8,201 m)",
    "overview": "Sixth-highest mountain. Almost all commercial ascents have used the Northwest Ridge from Tibet (moderate snow, a short Yellow Band rock step, fixed ropes). The Nepal (south/southwest) side is steeper, with ice cliffs and limited infrastructure; ExplorersWeb (Aug 2026) states it is not suitable for commercial expeditions despite Nepali operators trying to open it. First ascent (19 Oct 1954) was the Tichy route, West Ridge/West Face approached from the south via Nangpa La.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   }
  },
  "after": {
   "fields": {
    "subtitle": "The sixth-highest mountain, on the turquoise goddess's broad flanks",
    "maxAltitudePoint": "Cho Oyu summit",
    "overview": "Sixth-highest mountain. Almost all commercial ascents have used the Northwest Ridge from Tibet (moderate snow, a short Yellow Band rock step, fixed ropes). First ascent (19 Oct 1954) was the Tichy route, West Ridge/West Face approached from the south via Nangpa La.",
    "inclusions": [
     "An experienced expedition leader and climbing Sherpa support as agreed in your plan",
     "The expedition permit and government fees",
     "Base camp tents, kitchen and cook team",
     "High-camp tents and fixed-rope fees",
     "Transport and domestic flights shown in the itinerary"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue and mountaineering cover",
     "Personal climbing equipment",
     "Summit bonus and tips for climbing Sherpas and staff"
    ]
   }
  }
 },
 {
  "slug": "chulu-west-peak-climbing",
  "before": {
   "fields": {
    "subtitle": "20 days typical · max 6419 m (Chulu West summit)",
    "overview": "Staged glaciated climb from Ledar via Base Camp (~4,900 m), Camp I (~5,100 m) and Camp II/High Camp (~5,530 m) with summit push along the north-east ridge; ropes, crampons and ice axe used on the rock band and upper snow/ice. Summit day 8-10 h. Alpine grade not consistently published. [s5][s6][s7]",
    "highlights": [
     "Summit views of the Annapurna range, Dhaulagiri, Gangapurna, Tilicho Peak and Manaslu [s7]",
     "Combines a 6,400 m summit with the Annapurna Circuit and Thorong La [s5]",
     "Staged camps allow gradual acclimatisation [s5]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Teahouses on the circuit; tented Base Camp, Camp I and Camp II. [s5][s6]",
    "acclimatizationNotes": "Rest day in Manang plus a rest day at Camp I in the standard plan. [s6]"
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Preparation day; NMA permit formalities",
     1400,
     1400,
     "city"
    ],
    [
     3,
     null,
     "Kathmandu - Besisahar - Syange/Jagat (drive)",
     1300,
     1400,
     "travel"
    ],
    [
     4,
     null,
     "Jagat - Dharapani",
     1860,
     1860,
     "trek"
    ],
    [
     5,
     null,
     "Dharapani - Chame",
     2670,
     2670,
     "trek"
    ],
    [
     6,
     null,
     "Chame - Upper Pisang",
     3300,
     3300,
     "trek"
    ],
    [
     7,
     null,
     "Upper Pisang - Ngawal - Manang",
     3540,
     3540,
     "trek"
    ],
    [
     8,
     null,
     "Acclimatisation day in Manang",
     3540,
     3540,
     "rest-acclimatization"
    ],
    [
     9,
     null,
     "Manang - Yak Kharka - Ledar",
     4200,
     4230,
     "trek"
    ],
    [
     10,
     null,
     "Ledar - Chulu West Base Camp",
     4900,
     4900,
     "trek"
    ],
    [
     11,
     null,
     "Base Camp - Camp I",
     5100,
     5100,
     "trek"
    ],
    [
     12,
     null,
     "Rest and acclimatisation at Camp I (crew stocks Camp II)",
     5100,
     5100,
     "rest-acclimatization"
    ],
    [
     13,
     null,
     "Camp I - Camp II (High Camp) via rock band",
     5530,
     5530,
     "trek"
    ],
    [
     14,
     null,
     "Camp II - Chulu West summit (6,419 m) - Camp I",
     5100,
     6419,
     "trek"
    ],
    [
     15,
     null,
     "Camp I - Ledar",
     4200,
     5100,
     "trek"
    ],
    [
     16,
     null,
     "Contingency day",
     4200,
     4200,
     "contingency"
    ],
    [
     17,
     null,
     "Ledar - Thorong Phedi",
     4450,
     4450,
     "trek"
    ],
    [
     18,
     null,
     "Thorong Phedi - Thorong La (5,416 m) - Muktinath - Jomsom (drive)",
     2720,
     5416,
     "trek"
    ],
    [
     19,
     null,
     "Jomsom - Pokhara (flight)",
     822,
     2720,
     "flight"
    ],
    [
     20,
     null,
     "Pokhara - Kathmandu; departure next day",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A high snow summit above Manang, with the Annapurna Circuit as approach",
    "overview": "Staged glaciated climb from Ledar via Base Camp (about 4,900 m), Camp I (about 5,100 m) and Camp II/High Camp (about 5,530 m) with summit push along the north-east ridge; ropes, crampons and ice axe used on the rock band and upper snow/ice. Summit day 8-10 h. Alpine grade not consistently published.",
    "highlights": [
     "Summit views of the Annapurna range, Dhaulagiri, Gangapurna, Tilicho Peak and Manaslu",
     "Combines a 6,400 m summit with the Annapurna Circuit and Thorong La",
     "Staged camps allow gradual acclimatisation"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu",
     "A licensed climbing guide for the summit day",
     "The peak climbing permit",
     "Group climbing equipment: fixed ropes and camp tents"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters",
     "Personal climbing gear (boots, harness, crampons), which can be rented in Kathmandu"
    ],
    "contingency": "Teahouses on the circuit; tented Base Camp, Camp I and Camp II.",
    "acclimatizationNotes": "Rest day in Manang plus a rest day at Camp I in the standard plan."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Preparation day; NMA permit formalities",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Kathmandu - Besisahar - Syange/Jagat (drive)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Jagat",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1300,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Jagat - Dharapani",
     "description": "",
     "fromPlace": "Jagat",
     "toPlace": "Dharapani",
     "startAltitudeM": 1300,
     "highPointM": 1860,
     "sleepAltitudeM": 1860,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Dharapani - Chame",
     "description": "",
     "fromPlace": "Dharapani",
     "toPlace": "Chame",
     "startAltitudeM": 1860,
     "highPointM": 2670,
     "sleepAltitudeM": 2670,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Chame - Upper Pisang",
     "description": "",
     "fromPlace": "Chame",
     "toPlace": "Upper Pisang",
     "startAltitudeM": 2670,
     "highPointM": 3300,
     "sleepAltitudeM": 3300,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Upper Pisang - Ngawal - Manang",
     "description": "",
     "fromPlace": "Upper Pisang",
     "toPlace": "Manang",
     "startAltitudeM": 3300,
     "highPointM": 3540,
     "sleepAltitudeM": 3540,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Acclimatisation day in Manang",
     "description": "",
     "fromPlace": "Manang",
     "toPlace": "Manang",
     "startAltitudeM": 3540,
     "highPointM": 3540,
     "sleepAltitudeM": 3540,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Manang - Yak Kharka - Ledar",
     "description": "",
     "fromPlace": "Manang",
     "toPlace": "Ledar",
     "startAltitudeM": 3540,
     "highPointM": 4230,
     "sleepAltitudeM": 4200,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Ledar - Chulu West Base Camp",
     "description": "",
     "fromPlace": "Ledar",
     "toPlace": "Base Camp (tents)",
     "startAltitudeM": 4200,
     "highPointM": 4900,
     "sleepAltitudeM": 4900,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Base Camp - Camp I",
     "description": "",
     "fromPlace": "Base Camp (tents)",
     "toPlace": "Camp I",
     "startAltitudeM": 4900,
     "highPointM": 5100,
     "sleepAltitudeM": 5100,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Rest and acclimatisation at Camp I (crew stocks Camp II)",
     "description": "",
     "fromPlace": "Camp I",
     "toPlace": "Camp I",
     "startAltitudeM": 5100,
     "highPointM": 5100,
     "sleepAltitudeM": 5100,
     "walkingHours": null,
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Camp I - Camp II (High Camp) via rock band",
     "description": "Ropes, crampons, ice axe may be needed.",
     "fromPlace": "Camp I",
     "toPlace": "Camp II",
     "startAltitudeM": 5100,
     "highPointM": 5530,
     "sleepAltitudeM": 5530,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Camp II - Chulu West summit (6,419 m) - Camp I",
     "description": "Departure 1-3 am.",
     "fromPlace": "Camp II",
     "toPlace": "Camp I",
     "startAltitudeM": 5530,
     "highPointM": 6419,
     "sleepAltitudeM": 5100,
     "walkingHours": "9-10",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Camp I - Ledar",
     "description": "",
     "fromPlace": "Camp I",
     "toPlace": "Ledar",
     "startAltitudeM": 5100,
     "highPointM": 5100,
     "sleepAltitudeM": 4200,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Contingency day",
     "description": "",
     "fromPlace": "Ledar",
     "toPlace": "Ledar",
     "startAltitudeM": 4200,
     "highPointM": 4200,
     "sleepAltitudeM": 4200,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Ledar - Thorong Phedi",
     "description": "",
     "fromPlace": "Ledar",
     "toPlace": "Thorong Phedi",
     "startAltitudeM": 4200,
     "highPointM": 4450,
     "sleepAltitudeM": 4450,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 18,
     "dayLabel": null,
     "title": "Thorong Phedi - Thorong La (5,416 m) - Muktinath - Jomsom (drive)",
     "description": "",
     "fromPlace": "Thorong Phedi",
     "toPlace": "Jomsom",
     "startAltitudeM": 4450,
     "highPointM": 5416,
     "sleepAltitudeM": 2720,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 19,
     "dayLabel": null,
     "title": "Jomsom - Pokhara (flight)",
     "description": "Morning flight only.",
     "fromPlace": "Jomsom",
     "toPlace": "Pokhara",
     "startAltitudeM": 2720,
     "highPointM": 2720,
     "sleepAltitudeM": 822,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 20,
     "dayLabel": null,
     "title": "Pokhara - Kathmandu; departure next day",
     "description": "",
     "fromPlace": "Pokhara",
     "toPlace": "Kathmandu",
     "startAltitudeM": 822,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "dhaulagiri-expedition",
  "before": {
   "fields": {
    "subtitle": "40 days typical · max 8167 m (Dhaulagiri I summit)",
    "overview": "8,167 m, 7th highest mountain. Normal route is the Northeast Ridge (Swiss-Austrian first ascent, 13 May 1960). Glacier below the 'Eiger' rock face and the Dhaulagiri icefall to the NE col; steep fixed-rope sections Camp 1-Camp 2; wind-exposed ridge to Camp 3; avalanche-prone east-side slabs if Camp 2 is pitched off the ridge. Operators require prior 6,000-7,000 m experience. [s3][s4][s5][s6]",
    "highlights": [
     "7th highest mountain in the world [s12]",
     "Approach over Dhampus Pass and French Pass via Hidden Valley [s3][s7]",
     "Views across the Kali Gandaki gorge to Annapurna I [s12]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Lodges to Marpha; camping from Yak Kharka; ~1 month at tented Base Camp with helicopter resupply. [s3]",
    "acclimatizationNotes": "Rotation period roughly days 9-27 in the commercial programme. [s3]"
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Briefing, permit formalities",
     1400,
     1400,
     "city"
    ],
    [
     3,
     null,
     "Kathmandu - Pokhara (flight)",
     822,
     1400,
     "flight"
    ],
    [
     4,
     null,
     "Pokhara - Beni - Marpha (drive)",
     2670,
     2670,
     "travel"
    ],
    [
     5,
     null,
     "Acclimatisation day in Marpha (optional Muktinath excursion)",
     2670,
     2670,
     "rest-acclimatization"
    ],
    [
     6,
     null,
     "Marpha - Yak Kharka",
     3680,
     3680,
     "trek"
    ],
    [
     7,
     null,
     "Yak Kharka - Dhampus/Thapa Pass (~5,244 m) - Hidden Valley (Dhampus Base Camp)",
     3680,
     5244,
     "trek"
    ],
    [
     8,
     null,
     "Hidden Valley - French Pass (~5,360 m) - Dhaulagiri Base Camp",
     4750,
     5360,
     "trek"
    ],
    [
     9,
     "9-27",
     "Acclimatisation and rotations: BC - Camp I (5,850-5,900 m) - Camp II (6,400-6,600 m) - touch Camp III - BC",
     4750,
     5900,
     "rest-acclimatization"
    ],
    [
     28,
     "28-34",
     "Summit window: BC - Camp II - Camp III (7,200-7,400 m) - summit (8,167 m) - descend to C2/BC",
     4750,
     8167,
     "summit"
    ],
    [
     35,
     null,
     "Base Camp - Yak Kharka (via passes)",
     3680,
     4750,
     "trek"
    ],
    [
     36,
     null,
     "Yak Kharka - Marpha",
     2670,
     3680,
     "trek"
    ],
    [
     37,
     null,
     "Marpha - Pokhara (drive) or Jomsom - Pokhara (flight)",
     822,
     2670,
     "flight"
    ],
    [
     38,
     "38-40",
     "Pokhara - Kathmandu; contingency; departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "The white mountain, approached over French Pass and Hidden Valley",
    "overview": "8,167 m, 7th highest mountain. Normal route is the Northeast Ridge (Swiss-Austrian first ascent, 13 May 1960). Glacier below the 'Eiger' rock face and the Dhaulagiri icefall to the NE col; steep fixed-rope sections Camp 1-Camp 2; wind-exposed ridge to Camp 3; avalanche-prone east-side slabs if Camp 2 is pitched off the ridge.",
    "highlights": [
     "7th highest mountain in the world",
     "Approach over Dhampus Pass and French Pass via Hidden Valley",
     "Views across the Kali Gandaki gorge to Annapurna I"
    ],
    "inclusions": [
     "An experienced expedition leader and climbing Sherpa support as agreed in your plan",
     "The expedition permit and government fees",
     "Base camp tents, kitchen and cook team",
     "High-camp tents and fixed-rope fees",
     "Transport and domestic flights shown in the itinerary"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue and mountaineering cover",
     "Personal climbing equipment",
     "Summit bonus and tips for climbing Sherpas and staff"
    ],
    "contingency": "Lodges to Marpha; camping from Yak Kharka; about 1 month at tented Base Camp with helicopter resupply.",
    "acclimatizationNotes": "Rotation period roughly days 9-27 in the commercial programme."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Briefing, permit formalities",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Kathmandu - Pokhara (flight)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Pokhara",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 822,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Pokhara - Beni - Marpha (drive)",
     "description": "",
     "fromPlace": "Pokhara",
     "toPlace": "Marpha",
     "startAltitudeM": 822,
     "highPointM": 2670,
     "sleepAltitudeM": 2670,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Acclimatisation day in Marpha (optional Muktinath excursion)",
     "description": "",
     "fromPlace": "Marpha",
     "toPlace": "Marpha",
     "startAltitudeM": 2670,
     "highPointM": 2670,
     "sleepAltitudeM": 2670,
     "walkingHours": null,
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Marpha - Yak Kharka",
     "description": "",
     "fromPlace": "Marpha",
     "toPlace": "Yak Kharka (tents)",
     "startAltitudeM": 2670,
     "highPointM": 3680,
     "sleepAltitudeM": 3680,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Yak Kharka - Dhampus/Thapa Pass (~5,244 m) - Hidden Valley (Dhampus Base Camp)",
     "description": "",
     "fromPlace": "Yak Kharka (tents)",
     "toPlace": "Hidden Valley (tents)",
     "startAltitudeM": 3680,
     "highPointM": 5244,
     "sleepAltitudeM": 3680,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Hidden Valley - French Pass (~5,360 m) - Dhaulagiri Base Camp",
     "description": "",
     "fromPlace": "Hidden Valley (tents)",
     "toPlace": "Base Camp",
     "startAltitudeM": 3680,
     "highPointM": 5360,
     "sleepAltitudeM": 4750,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": "9-27",
     "title": "Acclimatisation and rotations: BC - Camp I (5,850-5,900 m) - Camp II (6,400-6,600 m) - touch Camp III - BC",
     "description": "C1 on the NE col after glacier/icefall; C1-C2 is the most technical stage per SST with steep ice and ladders. Advance BC (about 5,300 m) used only as a gear depot due to avalanche danger.",
     "fromPlace": "Base Camp",
     "toPlace": "Base Camp / Camps I-II",
     "startAltitudeM": 4750,
     "highPointM": 5900,
     "sleepAltitudeM": 4750,
     "walkingHours": "2-5 per camp stage",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 28,
     "dayLabel": "28-34",
     "title": "Summit window: BC - Camp II - Camp III (7,200-7,400 m) - summit (8,167 m) - descend to C2/BC",
     "description": "Late-night start; summit typically 8-10 am; oxygen used by commercial teams.",
     "fromPlace": "Base Camp / Camps I-II",
     "toPlace": "High camps",
     "startAltitudeM": 4750,
     "highPointM": 8167,
     "sleepAltitudeM": 4750,
     "walkingHours": "7-8 to summit from Camp III",
     "dayType": "summit",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 35,
     "dayLabel": null,
     "title": "Base Camp - Yak Kharka (via passes)",
     "description": "",
     "fromPlace": "High camps",
     "toPlace": "Yak Kharka",
     "startAltitudeM": 4750,
     "highPointM": 4750,
     "sleepAltitudeM": 3680,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 36,
     "dayLabel": null,
     "title": "Yak Kharka - Marpha",
     "description": "",
     "fromPlace": "Yak Kharka",
     "toPlace": "Marpha",
     "startAltitudeM": 3680,
     "highPointM": 3680,
     "sleepAltitudeM": 2670,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 37,
     "dayLabel": null,
     "title": "Marpha - Pokhara (drive) or Jomsom - Pokhara (flight)",
     "description": "",
     "fromPlace": "Marpha",
     "toPlace": "Pokhara",
     "startAltitudeM": 2670,
     "highPointM": 2670,
     "sleepAltitudeM": 822,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 38,
     "dayLabel": "38-40",
     "title": "Pokhara - Kathmandu; contingency; departure",
     "description": "",
     "fromPlace": "Pokhara",
     "toPlace": "Kathmandu",
     "startAltitudeM": 822,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "everest-base-camp-trek",
  "before": {
   "fields": {
    "subtitle": "14 days typical · max 5545 m (Kala Patthar)",
    "highlights": [
     "Everest Base Camp at 5,364 m, on the moraine beside the Khumbu Icefall.",
     "Sunrise from Kala Patthar — height used here 5,545 m (common operator figure; GPS of the prayer-flag summit is higher in some sources).",
     "Namche Bazaar and Tengboche Monastery, with Ama Dablam across the valley.",
     "Sagarmatha National Park, a UNESCO World Heritage Site."
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     2610,
     2860,
     "flight"
    ],
    [
     3,
     null,
     "Phakding - Monjo (park entry) - Namche Bazaar",
     3440,
     3440,
     "trek"
    ],
    [
     4,
     null,
     "Acclimatisation day: Namche - Hotel Everest View / Khumjung - Namche",
     3440,
     3880,
     "rest-acclimatization"
    ],
    [
     5,
     null,
     "Namche - Tengboche",
     3860,
     3860,
     "trek"
    ],
    [
     6,
     null,
     "Tengboche - Pangboche - Dingboche",
     4410,
     4410,
     "trek"
    ],
    [
     7,
     null,
     "Acclimatisation day: Dingboche - Nangkartshang hill - Dingboche",
     4410,
     5083,
     "rest-acclimatization"
    ],
    [
     8,
     null,
     "Dingboche - Thukla - Lobuche",
     4940,
     4940,
     "trek"
    ],
    [
     9,
     null,
     "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
     5164,
     5364,
     "trek"
    ],
    [
     10,
     null,
     "Gorak Shep - Kala Patthar (sunrise) - Gorak Shep - Pheriche",
     4371,
     5545,
     "trek"
    ],
    [
     11,
     null,
     "Pheriche - Tengboche - Namche Bazaar",
     3440,
     4371,
     "trek"
    ],
    [
     12,
     null,
     "Namche Bazaar - Lukla",
     2860,
     3440,
     "trek"
    ],
    [
     13,
     null,
     "Lukla - Kathmandu (flight; or Lukla - Manthali flight + drive)",
     1400,
     2860,
     "flight"
    ],
    [
     14,
     null,
     "Buffer day / departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Sherpa villages, monasteries and sunrise on Everest from Kala Patthar",
    "highlights": [
     "Everest Base Camp at 5,364 m, on the moraine beside the Khumbu Icefall.",
     "Namche Bazaar and Tengboche Monastery, with Ama Dablam across the valley.",
     "Sagarmatha National Park, a UNESCO World Heritage Site."
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "Briefing, gear check, permit paperwork.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     "description": "Lukla about 2,846-2,860 m. In peak seasons flights leave from Manthali (Ramechhap) after a 4-5 h pre-dawn drive.",
     "fromPlace": "Kathmandu",
     "toPlace": "Phakding",
     "startAltitudeM": 1400,
     "highPointM": 2860,
     "sleepAltitudeM": 2610,
     "walkingHours": "3-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Phakding - Monjo (park entry) - Namche Bazaar",
     "description": "Hillary suspension bridge; steep final climb; first Everest view.",
     "fromPlace": "Phakding",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 2610,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Acclimatisation day: Namche - Hotel Everest View / Khumjung - Namche",
     "description": "Climb high, sleep low (Hotel Everest View about 3,880 m).",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3440,
     "highPointM": 3880,
     "sleepAltitudeM": 3440,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Namche - Tengboche",
     "description": "Tengboche Monastery; Ama Dablam views.",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Tengboche",
     "startAltitudeM": 3440,
     "highPointM": 3860,
     "sleepAltitudeM": 3860,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Tengboche - Pangboche - Dingboche",
     "description": "Enter the Imja valley; above the treeline.",
     "fromPlace": "Tengboche",
     "toPlace": "Dingboche",
     "startAltitudeM": 3860,
     "highPointM": 4410,
     "sleepAltitudeM": 4410,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Acclimatisation day: Dingboche - Nangkartshang hill - Dingboche",
     "description": "Nangkartshang about 5,083 m; Makalu view.",
     "fromPlace": "Dingboche",
     "toPlace": "Dingboche",
     "startAltitudeM": 4410,
     "highPointM": 5083,
     "sleepAltitudeM": 4410,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Dingboche - Thukla - Lobuche",
     "description": "Climbers' memorials at Thukla Pass (about 4,830 m).",
     "fromPlace": "Dingboche",
     "toPlace": "Lobuche",
     "startAltitudeM": 4410,
     "highPointM": 4940,
     "sleepAltitudeM": 4940,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
     "description": "Everest Base Camp 5,364 m beside the Khumbu Icefall.",
     "fromPlace": "Lobuche",
     "toPlace": "Gorak Shep",
     "startAltitudeM": 4940,
     "highPointM": 5364,
     "sleepAltitudeM": 5164,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Gorak Shep - Kala Patthar (sunrise) - Gorak Shep - Pheriche",
     "description": "Kala Patthar: 1. 5-2 h ascent from Gorak Shep; best close view of Everest summit.",
     "fromPlace": "Gorak Shep",
     "toPlace": "Pheriche",
     "startAltitudeM": 5164,
     "highPointM": 5545,
     "sleepAltitudeM": 4371,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Pheriche - Tengboche - Namche Bazaar",
     "description": "",
     "fromPlace": "Pheriche",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 4371,
     "highPointM": 4371,
     "sleepAltitudeM": 3440,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Namche Bazaar - Lukla",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Lukla",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 2860,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Lukla - Kathmandu (flight; or Lukla - Manthali flight + drive)",
     "description": "Weather-dependent flight.",
     "fromPlace": "Lukla",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2860,
     "highPointM": 2860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Buffer day / departure",
     "description": "Contingency for Lukla flight cancellations.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "everest-expedition-south-col",
  "before": {
   "fields": {
    "subtitle": "60 days typical · max 8849 m (Summit of Mount Everest (8,848.86 m, 2020 Nepal-China survey))",
    "maxAltitudePoint": "Summit of Mount Everest (8,848.86 m, 2020 Nepal-China survey)",
    "overview": "Extreme-altitude expedition on fixed ropes: Khumbu Icefall (ladders, serac hazard), Western Cwm, Lhotse Face (approx. 40-degree ice), Yellow Band, Geneva Spur, South Col, Southeast Ridge, South Summit and Hillary Step. Supplemental oxygen normally used above Camp 2/3. Prior 8,000 m or high 7,000 m experience is typically expected by operators.",
    "highlights": [
     "Summit of the world's highest mountain, 8,848.86 m",
     "Khumbu Icefall, Western Cwm and Lhotse Face",
     "South Col, South Summit and Hillary Step",
     "Sherpa culture of the Khumbu and Tengboche monastery",
     "Classic approach trek through Sagarmatha National Park (UNESCO World Heritage Site)"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Lukla and Ramechhap (Manthali) flights are weather-dependent. Peak seasons often divert Kathmandu–Lukla flights via Manthali after a 4–5 h pre-dawn drive. Keep at least one buffer day before an international departure. Teahouses/lodges on the approach; full-service expedition base camp (dining, communications, medical) and tented high camps. 2026 SPCC rules: each climber must bring down at least 8 kg of waste from above base camp, including 2 kg from above Camp 2 (checked at Camp 2); only SPCC/municipality-issued poop bags above base camp (personal bags not accepted); source segregation in 7 categories; inventory of food/equipment above BC at start and end of season; Garbage Clearance Letter withheld from non-compliant teams.",
    "acclimatizationNotes": "Rotations between Base Camp and Camps 1-3 over approx. 3-4 weeks before the summit push."
   }
  },
  "after": {
   "fields": {
    "subtitle": "The highest summit on Earth, by the South Col route",
    "maxAltitudePoint": "Mount Everest summit",
    "overview": "Extreme-altitude expedition on fixed ropes: Khumbu Icefall (ladders, serac hazard), Western Cwm, Lhotse Face (about 40-degree ice), Yellow Band, Geneva Spur, South Col, Southeast Ridge, South Summit and Hillary Step. Supplemental oxygen normally used above Camp 2/3.",
    "highlights": [
     "Summit of the world's highest mountain, 8,848. 86 m",
     "Khumbu Icefall, Western Cwm and Lhotse Face",
     "South Col, South Summit and Hillary Step",
     "Sherpa culture of the Khumbu and Tengboche monastery",
     "Classic approach trek through Sagarmatha National Park (UNESCO World Heritage Site)"
    ],
    "inclusions": [
     "An experienced expedition leader and climbing Sherpa support as agreed in your plan",
     "The expedition permit and government fees",
     "Base camp tents, kitchen and cook team",
     "High-camp tents and fixed-rope fees",
     "Transport and domestic flights shown in the itinerary"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue and mountaineering cover",
     "Personal climbing equipment",
     "Summit bonus and tips for climbing Sherpas and staff"
    ],
    "contingency": "Lukla and Ramechhap (Manthali) flights are weather-dependent. Peak seasons often divert Kathmandu–Lukla flights via Manthali after a 4–5 h pre-dawn drive. Keep at least one buffer day before an international departure. Teahouses/lodges on the approach; full-service expedition base camp (dining, communications, medical) and tented high camps.",
    "acclimatizationNotes": "Rotations between Base Camp and Camps 1-3 over about 3-4 weeks before the summit push."
   }
  }
 },
 {
  "slug": "everest-helicopter-tour",
  "before": {
   "fields": {
    "subtitle": "1 days typical · max 5545 m (Kala Patthar landing (weather and weight permitting); Everest Base Camp 5,364 m is overflown, not a sightseeing landing)",
    "maxAltitudePoint": "Kala Patthar landing (weather and weight permitting); Everest Base Camp 5,364 m is overflown, not a sightseeing landing",
    "overview": "No fitness needed, but passengers go from about 1,400 m to about 5,545 m within roughly 1.5 hours; ground time at Kala Patthar is limited to minutes because of altitude. Not advised for people with heart or lung conditions (consult a doctor).",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Lukla and Ramechhap (Manthali) flights are weather-dependent. Peak seasons often divert Kathmandu–Lukla flights via Manthali after a 4–5 h pre-dawn drive. Keep at least one buffer day before an international departure. Regulatory context: in December 2024 Sagarmatha NP and Khumbu Pasang Lhamu Rural Municipality ordered a halt to commercial heli flights from 1 January 2025; operators suspended flights from 5-6 January 2025. CAAN held that only the federal government regulates airspace. The park reversed its order; a 24 January 2025 stakeholder meeting allowed rescue flights, mountain flights with one-touch landings below 4,300 m, and expedition cargo to Pangboche. The municipality reimposed a ban on commercial flights above Lukla (except rescue, cargo and mountain flights) on 28 April 2025. Operators advertise shared Kala Patthar landings again in 2026. Confirm current status before each booking."
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Lukla (refuel) - Pheriche (load shuttle) - overflight of Everest Base Camp - Kala Patthar landing - Hotel Everest View, Syangboche (breakfast) - Lukla - Kathmandu",
     1400,
     5545,
     "flight"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Everest close up in a morning, with breakfast at Syangboche",
    "maxAltitudePoint": "Kala Patthar (landing, weather permitting)",
    "overview": "No fitness needed, but passengers go from about 1,400 m to about 5,545 m within roughly 1. 5 hours; ground time at Kala Patthar is limited to minutes because of altitude. Not advised for people with heart or lung conditions (consult a doctor).",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ],
    "contingency": "CAAN held that only the federal government regulates airspace. The park reversed its order; a 24 January 2025 stakeholder meeting allowed rescue flights, mountain flights with one-touch landings below 4,300 m, and expedition cargo to Pangboche. The municipality reimposed a ban on commercial flights above Lukla (except rescue, cargo and mountain flights) on 28 April 2025. Confirm current status before each booking."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Lukla (refuel) - Pheriche (load shuttle) - overflight of Everest Base Camp - Kala Patthar landing - Hotel Everest View, Syangboche (breakfast) - Lukla - Kathmandu",
     "description": "Kathmandu-Lukla about 45 min; Lukla refuel 15-20 min; Kala Patthar ground time about 5-15 min; breakfast at Hotel Everest View (about 3,880 m) 30-60 min.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 5545,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "everest-three-passes-trek",
  "before": {
   "fields": {
    "subtitle": "20 days typical · max 5545 m (Kala Patthar (highest pass: Kongma La 5,535 m))",
    "maxAltitudePoint": "Kala Patthar (highest pass: Kongma La 5,535 m)",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     2610,
     2610,
     "flight"
    ],
    [
     3,
     null,
     "Phakding - Monjo - Namche Bazaar",
     3440,
     3440,
     "trek"
    ],
    [
     4,
     null,
     "Acclimatisation day: Hotel Everest View / Khumjung",
     3440,
     3440,
     "rest-acclimatization"
    ],
    [
     5,
     null,
     "Namche - Tengboche",
     3860,
     3860,
     "trek"
    ],
    [
     6,
     null,
     "Tengboche - Dingboche",
     4410,
     4410,
     "trek"
    ],
    [
     7,
     null,
     "Acclimatisation day: Nangkartshang (about 5,083 m)",
     4410,
     5083,
     "rest-acclimatization"
    ],
    [
     8,
     null,
     "Dingboche - Chhukung",
     4730,
     4730,
     "trek"
    ],
    [
     9,
     null,
     "Chhukung - Kongma La (5,535 m) - Khumbu Glacier - Lobuche",
     4940,
     5535,
     "trek"
    ],
    [
     10,
     null,
     "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
     5164,
     5364,
     "trek"
    ],
    [
     11,
     null,
     "Kala Patthar (sunrise) - Lobuche - Dzongla",
     4830,
     5545,
     "trek"
    ],
    [
     12,
     null,
     "Dzongla - Cho La (5,420 m) - Thagnak (Dragnag)",
     4700,
     5420,
     "trek"
    ],
    [
     13,
     null,
     "Thagnak - Ngozumpa Glacier crossing - Gokyo",
     4790,
     4790,
     "trek"
    ],
    [
     14,
     null,
     "Gokyo Ri (5,357 m) and lakes",
     4790,
     5357,
     "trek"
    ],
    [
     15,
     null,
     "Gokyo - Renjo La (5,360 m) - Lungden",
     4380,
     5360,
     "trek"
    ],
    [
     16,
     null,
     "Lungden - Marlung - Thame",
     3800,
     4380,
     "trek"
    ],
    [
     17,
     null,
     "Thame - Namche Bazaar",
     3440,
     3800,
     "trek"
    ],
    [
     18,
     null,
     "Namche Bazaar - Lukla",
     2860,
     3440,
     "trek"
    ],
    [
     19,
     null,
     "Lukla - Kathmandu (flight; or via Manthali)",
     1400,
     2860,
     "flight"
    ],
    [
     20,
     null,
     "Buffer day / departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Kongma La, Cho La and Renjo La: the Khumbu's great high loop",
    "maxAltitudePoint": "Kala Patthar",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Phakding",
     "startAltitudeM": 1400,
     "highPointM": 2610,
     "sleepAltitudeM": 2610,
     "walkingHours": "3-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Phakding - Monjo - Namche Bazaar",
     "description": "",
     "fromPlace": "Phakding",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 2610,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Acclimatisation day: Hotel Everest View / Khumjung",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Namche - Tengboche",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Tengboche",
     "startAltitudeM": 3440,
     "highPointM": 3860,
     "sleepAltitudeM": 3860,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Tengboche - Dingboche",
     "description": "",
     "fromPlace": "Tengboche",
     "toPlace": "Dingboche",
     "startAltitudeM": 3860,
     "highPointM": 4410,
     "sleepAltitudeM": 4410,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Acclimatisation day: Nangkartshang (about 5,083 m)",
     "description": "",
     "fromPlace": "Dingboche",
     "toPlace": "Dingboche",
     "startAltitudeM": 4410,
     "highPointM": 5083,
     "sleepAltitudeM": 4410,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Dingboche - Chhukung",
     "description": "Optional afternoon hike toward Chhukung Ri.",
     "fromPlace": "Dingboche",
     "toPlace": "Chhukung",
     "startAltitudeM": 4410,
     "highPointM": 4730,
     "sleepAltitudeM": 4730,
     "walkingHours": "2-3",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Chhukung - Kongma La (5,535 m) - Khumbu Glacier - Lobuche",
     "description": "Pass 1; hardest day.",
     "fromPlace": "Chhukung",
     "toPlace": "Lobuche",
     "startAltitudeM": 4730,
     "highPointM": 5535,
     "sleepAltitudeM": 4940,
     "walkingHours": "7-9",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
     "description": "EBC 5,364 m.",
     "fromPlace": "Lobuche",
     "toPlace": "Gorak Shep",
     "startAltitudeM": 4940,
     "highPointM": 5364,
     "sleepAltitudeM": 5164,
     "walkingHours": "6-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Kala Patthar (sunrise) - Lobuche - Dzongla",
     "description": "",
     "fromPlace": "Gorak Shep",
     "toPlace": "Dzongla",
     "startAltitudeM": 5164,
     "highPointM": 5545,
     "sleepAltitudeM": 4830,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Dzongla - Cho La (5,420 m) - Thagnak (Dragnag)",
     "description": "Pass 2; glacier section near the top; very early start.",
     "fromPlace": "Dzongla",
     "toPlace": "Thagnak",
     "startAltitudeM": 4830,
     "highPointM": 5420,
     "sleepAltitudeM": 4700,
     "walkingHours": "7-9",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Thagnak - Ngozumpa Glacier crossing - Gokyo",
     "description": "",
     "fromPlace": "Thagnak",
     "toPlace": "Gokyo",
     "startAltitudeM": 4700,
     "highPointM": 4790,
     "sleepAltitudeM": 4790,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Gokyo Ri (5,357 m) and lakes",
     "description": "",
     "fromPlace": "Gokyo",
     "toPlace": "Gokyo",
     "startAltitudeM": 4790,
     "highPointM": 5357,
     "sleepAltitudeM": 4790,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Gokyo - Renjo La (5,360 m) - Lungden",
     "description": "",
     "fromPlace": "Gokyo",
     "toPlace": "Lungden",
     "startAltitudeM": 4790,
     "highPointM": 5360,
     "sleepAltitudeM": 4380,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Lungden - Marlung - Thame",
     "description": "Thame: Tenzing Norgay's home village and monastery.",
     "fromPlace": "Lungden",
     "toPlace": "Thame",
     "startAltitudeM": 4380,
     "highPointM": 4380,
     "sleepAltitudeM": 3800,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Thame - Namche Bazaar",
     "description": "",
     "fromPlace": "Thame",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3800,
     "highPointM": 3800,
     "sleepAltitudeM": 3440,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 18,
     "dayLabel": null,
     "title": "Namche Bazaar - Lukla",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Lukla",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 2860,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 19,
     "dayLabel": null,
     "title": "Lukla - Kathmandu (flight; or via Manthali)",
     "description": "",
     "fromPlace": "Lukla",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2860,
     "highPointM": 2860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 20,
     "dayLabel": null,
     "title": "Buffer day / departure",
     "description": "Contingency for Lukla flights.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "everest-view-trek",
  "before": {
   "fields": {
    "subtitle": "8 days typical · max 3880 m (Hotel Everest View (Syangboche); highest overnight Tengboche 3,860 m)",
    "maxAltitudePoint": "Hotel Everest View (Syangboche); highest overnight Tengboche 3,860 m",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     2610,
     2610,
     "flight"
    ],
    [
     2,
     null,
     "Phakding - Monjo - Namche Bazaar",
     3440,
     3440,
     "trek"
    ],
    [
     3,
     null,
     "Namche - Syangboche - Hotel Everest View - Khumjung - Namche",
     3440,
     3880,
     "rest-acclimatization"
    ],
    [
     4,
     null,
     "Namche - Kyangjuma - Phungi Thanga - Tengboche",
     3860,
     3860,
     "trek"
    ],
    [
     5,
     null,
     "Tengboche - Namche Bazaar",
     3440,
     3860,
     "trek"
    ],
    [
     6,
     null,
     "Namche Bazaar - Lukla",
     2860,
     3440,
     "trek"
    ],
    [
     7,
     null,
     "Lukla - Kathmandu (flight; or Lukla - Manthali + 4-5 h drive)",
     1400,
     2860,
     "flight"
    ],
    [
     8,
     null,
     "Spare day in Kathmandu for Lukla flight delays; departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A short walk to Namche and Tengboche with Everest in view",
    "maxAltitudePoint": "Hotel Everest View",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Phakding",
     "startAltitudeM": 1400,
     "highPointM": 2610,
     "sleepAltitudeM": 2610,
     "walkingHours": "3-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Phakding - Monjo - Namche Bazaar",
     "description": "",
     "fromPlace": "Phakding",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 2610,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Namche - Syangboche - Hotel Everest View - Khumjung - Namche",
     "description": "Acclimatisation hike; Hillary school and Khumjung monastery.",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3440,
     "highPointM": 3880,
     "sleepAltitudeM": 3440,
     "walkingHours": "3-5",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Namche - Kyangjuma - Phungi Thanga - Tengboche",
     "description": "Tengboche Monastery; Everest and Ama Dablam views.",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Tengboche",
     "startAltitudeM": 3440,
     "highPointM": 3860,
     "sleepAltitudeM": 3860,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Tengboche - Namche Bazaar",
     "description": "Variant: continue to Monjo (about 2,835 m).",
     "fromPlace": "Tengboche",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3860,
     "highPointM": 3860,
     "sleepAltitudeM": 3440,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Namche Bazaar - Lukla",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Lukla",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 2860,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Lukla - Kathmandu (flight; or Lukla - Manthali + 4-5 h drive)",
     "description": "Keep at least one spare day before international departure.",
     "fromPlace": "Lukla",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2860,
     "highPointM": 2860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Spare day in Kathmandu for Lukla flight delays; departure",
     "description": "Lukla flights are weather-dependent; keep this day free before an international flight.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "ghorepani-poon-hill-trek",
  "before": {
   "fields": {
    "subtitle": "5 days typical · max 3210 m (Poon Hill viewpoint)",
    "maxAltitudePoint": "Poon Hill viewpoint",
    "highlights": [
     "Sunrise from Poon Hill (3,210 m) over Dhaulagiri (8,167 m), Annapurna South and Machhapuchhre [s4]",
     "Rhododendron and oak forest between Ghorepani and Tadapani [s4][s6]",
     "Gurung village of Ghandruk and its cultural museum [s5]",
     "Magar village of Ghorepani on its ridge [s6]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Teahouses at every overnight stop. [s5]"
   },
   "days": [
    [
     1,
     null,
     "Pokhara - Nayapul (drive ~1.5 h) - Birethanti - Tikhedhunga",
     1540,
     1570,
     "trek"
    ],
    [
     2,
     null,
     "Tikhedhunga - Ulleri - Banthanti - Ghorepani",
     2860,
     2860,
     "trek"
    ],
    [
     3,
     null,
     "Pre-dawn hike to Poon Hill (3,210 m) - Ghorepani - Deurali - Tadapani",
     2630,
     3210,
     "trek"
    ],
    [
     4,
     null,
     "Tadapani - Ghandruk",
     1940,
     2630,
     "trek"
    ],
    [
     5,
     null,
     "Ghandruk - Kimche/Nayapul - drive to Pokhara",
     822,
     1940,
     "trek"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Rhododendron forest and sunrise over Dhaulagiri and Annapurna",
    "maxAltitudePoint": "Poon Hill",
    "highlights": [
     "Sunrise from Poon Hill (3,210 m) over Dhaulagiri (8,167 m), Annapurna South and Machhapuchhre",
     "Rhododendron and oak forest between Ghorepani and Tadapani",
     "Gurung village of Ghandruk and its cultural museum",
     "Magar village of Ghorepani on its ridge"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Teahouses at every overnight stop."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Pokhara - Nayapul (drive ~1.5 h) - Birethanti - Tikhedhunga",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Tikhedhunga",
     "startAltitudeM": 1400,
     "highPointM": 1570,
     "sleepAltitudeM": 1540,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Tikhedhunga - Ulleri - Banthanti - Ghorepani",
     "description": "about 3,000-step climb to Ulleri; about 1,300 m gain.",
     "fromPlace": "Tikhedhunga",
     "toPlace": "Ghorepani",
     "startAltitudeM": 1540,
     "highPointM": 2860,
     "sleepAltitudeM": 2860,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Pre-dawn hike to Poon Hill (3,210 m) - Ghorepani - Deurali - Tadapani",
     "description": "45-60 min climb to the viewpoint for sunrise over Dhaulagiri and Annapurna.",
     "fromPlace": "Ghorepani",
     "toPlace": "Tadapani",
     "startAltitudeM": 2860,
     "highPointM": 3210,
     "sleepAltitudeM": 2630,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Tadapani - Ghandruk",
     "description": "Gurung Cultural Museum.",
     "fromPlace": "Tadapani",
     "toPlace": "Ghandruk",
     "startAltitudeM": 2630,
     "highPointM": 2630,
     "sleepAltitudeM": 1940,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Ghandruk - Kimche/Nayapul - drive to Pokhara",
     "description": "",
     "fromPlace": "Ghandruk",
     "toPlace": "Pokhara",
     "startAltitudeM": 1940,
     "highPointM": 1940,
     "sleepAltitudeM": 822,
     "walkingHours": "3",
     "dayType": "trek",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "gokyo-cho-la-everest-base-camp-trek",
  "before": {
   "fields": {
    "subtitle": "17 days typical · max 5545 m (Kala Patthar)",
    "overview": "Combines Gokyo Ri, the Cho La pass (5,420 m; short glacier section, steep descent, microspikes/crampons and poles commonly advised) and EBC/Kala Patthar. One operator grades it one level above the plain EBC trek.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     2610,
     2610,
     "flight"
    ],
    [
     3,
     null,
     "Phakding - Monjo - Namche Bazaar",
     3440,
     3440,
     "trek"
    ],
    [
     4,
     null,
     "Acclimatisation day: Hotel Everest View / Khumjung",
     3440,
     3440,
     "rest-acclimatization"
    ],
    [
     5,
     null,
     "Namche - Mong La - Dole",
     4040,
     4040,
     "trek"
    ],
    [
     6,
     null,
     "Dole - Machhermo",
     4470,
     4470,
     "trek"
    ],
    [
     7,
     null,
     "Machhermo - Gokyo",
     4790,
     4790,
     "trek"
    ],
    [
     8,
     null,
     "Gokyo Ri (5,357 m) sunrise; lakes",
     4790,
     5357,
     "rest-acclimatization"
    ],
    [
     9,
     null,
     "Gokyo - Ngozumpa Glacier - Thagnak (Dragnag)",
     4700,
     4790,
     "trek"
    ],
    [
     10,
     null,
     "Thagnak - Cho La (5,420 m) - Dzongla",
     4830,
     5420,
     "trek"
    ],
    [
     11,
     null,
     "Dzongla - Lobuche",
     4940,
     4940,
     "trek"
    ],
    [
     12,
     null,
     "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
     5164,
     5364,
     "trek"
    ],
    [
     13,
     null,
     "Kala Patthar (sunrise) - Pheriche",
     4371,
     5545,
     "trek"
    ],
    [
     14,
     null,
     "Pheriche - Tengboche - Namche Bazaar",
     3440,
     4371,
     "trek"
    ],
    [
     15,
     null,
     "Namche Bazaar - Lukla",
     2860,
     3440,
     "trek"
    ],
    [
     16,
     null,
     "Lukla - Kathmandu (flight; or via Manthali)",
     1400,
     2860,
     "flight"
    ],
    [
     17,
     null,
     "Buffer day / departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Gokyo's turquoise lakes, the Cho La and Everest Base Camp in one journey",
    "overview": "Combines Gokyo Ri, the Cho La pass (5,420 m; short glacier section, steep descent, microspikes/crampons and poles commonly advised) and EBC/Kala Patthar.",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Phakding",
     "startAltitudeM": 1400,
     "highPointM": 2610,
     "sleepAltitudeM": 2610,
     "walkingHours": "3-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Phakding - Monjo - Namche Bazaar",
     "description": "",
     "fromPlace": "Phakding",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 2610,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Acclimatisation day: Hotel Everest View / Khumjung",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Namche - Mong La - Dole",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Dole",
     "startAltitudeM": 3440,
     "highPointM": 4040,
     "sleepAltitudeM": 4040,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Dole - Machhermo",
     "description": "",
     "fromPlace": "Dole",
     "toPlace": "Machhermo",
     "startAltitudeM": 4040,
     "highPointM": 4470,
     "sleepAltitudeM": 4470,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Machhermo - Gokyo",
     "description": "",
     "fromPlace": "Machhermo",
     "toPlace": "Gokyo",
     "startAltitudeM": 4470,
     "highPointM": 4790,
     "sleepAltitudeM": 4790,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Gokyo Ri (5,357 m) sunrise; lakes",
     "description": "Acclimatisation day.",
     "fromPlace": "Gokyo",
     "toPlace": "Gokyo",
     "startAltitudeM": 4790,
     "highPointM": 5357,
     "sleepAltitudeM": 4790,
     "walkingHours": "3-5",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Gokyo - Ngozumpa Glacier - Thagnak (Dragnag)",
     "description": "Short staging day before the pass.",
     "fromPlace": "Gokyo",
     "toPlace": "Thagnak",
     "startAltitudeM": 4790,
     "highPointM": 4790,
     "sleepAltitudeM": 4700,
     "walkingHours": "2-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Thagnak - Cho La (5,420 m) - Dzongla",
     "description": "Pre-dawn start; glacier on the east side.",
     "fromPlace": "Thagnak",
     "toPlace": "Dzongla",
     "startAltitudeM": 4700,
     "highPointM": 5420,
     "sleepAltitudeM": 4830,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Dzongla - Lobuche",
     "description": "Rejoins the main EBC trail.",
     "fromPlace": "Dzongla",
     "toPlace": "Lobuche",
     "startAltitudeM": 4830,
     "highPointM": 4940,
     "sleepAltitudeM": 4940,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
     "description": "EBC 5,364 m.",
     "fromPlace": "Lobuche",
     "toPlace": "Gorak Shep",
     "startAltitudeM": 4940,
     "highPointM": 5364,
     "sleepAltitudeM": 5164,
     "walkingHours": "6-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Kala Patthar (sunrise) - Pheriche",
     "description": "",
     "fromPlace": "Gorak Shep",
     "toPlace": "Pheriche",
     "startAltitudeM": 5164,
     "highPointM": 5545,
     "sleepAltitudeM": 4371,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Pheriche - Tengboche - Namche Bazaar",
     "description": "",
     "fromPlace": "Pheriche",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 4371,
     "highPointM": 4371,
     "sleepAltitudeM": 3440,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Namche Bazaar - Lukla",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Lukla",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 2860,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Lukla - Kathmandu (flight; or via Manthali)",
     "description": "",
     "fromPlace": "Lukla",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2860,
     "highPointM": 2860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Buffer day / departure",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "gokyo-lakes-trek",
  "before": {
   "fields": {
    "subtitle": "12 days typical · max 5357 m (Gokyo Ri)",
    "overview": "Non-technical teahouse trek; altitude is the main difficulty (sleeping at about 4,790 m at Gokyo; steep 1.5-3 h climb to Gokyo Ri at 5,357 m). Quieter than the EBC trail.",
    "highlights": [
     "Gokyo Ri panorama of four 8,000 m peaks (Everest, Lhotse, Makalu, Cho Oyu)",
     "Turquoise Gokyo lakes chain",
     "Ngozumpa Glacier, described by operators as the longest glacier in Nepal/Himalaya",
     "Quieter valley than the main EBC trail",
     "Namche Bazaar and Khumjung"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     2610,
     2610,
     "flight"
    ],
    [
     3,
     null,
     "Phakding - Monjo - Namche Bazaar",
     3440,
     3440,
     "trek"
    ],
    [
     4,
     null,
     "Acclimatisation day: Hotel Everest View / Khumjung",
     3440,
     3440,
     "rest-acclimatization"
    ],
    [
     5,
     null,
     "Namche - Mong La - Phortse Thanga - Dole",
     4040,
     4200,
     "trek"
    ],
    [
     6,
     null,
     "Dole - Luza - Machhermo",
     4470,
     4470,
     "rest-acclimatization"
    ],
    [
     7,
     null,
     "Machhermo - Pangka - first and second lakes - Gokyo",
     4790,
     4790,
     "trek"
    ],
    [
     8,
     null,
     "Gokyo Ri sunrise (5,357 m); optional walk to fourth/fifth lakes",
     4790,
     5357,
     "trek"
    ],
    [
     9,
     null,
     "Gokyo - Machhermo - Dole",
     4040,
     4790,
     "trek"
    ],
    [
     10,
     null,
     "Dole - Namche Bazaar",
     3440,
     4040,
     "trek"
    ],
    [
     11,
     null,
     "Namche Bazaar - Lukla",
     2860,
     3440,
     "trek"
    ],
    [
     12,
     null,
     "Lukla - Kathmandu (flight; or via Manthali)",
     1400,
     2860,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Turquoise lakes, the Ngozumpa glacier and Gokyo Ri's view of four 8,000 m peaks",
    "overview": "Non-technical teahouse trek; altitude is the main difficulty (sleeping at about 4,790 m at Gokyo; steep 1. 5-3 h climb to Gokyo Ri at 5,357 m). Quieter than the EBC trail.",
    "highlights": [
     "Gokyo Ri panorama of four 8,000 m peaks (Everest, Lhotse, Makalu, Cho Oyu)",
     "Turquoise Gokyo lakes chain",
     "Quieter valley than the main EBC trail",
     "Namche Bazaar and Khumjung"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Phakding",
     "startAltitudeM": 1400,
     "highPointM": 2610,
     "sleepAltitudeM": 2610,
     "walkingHours": "3-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Phakding - Monjo - Namche Bazaar",
     "description": "Sagarmatha NP entry at Monjo.",
     "fromPlace": "Phakding",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 2610,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Acclimatisation day: Hotel Everest View / Khumjung",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Namche - Mong La - Phortse Thanga - Dole",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Dole",
     "startAltitudeM": 3440,
     "highPointM": 4200,
     "sleepAltitudeM": 4040,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Dole - Luza - Machhermo",
     "description": "Short day for acclimatisation; Cho Oyu views.",
     "fromPlace": "Dole",
     "toPlace": "Machhermo",
     "startAltitudeM": 4040,
     "highPointM": 4470,
     "sleepAltitudeM": 4470,
     "walkingHours": "4-5",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Machhermo - Pangka - first and second lakes - Gokyo",
     "description": "Gokyo village on the third lake (Dudh Pokhari), beside the Ngozumpa Glacier.",
     "fromPlace": "Machhermo",
     "toPlace": "Gokyo",
     "startAltitudeM": 4470,
     "highPointM": 4790,
     "sleepAltitudeM": 4790,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Gokyo Ri sunrise (5,357 m); optional walk to fourth/fifth lakes",
     "description": "Views of Everest, Lhotse, Makalu and Cho Oyu.",
     "fromPlace": "Gokyo",
     "toPlace": "Gokyo",
     "startAltitudeM": 4790,
     "highPointM": 5357,
     "sleepAltitudeM": 4790,
     "walkingHours": "4-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Gokyo - Machhermo - Dole",
     "description": "",
     "fromPlace": "Gokyo",
     "toPlace": "Dole",
     "startAltitudeM": 4790,
     "highPointM": 4790,
     "sleepAltitudeM": 4040,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Dole - Namche Bazaar",
     "description": "",
     "fromPlace": "Dole",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 4040,
     "highPointM": 4040,
     "sleepAltitudeM": 3440,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Namche Bazaar - Lukla",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Lukla",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 2860,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Lukla - Kathmandu (flight; or via Manthali)",
     "description": "Add a buffer day before international departure.",
     "fromPlace": "Lukla",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2860,
     "highPointM": 2860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "helambu-trek",
  "before": {
   "fields": {
    "subtitle": "7 days typical · max 3640 m (Tharepati (approx. 3,640-3,690 m in sources))",
    "maxAltitudePoint": "Tharepati (approx. 3,640-3,690 m in sources)",
    "overview": "Easy-to-moderate; mostly below about 2,700 m, high point Tharepati (approx. 3,640-3,690 m). Daily walks of about 3-7 hours. [s4, s5, s6]",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "No flight and no long drive needed - the nearest multi-day Himalayan trek to Kathmandu. Langtang NP checkpoints on the Helambu side are reported at Kutumsang, Mangengoth and Bhotang. [s4, s8]",
    "acclimatizationNotes": "No dedicated acclimatization day needed on the standard itinerary; the 5-day version gains about 1,400 m in one day. [s6]"
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Sundarijal (drive), trek through Shivapuri Nagarjun NP to Chisapani",
     2200,
     2215,
     "trek"
    ],
    [
     2,
     null,
     "Chisapani - Pati Bhanjyang - Kutumsang",
     2470,
     2470,
     "trek"
    ],
    [
     3,
     null,
     "Kutumsang - Magen Goth - Tharepati",
     3640,
     3640,
     "trek"
    ],
    [
     4,
     null,
     "Tharepati - Melamchi Gaon",
     2560,
     3640,
     "trek"
    ],
    [
     5,
     null,
     "Melamchi Gaon - Tarkeghyang",
     2600,
     2743,
     "trek"
    ],
    [
     6,
     null,
     "Tarkeghyang - Sermathang",
     2610,
     2610,
     "trek"
    ],
    [
     7,
     null,
     "Sermathang - Melamchi Pul Bazaar, drive to Kathmandu",
     1400,
     2610,
     "trek"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Hyolmo villages and forest ridges close to Kathmandu",
    "maxAltitudePoint": "Tharepati",
    "overview": "Easy-to-moderate; mostly below about 2,700 m, high point Tharepati (about 3,640-3,690 m). Daily walks of about 3-7 hours.",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "No flight and no long drive needed - the nearest multi-day Himalayan trek to Kathmandu. Langtang NP checkpoints on the Helambu side are reported at Kutumsang, Mangengoth and Bhotang.",
    "acclimatizationNotes": "No dedicated acclimatization day needed on the standard itinerary; the 5-day version gains about 1,400 m in one day."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Sundarijal (drive), trek through Shivapuri Nagarjun NP to Chisapani",
     "description": "Shivapuri NP fee paid at Sundarijal.",
     "fromPlace": "Kathmandu",
     "toPlace": "Chisapani",
     "startAltitudeM": 1400,
     "highPointM": 2215,
     "sleepAltitudeM": 2200,
     "walkingHours": "3-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Chisapani - Pati Bhanjyang - Kutumsang",
     "description": "",
     "fromPlace": "Chisapani",
     "toPlace": "Kutumsang",
     "startAltitudeM": 2200,
     "highPointM": 2470,
     "sleepAltitudeM": 2470,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Kutumsang - Magen Goth - Tharepati",
     "description": "Six-day versions sleep at Magen Goth (about 3,300 m) and cross Tharepati by day.",
     "fromPlace": "Kutumsang",
     "toPlace": "Tharepati",
     "startAltitudeM": 2470,
     "highPointM": 3640,
     "sleepAltitudeM": 3640,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Tharepati - Melamchi Gaon",
     "description": "First large Hyolmo village.",
     "fromPlace": "Tharepati",
     "toPlace": "Melamchi Gaon",
     "startAltitudeM": 3640,
     "highPointM": 3640,
     "sleepAltitudeM": 2560,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Melamchi Gaon - Tarkeghyang",
     "description": "",
     "fromPlace": "Melamchi Gaon",
     "toPlace": "Tarkeghyang",
     "startAltitudeM": 2560,
     "highPointM": 2743,
     "sleepAltitudeM": 2600,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Tarkeghyang - Sermathang",
     "description": "",
     "fromPlace": "Tarkeghyang",
     "toPlace": "Sermathang",
     "startAltitudeM": 2600,
     "highPointM": 2610,
     "sleepAltitudeM": 2610,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Sermathang - Melamchi Pul Bazaar, drive to Kathmandu",
     "description": "Drive about 2-3 hours.",
     "fromPlace": "Sermathang",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2610,
     "highPointM": 2610,
     "sleepAltitudeM": 1400,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "himlung-himal-expedition",
  "before": {
   "fields": {
    "subtitle": "30 days typical · max 7126 m (Himlung Himal summit)",
    "overview": "Glaciated 7,000 m peak climbed with fixed ropes, crampons and three high camps; marketed as a step-up peak for climbers with 6,000 m experience. No formal alpine grade found in authoritative sources. [s5, s6, s9]",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Teahouses/lodges on the approach to Phu; tented base camp and high camps. [s5, s7, s9]",
    "acclimatizationNotes": "Typically one rest day at Phu, two to three days at base camp, then rotations before the summit push. [s5, s7]"
   },
   "days": [
    [
     1,
     "1-2",
     "Arrival in Kathmandu; gear check, permits and briefing",
     1400,
     1400,
     "city"
    ],
    [
     3,
     "3-4",
     "Drive Kathmandu - Besisahar - Koto (Annapurna Circuit road)",
     2600,
     2600,
     "travel"
    ],
    [
     5,
     "5-8",
     "Trek Koto - Nar Khola gorge - Meta - Chyaku/Kyang - Phu Gaon",
     4080,
     4250,
     "trek"
    ],
    [
     9,
     null,
     "Acclimatization day at Phu Gaon (monastery)",
     4080,
     4080,
     "rest-acclimatization"
    ],
    [
     10,
     null,
     "Phu Gaon - Himlung Base Camp",
     4900,
     4900,
     "trek"
    ],
    [
     11,
     "11-22",
     "Puja, training, and acclimatization rotations to Camp I (approx. 5,400-5,500 m), Camp II (approx. 6,000 m) and Camp III (approx. 6,350-6,400 m); summit push in a weather window",
     4900,
     7126,
     "rest-acclimatization"
    ],
    [
     23,
     "23-26",
     "Descend to Phu, trek out via Meta/Koto, drive to Besisahar and Kathmandu",
     1400,
     4900,
     "travel"
    ],
    [
     27,
     "27-30",
     "Contingency / weather buffer days",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A first 7,000 m peak, reached through the hidden Nar Phu valley",
    "overview": "Glaciated 7,000 m peak climbed with fixed ropes, crampons and three high camps; marketed as a step-up peak for climbers with 6,000 m experience.",
    "inclusions": [
     "An experienced expedition leader and climbing Sherpa support as agreed in your plan",
     "The expedition permit and government fees",
     "Base camp tents, kitchen and cook team",
     "High-camp tents and fixed-rope fees",
     "Transport and domestic flights shown in the itinerary"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue and mountaineering cover",
     "Personal climbing equipment",
     "Summit bonus and tips for climbing Sherpas and staff"
    ],
    "contingency": "Teahouses/lodges on the approach to Phu; tented base camp and high camps.",
    "acclimatizationNotes": "Typically one rest day at Phu, two to three days at base camp, then rotations before the summit push."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": "1-2",
     "title": "Arrival in Kathmandu; gear check, permits and briefing",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": "3-4",
     "title": "Drive Kathmandu - Besisahar - Koto (Annapurna Circuit road)",
     "description": "Koto about 2,600 m.",
     "fromPlace": "Kathmandu",
     "toPlace": "Besisahar, then Koto",
     "startAltitudeM": 1400,
     "highPointM": 2600,
     "sleepAltitudeM": 2600,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": "5-8",
     "title": "Trek Koto - Nar Khola gorge - Meta - Chyaku/Kyang - Phu Gaon",
     "description": "Enters the Nar-Phu restricted area at Koto.",
     "fromPlace": "Besisahar, then Koto",
     "toPlace": "Meta (approx. 3,560 m), Kyang, Phu Gaon",
     "startAltitudeM": 2600,
     "highPointM": 4250,
     "sleepAltitudeM": 4080,
     "walkingHours": "4-7 per day",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Acclimatization day at Phu Gaon (monastery)",
     "description": "",
     "fromPlace": "Meta (approx. 3,560 m), Kyang, Phu Gaon",
     "toPlace": "Phu Gaon",
     "startAltitudeM": 4080,
     "highPointM": 4080,
     "sleepAltitudeM": 4080,
     "walkingHours": null,
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Phu Gaon - Himlung Base Camp",
     "description": "",
     "fromPlace": "Phu Gaon",
     "toPlace": "Base Camp",
     "startAltitudeM": 4080,
     "highPointM": 4900,
     "sleepAltitudeM": 4900,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": "11-22",
     "title": "Puja, training, and acclimatization rotations to Camp I (approx. 5,400-5,500 m), Camp II (approx. 6,000 m) and Camp III (approx. 6,350-6,400 m); summit push in a weather window",
     "description": "",
     "fromPlace": "Base Camp",
     "toPlace": "Base Camp and high camps",
     "startAltitudeM": 4900,
     "highPointM": 7126,
     "sleepAltitudeM": 4900,
     "walkingHours": "Summit day approx. 6-8 hours up from high camp",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 23,
     "dayLabel": "23-26",
     "title": "Descend to Phu, trek out via Meta/Koto, drive to Besisahar and Kathmandu",
     "description": "",
     "fromPlace": "Base Camp and high camps",
     "toPlace": "Kathmandu",
     "startAltitudeM": 4900,
     "highPointM": 4900,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 27,
     "dayLabel": "27-30",
     "title": "Contingency / weather buffer days",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "island-peak-climbing",
  "before": {
   "fields": {
    "subtitle": "21 days typical · max 6165 m (Island Peak (Imja Tse) summit)",
    "maxAltitudePoint": "Island Peak (Imja Tse) summit",
    "overview": "Island Peak (Imja Tse) listed 6,165 m by the NMA service-charge table and the Himalayan Database, with Everest Base Camp and Kala Patthar on the acclimatisation walk. Glacier travel, a fixed-rope headwall, a short exposed summit ridge, and a reserve summit day. Operator grade Alpine F/PD to PD+. Technical, privately guided. NMA climbing permit required. We do not guarantee a summit.",
    "highlights": [
     "Summit of Imja Tse, listed 6,165 m by NMA and the Himalayan Database.",
     "Everest Base Camp and Kala Patthar on the acclimatisation trek.",
     "Imja Glacier, a 40–50° snow/ice headwall on fixed rope, and a reserve day.",
     "Crampon, ice-axe and jumar skills taught at base camp. This is still a climb."
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu: permits (NMA) and gear check",
     1400,
     1400,
     "city"
    ],
    [
     3,
     null,
     "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     2610,
     2610,
     "flight"
    ],
    [
     4,
     null,
     "Phakding - Namche Bazaar",
     3440,
     3440,
     "trek"
    ],
    [
     5,
     null,
     "Acclimatisation day: Hotel Everest View / Khumjung",
     3440,
     3440,
     "rest-acclimatization"
    ],
    [
     6,
     null,
     "Namche - Tengboche",
     3860,
     3860,
     "trek"
    ],
    [
     7,
     null,
     "Tengboche - Dingboche",
     4410,
     4410,
     "trek"
    ],
    [
     8,
     null,
     "Acclimatisation day: Nangkartshang (about 5,083 m)",
     4410,
     5083,
     "rest-acclimatization"
    ],
    [
     9,
     null,
     "Dingboche - Lobuche",
     4940,
     4940,
     "trek"
    ],
    [
     10,
     null,
     "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
     5164,
     5364,
     "trek"
    ],
    [
     11,
     null,
     "Kala Patthar (sunrise) - descend to Dingboche",
     4410,
     5164,
     "trek"
    ],
    [
     12,
     null,
     "Dingboche - Chhukung",
     4730,
     4730,
     "trek"
    ],
    [
     13,
     null,
     "Chhukung - Island Peak Base Camp (Pareshaya Gyab)",
     5087,
     5150,
     "trek"
    ],
    [
     14,
     null,
     "Base camp: rope, crampon and jumar training",
     5087,
     5600,
     "rest-acclimatization"
    ],
    [
     15,
     null,
     "Summit Island Peak - return to Chhukung",
     4730,
     6165,
     "summit"
    ],
    [
     16,
     null,
     "Reserve summit day (weather)",
     4730,
     4730,
     "contingency"
    ],
    [
     17,
     null,
     "Chhukung - Tengboche",
     3860,
     4730,
     "trek"
    ],
    [
     18,
     null,
     "Tengboche - Namche Bazaar",
     3440,
     3860,
     "trek"
    ],
    [
     19,
     null,
     "Namche Bazaar - Lukla",
     2860,
     3440,
     "trek"
    ],
    [
     20,
     null,
     "Lukla - Kathmandu (flight; or via Manthali)",
     1400,
     2860,
     "flight"
    ],
    [
     21,
     null,
     "Departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A first Himalayan summit above the Imja valley, after Everest Base Camp",
    "maxAltitudePoint": "Island Peak summit",
    "overview": "Glacier travel, a fixed-rope headwall, a short exposed summit ridge, and a reserve summit day. Technical, privately guided. NMA climbing permit required. We do not guarantee a summit.",
    "highlights": [
     "Everest Base Camp and Kala Patthar on the acclimatisation trek.",
     "Imja Glacier, a 40–50° snow/ice headwall on fixed rope, and a reserve day.",
     "Crampon, ice-axe and jumar skills taught at base camp. This is still a climb."
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu",
     "A licensed climbing guide for the summit day",
     "The peak climbing permit",
     "Group climbing equipment: fixed ropes and camp tents"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters",
     "Personal climbing gear (boots, harness, crampons), which can be rented in Kathmandu"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu: permits (NMA) and gear check",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Phakding",
     "startAltitudeM": 1400,
     "highPointM": 2610,
     "sleepAltitudeM": 2610,
     "walkingHours": "3-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Phakding - Namche Bazaar",
     "description": "",
     "fromPlace": "Phakding",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 2610,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Acclimatisation day: Hotel Everest View / Khumjung",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Namche - Tengboche",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Tengboche",
     "startAltitudeM": 3440,
     "highPointM": 3860,
     "sleepAltitudeM": 3860,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Tengboche - Dingboche",
     "description": "",
     "fromPlace": "Tengboche",
     "toPlace": "Dingboche",
     "startAltitudeM": 3860,
     "highPointM": 4410,
     "sleepAltitudeM": 4410,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Acclimatisation day: Nangkartshang (about 5,083 m)",
     "description": "",
     "fromPlace": "Dingboche",
     "toPlace": "Dingboche",
     "startAltitudeM": 4410,
     "highPointM": 5083,
     "sleepAltitudeM": 4410,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Dingboche - Lobuche",
     "description": "",
     "fromPlace": "Dingboche",
     "toPlace": "Lobuche",
     "startAltitudeM": 4410,
     "highPointM": 4940,
     "sleepAltitudeM": 4940,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
     "description": "EBC 5,364 m.",
     "fromPlace": "Lobuche",
     "toPlace": "Gorak Shep",
     "startAltitudeM": 4940,
     "highPointM": 5364,
     "sleepAltitudeM": 5164,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Kala Patthar (sunrise) - descend to Dingboche",
     "description": "",
     "fromPlace": "Gorak Shep",
     "toPlace": "Dingboche",
     "startAltitudeM": 5164,
     "highPointM": 5164,
     "sleepAltitudeM": 4410,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Dingboche - Chhukung",
     "description": "",
     "fromPlace": "Dingboche",
     "toPlace": "Chhukung",
     "startAltitudeM": 4410,
     "highPointM": 4730,
     "sleepAltitudeM": 4730,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Chhukung - Island Peak Base Camp (Pareshaya Gyab)",
     "description": "Camping.",
     "fromPlace": "Chhukung",
     "toPlace": "Island Peak Base Camp",
     "startAltitudeM": 4730,
     "highPointM": 5150,
     "sleepAltitudeM": 5087,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Base camp: rope, crampon and jumar training",
     "description": "Some teams move to High Camp (about 5,600 m) instead.",
     "fromPlace": "Island Peak Base Camp",
     "toPlace": "Island Peak Base Camp",
     "startAltitudeM": 5087,
     "highPointM": 5600,
     "sleepAltitudeM": 5087,
     "walkingHours": "2-3",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Summit Island Peak - return to Chhukung",
     "description": "Rock gully, crampon point (about 5,800 m), glacier, headwall, summit ridge.",
     "fromPlace": "Island Peak Base Camp",
     "toPlace": "Chhukung",
     "startAltitudeM": 5087,
     "highPointM": 6165,
     "sleepAltitudeM": 4730,
     "walkingHours": "10-14",
     "dayType": "summit",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Reserve summit day (weather)",
     "description": "",
     "fromPlace": "Chhukung",
     "toPlace": "Chhukung",
     "startAltitudeM": 4730,
     "highPointM": 4730,
     "sleepAltitudeM": 4730,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Chhukung - Tengboche",
     "description": "",
     "fromPlace": "Chhukung",
     "toPlace": "Tengboche",
     "startAltitudeM": 4730,
     "highPointM": 4730,
     "sleepAltitudeM": 3860,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 18,
     "dayLabel": null,
     "title": "Tengboche - Namche Bazaar",
     "description": "",
     "fromPlace": "Tengboche",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3860,
     "highPointM": 3860,
     "sleepAltitudeM": 3440,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 19,
     "dayLabel": null,
     "title": "Namche Bazaar - Lukla",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Lukla",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 2860,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 20,
     "dayLabel": null,
     "title": "Lukla - Kathmandu (flight; or via Manthali)",
     "description": "",
     "fromPlace": "Lukla",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2860,
     "highPointM": 2860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 21,
     "dayLabel": null,
     "title": "Departure",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "kanchenjunga-base-camp-trek",
  "before": {
   "fields": {
    "subtitle": "23 days typical · max 5143 m (Pangpema (Kanchenjunga North Base Camp))",
    "maxAltitudePoint": "Pangpema (Kanchenjunga North Base Camp)",
    "overview": "Long, remote teahouse/camping circuit; high point Pangpema (North Base Camp, approx. 5,143 m) on a day hike; one long multi-pass day (Sele La, Sinion La, Mirgin La, approx. 4,290-4,500 m) between the north and south sides.",
    "highlights": [
     "Pangpema, Kanchenjunga North Base Camp (approx. 5,143 m)",
     "Oktang viewpoint and Yalung glacier below the south face",
     "Jannu (Kumbhakarna) from Khambachen",
     "Sele La / Sinion La / Mirgin La crossing",
     "Tibetan-influenced Ghunsa and Limbu/Rai villages in the lower valleys",
     "Kanchenjunga Conservation Area wildlife (red panda, snow leopard habitat)"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Bhadrapur (flight) - drive to Ilam",
     1400,
     1627,
     "flight"
    ],
    [
     2,
     null,
     "Ilam - Taplejung (drive)",
     1820,
     1820,
     "travel"
    ],
    [
     3,
     null,
     "Taplejung - Chiruwa",
     1270,
     1820,
     "trek"
    ],
    [
     4,
     null,
     "Chiruwa - Taplethok checkpoint - Lelep",
     1860,
     1860,
     "trek"
    ],
    [
     5,
     null,
     "Lelep - Amjilosa",
     2510,
     2510,
     "trek"
    ],
    [
     6,
     null,
     "Amjilosa - Gyabla",
     2730,
     2730,
     "trek"
    ],
    [
     7,
     null,
     "Gyabla - Ghunsa",
     3595,
     3595,
     "trek"
    ],
    [
     8,
     null,
     "Rest and acclimatization at Ghunsa",
     3595,
     3595,
     "rest-acclimatization"
    ],
    [
     9,
     null,
     "Ghunsa - Khambachen",
     4050,
     4050,
     "trek"
    ],
    [
     10,
     null,
     "Acclimatization day at Khambachen",
     4050,
     4050,
     "rest-acclimatization"
    ],
    [
     11,
     null,
     "Khambachen - Ramtang",
     4370,
     4370,
     "trek"
    ],
    [
     12,
     null,
     "Ramtang - Lhonak",
     4780,
     4780,
     "trek"
    ],
    [
     13,
     null,
     "Lhonak - Pangpema (North Base Camp, approx. 5,143 m) - Lhonak",
     4780,
     5143,
     "trek"
    ],
    [
     14,
     null,
     "Lhonak - Ghunsa",
     3595,
     4780,
     "trek"
    ],
    [
     15,
     null,
     "Ghunsa - Sele Le (high camp)",
     4290,
     4290,
     "trek"
    ],
    [
     16,
     null,
     "Cross Sele La, Sinion La and Mirgin La - Cheram (Tseram)",
     3870,
     4290,
     "trek"
    ],
    [
     17,
     null,
     "Cheram - Ramche",
     4580,
     4580,
     "trek"
    ],
    [
     18,
     null,
     "Ramche - Oktang viewpoint (South Base Camp side, approx. 4,730 m) - Cheram",
     3870,
     4730,
     "trek"
    ],
    [
     19,
     null,
     "Cheram - Tortong (Torongding)",
     2995,
     3870,
     "trek"
    ],
    [
     20,
     null,
     "Tortong - Yamphudin",
     2080,
     2995,
     "trek"
    ],
    [
     21,
     null,
     "Yamphudin - Mamangkhe - Khebang",
     1910,
     2080,
     "trek"
    ],
    [
     22,
     null,
     "Khebang - drive to Bhadrapur (or via Taplejung)",
     91,
     1910,
     "travel"
    ],
    [
     23,
     null,
     "Bhadrapur - Kathmandu (flight)",
     1400,
     1400,
     "flight"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Both base camps of the world's third-highest mountain, in Nepal's far east",
    "maxAltitudePoint": "Pangpema (North Base Camp)",
    "overview": "Long, remote teahouse/camping circuit; high point Pangpema (North Base Camp, about 5,143 m) on a day hike; one long multi-pass day (Sele La, Sinion La, Mirgin La, about 4,290-4,500 m) between the north and south sides.",
    "highlights": [
     "Pangpema, Kanchenjunga North Base Camp (about 5,143 m)",
     "Oktang viewpoint and Yalung glacier below the south face",
     "Jannu (Kumbhakarna) from Khambachen",
     "Sele La / Sinion La / Mirgin La crossing",
     "Tibetan-influenced Ghunsa and Limbu/Rai villages in the lower valleys",
     "Kanchenjunga Conservation Area wildlife (red panda, snow leopard habitat)"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Bhadrapur (flight) - drive to Ilam",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Ilam",
     "startAltitudeM": 1400,
     "highPointM": 1627,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Ilam - Taplejung (drive)",
     "description": "Permits checked; trek starts.",
     "fromPlace": "Ilam",
     "toPlace": "Taplejung",
     "startAltitudeM": 1400,
     "highPointM": 1820,
     "sleepAltitudeM": 1820,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Taplejung - Chiruwa",
     "description": "Tamor river valley.",
     "fromPlace": "Taplejung",
     "toPlace": "Chiruwa",
     "startAltitudeM": 1820,
     "highPointM": 1820,
     "sleepAltitudeM": 1270,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Chiruwa - Taplethok checkpoint - Lelep",
     "description": "",
     "fromPlace": "Chiruwa",
     "toPlace": "Lelep",
     "startAltitudeM": 1270,
     "highPointM": 1860,
     "sleepAltitudeM": 1860,
     "walkingHours": "6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Lelep - Amjilosa",
     "description": "",
     "fromPlace": "Lelep",
     "toPlace": "Amjilosa",
     "startAltitudeM": 1860,
     "highPointM": 2510,
     "sleepAltitudeM": 2510,
     "walkingHours": "6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Amjilosa - Gyabla",
     "description": "",
     "fromPlace": "Amjilosa",
     "toPlace": "Gyabla",
     "startAltitudeM": 2510,
     "highPointM": 2730,
     "sleepAltitudeM": 2730,
     "walkingHours": "5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Gyabla - Ghunsa",
     "description": "",
     "fromPlace": "Gyabla",
     "toPlace": "Ghunsa",
     "startAltitudeM": 2730,
     "highPointM": 3595,
     "sleepAltitudeM": 3595,
     "walkingHours": "5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Rest and acclimatization at Ghunsa",
     "description": "",
     "fromPlace": "Ghunsa",
     "toPlace": "Ghunsa",
     "startAltitudeM": 3595,
     "highPointM": 3595,
     "sleepAltitudeM": 3595,
     "walkingHours": "2-3",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Ghunsa - Khambachen",
     "description": "Views of Jannu (Kumbhakarna).",
     "fromPlace": "Ghunsa",
     "toPlace": "Khambachen",
     "startAltitudeM": 3595,
     "highPointM": 4050,
     "sleepAltitudeM": 4050,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Acclimatization day at Khambachen",
     "description": "",
     "fromPlace": "Khambachen",
     "toPlace": "Khambachen",
     "startAltitudeM": 4050,
     "highPointM": 4050,
     "sleepAltitudeM": 4050,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Khambachen - Ramtang",
     "description": "A shorter day past Ramtang monastery that eases the climb to Lhonak.",
     "fromPlace": "Khambachen",
     "toPlace": "Ramtang",
     "startAltitudeM": 4050,
     "highPointM": 4370,
     "sleepAltitudeM": 4370,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Ramtang - Lhonak",
     "description": "Highest overnight.",
     "fromPlace": "Ramtang",
     "toPlace": "Lhonak",
     "startAltitudeM": 4370,
     "highPointM": 4780,
     "sleepAltitudeM": 4780,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Lhonak - Pangpema (North Base Camp, approx. 5,143 m) - Lhonak",
     "description": "Close views of Kanchenjunga north face and glacier.",
     "fromPlace": "Lhonak",
     "toPlace": "Lhonak",
     "startAltitudeM": 4780,
     "highPointM": 5143,
     "sleepAltitudeM": 4780,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Lhonak - Ghunsa",
     "description": "",
     "fromPlace": "Lhonak",
     "toPlace": "Ghunsa",
     "startAltitudeM": 4780,
     "highPointM": 4780,
     "sleepAltitudeM": 3595,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Ghunsa - Sele Le (high camp)",
     "description": "",
     "fromPlace": "Ghunsa",
     "toPlace": "Sele Le",
     "startAltitudeM": 3595,
     "highPointM": 4290,
     "sleepAltitudeM": 4290,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Cross Sele La, Sinion La and Mirgin La - Cheram (Tseram)",
     "description": "Longest day; views of Jannu and Makalu.",
     "fromPlace": "Sele Le",
     "toPlace": "Cheram",
     "startAltitudeM": 4290,
     "highPointM": 4290,
     "sleepAltitudeM": 3870,
     "walkingHours": "8-9",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Cheram - Ramche",
     "description": "",
     "fromPlace": "Cheram",
     "toPlace": "Ramche",
     "startAltitudeM": 3870,
     "highPointM": 4580,
     "sleepAltitudeM": 4580,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 18,
     "dayLabel": null,
     "title": "Ramche - Oktang viewpoint (South Base Camp side, approx. 4,730 m) - Cheram",
     "description": "Yalung glacier and south face views.",
     "fromPlace": "Ramche",
     "toPlace": "Cheram",
     "startAltitudeM": 4580,
     "highPointM": 4730,
     "sleepAltitudeM": 3870,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 19,
     "dayLabel": null,
     "title": "Cheram - Tortong (Torongding)",
     "description": "",
     "fromPlace": "Cheram",
     "toPlace": "Tortong",
     "startAltitudeM": 3870,
     "highPointM": 3870,
     "sleepAltitudeM": 2995,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 20,
     "dayLabel": null,
     "title": "Tortong - Yamphudin",
     "description": "",
     "fromPlace": "Tortong",
     "toPlace": "Yamphudin",
     "startAltitudeM": 2995,
     "highPointM": 2995,
     "sleepAltitudeM": 2080,
     "walkingHours": "6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 21,
     "dayLabel": null,
     "title": "Yamphudin - Mamangkhe - Khebang",
     "description": "",
     "fromPlace": "Yamphudin",
     "toPlace": "Khebang",
     "startAltitudeM": 2080,
     "highPointM": 2080,
     "sleepAltitudeM": 1910,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 22,
     "dayLabel": null,
     "title": "Khebang - drive to Bhadrapur (or via Taplejung)",
     "description": "Long jeep day (8-10 hrs).",
     "fromPlace": "Khebang",
     "toPlace": "Bhadrapur",
     "startAltitudeM": 1910,
     "highPointM": 1910,
     "sleepAltitudeM": 91,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 23,
     "dayLabel": null,
     "title": "Bhadrapur - Kathmandu (flight)",
     "description": "",
     "fromPlace": "Bhadrapur",
     "toPlace": "Kathmandu",
     "startAltitudeM": 91,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "kanchenjunga-expedition",
  "before": {
   "fields": {
    "subtitle": "50 days typical · max 8586 m (Kangchenjunga Main (Kangchenjunga I). Subsidiary summits include Yalung Kang / West 8,505 m and South 8,494 m (SST list; not independently re-surveyed here))",
    "maxAltitudePoint": "Kangchenjunga Main (Kangchenjunga I). Subsidiary summits include Yalung Kang / West 8,505 m and South 8,494 m (SST list; not independently re-surveyed here)",
    "overview": "Third-highest mountain. Standard Nepal commercial line is the Southwest Face from the Yalung Glacier (1955 British route): glacier and serac terrain, then steep snow/ice to a high camp on the Gangway, then mixed ground to the summit pyramid. North-side routes from Pangpema exist but are not the usual commercial product. Remote; fewer teams than Everest or Manaslu. Operators ask for prior 7,000 m experience. Supplemental oxygen is normal on commercial summit days.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     "1-2",
     "Arrive Kathmandu; DoT briefing, restricted-area and climbing permits, gear check",
     1400,
     1400,
     "travel"
    ],
    [
     3,
     null,
     "Fly Kathmandu - Bhadrapur; drive to Phidim",
     1400,
     1400,
     "flight"
    ],
    [
     4,
     "4-5",
     "Drive Phidim - Yamphudin; rest/acclimatise",
     2080,
     2080,
     "rest-acclimatization"
    ],
    [
     6,
     "6-7",
     "Trek Yamphudin - Tortong - Tseram (Cheram)",
     3870,
     3870,
     "trek"
    ],
    [
     8,
     "8-9",
     "Acclimatisation at Tseram; hike toward Ramche (about 4,580 m) / Oktang",
     3870,
     4580,
     "rest-acclimatization"
    ],
    [
     10,
     null,
     "Tseram - Kanchenjunga South / Yalung Base Camp (helicopter on the SST programme; otherwise trek via Ramche-Oktang and the Yalung Glacier moraine)",
     5475,
     5475,
     "trek"
    ],
    [
     11,
     "11-35",
     "Puja and rotations on the Yalung Glacier SW Face: Camp 1 (about 6,200 m) - Camp 2 (about 6,400 m) - Camp 3 (about 7,100 m) - return to Base Camp",
     5475,
     6200,
     "trek"
    ],
    [
     36,
     "36-45",
     "Summit window: Camp 4 (about 7,550-7,570 m) - summit 8,586 m - descend to Camp 3 or 2 - Base Camp",
     7570,
     8586,
     "summit"
    ],
    [
     46,
     "46-48",
     "Helicopter Base Camp - Tapetok (SST) or trek out; drive Phidim - Bhadrapur; fly Kathmandu",
     1400,
     7570,
     "flight"
    ],
    [
     49,
     "49-50",
     "Buffer in Kathmandu; departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "The world's third-highest summit, from the Yalung side",
    "maxAltitudePoint": "Kangchenjunga summit",
    "overview": "Third-highest mountain. Standard Nepal commercial line is the Southwest Face from the Yalung Glacier (1955 British route): glacier and serac terrain, then steep snow/ice to a high camp on the Gangway, then mixed ground to the summit pyramid. North-side routes from Pangpema exist but are not the usual commercial product. Remote; fewer teams than Everest or Manaslu. Supplemental oxygen is normal on commercial summit days.",
    "inclusions": [
     "An experienced expedition leader and climbing Sherpa support as agreed in your plan",
     "The expedition permit and government fees",
     "Base camp tents, kitchen and cook team",
     "High-camp tents and fixed-rope fees",
     "Transport and domestic flights shown in the itinerary"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue and mountaineering cover",
     "Personal climbing equipment",
     "Summit bonus and tips for climbing Sherpas and staff"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": "1-2",
     "title": "Arrive Kathmandu; DoT briefing, restricted-area and climbing permits, gear check",
     "description": "RAP must be issued in Kathmandu through a registered agency.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Fly Kathmandu - Bhadrapur; drive to Phidim",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Phidim",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 4,
     "dayLabel": "4-5",
     "title": "Drive Phidim - Yamphudin; rest/acclimatise",
     "description": "Restricted-area checkpost.",
     "fromPlace": "Phidim",
     "toPlace": "Yamphudin",
     "startAltitudeM": 1400,
     "highPointM": 2080,
     "sleepAltitudeM": 2080,
     "walkingHours": null,
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": "6-7",
     "title": "Trek Yamphudin - Tortong - Tseram (Cheram)",
     "description": "South-side trail of the Kanchenjunga Base Camp trek.",
     "fromPlace": "Yamphudin",
     "toPlace": "Tseram",
     "startAltitudeM": 2080,
     "highPointM": 3870,
     "sleepAltitudeM": 3870,
     "walkingHours": "5-7 per day",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": "8-9",
     "title": "Acclimatisation at Tseram; hike toward Ramche (about 4,580 m) / Oktang",
     "description": "",
     "fromPlace": "Tseram",
     "toPlace": "Tseram",
     "startAltitudeM": 3870,
     "highPointM": 4580,
     "sleepAltitudeM": 3870,
     "walkingHours": "3-5",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Tseram - Kanchenjunga South / Yalung Base Camp (helicopter on the SST programme; otherwise trek via Ramche-Oktang and the Yalung Glacier moraine)",
     "description": "SST Advance Base Camp 5,475 m.",
     "fromPlace": "Tseram",
     "toPlace": "Base Camp",
     "startAltitudeM": 3870,
     "highPointM": 5475,
     "sleepAltitudeM": 5475,
     "walkingHours": null,
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": "11-35",
     "title": "Puja and rotations on the Yalung Glacier SW Face: Camp 1 (about 6,200 m) - Camp 2 (about 6,400 m) - Camp 3 (about 7,100 m) - return to Base Camp",
     "description": "Camp positions move with crevasses and snow.",
     "fromPlace": "Base Camp",
     "toPlace": "Base Camp and Camps 1-3",
     "startAltitudeM": 5475,
     "highPointM": 6200,
     "sleepAltitudeM": 5475,
     "walkingHours": "C1 4-5 h; C1-C2 2-3 h; C2-C3 about 5 h (SST)",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 36,
     "dayLabel": "36-45",
     "title": "Summit window: Camp 4 (about 7,550-7,570 m) - summit 8,586 m - descend to Camp 3 or 2 - Base Camp",
     "description": "Late-night start; summit typically 8-10 am.",
     "fromPlace": "Base Camp and Camps 1-3",
     "toPlace": "High camps",
     "startAltitudeM": 5475,
     "highPointM": 8586,
     "sleepAltitudeM": 7570,
     "walkingHours": "Summit day about 9-10 h from Camp 4; 5-6 h down (SST)",
     "dayType": "summit",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 46,
     "dayLabel": "46-48",
     "title": "Helicopter Base Camp - Tapetok (SST) or trek out; drive Phidim - Bhadrapur; fly Kathmandu",
     "description": "",
     "fromPlace": "High camps",
     "toPlace": "Kathmandu",
     "startAltitudeM": 7570,
     "highPointM": 7570,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 49,
     "dayLabel": "49-50",
     "title": "Buffer in Kathmandu; departure",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "kathmandu-valley-heritage-tour",
  "before": {
   "fields": {
    "subtitle": "2 days typical · max 1400 m (Kathmandu Valley Heritage Tour)",
    "maxAltitudePoint": "Kathmandu Valley Heritage Tour",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   }
  },
  "after": {
   "fields": {
    "subtitle": "Durbar squares, stupas and temples of the Kathmandu valley",
    "maxAltitudePoint": "Kathmandu valley",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ]
   }
  }
 },
 {
  "slug": "khopra-danda-trek",
  "before": {
   "fields": {
    "subtitle": "8 days typical · max 4660 m (Khayer Lake (Khayer Barah temple); Khopra Ridge 3,660 m is the high overnight)",
    "maxAltitudePoint": "Khayer Lake (Khayer Barah temple); Khopra Ridge 3,660 m is the high overnight",
    "overview": "Sleeping altitude 3,660 m at Khopra; optional Khayer Lake day hike is ~16 km round trip, ~1,000 m up and down, 8-10 h, on a poorly marked rocky trail that can be snow-covered. Without the lake it is moderate. [s4][s5][s6]",
    "highlights": [
     "Khopra ridge (3,660 m) facing Dhaulagiri, Annapurna South and Nilgiri, away from Poon Hill crowds [s4]",
     "Sacred Khayer Lake (4,660 m) and Khayer Barah temple [s6]",
     "Community-run lodges [s4]",
     "Option to include Poon Hill sunrise [s4]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Community lodges at Khopra and Chistibung (income stays with villages). [s4]",
    "acclimatizationNotes": "Recommended 9-day version adds a rest day at Khopra before the lake. [s5]"
   },
   "days": [
    [
     1,
     null,
     "Pokhara - drive to Nayapul/Kimche - Ghandruk",
     1940,
     1940,
     "trek"
    ],
    [
     2,
     null,
     "Ghandruk - Tadapani",
     2630,
     2630,
     "trek"
    ],
    [
     3,
     null,
     "Tadapani - Muldai viewpoint - Dobato",
     3420,
     3420,
     "trek"
    ],
    [
     4,
     null,
     "Dobato - Bayeli Kharka - Khopra Danda",
     3660,
     3660,
     "trek"
    ],
    [
     5,
     null,
     "Khopra - Khayer Lake (4,660 m) - Khopra",
     3660,
     4660,
     "rest-acclimatization"
    ],
    [
     6,
     null,
     "Khopra - Chistibung - Swanta",
     2230,
     3660,
     "trek"
    ],
    [
     7,
     null,
     "Swanta - Chitre - Ghorepani",
     2860,
     2860,
     "trek"
    ],
    [
     8,
     null,
     "Poon Hill sunrise (3,210 m) - Ghorepani - Ulleri - drive to Pokhara",
     822,
     3210,
     "trek"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A quiet ridge walk facing Dhaulagiri, away from the main trails",
    "maxAltitudePoint": "Khayer Lake",
    "overview": "Sleeping altitude 3,660 m at Khopra; optional Khayer Lake day hike is about 16 km round trip, about 1,000 m up and down, 8-10 h, on a poorly marked rocky trail that can be snow-covered. Without the lake it is moderate.",
    "highlights": [
     "Khopra ridge (3,660 m) facing Dhaulagiri, Annapurna South and Nilgiri, away from Poon Hill crowds",
     "Sacred Khayer Lake (4,660 m) and Khayer Barah temple",
     "Community-run lodges",
     "Option to include Poon Hill sunrise"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Community lodges at Khopra and Chistibung (income stays with villages).",
    "acclimatizationNotes": "Recommended 9-day version adds a rest day at Khopra before the lake."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Pokhara - drive to Nayapul/Kimche - Ghandruk",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Ghandruk",
     "startAltitudeM": 1400,
     "highPointM": 1940,
     "sleepAltitudeM": 1940,
     "walkingHours": "3-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Ghandruk - Tadapani",
     "description": "",
     "fromPlace": "Ghandruk",
     "toPlace": "Tadapani",
     "startAltitudeM": 1940,
     "highPointM": 2630,
     "sleepAltitudeM": 2630,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Tadapani - Muldai viewpoint - Dobato",
     "description": "",
     "fromPlace": "Tadapani",
     "toPlace": "Dobato",
     "startAltitudeM": 2630,
     "highPointM": 3420,
     "sleepAltitudeM": 3420,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Dobato - Bayeli Kharka - Khopra Danda",
     "description": "Community-run lodge; only one lodge at Khopra, booking advised in high season.",
     "fromPlace": "Dobato",
     "toPlace": "Khopra Danda (community lodge)",
     "startAltitudeM": 3420,
     "highPointM": 3660,
     "sleepAltitudeM": 3660,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Khopra - Khayer Lake (4,660 m) - Khopra",
     "description": "Start by 5:30-6:30 am; set a turnaround time. Can be replaced by a rest/acclimatisation day.",
     "fromPlace": "Khopra Danda (community lodge)",
     "toPlace": "Khopra Danda",
     "startAltitudeM": 3660,
     "highPointM": 4660,
     "sleepAltitudeM": 3660,
     "walkingHours": "8-10",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Khopra - Chistibung - Swanta",
     "description": "Magar villages.",
     "fromPlace": "Khopra Danda",
     "toPlace": "Swanta",
     "startAltitudeM": 3660,
     "highPointM": 3660,
     "sleepAltitudeM": 2230,
     "walkingHours": "5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Swanta - Chitre - Ghorepani",
     "description": "",
     "fromPlace": "Swanta",
     "toPlace": "Ghorepani",
     "startAltitudeM": 2230,
     "highPointM": 2860,
     "sleepAltitudeM": 2860,
     "walkingHours": "4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Poon Hill sunrise (3,210 m) - Ghorepani - Ulleri - drive to Pokhara",
     "description": "Jeep from Ulleri/Tikhedhunga area to Pokhara.",
     "fromPlace": "Ghorepani",
     "toPlace": "Pokhara",
     "startAltitudeM": 2860,
     "highPointM": 3210,
     "sleepAltitudeM": 822,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "langtang-gosainkunda-trek",
  "before": {
   "fields": {
    "subtitle": "13 days typical · max 4984 m (Tserko Ri (optional day hike from Kyanjin); Laurebina La 4,610 m is the highest pass)",
    "maxAltitudePoint": "Tserko Ri (optional day hike from Kyanjin); Laurebina La 4,610 m is the highest pass",
    "overview": "Combines the Langtang Valley with the sacred Gosainkunda lakes (4,380 m) and the Laurebina La pass (4,610 m). The pass day (approx. 7-8 hours, about 230 m up and 1,160 m down) and two nights around 4,000 m make it harder than the valley trek alone. [s6, s7]",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Park checkpoints include Dhunche, Ghoda Tabela and, on the Helambu side, Kutumsang/Mangengoth; Shivapuri permits checked at Sundarijal. [s10, s12]",
    "acclimatizationNotes": "Acclimatization from the Langtang Valley section helps before the Gosainkunda crossing; Gosainkunda-only treks from Dhunche gain altitude quickly. [s6, s7]"
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Dhunche - Syabrubesi (drive)",
     1460,
     1460,
     "travel"
    ],
    [
     2,
     null,
     "Syabrubesi - Lama Hotel",
     2470,
     2470,
     "trek"
    ],
    [
     3,
     null,
     "Lama Hotel - Langtang village",
     3430,
     3430,
     "trek"
    ],
    [
     4,
     null,
     "Langtang - Kyanjin Gompa",
     3870,
     3870,
     "trek"
    ],
    [
     5,
     null,
     "Day hike Kyanjin Ri (4,773 m) or Tserko Ri (4,984 m)",
     3870,
     4984,
     "trek"
    ],
    [
     6,
     null,
     "Kyanjin Gompa - Lama Hotel",
     2470,
     3870,
     "trek"
    ],
    [
     7,
     null,
     "Lama Hotel - Thulo Syabru (upper trail)",
     2230,
     2470,
     "trek"
    ],
    [
     8,
     null,
     "Thulo Syabru - Dursagang - Sing Gompa (Chandanbari)",
     3330,
     3330,
     "trek"
    ],
    [
     9,
     null,
     "Sing Gompa - Cholangpati - Laurebina - Gosainkunda",
     4380,
     4380,
     "trek"
    ],
    [
     10,
     null,
     "Gosainkunda - Laurebina La (4,610 m) - Phedi - Ghopte",
     3440,
     4610,
     "trek"
    ],
    [
     11,
     null,
     "Ghopte - Tharepati - Mangengoth - Kutumsang",
     2470,
     3440,
     "trek"
    ],
    [
     12,
     null,
     "Kutumsang - Gul Bhanjyang - Chipling - Chisapani",
     2200,
     2470,
     "trek"
    ],
    [
     13,
     null,
     "Chisapani - Borlang Bhanjyang - Shivapuri NP - Sundarijal, drive to Kathmandu",
     1400,
     2200,
     "trek"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Langtang's glacier valley and the sacred lakes of Gosainkunda",
    "maxAltitudePoint": "Tserko Ri",
    "overview": "Combines the Langtang Valley with the sacred Gosainkunda lakes (4,380 m) and the Laurebina La pass (4,610 m). The pass day (about 7-8 hours, about 230 m up and 1,160 m down) and two nights around 4,000 m make it harder than the valley trek alone.",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Park checkpoints include Dhunche, Ghoda Tabela and, on the Helambu side, Kutumsang/Mangengoth; Shivapuri permits checked at Sundarijal.",
    "acclimatizationNotes": "Acclimatization from the Langtang Valley section helps before the Gosainkunda crossing; Gosainkunda-only treks from Dhunche gain altitude quickly."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Dhunche - Syabrubesi (drive)",
     "description": "7-9 hours.",
     "fromPlace": "Kathmandu",
     "toPlace": "Syabrubesi",
     "startAltitudeM": 1400,
     "highPointM": 1460,
     "sleepAltitudeM": 1460,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Syabrubesi - Lama Hotel",
     "description": "",
     "fromPlace": "Syabrubesi",
     "toPlace": "Lama Hotel",
     "startAltitudeM": 1460,
     "highPointM": 2470,
     "sleepAltitudeM": 2470,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Lama Hotel - Langtang village",
     "description": "",
     "fromPlace": "Lama Hotel",
     "toPlace": "Langtang village",
     "startAltitudeM": 2470,
     "highPointM": 3430,
     "sleepAltitudeM": 3430,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Langtang - Kyanjin Gompa",
     "description": "",
     "fromPlace": "Langtang village",
     "toPlace": "Kyanjin Gompa",
     "startAltitudeM": 3430,
     "highPointM": 3870,
     "sleepAltitudeM": 3870,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Day hike Kyanjin Ri (4,773 m) or Tserko Ri (4,984 m)",
     "description": "",
     "fromPlace": "Kyanjin Gompa",
     "toPlace": "Kyanjin Gompa",
     "startAltitudeM": 3870,
     "highPointM": 4984,
     "sleepAltitudeM": 3870,
     "walkingHours": "4-9",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Kyanjin Gompa - Lama Hotel",
     "description": "",
     "fromPlace": "Kyanjin Gompa",
     "toPlace": "Lama Hotel",
     "startAltitudeM": 3870,
     "highPointM": 3870,
     "sleepAltitudeM": 2470,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Lama Hotel - Thulo Syabru (upper trail)",
     "description": "",
     "fromPlace": "Lama Hotel",
     "toPlace": "Thulo Syabru",
     "startAltitudeM": 2470,
     "highPointM": 2470,
     "sleepAltitudeM": 2230,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Thulo Syabru - Dursagang - Sing Gompa (Chandanbari)",
     "description": "",
     "fromPlace": "Thulo Syabru",
     "toPlace": "Sing Gompa",
     "startAltitudeM": 2230,
     "highPointM": 3330,
     "sleepAltitudeM": 3330,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Sing Gompa - Cholangpati - Laurebina - Gosainkunda",
     "description": "",
     "fromPlace": "Sing Gompa",
     "toPlace": "Gosainkunda",
     "startAltitudeM": 3330,
     "highPointM": 4380,
     "sleepAltitudeM": 4380,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Gosainkunda - Laurebina La (4,610 m) - Phedi - Ghopte",
     "description": "",
     "fromPlace": "Gosainkunda",
     "toPlace": "Ghopte",
     "startAltitudeM": 4380,
     "highPointM": 4610,
     "sleepAltitudeM": 3440,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Ghopte - Tharepati - Mangengoth - Kutumsang",
     "description": "Helambu variant turns off at Tharepati towards Melamchi Gaon.",
     "fromPlace": "Ghopte",
     "toPlace": "Kutumsang",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 2470,
     "walkingHours": "6-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Kutumsang - Gul Bhanjyang - Chipling - Chisapani",
     "description": "",
     "fromPlace": "Kutumsang",
     "toPlace": "Chisapani",
     "startAltitudeM": 2470,
     "highPointM": 2470,
     "sleepAltitudeM": 2200,
     "walkingHours": "6-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Chisapani - Borlang Bhanjyang - Shivapuri NP - Sundarijal, drive to Kathmandu",
     "description": "Sundarijal about 1,460 m; separate Shivapuri NP fee.",
     "fromPlace": "Chisapani",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2200,
     "highPointM": 2200,
     "sleepAltitudeM": 1400,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "langtang-valley-trek",
  "before": {
   "fields": {
    "subtitle": "8 days typical · max 4984 m (Tserko Ri (optional; Kyanjin Ri 4,773 m is the shorter alternative; highest overnight Kyanjin Gompa 3,870 m))",
    "maxAltitudePoint": "Tserko Ri (optional; Kyanjin Ri 4,773 m is the shorter alternative; highest overnight Kyanjin Gompa 3,870 m)",
    "highlights": [
     "Kyanjin Gompa monastery and cheese factory beneath Langtang Lirung (approx. 7,227-7,234 m)",
     "Tserko Ri and Kyanjin Ri viewpoints",
     "Rebuilt Langtang village and Tamang/Tibetan-Buddhist culture",
     "Closest major Himalayan valley trek to Kathmandu by road",
     "Langtang National Park wildlife such as red panda and Himalayan tahr"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Permit checks at Dhunche (army/park) and Ghoda Tabela; the Syabrubesi checkpoint was reported swept away in the Aug 2026 flood. Helicopter landing in the park carries an extra NPR 3,000 landing fee per an operator source. [s7, s10]",
    "acclimatizationNotes": "The Kyanjin Ri/Tserko Ri day doubles as the acclimatization day; arriving early at Kyanjin and doing the summit the next day is advised. [s8]"
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Trishuli - Dhunche - Syabrubesi (drive)",
     1460,
     1550,
     "travel"
    ],
    [
     2,
     null,
     "Syabrubesi - Bamboo - Rimche - Lama Hotel",
     2470,
     2470,
     "trek"
    ],
    [
     3,
     null,
     "Lama Hotel - Ghoda Tabela - Langtang village",
     3430,
     3430,
     "trek"
    ],
    [
     4,
     null,
     "Langtang - Mundu - Kyanjin Gompa",
     3870,
     3870,
     "trek"
    ],
    [
     5,
     null,
     "Day hike to Tserko Ri (4,984 m) or Kyanjin Ri (4,773 m), return to Kyanjin Gompa",
     3870,
     4984,
     "trek"
    ],
    [
     6,
     null,
     "Kyanjin Gompa - Langtang - Lama Hotel",
     2470,
     3870,
     "trek"
    ],
    [
     7,
     null,
     "Lama Hotel - Syabrubesi",
     1460,
     2470,
     "trek"
    ],
    [
     8,
     null,
     "Syabrubesi - Kathmandu (drive)",
     1400,
     1460,
     "travel"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A Tamang valley of yak pastures and glaciers, a day's drive from Kathmandu",
    "maxAltitudePoint": "Tserko Ri",
    "highlights": [
     "Kyanjin Gompa monastery and cheese factory beneath Langtang Lirung (about 7,227-7,234 m)",
     "Tserko Ri and Kyanjin Ri viewpoints",
     "Rebuilt Langtang village and Tamang/Tibetan-Buddhist culture",
     "Closest major Himalayan valley trek to Kathmandu by road",
     "Langtang National Park wildlife such as red panda and Himalayan tahr"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Permit checks at Dhunche (army/park) and Ghoda Tabela; the Syabrubesi checkpoint was reported swept away in the Aug 2026 flood.",
    "acclimatizationNotes": "The Kyanjin Ri/Tserko Ri day doubles as the acclimatization day; arriving early at Kyanjin and doing the summit the next day is advised."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Trishuli - Dhunche - Syabrubesi (drive)",
     "description": "about 122 km, 7-9 hours by bus/jeep.",
     "fromPlace": "Kathmandu",
     "toPlace": "Syabrubesi",
     "startAltitudeM": 1400,
     "highPointM": 1550,
     "sleepAltitudeM": 1460,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Syabrubesi - Bamboo - Rimche - Lama Hotel",
     "description": "",
     "fromPlace": "Syabrubesi",
     "toPlace": "Lama Hotel",
     "startAltitudeM": 1460,
     "highPointM": 2470,
     "sleepAltitudeM": 2470,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Lama Hotel - Ghoda Tabela - Langtang village",
     "description": "Army and park post at Ghoda Tabela. Langtang village was rebuilt after it was buried by an earthquake-triggered avalanche on 25 April 2015.",
     "fromPlace": "Lama Hotel",
     "toPlace": "Langtang village",
     "startAltitudeM": 2470,
     "highPointM": 3430,
     "sleepAltitudeM": 3430,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Langtang - Mundu - Kyanjin Gompa",
     "description": "",
     "fromPlace": "Langtang village",
     "toPlace": "Kyanjin Gompa",
     "startAltitudeM": 3430,
     "highPointM": 3870,
     "sleepAltitudeM": 3870,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Day hike to Tserko Ri (4,984 m) or Kyanjin Ri (4,773 m), return to Kyanjin Gompa",
     "description": "",
     "fromPlace": "Kyanjin Gompa",
     "toPlace": "Kyanjin Gompa",
     "startAltitudeM": 3870,
     "highPointM": 4984,
     "sleepAltitudeM": 3870,
     "walkingHours": "4-9",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Kyanjin Gompa - Langtang - Lama Hotel",
     "description": "",
     "fromPlace": "Kyanjin Gompa",
     "toPlace": "Lama Hotel",
     "startAltitudeM": 3870,
     "highPointM": 3870,
     "sleepAltitudeM": 2470,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Lama Hotel - Syabrubesi",
     "description": "",
     "fromPlace": "Lama Hotel",
     "toPlace": "Syabrubesi",
     "startAltitudeM": 2470,
     "highPointM": 2470,
     "sleepAltitudeM": 1460,
     "walkingHours": "4-6",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Syabrubesi - Kathmandu (drive)",
     "description": "",
     "fromPlace": "Syabrubesi",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1460,
     "highPointM": 1460,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "lhotse-expedition",
  "before": {
   "fields": {
    "subtitle": "60 days typical · max 8516 m (Lhotse Main summit (Lhotse Shar 8,383 m and Lhotse Middle/East 8,413 m are separate summits))",
    "maxAltitudePoint": "Lhotse Main summit (Lhotse Shar 8,383 m and Lhotse Middle/East 8,413 m are separate summits)",
    "overview": "Fourth-highest mountain. Standard commercial line shares Everest through the Khumbu Icefall, Western Cwm and Lhotse Face to about Camp 3; the routes split before Everest's South Col. Lhotse Camp 4 sits near the Geneva Spur / 'Turtle'; the summit crux is the Lhotse Couloir (steep snow/ice, conditions snow-dependent). Supplemental oxygen is normal on commercial teams. South Face is a separate, rarely commercial route. Prior 7,000-8,000 m experience is typically required by operators.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     "1-2",
     "Arrive Kathmandu; DoT briefing, permits, gear check",
     1400,
     1400,
     "travel"
    ],
    [
     3,
     "3-9",
     "Fly Lukla; trek Phakding - Namche (rest) - Deboche/Tengboche - Dingboche - Lobuche - Everest/Lhotse Base Camp",
     5364,
     5400,
     "rest-acclimatization"
    ],
    [
     10,
     "10-15",
     "Puja; Icefall ladder training; move through Icefall to Camp 1",
     6065,
     6100,
     "rest-acclimatization"
    ],
    [
     16,
     "16-39",
     "Rotations: Camp 1 - Western Cwm - Camp 2 - Lhotse Face - touch/sleep Camp 3 - return to Base Camp; rest awaiting weather",
     6065,
     6750,
     "city"
    ],
    [
     40,
     "40-53",
     "Summit window (typically mid-late May): Base Camp - Camp 2 - Camp 3 (oxygen) - Camp 4 near Geneva Spur (about 7,800-7,900 m) - Lhotse Couloir - summit 8,516 m - descend to Camp 2 / Base Camp",
     7900,
     8516,
     "summit"
    ],
    [
     54,
     "54-58",
     "SPCC garbage checks; trek Base Camp - Pheriche - Namche - Lukla",
     2860,
     7900,
     "trek"
    ],
    [
     59,
     "59-60",
     "Fly Lukla - Kathmandu; buffer; departure",
     1400,
     2860,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "The world's fourth-highest summit, up the Lhotse Face",
    "maxAltitudePoint": "Lhotse summit",
    "overview": "Fourth-highest mountain. Standard commercial line shares Everest through the Khumbu Icefall, Western Cwm and Lhotse Face to about Camp 3; the routes split before Everest's South Col. Lhotse Camp 4 sits near the Geneva Spur / 'Turtle'; the summit crux is the Lhotse Couloir (steep snow/ice, conditions snow-dependent). Supplemental oxygen is normal on commercial teams. South Face is a separate, rarely commercial route.",
    "inclusions": [
     "An experienced expedition leader and climbing Sherpa support as agreed in your plan",
     "The expedition permit and government fees",
     "Base camp tents, kitchen and cook team",
     "High-camp tents and fixed-rope fees",
     "Transport and domestic flights shown in the itinerary"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue and mountaineering cover",
     "Personal climbing equipment",
     "Summit bonus and tips for climbing Sherpas and staff"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": "1-2",
     "title": "Arrive Kathmandu; DoT briefing, permits, gear check",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": "3-9",
     "title": "Fly Lukla; trek Phakding - Namche (rest) - Deboche/Tengboche - Dingboche - Lobuche - Everest/Lhotse Base Camp",
     "description": "Some teams add Kongma La or Lobuche East for acclimatisation.",
     "fromPlace": "Kathmandu",
     "toPlace": "Teahouses then Base Camp",
     "startAltitudeM": 1400,
     "highPointM": 5400,
     "sleepAltitudeM": 5364,
     "walkingHours": "4-7 per day",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": "10-15",
     "title": "Puja; Icefall ladder training; move through Icefall to Camp 1",
     "description": "Camp 1 about 5,900-6,100 m above the Icefall.",
     "fromPlace": "Teahouses then Base Camp",
     "toPlace": "Base Camp / Camp 1",
     "startAltitudeM": 5364,
     "highPointM": 6100,
     "sleepAltitudeM": 6065,
     "walkingHours": "4-5 Icefall crossings",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": "16-39",
     "title": "Rotations: Camp 1 - Western Cwm - Camp 2 - Lhotse Face - touch/sleep Camp 3 - return to Base Camp; rest awaiting weather",
     "description": "Everest and Lhotse teams share the line to the Yellow Band.",
     "fromPlace": "Base Camp / Camp 1",
     "toPlace": "Camps 1-3 and Base Camp",
     "startAltitudeM": 6065,
     "highPointM": 6750,
     "sleepAltitudeM": 6065,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 40,
     "dayLabel": "40-53",
     "title": "Summit window (typically mid-late May): Base Camp - Camp 2 - Camp 3 (oxygen) - Camp 4 near Geneva Spur (about 7,800-7,900 m) - Lhotse Couloir - summit 8,516 m - descend to Camp 2 / Base Camp",
     "description": "Spring 2026: EOAN/SST rope-fixing team reached the Lhotse summit on 17 May.",
     "fromPlace": "Camps 1-3 and Base Camp",
     "toPlace": "Camps 2-4",
     "startAltitudeM": 6065,
     "highPointM": 8516,
     "sleepAltitudeM": 7900,
     "walkingHours": "Summit day about 6-8 h from Camp 4 (Adventure Consultants); SST cites 7-8 h",
     "dayType": "summit",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 54,
     "dayLabel": "54-58",
     "title": "SPCC garbage checks; trek Base Camp - Pheriche - Namche - Lukla",
     "description": "Helicopter descent used by some teams.",
     "fromPlace": "Camps 2-4",
     "toPlace": "Teahouses",
     "startAltitudeM": 7900,
     "highPointM": 7900,
     "sleepAltitudeM": 2860,
     "walkingHours": "5-7 per day",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 59,
     "dayLabel": "59-60",
     "title": "Fly Lukla - Kathmandu; buffer; departure",
     "description": "",
     "fromPlace": "Teahouses",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2860,
     "highPointM": 2860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "lobuche-east-peak-climbing",
  "before": {
   "fields": {
    "subtitle": "18 days typical · max 6119 m (Lobuche East (Lobuje East) true summit)",
    "maxAltitudePoint": "Lobuche East (Lobuje East) true summit",
    "overview": "More technical than Island Peak on the upper mountain: glacier/moraine to High Camp, then a steep snow/ice slope, an exposed south-east ridge on fixed rope, and a short near-vertical final step (operators describe about 20 m). Summit day commonly 8-12 h from High Camp with a 1-3 am start. Crampon, ice-axe, jumar and rappel skills are taught at High Camp or Base Camp. Many commercial parties stop at a false summit still some hours from the true East summit.",
    "highlights": [
     "Summit of Lobuche East (6,119 m) above the Khumbu Glacier",
     "Close views of Everest, Lhotse, Nuptse and Ama Dablam from the ridge",
     "Everest Base Camp and Kala Patthar on the common 18-day acclimatisation trek",
     "First recorded true-summit ascent 25 April 1984 by Larry (Laurence) Nielson and Ang Gyalzen Sherpa via the SE face/ridge (Himalayan Database; a 1979 Japanese claim is listed as disputed)"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu: permits and gear check",
     1400,
     1400,
     "city"
    ],
    [
     3,
     null,
     "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     2610,
     2610,
     "flight"
    ],
    [
     4,
     null,
     "Phakding - Namche Bazaar",
     3440,
     3440,
     "trek"
    ],
    [
     5,
     null,
     "Acclimatisation day: Hotel Everest View / Khumjung",
     3440,
     3440,
     "rest-acclimatization"
    ],
    [
     6,
     null,
     "Namche - Tengboche",
     3860,
     3860,
     "trek"
    ],
    [
     7,
     null,
     "Tengboche - Dingboche",
     4410,
     4410,
     "trek"
    ],
    [
     8,
     null,
     "Acclimatisation day: Nangkartshang (about 5,083 m)",
     4410,
     5083,
     "rest-acclimatization"
    ],
    [
     9,
     null,
     "Dingboche - Thukla - Lobuche",
     4940,
     4940,
     "trek"
    ],
    [
     10,
     null,
     "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
     5164,
     5364,
     "trek"
    ],
    [
     11,
     null,
     "Gorak Shep - Kala Patthar - Lobuche",
     4940,
     5164,
     "trek"
    ],
    [
     12,
     null,
     "Lobuche - High Camp; rope, crampon and jumar training",
     5400,
     5400,
     "rest-acclimatization"
    ],
    [
     13,
     null,
     "Summit Lobuche East - descend to Pheriche (or High Camp)",
     4371,
     6119,
     "summit"
    ],
    [
     14,
     null,
     "Reserve summit day (weather)",
     4371,
     4371,
     "contingency"
    ],
    [
     15,
     null,
     "Pheriche - Namche Bazaar",
     3440,
     4371,
     "trek"
    ],
    [
     16,
     null,
     "Namche Bazaar - Lukla",
     2860,
     3440,
     "trek"
    ],
    [
     17,
     null,
     "Lukla - Kathmandu (flight; or via Manthali)",
     1400,
     2860,
     "flight"
    ],
    [
     18,
     null,
     "Buffer day / departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A steep snow summit with a front-row view of Everest",
    "maxAltitudePoint": "Lobuche East summit",
    "overview": "Summit day commonly 8-12 h from High Camp with a 1-3 am start. Crampon, ice-axe, jumar and rappel skills are taught at High Camp or Base Camp. Many commercial parties stop at a false summit still some hours from the true East summit.",
    "highlights": [
     "Summit of Lobuche East (6,119 m) above the Khumbu Glacier",
     "Close views of Everest, Lhotse, Nuptse and Ama Dablam from the ridge",
     "Everest Base Camp and Kala Patthar on the common 18-day acclimatisation trek"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu",
     "A licensed climbing guide for the summit day",
     "The peak climbing permit",
     "Group climbing equipment: fixed ropes and camp tents"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters",
     "Personal climbing gear (boots, harness, crampons), which can be rented in Kathmandu"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "Briefing, gear check, NMA permit paperwork.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu: permits and gear check",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Kathmandu (or Manthali) - Lukla (flight) - Phakding",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Phakding",
     "startAltitudeM": 1400,
     "highPointM": 2610,
     "sleepAltitudeM": 2610,
     "walkingHours": "3-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Phakding - Namche Bazaar",
     "description": "",
     "fromPlace": "Phakding",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 2610,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Acclimatisation day: Hotel Everest View / Khumjung",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 3440,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Namche - Tengboche",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Tengboche",
     "startAltitudeM": 3440,
     "highPointM": 3860,
     "sleepAltitudeM": 3860,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Tengboche - Dingboche",
     "description": "",
     "fromPlace": "Tengboche",
     "toPlace": "Dingboche",
     "startAltitudeM": 3860,
     "highPointM": 4410,
     "sleepAltitudeM": 4410,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Acclimatisation day: Nangkartshang (about 5,083 m)",
     "description": "",
     "fromPlace": "Dingboche",
     "toPlace": "Dingboche",
     "startAltitudeM": 4410,
     "highPointM": 5083,
     "sleepAltitudeM": 4410,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Dingboche - Thukla - Lobuche",
     "description": "",
     "fromPlace": "Dingboche",
     "toPlace": "Lobuche",
     "startAltitudeM": 4410,
     "highPointM": 4940,
     "sleepAltitudeM": 4940,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Lobuche - Gorak Shep - Everest Base Camp - Gorak Shep",
     "description": "EBC 5,364 m. Standalone 15-day programmes skip this day and go to Base/High Camp instead.",
     "fromPlace": "Lobuche",
     "toPlace": "Gorak Shep",
     "startAltitudeM": 4940,
     "highPointM": 5364,
     "sleepAltitudeM": 5164,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Gorak Shep - Kala Patthar - Lobuche",
     "description": "",
     "fromPlace": "Gorak Shep",
     "toPlace": "Lobuche",
     "startAltitudeM": 5164,
     "highPointM": 5164,
     "sleepAltitudeM": 4940,
     "walkingHours": "5-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Lobuche - High Camp; rope, crampon and jumar training",
     "description": "",
     "fromPlace": "Lobuche",
     "toPlace": "Lobuche East High Camp",
     "startAltitudeM": 4940,
     "highPointM": 5400,
     "sleepAltitudeM": 5400,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Summit Lobuche East - descend to Pheriche (or High Camp)",
     "description": "Rocky trail to crampon point, glacier, fixed-rope ridge, summit. Rappel on descent.",
     "fromPlace": "Lobuche East High Camp",
     "toPlace": "Pheriche",
     "startAltitudeM": 5400,
     "highPointM": 6119,
     "sleepAltitudeM": 4371,
     "walkingHours": "8-12",
     "dayType": "summit",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Reserve summit day (weather)",
     "description": "If unused, extra descent day.",
     "fromPlace": "Pheriche",
     "toPlace": "Pheriche",
     "startAltitudeM": 4371,
     "highPointM": 4371,
     "sleepAltitudeM": 4371,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Pheriche - Namche Bazaar",
     "description": "",
     "fromPlace": "Pheriche",
     "toPlace": "Namche Bazaar",
     "startAltitudeM": 4371,
     "highPointM": 4371,
     "sleepAltitudeM": 3440,
     "walkingHours": "6-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Namche Bazaar - Lukla",
     "description": "",
     "fromPlace": "Namche Bazaar",
     "toPlace": "Lukla",
     "startAltitudeM": 3440,
     "highPointM": 3440,
     "sleepAltitudeM": 2860,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Lukla - Kathmandu (flight; or via Manthali)",
     "description": "",
     "fromPlace": "Lukla",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2860,
     "highPointM": 2860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 18,
     "dayLabel": null,
     "title": "Buffer day / departure",
     "description": "Contingency for Lukla flight cancellations.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "lower-dolpo-trek",
  "before": {
   "fields": {
    "subtitle": "18 days typical · max 5190 m (Numa La pass)",
    "overview": "Remote loop with two passes above 5,000 m (Numa La approx. 5,190 m, Baga La approx. 5,070 m) crossed on consecutive days; mostly camping above Dho Tarap; flight-dependent access via Juphal.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu: permits (agency) and preparation",
     1400,
     1400,
     "city"
    ],
    [
     3,
     null,
     "Kathmandu - Nepalgunj (flight)",
     150,
     1400,
     "flight"
    ],
    [
     4,
     null,
     "Nepalgunj - Juphal (flight) - Dunai",
     2140,
     2850,
     "flight"
    ],
    [
     5,
     null,
     "Dunai - Tarakot (along Thuli Bheri)",
     2543,
     2543,
     "trek"
    ],
    [
     6,
     null,
     "Tarakot - Laini (Tarap Khola valley)",
     3160,
     3160,
     "trek"
    ],
    [
     7,
     null,
     "Laini - Nawarpani",
     3545,
     3545,
     "trek"
    ],
    [
     8,
     null,
     "Nawarpani - Dho Tarap",
     4090,
     4090,
     "trek"
    ],
    [
     9,
     null,
     "Rest and acclimatization at Dho Tarap",
     4090,
     4090,
     "rest-acclimatization"
    ],
    [
     10,
     null,
     "Dho Tarap - Numa La Base Camp",
     4440,
     4440,
     "trek"
    ],
    [
     11,
     null,
     "Cross Numa La (approx. 5,190 m) - Pelung Tang",
     4465,
     5190,
     "trek"
    ],
    [
     12,
     null,
     "Cross Baga La (approx. 5,070 m) - Dajok Tang",
     4080,
     5070,
     "trek"
    ],
    [
     13,
     null,
     "Dajok Tang - Ringmo (Phoksundo Lake)",
     3600,
     4080,
     "trek"
    ],
    [
     14,
     null,
     "Rest day at Phoksundo Lake",
     3600,
     3600,
     "rest-acclimatization"
    ],
    [
     15,
     null,
     "Ringmo - Shyanta (via Phoksundo waterfall)",
     2520,
     3600,
     "trek"
    ],
    [
     16,
     null,
     "Shyanta - Juphal",
     2475,
     2520,
     "trek"
    ],
    [
     17,
     null,
     "Juphal - Nepalgunj - Kathmandu (flights)",
     1400,
     2475,
     "flight"
    ],
    [
     18,
     null,
     "Departure from Kathmandu",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Phoksundo Lake and the high passes of Dolpo's Bon villages",
    "overview": "Remote loop with two passes above 5,000 m (Numa La about 5,190 m, Baga La about 5,070 m) crossed on consecutive days; mostly camping above Dho Tarap; flight-dependent access via Juphal.",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu: permits (agency) and preparation",
     "description": "Restricted area permit processed by the agency via Department of Immigration.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Kathmandu - Nepalgunj (flight)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Nepalgunj",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 150,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Nepalgunj - Juphal (flight) - Dunai",
     "description": "",
     "fromPlace": "Nepalgunj",
     "toPlace": "Dunai",
     "startAltitudeM": 150,
     "highPointM": 2850,
     "sleepAltitudeM": 2140,
     "walkingHours": "3",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Dunai - Tarakot (along Thuli Bheri)",
     "description": "",
     "fromPlace": "Dunai",
     "toPlace": "Tarakot",
     "startAltitudeM": 2140,
     "highPointM": 2543,
     "sleepAltitudeM": 2543,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Tarakot - Laini (Tarap Khola valley)",
     "description": "",
     "fromPlace": "Tarakot",
     "toPlace": "Laini",
     "startAltitudeM": 2543,
     "highPointM": 3160,
     "sleepAltitudeM": 3160,
     "walkingHours": "6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Laini - Nawarpani",
     "description": "",
     "fromPlace": "Laini",
     "toPlace": "Nawarpani",
     "startAltitudeM": 3160,
     "highPointM": 3545,
     "sleepAltitudeM": 3545,
     "walkingHours": "6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Nawarpani - Dho Tarap",
     "description": "",
     "fromPlace": "Nawarpani",
     "toPlace": "Dho Tarap",
     "startAltitudeM": 3545,
     "highPointM": 4090,
     "sleepAltitudeM": 4090,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Rest and acclimatization at Dho Tarap",
     "description": "Monasteries of the Tarap valley (Buddhist and Bon).",
     "fromPlace": "Dho Tarap",
     "toPlace": "Dho Tarap",
     "startAltitudeM": 4090,
     "highPointM": 4090,
     "sleepAltitudeM": 4090,
     "walkingHours": "2-3",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Dho Tarap - Numa La Base Camp",
     "description": "",
     "fromPlace": "Dho Tarap",
     "toPlace": "Numa La Base Camp",
     "startAltitudeM": 4090,
     "highPointM": 4440,
     "sleepAltitudeM": 4440,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Cross Numa La (approx. 5,190 m) - Pelung Tang",
     "description": "Views toward Dhaulagiri range.",
     "fromPlace": "Numa La Base Camp",
     "toPlace": "Pelung Tang",
     "startAltitudeM": 4440,
     "highPointM": 5190,
     "sleepAltitudeM": 4465,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Cross Baga La (approx. 5,070 m) - Dajok Tang",
     "description": "",
     "fromPlace": "Pelung Tang",
     "toPlace": "Dajok Tang",
     "startAltitudeM": 4465,
     "highPointM": 5070,
     "sleepAltitudeM": 4080,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Dajok Tang - Ringmo (Phoksundo Lake)",
     "description": "",
     "fromPlace": "Dajok Tang",
     "toPlace": "Ringmo",
     "startAltitudeM": 4080,
     "highPointM": 4080,
     "sleepAltitudeM": 3600,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Rest day at Phoksundo Lake",
     "description": "Tshowa monastery and lakeshore walk.",
     "fromPlace": "Ringmo",
     "toPlace": "Ringmo",
     "startAltitudeM": 3600,
     "highPointM": 3600,
     "sleepAltitudeM": 3600,
     "walkingHours": "2-3",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Ringmo - Shyanta (via Phoksundo waterfall)",
     "description": "",
     "fromPlace": "Ringmo",
     "toPlace": "Shyanta",
     "startAltitudeM": 3600,
     "highPointM": 3600,
     "sleepAltitudeM": 2520,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Shyanta - Juphal",
     "description": "",
     "fromPlace": "Shyanta",
     "toPlace": "Juphal",
     "startAltitudeM": 2520,
     "highPointM": 2520,
     "sleepAltitudeM": 2475,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Juphal - Nepalgunj - Kathmandu (flights)",
     "description": "Keep spare days for weather.",
     "fromPlace": "Juphal",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2475,
     "highPointM": 2475,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 18,
     "dayLabel": null,
     "title": "Departure from Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Juphal (Dolpa airport)",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "lumbini-pilgrimage-tour",
  "before": {
   "fields": {
    "subtitle": "3 days typical · max 1400 m (Lumbini Pilgrimage Tour)",
    "maxAltitudePoint": "Lumbini Pilgrimage Tour",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Tickets can be bought in cash, by QR code or online at tickets.lumbinidevtrust.gov.np."
   }
  },
  "after": {
   "fields": {
    "subtitle": "The birthplace of the Buddha and its monastic gardens",
    "maxAltitudePoint": "Lumbini",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ],
    "contingency": "Tickets can be bought in cash, by QR code or online at tickets. lumbinidevtrust. gov. np."
   }
  }
 },
 {
  "slug": "makalu-base-camp-trek",
  "before": {
   "fields": {
    "subtitle": "19 days typical · max 4870 m (Makalu Base Camp (Hillary Base Camp))",
    "maxAltitudePoint": "Makalu Base Camp (Hillary Base Camp)",
    "overview": "Remote trek with a steep 1,400 m climb from Tashigaon to Khongma Danda and a high traverse over Shipton La (approx. 4,216 m) and Keke La (approx. 4,127 m), which is crossed twice (in and out). Basic lodges/camping.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Basic lodges along most of the route; some operators run fully supported camping. NTB lists Makalu-Barun NP accommodation as camping."
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Tumlingtar (flight) - jeep to Num",
     1560,
     1560,
     "flight"
    ],
    [
     2,
     null,
     "Num - Arun River - Seduwa",
     1500,
     1560,
     "trek"
    ],
    [
     3,
     null,
     "Seduwa - Tashigaon",
     2100,
     2100,
     "trek"
    ],
    [
     4,
     null,
     "Tashigaon - Khongma Danda",
     3500,
     3500,
     "trek"
    ],
    [
     5,
     null,
     "Acclimatization day at Khongma Danda",
     3500,
     3500,
     "rest-acclimatization"
    ],
    [
     6,
     null,
     "Khongma Danda - Shipton La (approx. 4,216 m) - Keke La - Dobato",
     3650,
     4216,
     "trek"
    ],
    [
     7,
     null,
     "Dobato - Barun valley - Yangle Kharka",
     3600,
     3650,
     "trek"
    ],
    [
     8,
     null,
     "Acclimatisation day at Yangle Kharka: hike up the Barun valley and return",
     3600,
     4000,
     "rest-acclimatization"
    ],
    [
     9,
     null,
     "Yangle Kharka - Langmale Kharka",
     4410,
     4410,
     "trek"
    ],
    [
     10,
     null,
     "Langmale Kharka - Makalu Base Camp",
     4870,
     4870,
     "trek"
    ],
    [
     11,
     null,
     "Exploration day at Makalu Base Camp (toward Swiss Base Camp / Makalu La viewpoints)",
     4870,
     4870,
     "trek"
    ],
    [
     12,
     null,
     "Makalu Base Camp - Yangle Kharka",
     3600,
     4870,
     "trek"
    ],
    [
     13,
     null,
     "Yangle Kharka - Dobato",
     3650,
     3650,
     "trek"
    ],
    [
     14,
     null,
     "Dobato - Keke La - Shipton La - Khongma Danda",
     3500,
     3650,
     "trek"
    ],
    [
     15,
     null,
     "Khongma Danda - Tashigaon",
     2100,
     3500,
     "trek"
    ],
    [
     16,
     null,
     "Tashigaon - Seduwa",
     1500,
     2100,
     "trek"
    ],
    [
     17,
     null,
     "Seduwa - Num",
     1560,
     1560,
     "trek"
    ],
    [
     18,
     null,
     "Num - Tumlingtar (jeep)",
     457,
     1560,
     "city"
    ],
    [
     19,
     null,
     "Tumlingtar - Kathmandu (flight)",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "The wild Barun valley to the foot of Makalu's south face",
    "maxAltitudePoint": "Makalu Base Camp",
    "overview": "Remote trek with a steep 1,400 m climb from Tashigaon to Khongma Danda and a high traverse over Shipton La (about 4,216 m) and Keke La (about 4,127 m), which is crossed twice (in and out). Basic lodges/camping.",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "NTB lists Makalu-Barun NP accommodation as camping."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Tumlingtar (flight) - jeep to Num",
     "description": "Tumlingtar about 457 m. Long rough drive via Khandbari and Chichila.",
     "fromPlace": "Kathmandu",
     "toPlace": "Num",
     "startAltitudeM": 1400,
     "highPointM": 1560,
     "sleepAltitudeM": 1560,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Num - Arun River - Seduwa",
     "description": "Makalu-Barun NP permit registered at Seduwa.",
     "fromPlace": "Num",
     "toPlace": "Seduwa",
     "startAltitudeM": 1560,
     "highPointM": 1560,
     "sleepAltitudeM": 1500,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Seduwa - Tashigaon",
     "description": "Last permanent village.",
     "fromPlace": "Seduwa",
     "toPlace": "Tashigaon",
     "startAltitudeM": 1500,
     "highPointM": 2100,
     "sleepAltitudeM": 2100,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Tashigaon - Khongma Danda",
     "description": "1,400 m ascent through rhododendron and fir forest.",
     "fromPlace": "Tashigaon",
     "toPlace": "Khongma Danda",
     "startAltitudeM": 2100,
     "highPointM": 3500,
     "sleepAltitudeM": 3500,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Acclimatization day at Khongma Danda",
     "description": "",
     "fromPlace": "Khongma Danda",
     "toPlace": "Khongma Danda",
     "startAltitudeM": 3500,
     "highPointM": 3500,
     "sleepAltitudeM": 3500,
     "walkingHours": "2-3",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Khongma Danda - Shipton La (approx. 4,216 m) - Keke La - Dobato",
     "description": "Frozen tarns; first big mountain views.",
     "fromPlace": "Khongma Danda",
     "toPlace": "Dobato",
     "startAltitudeM": 3500,
     "highPointM": 4216,
     "sleepAltitudeM": 3650,
     "walkingHours": "6-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Dobato - Barun valley - Yangle Kharka",
     "description": "Yangle Kharka altitude given 3,557-3,600 m.",
     "fromPlace": "Dobato",
     "toPlace": "Yangle Kharka",
     "startAltitudeM": 3650,
     "highPointM": 3650,
     "sleepAltitudeM": 3600,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Acclimatisation day at Yangle Kharka: hike up the Barun valley and return",
     "description": "Climb high, sleep low before the next night at Langmale Kharka.",
     "fromPlace": "Yangle Kharka",
     "toPlace": "Yangle Kharka",
     "startAltitudeM": 3600,
     "highPointM": 4000,
     "sleepAltitudeM": 3600,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Yangle Kharka - Langmale Kharka",
     "description": "",
     "fromPlace": "Yangle Kharka",
     "toPlace": "Langmale Kharka",
     "startAltitudeM": 3600,
     "highPointM": 4410,
     "sleepAltitudeM": 4410,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Langmale Kharka - Makalu Base Camp",
     "description": "Below Makalu's south face, on the Barun glacier moraine.",
     "fromPlace": "Langmale Kharka",
     "toPlace": "Makalu Base Camp",
     "startAltitudeM": 4410,
     "highPointM": 4870,
     "sleepAltitudeM": 4870,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Exploration day at Makalu Base Camp (toward Swiss Base Camp / Makalu La viewpoints)",
     "description": "On clear days Everest and Lhotse visible; also Baruntse and Chamlang.",
     "fromPlace": "Makalu Base Camp",
     "toPlace": "Makalu Base Camp",
     "startAltitudeM": 4870,
     "highPointM": 4870,
     "sleepAltitudeM": 4870,
     "walkingHours": "4-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Makalu Base Camp - Yangle Kharka",
     "description": "",
     "fromPlace": "Makalu Base Camp",
     "toPlace": "Yangle Kharka",
     "startAltitudeM": 4870,
     "highPointM": 4870,
     "sleepAltitudeM": 3600,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Yangle Kharka - Dobato",
     "description": "",
     "fromPlace": "Yangle Kharka",
     "toPlace": "Dobato",
     "startAltitudeM": 3600,
     "highPointM": 3650,
     "sleepAltitudeM": 3650,
     "walkingHours": "6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Dobato - Keke La - Shipton La - Khongma Danda",
     "description": "",
     "fromPlace": "Dobato",
     "toPlace": "Khongma Danda",
     "startAltitudeM": 3650,
     "highPointM": 3650,
     "sleepAltitudeM": 3500,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Khongma Danda - Tashigaon",
     "description": "",
     "fromPlace": "Khongma Danda",
     "toPlace": "Tashigaon",
     "startAltitudeM": 3500,
     "highPointM": 3500,
     "sleepAltitudeM": 2100,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Tashigaon - Seduwa",
     "description": "",
     "fromPlace": "Tashigaon",
     "toPlace": "Seduwa",
     "startAltitudeM": 2100,
     "highPointM": 2100,
     "sleepAltitudeM": 1500,
     "walkingHours": "4",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Seduwa - Num",
     "description": "",
     "fromPlace": "Seduwa",
     "toPlace": "Num",
     "startAltitudeM": 1500,
     "highPointM": 1560,
     "sleepAltitudeM": 1560,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 18,
     "dayLabel": null,
     "title": "Num - Tumlingtar (jeep)",
     "description": "",
     "fromPlace": "Num",
     "toPlace": "Tumlingtar",
     "startAltitudeM": 1560,
     "highPointM": 1560,
     "sleepAltitudeM": 457,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 19,
     "dayLabel": null,
     "title": "Tumlingtar - Kathmandu (flight)",
     "description": "Keep a contingency day for weather.",
     "fromPlace": "Tumlingtar",
     "toPlace": "Kathmandu",
     "startAltitudeM": 457,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "makalu-expedition",
  "before": {
   "fields": {
    "subtitle": "50 days typical · max 8485 m (Makalu Main summit (Himalayan Database 8,485 m; some operators still print 8,463 m))",
    "maxAltitudePoint": "Makalu Main summit (Himalayan Database 8,485 m; some operators still print 8,463 m)",
    "overview": "Fifth-highest mountain. Isolated four-sided pyramid. Normal commercial line is the 1955 French route via the Makalu La and northwest face/northeast ridge (saddle with Kangchungtse), with a steep French Couloir and an exposed summit ridge/false summit. SST's 2026 page labels the programme 'NW Ridge'. Operators treat it as more technical than Everest. Four camps above Advance Base Camp; supplemental oxygen is normal. Prior 7,000 m experience is typically required.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "acclimatizationNotes": "SST rotation block is roughly days 15-30, then a summit window. Helicopter-to-ABC programmes acclimatise in Khumbu first (e.g. Chhukung) then fly to ABC."
   },
   "days": [
    [
     1,
     "1-2",
     "Arrive Kathmandu; DoT briefing, permits, gear check",
     1400,
     1400,
     "travel"
    ],
    [
     3,
     null,
     "Fly Kathmandu - Tumlingtar - jeep to Num",
     1560,
     1560,
     "flight"
    ],
    [
     4,
     "4-5",
     "Trek Num - Arun River - Seduwa - Tashigaon",
     2070,
     2070,
     "trek"
    ],
    [
     6,
     "6-7",
     "Tashigaon rest; then steep climb to Khongma Danda",
     3500,
     3760,
     "trek"
    ],
    [
     8,
     "8-10",
     "Khongma - Shipton La (about 4,200 m) - Keke La - Dobato - Yangle Kharka - Langmale Kharka",
     4450,
     4450,
     "trek"
    ],
    [
     11,
     "11-14",
     "Langmale - Lower / Hillary Base Camp (about 4,850-5,000 m); rest; move to Advance / Higher Base Camp (about 5,600-5,700 m)",
     5600,
     5600,
     "trek"
    ],
    [
     15,
     "15-30",
     "Puja and rotations: ABC - Camp 1 (about 6,100-6,300 m) - Camp 2 (about 6,500-7,000 m) - touch toward Makalu La / Camp 3 - return to ABC",
     5600,
     6300,
     "trek"
    ],
    [
     31,
     "31-42",
     "Summit window: Camp 3 on/near Makalu La (about 7,400-7,500 m) - Camp 4 (about 7,600-7,900 m, north ridge) - French Couloir - summit ridge - 8,485 m - descend to C2/ABC",
     7800,
     8485,
     "summit"
    ],
    [
     43,
     "43-49",
     "Clean ABC/BC; trek out Yangle - Khongma - Tashigaon - Seduwa - Num; jeep Tumlingtar; fly Kathmandu",
     1400,
     7800,
     "flight"
    ],
    [
     50,
     null,
     "Buffer / departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "The fifth-highest mountain, a striking granite pyramid",
    "maxAltitudePoint": "Makalu summit",
    "overview": "Fifth-highest mountain. Isolated four-sided pyramid. Normal commercial line is the 1955 French route via the Makalu La and northwest face/northeast ridge (saddle with Kangchungtse), with a steep French Couloir and an exposed summit ridge/false summit. SST's 2026 page labels the programme 'NW Ridge'. Four camps above Advance Base Camp; supplemental oxygen is normal. Prior 7,000 m experience is typically required.",
    "inclusions": [
     "An experienced expedition leader and climbing Sherpa support as agreed in your plan",
     "The expedition permit and government fees",
     "Base camp tents, kitchen and cook team",
     "High-camp tents and fixed-rope fees",
     "Transport and domestic flights shown in the itinerary"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue and mountaineering cover",
     "Personal climbing equipment",
     "Summit bonus and tips for climbing Sherpas and staff"
    ],
    "acclimatizationNotes": "SST rotation block is roughly days 15-30, then a summit window. Helicopter-to-ABC programmes acclimatise in Khumbu first (e. g. Chhukung) then fly to ABC."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": "1-2",
     "title": "Arrive Kathmandu; DoT briefing, permits, gear check",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Fly Kathmandu - Tumlingtar - jeep to Num",
     "description": "Tumlingtar about 450-520 m. Rough road via Khandbari.",
     "fromPlace": "Kathmandu",
     "toPlace": "Num",
     "startAltitudeM": 1400,
     "highPointM": 1560,
     "sleepAltitudeM": 1560,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 4,
     "dayLabel": "4-5",
     "title": "Trek Num - Arun River - Seduwa - Tashigaon",
     "description": "Last permanent village. Makalu Barun NP check at Seduwa.",
     "fromPlace": "Num",
     "toPlace": "Tashigaon",
     "startAltitudeM": 1560,
     "highPointM": 2070,
     "sleepAltitudeM": 2070,
     "walkingHours": "5-6 per day",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": "6-7",
     "title": "Tashigaon rest; then steep climb to Khongma Danda",
     "description": "",
     "fromPlace": "Tashigaon",
     "toPlace": "Khongma",
     "startAltitudeM": 2070,
     "highPointM": 3760,
     "sleepAltitudeM": 3500,
     "walkingHours": "5-7 on the climb day",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": "8-10",
     "title": "Khongma - Shipton La (about 4,200 m) - Keke La - Dobato - Yangle Kharka - Langmale Kharka",
     "description": "Same high traverse as the Makalu Base Camp trek.",
     "fromPlace": "Khongma",
     "toPlace": "Langmale Kharka",
     "startAltitudeM": 3500,
     "highPointM": 4450,
     "sleepAltitudeM": 4450,
     "walkingHours": "5-8 per day",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": "11-14",
     "title": "Langmale - Lower / Hillary Base Camp (about 4,850-5,000 m); rest; move to Advance / Higher Base Camp (about 5,600-5,700 m)",
     "description": "SST places ABC at 5,600 m.",
     "fromPlace": "Langmale Kharka",
     "toPlace": "ABC",
     "startAltitudeM": 4450,
     "highPointM": 5600,
     "sleepAltitudeM": 5600,
     "walkingHours": "4-5 to ABC",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": "15-30",
     "title": "Puja and rotations: ABC - Camp 1 (about 6,100-6,300 m) - Camp 2 (about 6,500-7,000 m) - touch toward Makalu La / Camp 3 - return to ABC",
     "description": "",
     "fromPlace": "ABC",
     "toPlace": "ABC and Camps 1-2",
     "startAltitudeM": 5600,
     "highPointM": 6300,
     "sleepAltitudeM": 5600,
     "walkingHours": "4-6 per camp stage",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 31,
     "dayLabel": "31-42",
     "title": "Summit window: Camp 3 on/near Makalu La (about 7,400-7,500 m) - Camp 4 (about 7,600-7,900 m, north ridge) - French Couloir - summit ridge - 8,485 m - descend to C2/ABC",
     "description": "Oxygen used by commercial teams. False summit before the pointed true summit.",
     "fromPlace": "ABC and Camps 1-2",
     "toPlace": "High camps",
     "startAltitudeM": 5600,
     "highPointM": 8485,
     "sleepAltitudeM": 7800,
     "walkingHours": "7-8 from Camp 4 (SST)",
     "dayType": "summit",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 43,
     "dayLabel": "43-49",
     "title": "Clean ABC/BC; trek out Yangle - Khongma - Tashigaon - Seduwa - Num; jeep Tumlingtar; fly Kathmandu",
     "description": "Helicopter ABC-Tumlingtar used by some teams.",
     "fromPlace": "High camps",
     "toPlace": "Lodges then Kathmandu",
     "startAltitudeM": 7800,
     "highPointM": 7800,
     "sleepAltitudeM": 1400,
     "walkingHours": "5-7 per day",
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 50,
     "dayLabel": null,
     "title": "Buffer / departure",
     "description": "",
     "fromPlace": "Lodges then Kathmandu",
     "toPlace": "Tumlingtar / Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "manaslu-circuit-trek",
  "before": {
   "fields": {
    "subtitle": "13 days typical · max 5106 m (Larkya La (Larke La) pass - UNVERIFIED exact height (5,106 m vs 5,160 m in sources))",
    "maxAltitudePoint": "Larkya La (Larke La) pass - UNVERIFIED exact height (5,106 m vs 5,160 m in sources)",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Dharamsala (Larkya Phedi) has only basic dormitory-style lodges or tents. As of mid-Oct 2026 the Arughat Bailey bridge was under construction after flood damage. [s4, s13, s15]",
    "acclimatizationNotes": "Standard is one rest day at Samagaon; longer itineraries add a second (e.g. Samdo). [s4, s5]"
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Arughat - Soti Khola - Machha Khola (drive)",
     930,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Machha Khola - Khorlabesi - Tatopani - Dobhan - Jagat",
     1340,
     1340,
     "trek"
    ],
    [
     3,
     null,
     "Jagat - Salleri - Sirdibas - Philim - Deng",
     1860,
     1860,
     "trek"
    ],
    [
     4,
     null,
     "Deng - Rana - Bihi Phedi - Ghap - Namrung",
     2630,
     2630,
     "trek"
    ],
    [
     5,
     null,
     "Namrung - Lihi - Sho - Lho",
     3180,
     3180,
     "trek"
    ],
    [
     6,
     null,
     "Lho - Shyala - Samagaon",
     3530,
     3530,
     "trek"
    ],
    [
     7,
     null,
     "Acclimatization day at Samagaon (optional hike towards Manaslu Base Camp or Pungyen Gompa)",
     3530,
     3530,
     "rest-acclimatization"
    ],
    [
     8,
     null,
     "Samagaon - Samdo",
     3860,
     3875,
     "trek"
    ],
    [
     9,
     null,
     "Acclimatisation day at Samdo: hike up toward the Tibet border trail and return",
     3860,
     4500,
     "rest-acclimatization"
    ],
    [
     10,
     null,
     "Samdo - Larkya Bazaar ruins - Dharamsala (Larkya Phedi)",
     4460,
     4460,
     "trek"
    ],
    [
     11,
     null,
     "Dharamsala - Larkya La - Bimthang",
     3720,
     5106,
     "trek"
    ],
    [
     12,
     null,
     "Bimthang - Gho - Tilije - Dharapani",
     1860,
     3720,
     "trek"
    ],
    [
     13,
     null,
     "Dharapani - Besisahar - Kathmandu (drive)",
     1400,
     1860,
     "travel"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Round the eighth-highest mountain and over the Larkya La",
    "maxAltitudePoint": "Larkya La pass",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Dharamsala (Larkya Phedi) has only basic dormitory-style lodges or tents. As of mid-Oct 2026 the Arughat Bailey bridge was under construction after flood damage.",
    "acclimatizationNotes": "Standard is one rest day at Samagaon; longer itineraries add a second (e. g. Samdo)."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Arughat - Soti Khola - Machha Khola (drive)",
     "description": "Drive of about 8-10 hours. After the 11 Oct 2026 Budhi Gandaki flood the Arughat and Soti bridges were washed out; check road status.",
     "fromPlace": "Kathmandu",
     "toPlace": "Machha Khola",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 930,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Machha Khola - Khorlabesi - Tatopani - Dobhan - Jagat",
     "description": "Jagat is the restricted-area entry checkpoint (RAP and MCAP checked).",
     "fromPlace": "Machha Khola",
     "toPlace": "Jagat",
     "startAltitudeM": 930,
     "highPointM": 1340,
     "sleepAltitudeM": 1340,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Jagat - Salleri - Sirdibas - Philim - Deng",
     "description": "Tsum Valley turn-off near Lokpa/Philim.",
     "fromPlace": "Jagat",
     "toPlace": "Deng",
     "startAltitudeM": 1340,
     "highPointM": 1860,
     "sleepAltitudeM": 1860,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Deng - Rana - Bihi Phedi - Ghap - Namrung",
     "description": "Second permit checkpoint at Namrung.",
     "fromPlace": "Deng",
     "toPlace": "Namrung",
     "startAltitudeM": 1860,
     "highPointM": 2630,
     "sleepAltitudeM": 2630,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Namrung - Lihi - Sho - Lho",
     "description": "Ribung monastery; first big view of Manaslu.",
     "fromPlace": "Namrung",
     "toPlace": "Lho",
     "startAltitudeM": 2630,
     "highPointM": 3180,
     "sleepAltitudeM": 3180,
     "walkingHours": null,
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Lho - Shyala - Samagaon",
     "description": "",
     "fromPlace": "Lho",
     "toPlace": "Samagaon (Sama Gaun)",
     "startAltitudeM": 3180,
     "highPointM": 3530,
     "sleepAltitudeM": 3530,
     "walkingHours": null,
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Acclimatization day at Samagaon (optional hike towards Manaslu Base Camp or Pungyen Gompa)",
     "description": "",
     "fromPlace": "Samagaon (Sama Gaun)",
     "toPlace": "Samagaon",
     "startAltitudeM": 3530,
     "highPointM": 3530,
     "sleepAltitudeM": 3530,
     "walkingHours": "4-6",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Samagaon - Samdo",
     "description": "",
     "fromPlace": "Samagaon",
     "toPlace": "Samdo",
     "startAltitudeM": 3530,
     "highPointM": 3875,
     "sleepAltitudeM": 3860,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Acclimatisation day at Samdo: hike up toward the Tibet border trail and return",
     "description": "Climb high, sleep low before Dharamsala and the Larkya La.",
     "fromPlace": "Samdo",
     "toPlace": "Samdo",
     "startAltitudeM": 3860,
     "highPointM": 4500,
     "sleepAltitudeM": 3860,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Samdo - Larkya Bazaar ruins - Dharamsala (Larkya Phedi)",
     "description": "Basic stone lodges/dormitories or tents, no village.",
     "fromPlace": "Samdo",
     "toPlace": "Dharamsala (Larkya Phedi)",
     "startAltitudeM": 3860,
     "highPointM": 4460,
     "sleepAltitudeM": 4460,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Dharamsala - Larkya La - Bimthang",
     "description": "Pass day; pre-dawn start.",
     "fromPlace": "Dharamsala (Larkya Phedi)",
     "toPlace": "Bimthang (Bimtang)",
     "startAltitudeM": 4460,
     "highPointM": 5106,
     "sleepAltitudeM": 3720,
     "walkingHours": "8-11",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Bimthang - Gho - Tilije - Dharapani",
     "description": "ACAP checkpoint at Dharapani.",
     "fromPlace": "Bimthang (Bimtang)",
     "toPlace": "Dharapani (some itineraries stop at Tilije, 2,300 m)",
     "startAltitudeM": 3720,
     "highPointM": 3720,
     "sleepAltitudeM": 1860,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Dharapani - Besisahar - Kathmandu (drive)",
     "description": "Jeep Dharapani - Besisahar about 3-4 hours, then road to Kathmandu.",
     "fromPlace": "Dharapani (some itineraries stop at Tilije, 2,300 m)",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1860,
     "highPointM": 1860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "manaslu-expedition",
  "before": {
   "fields": {
    "subtitle": "38 days typical · max 8163 m (Manaslu true summit)",
    "maxAltitudePoint": "Manaslu true summit",
    "overview": "Eighth-highest mountain; Northeast Face normal route with four camps above base camp. Considered a comparatively 'achievable' 8,000 m peak but with ice cliffs below Camp 4, avalanche-prone slopes and an exposed, corniced final ridge to the true summit. [s5, s9]",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Lodges in Samagaon; tented base camp and high camps. The 11 Oct 2026 Budhi Gandaki flood destroyed the lower trail between Jagat and Philim, affecting overland walk-outs. [s5, s8, s15]",
    "acclimatizationNotes": "Several days at Samagaon and base camp, then rotations through the camps before the summit window. [s5]"
   },
   "days": [
    [
     1,
     "1-2",
     "Arrival in Kathmandu; briefing, gear check, permits",
     1400,
     1400,
     "city"
    ],
    [
     3,
     null,
     "Helicopter Kathmandu - Samagaon",
     3500,
     3500,
     "trek"
    ],
    [
     4,
     "4-7",
     "Acclimatization treks around Samagaon",
     3500,
     3500,
     "rest-acclimatization"
    ],
    [
     8,
     null,
     "Samagaon - Manaslu Base Camp",
     4800,
     4800,
     "trek"
    ],
    [
     9,
     "9-21",
     "Puja and acclimatization rotations to Camp 1 (approx. 5,500-5,700 m), Camp 2 (approx. 6,250-6,400 m) and Camp 3 (approx. 6,800 m)",
     4800,
     5700,
     "rest-acclimatization"
    ],
    [
     22,
     "22-32",
     "Summit window: Camp 4 (approx. 7,400-7,450 m) and summit, descend to Base Camp",
     4800,
     8163,
     "summit"
    ],
    [
     33,
     "33-37",
     "Descend to Samagaon, trek out to Soti Khola (or helicopter) and drive to Kathmandu",
     1400,
     4800,
     "travel"
    ],
    [
     38,
     null,
     "Departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "The eighth-highest summit, from Samagaon",
    "maxAltitudePoint": "Manaslu summit",
    "overview": "Eighth-highest mountain; Northeast Face normal route with four camps above base camp. Considered a comparatively 'achievable' 8,000 m peak but with ice cliffs below Camp 4, avalanche-prone slopes and an exposed, corniced final ridge to the true summit.",
    "inclusions": [
     "An experienced expedition leader and climbing Sherpa support as agreed in your plan",
     "The expedition permit and government fees",
     "Base camp tents, kitchen and cook team",
     "High-camp tents and fixed-rope fees",
     "Transport and domestic flights shown in the itinerary"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue and mountaineering cover",
     "Personal climbing equipment",
     "Summit bonus and tips for climbing Sherpas and staff"
    ],
    "contingency": "Lodges in Samagaon; tented base camp and high camps. The 11 Oct 2026 Budhi Gandaki flood destroyed the lower trail between Jagat and Philim, affecting overland walk-outs.",
    "acclimatizationNotes": "Several days at Samagaon and base camp, then rotations through the camps before the summit window."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": "1-2",
     "title": "Arrival in Kathmandu; briefing, gear check, permits",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Helicopter Kathmandu - Samagaon",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Samagaon",
     "startAltitudeM": 1400,
     "highPointM": 3500,
     "sleepAltitudeM": 3500,
     "walkingHours": null,
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": "4-7",
     "title": "Acclimatization treks around Samagaon",
     "description": "",
     "fromPlace": "Samagaon",
     "toPlace": "Samagaon",
     "startAltitudeM": 3500,
     "highPointM": 3500,
     "sleepAltitudeM": 3500,
     "walkingHours": null,
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Samagaon - Manaslu Base Camp",
     "description": "",
     "fromPlace": "Samagaon",
     "toPlace": "Base Camp",
     "startAltitudeM": 3500,
     "highPointM": 4800,
     "sleepAltitudeM": 4800,
     "walkingHours": null,
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": "9-21",
     "title": "Puja and acclimatization rotations to Camp 1 (approx. 5,500-5,700 m), Camp 2 (approx. 6,250-6,400 m) and Camp 3 (approx. 6,800 m)",
     "description": "",
     "fromPlace": "Base Camp",
     "toPlace": "Base Camp and high camps",
     "startAltitudeM": 4800,
     "highPointM": 5700,
     "sleepAltitudeM": 4800,
     "walkingHours": null,
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 22,
     "dayLabel": "22-32",
     "title": "Summit window: Camp 4 (approx. 7,400-7,450 m) and summit, descend to Base Camp",
     "description": "",
     "fromPlace": "Base Camp and high camps",
     "toPlace": "High camps",
     "startAltitudeM": 4800,
     "highPointM": 8163,
     "sleepAltitudeM": 4800,
     "walkingHours": null,
     "dayType": "summit",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 33,
     "dayLabel": "33-37",
     "title": "Descend to Samagaon, trek out to Soti Khola (or helicopter) and drive to Kathmandu",
     "description": "",
     "fromPlace": "High camps",
     "toPlace": "Kathmandu",
     "startAltitudeM": 4800,
     "highPointM": 4800,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 38,
     "dayLabel": null,
     "title": "Departure",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "mardi-himal-trek",
  "before": {
   "fields": {
    "subtitle": "5 days typical · max 4500 m (Mardi Himal Base Camp (Upper Viewpoint at 4,200 m is the common turnaround))",
    "maxAltitudePoint": "Mardi Himal Base Camp (Upper Viewpoint at 4,200 m is the common turnaround)",
    "overview": "Ridge trek; summit-day from High Camp (3,580 m) to Upper Viewpoint (4,200 m) or Base Camp (~4,500 m) is the hardest day, with exposed, windy ridge and a long descent. Forest Camp to High Camp is a ~1,000 m sleeping-altitude gain if done in one day. [s4][s5]",
    "highlights": [
     "Close views of Machhapuchhre (Fishtail) from Badal Danda and the ridge [s4][s5]",
     "Sunrise over Annapurna South, Hiunchuli and Dhaulagiri from the Upper Viewpoint [s5]",
     "Quiet rhododendron forest stages [s4]",
     "Short access from Pokhara [s4]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Basic teahouses at Forest Camp, Low Camp, Badal Danda and High Camp; High Camp rooms are basic with shared bathrooms. [s5]",
    "acclimatizationNotes": "No rest day in the standard 5-day plan; splitting at Low Camp or Badal Danda is advised for slower trekkers. [s4]"
   },
   "days": [
    [
     1,
     null,
     "Pokhara - Kande (drive) - Australian Camp (2,060 m) - Pitam Deurali",
     2100,
     2100,
     "trek"
    ],
    [
     2,
     null,
     "Pitam Deurali - Forest Camp",
     2550,
     2600,
     "trek"
    ],
    [
     3,
     null,
     "Forest Camp - Low Camp - Badal Danda - High Camp",
     3580,
     3580,
     "trek"
    ],
    [
     4,
     null,
     "High Camp - Upper Viewpoint (4,200 m) - Mardi Himal Base Camp (~4,500 m, optional) - descend to Low Camp/Badal Danda",
     2985,
     4500,
     "trek"
    ],
    [
     5,
     null,
     "Low Camp - Siding - drive to Pokhara",
     822,
     2985,
     "trek"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A short ridge trek straight at the face of Machhapuchhre",
    "maxAltitudePoint": "Mardi Himal Base Camp",
    "overview": "Ridge trek; summit-day from High Camp (3,580 m) to Upper Viewpoint (4,200 m) or Base Camp (about 4,500 m) is the hardest day, with exposed, windy ridge and a long descent. Forest Camp to High Camp is a about 1,000 m sleeping-altitude gain if done in one day.",
    "highlights": [
     "Close views of Machhapuchhre (Fishtail) from Badal Danda and the ridge",
     "Sunrise over Annapurna South, Hiunchuli and Dhaulagiri from the Upper Viewpoint",
     "Quiet rhododendron forest stages",
     "Short access from Pokhara"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Basic teahouses at Forest Camp, Low Camp, Badal Danda and High Camp; High Camp rooms are basic with shared bathrooms.",
    "acclimatizationNotes": "No rest day in the standard 5-day plan; splitting at Low Camp or Badal Danda is advised for slower trekkers."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Pokhara - Kande (drive) - Australian Camp (2,060 m) - Pitam Deurali",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Pitam Deurali",
     "startAltitudeM": 1400,
     "highPointM": 2100,
     "sleepAltitudeM": 2100,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Pitam Deurali - Forest Camp",
     "description": "Dense rhododendron/oak forest, few views.",
     "fromPlace": "Pitam Deurali",
     "toPlace": "Forest Camp",
     "startAltitudeM": 2100,
     "highPointM": 2600,
     "sleepAltitudeM": 2550,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Forest Camp - Low Camp - Badal Danda - High Camp",
     "description": "Low Camp about 2,985 m; Badal Danda about 3,210 m. Sleeping at Low Camp/Badal Danda is a safer option.",
     "fromPlace": "Forest Camp",
     "toPlace": "High Camp",
     "startAltitudeM": 2550,
     "highPointM": 3580,
     "sleepAltitudeM": 3580,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "High Camp - Upper Viewpoint (4,200 m) - Mardi Himal Base Camp (~4,500 m, optional) - descend to Low Camp/Badal Danda",
     "description": "Pre-dawn start; MBC is about 1. 5 h beyond the Upper Viewpoint.",
     "fromPlace": "High Camp",
     "toPlace": "Low Camp",
     "startAltitudeM": 3580,
     "highPointM": 4500,
     "sleepAltitudeM": 2985,
     "walkingHours": "6-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Low Camp - Siding - drive to Pokhara",
     "description": "",
     "fromPlace": "Low Camp",
     "toPlace": "Pokhara",
     "startAltitudeM": 2985,
     "highPointM": 2985,
     "sleepAltitudeM": 822,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "mera-peak-climbing",
  "before": {
   "fields": {
    "subtitle": "20 days typical · max 6470 m (Mera Peak (NMA / Himalayan Database height; commercial programmes often aim at Mera North 6,476 m or Mera Central 6,461 m))",
    "maxAltitudePoint": "Mera Peak (NMA / Himalayan Database height; commercial programmes often aim at Mera North 6,476 m or Mera Central 6,461 m)",
    "overview": "Highest NMA trekking peak. Standard route is glaciated walking: rope up for crevasses on the Mera Glacier, crampons and ice axe, moderate snow slopes (operators cite about 25-35 degrees). No headwall and usually no fixed ropes on the normal line (unlike Island Peak). Difficulty is altitude and a 10-14 h summit day from High Camp, not steep ice. Commercial teams usually tag Mera Central; Mera North is a short further traverse.",
    "highlights": [
     "Highest NMA trekking peak (NMA 6,470 m)",
     "Hinku valley approach, quieter than the Khumbu EBC trail",
     "Summit panorama of five 8,000 m peaks reported by operators (Everest, Lhotse, Makalu, Kanchenjunga, Cho Oyu) on a clear morning",
     "Mera La and the Mera Glacier",
     "First ascent of the trekking-peak massif: May 1953, J. O. M. Roberts and Sen Tenzing (Himalayan Database notes they climbed 'false Mera'; Wikipedia assigns Central to 20 May 1953 and North to 1975, Marcel Jolly, G. Baus and L. Honills)"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu (or Manthali) - Lukla (flight) - Paiya (Chutok)",
     2730,
     2730,
     "flight"
    ],
    [
     3,
     null,
     "Paiya - Pangom",
     2850,
     2850,
     "trek"
    ],
    [
     4,
     null,
     "Pangom - Ningsow (Ningsow)",
     2960,
     2960,
     "trek"
    ],
    [
     5,
     null,
     "Ningsow - Chhatra Khola (Chhetra Khola)",
     3100,
     3100,
     "trek"
    ],
    [
     6,
     null,
     "Chhatra Khola - Kothe",
     3600,
     3600,
     "trek"
    ],
    [
     7,
     null,
     "Acclimatisation day at Kothe: hike up the Hinku valley and return",
     3600,
     4000,
     "rest-acclimatization"
    ],
    [
     8,
     null,
     "Kothe - Thangnak (Thaknak)",
     4350,
     4350,
     "trek"
    ],
    [
     9,
     null,
     "Acclimatisation day at Thangnak: hike above the village toward the Charpate glacier and return",
     4350,
     4700,
     "rest-acclimatization"
    ],
    [
     10,
     null,
     "Thangnak - Khare",
     4945,
     5045,
     "trek"
    ],
    [
     11,
     null,
     "Acclimatisation at Khare: hike toward Mera La, crampon practice",
     4945,
     5415,
     "rest-acclimatization"
    ],
    [
     12,
     null,
     "Khare - Mera La - High Camp",
     5780,
     5800,
     "trek"
    ],
    [
     13,
     null,
     "Summit Mera Peak - return to Khare",
     4945,
     6470,
     "summit"
    ],
    [
     14,
     null,
     "Reserve / recovery at Khare",
     4945,
     4945,
     "contingency"
    ],
    [
     15,
     null,
     "Khare - Kothe",
     3600,
     4945,
     "trek"
    ],
    [
     16,
     null,
     "Kothe - Thuli Kharka",
     4300,
     4300,
     "trek"
    ],
    [
     17,
     null,
     "Thuli Kharka - Zatrwa La (about 4,610 m) - Lukla",
     2860,
     4610,
     "trek"
    ],
    [
     18,
     null,
     "Lukla - Kathmandu (flight; or via Manthali)",
     1400,
     2860,
     "flight"
    ],
    [
     19,
     null,
     "Buffer day",
     1400,
     1400,
     "contingency"
    ],
    [
     20,
     null,
     "Departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Nepal's highest trekking peak, with five 8,000 m peaks in view",
    "maxAltitudePoint": "Mera Peak summit",
    "overview": "Highest NMA trekking peak. No headwall and usually no fixed ropes on the normal line (unlike Island Peak). Difficulty is altitude and a 10-14 h summit day from High Camp, not steep ice. Commercial teams usually tag Mera Central; Mera North is a short further traverse.",
    "highlights": [
     "Highest NMA trekking peak (NMA 6,470 m)",
     "Hinku valley approach, quieter than the Khumbu EBC trail",
     "Mera La and the Mera Glacier",
     "First ascent of the trekking-peak massif: May 1953, J. O. M. Baus and L. Honills)"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu",
     "A licensed climbing guide for the summit day",
     "The peak climbing permit",
     "Group climbing equipment: fixed ropes and camp tents"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters",
     "Personal climbing gear (boots, harness, crampons), which can be rented in Kathmandu"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "Briefing, gear check, NMA permit paperwork.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu (or Manthali) - Lukla (flight) - Paiya (Chutok)",
     "description": "South of the main EBC trail.",
     "fromPlace": "Kathmandu",
     "toPlace": "Paiya",
     "startAltitudeM": 1400,
     "highPointM": 2730,
     "sleepAltitudeM": 2730,
     "walkingHours": "3-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Paiya - Pangom",
     "description": "",
     "fromPlace": "Paiya",
     "toPlace": "Pangom",
     "startAltitudeM": 2730,
     "highPointM": 2850,
     "sleepAltitudeM": 2850,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Pangom - Ningsow (Ningsow)",
     "description": "",
     "fromPlace": "Pangom",
     "toPlace": "Ningsow",
     "startAltitudeM": 2850,
     "highPointM": 2960,
     "sleepAltitudeM": 2960,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Ningsow - Chhatra Khola (Chhetra Khola)",
     "description": "",
     "fromPlace": "Ningsow",
     "toPlace": "Chhatra Khola",
     "startAltitudeM": 2960,
     "highPointM": 3100,
     "sleepAltitudeM": 3100,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Chhatra Khola - Kothe",
     "description": "Enter the Hinku valley.",
     "fromPlace": "Chhatra Khola",
     "toPlace": "Kothe",
     "startAltitudeM": 3100,
     "highPointM": 3600,
     "sleepAltitudeM": 3600,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Acclimatisation day at Kothe: hike up the Hinku valley and return",
     "description": "Climb high, sleep low before Thangnak.",
     "fromPlace": "Kothe",
     "toPlace": "Kothe",
     "startAltitudeM": 3600,
     "highPointM": 4000,
     "sleepAltitudeM": 3600,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Kothe - Thangnak (Thaknak)",
     "description": "",
     "fromPlace": "Kothe",
     "toPlace": "Thangnak",
     "startAltitudeM": 3600,
     "highPointM": 4350,
     "sleepAltitudeM": 4350,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Acclimatisation day at Thangnak: hike above the village toward the Charpate glacier and return",
     "description": "Climb high, sleep low before Khare.",
     "fromPlace": "Thangnak",
     "toPlace": "Thangnak",
     "startAltitudeM": 4350,
     "highPointM": 4700,
     "sleepAltitudeM": 4350,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Thangnak - Khare",
     "description": "",
     "fromPlace": "Thangnak",
     "toPlace": "Khare",
     "startAltitudeM": 4350,
     "highPointM": 5045,
     "sleepAltitudeM": 4945,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Acclimatisation at Khare: hike toward Mera La, crampon practice",
     "description": "Mera La about 5,415 m.",
     "fromPlace": "Khare",
     "toPlace": "Khare",
     "startAltitudeM": 4945,
     "highPointM": 5415,
     "sleepAltitudeM": 4945,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Khare - Mera La - High Camp",
     "description": "",
     "fromPlace": "Khare",
     "toPlace": "Mera High Camp",
     "startAltitudeM": 4945,
     "highPointM": 5800,
     "sleepAltitudeM": 5780,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Summit Mera Peak - return to Khare",
     "description": "Midnight-2 am start; glacier, snow slopes, Central and/or North summit; descend the same day.",
     "fromPlace": "Mera High Camp",
     "toPlace": "Khare",
     "startAltitudeM": 5780,
     "highPointM": 6470,
     "sleepAltitudeM": 4945,
     "walkingHours": "10-14",
     "dayType": "summit",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Reserve / recovery at Khare",
     "description": "",
     "fromPlace": "Khare",
     "toPlace": "Khare",
     "startAltitudeM": 4945,
     "highPointM": 4945,
     "sleepAltitudeM": 4945,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Khare - Kothe",
     "description": "",
     "fromPlace": "Khare",
     "toPlace": "Kothe",
     "startAltitudeM": 4945,
     "highPointM": 4945,
     "sleepAltitudeM": 3600,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Kothe - Thuli Kharka",
     "description": "Climb toward Zatrwa La.",
     "fromPlace": "Kothe",
     "toPlace": "Thuli Kharka",
     "startAltitudeM": 3600,
     "highPointM": 4300,
     "sleepAltitudeM": 4300,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Thuli Kharka - Zatrwa La (about 4,610 m) - Lukla",
     "description": "",
     "fromPlace": "Thuli Kharka",
     "toPlace": "Lukla",
     "startAltitudeM": 4300,
     "highPointM": 4610,
     "sleepAltitudeM": 2860,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 18,
     "dayLabel": null,
     "title": "Lukla - Kathmandu (flight; or via Manthali)",
     "description": "",
     "fromPlace": "Lukla",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2860,
     "highPointM": 2860,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 19,
     "dayLabel": null,
     "title": "Buffer day",
     "description": "Lukla flight contingency.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 20,
     "dayLabel": null,
     "title": "Departure",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "mountain-biking-kathmandu-valley",
  "before": {
   "fields": {
    "subtitle": "5 days typical · max 2195 m (Nagarkot (reported; Shivapuri ridge trails may be higher - Shivapuri peak is 2,732 m but not on standard routes))",
    "maxAltitudePoint": "Nagarkot (reported; Shivapuri ridge trails may be higher - Shivapuri peak is 2,732 m but not on standard routes)",
    "overview": "Mix of jeep tracks, single track and paved sections with long climbs; some technical, steep descents (e.g. Shivapuri 'Scar Road', 'Widow Maker') and possible bike carrying in wet season. Day rides around Shivapuri/Nagarjun can be easier.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "acclimatizationNotes": "Riding stays below ~2,200 m; no acclimatization needed."
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Budhanilkantha (transfer) - ride through Shivapuri Nagarjun National Park - Mulkharka - Chisapani",
     2140,
     2140,
     "trek"
    ],
    [
     2,
     null,
     "Chisapani - Nagarkot along the northern/eastern rim, off-road trails and villages",
     2195,
     2195,
     "trek"
    ],
    [
     3,
     null,
     "Nagarkot - Nala - Dhulikhel - Namobuddha (~70% off-road)",
     2195,
     2195,
     "city"
    ],
    [
     4,
     null,
     "Namobuddha - Panauti - Lakuri Bhanjyang forest ridge",
     2195,
     2195,
     "city"
    ],
    [
     5,
     null,
     "Lakuri Bhanjyang - ridge single track - Godawari - transfer to Kathmandu",
     2195,
     2195,
     "city"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Ridge trails, villages and temples on two wheels",
    "maxAltitudePoint": "Nagarkot",
    "overview": "Mix of jeep tracks, single track and paved sections with long climbs; some technical, steep descents (e. g. Shivapuri 'Scar Road', 'Widow Maker') and possible bike carrying in wet season. Day rides around Shivapuri/Nagarjun can be easier.",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ],
    "acclimatizationNotes": "Riding stays below about 2,200 m; no acclimatization needed."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Budhanilkantha (transfer) - ride through Shivapuri Nagarjun National Park - Mulkharka - Chisapani",
     "description": "Park entry fee paid at the gate (e-ticketing available).",
     "fromPlace": "Kathmandu",
     "toPlace": "Chisapani",
     "startAltitudeM": 1400,
     "highPointM": 2140,
     "sleepAltitudeM": 2140,
     "walkingHours": null,
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Chisapani - Nagarkot along the northern/eastern rim, off-road trails and villages",
     "description": "",
     "fromPlace": "Chisapani",
     "toPlace": "Nagarkot",
     "startAltitudeM": 2140,
     "highPointM": 2195,
     "sleepAltitudeM": 2195,
     "walkingHours": null,
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Nagarkot - Nala - Dhulikhel - Namobuddha (~70% off-road)",
     "description": "",
     "fromPlace": "Nagarkot",
     "toPlace": "Namobuddha",
     "startAltitudeM": 2195,
     "highPointM": 2195,
     "sleepAltitudeM": 2195,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Namobuddha - Panauti - Lakuri Bhanjyang forest ridge",
     "description": "",
     "fromPlace": "Namobuddha",
     "toPlace": "Lakuri Bhanjyang",
     "startAltitudeM": 2195,
     "highPointM": 2195,
     "sleepAltitudeM": 2195,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Lakuri Bhanjyang - ridge single track - Godawari - transfer to Kathmandu",
     "description": "",
     "fromPlace": "Lakuri Bhanjyang",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2195,
     "highPointM": 2195,
     "sleepAltitudeM": 2195,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "teahouse"
    }
   ]
  }
 },
 {
  "slug": "nar-phu-valley-trek",
  "before": {
   "fields": {
    "subtitle": "13 days typical · max 5320 m (Kang La pass)",
    "overview": "Remote restricted-area trek with sleeping altitudes above 4,000 m at Phu and Nar and a long Kang La (5,320 m) crossing to Ngawal (8-9 h, steep knee-heavy descent). Koto-Meta is a ~960 m sleeping-altitude gain. [s5][s6][s7]",
    "highlights": [
     "Medieval stone villages of Phu and Nar [s6]",
     "Tashi Lhakhang monastery in Phu and Satek Gompa at Nar Phedi [s6]",
     "Kang La (5,320 m) panorama of Annapurna II, III, IV and Gangapurna [s7]",
     "Phu Khola gorge, canyons and kani gateways [s6]",
     "Few trekkers due to restricted status [s6]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Basic lodges at Meta, Kyang, Phu, Nar Phedi and Nar; Kang La Phedi stage, if used, may require camping. [s7]",
    "acclimatizationNotes": "Rest day at Phu standard; optional second rest day at Nar before Kang La. [s5][s7]"
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu - Besisahar - Dharapani (drive/jeep)",
     1860,
     1860,
     "travel"
    ],
    [
     3,
     null,
     "Dharapani - Timang - Koto",
     2600,
     2600,
     "trek"
    ],
    [
     4,
     null,
     "Koto - Dharmasala - Meta",
     3560,
     3560,
     "trek"
    ],
    [
     5,
     null,
     "Meta - Chyakhu - Kyang",
     3840,
     3875,
     "trek"
    ],
    [
     6,
     null,
     "Kyang - Phu Gaun",
     4080,
     4080,
     "trek"
    ],
    [
     7,
     null,
     "Acclimatisation day in Phu (Tashi Lhakhang; hike toward Himlung viewpoint ~4,400 m)",
     4080,
     4400,
     "rest-acclimatization"
    ],
    [
     8,
     null,
     "Phu - Junam - Nar Phedi (Satek Gompa)",
     3490,
     4080,
     "trek"
    ],
    [
     9,
     null,
     "Nar Phedi - Nar",
     4110,
     4205,
     "trek"
    ],
    [
     10,
     null,
     "Nar - Kang La (5,320 m) - Ngawal",
     3660,
     5320,
     "trek"
    ],
    [
     11,
     null,
     "Ngawal - Braga - Manang",
     3540,
     3660,
     "trek"
    ],
    [
     12,
     null,
     "Manang - Besisahar (jeep)",
     760,
     3540,
     "city"
    ],
    [
     13,
     null,
     "Besisahar - Kathmandu (drive)",
     1400,
     1400,
     "travel"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Medieval villages in a hidden valley, out over the Kang La",
    "overview": "Remote restricted-area trek with sleeping altitudes above 4,000 m at Phu and Nar and a long Kang La (5,320 m) crossing to Ngawal (8-9 h, steep knee-heavy descent). Koto-Meta is a about 960 m sleeping-altitude gain.",
    "highlights": [
     "Medieval stone villages of Phu and Nar",
     "Tashi Lhakhang monastery in Phu and Satek Gompa at Nar Phedi",
     "Kang La (5,320 m) panorama of Annapurna II, III, IV and Gangapurna",
     "Phu Khola gorge, canyons and kani gateways",
     "Few trekkers due to restricted status"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Basic lodges at Meta, Kyang, Phu, Nar Phedi and Nar; Kang La Phedi stage, if used, may require camping.",
    "acclimatizationNotes": "Rest day at Phu standard; optional second rest day at Nar before Kang La."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "Agency applies for restricted area permit.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu - Besisahar - Dharapani (drive/jeep)",
     "description": "8-10 h; upper section jeep-only.",
     "fromPlace": "Kathmandu",
     "toPlace": "Dharapani",
     "startAltitudeM": 1400,
     "highPointM": 1860,
     "sleepAltitudeM": 1860,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Dharapani - Timang - Koto",
     "description": "Restricted-area checkpoint at Koto.",
     "fromPlace": "Dharapani",
     "toPlace": "Koto",
     "startAltitudeM": 1860,
     "highPointM": 2600,
     "sleepAltitudeM": 2600,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Koto - Dharmasala - Meta",
     "description": "Nearly 1,000 m gain through the Phu Khola gorge.",
     "fromPlace": "Koto",
     "toPlace": "Meta",
     "startAltitudeM": 2600,
     "highPointM": 3560,
     "sleepAltitudeM": 3560,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Meta - Chyakhu - Kyang",
     "description": "",
     "fromPlace": "Meta",
     "toPlace": "Kyang",
     "startAltitudeM": 3560,
     "highPointM": 3875,
     "sleepAltitudeM": 3840,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Kyang - Phu Gaun",
     "description": "Entered through a kani gateway; Tashi Lhakhang monastery.",
     "fromPlace": "Kyang",
     "toPlace": "Phu",
     "startAltitudeM": 3840,
     "highPointM": 4080,
     "sleepAltitudeM": 4080,
     "walkingHours": "3-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Acclimatisation day in Phu (Tashi Lhakhang; hike toward Himlung viewpoint ~4,400 m)",
     "description": "",
     "fromPlace": "Phu",
     "toPlace": "Phu",
     "startAltitudeM": 4080,
     "highPointM": 4400,
     "sleepAltitudeM": 4080,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Phu - Junam - Nar Phedi (Satek Gompa)",
     "description": "",
     "fromPlace": "Phu",
     "toPlace": "Nar Phedi",
     "startAltitudeM": 4080,
     "highPointM": 4080,
     "sleepAltitudeM": 3490,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Nar Phedi - Nar",
     "description": "",
     "fromPlace": "Nar Phedi",
     "toPlace": "Nar",
     "startAltitudeM": 3490,
     "highPointM": 4205,
     "sleepAltitudeM": 4110,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Nar - Kang La (5,320 m) - Ngawal",
     "description": "Start before first light; turn back if the pass has heavy fresh snow.",
     "fromPlace": "Nar",
     "toPlace": "Ngawal",
     "startAltitudeM": 4110,
     "highPointM": 5320,
     "sleepAltitudeM": 3660,
     "walkingHours": "8-9",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Ngawal - Braga - Manang",
     "description": "",
     "fromPlace": "Ngawal",
     "toPlace": "Manang",
     "startAltitudeM": 3660,
     "highPointM": 3660,
     "sleepAltitudeM": 3540,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Manang - Besisahar (jeep)",
     "description": "",
     "fromPlace": "Manang",
     "toPlace": "Besisahar",
     "startAltitudeM": 3540,
     "highPointM": 3540,
     "sleepAltitudeM": 760,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Besisahar - Kathmandu (drive)",
     "description": "",
     "fromPlace": "Besisahar",
     "toPlace": "Kathmandu",
     "startAltitudeM": 760,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "nepal-cultural-heritage-tour",
  "before": {
   "fields": {
    "subtitle": "10 days typical · max 2175 m (Nagarkot viewpoint (reported 2,175-2,195 m))",
    "maxAltitudePoint": "Nagarkot viewpoint (reported 2,175-2,195 m)",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "acclimatizationNotes": "Highest overnight ~2,100 m at Nagarkot; no acclimatization needed."
   }
  },
  "after": {
   "fields": {
    "subtitle": "Kathmandu, Bhaktapur, Nagarkot and the Chitwan jungle",
    "maxAltitudePoint": "Nagarkot",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ],
    "acclimatizationNotes": "Highest overnight about 2,100 m at Nagarkot; no acclimatization needed."
   }
  }
 },
 {
  "slug": "nepal-white-water-rafting",
  "before": {
   "fields": {
    "subtitle": "2 days typical · max 1400 m (Nepal White Water Rafting)",
    "maxAltitudePoint": "Nepal White Water Rafting",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - drive to Trishuli put-in (around Charaudi/Galchhi, ~3 h) - raft grade 3+ rapids - riverside camp",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Raft to take-out near Mugling/Kurintar - drive to Kathmandu, Pokhara or Chitwan",
     1400,
     1400,
     "travel"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Two days of rapids on the Trishuli river",
    "maxAltitudePoint": "Trishuli river",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - drive to Trishuli put-in (around Charaudi/Galchhi, ~3 h) - raft grade 3+ rapids - riverside camp",
     "description": "notes.",
     "fromPlace": "Kathmandu",
     "toPlace": "Trishuli riverside camp",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Raft to take-out near Mugling/Kurintar - drive to Kathmandu, Pokhara or Chitwan",
     "description": "Trishuli flows toward Chitwan, so trips are often combined with a safari.",
     "fromPlace": "Trishuli riverside camp",
     "toPlace": "Kathmandu (or onward to Chitwan / Pokhara)",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "pisang-peak-climbing",
  "before": {
   "fields": {
    "subtitle": "10 days typical · max 6091 m (Pisang Peak summit)",
    "overview": "Standard route is the south-west/west ridge: Base Camp ~4,380 m, High Camp ~5,400 m on a rocky shoulder, then a steep, exposed snow/ice ridge (45-50 degrees) to the summit pyramid with fixed ropes on exposed sections. ~700 m vertical on summit day. Crampons, ice axe, harness, ascender required. [s5][s6][s7]",
    "highlights": [
     "Summit views of Annapurna, Dhaulagiri, Manaslu and the Chulu peaks [s5][s8]",
     "Approachable 6,000 m objective on the Annapurna Circuit [s6]",
     "Can be combined with Thorong La [s8]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Teahouses to Pisang; tented camps at Base Camp and High Camp. Max 15 members per NMA permit team. [s2][s5]",
    "acclimatizationNotes": "Short itinerary has one acclimatisation day at Pisang; circuit-combined versions acclimatise more gradually. [s6][s8]"
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu; briefing",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu - Besisahar - Chame (drive/jeep)",
     2670,
     2670,
     "travel"
    ],
    [
     3,
     null,
     "Chame - Pisang",
     3300,
     3300,
     "trek"
    ],
    [
     4,
     null,
     "Acclimatisation, training and preparation day at Pisang",
     3300,
     3300,
     "rest-acclimatization"
    ],
    [
     5,
     null,
     "Pisang - Pisang Peak Base Camp",
     4380,
     4380,
     "trek"
    ],
    [
     6,
     null,
     "Base Camp - High Camp",
     5400,
     5400,
     "rest-acclimatization"
    ],
    [
     7,
     null,
     "High Camp - Pisang Peak summit (6,091 m) - descend to Base Camp/Pisang",
     3300,
     6091,
     "trek"
    ],
    [
     8,
     null,
     "Contingency day (weather) or recovery",
     3300,
     3300,
     "contingency"
    ],
    [
     9,
     null,
     "Pisang - Kathmandu (drive)",
     1400,
     3300,
     "travel"
    ],
    [
     10,
     null,
     "Departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A snow pyramid above the Annapurna Circuit's Marsyangdi valley",
    "overview": "Standard route is the south-west/west ridge: Base Camp about 4,380 m, High Camp about 5,400 m on a rocky shoulder, then a steep, exposed snow/ice ridge (45-50 degrees) to the summit pyramid with fixed ropes on exposed sections. about 700 m vertical on summit day. Crampons, ice axe, harness, ascender required.",
    "highlights": [
     "Summit views of Annapurna, Dhaulagiri, Manaslu and the Chulu peaks",
     "Approachable 6,000 m objective on the Annapurna Circuit",
     "Can be combined with Thorong La"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu",
     "A licensed climbing guide for the summit day",
     "The peak climbing permit",
     "Group climbing equipment: fixed ropes and camp tents"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters",
     "Personal climbing gear (boots, harness, crampons), which can be rented in Kathmandu"
    ],
    "contingency": "Teahouses to Pisang; tented camps at Base Camp and High Camp. Max 15 members per NMA permit team.",
    "acclimatizationNotes": "Short itinerary has one acclimatisation day at Pisang; circuit-combined versions acclimatise more gradually."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu; briefing",
     "description": "Agency obtains NMA permit.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu - Besisahar - Chame (drive/jeep)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Chame",
     "startAltitudeM": 1400,
     "highPointM": 2670,
     "sleepAltitudeM": 2670,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Chame - Pisang",
     "description": "",
     "fromPlace": "Chame",
     "toPlace": "Pisang",
     "startAltitudeM": 2670,
     "highPointM": 3300,
     "sleepAltitudeM": 3300,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Acclimatisation, training and preparation day at Pisang",
     "description": "",
     "fromPlace": "Pisang",
     "toPlace": "Pisang",
     "startAltitudeM": 3300,
     "highPointM": 3300,
     "sleepAltitudeM": 3300,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Pisang - Pisang Peak Base Camp",
     "description": "Through yak pastures (kharka).",
     "fromPlace": "Pisang",
     "toPlace": "Base Camp (tents)",
     "startAltitudeM": 3300,
     "highPointM": 4380,
     "sleepAltitudeM": 4380,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Base Camp - High Camp",
     "description": "Steep rocky ridge, snow possible; rope/crampon training.",
     "fromPlace": "Base Camp (tents)",
     "toPlace": "High Camp (tents)",
     "startAltitudeM": 4380,
     "highPointM": 5400,
     "sleepAltitudeM": 5400,
     "walkingHours": "4-6",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "High Camp - Pisang Peak summit (6,091 m) - descend to Base Camp/Pisang",
     "description": "Pre-dawn start; turnaround at guide's discretion.",
     "fromPlace": "High Camp (tents)",
     "toPlace": "Pisang",
     "startAltitudeM": 5400,
     "highPointM": 6091,
     "sleepAltitudeM": 3300,
     "walkingHours": "8-12",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Contingency day (weather) or recovery",
     "description": "",
     "fromPlace": "Pisang",
     "toPlace": "Pisang",
     "startAltitudeM": 3300,
     "highPointM": 3300,
     "sleepAltitudeM": 3300,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Pisang - Kathmandu (drive)",
     "description": "",
     "fromPlace": "Pisang",
     "toPlace": "Kathmandu",
     "startAltitudeM": 3300,
     "highPointM": 3300,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Departure",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Pisang (jeep road-head)",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "pokhara-lakeside-tour",
  "before": {
   "fields": {
    "subtitle": "2 days typical · max 1592 m (Sarangkot viewpoint)",
    "maxAltitudePoint": "Sarangkot viewpoint",
    "highlights": [
     "Sarangkot (1,592 m) sunrise over the Annapurna range, Machhapuchhre and Dhaulagiri",
     "Phewa Lake (742 m, ~5.7 sq km) with Tal Barahi island temple and Machhapuchhre reflections",
     "World Peace Pagoda (Shanti Stupa, ~1,100 m) on Anadu Hill above the south shore",
     "Davis Falls and Gupteshwor Mahadev Cave",
     "International Mountain Museum (Nepal Mountaineering Association)"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   }
  },
  "after": {
   "fields": {
    "subtitle": "Phewa Lake, Sarangkot sunrise and the Annapurnas from the lakeshore",
    "maxAltitudePoint": "Sarangkot",
    "highlights": [
     "Sarangkot (1,592 m) sunrise over the Annapurna range, Machhapuchhre and Dhaulagiri",
     "Phewa Lake (742 m, about 5. 7 sq km) with Tal Barahi island temple and Machhapuchhre reflections",
     "World Peace Pagoda (Shanti Stupa, about 1,100 m) on Anadu Hill above the south shore",
     "Davis Falls and Gupteshwor Mahadev Cave",
     "International Mountain Museum (Nepal Mountaineering Association)"
    ],
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ]
   }
  }
 },
 {
  "slug": "pokhara-paragliding",
  "before": {
   "fields": {
    "subtitle": "1 days typical · max 1592 m (Sarangkot launch ridge (historic main take-off; see notes on current sites))",
    "maxAltitudePoint": "Sarangkot launch ridge (historic main take-off; see notes on current sites)",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   }
  },
  "after": {
   "fields": {
    "subtitle": "A tandem flight from Sarangkot over Phewa Lake",
    "maxAltitudePoint": "Sarangkot",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ]
   }
  }
 },
 {
  "slug": "rara-lake-trek",
  "before": {
   "fields": {
    "subtitle": "6 days typical · max 3726 m (Murma Top viewpoint)",
    "maxAltitudePoint": "Murma Top viewpoint",
    "overview": "Fly-in version via Talcha is short and gentle (2-4 hrs walk to the lake, optional Murma Top viewpoint). The classic walk-in from Jumla adds 4-5 days over forested ridges (Ghurchi Lagna approx. 3,450 m; Danfe Lagna approx. 3,700 m on some routes) and is moderate-to-challenging.",
    "highlights": [
     "Rara Lake, Nepal's largest lake, at approx. 2,990 m",
     "Murma Top panorama over the lake to distant Himalaya",
     "Rara National Park forests (blue pine, spruce, rhododendron) and wildlife (red panda, musk deer, Himalayan black bear)",
     "Winter migratory waterfowl (NTB lists over 200 bird species)",
     "Optional Sinja valley, historic Khas Malla capital, on the Jumla route"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "acclimatizationNotes": "Low altitude (under 3,000 m sleeping) means no formal acclimatization day is needed on the fly-in version; the Jumla route has sleeping-altitude gains of approx. 500 m on some days."
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Nepalgunj (flight, approx. 1 hr)",
     150,
     1400,
     "flight"
    ],
    [
     2,
     null,
     "Nepalgunj - Talcha (flight, approx. 35 min) - walk to Rara Lake",
     2990,
     2990,
     "flight"
    ],
    [
     3,
     null,
     "Rara Lake shoreline circuit",
     2990,
     2990,
     "trek"
    ],
    [
     4,
     null,
     "Hike to Murma Top viewpoint and return",
     2990,
     3726,
     "trek"
    ],
    [
     5,
     null,
     "Rara Lake - Talcha (walk) - Nepalgunj (flight)",
     150,
     2990,
     "flight"
    ],
    [
     6,
     null,
     "Nepalgunj - Kathmandu (flight)",
     1400,
     1400,
     "flight"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Nepal's largest lake, ringed by pine forest in the far west",
    "maxAltitudePoint": "Murma Top",
    "overview": "Fly-in version via Talcha is short and gentle (2-4 hrs walk to the lake, optional Murma Top viewpoint). The classic walk-in from Jumla adds 4-5 days over forested ridges (Ghurchi Lagna about 3,450 m; Danfe Lagna about 3,700 m on some routes) and is moderate-to-challenging.",
    "highlights": [
     "Rara Lake, Nepal's largest lake, at about 2,990 m",
     "Murma Top panorama over the lake to distant Himalaya",
     "Rara National Park forests (blue pine, spruce, rhododendron) and wildlife (red panda, musk deer, Himalayan black bear)",
     "Winter migratory waterfowl (NTB lists over 200 bird species)",
     "Optional Sinja valley, historic Khas Malla capital, on the Jumla route"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "acclimatizationNotes": "Low altitude (under 3,000 m sleeping) means no formal acclimatization day is needed on the fly-in version; the Jumla route has sleeping-altitude gains of about 500 m on some days."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Nepalgunj (flight, approx. 1 hr)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Nepalgunj",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 150,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Nepalgunj - Talcha (flight, approx. 35 min) - walk to Rara Lake",
     "description": "",
     "fromPlace": "Nepalgunj",
     "toPlace": "Rara Lake",
     "startAltitudeM": 150,
     "highPointM": 2990,
     "sleepAltitudeM": 2990,
     "walkingHours": "2-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Rara Lake shoreline circuit",
     "description": "Nepal's largest lake; within Rara National Park.",
     "fromPlace": "Rara Lake",
     "toPlace": "Rara Lake",
     "startAltitudeM": 2990,
     "highPointM": 2990,
     "sleepAltitudeM": 2990,
     "walkingHours": "4-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Hike to Murma Top viewpoint and return",
     "description": "Murma Top about 3,710-3,726 m; Chuchemara Danda (about 4,039 m) is a longer alternative viewpoint.",
     "fromPlace": "Rara Lake",
     "toPlace": "Rara Lake",
     "startAltitudeM": 2990,
     "highPointM": 3726,
     "sleepAltitudeM": 2990,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Rara Lake - Talcha (walk) - Nepalgunj (flight)",
     "description": "",
     "fromPlace": "Rara Lake",
     "toPlace": "Nepalgunj",
     "startAltitudeM": 2990,
     "highPointM": 2990,
     "sleepAltitudeM": 150,
     "walkingHours": "2-3",
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Nepalgunj - Kathmandu (flight)",
     "description": "",
     "fromPlace": "Nepalgunj",
     "toPlace": "Kathmandu",
     "startAltitudeM": 150,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "tamang-heritage-trail",
  "before": {
   "fields": {
    "subtitle": "8 days typical · max 3165 m (Nagthali viewpoint (approx. 3,165-3,240 m))",
    "maxAltitudePoint": "Nagthali viewpoint (approx. 3,165-3,240 m)",
    "overview": "Low-to-mid altitude cultural trek; highest sleep approx. 2,600 m (Tatopani), highest point the Nagthali viewpoint (approx. 3,165-3,240 m). Daily walks of about 4-7 hours. Some operators grade it easy-to-moderate. [s4, s5, s6]",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Community homestays (e.g. Gatlang, Briddim) and simple lodges. [s4, s5]",
    "acclimatizationNotes": "No acclimatization day needed; highest sleep approx. 2,600 m. [s7]"
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Trishuli - Dhunche - Syabrubesi (drive)",
     1460,
     1550,
     "travel"
    ],
    [
     2,
     null,
     "Syabrubesi - Goljung - Gatlang",
     2238,
     2238,
     "trek"
    ],
    [
     3,
     null,
     "Gatlang - Chilime - Tatopani",
     2607,
     2607,
     "trek"
    ],
    [
     4,
     null,
     "Tatopani - Nagthali - Thuman",
     2338,
     3165,
     "trek"
    ],
    [
     5,
     null,
     "Thuman - Timure (old Tibet trade route, near Rasuwagadhi)",
     1762,
     2338,
     "trek"
    ],
    [
     6,
     null,
     "Timure - Briddim",
     2229,
     2229,
     "trek"
    ],
    [
     7,
     null,
     "Briddim - Wangel - Syabrubesi",
     1460,
     2229,
     "trek"
    ],
    [
     8,
     null,
     "Syabrubesi - Kathmandu (drive)",
     1400,
     1460,
     "travel"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Tamang villages, hot springs and Langtang views",
    "maxAltitudePoint": "Nagthali",
    "overview": "Low-to-mid altitude cultural trek; highest sleep about 2,600 m (Tatopani), highest point the Nagthali viewpoint (about 3,165-3,240 m). Daily walks of about 4-7 hours.",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ],
    "contingency": "Community homestays (e. g. Gatlang, Briddim) and simple lodges.",
    "acclimatizationNotes": "No acclimatization day needed; highest sleep about 2,600 m."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Trishuli - Dhunche - Syabrubesi (drive)",
     "description": "7-9 hours. Syabrubesi was heavily damaged by the 26 Aug 2026 flood.",
     "fromPlace": "Kathmandu",
     "toPlace": "Syabrubesi",
     "startAltitudeM": 1400,
     "highPointM": 1550,
     "sleepAltitudeM": 1460,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Syabrubesi - Goljung - Gatlang",
     "description": "Large Tamang village; homestays; Parvati Kunda lake nearby.",
     "fromPlace": "Syabrubesi",
     "toPlace": "Gatlang",
     "startAltitudeM": 1460,
     "highPointM": 2238,
     "sleepAltitudeM": 2238,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Gatlang - Chilime - Tatopani",
     "description": "Natural hot springs.",
     "fromPlace": "Gatlang",
     "toPlace": "Tatopani",
     "startAltitudeM": 2238,
     "highPointM": 2607,
     "sleepAltitudeM": 2607,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Tatopani - Nagthali - Thuman",
     "description": "Nagthali viewpoint over Langtang, Ganesh Himal and towards Tibet. Thuman lies in the restricted zone (Gosaikunda RM ward 1).",
     "fromPlace": "Tatopani",
     "toPlace": "Thuman",
     "startAltitudeM": 2607,
     "highPointM": 3165,
     "sleepAltitudeM": 2338,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Thuman - Timure (old Tibet trade route, near Rasuwagadhi)",
     "description": "",
     "fromPlace": "Thuman",
     "toPlace": "Timure",
     "startAltitudeM": 2338,
     "highPointM": 2338,
     "sleepAltitudeM": 1762,
     "walkingHours": "5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Timure - Briddim",
     "description": "Community homestay village.",
     "fromPlace": "Timure",
     "toPlace": "Briddim",
     "startAltitudeM": 1762,
     "highPointM": 2229,
     "sleepAltitudeM": 2229,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Briddim - Wangel - Syabrubesi",
     "description": "",
     "fromPlace": "Briddim",
     "toPlace": "Syabrubesi",
     "startAltitudeM": 2229,
     "highPointM": 2229,
     "sleepAltitudeM": 1460,
     "walkingHours": "3-5",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Syabrubesi - Kathmandu (drive)",
     "description": "",
     "fromPlace": "Syabrubesi",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1460,
     "highPointM": 1460,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "tharpu-chuli-tent-peak-climbing",
  "before": {
   "fields": {
    "subtitle": "18 days typical · max 5695 m (Tharpu Chuli summit (5,695 m per NMA/TAAN and Himalayan Database; 5,663 m on many maps))",
    "maxAltitudePoint": "Tharpu Chuli summit (5,695 m per NMA/TAAN and Himalayan Database; 5,663 m on many maps)",
    "overview": "Normal route is the North-West Ridge from Annapurna Base Camp: glacier crossing, 45-55 degree gully/snow slopes (~60-90 m sections) and a short 50-degree knife-edge to the summit; fixed ropes used. Similar to but more sustained than Island Peak per Jagged Globe. [s5][s6][s7]",
    "highlights": [
     "Climb from inside the Annapurna Sanctuary opposite Machhapuchhre [s5]",
     "Summit views of Annapurna I, Annapurna South, Hiunchuli and Machhapuchhre [s6]",
     "No NMA royalty [s1]",
     "Combines the classic ABC trek with an introductory alpine climb [s5]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Teahouses to ABC; tents at Tharpu Chuli Base Camp and High Camp. [s6]",
    "acclimatizationNotes": "One acclimatisation day at ABC before moving to base camp. [s5][s6]"
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu sightseeing / preparation",
     1400,
     1400,
     "city"
    ],
    [
     3,
     null,
     "Kathmandu - Pokhara (drive or flight)",
     822,
     1400,
     "flight"
    ],
    [
     4,
     null,
     "Pokhara - Nayapul (drive) - Ghandruk",
     1940,
     1940,
     "trek"
    ],
    [
     5,
     null,
     "Ghandruk - Chhomrong",
     2170,
     2170,
     "trek"
    ],
    [
     6,
     null,
     "Chhomrong - Bamboo - Dovan",
     2600,
     2600,
     "trek"
    ],
    [
     7,
     null,
     "Dovan - Deurali",
     3230,
     3230,
     "trek"
    ],
    [
     8,
     null,
     "Deurali - Machhapuchhre Base Camp",
     3700,
     3700,
     "trek"
    ],
    [
     9,
     null,
     "MBC - Annapurna Base Camp",
     4130,
     4130,
     "trek"
    ],
    [
     10,
     null,
     "Acclimatisation day at ABC",
     4130,
     4130,
     "rest-acclimatization"
    ],
    [
     11,
     null,
     "ABC - South Annapurna Glacier - Tharpu Chuli Base Camp",
     4450,
     4450,
     "trek"
    ],
    [
     12,
     null,
     "Base Camp - High Camp",
     5000,
     5200,
     "trek"
    ],
    [
     13,
     null,
     "High Camp - Tharpu Chuli summit - descend to ABC",
     4130,
     5695,
     "trek"
    ],
    [
     14,
     null,
     "ABC - Bamboo",
     2310,
     4130,
     "trek"
    ],
    [
     15,
     null,
     "Bamboo - Jhinu Danda (hot springs)",
     1780,
     2310,
     "trek"
    ],
    [
     16,
     null,
     "Jhinu - Siwai - drive to Pokhara",
     822,
     1780,
     "trek"
    ],
    [
     17,
     null,
     "Pokhara - Kathmandu",
     1400,
     1400,
     "city"
    ],
    [
     18,
     null,
     "Departure",
     1400,
     1400,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A snow summit in the heart of the Annapurna Sanctuary",
    "maxAltitudePoint": "Tharpu Chuli summit",
    "overview": "Normal route is the North-West Ridge from Annapurna Base Camp: glacier crossing, 45-55 degree gully/snow slopes (about 60-90 m sections) and a short 50-degree knife-edge to the summit; fixed ropes used. Similar to but more sustained than Island Peak per Jagged Globe.",
    "highlights": [
     "Climb from inside the Annapurna Sanctuary opposite Machhapuchhre",
     "Summit views of Annapurna I, Annapurna South, Hiunchuli and Machhapuchhre",
     "No NMA royalty",
     "Combines the classic ABC trek with an introductory alpine climb"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu",
     "A licensed climbing guide for the summit day",
     "The peak climbing permit",
     "Group climbing equipment: fixed ropes and camp tents"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters",
     "Personal climbing gear (boots, harness, crampons), which can be rented in Kathmandu"
    ],
    "contingency": "Teahouses to ABC; tents at Tharpu Chuli Base Camp and High Camp.",
    "acclimatizationNotes": "One acclimatisation day at ABC before moving to base camp."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu sightseeing / preparation",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Kathmandu - Pokhara (drive or flight)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Pokhara",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 822,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Pokhara - Nayapul (drive) - Ghandruk",
     "description": "",
     "fromPlace": "Pokhara",
     "toPlace": "Ghandruk",
     "startAltitudeM": 822,
     "highPointM": 1940,
     "sleepAltitudeM": 1940,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Ghandruk - Chhomrong",
     "description": "",
     "fromPlace": "Ghandruk",
     "toPlace": "Chhomrong",
     "startAltitudeM": 1940,
     "highPointM": 2170,
     "sleepAltitudeM": 2170,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Chhomrong - Bamboo - Dovan",
     "description": "",
     "fromPlace": "Chhomrong",
     "toPlace": "Dovan",
     "startAltitudeM": 2170,
     "highPointM": 2600,
     "sleepAltitudeM": 2600,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Dovan - Deurali",
     "description": "",
     "fromPlace": "Dovan",
     "toPlace": "Deurali",
     "startAltitudeM": 2600,
     "highPointM": 3230,
     "sleepAltitudeM": 3230,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Deurali - Machhapuchhre Base Camp",
     "description": "Crosses avalanche paths.",
     "fromPlace": "Deurali",
     "toPlace": "MBC",
     "startAltitudeM": 3230,
     "highPointM": 3700,
     "sleepAltitudeM": 3700,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "MBC - Annapurna Base Camp",
     "description": "",
     "fromPlace": "MBC",
     "toPlace": "ABC",
     "startAltitudeM": 3700,
     "highPointM": 4130,
     "sleepAltitudeM": 4130,
     "walkingHours": "2-3",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Acclimatisation day at ABC",
     "description": "",
     "fromPlace": "ABC",
     "toPlace": "ABC",
     "startAltitudeM": 4130,
     "highPointM": 4130,
     "sleepAltitudeM": 4130,
     "walkingHours": null,
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "ABC - South Annapurna Glacier - Tharpu Chuli Base Camp",
     "description": "",
     "fromPlace": "ABC",
     "toPlace": "Base Camp (tents)",
     "startAltitudeM": 4130,
     "highPointM": 4450,
     "sleepAltitudeM": 4450,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Base Camp - High Camp",
     "description": "",
     "fromPlace": "Base Camp (tents)",
     "toPlace": "High Camp (tents)",
     "startAltitudeM": 4450,
     "highPointM": 5200,
     "sleepAltitudeM": 5000,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "High Camp - Tharpu Chuli summit - descend to ABC",
     "description": "3-4 am start; 4-6 h up, 2-3 h down to High Camp.",
     "fromPlace": "High Camp (tents)",
     "toPlace": "ABC",
     "startAltitudeM": 5000,
     "highPointM": 5695,
     "sleepAltitudeM": 4130,
     "walkingHours": "10-12",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "ABC - Bamboo",
     "description": "",
     "fromPlace": "ABC",
     "toPlace": "Bamboo",
     "startAltitudeM": 4130,
     "highPointM": 4130,
     "sleepAltitudeM": 2310,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Bamboo - Jhinu Danda (hot springs)",
     "description": "",
     "fromPlace": "Bamboo",
     "toPlace": "Jhinu Danda",
     "startAltitudeM": 2310,
     "highPointM": 2310,
     "sleepAltitudeM": 1780,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Jhinu - Siwai - drive to Pokhara",
     "description": "",
     "fromPlace": "Jhinu Danda",
     "toPlace": "Pokhara",
     "startAltitudeM": 1780,
     "highPointM": 1780,
     "sleepAltitudeM": 822,
     "walkingHours": "2-3",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Pokhara - Kathmandu",
     "description": "",
     "fromPlace": "Pokhara",
     "toPlace": "Kathmandu",
     "startAltitudeM": 822,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 18,
     "dayLabel": null,
     "title": "Departure",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Siwai/Jhinu (road-head)",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "tibet-add-on-tour",
  "before": {
   "fields": {
    "subtitle": "6 days typical · max 4441 m (Yamdrok Lake (day trip); nights in Lhasa at 3,656 m)",
    "maxAltitudePoint": "Yamdrok Lake (day trip); nights in Lhasa at 3,656 m",
    "overview": "Touring by vehicle, but at high altitude from day one (Lhasa ~3,656 m); EBC and Kailash variants go above 5,000 m.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ]
   },
   "days": [
    [
     1,
     null,
     "Kathmandu: Tibet group visa formalities and briefing",
     1400,
     1400,
     "flight"
    ],
    [
     2,
     null,
     "Kathmandu - Lhasa Gonggar (flight ~1 h 20 min) - Lhasa; rest for acclimatization",
     3656,
     3656,
     "rest-acclimatization"
    ],
    [
     3,
     null,
     "Potala Palace, Jokhang Temple, Barkhor",
     3656,
     3656,
     "trek"
    ],
    [
     4,
     null,
     "Drepung and Sera monasteries",
     3656,
     3656,
     "trek"
    ],
    [
     5,
     null,
     "Day trip to Yamdrok Lake (~4,441 m) or Namtso, or further Lhasa sights",
     3656,
     4441,
     "trek"
    ],
    [
     6,
     null,
     "Lhasa - Kathmandu (flight)",
     3656,
     3656,
     "flight"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Lhasa's palaces and monasteries, and the blue of Yamdrok Lake",
    "maxAltitudePoint": "Yamdrok Lake",
    "overview": "Touring by vehicle, but at high altitude from day one (Lhasa about 3,656 m); EBC and Kailash variants go above 5,000 m.",
    "inclusions": [
     "A private guide for the sightseeing in the itinerary",
     "Private transport shown in the itinerary",
     "Entry fees for the sites in the itinerary",
     "Accommodation shown in the itinerary"
    ],
    "exclusions": [
     "International flights and visas",
     "Travel insurance",
     "Meals not listed in the itinerary",
     "Tips for your guide and driver"
    ]
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu: Tibet group visa formalities and briefing",
     "description": "Tibet group visas are arranged in Kathmandu before the flight to Lhasa.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu - Lhasa Gonggar (flight ~1 h 20 min) - Lhasa; rest for acclimatization",
     "description": "Tibetan guide meets the group holding the Tibet Travel Permit.",
     "fromPlace": "Kathmandu",
     "toPlace": "Lhasa",
     "startAltitudeM": 1400,
     "highPointM": 3656,
     "sleepAltitudeM": 3656,
     "walkingHours": null,
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Potala Palace, Jokhang Temple, Barkhor",
     "description": "",
     "fromPlace": "Lhasa",
     "toPlace": "Lhasa",
     "startAltitudeM": 3656,
     "highPointM": 3656,
     "sleepAltitudeM": 3656,
     "walkingHours": "2-3",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Drepung and Sera monasteries",
     "description": "",
     "fromPlace": "Lhasa",
     "toPlace": "Lhasa",
     "startAltitudeM": 3656,
     "highPointM": 3656,
     "sleepAltitudeM": 3656,
     "walkingHours": "2-3",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Day trip to Yamdrok Lake (~4,441 m) or Namtso, or further Lhasa sights",
     "description": "",
     "fromPlace": "Lhasa",
     "toPlace": "Lhasa",
     "startAltitudeM": 3656,
     "highPointM": 4441,
     "sleepAltitudeM": 3656,
     "walkingHours": "1",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Lhasa - Kathmandu (flight)",
     "description": "",
     "fromPlace": "Lhasa",
     "toPlace": "Kathmandu",
     "startAltitudeM": 3656,
     "highPointM": 3656,
     "sleepAltitudeM": 3656,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "teahouse"
    }
   ]
  }
 },
 {
  "slug": "tsum-valley-trek",
  "before": {
   "fields": {
    "subtitle": "11 days typical · max 3700 m (Mu Gompa)",
    "overview": "No high pass on the standalone out-and-back route; highest point Mu Gompa (approx. 3,700 m). Long days on the approach along the Budhi Gandaki. Combined with the Manaslu Circuit it becomes strenuous (Larkya La). [s4, s5]",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Basic lodges and homestays in Tsum villages. [s4, s6]",
    "acclimatizationNotes": "No dedicated rest day on the standalone route; the gradual ascent and the Nile/Mu Gompa day serve for acclimatization. Combined routes add a rest day at Samagaon. [s4, s6]"
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Arughat - Soti Khola - Machha Khola (drive)",
     870,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Machha Khola - Tatopani - Jagat",
     1340,
     1340,
     "trek"
    ],
    [
     3,
     null,
     "Jagat - Philim - Lokpa",
     2240,
     2240,
     "trek"
    ],
    [
     4,
     null,
     "Lokpa - Chumling (Lower Tsum)",
     2386,
     2386,
     "trek"
    ],
    [
     5,
     null,
     "Chumling - Dumje - Chhokangparo (Upper Tsum)",
     3031,
     3031,
     "trek"
    ],
    [
     6,
     null,
     "Chhokangparo - Milarepa's Piren Phu cave - Nile / Chhule",
     3361,
     3361,
     "trek"
    ],
    [
     7,
     null,
     "Nile - Mu Gompa - return to Nile or down to Chhokangparo",
     3361,
     3700,
     "trek"
    ],
    [
     8,
     null,
     "Nile/Chhokangparo - Rachen Gompa - Chumling or Lokpa",
     2386,
     3361,
     "trek"
    ],
    [
     9,
     null,
     "Chumling/Lokpa - Philim - Jagat",
     1340,
     2386,
     "city"
    ],
    [
     10,
     null,
     "Jagat - Machha Khola",
     870,
     1340,
     "city"
    ],
    [
     11,
     null,
     "Machha Khola - Kathmandu (drive)",
     1400,
     1400,
     "travel"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "A sacred Tibetan Buddhist valley, open to trekkers only since 2008",
    "overview": "No high pass on the standalone out-and-back route; highest point Mu Gompa (about 3,700 m). Long days on the approach along the Budhi Gandaki. Combined with the Manaslu Circuit it becomes strenuous (Larkya La).",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Basic lodges and homestays in Tsum villages.",
    "acclimatizationNotes": "No dedicated rest day on the standalone route; the gradual ascent and the Nile/Mu Gompa day serve for acclimatization. Combined routes add a rest day at Samagaon."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Arughat - Soti Khola - Machha Khola (drive)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Machha Khola",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 870,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Machha Khola - Tatopani - Jagat",
     "description": "",
     "fromPlace": "Machha Khola",
     "toPlace": "Jagat",
     "startAltitudeM": 870,
     "highPointM": 1340,
     "sleepAltitudeM": 1340,
     "walkingHours": "6",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Jagat - Philim - Lokpa",
     "description": "Lokpa is the Tsum Valley entry checkpoint (Tsum RAP checked).",
     "fromPlace": "Jagat",
     "toPlace": "Lokpa",
     "startAltitudeM": 1340,
     "highPointM": 2240,
     "sleepAltitudeM": 2240,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Lokpa - Chumling (Lower Tsum)",
     "description": "",
     "fromPlace": "Lokpa",
     "toPlace": "Chumling",
     "startAltitudeM": 2240,
     "highPointM": 2386,
     "sleepAltitudeM": 2386,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Chumling - Dumje - Chhokangparo (Upper Tsum)",
     "description": "",
     "fromPlace": "Chumling",
     "toPlace": "Chhokangparo (Chekampar)",
     "startAltitudeM": 2386,
     "highPointM": 3031,
     "sleepAltitudeM": 3031,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Chhokangparo - Milarepa's Piren Phu cave - Nile / Chhule",
     "description": "",
     "fromPlace": "Chhokangparo (Chekampar)",
     "toPlace": "Nile",
     "startAltitudeM": 3031,
     "highPointM": 3361,
     "sleepAltitudeM": 3361,
     "walkingHours": "4-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Nile - Mu Gompa - return to Nile or down to Chhokangparo",
     "description": "Mu Gompa about 3,700 m.",
     "fromPlace": "Nile",
     "toPlace": "Nile or Chhokangparo",
     "startAltitudeM": 3361,
     "highPointM": 3700,
     "sleepAltitudeM": 3361,
     "walkingHours": "6-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Nile/Chhokangparo - Rachen Gompa - Chumling or Lokpa",
     "description": "Rachen (nunnery) about 3,220-3,240 m visited en route.",
     "fromPlace": "Nile or Chhokangparo",
     "toPlace": "Chumling or Lokpa",
     "startAltitudeM": 3361,
     "highPointM": 3361,
     "sleepAltitudeM": 2386,
     "walkingHours": "7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Chumling/Lokpa - Philim - Jagat",
     "description": "",
     "fromPlace": "Chumling or Lokpa",
     "toPlace": "Jagat",
     "startAltitudeM": 2386,
     "highPointM": 2386,
     "sleepAltitudeM": 1340,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Jagat - Machha Khola",
     "description": "",
     "fromPlace": "Jagat",
     "toPlace": "Machha Khola",
     "startAltitudeM": 1340,
     "highPointM": 1340,
     "sleepAltitudeM": 870,
     "walkingHours": null,
     "dayType": "city",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Machha Khola - Kathmandu (drive)",
     "description": "",
     "fromPlace": "Machha Khola",
     "toPlace": "Kathmandu",
     "startAltitudeM": 870,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "upper-dolpo-trek",
  "before": {
   "fields": {
    "subtitle": "25 days typical · max 5360 m (Kang La pass)",
    "overview": "Remote camping trek with multiple passes above 5,000 m (Kang La 5,360 m, Saldang La / Sela La approx. 5,100 m, Jeng La approx. 5,090-5,120 m) and several consecutive nights above 3,500-4,000 m; few facilities, rough trails, flight-dependent access.",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "acclimatizationNotes": "Kang La approach involves large sleeping-altitude gains; some operators add an extra camp below the pass."
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Nepalgunj (flight)",
     150,
     1400,
     "flight"
    ],
    [
     2,
     null,
     "Nepalgunj - Juphal (flight, approx. 35 min) - Dunai",
     2140,
     2475,
     "flight"
    ],
    [
     3,
     null,
     "Dunai - Sulighat - Chhepka",
     2700,
     2700,
     "trek"
    ],
    [
     4,
     null,
     "Chhepka - Rechi",
     3080,
     3080,
     "trek"
    ],
    [
     5,
     null,
     "Acclimatisation day at Rechi: short hike above the village and return",
     3080,
     3400,
     "rest-acclimatization"
    ],
    [
     6,
     null,
     "Rechi - Phoksundo Falls - Ringmo",
     3640,
     3640,
     "trek"
    ],
    [
     7,
     null,
     "Rest and acclimatization at Ringmo / Phoksundo Lake",
     3640,
     3640,
     "rest-acclimatization"
    ],
    [
     8,
     null,
     "Ringmo - along Phoksundo Lake west shore - Phoksundo Khola",
     3650,
     3650,
     "trek"
    ],
    [
     9,
     null,
     "Acclimatisation day at Phoksundo Khola camp: hike up the valley toward Kang La and return",
     3650,
     4100,
     "rest-acclimatization"
    ],
    [
     10,
     null,
     "Phoksundo Khola - Phoksundo Bhanjyang (Kang La base)",
     4400,
     4700,
     "trek"
    ],
    [
     11,
     null,
     "Cross Kang La (5,360 m) - Shey Gompa",
     4360,
     5360,
     "trek"
    ],
    [
     12,
     null,
     "Rest day at Shey Gompa; Crystal Mountain area",
     4360,
     4360,
     "rest-acclimatization"
    ],
    [
     13,
     null,
     "Shey Gompa - Saldang La / Sela La (approx. 5,100 m) - Namgung (Namduna)",
     4360,
     5100,
     "trek"
    ],
    [
     14,
     null,
     "Namgung - Saldang",
     3900,
     4360,
     "trek"
    ],
    [
     15,
     null,
     "Saldang - Sibu",
     3940,
     3940,
     "trek"
    ],
    [
     16,
     null,
     "Sibu - Jeng La Phedi",
     4370,
     4370,
     "trek"
    ],
    [
     17,
     null,
     "Cross Jeng La (approx. 5,090-5,120 m) - Tokyu",
     4200,
     5120,
     "trek"
    ],
    [
     18,
     null,
     "Tokyu - Dho Tarap",
     4090,
     4200,
     "trek"
    ],
    [
     19,
     null,
     "Rest day at Dho Tarap",
     4090,
     4090,
     "rest-acclimatization"
    ],
    [
     20,
     null,
     "Dho Tarap - Toltol (Tarap Khola)",
     3700,
     4090,
     "trek"
    ],
    [
     21,
     null,
     "Toltol - Khanigaon",
     2950,
     3700,
     "trek"
    ],
    [
     22,
     null,
     "Khanigaon - Tarakot",
     2280,
     2950,
     "trek"
    ],
    [
     23,
     null,
     "Tarakot - Dunai",
     2140,
     2280,
     "trek"
    ],
    [
     24,
     null,
     "Dunai - Juphal",
     2475,
     2475,
     "trek"
    ],
    [
     25,
     null,
     "Juphal - Nepalgunj - Kathmandu (flights)",
     1400,
     2475,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "Shey Gompa, high passes and the remote valleys of Upper Dolpo",
    "overview": "Remote camping trek with multiple passes above 5,000 m (Kang La 5,360 m, Saldang La / Sela La about 5,100 m, Jeng La about 5,090-5,120 m) and several consecutive nights above 3,500-4,000 m; few facilities, rough trails, flight-dependent access.",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "acclimatizationNotes": ""
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Nepalgunj (flight)",
     "description": "Lowland gateway town for western Nepal flights.",
     "fromPlace": "Kathmandu",
     "toPlace": "Nepalgunj",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 150,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Nepalgunj - Juphal (flight, approx. 35 min) - Dunai",
     "description": "Early-morning flight; frequent weather cancellations. Juphal airstrip about 2,475 m.",
     "fromPlace": "Nepalgunj",
     "toPlace": "Dunai",
     "startAltitudeM": 150,
     "highPointM": 2475,
     "sleepAltitudeM": 2140,
     "walkingHours": "3",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Dunai - Sulighat - Chhepka",
     "description": "Enter Shey-Phoksundo National Park; Suli Gad gorge.",
     "fromPlace": "Dunai",
     "toPlace": "Chhepka",
     "startAltitudeM": 2140,
     "highPointM": 2700,
     "sleepAltitudeM": 2700,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Chhepka - Rechi",
     "description": "",
     "fromPlace": "Chhepka",
     "toPlace": "Rechi",
     "startAltitudeM": 2700,
     "highPointM": 3080,
     "sleepAltitudeM": 3080,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Acclimatisation day at Rechi: short hike above the village and return",
     "description": "An easy day before the climb to Phoksundo Lake.",
     "fromPlace": "Rechi",
     "toPlace": "Rechi",
     "startAltitudeM": 3080,
     "highPointM": 3400,
     "sleepAltitudeM": 3080,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Rechi - Phoksundo Falls - Ringmo",
     "description": "Views of Phoksundo waterfall and first views of Phoksundo Lake.",
     "fromPlace": "Rechi",
     "toPlace": "Ringmo (Phoksundo Lake)",
     "startAltitudeM": 3080,
     "highPointM": 3640,
     "sleepAltitudeM": 3640,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Rest and acclimatization at Ringmo / Phoksundo Lake",
     "description": "Visit Tshowa Bon monastery and lakeshore.",
     "fromPlace": "Ringmo (Phoksundo Lake)",
     "toPlace": "Ringmo",
     "startAltitudeM": 3640,
     "highPointM": 3640,
     "sleepAltitudeM": 3640,
     "walkingHours": "2-3",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Ringmo - along Phoksundo Lake west shore - Phoksundo Khola",
     "description": "Exposed lakeside trail section ('Devil's Trail').",
     "fromPlace": "Ringmo",
     "toPlace": "Phoksundo Khola camp",
     "startAltitudeM": 3640,
     "highPointM": 3650,
     "sleepAltitudeM": 3650,
     "walkingHours": "6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Acclimatisation day at Phoksundo Khola camp: hike up the valley toward Kang La and return",
     "description": "Climb high, sleep low before the camp below Kang La.",
     "fromPlace": "Phoksundo Khola camp",
     "toPlace": "Phoksundo Khola camp",
     "startAltitudeM": 3650,
     "highPointM": 4100,
     "sleepAltitudeM": 3650,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Phoksundo Khola - Phoksundo Bhanjyang (Kang La base)",
     "description": "",
     "fromPlace": "Phoksundo Khola camp",
     "toPlace": "Phoksundo Bhanjyang camp",
     "startAltitudeM": 3650,
     "highPointM": 4700,
     "sleepAltitudeM": 4400,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Cross Kang La (5,360 m) - Shey Gompa",
     "description": "",
     "fromPlace": "Phoksundo Bhanjyang camp",
     "toPlace": "Shey Gompa",
     "startAltitudeM": 4400,
     "highPointM": 5360,
     "sleepAltitudeM": 4360,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Rest day at Shey Gompa; Crystal Mountain area",
     "description": "Shey (Crystal) Monastery below Crystal Mountain.",
     "fromPlace": "Shey Gompa",
     "toPlace": "Shey Gompa",
     "startAltitudeM": 4360,
     "highPointM": 4360,
     "sleepAltitudeM": 4360,
     "walkingHours": "2-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Shey Gompa - Saldang La / Sela La (approx. 5,100 m) - Namgung (Namduna)",
     "description": "Namgung red monastery.",
     "fromPlace": "Shey Gompa",
     "toPlace": "Namgung",
     "startAltitudeM": 4360,
     "highPointM": 5100,
     "sleepAltitudeM": 4360,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Namgung - Saldang",
     "description": "",
     "fromPlace": "Namgung",
     "toPlace": "Saldang",
     "startAltitudeM": 4360,
     "highPointM": 4360,
     "sleepAltitudeM": 3900,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Saldang - Sibu",
     "description": "",
     "fromPlace": "Saldang",
     "toPlace": "Sibu",
     "startAltitudeM": 3900,
     "highPointM": 3940,
     "sleepAltitudeM": 3940,
     "walkingHours": "6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 16,
     "dayLabel": null,
     "title": "Sibu - Jeng La Phedi",
     "description": "",
     "fromPlace": "Sibu",
     "toPlace": "Jeng La Phedi",
     "startAltitudeM": 3940,
     "highPointM": 4370,
     "sleepAltitudeM": 4370,
     "walkingHours": "5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 17,
     "dayLabel": null,
     "title": "Cross Jeng La (approx. 5,090-5,120 m) - Tokyu",
     "description": "",
     "fromPlace": "Jeng La Phedi",
     "toPlace": "Tokyu",
     "startAltitudeM": 4370,
     "highPointM": 5120,
     "sleepAltitudeM": 4200,
     "walkingHours": "7-8",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 18,
     "dayLabel": null,
     "title": "Tokyu - Dho Tarap",
     "description": "Dho Tarap altitude given 4,040-4,090 m.",
     "fromPlace": "Tokyu",
     "toPlace": "Dho Tarap",
     "startAltitudeM": 4200,
     "highPointM": 4200,
     "sleepAltitudeM": 4090,
     "walkingHours": "2",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 19,
     "dayLabel": null,
     "title": "Rest day at Dho Tarap",
     "description": "",
     "fromPlace": "Dho Tarap",
     "toPlace": "Dho Tarap",
     "startAltitudeM": 4090,
     "highPointM": 4090,
     "sleepAltitudeM": 4090,
     "walkingHours": null,
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 20,
     "dayLabel": null,
     "title": "Dho Tarap - Toltol (Tarap Khola)",
     "description": "",
     "fromPlace": "Dho Tarap",
     "toPlace": "Toltol",
     "startAltitudeM": 4090,
     "highPointM": 4090,
     "sleepAltitudeM": 3700,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 21,
     "dayLabel": null,
     "title": "Toltol - Khanigaon",
     "description": "",
     "fromPlace": "Toltol",
     "toPlace": "Khanigaon",
     "startAltitudeM": 3700,
     "highPointM": 3700,
     "sleepAltitudeM": 2950,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 22,
     "dayLabel": null,
     "title": "Khanigaon - Tarakot",
     "description": "",
     "fromPlace": "Khanigaon",
     "toPlace": "Tarakot",
     "startAltitudeM": 2950,
     "highPointM": 2950,
     "sleepAltitudeM": 2280,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 23,
     "dayLabel": null,
     "title": "Tarakot - Dunai",
     "description": "",
     "fromPlace": "Tarakot",
     "toPlace": "Dunai",
     "startAltitudeM": 2280,
     "highPointM": 2280,
     "sleepAltitudeM": 2140,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 24,
     "dayLabel": null,
     "title": "Dunai - Juphal",
     "description": "",
     "fromPlace": "Dunai",
     "toPlace": "Juphal",
     "startAltitudeM": 2140,
     "highPointM": 2475,
     "sleepAltitudeM": 2475,
     "walkingHours": "3",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 25,
     "dayLabel": null,
     "title": "Juphal - Nepalgunj - Kathmandu (flights)",
     "description": "Keep 1-2 contingency days for flight delays.",
     "fromPlace": "Juphal",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2475,
     "highPointM": 2475,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "upper-mustang-trek",
  "before": {
   "fields": {
    "subtitle": "15 days typical · max 4010 m (Nyi La pass (main route); Lo Manthang overnight ~3,840 m)",
    "maxAltitudePoint": "Nyi La pass (main route); Lo Manthang overnight ~3,840 m",
    "highlights": [
     "Walled city of Lo Manthang, former capital of the Kingdom of Lo [s7][s8]",
     "Thubchen, Jampa and Chode monasteries and the Royal Palace [s8]",
     "Ghar Gompa, associated with Padmasambhava [s8]",
     "Chhoser sky caves [s7]",
     "Eroded red and ochre cliffs of Dhakmar and the Kali Gandaki badlands [s7]",
     "Long mani wall at Ghami [s8]"
    ],
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Lodges/teahouses in villages along the route. Monastery combined ticket in Lo Manthang reported at NPR 1,000 (UNVERIFIED). [s8]",
    "acclimatizationNotes": "Rest/exploration day in Lo Manthang; Chele-Syangboche is a +750 m sleeping gain. [s7][s8]"
   },
   "days": [
    [
     1,
     null,
     "Arrive Kathmandu",
     1400,
     1400,
     "travel"
    ],
    [
     2,
     null,
     "Kathmandu - Pokhara (flight ~25 min or drive 6-7 h)",
     822,
     1400,
     "flight"
    ],
    [
     3,
     null,
     "Pokhara - Jomsom (flight ~20 min) - Kagbeni",
     2810,
     2810,
     "flight"
    ],
    [
     4,
     null,
     "Kagbeni - Tangbe - Chhusang - Chele",
     3050,
     3050,
     "trek"
    ],
    [
     5,
     null,
     "Acclimatisation day at Chele: hike above the village toward Taklam La and return",
     3050,
     3500,
     "rest-acclimatization"
    ],
    [
     6,
     null,
     "Chele - Taklam La (3,624 m) - Samar - Syangboche",
     3800,
     3800,
     "trek"
    ],
    [
     7,
     null,
     "Syangboche - Nyi La (4,010 m) - Ghami",
     3520,
     4010,
     "trek"
    ],
    [
     8,
     null,
     "Ghami - Tsarang",
     3560,
     3570,
     "trek"
    ],
    [
     9,
     null,
     "Tsarang - Lo La (3,950 m) - Lo Manthang",
     3840,
     3950,
     "trek"
    ],
    [
     10,
     null,
     "Explore Lo Manthang (Jampa Lhakhang, Thubchen, Chode, Royal Palace); optional Chhoser caves",
     3840,
     3840,
     "trek"
    ],
    [
     11,
     null,
     "Lo Manthang - Ghar Gompa - Dhakmar",
     3820,
     3840,
     "trek"
    ],
    [
     12,
     null,
     "Dhakmar - Ghiling",
     3570,
     3820,
     "trek"
    ],
    [
     13,
     null,
     "Ghiling - Chhusang",
     2980,
     3570,
     "trek"
    ],
    [
     14,
     null,
     "Chhusang - Kagbeni (exit restricted area) - Jomsom",
     2720,
     2980,
     "trek"
    ],
    [
     15,
     null,
     "Jomsom - Pokhara (flight) - Kathmandu",
     1400,
     2720,
     "contingency"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "The walled city of Lo Manthang and the red cliffs of the former kingdom of Lo",
    "maxAltitudePoint": "Nyi La pass",
    "highlights": [
     "Walled city of Lo Manthang, former capital of the Kingdom of Lo",
     "Thubchen, Jampa and Chode monasteries and the Royal Palace",
     "Ghar Gompa, associated with Padmasambhava",
     "Chhoser sky caves",
     "Eroded red and ochre cliffs of Dhakmar and the Kali Gandaki badlands",
     "Long mani wall at Ghami"
    ],
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters"
    ],
    "contingency": "Lodges/teahouses in villages along the route.",
    "acclimatizationNotes": "Rest/exploration day in Lo Manthang; Chele-Syangboche is a +750 m sleeping gain."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Arrive Kathmandu",
     "description": "Agency applies for restricted area permit.",
     "fromPlace": "Kathmandu",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Kathmandu - Pokhara (flight ~25 min or drive 6-7 h)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Pokhara",
     "startAltitudeM": 1400,
     "highPointM": 1400,
     "sleepAltitudeM": 822,
     "walkingHours": null,
     "dayType": "flight",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Pokhara - Jomsom (flight ~20 min) - Kagbeni",
     "description": "Restricted zone starts just north of Kagbeni.",
     "fromPlace": "Pokhara",
     "toPlace": "Kagbeni",
     "startAltitudeM": 822,
     "highPointM": 2810,
     "sleepAltitudeM": 2810,
     "walkingHours": "3-4",
     "dayType": "flight",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Kagbeni - Tangbe - Chhusang - Chele",
     "description": "RAP checkpoint on leaving Kagbeni.",
     "fromPlace": "Kagbeni",
     "toPlace": "Chele",
     "startAltitudeM": 2810,
     "highPointM": 3050,
     "sleepAltitudeM": 3050,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Acclimatisation day at Chele: hike above the village toward Taklam La and return",
     "description": "Climb high, sleep low before the long climb to Syangboche.",
     "fromPlace": "Chele",
     "toPlace": "Chele",
     "startAltitudeM": 3050,
     "highPointM": 3500,
     "sleepAltitudeM": 3050,
     "walkingHours": "3-4",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Chele - Taklam La (3,624 m) - Samar - Syangboche",
     "description": "+750 m sleeping gain.",
     "fromPlace": "Chele",
     "toPlace": "Syangboche",
     "startAltitudeM": 3050,
     "highPointM": 3800,
     "sleepAltitudeM": 3800,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Syangboche - Nyi La (4,010 m) - Ghami",
     "description": "Long mani wall at Ghami.",
     "fromPlace": "Syangboche",
     "toPlace": "Ghami",
     "startAltitudeM": 3800,
     "highPointM": 4010,
     "sleepAltitudeM": 3520,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Ghami - Tsarang",
     "description": "",
     "fromPlace": "Ghami",
     "toPlace": "Tsarang",
     "startAltitudeM": 3520,
     "highPointM": 3570,
     "sleepAltitudeM": 3560,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Tsarang - Lo La (3,950 m) - Lo Manthang",
     "description": "",
     "fromPlace": "Tsarang",
     "toPlace": "Lo Manthang",
     "startAltitudeM": 3560,
     "highPointM": 3950,
     "sleepAltitudeM": 3840,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Explore Lo Manthang (Jampa Lhakhang, Thubchen, Chode, Royal Palace); optional Chhoser caves",
     "description": "",
     "fromPlace": "Lo Manthang",
     "toPlace": "Lo Manthang",
     "startAltitudeM": 3840,
     "highPointM": 3840,
     "sleepAltitudeM": 3840,
     "walkingHours": "4-5",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Lo Manthang - Ghar Gompa - Dhakmar",
     "description": "Eastern route; red cliffs.",
     "fromPlace": "Lo Manthang",
     "toPlace": "Dhakmar",
     "startAltitudeM": 3840,
     "highPointM": 3840,
     "sleepAltitudeM": 3820,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 12,
     "dayLabel": null,
     "title": "Dhakmar - Ghiling",
     "description": "",
     "fromPlace": "Dhakmar",
     "toPlace": "Ghiling",
     "startAltitudeM": 3820,
     "highPointM": 3820,
     "sleepAltitudeM": 3570,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 13,
     "dayLabel": null,
     "title": "Ghiling - Chhusang",
     "description": "",
     "fromPlace": "Ghiling",
     "toPlace": "Chhusang",
     "startAltitudeM": 3570,
     "highPointM": 3570,
     "sleepAltitudeM": 2980,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 14,
     "dayLabel": null,
     "title": "Chhusang - Kagbeni (exit restricted area) - Jomsom",
     "description": "",
     "fromPlace": "Chhusang",
     "toPlace": "Jomsom",
     "startAltitudeM": 2980,
     "highPointM": 2980,
     "sleepAltitudeM": 2720,
     "walkingHours": "5-6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 15,
     "dayLabel": null,
     "title": "Jomsom - Pokhara (flight) - Kathmandu",
     "description": "Morning flight only; buffer day recommended.",
     "fromPlace": "Jomsom",
     "toPlace": "Kathmandu",
     "startAltitudeM": 2720,
     "highPointM": 2720,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "hotel"
    }
   ]
  }
 },
 {
  "slug": "yala-peak-climbing",
  "before": {
   "fields": {
    "subtitle": "11 days typical · max 5732 m (Yala Peak summit - UNVERIFIED height (5,732 m in NMA/MoCTCA lists; 5,500-5,520 m in many guides))",
    "maxAltitudePoint": "Yala Peak summit - UNVERIFIED height (5,732 m in NMA/MoCTCA lists; 5,500-5,520 m in many guides)",
    "overview": "Relatively non-technical snow/rock ascent: snow slopes and scrambling, with a short steep rock pyramid near the top where hands are needed. Crampons and ice axe used; harness/helmet recommended. Good first Himalayan summit. [s6, s7, s8]",
    "inclusions": [
     "Licensed guide [[TBD: named guide / ratio]]",
     "Permits arranged by the agency",
     "Teahouse or tent nights as the itinerary requires"
    ],
    "exclusions": [
     "International flights",
     "Travel insurance with helicopter rescue to the trip's max altitude",
     "Personal equipment and drinks"
    ],
    "contingency": "Teahouses to Kyanjin Gompa; tented high camp at Yala Kharka. [s6, s7]",
    "acclimatizationNotes": "At least one acclimatization day at Kyanjin before moving to high camp. [s9]"
   },
   "days": [
    [
     1,
     null,
     "Kathmandu - Dhunche - Syabrubesi (drive)",
     1460,
     1460,
     "travel"
    ],
    [
     2,
     null,
     "Syabrubesi - Lama Hotel",
     2470,
     2470,
     "trek"
    ],
    [
     3,
     null,
     "Lama Hotel - Langtang village",
     3430,
     3430,
     "trek"
    ],
    [
     4,
     null,
     "Langtang - Kyanjin Gompa",
     3870,
     3870,
     "trek"
    ],
    [
     5,
     null,
     "Acclimatization day (Kyanjin Ri hike)",
     3870,
     3870,
     "rest-acclimatization"
    ],
    [
     6,
     null,
     "Kyanjin Gompa - Yala Kharka / high camp",
     4600,
     4800,
     "trek"
    ],
    [
     7,
     null,
     "Summit Yala Peak, descend to Kyanjin Gompa",
     3870,
     5732,
     "summit"
    ],
    [
     8,
     null,
     "Spare weather day",
     3870,
     3870,
     "contingency"
    ],
    [
     9,
     null,
     "Kyanjin Gompa - Lama Hotel",
     2470,
     3870,
     "trek"
    ],
    [
     10,
     null,
     "Lama Hotel - Syabrubesi",
     1460,
     2470,
     "trek"
    ],
    [
     11,
     null,
     "Syabrubesi - Kathmandu (drive)",
     1400,
     1460,
     "travel"
    ]
   ]
  },
  "after": {
   "fields": {
    "subtitle": "An approachable first summit above Kyanjin Gompa in Langtang",
    "maxAltitudePoint": "Yala Peak summit",
    "overview": "Relatively non-technical snow/rock ascent: snow slopes and scrambling, with a short steep rock pyramid near the top where hands are needed. Crampons and ice axe used; harness/helmet recommended. Good first Himalayan summit.",
    "inclusions": [
     "A licensed, English-speaking guide for your group",
     "Porters to carry your main bags",
     "Trekking permits and national park or conservation area fees",
     "Teahouse or lodge rooms on the trek",
     "Transport and domestic flights shown in the itinerary",
     "Airport arrival and departure transfers in Kathmandu",
     "A licensed climbing guide for the summit day",
     "The peak climbing permit",
     "Group climbing equipment: fixed ropes and camp tents"
    ],
    "exclusions": [
     "International flights and your Nepal visa",
     "Travel insurance with helicopter rescue up to the trip's highest point",
     "Personal trekking gear",
     "Drinks, hot showers, phone charging and Wi-Fi in teahouses",
     "Tips for your guide and porters",
     "Personal climbing gear (boots, harness, crampons), which can be rented in Kathmandu"
    ],
    "contingency": "Teahouses to Kyanjin Gompa; tented high camp at Yala Kharka.",
    "acclimatizationNotes": "At least one acclimatization day at Kyanjin before moving to high camp."
   },
   "days": [
    {
     "dayNumber": 1,
     "dayLabel": null,
     "title": "Kathmandu - Dhunche - Syabrubesi (drive)",
     "description": "",
     "fromPlace": "Kathmandu",
     "toPlace": "Syabrubesi",
     "startAltitudeM": 1400,
     "highPointM": 1460,
     "sleepAltitudeM": 1460,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 2,
     "dayLabel": null,
     "title": "Syabrubesi - Lama Hotel",
     "description": "",
     "fromPlace": "Syabrubesi",
     "toPlace": "Lama Hotel",
     "startAltitudeM": 1460,
     "highPointM": 2470,
     "sleepAltitudeM": 2470,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 3,
     "dayLabel": null,
     "title": "Lama Hotel - Langtang village",
     "description": "",
     "fromPlace": "Lama Hotel",
     "toPlace": "Langtang village",
     "startAltitudeM": 2470,
     "highPointM": 3430,
     "sleepAltitudeM": 3430,
     "walkingHours": "5-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 4,
     "dayLabel": null,
     "title": "Langtang - Kyanjin Gompa",
     "description": "",
     "fromPlace": "Langtang village",
     "toPlace": "Kyanjin Gompa",
     "startAltitudeM": 3430,
     "highPointM": 3870,
     "sleepAltitudeM": 3870,
     "walkingHours": "3-4",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 5,
     "dayLabel": null,
     "title": "Acclimatization day (Kyanjin Ri hike)",
     "description": "",
     "fromPlace": "Kyanjin Gompa",
     "toPlace": "Kyanjin Gompa",
     "startAltitudeM": 3870,
     "highPointM": 3870,
     "sleepAltitudeM": 3870,
     "walkingHours": "4-5",
     "dayType": "rest-acclimatization",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 6,
     "dayLabel": null,
     "title": "Kyanjin Gompa - Yala Kharka / high camp",
     "description": "",
     "fromPlace": "Kyanjin Gompa",
     "toPlace": "Yala high camp",
     "startAltitudeM": 3870,
     "highPointM": 4800,
     "sleepAltitudeM": 4600,
     "walkingHours": "approx. 6",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 7,
     "dayLabel": null,
     "title": "Summit Yala Peak, descend to Kyanjin Gompa",
     "description": "Pre-dawn start; summit views include Shishapangma (8,013 m) in Tibet.",
     "fromPlace": "Yala high camp",
     "toPlace": "Kyanjin Gompa",
     "startAltitudeM": 4600,
     "highPointM": 5732,
     "sleepAltitudeM": 3870,
     "walkingHours": null,
     "dayType": "summit",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 8,
     "dayLabel": null,
     "title": "Spare weather day",
     "description": "",
     "fromPlace": "Kyanjin Gompa",
     "toPlace": "Kyanjin Gompa",
     "startAltitudeM": 3870,
     "highPointM": 3870,
     "sleepAltitudeM": 3870,
     "walkingHours": null,
     "dayType": "contingency",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 9,
     "dayLabel": null,
     "title": "Kyanjin Gompa - Lama Hotel",
     "description": "",
     "fromPlace": "Kyanjin Gompa",
     "toPlace": "Lama Hotel",
     "startAltitudeM": 3870,
     "highPointM": 3870,
     "sleepAltitudeM": 2470,
     "walkingHours": "6-7",
     "dayType": "trek",
     "accommodation": "teahouse"
    },
    {
     "dayNumber": 10,
     "dayLabel": null,
     "title": "Lama Hotel - Syabrubesi",
     "description": "",
     "fromPlace": "Lama Hotel",
     "toPlace": "Syabrubesi",
     "startAltitudeM": 2470,
     "highPointM": 2470,
     "sleepAltitudeM": 1460,
     "walkingHours": "4-6",
     "dayType": "trek",
     "accommodation": "hotel"
    },
    {
     "dayNumber": 11,
     "dayLabel": null,
     "title": "Syabrubesi - Kathmandu (drive)",
     "description": "",
     "fromPlace": "Syabrubesi",
     "toPlace": "Kathmandu",
     "startAltitudeM": 1460,
     "highPointM": 1460,
     "sleepAltitudeM": 1400,
     "walkingHours": null,
     "dayType": "travel",
     "accommodation": "hotel"
    }
   ]
  }
 }
];

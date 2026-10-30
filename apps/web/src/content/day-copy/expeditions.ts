const expeditionArrival =
  "Arrive in Kathmandu and transfer to your hotel. Over the first days you attend the expedition briefing at the Department of Tourism, collect the climbing permit, and check every piece of equipment with your expedition leader, with time to buy or rent anything missing.";
const khumbuApproach =
  "The approach trek follows the classic Everest trail: the flight to Lukla, then Phakding, Namche Bazaar with a rest day, Tengboche and Dingboche with a second rest day, and on past Lobuche and Gorak Shep to Base Camp. The slow pace is the start of your acclimatisation.";
const icefallDays =
  "At Base Camp the Sherpa team holds a puja, a Buddhist ceremony asking the mountain for safe passage. Then come training days on ladders, fixed ropes and oxygen equipment, before the first careful crossings of the Khumbu Icefall.";
const trekOutKhumbu =
  "Base Camp is cleared and all rubbish checked out, then the team walks down through Pheriche and Namche Bazaar to Lukla. Some climbers choose a helicopter instead.";
const flyHome =
  "The flight back to Kathmandu, then the summit certificate formalities at the Department of Tourism, a celebration with the team and your journey home.";

export const expeditions: Record<string, Record<string, string>> = {
  "ama-dablam-expedition": {
    "1": "Arrive in Kathmandu and transfer to your hotel. Your expedition leader checks your equipment and starts the permit paperwork.",
    "2": "The expedition briefing and permit collection at the Department of Tourism, with time for last purchases in Thamel.",
    "3": "An early flight to Lukla's short, steep airstrip, or from Manthali in the busiest months, then a gentle walk along the Dudh Kosi to Phakding.",
    "4": "Along the Dudh Kosi, into Sagarmatha National Park at Monjo and over the high Hillary Bridge, then the long climb to Namche Bazaar.",
    "5": "An acclimatisation hike to the Hotel Everest View terrace and Khumjung, with your first close look at Ama Dablam, then back to Namche.",
    "6": "The balcony trail with Ama Dablam ahead, then a climb through forest to Tengboche and its monastery, or on to Deboche.",
    "7": "A short walk to Pangboche, beneath the west face of Ama Dablam, home to the oldest monastery in the Khumbu and to many climbing Sherpas.",
    "8": "The route leaves the Everest trail, crosses the Imja Khola and climbs to the grassy base camp meadow at about 4,600 m, facing Everest, Lhotse and Nuptse. The team holds a puja ceremony.",
    "9-12":
      "Training on the fixed lines near base camp, then the first rotation: up to Yak Camp or Advance Base Camp (about 5,200 m) and a touch of Camp 1 (about 5,700 m) on the granite ridge, before returning to base camp to rest.",
    "13-16":
      "The second rotation: a night at Camp 1, then a climb on fixed ropes up the steep Yellow Tower to touch Camp 2, a cramped ledge on the ridge, before returning to base camp.",
    "17-22":
      "After rest days at base camp, the team waits for a summit window. You climb back through Camps 1 and 2, then over the Mushroom Ridge and the snow flutes of the upper face to the summit (6,812 m), before descending to the lower camps.",
    "23-24":
      "Base Camp is cleared, and you walk down through Pangboche and Namche Bazaar to Lukla.",
    "25": "The flight back to Kathmandu, with a spare day for weather before your journey home.",
  },
  "annapurna-i-expedition": {
    "1": expeditionArrival,
    "2": "A day of briefings, permit formalities and equipment checks in Kathmandu.",
    "3": "A short flight to Pokhara, beside Phewa Lake beneath the Annapurnas.",
    "4": "A drive along the Kali Gandaki valley to Dana, a village below the north side of Annapurna.",
    "5": "A helicopter flight from Dana to Annapurna I Base Camp (about 4,190 m) on the north side. The Sherpa team holds a puja ceremony on arrival.",
    "6-29":
      "Weeks of acclimatisation and rotations between base camp, Camp I and Camp II, building strength and fixing the route through mixed glacier terrain. Every move on the mountain is timed for the conditions, as parts of the route are exposed to avalanche and serac fall.",
    "30-37":
      "When the forecast opens a summit window, the team climbs through Camp II and Camp III to Camp IV (about 7,400 m), then sets out in the night for the summit of Annapurna I (8,091 m), before descending to the lower camps.",
    "38": "A helicopter flight from base camp back to Dana.",
    "39": "A drive to Pokhara and a flight to Kathmandu.",
    "40-41": "Spare days in Kathmandu for weather, rest and your journey home.",
  },
  "cho-oyu-expedition": {
    "1-4":
      "Arrive in Kathmandu for briefings and equipment checks while the paperwork for the season's route is completed: the Tibet visa and permits when the northern route is open, or the Department of Tourism permit for a climb from Nepal.",
    "5-8":
      "When the Tibet route is open, the team drives north via Timure and Kerung (Kyirong, about 2,700 m) to Tingri (about 4,300 m) on the Tibetan plateau, with rest days on the way to acclimatise.",
    "9-12":
      "A drive to the Chinese Base Camp (about 5,100 m), then a walk with yaks via Middle Camp to Advance Base Camp (about 5,700 m) on the Gyabrag glacier, the team's home for the next weeks.",
    "13-35":
      "Rotations from Advance Base Camp to Camp 1 at the foot of the north-west ridge (about 6,400 m), Camp 2 (about 7,100 m) and, for some, a high camp below the Yellow Band, returning to rest at Advance Base Camp between climbs.",
    "36-40":
      "In a weather window, the summit push climbs through the Yellow Band to the broad summit plateau of Cho Oyu (8,188 m) and back to Advance Base Camp. The team then packs up and drives back to Kathmandu, with spare days kept for weather.",
    "Nepal-side (not a standard commercial itinerary)":
      "A climb from Nepal approaches from Lukla through Namche and the Gokyo or Thame valley towards the Nangpa La, then climbs the south-west face from a base camp in Nepal. It is a harder, rarely climbed route, and we plan it only on request with experienced climbers.",
  },
  "dhaulagiri-expedition": {
    "1": expeditionArrival,
    "2": "A day of briefings, permit formalities and equipment checks in Kathmandu.",
    "3": "A short flight to Pokhara, beside Phewa Lake beneath the Annapurnas.",
    "4": "A long drive through Beni and up the Kali Gandaki gorge to Marpha, a Thakali village of whitewashed houses and apple orchards.",
    "5": "An acclimatisation day in Marpha, with a hike above the village or an excursion to Muktinath.",
    "6": "A steep climb out of the valley to camp at Yak Kharka (about 3,680 m).",
    "7": "Over the Dhampus Pass (about 5,244 m) into Hidden Valley, a high, empty valley ringed by peaks, where the team camps.",
    "8": "Over the French Pass (about 5,360 m), with Dhaulagiri's huge north face ahead, and down to Dhaulagiri Base Camp (about 4,750 m) on the glacier.",
    "9-27":
      "The puja ceremony, then weeks of rotations: up the glacier and icefall to Camp I (about 5,900 m), on to Camp II (about 6,500 m) and a touch of Camp III, returning to base camp to recover.",
    "28-34":
      "In a weather window, the team climbs through Camp II to Camp III (about 7,300 m) on the wind-exposed north-east ridge, then sets out in the night for the summit of Dhaulagiri I (8,167 m), before descending.",
    "35": "Back over the French Pass and the Dhampus Pass to Yak Kharka.",
    "36": "Down to Marpha and the comforts of a lodge.",
    "37": "A drive down the Kali Gandaki to Pokhara, or a flight from Jomsom.",
    "38-40": "Back to Kathmandu, with spare days for weather and your journey home.",
  },
  "everest-expedition-south-col": {
    "1-2": expeditionArrival,
    "3-11": khumbuApproach,
    "12-15": `${icefallDays} Many teams also climb Lobuche East (6,119 m) to acclimatise.`,
    "16-27":
      "Acclimatisation rotations through the Khumbu Icefall to Camp 1 (about 6,065 m), up the Western Cwm to Camp 2 (about 6,400 m) and onto the Lhotse Face to Camp 3 (about 7,160 m), returning to base camp after each to recover.",
    "28-33":
      "Rest at base camp, or lower in the valley where the thicker air helps recovery, while the team watches the forecast for a summit window.",
    "34-45":
      "The summit push, usually in mid to late May: from base camp to Camp 2, then on oxygen to Camp 3 and the South Col (Camp 4, about 7,950 m). A night start follows the south-east ridge over the South Summit and the Hillary Step to the summit of Everest (8,849 m), before the long descent.",
    "46-55": trekOutKhumbu,
    "56-60": flyHome,
  },
  "himlung-himal-expedition": {
    "1-2": expeditionArrival,
    "3-4":
      "A long drive west and up the Marsyangdi valley via Besisahar to Koto on the Annapurna Circuit, where the Nar Phu restricted area begins.",
    "5-8":
      "The trek turns north into the narrow Phu Khola gorge, climbing to the plateau at Meta and through kani gateways past Kyang to Phu, a medieval village of stone houses.",
    "9": "An acclimatisation day at Phu, with a visit to the Tashi Lhakhang monastery.",
    "10": "A climb above Phu to Himlung Base Camp (about 4,900 m), the team's home for the climb.",
    "11-22":
      "The puja ceremony and training, then rotations to Camp I (about 5,450 m), Camp II (about 6,000 m) and Camp III (about 6,350 m) over glaciers and snow slopes with fixed ropes on the steeper sections. In a weather window, the summit push reaches the top of Himlung Himal (7,126 m) on the border with Tibet.",
    "23-26":
      "Down to Phu and out through the gorge to Koto, then the drive back to Kathmandu.",
    "27-30":
      "Spare days for weather on the mountain, or for rest and sightseeing in Kathmandu.",
  },
  "kanchenjunga-expedition": {
    "1-2": `${expeditionArrival} The restricted-area permit is also issued in Kathmandu.`,
    "3": "A flight east to Bhadrapur, then a drive into the hills to Phidim.",
    "4-5":
      "A long drive to Yamphudin, at the restricted-area checkpoint, with a rest day to recover from the road.",
    "6-7":
      "The trek follows the southern trail through forest past Tortong to Tseram (Cheram).",
    "8-9":
      "Acclimatisation days at Tseram, with hikes towards Ramche and the Oktang viewpoint above the Yalung glacier.",
    "10": "The team moves to the Yalung Base Camp (about 5,475 m) below the south-west face, by helicopter or on foot along the glacier moraine.",
    "11-35":
      "The puja ceremony, then weeks of rotations on the south-west face: Camp 1 (about 6,200 m), Camp 2 (about 6,400 m) and Camp 3 (about 7,100 m), over glacier, serac terrain and steep snow, returning to base camp between climbs.",
    "36-45":
      "In a weather window, the summit push climbs to Camp 4 (about 7,550 m) and on to the summit of Kanchenjunga (8,586 m). Like the first ascent party, many climbers stop just short of the highest point out of respect for local beliefs. The team then descends to base camp.",
    "46-48":
      "The team leaves base camp by helicopter or on foot, drives back to Bhadrapur and flies to Kathmandu.",
    "49-50": "A spare day in Kathmandu and your journey home.",
  },
  "lhotse-expedition": {
    "1-2": expeditionArrival,
    "3-9": khumbuApproach,
    "10-15": `${icefallDays} The first move through the Icefall reaches Camp 1 (about 6,065 m).`,
    "16-39":
      "Rotations up the Western Cwm to Camp 2 and onto the Lhotse Face to Camp 3, returning to base camp to recover, then rest while the team waits for a summit window.",
    "40-53":
      "The summit push, usually in mid to late May: from base camp to Camp 2, then on oxygen to Camp 3 and Camp 4 near the Geneva Spur (about 7,850 m). A night start climbs the narrow Lhotse Couloir to the summit (8,516 m), before descending to Camp 2 and base camp.",
    "54-58": trekOutKhumbu,
    "59-60": flyHome,
  },
  "makalu-expedition": {
    "1-2": expeditionArrival,
    "3": "A flight east to Tumlingtar in the Arun valley, then a rough jeep ride via Khandbari to Num.",
    "4-5":
      "Down to the Arun river and up to Seduwa, then on to Tashigaon, the last permanent village.",
    "6-7":
      "A rest day at Tashigaon, then the steep climb through forest to Khongma Danda (about 3,500 m).",
    "8-10":
      "The high traverse over the Shipton La and Keke La, past frozen lakes, then down into the Barun valley via Dobato and Yangle Kharka to Langmale Kharka.",
    "11-14":
      "A walk up the Barun glacier to the lower base camp (about 4,900 m), a rest day, then the move to Advance Base Camp (about 5,650 m), the team's home for the climb.",
    "15-30":
      "The puja ceremony, then rotations to Camp 1 (about 6,200 m), Camp 2 and towards the Makalu La, returning to Advance Base Camp to recover.",
    "31-42":
      "In a weather window, the team climbs to Camp 3 near the Makalu La and Camp 4 on the north ridge, then up the French Couloir and the exposed summit ridge to the top of Makalu (8,485 m), before descending.",
    "43-49":
      "The camps are cleared and the team walks out through the Barun valley, over the passes and down to Num, then drives to Tumlingtar and flies to Kathmandu. Some climbers fly out by helicopter.",
    "50": "A spare day and your journey home.",
  },
  "manaslu-expedition": {
    "1-2": expeditionArrival,
    "3": "A helicopter flight from Kathmandu to Samagaon (about 3,500 m), the main village of the Nubri valley, beneath Manaslu.",
    "4-7":
      "Acclimatisation days around Samagaon, with hikes to Pungyen Gompa, Birendra Tal and the ridges above the village.",
    "8": "A climb from Samagaon to Manaslu Base Camp (about 4,800 m) beside the glacier.",
    "9-21":
      "The puja ceremony, then rotations to Camp 1 (about 5,600 m), Camp 2 (about 6,300 m) and Camp 3 (about 6,800 m), climbing through crevassed glacier and the ice cliffs above Camp 2 on fixed ropes, and returning to base camp to recover.",
    "22-32":
      "In a weather window, the team climbs to Camp 4 (about 7,400 m) and on along the exposed, corniced ridge to the true summit of Manaslu (8,163 m), then descends to base camp.",
    "33-37":
      "Down to Samagaon and out by helicopter, or on foot down the Budhi Gandaki to Soti Khola and the drive to Kathmandu.",
    "38": "Departure day. We take you to the airport for your flight home.",
  },
};

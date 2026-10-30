// Days shared by the Khumbu treks and climbs.
const arriveKathmandu =
  "Arrive in Kathmandu, where we meet you at the airport and take you to your hotel. In the afternoon your guide runs through the route, checks your gear and completes the permit paperwork, with time to buy or rent anything missing in Thamel.";
const luklaFlight =
  "An early flight into the mountains lands at Lukla's short, steep airstrip, one of the most dramatic in the world. In the busiest months flights leave from Manthali (Ramechhap) after a pre-dawn drive. From Lukla the trail drops gently along the Dudh Kosi to Phakding, a short first day to start the gradual climb.";
const toNamche =
  "The trail follows the Dudh Kosi over swaying suspension bridges to Monjo, where you enter Sagarmatha National Park, a UNESCO World Heritage Site. After the high Hillary Bridge comes the long, steep climb to Namche Bazaar, with a first glimpse of Everest on a clear day. Namche is the trading town of the Khumbu, built in a horseshoe of terraces.";
const namcheRest =
  "A rest day to acclimatise, following the rule of climbing high and sleeping low. A morning hike leads up to Syangboche and the Hotel Everest View terrace (about 3,880 m) for a panorama of Everest, Lhotse and Ama Dablam, then on to Khumjung with the school founded by Edmund Hillary. Back in Namche there is time for its bakeries, shops and the Sherpa museum.";
const toTengboche =
  "A balcony trail high above the Dudh Kosi, with Ama Dablam ahead, leads to Phunki Thanga at the river. A steady climb through rhododendron and pine forest then reaches Tengboche, home to the largest monastery in the Khumbu, set on a ridge facing Everest. If you arrive in time you can join the monks' afternoon prayers.";
const toDingboche =
  "The trail drops through forest, crosses the Imja Khola and climbs to Pangboche, where the oldest monastery in the region stands above the village. Beyond the tree line the valley opens out to Dingboche, a village of stone-walled barley fields beneath Ama Dablam and the Lhotse wall.";
const dingbocheRest =
  "A second acclimatisation day. In the morning you climb the ridge of Nangkartshang behind the village, gaining several hundred metres for views of Makalu, Lhotse, Ama Dablam and Island Peak, then return to Dingboche to rest. Your guide checks everyone's health before the move higher.";
const toLobuche =
  "The trail climbs onto the open plateau above Pheriche and reaches Thukla (Dughla) at the foot of the Khumbu glacier's moraine. A steep climb leads to the Thukla Pass, lined with memorials to climbers who died on Everest, before an easier walk beside the moraine to Lobuche.";
const toBaseCamp =
  "Following the edge of the Khumbu glacier, you reach Gorak Shep, the last settlement on the trail, beside a frozen lakebed. After lunch you walk on along the moraine to Everest Base Camp (5,364 m) at the foot of the Khumbu Icefall, where expedition tents gather in spring, before returning to Gorak Shep for the night.";
const kalaPatthar =
  "An early start for the climb to Kala Patthar (5,545 m), about 1.5 to 2 hours above Gorak Shep, the best place to see the summit of Everest, which is hidden from Base Camp. Sunrise lights Everest, Nuptse and Pumori around you. After breakfast at Gorak Shep you descend to sleep lower.";
const phericheToNamche =
  "A long but easy descent through Pangboche, then back up to Tengboche and down through the forest to the Dudh Kosi. The final climb returns you to Namche Bazaar, with thicker air and a warm bakery waiting.";
const namcheToLukla =
  "The last day on foot retraces the trail down the Dudh Kosi, crossing the Hillary Bridge and passing Monjo and Phakding. A final climb brings you to Lukla, where the team usually celebrates the end of the trek together.";
const luklaToKathmandu =
  "A morning flight back to Kathmandu, or to Manthali followed by the drive. Mountain weather can delay flights, so the afternoon is left free. In Kathmandu there is time for a hot shower and a walk in Thamel.";
const bufferDay =
  "A spare day in Kathmandu in case weather delays the Lukla flight. If the flights ran to time, it is free for sightseeing in the Kathmandu valley, shopping or rest before your flight home.";

const machhermoRoute =
  "From Namche the trail climbs to Mong La, a ridge with a chorten and one of the finest views of Ama Dablam. It then drops to Phortse Thanga on the Dudh Kosi and climbs through rhododendron forest to the small settlement of Dole.";
const toMachhermo =
  "A short climb along the open valley side, past summer yak pastures at Luza, brings you to Machhermo with views up to Cho Oyu. The short day helps acclimatisation, and the afternoon is free to rest or take a short walk above the village.";
const toGokyo =
  "The trail climbs onto the moraine beside the Ngozumpa, one of the longest glaciers in the Himalaya, and passes the first and second Gokyo lakes. Gokyo village stands on the shore of the third lake, Dudh Pokhari, its turquoise water ringed by peaks.";
const gokyoRi =
  "Before dawn you climb Gokyo Ri (5,357 m) above the village. From the top, Everest, Lhotse, Makalu and Cho Oyu, four of the world's six highest mountains, stand in one panorama above the lakes and the Ngozumpa glacier. The rest of the day is for resting or walking up the valley to the fourth and fifth lakes.";
const choLaFromThagnak =
  "The hardest day of the route starts before dawn. A steep, rocky climb leads to the Cho La (5,420 m), followed by a short glacier crossing on the far side where light crampons or microspikes help. The descent is steep and loose before the trail eases into Dzongla, beneath Cholatse.";
const gokyoToThagnak =
  "A short day across the Ngozumpa glacier, following a marked path over rubble-covered ice, to Thagnak (Dragnag) at the foot of the Cho La. The early arrival leaves time to rest and prepare for the pass.";

const climbPrep =
  "A day in Kathmandu to complete the climbing permit and check your technical gear: boots, harness, crampons, ice axe and ascender. Anything missing can be rented or bought in Thamel, and your climbing guide talks you through the route and the summit plan.";

export const everest: Record<string, Record<string, string>> = {
  "everest-base-camp-trek": {
    "1": arriveKathmandu,
    "2": luklaFlight,
    "3": toNamche,
    "4": namcheRest,
    "5": toTengboche,
    "6": toDingboche,
    "7": dingbocheRest,
    "8": toLobuche,
    "9": toBaseCamp,
    "10": `${kalaPatthar} Today you walk down to Pheriche, where the Himalayan Rescue Association runs a seasonal aid post.`,
    "11": phericheToNamche,
    "12": namcheToLukla,
    "13": luklaToKathmandu,
    "14": bufferDay,
  },
  "everest-three-passes-trek": {
    "1": arriveKathmandu,
    "2": luklaFlight,
    "3": toNamche,
    "4": namcheRest,
    "5": toTengboche,
    "6": toDingboche,
    "7": dingbocheRest,
    "8": "A short walk up the Imja valley to Chhukung, the last settlement below the Lhotse south face and Island Peak. The afternoon is free for an acclimatisation hike towards Chhukung Ri, and for preparing for the first pass.",
    "9": "The longest and highest day of the trek. An early start leads up past small lakes to the Kongma La (5,535 m), the highest of the three passes, with views over the Khumbu. A steep descent and a tiring crossing of the rubble-covered Khumbu glacier bring you to Lobuche.",
    "10": toBaseCamp,
    "11": `${kalaPatthar} Today you descend to Lobuche and turn west along a high trail to Dzongla, facing Cholatse and Taboche.`,
    "12": "Second pass day, starting before dawn. A rocky climb leads to the Cho La (5,420 m); near the top a short glacier section is crossed with light crampons or microspikes, and the descent to the west is steep and loose. The trail eases down to Thagnak (Dragnag) beside the Ngozumpa glacier.",
    "13": "A short day across the Ngozumpa glacier on a marked path over rubble-covered ice, then along the lakeshore to Gokyo village beside the third lake, Dudh Pokhari. The afternoon is free to rest by the turquoise water.",
    "14": gokyoRi,
    "15": "Third pass day. The trail climbs above the lake to the Renjo La (5,360 m), where the view back over Gokyo to Everest is one of the finest in Nepal. A long stone staircase leads down the far side to Lungden in the remote Bhote Koshi valley.",
    "16": "A gentle descent down the Bhote Koshi valley along the old trade route to the Nangpa La and Tibet, past Marlung, to Thame. The village is the home of many Everest Sherpas, and its monastery sits on the hillside above.",
    "17": "A short, easy walk down the Bhote Koshi valley through the village of Thamo and back to Namche Bazaar, closing the loop.",
    "18": namcheToLukla,
    "19": luklaToKathmandu,
    "20": bufferDay,
  },
  "gokyo-cho-la-everest-base-camp-trek": {
    "1": arriveKathmandu,
    "2": luklaFlight,
    "3": toNamche,
    "4": namcheRest,
    "5": machhermoRoute,
    "6": toMachhermo,
    "7": toGokyo,
    "8": gokyoRi,
    "9": gokyoToThagnak,
    "10": choLaFromThagnak,
    "11": "A short walk round the hillside from Dzongla, with Ama Dablam and the Khumbu valley ahead, joins the main Everest Base Camp trail at Lobuche.",
    "12": toBaseCamp,
    "13": `${kalaPatthar} Today you walk down to Pheriche, where the Himalayan Rescue Association runs a seasonal aid post.`,
    "14": phericheToNamche,
    "15": namcheToLukla,
    "16": luklaToKathmandu,
    "17": bufferDay,
  },
  "gokyo-lakes-trek": {
    "1": arriveKathmandu,
    "2": luklaFlight,
    "3": toNamche,
    "4": namcheRest,
    "5": machhermoRoute,
    "6": toMachhermo,
    "7": toGokyo,
    "8": gokyoRi,
    "9": "The trail retraces its way down the valley past the lakes and Machhermo, with Cho Oyu at your back, to Dole.",
    "10": "A descent through rhododendron forest to Phortse Thanga, then the climb over Mong La and the balcony trail back to Namche Bazaar.",
    "11": namcheToLukla,
    "12": `${luklaToKathmandu} We recommend keeping a spare day in Kathmandu before your international flight.`,
  },
  "everest-view-trek": {
    "1": `${luklaFlight} We meet you at your Kathmandu hotel before the flight.`,
    "2": toNamche,
    "3": "An acclimatisation hike from Namche to Syangboche and the terrace of Hotel Everest View (about 3,880 m), for a panorama of Everest, Lhotse and Ama Dablam. The trail continues to Khumjung, with its monastery and the school founded by Edmund Hillary, before returning to Namche.",
    "4": toTengboche,
    "5": "Sunrise on Everest and Ama Dablam from Tengboche, then the trail returns down through the forest to the Dudh Kosi and back along the balcony path to Namche Bazaar.",
    "6": namcheToLukla,
    "7": luklaToKathmandu,
    "8": bufferDay,
  },
  "island-peak-climbing": {
    "1": arriveKathmandu,
    "2": climbPrep,
    "3": luklaFlight,
    "4": toNamche,
    "5": namcheRest,
    "6": toTengboche,
    "7": toDingboche,
    "8": dingbocheRest,
    "9": toLobuche,
    "10": toBaseCamp,
    "11": `${kalaPatthar} Today the long descent continues to Dingboche, which counts as a well-earned rest before the climb.`,
    "12": "A short walk up the Imja valley to Chhukung, the last settlement below the Lhotse south face, with Island Peak rising ahead. The afternoon is free to rest.",
    "13": "A gentle walk beside the Imja glacier's moraine to Island Peak Base Camp (Pareshaya Gyab), where you spend the next nights in tents with a camp crew.",
    "14": "A training day at base camp. Your climbing guide practises fitting crampons, walking on snow, using the ascender on a fixed rope and abseiling, so every move on summit day feels familiar. Some teams move up to High Camp (about 5,600 m) in the afternoon.",
    "15": "Summit day starts around midnight. A rocky gully leads to the crampon point (about 5,800 m), then the route crosses the glacier and climbs the steep snow and ice headwall on fixed ropes to a short, airy summit ridge. From the top (6,165 m) Lhotse towers above you. You descend all the way to Chhukung.",
    "16": "A reserve day in case weather or conditions stop the first summit attempt. If it is not needed, it gives an easier pace on the way down.",
    "17": "A long descent down the Imja valley past Dingboche and Pangboche, then the climb through the forest to Tengboche.",
    "18": "Down through the rhododendron forest to the Dudh Kosi and along the balcony trail to Namche Bazaar.",
    "19": namcheToLukla,
    "20": luklaToKathmandu,
    "21": bufferDay,
  },
  "lobuche-east-peak-climbing": {
    "1": arriveKathmandu,
    "2": climbPrep,
    "3": luklaFlight,
    "4": toNamche,
    "5": namcheRest,
    "6": toTengboche,
    "7": toDingboche,
    "8": dingbocheRest,
    "9": toLobuche,
    "10": toBaseCamp,
    "11": `${kalaPatthar} Today you walk back down to Lobuche, at the foot of the peak.`,
    "12": "A climb over rocky slopes to Lobuche East High Camp (about 5,400 m), set among boulders below the glacier, where you sleep in tents. In the afternoon your climbing guide runs a skills session on crampons, ascender and abseiling.",
    "13": "Summit day starts before 2 am. A rocky trail leads to the crampon point, then the route crosses the glacier and climbs steep snow on fixed ropes to the summit ridge, with Everest, Lhotse and Nuptse close across the valley. After abseiling down the steep sections you descend to Pheriche.",
    "14": "A reserve day in case weather stops the first summit attempt. If it is not needed, it becomes an easy rest day in Pheriche.",
    "15": phericheToNamche,
    "16": namcheToLukla,
    "17": luklaToKathmandu,
    "18": bufferDay,
  },
  "mera-peak-climbing": {
    "1": `${arriveKathmandu} Your climbing guide also checks your technical gear and completes the peak permit.`,
    "2": "An early flight to Lukla, then a walk south, away from the Everest trail, through forest and farmland to Paiya (Chutok). From here the route heads for the quiet Hinku valley.",
    "3": "A day of ups and downs through rhododendron and bamboo forest, crossing the Kari La pass to the hillside village of Pangom, with views back to the Dudh Kosi.",
    "4": "The trail contours around forested ridges and crosses streams to Ningsow, a small village in the middle hills. Few trekkers come this way and the lodges are simple.",
    "5": "A climb through dense forest, home to red pandas, then down to Chhatra Khola, a riverside settlement in a narrow valley.",
    "6": "The trail turns north into the Hinku valley, following the river through forest with Mera Peak appearing ahead, to Kothe.",
    "7": "An acclimatisation day. You hike up the Hinku valley to gain height and come back down to sleep at Kothe, following the rule of climbing high and sleeping low.",
    "8": "Above the tree line the valley widens into yak pastures. You pass the small Lungsumgba gompa, carved into the rock, before reaching Thangnak below the Charpate glacier.",
    "9": "A second acclimatisation day, with a hike above the village towards the Charpate glacier and its lake, then back to Thangnak for the night.",
    "10": "A short but steep climb beside the Dig glacier to Khare, below the Mera glacier, with the north face of Mera Peak above the village.",
    "11": "An acclimatisation and training day. You hike up towards the Mera La for height, then your climbing guide practises crampons, rope work and walking on the glacier.",
    "12": "Over the Mera La (about 5,415 m) and up the broad Mera glacier to High Camp (about 5,780 m), set on a rocky outcrop with views of Everest, Makalu and Kanchenjunga. You sleep in tents.",
    "13": "Summit day starts after midnight. Roped together, you climb steady snow slopes on the glacier for several hours, with no headwall, to the summit at dawn. Five of the world's 8,000 m peaks are in view: Everest, Lhotse, Cho Oyu, Makalu and Kanchenjunga. You descend the same day to Khare.",
    "14": "A reserve day in case weather stops the first summit attempt. If it is not needed, it is a well-earned rest at Khare.",
    "15": "Down the Hinku valley through the pastures of Thangnak to Kothe and the tree line.",
    "16": "A climb out of the Hinku valley towards the Zatrwa La, to the high pastures at Thuli Kharka.",
    "17": "Over the Zatrwa La (about 4,610 m), with a last view of the Hinku peaks and the Dudh Kosi valley, then a long, steep descent to Lukla.",
    "18": luklaToKathmandu,
    "19": bufferDay,
    "20": "Departure day. We take you to the airport in time for your flight home.",
  },
};

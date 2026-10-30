import { arriveRestricted, departure } from "./shared";

const toNepalgunj =
  "A flight of about an hour west over the lowlands to Nepalgunj, a busy town close to the Indian border and the gateway for flights into the far west. The rest of the day is free, with an early night before the mountain flight.";
const toDunai =
  "An early-morning flight over the foothills to the airstrip at Juphal, then an easy walk down through villages and terraced fields to Dunai, the district headquarters of Dolpa, beside the Thuli Bheri river. Mountain flights here are often delayed by weather, so the plan stays flexible.";
const ringmoRest =
  "A rest day at Ringmo beside Phoksundo Lake, the deepest lake in Nepal, its water an intense turquoise. You can walk along the shore to the Tshowa monastery of the Bon religion, one of the oldest faiths in the Himalaya.";
const backFromJuphal =
  "Morning flights from Juphal to Nepalgunj connect to Kathmandu. Weather in the mountains often delays them, so we keep spare days in the plan before your international flight.";

export const west: Record<string, Record<string, string>> = {
  "upper-dolpo-trek": {
    "1": toNepalgunj,
    "2": toDunai,
    "3": "The trail enters Shey Phoksundo National Park, the largest national park in Nepal, and follows the narrow Suli Gad gorge upstream through forest and small villages to Chhepka.",
    "4": "Up the gorge through pine and walnut forest, crossing the river several times, to the small settlement of Rechi.",
    "5": "An easy acclimatisation day, with a short hike above the village to gain height before the climb to Phoksundo Lake.",
    "6": "A climb past the great waterfall below Phoksundo Lake, then the first view of the lake from the ridge before descending to Ringmo, a village of stone houses and chortens on the shore.",
    "7": ringmoRest,
    "8": "The trail follows the west shore of the lake on a narrow, exposed path cut into the cliffs high above the water, then drops to the Phoksundo Khola and follows the valley upstream to camp.",
    "9": "An acclimatisation day, hiking up the valley towards the Kang La to gain height, then returning to sleep at the camp.",
    "10": "The trail leaves the river and climbs through a side valley to the camp at Phoksundo Bhanjyang, below the Kang La.",
    "11": "An early start for the Kang La (5,360 m), with views over the brown hills of Upper Dolpo. A steep descent leads down to Shey Gompa, the Crystal Monastery, in its hidden valley.",
    "12": "A rest day at Shey Gompa, beneath the Crystal Mountain, a sacred peak circled by pilgrims. There is time to visit the monastery and the nearby hermitage of Tsakang.",
    "13": "Over the Saldang La (about 5,100 m), with views across the high plateau of Upper Dolpo, and down to Namgung and its red monastery built against the cliff.",
    "14": "A short walk to Saldang, the largest village of Upper Dolpo, spread along a ridge above the Nagon Khola, with fields of barley and buckwheat.",
    "15": "Along the valley past chortens and small monasteries to Sibu, a village surrounded by terraced fields.",
    "16": "A walk up the valley through yak pastures to camp at Jeng La Phedi, at the foot of the pass.",
    "17": "An early climb to the Jeng La (about 5,100 m), with views of the Dhaulagiri range, then a descent into the Tarap valley to Tokyu.",
    "18": "A short walk down the valley to Dho Tarap, a village of Buddhist and Bon families with several monasteries.",
    "19": "A rest day in Dho Tarap to visit its monasteries and village life before the long walk out.",
    "20": "Down the Tarap Khola through a narrowing valley of juniper and wild rose to Toltol.",
    "21": "The Tarap Khola gorge cuts deep through the mountains. The trail follows it down, on ledges and bridges, to Khanigaon.",
    "22": "Down to the Thuli Bheri and along the river to Tarakot, an old fortified village on a hill.",
    "23": "An easy walk along the Thuli Bheri river back to Dunai.",
    "24": "A walk back up to the airstrip at Juphal for the next day's flight.",
    "25": backFromJuphal,
  },
  "lower-dolpo-trek": {
    "1": arriveRestricted,
    "2": "A day in Kathmandu while the restricted-area permit is completed, with time to see the Kathmandu valley or finish packing.",
    "3": toNepalgunj,
    "4": toDunai,
    "5": "An easy walk along the Thuli Bheri river to Tarakot, an old fortified village on a hill.",
    "6": "The trail turns into the Tarap Khola valley and climbs through forest to Laini.",
    "7": "Through the narrow gorge of the Tarap Khola, on ledges and bridges, to Nawarpani.",
    "8": "The gorge opens into the wide Tarap valley and you reach Dho Tarap, a village of Buddhist and Bon families.",
    "9": "A rest day at Dho Tarap to acclimatise and visit the monasteries of the Tarap valley.",
    "10": "A climb above the valley to the camp at Numa La Base Camp.",
    "11": "Over the Numa La (about 5,190 m), with views towards the Dhaulagiri range, and down to camp at Pelung Tang.",
    "12": "Over the Baga La (about 5,070 m), the second high pass on consecutive days, then down to Dajok Tang.",
    "13": "A descent through forest to Ringmo, beside Phoksundo Lake.",
    "14": ringmoRest,
    "15": "Down past the great waterfall below the lake and through forest along the Suli Gad to Shyanta.",
    "16": "An easy walk out to the airstrip at Juphal.",
    "17": backFromJuphal,
    "18": departure,
  },
  "rara-lake-trek": {
    "1": toNepalgunj,
    "2": "A short flight into the mountains to the airstrip at Talcha, then a gentle walk of a few hours through pine forest to Rara Lake, Nepal's largest lake, inside Rara National Park.",
    "3": "A walk around the shore of the lake through forest of blue pine, spruce and juniper, with views across the clear water to the hills. You may see waterfowl on the lake and musk deer or langur monkeys in the forest.",
    "4": "A hike to Murma Top (about 3,726 m) for a view over the whole lake and, on a clear day, the snow peaks of the far west. You return to the lake for the night.",
    "5": "A walk back to Talcha and a flight to Nepalgunj.",
    "6": "A flight from Nepalgunj back to Kathmandu.",
  },
};

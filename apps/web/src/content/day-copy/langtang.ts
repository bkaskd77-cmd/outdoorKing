const toSyabrubesi =
  "A drive of seven to nine hours north from Kathmandu, along the Trishuli river and up a winding mountain road through Dhunche, to Syabrubesi, the trailhead at the meeting of the Bhote Koshi and Langtang Khola.";
const toLamaHotel =
  "The trail crosses the river and follows the Langtang Khola upstream through forest of oak, maple and rhododendron, past Bamboo and Rimche, to Lama Hotel. Langur monkeys and, with luck, red pandas live in these woods.";
const toLangtangVillage =
  "The forest thins as the valley widens past the army post at Ghoda Tabela, with Langtang Lirung towering above. Langtang village, buried by an avalanche in the 2015 earthquake, has been rebuilt by its Tamang families a little further along the valley.";
const toKyanjin =
  "A short walk past long mani walls, prayer wheels and the hamlet of Mundu to Kyanjin Gompa (3,870 m), a village of lodges around a small monastery, surrounded by glaciers. The local cheese factory sells yak cheese.";
const kyanjinHike =
  "A day hike from Kyanjin Gompa: either Kyanjin Ri (4,773 m), a few hours up and down, or the longer climb to Tserko Ri (4,984 m), the best viewpoint in the valley, with Langtang Lirung and the glaciers spread around you. You return to sleep at Kyanjin.";
const kyanjinToLama =
  "A long, easy descent back down the valley through Langtang village and Ghoda Tabela into the forest at Lama Hotel.";
const lamaToSyabrubesi =
  "Down through the forest beside the Langtang Khola to Syabrubesi, with a hot shower at the end of the trail.";
const backToKathmandu =
  "The drive back to Kathmandu along the mountain road and the Trishuli river, arriving in the afternoon.";

export const langtang: Record<string, Record<string, string>> = {
  "langtang-valley-trek": {
    "1": toSyabrubesi,
    "2": toLamaHotel,
    "3": toLangtangVillage,
    "4": toKyanjin,
    "5": kyanjinHike,
    "6": kyanjinToLama,
    "7": lamaToSyabrubesi,
    "8": backToKathmandu,
  },
  "langtang-gosainkunda-trek": {
    "1": toSyabrubesi,
    "2": toLamaHotel,
    "3": toLangtangVillage,
    "4": toKyanjin,
    "5": kyanjinHike,
    "6": kyanjinToLama,
    "7": "Down the valley, then onto the upper trail across the hillside to Thulo Syabru, a Tamang village strung along a ridge, with views back to Langtang Lirung.",
    "8": "A steady climb through forest past Dursagang to Sing Gompa (Chandanbari), with its small monastery and a cheese factory, and the first views of the Ganesh Himal.",
    "9": "Above the tree line the trail climbs past Cholangpati and Laurebina, with views from the Annapurnas to Manaslu and Ganesh Himal, to Gosainkunda (4,380 m). The sacred lake, said to have been created by Shiva, draws thousands of pilgrims at the August full moon.",
    "10": "The trail passes smaller lakes and climbs to the Laurebina La (4,610 m), the high point of the trek. A long, rocky descent leads into Helambu, past Phedi, to Ghopte.",
    "11": "A climb to Tharepati, with views of the Jugal Himal, then down through forest past Mangengoth to the village of Kutumsang on its ridge.",
    "12": "Along the forested ridge through Gul Bhanjyang and Chipling to Chisapani, the 'cold water' village, with a view north to the Langtang and Jugal ranges.",
    "13": "A final walk through the forest of Shivapuri Nagarjun National Park, past Borlang Bhanjyang, down to Sundarijal at the edge of the Kathmandu valley, then a short drive to your hotel.",
  },
  "helambu-trek": {
    "1": "A short drive to Sundarijal at the edge of the Kathmandu valley, then a climb through the forest of Shivapuri Nagarjun National Park, past a reservoir, to Chisapani, with views north to the Langtang and Jugal ranges.",
    "2": "Along forested ridges and through farming villages, past Pati Bhanjyang, to Kutumsang, a village on a ridge in Hyolmo country.",
    "3": "A climb through rhododendron forest, past the shepherds' huts of Magen Goth, to Tharepati (3,640 m), the high point of the trek, with a wide view of the Himalaya from Langtang to the Jugal Himal.",
    "4": "A steep descent through forest to Melamchi Gaon, the first large Hyolmo village, with its monastery above terraced fields.",
    "5": "Down to the Melamchi Khola and up the other side to Tarkeghyang, a large Hyolmo village of closely packed stone houses and an old monastery.",
    "6": "An easy walk along the hillside through forest and apple orchards to Sermathang, a peaceful village with a monastery and views back up the valley.",
    "7": "Down through terraced farmland to Melamchi Pul Bazaar, then a drive of two to three hours back to Kathmandu.",
  },
  "tamang-heritage-trail": {
    "1": toSyabrubesi,
    "2": "A climb through Goljung to Gatlang, a large Tamang village of carved wooden houses. Staying with families, you see the village's daily life and, in the evening, traditional songs and dances. The small lake of Parvati Kunda is a short walk away.",
    "3": "Past the Chilime hydropower project and up through forest to Tatopani, where natural hot springs make the perfect end to the day.",
    "4": "A climb to the Nagthali viewpoint (about 3,165 m), a high meadow with views of Langtang, Ganesh Himal and the mountains of Tibet, then down to Thuman, a traditional Tamang village.",
    "5": "Down to Timure on the old trade route to Tibet, close to the historic Rasuwagadhi fort and the border crossing.",
    "6": "A walk along the hillside to Briddim, a Tamang village where the community runs homestays and welcomes visitors with local food.",
    "7": "Down through Wangel to Syabrubesi and the end of the trail.",
    "8": backToKathmandu,
  },
  "yala-peak-climbing": {
    "1": `${toSyabrubesi} We meet you at your Kathmandu hotel in the morning.`,
    "2": toLamaHotel,
    "3": toLangtangVillage,
    "4": toKyanjin,
    "5": "An acclimatisation day at Kyanjin Gompa, with a hike up Kyanjin Ri (4,773 m) and time for your climbing guide to check equipment and run a crampon and rope session.",
    "6": "A climb above Kyanjin through the yak pastures of Yala Kharka to the high camp (about 4,600 m), where you sleep in tents with views of Langtang Lirung.",
    "7": "A pre-dawn start for the summit. The route crosses snow slopes and scrambles over rock to a short, steep summit block (5,732 m), with Shishapangma, one of the fourteen 8,000 m peaks, in view across the border in Tibet. You descend to Kyanjin Gompa.",
    "8": "A spare day in case weather delays the summit. If it is not needed, there is time for a walk up the valley towards the Langshisa glaciers.",
    "9": kyanjinToLama,
    "10": lamaToSyabrubesi,
    "11": backToKathmandu,
  },
};

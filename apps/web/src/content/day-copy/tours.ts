import { departure } from "./shared";

const kathmanduSites =
  "A day with your guide among the Kathmandu valley's World Heritage sites: the temples and palace courtyards of Kathmandu Durbar Square (Hanuman Dhoka); Swayambhunath, the stupa on its hill above the city; Pashupatinath, the most sacred Hindu temple in Nepal, where non-Hindus watch the riverside ghats from the far bank; and the great white dome of Boudhanath, circled by pilgrims at dusk.";
const chitwanDay =
  "A full day in Chitwan National Park. At dawn a dugout canoe drifts down the Rapti past gharial and mugger crocodiles and riverbirds, then a guided jungle walk follows animal tracks. In the afternoon a jeep safari into the grasslands gives the best chance of one-horned rhinos, deer and, with great luck, a tiger. The midday heat is spent resting at the lodge.";

export const tours: Record<string, Record<string, string>> = {
  "bardia-national-park-safari": {
    "1": "A flight of about an hour to Nepalgunj, then a drive of around three hours to Thakurdwara, on the edge of Bardia National Park. In the late afternoon you walk through a Tharu village or visit the park headquarters.",
    "2": "A full day on foot with licensed naturalist guides, following tiger tracks along the Karnali riverbanks and waiting quietly at watchtowers over the grasslands. Tiger sightings are never guaranteed, but the chance of one is what makes Bardia special.",
    "3": "A full-day jeep safari deep into the park, with a stop by the Karnali river to look for river dolphins, gharial and mugger crocodiles, and wild elephants and deer in the forest and grassland.",
    "4": "An early bird walk around the edge of the park, then the drive to Nepalgunj and the flight back to Kathmandu.",
  },
  "bhutan-add-on-tour": {
    "1": "A flight from Kathmandu to Paro, with views of the Himalaya on a clear day from the left side of the plane. Your Bhutanese guide meets you for the drive to Thimphu, the capital.",
    "2": "In Thimphu you visit the giant Buddha Dordenma statue, the National Memorial Chorten and Tashichho Dzong. The road then climbs to the Dochula Pass with its 108 chortens and mountain views, and descends to the warm valley of Punakha.",
    "3": "A visit to Punakha Dzong, a fortress-monastery at the meeting of two rivers, the long suspension bridge nearby and Chimi Lhakhang, before the drive back over the pass to Paro.",
    "4": "The walk to Paro Taktsang, the Tiger's Nest, a monastery clinging to a cliff about 900 m above the valley. The climb takes two to three hours at a steady pace. In the afternoon you can visit Rinpung Dzong or the National Museum.",
    "5": "The flight from Paro back to Kathmandu.",
  },
  "bungee-and-canyon-swing-adventure": {
    "1": "A drive of three to four hours from Kathmandu along the Araniko Highway to The Last Resort, near the Tibetan border. After a full safety briefing you jump from the suspension bridge high above the Bhote Koshi, on a bungee or the canyon swing. Afterwards you return to Kathmandu or stay the night in tents by the river.",
  },
  "chitwan-national-park-safari": {
    "1": "A short flight to Bharatpur or a five to seven hour drive to Sauraha, on the edge of Chitwan National Park. In the afternoon you walk through a Tharu village, watch the sunset over the Rapti river and see the traditional Tharu stick dance in the evening.",
    "2": `${chitwanDay} You can also visit the elephant breeding centre.`,
    "3": "An optional early bird walk, then a flight from Bharatpur to Kathmandu, or a drive on to Pokhara or Lumbini.",
  },
  "everest-helicopter-tour": {
    "1": "The helicopter leaves Kathmandu at first light and flies along the Himalaya to Lukla to refuel, then up the Khumbu valley over Namche Bazaar and Tengboche to Everest Base Camp and the Khumbu glacier. When weather and rules allow, you land at Kala Patthar facing Everest for a few minutes of photographs. On the way back you stop for breakfast at Hotel Everest View, with Everest and Ama Dablam in view, before returning to Kathmandu by late morning.",
  },
  "kathmandu-valley-heritage-tour": {
    "1": kathmanduSites,
    "2": "Patan Durbar Square, with its temples, palace courtyards and the Patan Museum of sacred art; then Bhaktapur, a medieval Newar city of brick lanes, potters' squares and tiered temples, where your ticket covers the whole old town. The day ends at Changu Narayan, one of the oldest temples in the valley, on a hilltop above the fields.",
  },
  "lumbini-pilgrimage-tour": {
    "1": "A short flight from Kathmandu to Bhairahawa, then a drive of about 22 km to Lumbini. In the evening you walk through the Sacred Garden as the monks' chanting fills the air.",
    "2": "A day at the birthplace of the Buddha: the Maya Devi Temple with the marker stone of his birth, the Ashoka Pillar and the Puskarini pond, then the monasteries built by Buddhist countries in the East and West Monastic Zones, and the World Peace Pagoda. Shoes are removed in the temple.",
    "3": "An optional visit to the ruins of Tilaurakot, linked with the ancient city of Kapilavastu, then the flight from Bhairahawa back to Kathmandu.",
  },
  "mountain-biking-kathmandu-valley": {
    "1": "A transfer to Budhanilkantha, then a ride up into the forest of Shivapuri Nagarjun National Park, climbing past Mulkharka to Chisapani on the valley rim, with the Langtang range to the north.",
    "2": "Along the northern and eastern rim of the valley on jeep tracks and village trails, through Tamang villages and terraced fields, to Nagarkot for sunset over the Himalaya.",
    "3": "Mostly off-road from Nagarkot through Nala to the old town of Dhulikhel, then up to the Buddhist monastery at Namobuddha on its forested ridge.",
    "4": "Down to Panauti, a Newar town of old temples at the meeting of two rivers, then a climb to the forest ridge of Lakuri Bhanjyang.",
    "5": "Single track along the ridge and a long descent to Godawari at the foot of Phulchowki, then a transfer back to your Kathmandu hotel.",
  },
  "nepal-cultural-heritage-tour": {
    "1": "Arrive in Kathmandu, where we meet you at the airport and take you to your hotel. The evening is free to explore Thamel.",
    "2": kathmanduSites,
    "3": "Patan Durbar Square and the medieval city of Bhaktapur, then a drive up to Nagarkot on the valley rim for sunset over the Himalaya.",
    "4": "Sunrise over the Himalaya from Nagarkot, then a drive down to the lowlands and Sauraha, on the edge of Chitwan National Park.",
    "5": `${chitwanDay} In the evening you visit a Tharu village.`,
    "6": "A drive of five to six hours through the hills to Pokhara, beside Phewa Lake beneath the Annapurnas.",
    "7": "Sunrise over the Annapurnas from Sarangkot, a boat to the Tal Barahi temple on Phewa Lake, the walk up to the World Peace Pagoda, and visits to Davis Falls, the Gupteshwor Mahadev Cave and the International Mountain Museum.",
    "8": "A drive of about two hours to Bandipur, a preserved Newar hill bazaar of old houses and stone-paved streets, with time to explore on foot.",
    "9": "Sunrise over the Himalaya from Bandipur, then the drive back to Kathmandu.",
    "10": departure,
  },
  "nepal-white-water-rafting": {
    "1": "A drive of about three hours from Kathmandu to the put-in on the Trishuli river. After a safety briefing your river guides lead you through rapids that are exciting but suited to beginners, with a riverside camp for the night.",
    "2": "Another morning on the Trishuli to the take-out near Mugling, then a drive back to Kathmandu or on to Pokhara or Chitwan. As the river flows towards Chitwan, the trip combines well with a safari.",
  },
  "pokhara-lakeside-tour": {
    "1": "A pre-dawn drive to Sarangkot for sunrise over the Annapurnas, Machhapuchhre and Dhaulagiri. Then a boat across Phewa Lake to the Tal Barahi island temple and on to the south shore for the walk up to the World Peace Pagoda, before visits to Davis Falls and the Gupteshwor Mahadev Cave.",
    "2": "The International Mountain Museum, the deep, narrow gorge of the Seti river, the Bindhyabasini temple and the old bazaar of Pokhara, with an optional afternoon at the quieter Begnas Lake.",
  },
  "pokhara-paragliding": {
    "1": "A pick-up from your Pokhara hotel and a jeep ride up to the launch ridge at Sarangkot. After a briefing and harness check with your licensed pilot, a few running steps lift you off the slope for a tandem flight over the Pokhara valley and Phewa Lake, with the Annapurnas ahead. You land beside the lake at Khapaudi and are driven back to your hotel.",
  },
  "tibet-add-on-tour": {
    "1": "A day in Kathmandu while the Tibet group visa is completed, with a briefing on the trip and the altitude.",
    "2": "A flight over the Himalaya to Lhasa Gonggar airport, where your Tibetan guide meets you with the Tibet Travel Permit. At 3,656 m, the rest of the day is for resting to help acclimatisation.",
    "3": "The Potala Palace, former winter home of the Dalai Lamas, rising above the city, then the Jokhang Temple, the holiest in Tibet, and the Barkhor pilgrim circuit around it.",
    "4": "The great monasteries of Drepung and Sera. At Sera, in the afternoon, you can watch the monks' lively debates in the courtyard.",
    "5": "A day trip over the Kamba La pass to Yamdrok Lake (about 4,441 m), a turquoise lake among high mountains, or more time in Lhasa.",
    "6": "The flight from Lhasa back to Kathmandu.",
  },
};

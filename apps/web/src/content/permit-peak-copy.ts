import { peakSections } from "./peak-sections";
import type { CatalogPeak, CatalogPermit } from "./types";

const restricted =
  "This is a restricted area. Nepal issues restricted-area permits only through a registered trekking agency, for groups of at least two trekkers walking with a licensed guide. We apply for it in Kathmandu with copies of your passport and visa, so allow a working day after you arrive.";
const nationalPark = (park: string, where: string) =>
  `${park} protects ${where}. Every foreign visitor pays an entry fee, which we arrange before or at the park gate.`;

const permitBase: CatalogPermit[] = [
  {
    slug: "tims",
    name: "TIMS card",
    authority: "Nepal Tourism Board",
    lastVerifiedAt: "2026-10-20",
    requiresLicensedGuide: true,
    notes: `The TIMS card (Trekkers' Information Management System) records who is walking where, so that trekkers can be traced in an emergency. It is needed on most trekking routes outside the Everest region, where the local Khumbu trek card is used instead.

Since 2023 the card is issued only through registered trekking agencies to trekkers walking with a licensed guide. We arrange it with your other permits.`,
  },
  {
    slug: "sagarmatha-national-park",
    name: "Sagarmatha National Park entry",
    authority: "Department of National Parks and Wildlife Conservation",
    lastVerifiedAt: "2026-10-20",
    notes: `${nationalPark("Sagarmatha National Park, a UNESCO World Heritage Site,", "the upper Khumbu around Everest, from Monjo to the high peaks")}

The permit is checked at the park entrance at Monjo, on the second day of most Everest treks, and is needed for every trek, climb and helicopter landing in the park.`,
  },
  {
    slug: "khumbu-trek-card",
    name: "Khumbu Pasang Lhamu trek card",
    authority: "Khumbu Pasang Lhamu Rural Municipality",
    lastVerifiedAt: "2026-10-20",
    notes: `The local municipality of the Khumbu charges every trekker an entry fee, collected as a trek card near Lukla. It funds trail and village services in the region and replaces the TIMS card for Everest region treks.

We arrange it with your Sagarmatha National Park permit.`,
  },
  {
    slug: "acap",
    name: "Annapurna Conservation Area Permit (ACAP)",
    authority: "National Trust for Nature Conservation",
    lastVerifiedAt: "2026-10-20",
    notes: `The Annapurna Conservation Area is the largest protected area in Nepal, covering the Annapurna range from the Pokhara foothills to Manang and Mustang. Every trekker needs the ACAP permit, which funds conservation and community projects in the region.

It is needed for the Annapurna Base Camp, Annapurna Circuit, Poon Hill, Mardi Himal and Khopra treks, for Upper Mustang and Nar Phu alongside their restricted-area permits, and on the final days of the Manaslu Circuit. The permit is checked at several points on the trail and costs more if bought there, so we arrange it in advance.`,
  },
  {
    slug: "manaslu-rap",
    name: "Manaslu Restricted Area Permit",
    authority: "Department of Immigration",
    lastVerifiedAt: "2026-10-20",
    requiresLicensedGuide: true,
    notes: `The upper Budhi Gandaki valley around Manaslu is a restricted area, entered at Jagat on the Manaslu Circuit. ${restricted}

You also need the Manaslu Conservation Area Permit, and the Annapurna permit for the descent to Dharapani.`,
  },
  {
    slug: "mcap",
    name: "Manaslu Conservation Area Permit (MCAP)",
    authority: "National Trust for Nature Conservation",
    lastVerifiedAt: "2026-10-30",
    notes: `The Manaslu Conservation Area protects the Budhi Gandaki valley, Nubri and the Tsum valley. Every trekker on the Manaslu Circuit or in Tsum needs this permit as well as the restricted-area permit.`,
  },
  {
    slug: "tsum-rap",
    name: "Tsum Valley Restricted Area Permit",
    authority: "Department of Immigration",
    lastVerifiedAt: "2026-10-30",
    requiresLicensedGuide: true,
    notes: `The Tsum valley, a sacred Tibetan Buddhist valley off the Manaslu trail, opened to trekkers in 2008 and has its own restricted-area permit, checked at Lokpa. ${restricted}

You also need the Manaslu Conservation Area Permit, and the Manaslu restricted-area permit if you continue round the circuit.`,
  },
  {
    slug: "upper-mustang-rap",
    name: "Upper Mustang Restricted Area Permit",
    authority: "Department of Immigration",
    lastVerifiedAt: "2026-10-20",
    requiresLicensedGuide: true,
    notes: `Upper Mustang, the former kingdom of Lo north of Kagbeni, is a restricted area. The permit is checked as you leave Kagbeni and is charged for the days you spend inside the area. ${restricted}

You also need the Annapurna Conservation Area Permit.`,
  },
  {
    slug: "nar-phu-rap",
    name: "Nar Phu Restricted Area Permit",
    authority: "Department of Immigration",
    lastVerifiedAt: "2026-10-30",
    requiresLicensedGuide: true,
    notes: `The Nar and Phu valleys, north of the Annapurna Circuit, are a restricted area entered at Koto. The same permit covers the approach to Himlung Himal. ${restricted}

You also need the Annapurna Conservation Area Permit.`,
  },
  {
    slug: "kanchenjunga-rap",
    name: "Kanchenjunga Restricted Area Permit",
    authority: "Department of Immigration",
    lastVerifiedAt: "2026-10-30",
    requiresLicensedGuide: true,
    notes: `The upper valleys around Kanchenjunga in Taplejung district are a restricted area, covering both the north and south base camp trails. ${restricted}

You also need the Kanchenjunga Conservation Area entry permit.`,
  },
  {
    slug: "kanchenjunga-conservation-area",
    name: "Kanchenjunga Conservation Area entry",
    authority: "Kanchenjunga Conservation Area Management Council",
    lastVerifiedAt: "2026-10-30",
    notes: `The Kanchenjunga Conservation Area protects the forests, glaciers and villages around the world's third-highest mountain, and is managed by the local communities. Every trekker pays an entry fee alongside the restricted-area permit.`,
  },
  {
    slug: "makalu-rap",
    name: "Makalu Restricted Area Permit",
    authority: "Department of Immigration",
    lastVerifiedAt: "2026-10-30",
    requiresLicensedGuide: true,
    notes: `Parts of the upper Arun valley in Sankhuwasabha district, near the Tibetan border, are a restricted area. The standard routes to Makalu Base Camp and Makalu, through Num and the Barun valley, do not usually enter it, so most Makalu trips do not need this permit.

If your route does enter it, the permit is issued only through a registered trekking agency, for groups of at least two trekkers walking with a licensed guide, and we apply for it in Kathmandu with copies of your passport and visa.`,
  },
  {
    slug: "makalu-barun-national-park",
    name: "Makalu Barun National Park entry",
    authority: "Department of National Parks and Wildlife Conservation",
    lastVerifiedAt: "2026-10-30",
    notes: `${nationalPark("Makalu Barun National Park", "the wild Barun valley beneath Makalu, from tropical forest to glaciers")}

The permit is registered at Seduwa on the Makalu trail. The park also covers the Hinku valley, so it is needed for Mera Peak.`,
  },
  {
    slug: "langtang-national-park",
    name: "Langtang National Park entry",
    authority: "Department of National Parks and Wildlife Conservation",
    lastVerifiedAt: "2026-10-30",
    notes: `${nationalPark("Langtang National Park", "the Langtang valley, Gosainkunda and the upper Helambu ridges, north of Kathmandu")}

It is needed for the Langtang valley, Gosainkunda, Helambu, the Tamang Heritage Trail and Yala Peak.`,
  },
  {
    slug: "rasuwa-rap",
    name: "Rasuwa Restricted Area Permit",
    authority: "Department of Immigration",
    lastVerifiedAt: "2026-10-30",
    requiresLicensedGuide: true,
    notes: `The villages near the Tibetan border in Rasuwa district, including Thuman and Timure on the Tamang Heritage Trail, are a restricted area. ${restricted}`,
  },
  {
    slug: "shivapuri-nagarjun-national-park",
    name: "Shivapuri Nagarjun National Park entry",
    authority: "Department of National Parks and Wildlife Conservation",
    lastVerifiedAt: "2026-10-30",
    notes: `${nationalPark("Shivapuri Nagarjun National Park", "the forested hills on the northern edge of the Kathmandu valley")}

It is needed for the Helambu trek, for treks that finish at Sundarijal, and for mountain bike rides through the park.`,
  },
  {
    slug: "upper-dolpo-rap",
    name: "Upper Dolpo Restricted Area Permit",
    authority: "Department of Immigration",
    lastVerifiedAt: "2026-10-30",
    requiresLicensedGuide: true,
    notes: `Upper Dolpo, beyond the Kang La, is one of the most tightly controlled restricted areas in Nepal. ${restricted}

You also need the Shey Phoksundo National Park permit, and the Lower Dolpo permit for the parts of the route that pass through it.`,
  },
  {
    slug: "lower-dolpo-rap",
    name: "Lower Dolpo Restricted Area Permit",
    authority: "Department of Immigration",
    lastVerifiedAt: "2026-10-30",
    requiresLicensedGuide: true,
    notes: `Lower Dolpo, including the Tarap valley and the passes to Phoksundo Lake, is a restricted area. ${restricted}

You also need the Shey Phoksundo National Park permit.`,
  },
  {
    slug: "shey-phoksundo-national-park",
    name: "Shey Phoksundo National Park entry",
    authority: "Department of National Parks and Wildlife Conservation",
    lastVerifiedAt: "2026-10-30",
    notes: nationalPark(
      "Shey Phoksundo National Park, the largest national park in Nepal,",
      "Phoksundo Lake, Shey Gompa and the high valleys of Dolpo",
    ),
  },
  {
    slug: "rara-national-park",
    name: "Rara National Park entry",
    authority: "Department of National Parks and Wildlife Conservation",
    lastVerifiedAt: "2026-10-30",
    notes: nationalPark(
      "Rara National Park",
      "Rara Lake, the largest lake in Nepal, and the pine forests around it",
    ),
  },
  {
    slug: "chitwan-national-park",
    name: "Chitwan National Park entry",
    authority: "Department of National Parks and Wildlife Conservation",
    lastVerifiedAt: "2026-10-30",
    notes: nationalPark(
      "Chitwan National Park, a UNESCO World Heritage Site,",
      "the forests, grasslands and rivers of the inner Terai, home to rhinos, tigers and gharial",
    ),
  },
  {
    slug: "bardia-national-park",
    name: "Bardia National Park entry",
    authority: "Department of National Parks and Wildlife Conservation",
    lastVerifiedAt: "2026-10-30",
    notes: nationalPark(
      "Bardia National Park",
      "the sal forest, grasslands and Karnali river channels of the far west, home to tigers and wild elephants",
    ),
  },
  {
    slug: "nma-island-peak",
    name: "NMA trekking peak climbing permit",
    authority: "Nepal Mountaineering Association",
    lastVerifiedAt: "2026-10-20",
    notes: `Nepal's trekking peaks, such as Island Peak, Mera Peak, Lobuche East, Pisang Peak, Chulu West and Yala Peak, are climbed on a permit from the Nepal Mountaineering Association. The permit is issued for a named peak and season, and climbers also leave a refundable garbage deposit.

The fee depends on the peak and the season, and a few peaks have none. We apply for the permit in Kathmandu and your climbing guide carries it on the mountain.`,
  },
  {
    slug: "dot-expedition-permit",
    name: "Expedition climbing permit (royalty)",
    authority: "Department of Tourism",
    lastVerifiedAt: "2026-10-30",
    notes: `Expedition peaks, from Ama Dablam and Himlung to Everest and the other 8,000 m peaks, are climbed on a permit from Nepal's Department of Tourism. The fee, called royalty, depends on the mountain, the route and the season.

Expeditions also leave a refundable garbage deposit, may be assigned a government liaison officer, and on Everest and Lhotse pay the Khumbu Icefall route fee. The application is made in Kathmandu, where the climbing team also attends a briefing at the Department of Tourism.`,
  },
  {
    slug: "kathmandu-valley-heritage-sites",
    name: "Kathmandu valley heritage site tickets",
    authority: "Site management committees",
    lastVerifiedAt: "2026-10-30",
    notes: `The Durbar squares of Kathmandu, Patan and Bhaktapur, Swayambhunath, Boudhanath, Pashupatinath and Changu Narayan each charge foreign visitors an entry ticket, which funds their upkeep. The Bhaktapur ticket covers the whole old city. Your guide buys the tickets on the day.`,
  },
  {
    slug: "lumbini-entry",
    name: "Lumbini Sacred Garden entry",
    authority: "Lumbini Development Trust",
    lastVerifiedAt: "2026-10-30",
    notes: `Visitors to the Sacred Garden and the Maya Devi Temple at Lumbini pay a daily entry fee to the Lumbini Development Trust, which cares for the site. Your guide arranges it on arrival.`,
  },
  {
    slug: "tibet-travel-permit",
    name: "Tibet Travel Permit and group visa",
    authority: "Tibet Tourism Bureau",
    lastVerifiedAt: "2026-10-30",
    notes: `Travel to Tibet from Nepal needs a Chinese group visa, issued in Kathmandu, and a Tibet Travel Permit arranged by a licensed Tibetan agency. Visitors travel with a Tibetan guide on a set itinerary. The rules can change at short notice, so we confirm them with you before you book.`,
  },
  {
    slug: "bhutan-visa",
    name: "Bhutan visa and Sustainable Development Fee",
    authority: "Department of Immigration, Bhutan",
    lastVerifiedAt: "2026-10-30",
    notes: `Visitors to Bhutan travel with a licensed Bhutanese guide on a visa arranged before arrival, and pay the Sustainable Development Fee for each night, which funds conservation and public services. Both are arranged through a licensed Bhutanese tour operator.`,
  },
];

// Published fees per person for foreign nationals, from official tables as researched
// in October 2026. They change, so every quote confirms the amounts at booking.
const permitFees: Record<string, string[]> = {
  tims: [
    "NPR 2,000 (SAARC nationals NPR 1,000).",
    "Not charged in the Everest region, where the Khumbu trek card applies.",
  ],
  "sagarmatha-national-park": [
    "NPR 3,000 per entry (SAARC nationals NPR 1,500).",
    "Children under 10: free.",
    "Helicopter landings pay a separate fee, charged to the operator.",
  ],
  "khumbu-trek-card": [
    "NPR 3,000 (SAARC and Chinese nationals NPR 2,000), since July 2024.",
  ],
  acap: [
    "NPR 3,000 per entry (SAARC nationals NPR 1,000).",
    "Children under 10: free.",
    "The fee doubles if the permit is bought at a checkpoint on the trail.",
  ],
  "manaslu-rap": [
    "September to November: USD 100 for the first week, then USD 15 per day.",
    "December to August: USD 75 for the first week, then USD 10 per day.",
    "Climbers with an expedition permit must hold it but pay no fee.",
  ],
  mcap: ["NPR 3,000 per entry (SAARC nationals NPR 1,000)."],
  "tsum-rap": [
    "September to November: USD 40 for the first week, then USD 7 per day.",
    "December to August: USD 30 for the first week, then USD 7 per day.",
  ],
  "upper-mustang-rap": [
    "USD 50 per day spent in the restricted area, since November 2025 (before that, USD 500 for the first 10 days).",
  ],
  "nar-phu-rap": [
    "September to November: USD 100 for the first week, then USD 15 per day.",
    "December to August: USD 75 for the first week, then USD 15 per day.",
    "Official sources differ slightly on these amounts; your quote shows the amount charged.",
  ],
  "kanchenjunga-rap": ["USD 20 per week for the first four weeks, then USD 25 per week."],
  "kanchenjunga-conservation-area": ["NPR 2,000 per entry (SAARC nationals NPR 500)."],
  "makalu-rap": ["USD 20 per week for the first four weeks, then USD 25 per week."],
  "makalu-barun-national-park": [
    "NPR 3,000 per entry (SAARC nationals NPR 1,500).",
    "Children under 10: free.",
  ],
  "langtang-national-park": [
    "NPR 3,000 per entry (SAARC nationals NPR 1,500).",
    "Children under 10: free.",
  ],
  "rasuwa-rap": ["USD 20 per week."],
  "shivapuri-nagarjun-national-park": [
    "NPR 1,000 per entry (SAARC nationals NPR 600).",
    "Children under 10: free.",
  ],
  "upper-dolpo-rap": ["USD 500 for the first 10 days, then USD 50 per day."],
  "lower-dolpo-rap": ["USD 20 for the first week, then USD 5 per week."],
  "shey-phoksundo-national-park": [
    "NPR 3,000 per entry (SAARC nationals NPR 1,500).",
    "Children under 10: free.",
  ],
  "rara-national-park": [
    "NPR 3,000 per entry (SAARC nationals NPR 1,500).",
    "Children under 10: free.",
  ],
  "chitwan-national-park": [
    "NPR 2,000 per day, plus 13% VAT (SAARC nationals NPR 1,000).",
    "Children under 10: free.",
  ],
  "bardia-national-park": [
    "NPR 1,500 per entry (SAARC nationals NPR 750).",
    "Children under 10: free.",
  ],
  "nma-island-peak": [
    "Island Peak, Mera Peak, Lobuche East, Pisang Peak and Chulu West: USD 350 in spring (March to May), USD 175 in autumn, winter and summer, since September 2025.",
    "Tharpu Chuli: no royalty.",
    "Yala Peak: no royalty is currently charged.",
    "A refundable garbage deposit is paid for each permit.",
  ],
  "dot-expedition-permit": [
    "Everest, normal route: USD 15,000 in spring, USD 7,500 in autumn, USD 3,750 in winter and summer.",
    "Other 8,000 m peaks (Lhotse, Makalu, Kanchenjunga, Cho Oyu, Dhaulagiri, Annapurna I): USD 3,000 in spring, USD 1,500 in autumn, USD 750 in winter and summer.",
    "Manaslu: USD 1,500 in spring, USD 3,000 in autumn, USD 1,500 in winter and summer.",
    "Peaks of 7,001 to 7,500 m, such as Himlung Himal: USD 800 in spring, USD 400 in autumn, USD 200 in winter and summer.",
    "Ama Dablam: USD 1,000 in spring and autumn, USD 500 in winter and summer.",
    "Rates since September 2025. Everest, Lhotse and Nuptse climbers also pay the Khumbu Icefall route fee of USD 600.",
    "Expedition permit holders pay no restricted-area permit fee.",
  ],
  "kathmandu-valley-heritage-sites": [
    "Kathmandu Durbar Square: NPR 1,000.",
    "Patan Durbar Square: NPR 1,000.",
    "Bhaktapur old city: NPR 2,000 or USD 15, since July 2025.",
    "Pashupatinath: NPR 1,000 per day.",
    "Boudhanath: NPR 400.",
    "Changu Narayan: NPR 300.",
    "Swayambhunath: NPR 200.",
    "SAARC nationals pay less at every site.",
  ],
  "lumbini-entry": ["NPR 1,000 per day, since May 2026 (SAARC nationals NPR 700)."],
  "tibet-travel-permit": [
    "The Tibet Travel Permit has no published fee and is included in the tour price.",
    "The Chinese group visa fee depends on your nationality.",
  ],
  "bhutan-visa": [
    "Sustainable Development Fee: USD 100 per night until 31 August 2027 (standard rate USD 200). Children aged 6 to 11 pay half; under 6, free.",
    "Visa: USD 40, once.",
  ],
};

const feeNote =
  "Fees for foreign nationals as published in 2026. They change from time to time, so your quote confirms the current amounts, and we pay them for you.";

function withFees(permit: CatalogPermit): CatalogPermit {
  const lines = permitFees[permit.slug];
  if (!lines?.length) return permit;
  return {
    ...permit,
    notes: `${permit.notes}\n\n## Fees\n${lines.map((line) => `- ${line}`).join("\n")}\n\n${feeNote}`,
  };
}

export const permits: CatalogPermit[] = permitBase.map(withFees);

/** Classification labels for the site. */
export const peakClassName: Record<string, string> = {
  "nma-trekking-peak-group-a": "Trekking peak",
  "nma-trekking-peak-group-b": "Trekking peak",
  "expedition-peak": "Expedition peak",
};

/** Each peak with its introduction only, as first seeded. */
export const peakIntros: CatalogPeak[] = [
  {
    slug: "island-peak",
    name: "Island Peak (Imja Tse)",
    heightM: 6165,
    region: "everest",
    classification: "nma-trekking-peak-group-a",
    description: `Island Peak rises from the Imja valley below the south face of Lhotse, standing like an island in a sea of ice, which gave it its English name. It is the most popular trekking peak in Nepal and a classic first Himalayan summit.

The normal route climbs a rocky gully from base camp to the crampon point, crosses a glacier and climbs a steep snow and ice headwall on fixed ropes to a short, exposed summit ridge. Most climbers acclimatise first on the trek to Everest Base Camp.`,
  },
  {
    slug: "mera-peak",
    name: "Mera Peak",
    heightM: 6476,
    region: "everest",
    classification: "nma-trekking-peak-group-a",
    description: `Mera Peak, in the Hinku valley south of Everest, is the highest of Nepal's trekking peaks. Its summit gives one of the finest views in the Himalaya, with five 8,000 m peaks in sight: Everest, Lhotse, Cho Oyu, Makalu and Kanchenjunga.

The normal route crosses the Mera La and climbs the broad Mera glacier from a high camp. It is not steep, and the challenge is the altitude and a long summit day.`,
  },
  {
    slug: "lobuche-east",
    name: "Lobuche East",
    heightM: 6119,
    region: "everest",
    classification: "nma-trekking-peak-group-a",
    description: `Lobuche East rises above the Khumbu glacier opposite Everest, Lhotse and Nuptse. It is steeper and more technical than Island Peak, and its summit ridge gives a close view of the world's highest mountains.

The route climbs rock slabs and a glacier, then steep snow on fixed ropes to the summit ridge. The true summit lies along an exposed ridge beyond the first top.`,
  },
  {
    slug: "pisang-peak",
    name: "Pisang Peak",
    heightM: 6091,
    region: "annapurna",
    classification: "nma-trekking-peak-group-a",
    description: `Pisang Peak is a snow pyramid above the village of Pisang in the Marsyangdi valley, on the Annapurna Circuit. From the top the view takes in Annapurna II, Gangapurna, Tilicho Peak and the Manang valley.

The normal route climbs from base and high camps up a steep, exposed snow and ice slope with fixed ropes to the summit.`,
  },
  {
    slug: "chulu-west",
    name: "Chulu West",
    heightM: 6419,
    region: "annapurna",
    classification: "nma-trekking-peak-group-a",
    description: `Chulu West stands above Manang, among the Chulu peaks north of the Annapurna range. It is a bigger objective than most trekking peaks, climbed in stages from base camp through two higher camps.

The summit push follows the north-east ridge on snow and ice, with fixed ropes on the steeper sections, and looks across to the Annapurnas, Gangapurna, Tilicho Peak, Manaslu and Dhaulagiri.`,
  },
  {
    slug: "yala-peak",
    name: "Yala Peak",
    heightM: 5732,
    region: "langtang",
    classification: "nma-trekking-peak-group-b",
    description: `Yala Peak rises above Kyanjin Gompa in the Langtang valley and is one of the most approachable Himalayan summits. From the top you can see Shishapangma, one of the fourteen 8,000 m peaks, across the border in Tibet.

The route crosses snow slopes and scrambles over rock to a short, steep summit block, and needs fitness rather than technical experience.`,
  },
  {
    slug: "tharpu-chuli",
    name: "Tharpu Chuli (Tent Peak)",
    heightM: 5695,
    region: "annapurna",
    classification: "nma-trekking-peak-group-b",
    description: `Tharpu Chuli, also called Tent Peak, rises inside the Annapurna Sanctuary opposite Machhapuchhre, with Annapurna I, Annapurna South and Hiunchuli all around.

The normal route from Annapurna Base Camp crosses a glacier and climbs steep snow gullies on fixed ropes to a short, narrow summit ridge. It is more sustained than Island Peak.`,
  },
  {
    slug: "ama-dablam",
    name: "Ama Dablam",
    heightM: 6812,
    region: "everest",
    classification: "expedition-peak",
    description: `Ama Dablam, the "mother's necklace", is the most recognisable mountain in the Khumbu, rising above Pangboche and Tengboche. It was first climbed in 1961 by its Southwest Ridge, still the normal route.

The climb follows the ridge on fixed ropes over granite slabs, the steep Yellow Tower and the snow of the Mushroom Ridge to the summit. It is a technical expedition climb that needs experience on rock, snow and ice.`,
  },
  {
    slug: "himlung-himal",
    name: "Himlung Himal",
    heightM: 7126,
    region: "annapurna",
    classification: "expedition-peak",
    description: `Himlung Himal stands on the border with Tibet above the hidden Nar Phu valley. It is one of the best first 7,000 m peaks: technically straightforward, but high and remote enough to be a real expedition.

The route climbs glaciers and snow slopes through three high camps, with fixed ropes on the steeper sections.`,
  },
  {
    slug: "everest",
    name: "Mount Everest",
    heightM: 8849,
    region: "everest",
    classification: "expedition-peak",
    description: `Mount Everest, Sagarmatha in Nepali and Chomolungma in Tibetan, is the highest mountain on Earth. Edmund Hillary and Tenzing Norgay first reached the summit on 29 May 1953 by the South Col route from Nepal.

The route climbs the Khumbu Icefall, the Western Cwm and the Lhotse Face to the South Col, then follows the Southeast Ridge over the South Summit and the Hillary Step to the top.`,
  },
  {
    slug: "lhotse",
    name: "Lhotse",
    heightM: 8516,
    region: "everest",
    classification: "expedition-peak",
    description: `Lhotse, the world's fourth-highest mountain, is joined to Everest by the South Col. It was first climbed in 1956 by Fritz Luchsinger and Ernst Reiss of the Swiss expedition.

The normal route shares the Everest route to the Lhotse Face, then climbs the narrow Lhotse Couloir to the summit.`,
  },
  {
    slug: "cho-oyu",
    name: "Cho Oyu",
    heightM: 8188,
    region: "everest",
    classification: "expedition-peak",
    description: `Cho Oyu, the "turquoise goddess", is the world's sixth-highest mountain, on the border between Nepal and Tibet west of Everest. It was first climbed in 1954 by Herbert Tichy, Sepp Jöchler and Pasang Dawa Lama.

Most ascents follow the north-west ridge from Tibet, one of the most moderate routes on any 8,000 m peak.`,
  },
  {
    slug: "makalu",
    name: "Makalu",
    heightM: 8485,
    region: "makalu",
    classification: "expedition-peak",
    description: `Makalu, the world's fifth-highest mountain, is an isolated four-sided pyramid south-east of Everest. It was first climbed in 1955 by Jean Couzy and Lionel Terray of the French expedition.

The normal route climbs to the Makalu La, then up the French Couloir to an exposed summit ridge. It is one of the hardest 8,000 m peaks.`,
  },
  {
    slug: "manaslu",
    name: "Manaslu",
    heightM: 8163,
    region: "manaslu",
    classification: "expedition-peak",
    description: `Manaslu, the "mountain of the spirit", is the world's eighth-highest mountain, rising above the Nubri valley. It was first climbed in 1956 by Toshio Imanishi and Gyalzen Norbu of a Japanese expedition.

The Northeast Face route climbs through four camps to an exposed, corniced ridge leading to the true summit. It is often chosen as a first 8,000 m peak.`,
  },
  {
    slug: "dhaulagiri",
    name: "Dhaulagiri I",
    heightM: 8167,
    region: "mustang",
    classification: "expedition-peak",
    description: `Dhaulagiri I, the "white mountain", is the world's seventh-highest, towering over the Kali Gandaki gorge opposite Annapurna. It was first climbed in 1960 by a Swiss–Austrian expedition by its Northeast Ridge.

The approach crosses the Dhampus Pass and French Pass through Hidden Valley, and the climb follows the wind-exposed ridge through three high camps.`,
  },
  {
    slug: "kanchenjunga",
    name: "Kanchenjunga",
    heightM: 8586,
    region: "kanchenjunga",
    classification: "expedition-peak",
    description: `Kanchenjunga, on Nepal's border with Sikkim, is the world's third-highest mountain. It was first climbed on 25 May 1955 by George Band and Joe Brown, who stopped just short of the summit out of respect for local beliefs.

The usual route from Nepal climbs the Southwest Face from the Yalung glacier, through glacier and serac terrain to the summit pyramid.`,
  },
  {
    slug: "annapurna-i",
    name: "Annapurna I",
    heightM: 8091,
    region: "annapurna",
    classification: "expedition-peak",
    description: `Annapurna I was the first 8,000 m peak ever climbed, by Maurice Herzog and Louis Lachenal of the French expedition on 3 June 1950. It remains one of the most serious of the high peaks.

The north-side route from the Kali Gandaki climbs glaciers and steep snow through four camps, with sections exposed to avalanche and serac fall.`,
  },
];

/** Each peak with its full page text: the introduction, then the longer sections. */
export const peaks: CatalogPeak[] = peakIntros.map((peak) => {
  const more = peakSections[peak.slug];
  return more && peak.description
    ? { ...peak, description: `${peak.description}\n${more}` }
    : peak;
});

/** The peaks each climbing trip climbs. */
export const tripPeaks: Record<string, string[]> = {
  "island-peak-climbing": ["island-peak"],
  "mera-peak-climbing": ["mera-peak"],
  "lobuche-east-peak-climbing": ["lobuche-east"],
  "pisang-peak-climbing": ["pisang-peak"],
  "chulu-west-peak-climbing": ["chulu-west"],
  "yala-peak-climbing": ["yala-peak"],
  "tharpu-chuli-tent-peak-climbing": ["tharpu-chuli"],
  "ama-dablam-expedition": ["ama-dablam"],
  "himlung-himal-expedition": ["himlung-himal"],
  "everest-expedition-south-col": ["everest"],
  "lhotse-expedition": ["lhotse"],
  "cho-oyu-expedition": ["cho-oyu"],
  "makalu-expedition": ["makalu"],
  "manaslu-expedition": ["manaslu"],
  "dhaulagiri-expedition": ["dhaulagiri"],
  "kanchenjunga-expedition": ["kanchenjunga"],
  "annapurna-i-expedition": ["annapurna-i"],
};

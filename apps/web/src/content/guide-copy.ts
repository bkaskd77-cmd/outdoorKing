/**
 * Travel guides: the planning articles under /guides. Bodies use the same markup as
 * the CMS pages ("## " headings, "- " bullet points) and are seeded into the Pages
 * collection, where editors change them. The group, order and related trips stay in
 * code. Nothing here states a company fact the owner has not supplied.
 */

export type GuideGroup = "plan" | "trail" | "health";

export const guideGroupName: Record<GuideGroup, string> = {
  plan: "Planning your trip",
  trail: "On the trail",
  health: "Health and climbing",
};

export type GuideEntry = {
  /** Slug of the CMS page. */
  slug: string;
  title: string;
  /** Web address, always under /guides/. */
  path: string;
  group: GuideGroup;
  /** Trips the guide talks about, shown beside it. */
  trips: string[];
  body: string;
};

export const guides: GuideEntry[] = [
  {
    slug: "choosing-your-trek",
    title: "How to choose a trek in Nepal",
    path: "/guides/choosing-your-trek",
    group: "plan",
    trips: [
      "ghorepani-poon-hill-trek",
      "langtang-valley-trek",
      "annapurna-base-camp-trek",
      "everest-base-camp-trek",
      "manaslu-circuit-trek",
      "upper-dolpo-trek",
    ],
    body: `Nepal has hundreds of trekking routes, from a few days among villages and rhododendron forest to a month in the remote far west. The right trek depends on four things: how much time you have, how high you want to go, how much comfort you need, and when you can travel.
## Start with your time
Count the days you can spend in Nepal, then leave at least two for Kathmandu: one to arrive and recover, one spare at the end in case a mountain flight is delayed.
- Under a week on the trail: Ghorepani Poon Hill, Mardi Himal, the Helambu trek or the Everest View trek.
- One to two weeks: Langtang Valley, Annapurna Base Camp, the Annapurna Circuit, the Manaslu Circuit or Everest Base Camp.
- Three weeks or more: the Everest Three Passes, Kanchenjunga, Makalu Base Camp or Upper Dolpo.
## Decide how high to go
Altitude, not distance, is what makes a trek hard. Below about 3,500 m most healthy walkers acclimatise without trouble. Above 5,000 m every itinerary needs rest days, and some people feel the altitude however carefully they climb.
- Below 3,500 m: Poon Hill, Helambu, the Tamang Heritage Trail and Tsum Valley.
- 4,000 to 5,000 m: Annapurna Base Camp, Langtang Valley, Mardi Himal and Upper Mustang.
- Above 5,000 m: Everest Base Camp, Gokyo, the Annapurna Circuit's Thorong La, the Manaslu Circuit's Larkya La and Kanchenjunga.
## Teahouse or camping
Most popular treks stay in teahouses: family-run lodges with a bed, a warm dining room and a menu. In remote areas such as Upper Dolpo, Kanchenjunga and parts of Makalu, lodges are few or very simple, and some nights are spent in tents with a cook and support crew. Camping treks take more planning and cost more, but reach the quietest valleys in the country.
## Busy trails or quiet ones
Everest Base Camp, Annapurna Base Camp and the Annapurna Circuit are busy in October and April. If you prefer quiet trails, look at Manaslu, Tsum Valley, Nar Phu, Langtang or Makalu, or walk the classic routes in early spring or late autumn.
## Restricted areas
Upper Mustang, Manaslu, Tsum, Nar Phu, Upper Dolpo and Kanchenjunga are restricted areas. They need a special permit, a licensed guide and at least two trekkers in the group, and some permits cost much more than the classic treks. We arrange all of this, but it affects the budget and the minimum group size.
## Still not sure?
Tell us how many days you have, when you can travel and what you want from the mountains. A trip designer will suggest two or three routes and explain the differences.`,
  },
  {
    slug: "best-time-to-trek",
    title: "Best time to trek in Nepal",
    path: "/guides/best-time-to-trek",
    group: "plan",
    trips: [
      "everest-base-camp-trek",
      "ghorepani-poon-hill-trek",
      "upper-mustang-trek",
      "upper-dolpo-trek",
    ],
    body: `Nepal has two main trekking seasons, spring and autumn, but there is a good trip for almost every month. The right month depends on where you want to go and how high.
## Autumn (September to November)
Clear skies after the monsoon and the sharpest mountain views. Days are warm in the valleys and cold above 4,000 m, and the air is at its clearest in October and November. It is the most popular season, so the classic trails and lodges are busy and flights to Lukla book up early. Early September can still bring monsoon rain.
## Winter (December to February)
Cold nights and quiet trails. Lower treks such as Poon Hill, Helambu, Mardi Himal and the Kathmandu valley rim are excellent, with clear views and few other walkers. High passes such as Thorong La, Larkya La and the Everest passes can close after snowfall, and some high lodges shut for the winter. Everest Base Camp is possible in winter for walkers prepared for nights well below freezing.
## Spring (March to May)
Warmer days, rhododendron forests in flower between about 2,000 and 3,500 m, and the expedition season on Everest. Haze and afternoon cloud often build later in the season, so views are best in the morning. Late May brings the first pre-monsoon showers.
## Monsoon (June to August)
Rain most afternoons, leeches in the forests, cloud on the high peaks and frequent delays on mountain flights. Landslides can close roads. The rain-shadow regions north of the main Himalaya, such as Upper Mustang, Nar Phu and Dolpo, stay much drier and are at their best.
## Month by month
- January and February: low treks, cultural tours and wildlife safaris.
- March to May: high treks and trekking peaks, with spring flowers.
- June to August: Upper Mustang, Dolpo and Nar Phu.
- September: lower treks, with high treks from the middle of the month.
- October and November: every high trek and climb, at their busiest.
- December: low and middle treks, and Everest for hardy walkers.
## Festivals
Dashain and Tihar, Nepal's biggest festivals, usually fall in October or November. Buses and flights are busy and some offices close, so we plan around the dates. In Upper Mustang, the Tiji festival in Lo Manthang usually falls in May.`,
  },
  {
    slug: "nepal-visa-and-arrival",
    title: "Nepal visa and arriving in Kathmandu",
    path: "/guides/nepal-visa-and-arrival",
    group: "plan",
    trips: ["kathmandu-valley-heritage-tour", "tibet-add-on-tour", "bhutan-add-on-tour"],
    body: `Most visitors can get a tourist visa on arrival at Tribhuvan International Airport in Kathmandu. Citizens of a few countries must apply in advance at a Nepali embassy, so check the Department of Immigration's website for your nationality before you book flights.
## Before you fly
- Your passport should be valid for at least six months from your arrival date, with a blank page for the visa.
- Fill in the online arrival form on the Department of Immigration's website shortly before you travel and print the receipt, or the form can be completed at the kiosks in the arrivals hall.
- Bring cash to pay the visa fee. US dollars are the easiest; card machines at the airport are not always working.
- Bring two passport photos. You will need them for some trekking permits, and they can help at immigration.
## Visa options
The tourist visa on arrival is sold for 15, 30 or 90 days, and the fee depends on the length. A 30-day visa covers most treks with time in Kathmandu either side. Choose the 90-day option for long expeditions or if you plan to travel on after your trip. Tourist visas can be extended at the immigration office in Kathmandu or Pokhara, and the current fees are listed on the Department of Immigration's website.
## At the airport
Follow the signs to the visa kiosks, pay at the visa fee counter, then queue at immigration with your passport, form receipt and payment receipt. After the baggage hall, our team meets you outside the arrivals exit with a name board and takes you to your hotel.
## Your first day in Kathmandu
Every trip starts with time in Kathmandu to recover from the flight and prepare. Your trip designer or guide goes through the route with you, checks your gear and collects what we need for permits: a copy of your passport, passport photos and your insurance details.
## Travelling on to Tibet or Bhutan
Tibet and Bhutan need their own permits and visas, arranged in advance through licensed operators. If you would like to add either to your trip, tell us early: the paperwork takes several weeks.`,
  },
  {
    slug: "packing-list",
    title: "Nepal trekking packing list",
    path: "/guides/nepal-trekking-packing-list",
    group: "plan",
    trips: ["everest-base-camp-trek", "annapurna-circuit-trek", "island-peak-climbing"],
    body: `Pack for warm days and freezing nights. On a teahouse trek you carry a daypack, and a porter carries your main bag between lodges, so most of your gear goes in one soft duffel bag. Anything you do not need on the trail can stay at your hotel in Kathmandu.
## Bags
- A soft duffel bag for the porter. Ask us for the weight limit on your trip; mountain flights also have strict baggage limits.
- A daypack of 25 to 35 litres with a rain cover.
- Dry bags or plastic bags to keep clothes dry inside the duffel.
## Clothing
- Two or three base layers that wick sweat
- A fleece or light insulated jacket
- A warm down jacket for evenings above 4,000 m
- A waterproof jacket and trousers
- Two pairs of trekking trousers and one pair of shorts or a skirt for low valleys
- A sun hat, a warm hat, a buff or neck warmer
- Light liner gloves and warm insulated gloves
- Comfortable clothes for the teahouse in the evening
## On your feet
- Broken-in trekking boots with ankle support
- Camp shoes or sandals for the evenings
- Good trekking socks, one pair for every two or three days, and a warm pair for sleeping
- Gaiters for snow or monsoon mud
## Sleeping
- A sleeping bag rated to about -10 °C for high treks; lodges also give blankets
- A sleeping bag liner for warmth and hygiene
## Gear
- Trekking poles
- A head torch with spare batteries
- Two one-litre water bottles, or a bottle and a bladder, and purification tablets or a filter
- Sunglasses with good UV protection, sun cream and lip balm with SPF
- A power bank; charging costs extra at most lodges
## Health and hygiene
- Your personal medicines, with a copy of the prescriptions
- A small first aid kit: blister plasters, painkillers, rehydration salts, diarrhoea treatment
- Hand sanitiser, biodegradable wet wipes and a quick-dry towel
- Toilet paper; lodges do not always provide it
## Documents
- Passport, visa receipt and passport photos for permits
- Your insurance policy with the emergency phone number
- Cash in Nepalese rupees for the trail
## For climbs
Crampons, harness, helmet, ascender and the rest of the climbing gear for trekking peaks are arranged with your climbing guide, and good-quality gear can be rented in Kathmandu. Tell us what you already own and we will check it fits the climb.`,
  },
  {
    slug: "money-phones-and-power",
    title: "Money, phones and charging on the trail",
    path: "/guides/money-phones-and-power",
    group: "trail",
    trips: ["everest-base-camp-trek", "annapurna-base-camp-trek", "manaslu-circuit-trek"],
    body: `Most of what you need on the trail is included in your trip, but you will want cash for extras, a way to stay in touch and a plan for charging your phone and camera.
## Money
Nepal's currency is the Nepalese rupee. Cash is king in the mountains: teahouses rarely take cards, and the few cash machines on the trail, such as in Namche Bazaar, can be out of service or out of cash.
- Draw or change the rupees you need in Kathmandu or Pokhara before you start.
- Money changers in Thamel and banks in Kathmandu change major currencies. Bring clean, undamaged notes.
- Cash machines in Kathmandu limit each withdrawal and charge a fee; use one inside a bank where you can.
- Carry small notes. Change for large notes is hard to find in small villages.
## What you pay for on the trail
Your quote lists what is included. On most teahouse treks, extras such as these are paid in cash:
- Hot showers, battery charging and wifi at the lodges
- Bottled or boiled water, snacks, soft drinks and alcohol
- Tips for your guide and porters at the end of the trek
- Souvenirs, and donations at monasteries
Prices rise with altitude, because everything is carried up by porters or animals.
## Phones and internet
- Buy a local SIM card from Nepal Telecom or Ncell at the airport or in Thamel; you need your passport and a photo. Coverage is good in lower valleys and patchy higher up.
- Many lodges sell wifi by the hour or day. In the Everest region, wifi cards sold along the trail work at many lodges.
- Expect days with no signal at all on remote treks such as Manaslu, Nar Phu, Dolpo, Makalu and Kanchenjunga.
- Your guide carries a phone and can reach our office in an emergency.
## Charging
Lodges charge a fee for each device or by the hour, and higher lodges often run on solar power, which is weak on cloudy days. Bring a power bank and keep batteries warm at night: cold drains them fast. Nepal uses round-pin sockets (types C, D and M), so bring a universal adapter.`,
  },
  {
    slug: "teahouse-trekking",
    title: "Teahouse trekking: where you sleep and eat",
    path: "/guides/teahouse-trekking",
    group: "trail",
    trips: [
      "ghorepani-poon-hill-trek",
      "everest-base-camp-trek",
      "annapurna-circuit-trek",
      "langtang-valley-trek",
    ],
    body: `On most of Nepal's popular treks you stay in teahouses: family-run lodges where you sleep, eat and spend the evening around the stove. They are simple but welcoming, and staying in them is one of the best parts of trekking in Nepal.
## Rooms
Most rooms are twin rooms with two single beds, a mattress, a pillow and a blanket, and thin wooden walls. Lower down, many lodges have rooms with an attached bathroom. Higher up, toilets are shared and may be squat toilets, and rooms are unheated, so nights are cold. A good sleeping bag makes all the difference.
## The dining room
The dining room is the heart of the teahouse. In the evening a stove burning wood, dried yak dung or kerosene heats the room, and trekkers, guides and porters gather to eat, play cards and talk about the day.
## Food
Menus are longer than you might expect: soups, noodles, fried rice, pasta, potatoes, pancakes, porridge and eggs. The favourite is dal bhat, rice with lentil soup, vegetable curry and pickle, and refills are usually free. It is the best fuel for a day on the trail.
- Fresh vegetables are best in the lower valleys. Higher up, food is carried in, so the menu gets simpler.
- Meat is carried up unrefrigerated from lower valleys. Many guides suggest a vegetarian diet above the last road head.
- Garlic soup, ginger tea and lemon tea are local favourites at altitude.
## Water
Do not drink tap or stream water untreated. Use purification tablets or a filter, or buy boiled water from the lodge, which avoids plastic bottles. Some trails, such as the Annapurna region, have safe drinking water stations.
## Hot showers
Many lodges offer a hot shower for a fee, heated by solar panels or gas. Above about 4,000 m showers become rare, and a bucket of warm water is often the best on offer.
## Teahouse etiquette
- Eat dinner and breakfast at the lodge where you sleep. Lodges price rooms low because they earn from meals.
- Order dinner and breakfast early, all at once, so the kitchen can cook for everyone.
- Keep noise down in the evening; walls are thin.
- Pack out batteries and plastic you carry in.
## When there are no teahouses
Some remote routes, such as Upper Dolpo and parts of Kanchenjunga and Makalu, have few lodges or none on some stages. There we camp, with a cook and crew carrying tents, a dining tent and food.`,
  },
  {
    slug: "guides-and-porters",
    title: "Trekking with guides and porters",
    path: "/guides/guides-and-porters",
    group: "trail",
    trips: ["everest-base-camp-trek", "annapurna-base-camp-trek", "langtang-valley-trek"],
    body: `Since April 2023, Nepal's rules require foreign trekkers in most national parks and conservation areas to trek with a licensed guide arranged through a registered trekking agency. A good team is also what makes a trek safe and enjoyable, and gives you a window into the life of the valleys you walk through.
## Your guide
Your guide is licensed and trained in first aid, and knows the trail, the lodges and the people along it.
- Sets the pace and plans each day around how the group is feeling.
- Watches for signs of altitude sickness and decides when to rest, descend or turn back.
- Books rooms, orders meals and deals with permits at the checkpoints.
- Arranges rescue in an emergency and stays in touch with our office.
- Tells you about the villages, monasteries and mountains along the way.
## Porters
Porters carry your main bag between lodges, so you walk with only a daypack. Most come from mountain villages, and portering is an important source of income for many families.
- One porter usually carries the bags of two trekkers, so pack light and within the weight limit for your trip.
- Your porter usually walks ahead and meets you at the next lodge.
- On camping treks, a larger crew carries tents, food and kitchen gear, with a cook and kitchen helpers.
## Looking after porters
Porters work hard at high altitude, often for long days. A responsible trek gives them fair wages, sensible loads, insurance, proper clothing and footwear for the cold, and somewhere warm to sleep and eat. Pack within the weight limit and ask us how your trip looks after its crew.
## Tipping
Tipping is customary at the end of a trek and an important part of guides' and porters' income. It is best given as a group, in rupees, at a small farewell on the last evening, with the tips handed to each person directly. Ask your trip designer for the current suggested amounts for your trip.
## A few words of Nepali
- Namaste: hello and goodbye, said with your hands together
- Dhanyabad: thank you
- Bistarai: slowly
- Mitho chha: it's delicious
- Pugyo: enough, I'm full`,
  },
  {
    slug: "lukla-and-mountain-flights",
    title: "Lukla and mountain flights",
    path: "/guides/lukla-and-mountain-flights",
    group: "trail",
    trips: [
      "everest-base-camp-trek",
      "gokyo-lakes-trek",
      "everest-view-trek",
      "island-peak-climbing",
      "upper-dolpo-trek",
    ],
    body: `Most treks in the Everest region start with a short, spectacular flight to Lukla, at 2,860 m. Mountain flights are also used to reach Jomsom, Dolpo, Rara and the far east. They save days of walking, but depend entirely on the weather.
## Kathmandu or Ramechhap
Flights to Lukla take about 35 minutes from Kathmandu. In the busy spring and autumn seasons, most Lukla flights leave from Manthali airport in Ramechhap instead, about four to five hours' drive from Kathmandu. That usually means leaving Kathmandu very early in the morning or the evening before. We confirm the departure airport closer to the date.
## Weather and delays
Lukla's runway is short, steep and has no instrument landing, so planes fly only in clear visibility, usually in the morning. Cloud, wind or rain in Kathmandu, Lukla or the valley between can delay or cancel flights for hours or days, especially in the monsoon and the shoulder months.
- Every trip with a mountain flight has at least one spare day at the end.
- If flights are delayed for several days, a helicopter can sometimes fly when planes cannot, at extra cost. Check whether your insurance covers it.
- Book your international flight home with a buffer of a day or two after the trek.
## Baggage
Small mountain planes have strict weight limits, usually about 15 kg per person including hand baggage, and excess is charged by the kilo when there is space for it. Pack your duffel and daypack within the limit, and leave anything you do not need for the trek at your hotel in Kathmandu.
## On the day
Get to the airport early; your guide handles check-in. Flights leave in the order they are scheduled, and the first flights of the morning are the most likely to go. For the best views to Lukla, sit on the left side of the plane.
## Other mountain airstrips
- Jomsom, for Upper Mustang and the lower Annapurna Circuit, from Pokhara
- Juphal, for Dolpo, from Nepalgunj
- Talcha, for Rara Lake, from Nepalgunj
- Tumlingtar, for Makalu, and Bhadrapur or Suketar, for Kanchenjunga
All have the same rule: fly early, expect delays, and keep a spare day.`,
  },
  {
    slug: "acclimatization-explained",
    title: "Altitude sickness and acclimatisation",
    path: "/guides/acclimatization-explained",
    group: "health",
    trips: [
      "everest-base-camp-trek",
      "annapurna-circuit-trek",
      "manaslu-circuit-trek",
      "gokyo-lakes-trek",
    ],
    body: `Altitude sickness can affect anyone above about 2,500 m, however fit they are. Good acclimatisation is about time, not strength, and every itinerary we design is checked against the same altitude rules.
## Why altitude matters
The higher you go, the less oxygen there is in each breath. At 5,000 m there is only about half the oxygen available at sea level. Given time, the body adapts by breathing faster and making more red blood cells, but this takes days, not hours.
## How we build acclimatisation into a trip
- Above 3,000 m, sleeping altitude rises no more than about 550 m a night.
- A rest day at least every four days above 3,000 m, often at Namche, Dingboche, Manang, Samagaon or Kyanjin.
- Climb high, sleep low: on rest days you hike to a higher viewpoint, then sleep lower.
- Every trip page shows the sleeping altitude of each night and the acclimatisation notes for the route.
## Acute mountain sickness
Acute mountain sickness (AMS) is common and usually mild if you stop climbing. The first signs are:
- A headache, often worse in the morning
- Nausea or loss of appetite
- Poor sleep and unusual tiredness
- Dizziness
With these symptoms, do not go higher. Rest at the same altitude until they go away, and descend if they get worse.
## The serious forms
High-altitude cerebral oedema (HACE) and high-altitude pulmonary oedema (HAPE) are rare but life-threatening. Warning signs are:
- Confusion, unusual behaviour or extreme drowsiness
- Loss of balance or coordination: unable to walk heel to toe in a straight line
- Breathlessness at rest, a cough, or a gurgling sound when breathing
Descend at once, even at night, and get medical help. Your guide carries a first aid kit and arranges helicopter rescue when it is needed.
## What you can do
- Walk slowly, even when you feel strong. Your guide sets the pace.
- Drink plenty of water and avoid alcohol and sleeping pills at altitude.
- Eat well, even if you do not feel hungry.
- Tell your guide about any symptom, however small, and never hide one to keep up with the group.
- Talk to your doctor before the trip, especially about medication such as acetazolamide and about any existing health conditions.
## Insurance
Your travel insurance must cover helicopter rescue up to the highest altitude of your trip. Check the altitude limit in the policy before you travel.
This guide is general information, not medical advice.`,
  },
  {
    slug: "trekking-fitness",
    title: "How fit do you need to be?",
    path: "/guides/trekking-fitness",
    group: "health",
    trips: [
      "ghorepani-poon-hill-trek",
      "langtang-valley-trek",
      "everest-base-camp-trek",
      "everest-three-passes-trek",
    ],
    body: `You do not need to be an athlete to trek in Nepal, but you will enjoy it far more if you are fit for long days on your feet. Most treks mean five to seven hours of walking a day, with long climbs and descents on rough stone steps, day after day.
## What trekking asks of you
- Stamina to walk for most of the day, several days in a row
- Strong legs and knees for steep steps, especially on the way down
- Comfort carrying a daypack of 5 to 8 kg
- At altitude, the patience to walk slowly
Fitness does not protect you from altitude sickness, but it does mean you arrive at each lodge with energy to spare, which helps you sleep, eat and acclimatise well.
## How to prepare
Start training two to three months before the trip, three or four times a week, and build up gradually.
- Walk or hike for several hours, ideally on hills, with your daypack and the boots you will trek in.
- Climb stairs, or use a stair machine, to train for the long climbs and descents.
- Add cycling, swimming or running for stamina.
- Strengthen your legs and core with squats, lunges and step-ups.
- In the last month, do back-to-back long walks on a weekend to get used to walking on consecutive days.
## Grades on our trips
- Easy: a few hours of walking a day on good trails, below about 3,500 m. Poon Hill and the Kathmandu valley rim.
- Moderate: longer days and altitudes up to about 5,000 m. Langtang Valley and Annapurna Base Camp.
- Challenging: long days, high passes and nights above 5,000 m. Everest Base Camp, the Annapurna and Manaslu circuits.
- Strenuous: very long routes, remote terrain and several passes. The Everest Three Passes, Kanchenjunga and Upper Dolpo.
## Health checks
See your doctor before a high trek, especially if you have a heart or lung condition, high blood pressure or diabetes, or are over 60. Tell us about any health conditions when you plan your trip, so we can choose a route and pace that suits you.`,
  },
  {
    slug: "your-first-trekking-peak",
    title: "Climbing your first trekking peak",
    path: "/guides/your-first-trekking-peak",
    group: "health",
    trips: [
      "island-peak-climbing",
      "mera-peak-climbing",
      "lobuche-east-peak-climbing",
      "yala-peak-climbing",
    ],
    body: `Nepal's trekking peaks are the step between trekking and mountaineering. Peaks such as Island Peak, Mera Peak and Lobuche East rise above 6,000 m and need glacier travel, crampons and ropes, but no previous expedition experience.
## Which peak to choose
- Yala Peak (5,732 m), in Langtang, is a good first summit: a non-technical glacier climb with a short trek in.
- Mera Peak (6,476 m) is the highest of the popular trekking peaks, and technically straightforward, but long and very high.
- Island Peak (6,165 m) combines the Everest Base Camp trek with a climb that ends on a steep snow and ice headwall on fixed ropes.
- Lobuche East (6,119 m) is steeper and more exposed than Island Peak, with superb views of Everest.
## Experience you need
You should be a fit, confident trekker who has walked above 4,000 m. Previous experience with crampons and an ice axe helps, but is not essential: every climb includes a training day with your climbing guide, practising the skills you need on the mountain.
- Walking in crampons on snow and ice
- Using an ascender (jumar) on fixed ropes
- Abseiling or descending on a figure-of-eight device
- Moving roped together on a glacier
## Summit day
Summit day starts in the middle of the night, often between 1 and 3 am, so you reach the top in the morning before the wind rises and the snow softens. Expect 8 to 12 hours of climbing and descending. Your climbing guide sets a turn-around time and will turn back if the weather, conditions or your health make it unsafe.
## Permits and gear
Trekking peaks are climbed on a Nepal Mountaineering Association permit, which we arrange together with your park and trekking permits. Climbing gear such as boots, crampons, harness and helmet can be rented in Kathmandu; tell us what you already own.
## Acclimatisation
Every climb is planned after a trek that builds acclimatisation, such as the Everest Base Camp trail before Island Peak or Lobuche East. Each itinerary includes a spare day for bad weather on the summit.`,
  },
  {
    slug: "everest-or-annapurna-base-camp",
    title: "Everest Base Camp or Annapurna Base Camp?",
    path: "/guides/everest-or-annapurna-base-camp",
    group: "plan",
    trips: [
      "everest-base-camp-trek",
      "annapurna-base-camp-trek",
      "gokyo-lakes-trek",
      "mardi-himal-trek",
    ],
    body: `Everest Base Camp and Annapurna Base Camp are Nepal's two most famous treks. Both end at the foot of great mountains, both stay in teahouses, and both can be walked by a fit first-time trekker. They feel very different, though, and the right one depends on your time, your appetite for altitude and how you want the days to feel.
## The short answer
- Choose Everest Base Camp for the world's highest mountain, Sherpa culture and high, open glacier country, if you have about two weeks and are happy to spend several nights above 4,000 m.
- Choose Annapurna Base Camp for forest, terraced villages and a dramatic ring of peaks, if you have about ten days or prefer to stay lower.
## Altitude and difficulty
Everest Base Camp sits at 5,364 m, and the viewpoint of Kala Patthar at 5,545 m. The itinerary needs two acclimatisation days, and the nights at Lobuche and Gorak Shep, close to 5,000 m, are cold and hard on sleep. Annapurna Base Camp is at 4,130 m. The challenge there is not the altitude but the thousands of stone steps up and down between the villages.
## Getting there
The Everest trek starts with a flight to Lukla, one of the most weather-dependent airstrips in the world, so every plan keeps a spare day for delays. The Annapurna trek starts with a drive or short flight to Pokhara and then a road to the trailhead, which makes the start and end of the trip more reliable.
## Scenery and culture
- Everest: Buddhist monasteries, prayer walls and Sherpa villages, then a high, bare landscape of moraine and glacier with Everest, Lhotse, Ama Dablam and Pumori around you.
- Annapurna: Gurung villages, rice terraces, bamboo and rhododendron forest in the Modi Khola gorge, and finally the Annapurna Sanctuary, a basin ringed by Annapurna I, Annapurna South, Hiunchuli and Machhapuchhre.
## Time and crowds
Everest Base Camp usually takes 12 to 14 days from Kathmandu, Annapurna Base Camp 9 to 12. Both are busy in October, November, April and early May. If you want the Everest views with fewer people, the Gokyo Lakes trek is a quieter alternative; near Annapurna, the Mardi Himal ridge is shorter and less crowded.
## Still deciding?
Tell us when you can travel and how many days you have. A trip designer will compare the two for your dates, including which is better for the weather that month.`,
  },
  {
    slug: "restricted-areas",
    title: "Trekking in Nepal's restricted areas",
    path: "/guides/restricted-areas",
    group: "plan",
    trips: [
      "upper-mustang-trek",
      "manaslu-circuit-trek",
      "tsum-valley-trek",
      "nar-phu-valley-trek",
      "upper-dolpo-trek",
      "kanchenjunga-base-camp-trek",
    ],
    body: `Some of Nepal's most remarkable valleys lie in restricted areas, regions close to the Tibetan border where the government limits how visitors travel. They include Upper Mustang, Manaslu, the Tsum valley, Nar Phu, Upper Dolpo and Kanchenjunga. Restricted does not mean closed: these treks are open to foreign visitors, but with rules that shape the trip.
## The rules
- You need a special restricted-area permit as well as the usual national park or conservation area permits.
- The permit is issued only through a registered trekking agency, never to independent trekkers.
- A licensed guide must walk with the group for the whole time in the restricted area.
- The group must have at least two trekkers. If you travel alone, we can sometimes match you with another traveller on the same dates.
## Why they are worth it
The rules keep numbers low, and the valleys feel very different from the busy classic trails. Upper Mustang and Upper Dolpo are high, dry lands of Tibetan Buddhist and Bon culture. Nar Phu and Tsum are hidden valleys of stone villages and monasteries. Manaslu and Kanchenjunga circle some of the highest mountains on earth with only a fraction of the traffic of Everest.
## Permits and costs
Restricted-area permits cost more than the classic treks, and some are charged for a set number of days with a daily fee after that. The fees are set by the government and change from time to time, so we show the current amounts on each permit page and confirm them in your quote.
## Paperwork and timing
The permit is issued in Kathmandu on a working day, with your passport and Nepal visa, so most itineraries keep a day in the city before the trek starts. Checkpoints along the trail inspect it, and your guide carries the documents.
## Lodges and remoteness
Manaslu, Tsum, Nar Phu and Upper Mustang now have simple lodges in most villages. Upper Dolpo and parts of Kanchenjunga still need camping with a cook and crew. Flights in and out, such as Juphal for Dolpo, depend on the weather, so these plans keep spare days.
## How we help
We apply for every permit, arrange the guide and, where we can, a second traveller for solo guests. Tell us which valley interests you and we will explain what the rules mean for your dates.`,
  },
  {
    slug: "food-and-water-on-the-trail",
    title: "Food and water on the trail",
    path: "/guides/food-and-water-on-the-trail",
    group: "trail",
    trips: [
      "everest-base-camp-trek",
      "annapurna-circuit-trek",
      "langtang-valley-trek",
      "manaslu-circuit-trek",
    ],
    body: `Good food and safe water make a trek. In teahouses you order from a menu in a warm dining room, and on camping treks a cook travels with the group. A few simple habits keep you well fed and healthy all the way.
## What you eat
The staple everywhere is dal bhat: rice with lentil soup, vegetable curry and pickle, usually with free second helpings. Trekkers and guides alike swear by it for long days. Most menus also offer noodles, fried rice, potatoes, soups, momos (dumplings), porridge, eggs and Tibetan bread. In the Everest region there are bakeries in Namche Bazaar, and yak cheese is made in some valleys.
## Eating well at altitude
Appetite often drops as you climb, but your body needs more energy, not less. Eat regular meals even when you are not hungry, and carry snacks for the trail.
- Choose freshly cooked hot food, and avoid raw salads and peeled fruit you did not peel yourself.
- Many trekkers eat vegetarian higher up. In the Khumbu animals are not slaughtered for religious reasons, so meat is carried up from below.
- Garlic soup is a popular evening order; it will not prevent altitude sickness, but it is warm and comforting.
## Safe drinking water
Do not drink untreated water from taps or streams. You have several good options:
- A filter or UV purifier, which treats water in a minute or two.
- Purification tablets or drops, which are light and cheap but take longer to work.
- Boiled water, sold by most teahouses, which also fills a hot water bottle on cold nights.
- Filtered water stations in some villages, where you refill your own bottle for a small fee.
## Drink enough
At altitude you lose water quickly through breathing. Aim for three to four litres a day, more on long climbs, and drink tea, soup and hot lemon as well as water. Alcohol is best left until you are back down.
## Plastic and costs
Bottled water creates rubbish that has to be carried out or burned, so we encourage everyone to purify and refill. Food and drinks cost more as you climb, because everything is carried up by porters or animals; the higher the village, the higher the price.
## Special diets
Vegetarian food is easy everywhere, and vegan food is possible with some care. Tell us about allergies, coeliac disease or other needs, and we will brief your guide and choose suitable lodges.`,
  },
  {
    slug: "culture-and-etiquette",
    title: "Nepali culture and trail etiquette",
    path: "/guides/culture-and-etiquette",
    group: "trail",
    trips: [
      "kathmandu-valley-heritage-tour",
      "upper-mustang-trek",
      "tsum-valley-trek",
      "tamang-heritage-trail",
    ],
    body: `Nepal is home to more than a hundred ethnic groups, and Hindu and Buddhist traditions run through daily life in the cities and the mountains alike. Visitors are welcomed warmly, and a little knowledge of local customs goes a long way.
## Greetings
The everyday greeting is "Namaste", said with your palms pressed together in front of your chest. It works for hello, goodbye and thank you. In Sherpa and Tibetan areas you will also hear "Tashi delek". Shaking hands is common between men in towns, but a namaste is always polite.
## Temples, stupas and monasteries
- Walk clockwise around stupas and chortens, and pass mani walls and prayer wheels with them on your right.
- Take off your shoes, and often your hat, before entering a temple, monastery or someone's home.
- Some Hindu temples, including the main shrine at Pashupatinath, are open only to Hindus. Your guide will tell you where you can go.
- Ask before photographing ceremonies, and never sit on or climb onto religious monuments.
## Hands, feet and heads
The head is considered the most respected part of the body and the feet the least. Avoid touching anyone's head, pointing your feet at people or shrines, and stepping over someone sitting on the floor. Give and receive things with your right hand, or with both hands as a sign of respect.
## Dress
Modest clothing is appreciated in villages and at religious sites: shoulders and knees covered, especially for visits to temples. Public displays of affection are uncommon and can make people uncomfortable.
## Photographs
Most people are happy to be photographed if you ask first, with a smile and a gesture if you share no language. Respect a no, and avoid paying or giving sweets to children for photos.
## On the trail
- Give way to porters and pack animals, and step to the uphill side when yaks or mules pass, so you are not pushed towards the edge.
- Greet people you meet; trails are village paths as well as trekking routes.
- Carry out your rubbish and keep noise down in villages at night.
## Food and homes
If you are invited into a home, you may be offered tea again and again; it is fine to cover your cup when you have had enough. Food is shared, so avoid touching shared plates with your own spoon, and try a little of what you are offered.
## Bargaining
Polite bargaining is normal in markets and souvenir shops, but not in teahouses or restaurants, where prices are fixed. Keep it friendly: the difference is usually small to you and matters more to the seller.`,
  },
  {
    slug: "kathmandu-before-and-after",
    title: "Kathmandu before and after your trek",
    path: "/guides/kathmandu-before-and-after",
    group: "plan",
    trips: [
      "kathmandu-valley-heritage-tour",
      "nepal-cultural-heritage-tour",
      "everest-base-camp-trek",
    ],
    body: `Almost every journey in Nepal begins and ends in Kathmandu. The city is busy, loud and full of history, and a day or two here is the best way to recover from the flight, prepare for the mountains and celebrate afterwards.
## Before the trek
Plan at least one full day in Kathmandu before you set off. It gives you time to recover from the journey, meet your guide, check your gear and, for restricted areas or climbing peaks, complete the permits. Thamel, the traveller district, has shops where you can buy or rent anything missing, from down jackets to sleeping bags.
## After the trek
Keep at least one spare day at the end. Mountain flights, especially from Lukla, are often delayed by weather, and a spare day protects your international flight. If the flights run to time, the day is yours for the sights, a massage or simply a long hot shower.
## What to see
The Kathmandu valley has seven monument zones that together form a UNESCO World Heritage Site. With a day or two you can see the best of them:
- Kathmandu Durbar Square, the old royal palace and its temples.
- Swayambhunath, the stupa on a hill above the city, home to many monkeys.
- Boudhanath, one of the largest stupas in the world, at the centre of Tibetan Buddhist life in the city.
- Pashupatinath, Nepal's most sacred Hindu temple, beside the Bagmati river.
- Patan and Bhaktapur, old Newar cities of temples, courtyards and craftsmen.
## Getting around
Traffic is heavy and the roads can be dusty, so distances take longer than they look. A private car with a guide is the easiest way to see several sites in a day. Tickets are bought at each site, and you keep them while you are inside.
## Practical tips
- Kathmandu is at about 1,400 m, so it is a comfortable place to start before going higher.
- Nepal's time zone is 5 hours 45 minutes ahead of UTC.
- Cash machines and money changers are easy to find in Thamel; take enough cash for the trail, where cards are rarely accepted.
- A light mask helps on dusty days.
## Beyond the city
If you have more time, the hill town of Nagarkot has sunrise views over the Himalaya, and the lakeside town of Pokhara is a short flight or a day's drive away. We can add a heritage tour or a few quiet days to any trek.`,
  },
  {
    slug: "winter-and-monsoon-trekking",
    title: "Trekking in winter and the monsoon",
    path: "/guides/winter-and-monsoon-trekking",
    group: "plan",
    trips: [
      "upper-mustang-trek",
      "upper-dolpo-trek",
      "ghorepani-poon-hill-trek",
      "everest-view-trek",
    ],
    body: `Spring and autumn are Nepal's main trekking seasons, but the mountains do not close for the rest of the year. Winter and the monsoon each have their own rewards, as long as you choose the right route.
## Winter: December to February
Winter brings clear, settled skies and some of the sharpest mountain views of the year, with far fewer trekkers on the trails. The trade-off is cold: nights above 4,000 m often fall well below freezing, and some high lodges close.
- Heavy snow can close the high passes, such as the Thorong La, the Larkya La and the Cho La, for days at a time.
- Lower treks are at their best: Ghorepani Poon Hill, the Everest View trek, Langtang Valley and the Helambu trek.
- Everest Base Camp is possible with warm gear and flexibility, and the views are often superb.
- Days are short, so walking starts later and finishes earlier.
## The monsoon: June to mid-September
The summer monsoon brings rain to most of Nepal, usually in heavy afternoon and night showers rather than all day. Valleys turn green and full of flowers, and the trails are quiet.
- Clouds often hide the peaks, and views come in short clear spells, usually early in the morning.
- Leeches are common in the forests of the middle hills, and landslides can block roads and trails.
- Mountain flights, especially to Lukla and Juphal, are more often delayed or cancelled.
## Rain shadow treks
The high valleys north of the main Himalayan range lie in its rain shadow and get little monsoon rain. They are the best choice for a summer trek:
- Upper Mustang, the former kingdom of Lo, with dry red cliffs and walled villages.
- Upper Dolpo, remote and high, with Phoksundo Lake and Shey Gompa.
- Nar Phu and the upper Manang valley on the Annapurna Circuit.
## How we plan out-of-season trips
We choose routes that suit the month, build in extra spare days for weather, and check passes, lodges and roads close to your departure. Your guide will change the plan on the day if conditions make a section unsafe.
## Which month for which trek?
For a month-by-month overview of the whole year, see our guide to the best time to trek, or tell us your dates and we will suggest the best route for them.`,
  },
  {
    slug: "short-treks",
    title: "Short treks in Nepal: a week or less",
    path: "/guides/short-treks",
    group: "plan",
    trips: [
      "ghorepani-poon-hill-trek",
      "mardi-himal-trek",
      "helambu-trek",
      "langtang-valley-trek",
      "everest-view-trek",
      "rara-lake-trek",
      "khopra-danda-trek",
      "tamang-heritage-trail",
    ],
    body: `You do not need three weeks to walk in the Himalaya. Several of Nepal's best treks fit into a week or so, and most stay low enough that altitude is not a worry. They suit a first trek, a family trip, or a few days in the mountains alongside Kathmandu, Pokhara or Chitwan.
## From Pokhara
- Ghorepani Poon Hill (5 days): stone steps through Magar and Gurung villages and rhododendron forest to sunrise over Dhaulagiri and Annapurna South from Poon Hill, at 3,210 m.
- Mardi Himal (5 days): quiet forest, then an open grassy ridge straight towards Machhapuchhre, with an early climb to the Upper Viewpoint at 4,200 m or on to base camp at about 4,500 m.
- Khopra Danda (8 days): a quieter alternative to Poon Hill, with community-run lodges and a ridge facing Dhaulagiri across the Kali Gandaki.
## From Kathmandu
- Helambu (7 days): starts on foot from the edge of the city, through Shivapuri National Park to Hyolmo villages and the ridge at Tharepati, about 3,640 m, with no flights and no long drives.
- Langtang Valley (8 days): the closest big Himalayan valley to Kathmandu, reached by road in a day, with Kyanjin Gompa at 3,870 m beneath the glaciers of Langtang Lirung.
- Tamang Heritage Trail (8 days): homestays in Tamang villages, hot springs at Tatopani and views of Langtang and Ganesh Himal.
## With a flight
- Everest View (8 days): Lukla, Namche Bazaar, the terrace of Hotel Everest View and Tengboche monastery, with Everest in sight but without the high nights of the base camp trek.
- Rara Lake (6 days): a flight to Talcha in the far west and easy walking around Nepal's largest lake.
Mountain flights depend on the weather, so both keep a spare day.
## Altitude on a short trek
Poon Hill, Helambu, Rara and the Tamang Heritage Trail stay below about 3,700 m, where most healthy walkers need no special acclimatisation. Mardi Himal, Langtang and Khopra reach higher viewpoints on day hikes from the last lodge, so you climb high but sleep lower, and you can stop at any point.
## Fitting it in
Count a day in Kathmandu after you land and a spare day before you fly home. A short trek then fits into ten days in Nepal, with time left for the temples of Kathmandu or a few days in Pokhara or Chitwan.
## Not sure which?
Tell us how many days you have and when you travel. A trip designer will suggest the short treks that suit the season, such as Poon Hill for the spring rhododendrons, or Helambu in winter, when the higher trails are cold.`,
  },
  {
    slug: "annapurna-circuit-or-manaslu",
    title: "Annapurna Circuit or Manaslu Circuit?",
    path: "/guides/annapurna-circuit-or-manaslu",
    group: "plan",
    trips: [
      "annapurna-circuit-trek",
      "manaslu-circuit-trek",
      "tsum-valley-trek",
      "nar-phu-valley-trek",
    ],
    body: `The Annapurna Circuit and the Manaslu Circuit are Nepal's two great loop treks. Both take about two weeks, both climb from rice terraces into Tibetan Buddhist villages and over a high pass, and they even share their last valley: the Manaslu Circuit comes down to Dharapani, on the Annapurna Circuit. They suit different travellers, though.
## The short answer
- Choose the Annapurna Circuit for a classic route with comfortable lodges and a great variety of landscapes, if you don't mind sharing the trail.
- Choose the Manaslu Circuit for a wilder, quieter trek through the Budhi Gandaki gorge, if you are happy with simpler lodges and the rules of a restricted area.
## The passes
The Annapurna Circuit crosses the Thorong La at 5,416 m, a long day from Thorong Phedi down to Muktinath. The Manaslu Circuit crosses the Larkya La at 5,106 m, with Manaslu and its neighbours close above you, followed by a long descent to Bimthang. Both crossings start before dawn and need good acclimatisation, so our itineraries rest a day in Manang on the Annapurna side, and at Samagaon and Samdo on the Manaslu side.
## Trail and crowds
Roads now reach parts of the Annapurna Circuit, so we follow quieter side trails wherever we can, such as the high route through Upper Pisang, Ghyaru and Ngawal. The trail is busy in October and April, and its lodges are among the most comfortable on any high trek in Nepal. The upper Manaslu valley has no road and far fewer trekkers. Its lodges are simpler, and the lower gorge is hot and steep.
## Permits and rules
Manaslu is a restricted area. It needs a restricted-area permit, the Manaslu and Annapurna conservation area permits and a TIMS card, and it can only be walked with a licensed guide in a group of at least two. The Annapurna Circuit needs the Annapurna Conservation Area Permit and a TIMS card. We arrange every permit for both.
## Culture and scenery
- Annapurna: the Marsyangdi valley, the Tibetan-influenced villages of Manang, Muktinath, sacred to Hindus and Buddhists, and the deep Kali Gandaki gorge down to Kagbeni and Jomsom.
- Manaslu: the Budhi Gandaki gorge, the Nubri villages of Lho, Samagaon and Samdo with their long mani walls and monasteries, and close views of the world's eighth-highest mountain.
## Adding more
From the Manaslu Circuit you can add the Tsum valley, a hidden valley sacred to Tibetan Buddhists. From the Annapurna Circuit, the Nar Phu valley branches off near Koto into another restricted area of stone villages and monasteries.
## Still deciding?
Tell us when you can travel and how many days you have. A trip designer will compare the two for your dates, including the conditions on the passes that season.`,
  },
  {
    slug: "island-peak-or-mera-peak",
    title: "Island Peak or Mera Peak?",
    path: "/guides/island-peak-or-mera-peak",
    group: "health",
    trips: ["island-peak-climbing", "mera-peak-climbing", "lobuche-east-peak-climbing"],
    body: `Island Peak and Mera Peak are the most popular first summits in Nepal. Both are trekking peaks climbed on a Nepal Mountaineering Association permit, both lie in the Everest region, and both suit fit trekkers without previous mountaineering experience. The climbs themselves are very different.
## The short answer
- Choose Island Peak for a real taste of climbing, with a steep snow and ice headwall on fixed ropes, and Everest Base Camp on the way.
- Choose Mera Peak for the higher summit and the bigger view, on a glacier that is rarely steep, if you cope well with altitude.
## The climb
Island Peak (Imja Tse, 6,165 m) rises from the Imja valley beneath the south face of Lhotse. Summit day crosses a glacier, climbs a steep headwall on fixed ropes with crampons and ascender, and follows a short, airy ridge to the top. Mera Peak (6,470 m) is Nepal's highest trekking peak. The normal route climbs the broad Mera glacier from a high camp, and fixed ropes are rarely needed. Its challenge is the altitude and a long, cold summit day.
## The view
From the summit of Mera you see five of the world's 8,000 m peaks: Everest, Lhotse, Cho Oyu, Makalu and Kanchenjunga. Island Peak puts you in a ring of high peaks beneath the great wall of Lhotse.
## The approach
Our Island Peak itinerary first follows the classic trail to Everest Base Camp and Kala Patthar, so you are well acclimatised and see the monasteries and Sherpa villages of the Khumbu on the way. Mera Peak is reached from Lukla through the quiet Hinku valley, with forest, yak pastures and few other trekkers, and the way back crosses the Zatrwa La at about 4,610 m. Both trips take about three weeks and start and end with the Lukla flight, so they keep spare days for the weather.
## Training and safety
Both climbs include practice with crampons, ice axe and rope before the summit, and both itineraries keep a reserve day in case the weather turns. Your climbing guide sets a turn-around time and decides on the day whether it is safe to go on.
## Want something steeper?
Lobuche East (6,119 m), above the Khumbu glacier, is steeper and more technical than Island Peak, with an exposed summit ridge facing Everest, Lhotse and Nuptse. It suits climbers who are comfortable with exposure.
## Still deciding?
Tell us about your trekking experience and how you have coped with altitude before. A trip designer will suggest the peak that suits you and explain the gear you need.`,
  },
  {
    slug: "chitwan-or-bardia",
    title: "Chitwan or Bardia?",
    path: "/guides/chitwan-or-bardia",
    group: "plan",
    trips: ["chitwan-national-park-safari", "bardia-national-park-safari"],
    body: `Nepal's two great lowland parks, Chitwan and Bardia, lie in the Terai, the belt of forest and grassland below the Himalayan foothills. Both are home to rhinos, tigers, leopards and hundreds of species of birds, and both are explored by jeep, by boat and on foot with naturalist guides. The difference is how far you travel and what you most want to see.
## The short answer
- Choose Chitwan for the best chance of seeing one-horned rhinos, easy access and a short trip that fits between Kathmandu, Pokhara and Lumbini.
- Choose Bardia for wilderness, quiet and one of the best chances in Asia of seeing a wild tiger, if you have an extra day.
## Getting there
Chitwan is a short flight from Kathmandu to Bharatpur, or five to seven hours by road, and most lodges are in Sauraha, at the edge of the park. Our Chitwan safari takes three days. Bardia is in the far west: a flight of about an hour to Nepalgunj, then a drive of two and a half to three hours to Thakurdwara. Our Bardia safari takes four days.
## Wildlife
- Chitwan: Nepal's first national park and a UNESCO World Heritage Site, with the largest population of one-horned rhinos in the country, gharial and mugger crocodiles in the Rapti and excellent birding.
- Bardia: Nepal's largest lowland national park, with tigers, wild elephants, rhinos, swamp deer and blackbuck, and, with luck, river dolphins in the Karnali.
Sightings are never guaranteed. Rhinos are easiest to see in Chitwan; tigers are rare and shy everywhere, and patient walks in Bardia give the best chance.
## Atmosphere
Sauraha is a small, lively town with lodges and restaurants along the river, and Chitwan is the more visited park. Bardia's lodges near Thakurdwara are simple and close to Tharu villages, and far fewer visitors make the journey.
## When to go
October to March is the most comfortable time in both parks, with cool mornings. From February, when the tall grass has been cut, wildlife is often easier to see, though the days grow hot by April. During the monsoon, parts of the parks are closed or hard to reach.
## Combining them
Chitwan fits easily into a tour of Kathmandu, Pokhara and Lumbini, or after two days of rafting on the Trishuli. Bardia works well as a trip of its own, with more time for long walks in the forest.
## Still deciding?
Tell us when you travel and what you would most like to see. We will suggest the park that suits your dates.`,
  },
  {
    slug: "pokhara-before-and-after",
    title: "Pokhara before and after your trek",
    path: "/guides/pokhara-before-and-after",
    group: "plan",
    trips: [
      "pokhara-lakeside-tour",
      "pokhara-paragliding",
      "bungee-and-canyon-swing-adventure",
      "ghorepani-poon-hill-trek",
      "annapurna-base-camp-trek",
    ],
    body: `Pokhara is Nepal's lakeside town, beside Phewa Lake beneath the Annapurna range, with the fishtail summit of Machhapuchhre standing above the rooftops. It is the starting point for the Annapurna treks and the place most trekkers come back to, to rest, eat well and see the mountains from below.
## Getting there
Pokhara is a flight of about 25 minutes from Kathmandu, or a drive of six to seven hours. Poon Hill, Mardi Himal and Annapurna Base Camp start a short drive from the town, and the Annapurna Circuit ends with a flight from Jomsom back to Pokhara. On the road from Kathmandu, the old hill bazaar of Bandipur is a good place to break the journey.
## Things to see
- Sunrise over the Annapurnas, Machhapuchhre and Dhaulagiri from Sarangkot, the ridge above the town.
- A boat across Phewa Lake to the Tal Barahi temple on its island.
- The walk up to the World Peace Pagoda for the view back across the lake.
- Davis Falls and the Gupteshwor Mahadev Cave.
- The International Mountain Museum, about the Himalaya and the people who live in and climb it.
## Something more active
- A tandem paragliding flight from Sarangkot with a licensed pilot, gliding for 20 to 30 minutes over the valley to land beside the lake. The best flying is from autumn to spring.
- A bungee jump or canyon swing over the Kali Gandaki gorge at Kushma.
- A wooden boat to paddle on Phewa Lake at your own pace.
## Before or after?
A day in Pokhara before a trek gives you a buffer if a flight or the road is delayed, and a first look at the mountains you are heading for. After a trek, two or three days by the lake are an easy way to rest, and a good time for a paragliding flight while the weather is still clear.
## Where to stay
Most hotels, cafés and restaurants line Lakeside, the long street beside Phewa Lake, within walking distance of the boats. Quieter places lie on the hills around the lake.
## Planning your days
Tell us how long you have. A trip designer will fit Pokhara around your trek, with the sights and activities you want and every transfer arranged.`,
  },
  {
    slug: "first-trip-to-nepal",
    title: "Planning your first trip to Nepal",
    path: "/guides/first-trip-to-nepal",
    group: "plan",
    trips: [
      "kathmandu-valley-heritage-tour",
      "nepal-cultural-heritage-tour",
      "ghorepani-poon-hill-trek",
      "chitwan-national-park-safari",
      "pokhara-lakeside-tour",
    ],
    body: `On a first trip to Nepal it is tempting to fit everything in: the temples of Kathmandu, a trek, the lake at Pokhara, a safari in Chitwan and perhaps a flight to Everest. Nepal rewards a slower pace, though. Roads are slow, mountain flights depend on the weather, and the best days are often the ones with time to spare.
## Ten days
- Two days in the Kathmandu valley, for its Durbar squares, Swayambhunath, Boudhanath and Pashupatinath.
- A short trek such as Ghorepani Poon Hill from Pokhara, or Helambu from Kathmandu.
- A spare day before you fly home.
## Two weeks
- The Kathmandu valley, then a trek of about a week, such as Langtang, Mardi Himal or the Everest View trek.
- Two or three days in Pokhara after the trek.
- Chitwan for rhinos and the jungle, with a flight from Bharatpur back to Kathmandu.
## Three weeks or more
- A classic trek such as Everest Base Camp, Annapurna Base Camp or the Annapurna Circuit, with a few days in Kathmandu and Pokhara.
- Or a shorter trek and the full circle of the Kathmandu valley, Pokhara, Chitwan and Lumbini, the birthplace of the Buddha.
- Bhutan or Tibet as an add-on from Kathmandu, before or after your time in Nepal.
## Without trekking
Our Nepal Cultural Heritage Tour covers the best of the country in ten days without trekking: the Kathmandu valley, sunrise from Nagarkot, Bhaktapur, Chitwan, Bandipur and Pokhara. The Everest helicopter tour adds the high Himalaya to any trip in a single day.
## Practical tips
- Keep a spare day at the end of the trip for delayed mountain flights.
- Allow more time for road journeys than the distance suggests: Kathmandu to Pokhara takes six to seven hours by road.
- Autumn and spring are the main seasons. Winter suits the lower treks and the lowlands, and the monsoon, wet and green, suits Upper Mustang and the Kathmandu valley.
- Read our guide to the Nepal visa and arriving in Kathmandu before you book your flights.
## Start with your dates
Tell us how many days you have and what you most want to see. A trip designer will suggest a plan that fits, with time to enjoy it.`,
  },
  {
    slug: "which-everest-trek",
    title: "Which Everest trek is right for you?",
    path: "/guides/which-everest-trek",
    group: "plan",
    trips: [
      "everest-base-camp-trek",
      "gokyo-lakes-trek",
      "gokyo-cho-la-everest-base-camp-trek",
      "everest-three-passes-trek",
      "everest-view-trek",
    ],
    body: `Every trek in the Everest region starts with the flight to Lukla and the walk up the Dudh Kosi to Namche Bazaar, the Sherpa trading town. From there the routes divide, and the right one depends on how much time you have, how high you want to go and how much experience you have at altitude.
## Five treks at a glance
- Everest View (8 days): Namche, Hotel Everest View at about 3,880 m and Tengboche monastery, with Everest in sight but no nights above 4,000 m.
- Gokyo Lakes (12 days): the turquoise lakes beside the Ngozumpa glacier and Gokyo Ri (5,357 m), with four 8,000 m peaks in one view.
- Everest Base Camp (14 days): the classic route past Tengboche to Base Camp (5,364 m) and sunrise on Everest from Kala Patthar (5,545 m).
- Gokyo, Cho La and Everest Base Camp (17 days): the lakes first, then over the Cho La (5,420 m) to Base Camp, as a loop.
- Everest Three Passes (20 days): the Kongma La, Cho La and Renjo La, with Base Camp, Kala Patthar and Gokyo on the way.
## With less than two weeks
The Everest View trek is the shortest and the only one that stays below 4,000 m, which suits families and first-timers. With twelve days, Gokyo is quieter than the Base Camp trail, and many people think its view is the finest in the Khumbu.
## The classic
Everest Base Camp is the trek most people come for: Sherpa villages, Tengboche, the moraine beside the Khumbu Icefall and Kala Patthar at dawn. It is busy in October, November, April and early May, on a well-worn trail with lodges in every village.
## For more experience
The Cho La has a short glacier section and a steep descent, where light crampons help, and the Three Passes trek adds the Kongma La and the Renjo La. Both suit walkers who have trekked at altitude before, and both make a loop instead of returning the same way, with the quiet Bhote Koshi valley and Thame on the Three Passes return.
## Altitude and acclimatisation
Every route above 5,000 m builds in acclimatisation days, with a hike higher before you sleep lower. Going to Gokyo first, as on the Cho La loop, means you reach the pass and Base Camp already well acclimatised. Read our guide to altitude sickness and acclimatisation before you choose.
## Flights and spare days
All five start and end with the flight to Lukla, one of the most weather-dependent airstrips in the world, so each itinerary keeps a spare day. Our guide to Lukla and mountain flights explains what happens when flights are delayed.
## Still deciding?
Tell us how many days you have and whether you have trekked at altitude before. A trip designer will suggest the Everest trek that fits.`,
  },
  {
    slug: "solo-trekking",
    title: "Trekking in Nepal on your own",
    path: "/guides/solo-trekking",
    group: "plan",
    trips: [
      "everest-base-camp-trek",
      "annapurna-base-camp-trek",
      "langtang-valley-trek",
      "ghorepani-poon-hill-trek",
    ],
    body: `Many people come to Nepal alone, and a solo trek can be one of the best ways to see the country: your own pace, your own plans and plenty of time to talk to the people you meet. A few rules shape how you do it.
## You walk with a guide
Since April 2023, Nepal's rules require foreign trekkers in most national parks and conservation areas to walk with a licensed guide arranged through a registered trekking agency. On a private trip with us, that guide is yours alone: they set the pace to suit you, deal with lodges and checkpoints and look out for your health at altitude.
## Routes you can walk alone
- Most of the classic treks, including Everest Base Camp, Gokyo, Annapurna Base Camp, Poon Hill, Mardi Himal and Langtang.
- Shorter treks such as Helambu or the Everest View trek, for a first taste of the mountains.
- Tours, safaris and activities such as paragliding and rafting.
## Restricted areas
Restricted areas such as Upper Mustang, Manaslu, Tsum, Nar Phu, Upper Dolpo and Kanchenjunga need at least two trekkers in the group as well as a licensed guide. If you travel alone, choose another route, or ask us: we can sometimes match you with another traveller on the same dates.
## Your own team
A private trip for one person includes your own guide and porter. The porter carries your main bag between lodges, so you walk with only a daypack; pack within the weight limit for your trip.
## Staying safe
- Your guide watches for signs of altitude sickness and decides when to rest, descend or turn back.
- Your travel insurance must cover helicopter rescue up to the highest point of your trek.
- Leave your itinerary with someone at home, because phone signal and wifi are patchy in the higher valleys.
## Meeting people
Teahouse dining rooms are warm and sociable in the evening, and on the popular trails you meet trekkers from all over the world. Your guide is also your link to the families who run the lodges and the villages along the way.
## Plan your solo trek
Tell us your dates and the kind of trek you have in mind. A trip designer will suggest routes that suit a single traveller.`,
  },
  {
    slug: "remote-treks",
    title: "Nepal's remote treks: Kanchenjunga, Makalu and Dolpo",
    path: "/guides/remote-treks",
    group: "plan",
    trips: [
      "kanchenjunga-base-camp-trek",
      "makalu-base-camp-trek",
      "lower-dolpo-trek",
      "upper-dolpo-trek",
    ],
    body: `Beyond the classic trails lie treks where you can walk for days without meeting another group: Kanchenjunga in the far east, Makalu and the Barun valley, and Dolpo in the west. They are long, simple and demanding, and they reward experienced trekkers with some of the wildest country in the Himalaya.
## Kanchenjunga
A 23-day circuit to both base camps of the world's third-highest mountain. The trail climbs through Limbu and Rai villages and cardamom fields to Ghunsa and on to Pangpema, the North Base Camp at about 5,143 m, then crosses the Sele La, Sinion La and Mirgin La to the Oktang viewpoint above the Yalung glacier. It is a restricted area, so it needs a group of at least two with a licensed guide.
## Makalu
A 19-day trek from the Arun valley over the Shipton La into the Barun valley, to the foot of Makalu's south face at about 4,870 m. Makalu Barun National Park reaches from tropical forest to the high peaks, and the Barun valley is one of the least disturbed in the Himalaya.
## Lower and Upper Dolpo
Dolpo lies behind the Dhaulagiri range in the rain shadow, a high, dry land of Tibetan Buddhist and Bon villages. Lower Dolpo (18 days) loops through the Tarap valley and over the Numa La and Baga La to Phoksundo Lake, Nepal's deepest lake. Upper Dolpo (25 days) crosses the Kang La (5,360 m) to Shey Gompa, the Crystal Monastery, and continues through Saldang and Namgung. Both are restricted areas.
## Lodges and camping
Kanchenjunga and Makalu have simple lodges, with some camping on Makalu. Much of Lower Dolpo above Dho Tarap, and all of Upper Dolpo, is camping with a cook and crew who carry tents and food. Expect simple meals, cold nights and few places to charge a phone.
## Getting there
Kanchenjunga starts with a flight to Bhadrapur in the east and two days' drive through Ilam to Taplejung. Makalu starts with a flight to Tumlingtar and a long jeep ride to Num. Dolpo starts and ends with flights to the airstrip at Juphal, which depend on the weather, so these itineraries keep spare days.
## Who they suit
These treks are for fit walkers who have trekked at altitude before and are happy with long days, simple food and changes of plan. The rewards are quiet trails, real wilderness and cultures that see few visitors.
## When to go
Kanchenjunga and Makalu are best in spring and autumn. Dolpo, in the rain shadow, is walked from May to October, including the monsoon months.
## Planning
Tell us about your trekking experience and when you can travel. A trip designer will tell you which remote trek suits you and what it takes.`,
  },
  {
    slug: "adventure-activities",
    title: "Rafting, paragliding and bungee in Nepal",
    path: "/guides/adventure-activities",
    group: "plan",
    trips: [
      "nepal-white-water-rafting",
      "pokhara-paragliding",
      "bungee-and-canyon-swing-adventure",
      "mountain-biking-kathmandu-valley",
    ],
    body: `Nepal is not only for trekking. The rivers and valleys that make the treks so dramatic also make the country a great place for rafting, paragliding and other adventures, and most of them fit into a day or two between treks or tours.
## Rafting
- The Trishuli, Nepal's most popular rafting river, with rapids that are exciting but manageable for beginners and families, over two days with a night beside the river.
- Harder rivers such as the Bhote Koshi and the Kali Gandaki for experienced rafters, and multi-day expeditions on the Sun Koshi or the Karnali.
Experienced river guides and safety kayakers run every trip, and the Trishuli lies on the way to Chitwan and Pokhara.
## Paragliding
A tandem flight from Sarangkot, the ridge above Pokhara, with a licensed pilot. You glide for 20 to 30 minutes over the valley with the Annapurna range and Machhapuchhre in front of you, and land beside Phewa Lake. No experience is needed, and the best flying is from autumn to spring.
## Bungee and canyon swing
Nepal's original bungee jumps from a suspension bridge high above the Bhote Koshi near the Tibetan border, a few hours' drive from Kathmandu, and the canyon swing from the same bridge gives a long free fall and a huge arc across the gorge. From Pokhara, a newer bungee and swing span the Kali Gandaki gorge at Kushma.
## Mountain biking
A five-day ride around the rim of the Kathmandu valley, on forest single track, village trails and quiet roads, linking Chisapani, Nagarkot, Namobuddha, Dhulikhel and Panauti. There are long climbs and some steep, technical descents, with easier options on most days and a support vehicle for your luggage.
## Safety and limits
Weight limits and health restrictions apply to bungee, rafting and paragliding, and we confirm them when you book. Check that your travel insurance covers the activities you plan.
## Fitting them in
Rafting fits on the road from Kathmandu to Chitwan or Pokhara, paragliding into a rest day in Pokhara after a trek, and the Bhote Koshi bungee into a day from Kathmandu. Tell us what you would like to try, and a trip designer will fit it into your plan.`,
  },
  {
    slug: "bhutan-and-tibet",
    title: "Adding Bhutan or Tibet to your Nepal trip",
    path: "/guides/bhutan-and-tibet",
    group: "plan",
    trips: ["bhutan-add-on-tour", "tibet-add-on-tour"],
    body: `Kathmandu is the gateway to two more Himalayan journeys. Bhutan and Tibet are both a flight away, and a few extra days before or after your time in Nepal let you see three very different sides of the Himalaya on one trip.
## Bhutan in five days
Our Bhutan tour flies from Kathmandu to Paro along the Himalaya, with Everest and Kanchenjunga in view on a clear day. It visits Thimphu, Bhutan's small capital, the Dochula Pass with its 108 chortens and Punakha Dzong where two rivers meet. The highlight is the walk to Paro Taktsang, the Tiger's Nest monastery on a cliff above the Paro valley, a climb of two to three hours at a steady pace.
## Tibet in six days
Our Tibet tour flies across the Himalaya to Lhasa. The first days are spent in the city while you adjust to the altitude, at the Potala Palace, the Jokhang Temple, the Barkhor pilgrim circuit and the great monasteries of Drepung and Sera. The tour then crosses the Kamba La to Yamdrok Lake, a turquoise lake among high mountains.
## Visas and permits
- Bhutan: you travel with a licensed Bhutanese guide on a visa arranged before arrival, and pay Bhutan's Sustainable Development Fee for each night. Both are arranged through a licensed Bhutanese tour operator.
- Tibet: you need a Chinese group visa, issued in Kathmandu, and a Tibet Travel Permit arranged by a licensed Tibetan agency, and you travel with a Tibetan guide on a set itinerary. The rules can change at short notice, so we confirm them with you before you book.
## Altitude
The Bhutan tour stays at moderate heights, and the walk to the Tiger's Nest is its most demanding part. Tibet is high from the moment you land, so the itinerary keeps the first days easy, and it can work well after a trek in Nepal, while you are still acclimatised.
## Timing
Allow for the extra flights and for the visas. The Tibet visa is issued in Kathmandu, so plan time in the city before you fly to Lhasa.
## Plan your trip
Tell us your dates and how many days you can add. A trip designer will suggest the order that works best, with the visas and permits arranged.`,
  },
];

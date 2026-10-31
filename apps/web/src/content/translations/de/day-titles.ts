/**
 * German day titles, keyed by the English title. Titles made only of place names
 * ("Dharapani - Timang - Chame") read the same in German and are left out.
 */
export const dayTitlesDe: Record<string, string> = {
  // Shared
  "Arrive Kathmandu": "Ankunft in Kathmandu",
  "Arrive Kathmandu; briefing": "Ankunft in Kathmandu; Einweisung",
  Departure: "Abreise",
  "Buffer day": "Reservetag",
  "Buffer day / departure": "Reservetag / Abreise",
  "Contingency day": "Reservetag",
  "Contingency day (weather) or recovery": "Reservetag (Wetter) oder Erholung",
  "Reserve summit day (weather)": "Reserve-Gipfeltag (Wetter)",
  "Kathmandu sightseeing / preparation": "Besichtigungen in Kathmandu / Vorbereitung",
  "Kathmandu: permits and gear check": "Kathmandu: Permits und Ausrüstungscheck",
  "Kathmandu: permits (NMA) and gear check":
    "Kathmandu: Permits (NMA) und Ausrüstungscheck",
  "Preparation day; NMA permit formalities":
    "Vorbereitungstag; Formalitäten für die NMA-Genehmigung",
  "Kathmandu - Pokhara (drive 6-7 h or flight ~25 min)":
    "Kathmandu - Pokhara (Fahrt 6–7 Std. oder Flug ca. 25 Min.)",
  "Kathmandu - Pokhara (flight ~25 min or drive 6-7 h)":
    "Kathmandu - Pokhara (Flug ca. 25 Min. oder Fahrt 6–7 Std.)",
  "Kathmandu - Pokhara (drive or flight)": "Kathmandu - Pokhara (Fahrt oder Flug)",
  "Pokhara - Kathmandu (flight ~25 min or drive 6-7 h)":
    "Pokhara - Kathmandu (Flug ca. 25 Min. oder Fahrt 6–7 Std.)",
  "Pokhara - Kathmandu; departure or extra night":
    "Pokhara - Kathmandu; Abreise oder zusätzliche Nacht",
  "Pokhara - Kathmandu; departure next day":
    "Pokhara - Kathmandu; Abreise am nächsten Tag",

  // Annapurna
  "Pokhara - Nayapul (drive ~1-1.5 h) - Ghandruk":
    "Pokhara - Nayapul (Fahrt ca. 1–1,5 Std.) - Ghandruk",
  "ABC sunrise - descend to Bamboo": "Sonnenaufgang am ABC - Abstieg nach Bamboo",
  "Bamboo - Chhomrong - Jhinu Danda (hot springs)":
    "Bamboo - Chhomrong - Jhinu Danda (heiße Quellen)",
  "Jhinu Danda - Siwai/Nayapul - drive to Pokhara":
    "Jhinu Danda - Siwai/Nayapul - Fahrt nach Pokhara",
  "Kathmandu - Besisahar (drive) - Dharapani (jeep)":
    "Kathmandu - Besisahar (Fahrt) - Dharapani (Jeep)",
  "Upper Pisang - Ghyaru - Ngawal - Manang (high route)":
    "Upper Pisang - Ghyaru - Ngawal - Manang (oberer Weg)",
  "Acclimatisation day in Manang": "Akklimatisierungstag in Manang",
  "Muktinath - Kagbeni - Jomsom (walk or jeep)":
    "Muktinath - Kagbeni - Jomsom (zu Fuß oder per Jeep)",
  "Jomsom - Pokhara (flight)": "Jomsom - Pokhara (Flug)",
  "Kathmandu - Besisahar - Syange/Jagat (drive)":
    "Kathmandu - Besisahar - Syange/Jagat (Fahrt)",
  "Ledar - Chulu West Base Camp": "Ledar - Basislager Chulu West",
  "Base Camp - Camp I": "Basislager - Lager I",
  "Rest and acclimatisation at Camp I (crew stocks Camp II)":
    "Ruhe und Akklimatisierung in Lager I (das Team bestückt Lager II)",
  "Camp I - Camp II (High Camp) via rock band":
    "Lager I - Lager II (Hochlager) über das Felsband",
  "Camp II - Chulu West summit (6,419 m) - Camp I":
    "Lager II - Gipfel des Chulu West (6.419 m) - Lager I",
  "Camp I - Ledar": "Lager I - Ledar",
  "Thorong Phedi - Thorong La (5,416 m) - Muktinath":
    "Thorong Phedi - Thorong La (5.416 m) - Muktinath",
  "Thorong Phedi - Thorong La (5,416 m) - Muktinath - Jomsom (drive)":
    "Thorong Phedi - Thorong La (5.416 m) - Muktinath - Jomsom (Fahrt)",
  "Pokhara - Nayapul (drive ~1.5 h) - Birethanti - Tikhedhunga":
    "Pokhara - Nayapul (Fahrt ca. 1,5 Std.) - Birethanti - Tikhedhunga",
  "Pre-dawn hike to Poon Hill (3,210 m) - Ghorepani - Deurali - Tadapani":
    "Aufstieg vor Sonnenaufgang zum Poon Hill (3.210 m) - Ghorepani - Deurali - Tadapani",
  "Ghandruk - Kimche/Nayapul - drive to Pokhara":
    "Ghandruk - Kimche/Nayapul - Fahrt nach Pokhara",
  "Pokhara - drive to Nayapul/Kimche - Ghandruk":
    "Pokhara - Fahrt nach Nayapul/Kimche - Ghandruk",
  "Tadapani - Muldai viewpoint - Dobato": "Tadapani - Aussichtspunkt Muldai - Dobato",
  "Khopra - Khayer Lake (4,660 m) - Khopra": "Khopra - Khayer-See (4.660 m) - Khopra",
  "Poon Hill sunrise (3,210 m) - Ghorepani - Ulleri - drive to Pokhara":
    "Sonnenaufgang am Poon Hill (3.210 m) - Ghorepani - Ulleri - Fahrt nach Pokhara",
  "Pokhara - Kande (drive) - Australian Camp (2,060 m) - Pitam Deurali":
    "Pokhara - Kande (Fahrt) - Australian Camp (2.060 m) - Pitam Deurali",
  "High Camp - Upper Viewpoint (4,200 m) - Mardi Himal Base Camp (~4,500 m, optional) - descend to Low Camp/Badal Danda":
    "High Camp - Upper Viewpoint (4.200 m) - Mardi Himal Base Camp (ca. 4.500 m, optional) - Abstieg nach Low Camp/Badal Danda",
  "Low Camp - Siding - drive to Pokhara": "Low Camp - Siding - Fahrt nach Pokhara",
  "Kathmandu - Besisahar - Dharapani (drive/jeep)":
    "Kathmandu - Besisahar - Dharapani (Fahrt/Jeep)",
  "Acclimatisation day in Phu (Tashi Lhakhang; hike toward Himlung viewpoint ~4,400 m)":
    "Akklimatisierungstag in Phu (Tashi Lhakhang; Wanderung zum Himlung-Aussichtspunkt, ca. 4.400 m)",
  "Nar - Kang La (5,320 m) - Ngawal": "Nar - Kang La (5.320 m) - Ngawal",
  "Manang - Besisahar (jeep)": "Manang - Besisahar (Jeep)",
  "Besisahar - Kathmandu (drive)": "Besisahar - Kathmandu (Fahrt)",
  "Kathmandu - Besisahar - Chame (drive/jeep)":
    "Kathmandu - Besisahar - Chame (Fahrt/Jeep)",
  "Acclimatisation, training and preparation day at Pisang":
    "Akklimatisierungs-, Übungs- und Vorbereitungstag in Pisang",
  "Pisang - Pisang Peak Base Camp": "Pisang - Basislager Pisang Peak",
  "Base Camp - High Camp": "Basislager - Hochlager",
  "High Camp - Pisang Peak summit (6,091 m) - descend to Base Camp/Pisang":
    "Hochlager - Gipfel des Pisang Peak (6.091 m) - Abstieg zum Basislager/nach Pisang",
  "Pisang - Kathmandu (drive)": "Pisang - Kathmandu (Fahrt)",
  "Pokhara - Nayapul (drive) - Ghandruk": "Pokhara - Nayapul (Fahrt) - Ghandruk",
  "Acclimatisation day at ABC": "Akklimatisierungstag im ABC",
  "ABC - South Annapurna Glacier - Tharpu Chuli Base Camp":
    "ABC - South-Annapurna-Gletscher - Basislager Tharpu Chuli",
  "High Camp - Tharpu Chuli summit - descend to ABC":
    "Hochlager - Gipfel des Tharpu Chuli - Abstieg zum ABC",
  "Bamboo - Jhinu Danda (hot springs)": "Bamboo - Jhinu Danda (heiße Quellen)",
  "Jhinu - Siwai - drive to Pokhara": "Jhinu - Siwai - Fahrt nach Pokhara",
  "Pokhara - Jomsom (flight ~20 min) - Kagbeni":
    "Pokhara - Jomsom (Flug ca. 20 Min.) - Kagbeni",
  "Acclimatisation day at Chele: hike above the village toward Taklam La and return":
    "Akklimatisierungstag in Chele: Wanderung über dem Dorf Richtung Taklam La und zurück",
  "Chele - Taklam La (3,624 m) - Samar - Syangboche":
    "Chele - Taklam La (3.624 m) - Samar - Syangboche",
  "Syangboche - Nyi La (4,010 m) - Ghami": "Syangboche - Nyi La (4.010 m) - Ghami",
  "Tsarang - Lo La (3,950 m) - Lo Manthang": "Tsarang - Lo La (3.950 m) - Lo Manthang",
  "Explore Lo Manthang (Jampa Lhakhang, Thubchen, Chode, Royal Palace); optional Chhoser caves":
    "Lo Manthang erkunden (Jampa Lhakhang, Thubchen, Chode, Königspalast); auf Wunsch die Höhlen von Chhoser",
  "Chhusang - Kagbeni (exit restricted area) - Jomsom":
    "Chhusang - Kagbeni (Ende des Sperrgebiets) - Jomsom",
  "Jomsom - Pokhara (flight) - Kathmandu": "Jomsom - Pokhara (Flug) - Kathmandu",

  // Everest
  "Kathmandu (or Manthali) - Lukla (flight) - Phakding":
    "Kathmandu (oder Manthali) - Lukla (Flug) - Phakding",
  "Phakding - Monjo (park entry) - Namche Bazaar":
    "Phakding - Monjo (Parkeingang) - Namche Bazaar",
  "Acclimatisation day: Namche - Hotel Everest View / Khumjung - Namche":
    "Akklimatisierungstag: Namche - Hotel Everest View / Khumjung - Namche",
  "Acclimatisation day: Dingboche - Nangkartshang hill - Dingboche":
    "Akklimatisierungstag: Dingboche - Nangkartshang - Dingboche",
  "Gorak Shep - Kala Patthar (sunrise) - Gorak Shep - Pheriche":
    "Gorak Shep - Kala Patthar (Sonnenaufgang) - Gorak Shep - Pheriche",
  "Lukla - Kathmandu (flight; or Lukla - Manthali flight + drive)":
    "Lukla - Kathmandu (Flug; oder Flug Lukla - Manthali + Fahrt)",
  "Acclimatisation day: Hotel Everest View / Khumjung":
    "Akklimatisierungstag: Hotel Everest View / Khumjung",
  "Acclimatisation day: Nangkartshang (about 5,083 m)":
    "Akklimatisierungstag: Nangkartshang (etwa 5.083 m)",
  "Chhukung - Kongma La (5,535 m) - Khumbu Glacier - Lobuche":
    "Chhukung - Kongma La (5.535 m) - Khumbu-Gletscher - Lobuche",
  "Kala Patthar (sunrise) - Lobuche - Dzongla":
    "Kala Patthar (Sonnenaufgang) - Lobuche - Dzongla",
  "Dzongla - Cho La (5,420 m) - Thagnak (Dragnag)":
    "Dzongla - Cho La (5.420 m) - Thagnak (Dragnag)",
  "Thagnak - Ngozumpa Glacier crossing - Gokyo":
    "Thagnak - Querung des Ngozumpa-Gletschers - Gokyo",
  "Gokyo Ri (5,357 m) and lakes": "Gokyo Ri (5.357 m) und Seen",
  "Gokyo - Renjo La (5,360 m) - Lungden": "Gokyo - Renjo La (5.360 m) - Lungden",
  "Lukla - Kathmandu (flight; or via Manthali)":
    "Lukla - Kathmandu (Flug; oder über Manthali)",
  "Lukla - Kathmandu (flight; or Lukla - Manthali + 4-5 h drive)":
    "Lukla - Kathmandu (Flug; oder Lukla - Manthali + 4–5 Std. Fahrt)",
  "Spare day in Kathmandu for Lukla flight delays; departure":
    "Reservetag in Kathmandu für Verspätungen ab Lukla; Abreise",
  "Gokyo Ri (5,357 m) sunrise; lakes": "Sonnenaufgang am Gokyo Ri (5.357 m); Seen",
  "Gokyo - Ngozumpa Glacier - Thagnak (Dragnag)":
    "Gokyo - Ngozumpa-Gletscher - Thagnak (Dragnag)",
  "Thagnak - Cho La (5,420 m) - Dzongla": "Thagnak - Cho La (5.420 m) - Dzongla",
  "Kala Patthar (sunrise) - Pheriche": "Kala Patthar (Sonnenaufgang) - Pheriche",
  "Machhermo - Pangka - first and second lakes - Gokyo":
    "Machhermo - Pangka - erster und zweiter See - Gokyo",
  "Gokyo Ri sunrise (5,357 m); optional walk to fourth/fifth lakes":
    "Sonnenaufgang am Gokyo Ri (5.357 m); auf Wunsch Wanderung zum vierten/fünften See",
  "Kala Patthar (sunrise) - descend to Dingboche":
    "Kala Patthar (Sonnenaufgang) - Abstieg nach Dingboche",
  "Chhukung - Island Peak Base Camp (Pareshaya Gyab)":
    "Chhukung - Island Peak Base Camp (Pareshaya Gyab)",
  "Base camp: rope, crampon and jumar training":
    "Basislager: Übung mit Seil, Steigeisen und Steigklemme",
  "Summit Island Peak - return to Chhukung":
    "Gipfel des Island Peak - zurück nach Chhukung",
  "Lobuche - High Camp; rope, crampon and jumar training":
    "Lobuche - Hochlager; Übung mit Seil, Steigeisen und Steigklemme",
  "Summit Lobuche East - descend to Pheriche (or High Camp)":
    "Gipfel des Lobuche East - Abstieg nach Pheriche (oder ins Hochlager)",
  "Kathmandu (or Manthali) - Lukla (flight) - Paiya (Chutok)":
    "Kathmandu (oder Manthali) - Lukla (Flug) - Paiya (Chutok)",
  "Acclimatisation day at Kothe: hike up the Hinku valley and return":
    "Akklimatisierungstag in Kothe: Wanderung ins Hinku-Tal und zurück",
  "Acclimatisation day at Thangnak: hike above the village toward the Charpate glacier and return":
    "Akklimatisierungstag in Thangnak: Wanderung über dem Dorf Richtung Charpate-Gletscher und zurück",
  "Acclimatisation at Khare: hike toward Mera La, crampon practice":
    "Akklimatisierung in Khare: Wanderung Richtung Mera La, Übung mit Steigeisen",
  "Khare - Mera La - High Camp": "Khare - Mera La - Hochlager",
  "Summit Mera Peak - return to Khare": "Gipfel des Mera Peak - zurück nach Khare",
  "Reserve / recovery at Khare": "Reserve / Erholung in Khare",
  "Thuli Kharka - Zatrwa La (about 4,610 m) - Lukla":
    "Thuli Kharka - Zatrwa La (etwa 4.610 m) - Lukla",

  // Langtang, Manaslu, east and west
  "Kathmandu - Trishuli - Dhunche - Syabrubesi (drive)":
    "Kathmandu - Trishuli - Dhunche - Syabrubesi (Fahrt)",
  "Lama Hotel - Ghoda Tabela - Langtang village":
    "Lama Hotel - Ghoda Tabela - Dorf Langtang",
  "Day hike to Tserko Ri (4,984 m) or Kyanjin Ri (4,773 m), return to Kyanjin Gompa":
    "Tageswanderung auf den Tserko Ri (4.984 m) oder Kyanjin Ri (4.773 m), zurück nach Kyanjin Gompa",
  "Syabrubesi - Kathmandu (drive)": "Syabrubesi - Kathmandu (Fahrt)",
  "Kathmandu - Dhunche - Syabrubesi (drive)": "Kathmandu - Dhunche - Syabrubesi (Fahrt)",
  "Lama Hotel - Langtang village": "Lama Hotel - Dorf Langtang",
  "Day hike Kyanjin Ri (4,773 m) or Tserko Ri (4,984 m)":
    "Tageswanderung auf den Kyanjin Ri (4.773 m) oder Tserko Ri (4.984 m)",
  "Lama Hotel - Thulo Syabru (upper trail)": "Lama Hotel - Thulo Syabru (oberer Weg)",
  "Gosainkunda - Laurebina La (4,610 m) - Phedi - Ghopte":
    "Gosainkunda - Laurebina La (4.610 m) - Phedi - Ghopte",
  "Chisapani - Borlang Bhanjyang - Shivapuri NP - Sundarijal, drive to Kathmandu":
    "Chisapani - Borlang Bhanjyang - Shivapuri-NP - Sundarijal, Fahrt nach Kathmandu",
  "Kathmandu - Sundarijal (drive), trek through Shivapuri Nagarjun NP to Chisapani":
    "Kathmandu - Sundarijal (Fahrt), Trek durch den Shivapuri-Nagarjun-NP nach Chisapani",
  "Sermathang - Melamchi Pul Bazaar, drive to Kathmandu":
    "Sermathang - Melamchi Pul Bazaar, Fahrt nach Kathmandu",
  "Thuman - Timure (old Tibet trade route, near Rasuwagadhi)":
    "Thuman - Timure (alte Handelsroute nach Tibet, bei Rasuwagadhi)",
  "Acclimatization day (Kyanjin Ri hike)":
    "Akklimatisierungstag (Wanderung auf den Kyanjin Ri)",
  "Kyanjin Gompa - Yala Kharka / high camp": "Kyanjin Gompa - Yala Kharka / Hochlager",
  "Summit Yala Peak, descend to Kyanjin Gompa":
    "Gipfel des Yala Peak, Abstieg nach Kyanjin Gompa",
  "Spare weather day": "Reservetag für das Wetter",
  "Kathmandu - Arughat - Soti Khola - Machha Khola (drive)":
    "Kathmandu - Arughat - Soti Khola - Machha Khola (Fahrt)",
  "Acclimatization day at Samagaon (optional hike towards Manaslu Base Camp or Pungyen Gompa)":
    "Akklimatisierungstag in Samagaon (auf Wunsch Wanderung Richtung Manaslu Base Camp oder Pungyen Gompa)",
  "Acclimatisation day at Samdo: hike up toward the Tibet border trail and return":
    "Akklimatisierungstag in Samdo: Wanderung Richtung Grenzweg nach Tibet und zurück",
  "Samdo - Larkya Bazaar ruins - Dharamsala (Larkya Phedi)":
    "Samdo - Ruinen von Larkya Bazaar - Dharamsala (Larkya Phedi)",
  "Dharapani - Besisahar - Kathmandu (drive)":
    "Dharapani - Besisahar - Kathmandu (Fahrt)",
  "Chhokangparo - Milarepa's Piren Phu cave - Nile / Chhule":
    "Chhokangparo - Milarepas Höhle Piren Phu - Nile / Chhule",
  "Nile - Mu Gompa - return to Nile or down to Chhokangparo":
    "Nile - Mu Gompa - zurück nach Nile oder hinunter nach Chhokangparo",
  "Nile/Chhokangparo - Rachen Gompa - Chumling or Lokpa":
    "Nile/Chhokangparo - Rachen Gompa - Chumling oder Lokpa",
  "Machha Khola - Kathmandu (drive)": "Machha Khola - Kathmandu (Fahrt)",
  "Kathmandu - Bhadrapur (flight) - drive to Ilam":
    "Kathmandu - Bhadrapur (Flug) - Fahrt nach Ilam",
  "Ilam - Taplejung (drive)": "Ilam - Taplejung (Fahrt)",
  "Chiruwa - Taplethok checkpoint - Lelep": "Chiruwa - Kontrollposten Taplethok - Lelep",
  "Rest and acclimatization at Ghunsa": "Ruhe und Akklimatisierung in Ghunsa",
  "Acclimatization day at Khambachen": "Akklimatisierungstag in Khambachen",
  "Lhonak - Pangpema (North Base Camp, approx. 5,143 m) - Lhonak":
    "Lhonak - Pangpema (Nördliches Basislager, ca. 5.143 m) - Lhonak",
  "Ghunsa - Sele Le (high camp)": "Ghunsa - Sele Le (Hochlager)",
  "Cross Sele La, Sinion La and Mirgin La - Cheram (Tseram)":
    "Über Sele La, Sinion La und Mirgin La - Cheram (Tseram)",
  "Ramche - Oktang viewpoint (South Base Camp side, approx. 4,730 m) - Cheram":
    "Ramche - Aussichtspunkt Oktang (Seite des Südlichen Basislagers, ca. 4.730 m) - Cheram",
  "Khebang - drive to Bhadrapur (or via Taplejung)":
    "Khebang - Fahrt nach Bhadrapur (oder über Taplejung)",
  "Bhadrapur - Kathmandu (flight)": "Bhadrapur - Kathmandu (Flug)",
  "Kathmandu - Tumlingtar (flight) - jeep to Num":
    "Kathmandu - Tumlingtar (Flug) - Jeep nach Num",
  "Num - Arun River - Seduwa": "Num - Arun - Seduwa",
  "Acclimatization day at Khongma Danda": "Akklimatisierungstag in Khongma Danda",
  "Khongma Danda - Shipton La (approx. 4,216 m) - Keke La - Dobato":
    "Khongma Danda - Shipton La (ca. 4.216 m) - Keke La - Dobato",
  "Dobato - Barun valley - Yangle Kharka": "Dobato - Barun-Tal - Yangle Kharka",
  "Acclimatisation day at Yangle Kharka: hike up the Barun valley and return":
    "Akklimatisierungstag in Yangle Kharka: Wanderung ins Barun-Tal und zurück",
  "Exploration day at Makalu Base Camp (toward Swiss Base Camp / Makalu La viewpoints)":
    "Erkundungstag am Makalu Base Camp (Richtung Swiss Base Camp / Aussichtspunkte am Makalu La)",
  "Num - Tumlingtar (jeep)": "Num - Tumlingtar (Jeep)",
  "Tumlingtar - Kathmandu (flight)": "Tumlingtar - Kathmandu (Flug)",
  "Kathmandu - Nepalgunj (flight)": "Kathmandu - Nepalgunj (Flug)",
  "Nepalgunj - Juphal (flight, approx. 35 min) - Dunai":
    "Nepalgunj - Juphal (Flug, ca. 35 Min.) - Dunai",
  "Acclimatisation day at Rechi: short hike above the village and return":
    "Akklimatisierungstag in Rechi: kurze Wanderung über dem Dorf und zurück",
  "Rechi - Phoksundo Falls - Ringmo": "Rechi - Phoksundo-Wasserfall - Ringmo",
  "Rest and acclimatization at Ringmo / Phoksundo Lake":
    "Ruhe und Akklimatisierung in Ringmo / am Phoksundo-See",
  "Ringmo - along Phoksundo Lake west shore - Phoksundo Khola":
    "Ringmo - am Westufer des Phoksundo-Sees - Phoksundo Khola",
  "Acclimatisation day at Phoksundo Khola camp: hike up the valley toward Kang La and return":
    "Akklimatisierungstag im Lager Phoksundo Khola: Wanderung talaufwärts Richtung Kang La und zurück",
  "Phoksundo Khola - Phoksundo Bhanjyang (Kang La base)":
    "Phoksundo Khola - Phoksundo Bhanjyang (Fuß des Kang La)",
  "Cross Kang La (5,360 m) - Shey Gompa": "Über den Kang La (5.360 m) - Shey Gompa",
  "Rest day at Shey Gompa; Crystal Mountain area":
    "Ruhetag in Shey Gompa; am Kristallberg",
  "Shey Gompa - Saldang La / Sela La (approx. 5,100 m) - Namgung (Namduna)":
    "Shey Gompa - Saldang La / Sela La (ca. 5.100 m) - Namgung (Namduna)",
  "Cross Jeng La (approx. 5,090-5,120 m) - Tokyu":
    "Über den Jeng La (ca. 5.090–5.120 m) - Tokyu",
  "Rest day at Dho Tarap": "Ruhetag in Dho Tarap",
  "Juphal - Nepalgunj - Kathmandu (flights)": "Juphal - Nepalgunj - Kathmandu (Flüge)",
  "Kathmandu: permits (agency) and preparation":
    "Kathmandu: Permits (über die Agentur) und Vorbereitung",
  "Nepalgunj - Juphal (flight) - Dunai": "Nepalgunj - Juphal (Flug) - Dunai",
  "Dunai - Tarakot (along Thuli Bheri)": "Dunai - Tarakot (am Thuli Bheri entlang)",
  "Tarakot - Laini (Tarap Khola valley)": "Tarakot - Laini (Tal des Tarap Khola)",
  "Rest and acclimatization at Dho Tarap": "Ruhe und Akklimatisierung in Dho Tarap",
  "Dho Tarap - Numa La Base Camp": "Dho Tarap - Basislager Numa La",
  "Cross Numa La (approx. 5,190 m) - Pelung Tang":
    "Über den Numa La (ca. 5.190 m) - Pelung Tang",
  "Cross Baga La (approx. 5,070 m) - Dajok Tang":
    "Über den Baga La (ca. 5.070 m) - Dajok Tang",
  "Dajok Tang - Ringmo (Phoksundo Lake)": "Dajok Tang - Ringmo (Phoksundo-See)",
  "Rest day at Phoksundo Lake": "Ruhetag am Phoksundo-See",
  "Ringmo - Shyanta (via Phoksundo waterfall)":
    "Ringmo - Shyanta (über den Phoksundo-Wasserfall)",
  "Departure from Kathmandu": "Abreise ab Kathmandu",
  "Kathmandu - Nepalgunj (flight, approx. 1 hr)":
    "Kathmandu - Nepalgunj (Flug, ca. 1 Std.)",
  "Nepalgunj - Talcha (flight, approx. 35 min) - walk to Rara Lake":
    "Nepalgunj - Talcha (Flug, ca. 35 Min.) - Wanderung zum Rara-See",
  "Rara Lake shoreline circuit": "Runde am Ufer des Rara-Sees",
  "Hike to Murma Top viewpoint and return":
    "Wanderung zum Aussichtspunkt Murma Top und zurück",
  "Rara Lake - Talcha (walk) - Nepalgunj (flight)":
    "Rara-See - Talcha (zu Fuß) - Nepalgunj (Flug)",
  "Nepalgunj - Kathmandu (flight)": "Nepalgunj - Kathmandu (Flug)",

  // Expeditions and tours
  "Kathmandu: expedition briefing and permits":
    "Kathmandu: Expeditions-Briefing und Genehmigungen",
  "Acclimatisation: Hotel Everest View / Khumjung":
    "Akklimatisierung: Hotel Everest View / Khumjung",
  "Pangboche - Ama Dablam Base Camp": "Pangboche - Basislager Ama Dablam",
  "Skills, puja, and rotation: Yak Camp / ABC (about 5,200 m) - touch Camp 1 (about 5,700 m) - return to Base Camp":
    "Übungen, Puja und Rotation: Yak Camp / ABC (etwa 5.200 m) - kurz bis Lager 1 (etwa 5.700 m) - zurück ins Basislager",
  "Second rotation: sleep Camp 1; touch Camp 2 (about 5,900-6,100 m, above the Yellow Tower) - return to Base Camp":
    "Zweite Rotation: Nacht in Lager 1; kurz bis Lager 2 (etwa 5.900–6.100 m, über dem Yellow Tower) - zurück ins Basislager",
  "Rest, then summit window: Base Camp - Camp 1 - Camp 2 - Camp 3 (about 6,200-6,400 m, often not slept) - summit 6,812 m - descend":
    "Ruhe, dann Gipfelfenster: Basislager - Lager 1 - Lager 2 - Lager 3 (etwa 6.200–6.400 m, oft ohne Übernachtung) - Gipfel 6.812 m - Abstieg",
  "Base Camp - Pangboche - Namche - Lukla": "Basislager - Pangboche - Namche - Lukla",
  "Lukla - Kathmandu; departure buffer": "Lukla - Kathmandu; Puffer vor der Abreise",
  "Briefing, permit formalities, gear check":
    "Briefing, Formalitäten für die Genehmigung, Ausrüstungscheck",
  "Kathmandu - Pokhara (flight)": "Kathmandu - Pokhara (Flug)",
  "Pokhara - Dana (drive)": "Pokhara - Dana (Fahrt)",
  "Dana - Annapurna I Base Camp (helicopter)":
    "Dana - Basislager Annapurna I (Hubschrauber)",
  "Acclimatisation and rotations: BC - Camp I (5,150 m) - Camp II (5,700 m) - BC":
    "Akklimatisierung und Rotationen: BL - Lager I (5.150 m) - Lager II (5.700 m) - BL",
  "Summit window: BC - Camp II - Camp III (6,500 m) - Camp IV (7,400 m) - summit (8,091 m) - descend":
    "Gipfelfenster: BL - Lager II - Lager III (6.500 m) - Lager IV (7.400 m) - Gipfel (8.091 m) - Abstieg",
  "Base Camp - Dana (helicopter)": "Basislager - Dana (Hubschrauber)",
  "Dana - Pokhara (drive) - Kathmandu (flight)":
    "Dana - Pokhara (Fahrt) - Kathmandu (Flug)",
  "Contingency/leisure; departure": "Reserve/Freizeit; Abreise",
  "Arrive Kathmandu; Tibet visa / CTMA paperwork (when the route is open) or Nepal DoT briefing for a Nepal-side attempt":
    "Ankunft in Kathmandu; Tibet-Visum / CTMA-Papiere (wenn die Route offen ist) oder Briefing im nepalischen DoT für einen Versuch von Nepal aus",
  "Drive Kathmandu - Timure - Kerung/Kyirong (about 2,700 m) - Tingri (about 4,300 m); rest/acclimatise at Tingri":
    "Fahrt Kathmandu - Timure - Kerung/Kyirong (etwa 2.700 m) - Tingri (etwa 4.300 m); Ruhe/Akklimatisierung in Tingri",
  "Drive Tingri - Chinese Base Camp (about 5,100-5,200 m); rest; move via Middle Camp (about 5,300-5,400 m) to Advance Base Camp (about 5,700 m) on the Gyabrag Glacier":
    "Fahrt Tingri - Chinesisches Basislager (etwa 5.100–5.200 m); Ruhe; über das Middle Camp (etwa 5.300–5.400 m) zum vorgeschobenen Basislager (etwa 5.700 m) auf dem Gyabrag-Gletscher",
  "Rotations: ABC - Camp 1 (about 6,400 m, foot of the NW ridge) - Camp 2 (about 7,100-7,200 m) - optional Camp 3 / high camp below the Yellow Band (about 7,450-7,500 m) - rest at ABC":
    "Rotationen: ABC - Lager 1 (etwa 6.400 m, Fuß des NW-Grats) - Lager 2 (etwa 7.100–7.200 m) - auf Wunsch Lager 3 / Hochlager unter dem Gelben Band (etwa 7.450–7.500 m) - Erholung im ABC",
  "Summit window: high camp - summit 8,188 m - ABC; pack; drive Tingri - Kerung - Kathmandu":
    "Gipfelfenster: Hochlager - Gipfel 8.188 m - ABC; Packen; Fahrt Tingri - Kerung - Kathmandu",
  "Lukla - Namche - Gokyo or Thame valley toward Nangpa La (about 5,700-5,806 m) / south base camp area (operator figures 5,300-5,419 m) - SW Face camps":
    "Lukla - Namche - Gokyo- oder Thame-Tal Richtung Nangpa La (etwa 5.700–5.806 m) / Bereich des Südbasislagers (Angaben der Veranstalter 5.300–5.419 m) - Lager in der SW-Wand",
  "Briefing, permit formalities": "Briefing, Formalitäten für die Genehmigung",
  "Pokhara - Beni - Marpha (drive)": "Pokhara - Beni - Marpha (Fahrt)",
  "Acclimatisation day in Marpha (optional Muktinath excursion)":
    "Akklimatisierungstag in Marpha (auf Wunsch Ausflug nach Muktinath)",
  "Yak Kharka - Dhampus/Thapa Pass (~5,244 m) - Hidden Valley (Dhampus Base Camp)":
    "Yak Kharka - Dhampus-/Thapa-Pass (ca. 5.244 m) - Hidden Valley (Dhampus-Basislager)",
  "Hidden Valley - French Pass (~5,360 m) - Dhaulagiri Base Camp":
    "Hidden Valley - French Pass (ca. 5.360 m) - Basislager Dhaulagiri",
  "Acclimatisation and rotations: BC - Camp I (5,850-5,900 m) - Camp II (6,400-6,600 m) - touch Camp III - BC":
    "Akklimatisierung und Rotationen: BL - Lager I (5.850–5.900 m) - Lager II (6.400–6.600 m) - kurz bis Lager III - BL",
  "Summit window: BC - Camp II - Camp III (7,200-7,400 m) - summit (8,167 m) - descend to C2/BC":
    "Gipfelfenster: BL - Lager II - Lager III (7.200–7.400 m) - Gipfel (8.167 m) - Abstieg zu L2/BL",
  "Base Camp - Yak Kharka (via passes)": "Basislager - Yak Kharka (über die Pässe)",
  "Marpha - Pokhara (drive) or Jomsom - Pokhara (flight)":
    "Marpha - Pokhara (Fahrt) oder Jomsom - Pokhara (Flug)",
  "Pokhara - Kathmandu; contingency; departure": "Pokhara - Kathmandu; Reserve; Abreise",
  "Arrive Kathmandu; expedition briefing at the Department of Tourism, permit collection, gear check":
    "Ankunft in Kathmandu; Expeditions-Briefing im Department of Tourism, Abholung der Genehmigung, Ausrüstungscheck",
  "Fly to Lukla (from Kathmandu or Manthali/Ramechhap in peak season) and trek Phakding - Namche Bazaar (rest) - Tengboche/Deboche - Dingboche (rest) - Lobuche - Gorak Shep - Everest Base Camp":
    "Flug nach Lukla (ab Kathmandu oder in der Hochsaison ab Manthali/Ramechhap) und Trek Phakding - Namche Bazaar (Ruhetag) - Tengboche/Deboche - Dingboche (Ruhetag) - Lobuche - Gorak Shep - Everest Base Camp",
  "Arrive Everest Base Camp; puja ceremony; ladder, fixed-rope and oxygen training":
    "Ankunft im Everest Base Camp; Puja-Zeremonie; Übungen an Leitern, Fixseilen und mit Sauerstoff",
  "Acclimatization rotations: BC - Khumbu Icefall - Camp 1 (approx. 6,065 m) - Western Cwm - Camp 2 (approx. 6,400 m) - touch/sleep Camp 3 (approx. 7,160 m) on Lhotse Face - return to BC":
    "Akklimatisierungsrotationen: BL - Khumbu-Eisbruch - Lager 1 (ca. 6.065 m) - Western Cwm - Lager 2 (ca. 6.400 m) - Lager 3 (ca. 7.160 m) in der Lhotse-Flanke berühren/übernachten - zurück ins BL",
  "Rest at Base Camp (some teams descend to lower villages) awaiting summit weather window":
    "Ruhe im Basislager (manche Teams steigen in tiefere Dörfer ab) bis zum Gipfelfenster",
  "Summit push (weather window, typically mid-late May): BC - Camp 2 - Camp 3 (oxygen) - Camp 4 / South Col (approx. 7,925-7,950 m) - summit 8,848.86 m - descend to South Col/Camp 2 - Base Camp":
    "Gipfelvorstoß (Wetterfenster, meist Mitte bis Ende Mai): BL - Lager 2 - Lager 3 (Sauerstoff) - Lager 4 / Südsattel (ca. 7.925–7.950 m) - Gipfel 8.848,86 m - Abstieg zum Südsattel/Lager 2 - Basislager",
  "Clear Base Camp (garbage checks by SPCC); trek down to Lukla":
    "Basislager räumen (Müllkontrolle durch das SPCC); Abstieg nach Lukla",
  "Fly Lukla - Kathmandu (or Manthali); summit certificate formalities at DoT; departure":
    "Flug Lukla - Kathmandu (oder Manthali); Formalitäten für die Gipfelurkunde im DoT; Abreise",
  "Arrival in Kathmandu; gear check, permits and briefing":
    "Ankunft in Kathmandu; Ausrüstungscheck, Genehmigungen und Briefing",
  "Drive Kathmandu - Besisahar - Koto (Annapurna Circuit road)":
    "Fahrt Kathmandu - Besisahar - Koto (Straße der Annapurna-Runde)",
  "Trek Koto - Nar Khola gorge - Meta - Chyaku/Kyang - Phu Gaon":
    "Trek Koto - Schlucht des Nar Khola - Meta - Chyaku/Kyang - Phu Gaon",
  "Acclimatization day at Phu Gaon (monastery)":
    "Akklimatisierungstag in Phu Gaon (Kloster)",
  "Phu Gaon - Himlung Base Camp": "Phu Gaon - Basislager Himlung",
  "Puja, training, and acclimatization rotations to Camp I (approx. 5,400-5,500 m), Camp II (approx. 6,000 m) and Camp III (approx. 6,350-6,400 m); summit push in a weather window":
    "Puja, Übungen und Akklimatisierungsrotationen zu Lager I (ca. 5.400–5.500 m), Lager II (ca. 6.000 m) und Lager III (ca. 6.350–6.400 m); Gipfelvorstoß im Wetterfenster",
  "Descend to Phu, trek out via Meta/Koto, drive to Besisahar and Kathmandu":
    "Abstieg nach Phu, Rückweg über Meta/Koto, Fahrt nach Besisahar und Kathmandu",
  "Contingency / weather buffer days": "Reserve- / Wetterpuffertage",
  "Arrive Kathmandu; DoT briefing, restricted-area and climbing permits, gear check":
    "Ankunft in Kathmandu; Briefing im DoT, Genehmigungen für Sperrgebiet und Besteigung, Ausrüstungscheck",
  "Fly Kathmandu - Bhadrapur; drive to Phidim":
    "Flug Kathmandu - Bhadrapur; Fahrt nach Phidim",
  "Drive Phidim - Yamphudin; rest/acclimatise":
    "Fahrt Phidim - Yamphudin; Ruhe/Akklimatisierung",
  "Trek Yamphudin - Tortong - Tseram (Cheram)":
    "Trek Yamphudin - Tortong - Tseram (Cheram)",
  "Acclimatisation at Tseram; hike toward Ramche (about 4,580 m) / Oktang":
    "Akklimatisierung in Tseram; Wanderung Richtung Ramche (etwa 4.580 m) / Oktang",
  "Tseram - Kanchenjunga South / Yalung Base Camp (helicopter on the SST programme; otherwise trek via Ramche-Oktang and the Yalung Glacier moraine)":
    "Tseram - Kanchenjunga Süd / Yalung-Basislager (beim SST-Programm per Hubschrauber; sonst zu Fuß über Ramche-Oktang und die Moräne des Yalung-Gletschers)",
  "Puja and rotations on the Yalung Glacier SW Face: Camp 1 (about 6,200 m) - Camp 2 (about 6,400 m) - Camp 3 (about 7,100 m) - return to Base Camp":
    "Puja und Rotationen in der SW-Wand über dem Yalung-Gletscher: Lager 1 (etwa 6.200 m) - Lager 2 (etwa 6.400 m) - Lager 3 (etwa 7.100 m) - zurück ins Basislager",
  "Summit window: Camp 4 (about 7,550-7,570 m) - summit 8,586 m - descend to Camp 3 or 2 - Base Camp":
    "Gipfelfenster: Lager 4 (etwa 7.550–7.570 m) - Gipfel 8.586 m - Abstieg zu Lager 3 oder 2 - Basislager",
  "Helicopter Base Camp - Tapetok (SST) or trek out; drive Phidim - Bhadrapur; fly Kathmandu":
    "Hubschrauber Basislager - Tapetok (SST) oder Rückweg zu Fuß; Fahrt Phidim - Bhadrapur; Flug nach Kathmandu",
  "Buffer in Kathmandu; departure": "Puffer in Kathmandu; Abreise",
  "Arrive Kathmandu; DoT briefing, permits, gear check":
    "Ankunft in Kathmandu; Briefing im DoT, Genehmigungen, Ausrüstungscheck",
  "Fly Lukla; trek Phakding - Namche (rest) - Deboche/Tengboche - Dingboche - Lobuche - Everest/Lhotse Base Camp":
    "Flug nach Lukla; Trek Phakding - Namche (Ruhetag) - Deboche/Tengboche - Dingboche - Lobuche - Everest-/Lhotse-Basislager",
  "Puja; Icefall ladder training; move through Icefall to Camp 1":
    "Puja; Leiterübungen für den Eisbruch; durch den Eisbruch zu Lager 1",
  "Rotations: Camp 1 - Western Cwm - Camp 2 - Lhotse Face - touch/sleep Camp 3 - return to Base Camp; rest awaiting weather":
    "Rotationen: Lager 1 - Western Cwm - Lager 2 - Lhotse-Flanke - Lager 3 berühren/übernachten - zurück ins Basislager; Ruhe bis zum Wetterfenster",
  "Summit window (typically mid-late May): Base Camp - Camp 2 - Camp 3 (oxygen) - Camp 4 near Geneva Spur (about 7,800-7,900 m) - Lhotse Couloir - summit 8,516 m - descend to Camp 2 / Base Camp":
    "Gipfelfenster (meist Mitte bis Ende Mai): Basislager - Lager 2 - Lager 3 (Sauerstoff) - Lager 4 nahe dem Genfer Sporn (etwa 7.800–7.900 m) - Lhotse-Couloir - Gipfel 8.516 m - Abstieg zu Lager 2 / Basislager",
  "SPCC garbage checks; trek Base Camp - Pheriche - Namche - Lukla":
    "Müllkontrolle durch das SPCC; Trek Basislager - Pheriche - Namche - Lukla",
  "Fly Lukla - Kathmandu; buffer; departure": "Flug Lukla - Kathmandu; Puffer; Abreise",
  "Fly Kathmandu - Tumlingtar - jeep to Num":
    "Flug Kathmandu - Tumlingtar - Jeep nach Num",
  "Trek Num - Arun River - Seduwa - Tashigaon": "Trek Num - Arun - Seduwa - Tashigaon",
  "Tashigaon rest; then steep climb to Khongma Danda":
    "Ruhe in Tashigaon; dann steiler Aufstieg nach Khongma Danda",
  "Khongma - Shipton La (about 4,200 m) - Keke La - Dobato - Yangle Kharka - Langmale Kharka":
    "Khongma - Shipton La (etwa 4.200 m) - Keke La - Dobato - Yangle Kharka - Langmale Kharka",
  "Langmale - Lower / Hillary Base Camp (about 4,850-5,000 m); rest; move to Advance / Higher Base Camp (about 5,600-5,700 m)":
    "Langmale - unteres Basislager / Hillary Base Camp (etwa 4.850–5.000 m); Ruhe; Umzug ins vorgeschobene / obere Basislager (etwa 5.600–5.700 m)",
  "Puja and rotations: ABC - Camp 1 (about 6,100-6,300 m) - Camp 2 (about 6,500-7,000 m) - touch toward Makalu La / Camp 3 - return to ABC":
    "Puja und Rotationen: ABC - Lager 1 (etwa 6.100–6.300 m) - Lager 2 (etwa 6.500–7.000 m) - Richtung Makalu La / Lager 3 - zurück ins ABC",
  "Summit window: Camp 3 on/near Makalu La (about 7,400-7,500 m) - Camp 4 (about 7,600-7,900 m, north ridge) - French Couloir - summit ridge - 8,485 m - descend to C2/ABC":
    "Gipfelfenster: Lager 3 am Makalu La (etwa 7.400–7.500 m) - Lager 4 (etwa 7.600–7.900 m, Nordgrat) - French Couloir - Gipfelgrat - 8.485 m - Abstieg zu L2/ABC",
  "Clean ABC/BC; trek out Yangle - Khongma - Tashigaon - Seduwa - Num; jeep Tumlingtar; fly Kathmandu":
    "ABC/BL räumen; Rückweg Yangle - Khongma - Tashigaon - Seduwa - Num; Jeep nach Tumlingtar; Flug nach Kathmandu",
  "Buffer / departure": "Puffer / Abreise",
  "Arrival in Kathmandu; briefing, gear check, permits":
    "Ankunft in Kathmandu; Briefing, Ausrüstungscheck, Genehmigungen",
  "Helicopter Kathmandu - Samagaon": "Hubschrauber Kathmandu - Samagaon",
  "Acclimatization treks around Samagaon":
    "Akklimatisierungswanderungen rund um Samagaon",
  "Samagaon - Manaslu Base Camp": "Samagaon - Basislager Manaslu",
  "Puja and acclimatization rotations to Camp 1 (approx. 5,500-5,700 m), Camp 2 (approx. 6,250-6,400 m) and Camp 3 (approx. 6,800 m)":
    "Puja und Akklimatisierungsrotationen zu Lager 1 (ca. 5.500–5.700 m), Lager 2 (ca. 6.250–6.400 m) und Lager 3 (ca. 6.800 m)",
  "Summit window: Camp 4 (approx. 7,400-7,450 m) and summit, descend to Base Camp":
    "Gipfelfenster: Lager 4 (ca. 7.400–7.450 m) und Gipfel, Abstieg ins Basislager",
  "Descend to Samagaon, trek out to Soti Khola (or helicopter) and drive to Kathmandu":
    "Abstieg nach Samagaon, Rückweg nach Soti Khola (oder Hubschrauber) und Fahrt nach Kathmandu",
  "Kathmandu - Nepalgunj (flight ~1 h) - Thakurdwara (drive ~2.5-3 h, ~95 km); Tharu village walk / park HQ visit":
    "Kathmandu - Nepalgunj (Flug ca. 1 Std.) - Thakurdwara (Fahrt ca. 2,5–3 Std., ca. 95 km); Gang durchs Tharu-Dorf / Besuch der Parkverwaltung",
  "Full-day guided jungle walk / tiger tracking along Karnali riverbanks and grassland machans (watchtowers)":
    "Ganztägige geführte Dschungelwanderung / Tigerpirsch an den Ufern des Karnali und auf Machans (Beobachtungstürmen) im Grasland",
  "Full-day jeep safari; Karnali river boat/canoe trip for Gangetic dolphin and gharial":
    "Ganztägige Jeepsafari; Boots-/Kanufahrt auf dem Karnali zu Gangesdelfinen und Gavialen",
  "Early birding walk - Nepalgunj (drive) - Kathmandu (flight)":
    "Frühe Vogelwanderung - Nepalgunj (Fahrt) - Kathmandu (Flug)",
  "Kathmandu - Paro (flight ~1 h-1 h 20 min) - Thimphu (drive ~1-1.5 h)":
    "Kathmandu - Paro (Flug ca. 1 Std.–1 Std. 20 Min.) - Thimphu (Fahrt ca. 1–1,5 Std.)",
  "Thimphu sightseeing (Buddha Dordenma, National Memorial Chorten, Tashichho Dzong) - Dochula Pass (108 chortens) - Punakha":
    "Besichtigungen in Thimphu (Buddha Dordenma, National Memorial Chorten, Tashichho Dzong) - Dochula-Pass (108 Chörten) - Punakha",
  "Punakha Dzong, suspension bridge, Chimi Lhakhang - drive to Paro":
    "Punakha Dzong, Hängebrücke, Chimi Lhakhang - Fahrt nach Paro",
  "Hike to Paro Taktsang (Tiger's Nest); Rinpung Dzong / National Museum":
    "Wanderung zum Paro Taktsang (Tigernest); Rinpung Dzong / Nationalmuseum",
  "Paro - Kathmandu (flight)": "Paro - Kathmandu (Flug)",
  "Kathmandu - Araniko Highway - The Last Resort (100 km, ~3-4 h) - 160 m bungee and/or canyon swing from the suspension bridge over the Bhote Koshi - return to Kathmandu or stay overnight":
    "Kathmandu - Araniko Highway - The Last Resort (100 km, ca. 3–4 Std.) - 160-m-Bungee und/oder Canyon Swing von der Hängebrücke über dem Bhote Koshi - zurück nach Kathmandu oder Übernachtung",
  "Kathmandu - Bharatpur (flight, ~25-30 min) or road (~5-7 h) - Sauraha; Tharu village walk, Rapti riverside sunset, Tharu stick dance":
    "Kathmandu - Bharatpur (Flug, ca. 25–30 Min.) oder Straße (ca. 5–7 Std.) - Sauraha; Gang durchs Tharu-Dorf, Sonnenuntergang am Rapti, Stocktanz der Tharu",
  "Dawn dugout canoe on the Rapti - guided jungle walk - Elephant Breeding Centre - afternoon jeep safari":
    "Einbaum auf dem Rapti im Morgengrauen - geführte Dschungelwanderung - Elefanten-Aufzuchtstation - Jeepsafari am Nachmittag",
  "Optional early birding walk - Bharatpur - Kathmandu (flight) or drive to Pokhara / Lumbini":
    "Auf Wunsch frühe Vogelwanderung - Bharatpur - Kathmandu (Flug) oder Fahrt nach Pokhara / Lumbini",
  "Kathmandu - Lukla (refuel) - Pheriche (load shuttle) - overflight of Everest Base Camp - Kala Patthar landing - Hotel Everest View, Syangboche (breakfast) - Lukla - Kathmandu":
    "Kathmandu - Lukla (Tanken) - Pheriche (Pendelflug) - Überflug des Everest Base Camp - Landung am Kala Patthar - Hotel Everest View, Syangboche (Frühstück) - Lukla - Kathmandu",
  "Kathmandu Durbar Square (Hanuman Dhoka) - Swayambhunath - Pashupatinath - Boudhanath":
    "Durbar-Platz von Kathmandu (Hanuman Dhoka) - Swayambhunath - Pashupatinath - Boudhanath",
  "Patan Durbar Square (incl. Patan Museum) - Bhaktapur old city & Durbar Square - Changu Narayan":
    "Durbar-Platz von Patan (mit Patan-Museum) - Altstadt und Durbar-Platz von Bhaktapur - Changu Narayan",
  "Kathmandu - Bhairahawa (Gautam Buddha International Airport, domestic flight) - Lumbini (~22 km); evening at the Sacred Garden":
    "Kathmandu - Bhairahawa (Gautam Buddha International Airport, Inlandsflug) - Lumbini (ca. 22 km); Abend im Heiligen Garten",
  "Maya Devi Temple, marker stone, Ashoka Pillar and Puskarini pond in the Sacred Garden; East and West Monastic Zones; World Peace Pagoda":
    "Maya-Devi-Tempel, Markierungsstein, Ashoka-Säule und Teich Puskarini im Heiligen Garten; östliche und westliche Klosterzone; Weltfriedenspagode",
  "Optional Tilaurakot / Kapilavastu - Bhairahawa - Kathmandu (flight)":
    "Auf Wunsch Tilaurakot / Kapilavastu - Bhairahawa - Kathmandu (Flug)",
  "Kathmandu - Budhanilkantha (transfer) - ride through Shivapuri Nagarjun National Park - Mulkharka - Chisapani":
    "Kathmandu - Budhanilkantha (Transfer) - Fahrt durch den Shivapuri-Nagarjun-Nationalpark - Mulkharka - Chisapani",
  "Chisapani - Nagarkot along the northern/eastern rim, off-road trails and villages":
    "Chisapani - Nagarkot am nördlichen/östlichen Talrand, auf Geländewegen und durch Dörfer",
  "Nagarkot - Nala - Dhulikhel - Namobuddha (~70% off-road)":
    "Nagarkot - Nala - Dhulikhel - Namobuddha (ca. 70 % abseits der Straße)",
  "Namobuddha - Panauti - Lakuri Bhanjyang forest ridge":
    "Namobuddha - Panauti - Waldkamm Lakuri Bhanjyang",
  "Lakuri Bhanjyang - ridge single track - Godawari - transfer to Kathmandu":
    "Lakuri Bhanjyang - Singletrail auf dem Kamm - Godawari - Transfer nach Kathmandu",
  "Arrive Kathmandu (Tribhuvan International Airport) - hotel":
    "Ankunft in Kathmandu (Tribhuvan International Airport) - Hotel",
  "Kathmandu Valley UNESCO sites: Kathmandu Durbar Square, Swayambhunath, Pashupatinath, Boudhanath":
    "UNESCO-Stätten im Kathmandu-Tal: Durbar-Platz von Kathmandu, Swayambhunath, Pashupatinath, Boudhanath",
  "Patan Durbar Square - Bhaktapur - drive to Nagarkot for sunset":
    "Durbar-Platz von Patan - Bhaktapur - Fahrt nach Nagarkot zum Sonnenuntergang",
  "Nagarkot Himalayan sunrise - drive to Chitwan (Sauraha)":
    "Sonnenaufgang über dem Himalaya in Nagarkot - Fahrt nach Chitwan (Sauraha)",
  "Chitwan National Park: canoe on the Rapti, jungle walk, jeep safari, Tharu village":
    "Chitwan-Nationalpark: Kanu auf dem Rapti, Dschungelwanderung, Jeepsafari, Tharu-Dorf",
  "Drive Chitwan - Pokhara (~5-6 h)": "Fahrt Chitwan - Pokhara (ca. 5–6 Std.)",
  "Sarangkot sunrise - Phewa Lake and Tal Barahi - World Peace Pagoda - Davis Falls, Gupteshwor Cave, International Mountain Museum":
    "Sonnenaufgang in Sarangkot - Phewa-See und Tal Barahi - Weltfriedenspagode - Davis Falls, Gupteshwor-Höhle, International Mountain Museum",
  "Drive Pokhara - Bandipur (~2 h); explore the Newar hill bazaar":
    "Fahrt Pokhara - Bandipur (ca. 2 Std.); den Newar-Bergbasar erkunden",
  "Bandipur sunrise - drive to Kathmandu (~5 h)":
    "Sonnenaufgang in Bandipur - Fahrt nach Kathmandu (ca. 5 Std.)",
  "Kathmandu - drive to Trishuli put-in (around Charaudi/Galchhi, ~3 h) - raft grade 3+ rapids - riverside camp":
    "Kathmandu - Fahrt zur Einstiegsstelle am Trishuli (bei Charaudi/Galchhi, ca. 3 Std.) - Rafting über Stromschnellen der Klasse 3+ - Lager am Fluss",
  "Raft to take-out near Mugling/Kurintar - drive to Kathmandu, Pokhara or Chitwan":
    "Rafting bis zur Ausstiegsstelle bei Mugling/Kurintar - Fahrt nach Kathmandu, Pokhara oder Chitwan",
  "Pre-dawn drive to Sarangkot for sunrise - Phewa Lake boat to Tal Barahi island temple - boat to south shore and hike to World Peace Pagoda - Davis (Devi's) Falls - Gupteshwor Mahadev Cave":
    "Fahrt vor Sonnenaufgang nach Sarangkot - mit dem Boot über den Phewa-See zum Inseltempel Tal Barahi - mit dem Boot ans Südufer und Wanderung zur Weltfriedenspagode - Davis (Devi's) Falls - Gupteshwor-Mahadev-Höhle",
  "International Mountain Museum - Seti River Gorge - Bindhyabasini Temple - Old Bazaar - Begnas Lake (optional)":
    "International Mountain Museum - Schlucht des Seti - Bindhyabasini-Tempel - Alter Basar - Begnas-See (auf Wunsch)",
  "Hotel pick-up - jeep to launch ridge (Toripani / Sarangkot) - briefing and harness - tandem flight over Pokhara valley and Phewa Lake - land at Khapaudi - transfer to hotel":
    "Abholung am Hotel - Jeep zum Startkamm (Toripani / Sarangkot) - Einweisung und Gurt - Tandemflug über das Tal von Pokhara und den Phewa-See - Landung in Khapaudi - Transfer zum Hotel",
  "Kathmandu: Tibet group visa formalities and briefing":
    "Kathmandu: Formalitäten für das Tibet-Gruppenvisum und Einweisung",
  "Kathmandu - Lhasa Gonggar (flight ~1 h 20 min) - Lhasa; rest for acclimatization":
    "Kathmandu - Lhasa Gonggar (Flug ca. 1 Std. 20 Min.) - Lhasa; Ruhe zur Akklimatisierung",
  "Potala Palace, Jokhang Temple, Barkhor": "Potala-Palast, Jokhang-Tempel, Barkhor",
  "Drepung and Sera monasteries": "Klöster Drepung und Sera",
  "Day trip to Yamdrok Lake (~4,441 m) or Namtso, or further Lhasa sights":
    "Tagesausflug zum Yamdrok-See (ca. 4.441 m) oder Namtso oder weitere Sehenswürdigkeiten in Lhasa",
  "Lhasa - Kathmandu (flight)": "Lhasa - Kathmandu (Flug)",
};

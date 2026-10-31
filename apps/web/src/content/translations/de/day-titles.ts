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
};

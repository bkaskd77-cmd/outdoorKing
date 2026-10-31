const expeditionArrival =
  "Ankunft in Kathmandu und Transfer zu deinem Hotel. In den ersten Tagen nimmst du am Expeditions-Briefing im Department of Tourism teil, holst die Besteigungsgenehmigung ab und prüfst mit deinem Expeditionsleiter jedes Ausrüstungsteil; es bleibt Zeit, Fehlendes zu kaufen oder zu leihen.";
const khumbuApproach =
  "Der Anmarsch folgt dem klassischen Everest-Weg: der Flug nach Lukla, dann Phakding, Namche Bazaar mit Ruhetag, Tengboche und Dingboche mit einem zweiten Ruhetag und weiter über Lobuche und Gorak Shep zum Basislager. Das langsame Tempo ist der Beginn deiner Akklimatisierung.";
const icefallDays =
  "Im Basislager hält das Sherpa-Team eine Puja, eine buddhistische Zeremonie, die den Berg um sicheren Durchgang bittet. Dann folgen Übungstage an Leitern, Fixseilen und Sauerstoffausrüstung, bevor du den Khumbu-Eisbruch zum ersten Mal vorsichtig durchquerst.";
const trekOutKhumbu =
  "Das Basislager wird geräumt und jeder Müll abgemeldet, dann wandert das Team über Pheriche und Namche Bazaar hinunter nach Lukla. Manche Bergsteiger nehmen stattdessen einen Hubschrauber.";
const flyHome =
  "Der Flug zurück nach Kathmandu, dann die Formalitäten für die Gipfelurkunde im Department of Tourism, eine Feier mit dem Team und deine Heimreise.";

/** German day descriptions for the expeditions, keyed like the English. */
export const expeditionsDe: Record<string, Record<string, string>> = {
  "ama-dablam-expedition": {
    "1": "Ankunft in Kathmandu und Transfer zu deinem Hotel. Dein Expeditionsleiter prüft deine Ausrüstung und beginnt mit den Papieren für die Genehmigung.",
    "2": "Expeditions-Briefing und Abholung der Genehmigung im Department of Tourism, mit Zeit für letzte Einkäufe in Thamel.",
    "3": "Ein früher Flug zur kurzen, steilen Piste von Lukla, in den vollsten Monaten ab Manthali, dann eine sanfte Wanderung am Dudh Kosi entlang nach Phakding.",
    "4": "Am Dudh Kosi entlang, bei Monjo in den Sagarmatha-Nationalpark und über die hohe Hillary-Brücke, dann der lange Aufstieg nach Namche Bazaar.",
    "5": "Eine Akklimatisierungswanderung zur Terrasse des Hotel Everest View und nach Khumjung, mit dem ersten nahen Blick auf die Ama Dablam, dann zurück nach Namche.",
    "6": "Der Höhenweg mit der Ama Dablam vor dir, dann ein Aufstieg durch den Wald nach Tengboche und seinem Kloster oder weiter nach Deboche.",
    "7": "Ein kurzer Weg nach Pangboche unter der Westwand der Ama Dablam, mit dem ältesten Kloster des Khumbu und Heimat vieler Kletter-Sherpas.",
    "8": "Die Route verlässt den Everest-Weg, quert den Imja Khola und steigt zur grasigen Wiese des Basislagers auf etwa 4.600 m, gegenüber von Everest, Lhotse und Nuptse. Das Team hält eine Puja-Zeremonie.",
    "9-12":
      "Übungen an den Fixseilen nahe dem Basislager, dann die erste Rotation: hinauf zum Yak Camp oder vorgeschobenen Basislager (etwa 5.200 m) und kurz bis Lager 1 (etwa 5.700 m) auf dem Granitgrat, bevor du zum Ausruhen ins Basislager zurückkehrst.",
    "13-16":
      "Die zweite Rotation: eine Nacht in Lager 1, dann an Fixseilen den steilen Yellow Tower hinauf, kurz bis Lager 2, einem engen Absatz am Grat, und zurück ins Basislager.",
    "17-22":
      "Nach Ruhetagen im Basislager wartet das Team auf ein Gipfelfenster. Du steigst wieder durch Lager 1 und 2, dann über den Mushroom Ridge und die Schneerinnen der oberen Wand zum Gipfel (6.812 m), bevor du zu den unteren Lagern absteigst.",
    "23-24":
      "Das Basislager wird geräumt, und du wanderst über Pangboche und Namche Bazaar hinunter nach Lukla.",
    "25": "Der Flug zurück nach Kathmandu, mit einem Reservetag für das Wetter vor deiner Heimreise.",
  },
  "annapurna-i-expedition": {
    "1": expeditionArrival,
    "2": "Ein Tag mit Briefings, Formalitäten für die Genehmigung und Ausrüstungscheck in Kathmandu.",
    "3": "Ein kurzer Flug nach Pokhara am Phewa-See unter den Annapurnas.",
    "4": "Eine Fahrt durch das Kali-Gandaki-Tal nach Dana, einem Dorf unter der Nordseite der Annapurna.",
    "5": "Ein Hubschrauberflug von Dana zum Basislager der Annapurna I (etwa 4.190 m) auf der Nordseite. Bei der Ankunft hält das Sherpa-Team eine Puja-Zeremonie.",
    "6-29":
      "Wochen der Akklimatisierung und Rotationen zwischen Basislager, Lager I und Lager II, um Kraft aufzubauen und die Route durch kombiniertes Gletschergelände zu versichern. Jeder Schritt am Berg richtet sich nach den Verhältnissen, da Teile der Route Lawinen und Séracabbrüchen ausgesetzt sind.",
    "30-37":
      "Wenn die Prognose ein Gipfelfenster öffnet, steigt das Team durch Lager II und Lager III zu Lager IV (etwa 7.400 m) und bricht in der Nacht zum Gipfel der Annapurna I (8.091 m) auf, bevor es zu den unteren Lagern absteigt.",
    "38": "Ein Hubschrauberflug vom Basislager zurück nach Dana.",
    "39": "Eine Fahrt nach Pokhara und ein Flug nach Kathmandu.",
    "40-41": "Reservetage in Kathmandu für Wetter, Erholung und deine Heimreise.",
  },
  "cho-oyu-expedition": {
    "1-4":
      "Ankunft in Kathmandu für Briefings und Ausrüstungschecks, während die Papiere für die Route der Saison fertiggestellt werden: Tibet-Visum und Genehmigungen, wenn die Nordroute offen ist, oder die Genehmigung des Department of Tourism für eine Besteigung von Nepal aus.",
    "5-8":
      "Wenn die Tibet-Route offen ist, fährt das Team über Timure und Kerung (Kyirong, etwa 2.700 m) nach Norden bis Tingri (etwa 4.300 m) auf dem tibetischen Hochland, mit Ruhetagen unterwegs zum Akklimatisieren.",
    "9-12":
      "Eine Fahrt zum chinesischen Basislager (etwa 5.100 m), dann mit Yaks über das Middle Camp zum vorgeschobenen Basislager (etwa 5.700 m) auf dem Gyabrag-Gletscher, dem Zuhause des Teams für die nächsten Wochen.",
    "13-35":
      "Rotationen vom vorgeschobenen Basislager zu Lager 1 am Fuß des Nordwestgrats (etwa 6.400 m), Lager 2 (etwa 7.100 m) und für manche zu einem Hochlager unter dem Gelben Band, mit Erholung im vorgeschobenen Basislager zwischen den Aufstiegen.",
    "36-40":
      "In einem Wetterfenster führt der Gipfelvorstoß durch das Gelbe Band zum breiten Gipfelplateau des Cho Oyu (8.188 m) und zurück zum vorgeschobenen Basislager. Dann packt das Team zusammen und fährt zurück nach Kathmandu, mit Reservetagen für das Wetter.",
    "Nepal-side (not a standard commercial itinerary)":
      "Eine Besteigung von Nepal aus nähert sich von Lukla über Namche und das Gokyo- oder Thame-Tal dem Nangpa La und steigt dann durch die Südwestwand von einem Basislager in Nepal. Es ist eine schwierigere, selten begangene Route, die wir nur auf Anfrage mit erfahrenen Bergsteigern planen.",
  },
  "dhaulagiri-expedition": {
    "1": expeditionArrival,
    "2": "Ein Tag mit Briefings, Formalitäten für die Genehmigung und Ausrüstungscheck in Kathmandu.",
    "3": "Ein kurzer Flug nach Pokhara am Phewa-See unter den Annapurnas.",
    "4": "Eine lange Fahrt über Beni und die Schlucht des Kali Gandaki hinauf nach Marpha, einem Thakali-Dorf mit weiß getünchten Häusern und Apfelgärten.",
    "5": "Ein Akklimatisierungstag in Marpha mit einer Wanderung über dem Dorf oder einem Ausflug nach Muktinath.",
    "6": "Ein steiler Aufstieg aus dem Tal zum Lager in Yak Kharka (etwa 3.680 m).",
    "7": "Über den Dhampus-Pass (etwa 5.244 m) ins Hidden Valley, ein hohes, leeres Tal, umringt von Gipfeln, wo das Team zeltet.",
    "8": "Über den French Pass (etwa 5.360 m) mit der gewaltigen Nordwand des Dhaulagiri vor dir und hinunter zum Dhaulagiri-Basislager (etwa 4.750 m) auf dem Gletscher.",
    "9-27":
      "Die Puja-Zeremonie, dann Wochen der Rotationen: den Gletscher und Eisbruch hinauf zu Lager I (etwa 5.900 m), weiter zu Lager II (etwa 6.500 m) und kurz bis Lager III, mit Rückkehr ins Basislager zur Erholung.",
    "28-34":
      "In einem Wetterfenster steigt das Team durch Lager II zu Lager III (etwa 7.300 m) am windausgesetzten Nordostgrat und bricht in der Nacht zum Gipfel des Dhaulagiri I (8.167 m) auf, bevor es absteigt.",
    "35": "Zurück über French Pass und Dhampus-Pass nach Yak Kharka.",
    "36": "Hinunter nach Marpha und zum Komfort einer Lodge.",
    "37": "Eine Fahrt den Kali Gandaki hinunter nach Pokhara oder ein Flug ab Jomsom.",
    "38-40":
      "Zurück nach Kathmandu, mit Reservetagen für das Wetter und deine Heimreise.",
  },
  "everest-expedition-south-col": {
    "1-2": expeditionArrival,
    "3-11": khumbuApproach,
    "12-15": `${icefallDays} Viele Teams besteigen zur Akklimatisierung auch den Lobuche East (6.119 m).`,
    "16-27":
      "Akklimatisierungsrotationen durch den Khumbu-Eisbruch zu Lager 1 (etwa 6.065 m), das Western Cwm hinauf zu Lager 2 (etwa 6.400 m) und in die Lhotse-Flanke zu Lager 3 (etwa 7.160 m), mit Rückkehr ins Basislager nach jeder Rotation zur Erholung.",
    "28-33":
      "Erholung im Basislager oder tiefer im Tal, wo die dichtere Luft die Regeneration fördert, während das Team die Prognose auf ein Gipfelfenster beobachtet.",
    "34-45":
      "Der Gipfelvorstoß, meist Mitte bis Ende Mai: vom Basislager zu Lager 2, dann mit Sauerstoff zu Lager 3 und zum Südsattel (Lager 4, etwa 7.950 m). Ein nächtlicher Start folgt dem Südostgrat über den Südgipfel und den Hillary Step zum Gipfel des Everest (8.849 m), bevor der lange Abstieg beginnt.",
    "46-55": trekOutKhumbu,
    "56-60": flyHome,
  },
  "himlung-himal-expedition": {
    "1-2": expeditionArrival,
    "3-4":
      "Eine lange Fahrt nach Westen und das Marsyangdi-Tal hinauf über Besisahar nach Koto an der Annapurna-Runde, wo das Sperrgebiet Nar Phu beginnt.",
    "5-8":
      "Der Trek biegt nach Norden in die enge Schlucht des Phu Khola ab, steigt zur Hochfläche von Meta und durch Kani-Torbögen vorbei an Kyang nach Phu, einem mittelalterlichen Dorf aus Steinhäusern.",
    "9": "Ein Akklimatisierungstag in Phu mit einem Besuch im Kloster Tashi Lhakhang.",
    "10": "Ein Aufstieg über Phu zum Himlung-Basislager (etwa 4.900 m), dem Zuhause des Teams für die Besteigung.",
    "11-22":
      "Die Puja-Zeremonie und Übungen, dann Rotationen zu Lager I (etwa 5.450 m), Lager II (etwa 6.000 m) und Lager III (etwa 6.350 m) über Gletscher und Schneehänge, mit Fixseilen an den steileren Abschnitten. In einem Wetterfenster erreicht der Gipfelvorstoß den höchsten Punkt des Himlung Himal (7.126 m) an der Grenze zu Tibet.",
    "23-26":
      "Hinunter nach Phu und durch die Schlucht hinaus nach Koto, dann die Fahrt zurück nach Kathmandu.",
    "27-30":
      "Reservetage für das Wetter am Berg oder für Erholung und Besichtigungen in Kathmandu.",
  },
  "kanchenjunga-expedition": {
    "1-2": `${expeditionArrival} Auch die Genehmigung für das Sperrgebiet wird in Kathmandu ausgestellt.`,
    "3": "Ein Flug nach Osten nach Bhadrapur, dann eine Fahrt in die Hügel nach Phidim.",
    "4-5":
      "Eine lange Fahrt nach Yamphudin am Kontrollposten des Sperrgebiets, mit einem Ruhetag zur Erholung von der Straße.",
    "6-7":
      "Der Trek folgt dem südlichen Weg durch den Wald vorbei an Tortong nach Tseram (Cheram).",
    "8-9":
      "Akklimatisierungstage in Tseram mit Wanderungen Richtung Ramche und zum Aussichtspunkt Oktang über dem Yalung-Gletscher.",
    "10": "Das Team zieht zum Yalung-Basislager (etwa 5.475 m) unter der Südwestwand, per Hubschrauber oder zu Fuß über die Gletschermoräne.",
    "11-35":
      "Die Puja-Zeremonie, dann Wochen der Rotationen in der Südwestwand: Lager 1 (etwa 6.200 m), Lager 2 (etwa 6.400 m) und Lager 3 (etwa 7.100 m), über Gletscher, Séracgelände und steilen Schnee, mit Rückkehr ins Basislager zwischen den Aufstiegen.",
    "36-45":
      "In einem Wetterfenster steigt der Gipfelvorstoß zu Lager 4 (etwa 7.550 m) und weiter zum Gipfel des Kanchenjunga (8.586 m). Wie die Erstbesteiger bleiben viele Bergsteiger aus Respekt vor dem örtlichen Glauben kurz unter dem höchsten Punkt stehen. Dann steigt das Team ins Basislager ab.",
    "46-48":
      "Das Team verlässt das Basislager per Hubschrauber oder zu Fuß, fährt zurück nach Bhadrapur und fliegt nach Kathmandu.",
    "49-50": "Ein Reservetag in Kathmandu und deine Heimreise.",
  },
  "lhotse-expedition": {
    "1-2": expeditionArrival,
    "3-9": khumbuApproach,
    "10-15": `${icefallDays} Der erste Aufstieg durch den Eisbruch erreicht Lager 1 (etwa 6.065 m).`,
    "16-39":
      "Rotationen das Western Cwm hinauf zu Lager 2 und in die Lhotse-Flanke zu Lager 3, mit Rückkehr ins Basislager zur Erholung, dann Ruhe, während das Team auf ein Gipfelfenster wartet.",
    "40-53":
      "Der Gipfelvorstoß, meist Mitte bis Ende Mai: vom Basislager zu Lager 2, dann mit Sauerstoff zu Lager 3 und Lager 4 nahe dem Genfer Sporn (etwa 7.850 m). Ein nächtlicher Start führt durch das schmale Lhotse-Couloir zum Gipfel (8.516 m), bevor es zurück zu Lager 2 und ins Basislager geht.",
    "54-58": trekOutKhumbu,
    "59-60": flyHome,
  },
  "makalu-expedition": {
    "1-2": expeditionArrival,
    "3": "Ein Flug nach Osten nach Tumlingtar im Arun-Tal, dann eine holprige Jeepfahrt über Khandbari nach Num.",
    "4-5":
      "Hinunter zum Arun und hinauf nach Seduwa, dann weiter nach Tashigaon, dem letzten dauerhaft bewohnten Dorf.",
    "6-7":
      "Ein Ruhetag in Tashigaon, dann der steile Aufstieg durch den Wald nach Khongma Danda (etwa 3.500 m).",
    "8-10":
      "Die hohe Querung über Shipton La und Keke La, vorbei an gefrorenen Seen, dann hinunter ins Barun-Tal über Dobato und Yangle Kharka nach Langmale Kharka.",
    "11-14":
      "Ein Weg den Barun-Gletscher hinauf zum unteren Basislager (etwa 4.900 m), ein Ruhetag, dann der Umzug ins vorgeschobene Basislager (etwa 5.650 m), das Zuhause des Teams für die Besteigung.",
    "15-30":
      "Die Puja-Zeremonie, dann Rotationen zu Lager 1 (etwa 6.200 m), Lager 2 und Richtung Makalu La, mit Rückkehr ins vorgeschobene Basislager zur Erholung.",
    "31-42":
      "In einem Wetterfenster steigt das Team zu Lager 3 nahe dem Makalu La und Lager 4 am Nordgrat, dann durch das French Couloir und über den ausgesetzten Gipfelgrat zum höchsten Punkt des Makalu (8.485 m), bevor es absteigt.",
    "43-49":
      "Die Lager werden geräumt, und das Team wandert durch das Barun-Tal, über die Pässe und hinunter nach Num, fährt dann nach Tumlingtar und fliegt nach Kathmandu. Manche Bergsteiger fliegen per Hubschrauber aus.",
    "50": "Ein Reservetag und deine Heimreise.",
  },
  "manaslu-expedition": {
    "1-2": expeditionArrival,
    "3": "Ein Hubschrauberflug von Kathmandu nach Samagaon (etwa 3.500 m), dem Hauptort des Nubri-Tals, unter dem Manaslu.",
    "4-7":
      "Akklimatisierungstage rund um Samagaon mit Wanderungen nach Pungyen Gompa, zum Birendra Tal und auf die Kämme über dem Dorf.",
    "8": "Ein Aufstieg von Samagaon zum Manaslu-Basislager (etwa 4.800 m) neben dem Gletscher.",
    "9-21":
      "Die Puja-Zeremonie, dann Rotationen zu Lager 1 (etwa 5.600 m), Lager 2 (etwa 6.300 m) und Lager 3 (etwa 6.800 m), durch spaltenreichen Gletscher und an Fixseilen durch die Eisabbrüche über Lager 2, mit Rückkehr ins Basislager zur Erholung.",
    "22-32":
      "In einem Wetterfenster steigt das Team zu Lager 4 (etwa 7.400 m) und weiter über den ausgesetzten, überwechteten Grat zum eigentlichen Gipfel des Manaslu (8.163 m), dann hinunter ins Basislager.",
    "33-37":
      "Hinunter nach Samagaon und per Hubschrauber hinaus, oder zu Fuß den Budhi Gandaki hinunter nach Soti Khola und mit dem Auto nach Kathmandu.",
    "38": "Abreisetag. Wir bringen dich zum Flughafen für deinen Heimflug.",
  },
};

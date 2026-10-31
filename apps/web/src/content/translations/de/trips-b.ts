import type { TripTranslation } from "../types";
import { luklaNote } from "./trips-a";

/** German trip pages, E to K. */
export const tripsDeB: Record<string, TripTranslation> = {
  "everest-helicopter-tour": {
    title: "Everest-Hubschraubertour",
    subtitle: "Der Everest aus der Nähe an einem Vormittag, mit Frühstück in Syangboche",
    overview: `Der Everest an einem einzigen Vormittag. Der Hubschrauber startet im ersten Licht in Kathmandu und fliegt am Himalaya entlang in den Khumbu, über Lukla, Namche Bazaar und Tengboche bis zum Everest Base Camp und zum Khumbu-Gletscher.
Wenn Wetter und Vorschriften es erlauben, landest du am Kala Patthar gegenüber dem Everest für ein paar Minuten Fotos. Auf dem Rückweg frühstückst du auf der Terrasse in Syangboche mit Blick auf Everest, Lhotse und Ama Dablam und bist vor dem Mittagessen zurück in Kathmandu.
Fitness brauchst du nicht, aber die Höhe steigt sehr schnell, deshalb bleibt die Zeit über 5.000 m kurz. Wenn du Herz- oder Lungenerkrankungen hast, sprich bitte vor der Buchung mit deiner Ärztin oder deinem Arzt.`,
    highlights: [
      "Nahe Blicke aus der Luft auf Everest, Lhotse, Nuptse, Ama Dablam und den Khumbu-Eisbruch",
      "Überflug von Everest Base Camp und Khumbu-Gletscher",
      "Landung am Kala Patthar gegenüber dem Everest (wenn erlaubt)",
      "Frühstück im Hotel Everest View mit Everest-Panorama",
      "Der ganze Everest an einem Vormittag",
    ],
    contingency:
      "Die Luftfahrtbehörde CAAN stellte fest, dass nur die Bundesregierung den Luftraum regelt. Der Park nahm seine Anordnung zurück; ein Treffen der Beteiligten am 24. Januar 2025 erlaubte Rettungsflüge, Bergflüge mit kurzen Landungen unter 4.300 m und Expeditionsfracht bis Pangboche. Die Gemeinde verhängte am 28. April 2025 erneut ein Verbot kommerzieller Flüge oberhalb von Lukla (außer Rettung, Fracht und Bergflügen). Wir prüfen den aktuellen Stand vor jeder Buchung.",
    acclimatizationNotes:
      "Keine Akklimatisierung; die Zeit über 5.000 m bleibt auf wenige Minuten begrenzt.",
  },
  "everest-three-passes-trek": {
    title: "Everest Drei-Pässe-Trek",
    subtitle: "Kongma La, Cho La und Renjo La: die große Hochrunde des Khumbu",
    overview: `Die vollständigste Reise in der Everest-Region: eine hohe Runde über drei Pässe über 5.300 m, Kongma La, Cho La und Renjo La, mit Everest Base Camp, Kala Patthar, den Gokyo-Seen und Gokyo Ri unterwegs.
Jeder Pass hat seinen eigenen Charakter. Der Kongma La ist der längste und höchste Tag, der Cho La quert einen kleinen Gletscher mit steilem Abstieg, bei dem leichte Grödel helfen, und der Renjo La bietet einen der schönsten Blicke auf den Everest und die Gokyo-Seen. Der Rückweg folgt dem ruhigen Bhote-Koshi-Tal durch Thame, das Heimatdorf vieler Everest-Sherpas.
Dieser Trek ist für erfahrene Wanderer, die schon in der Höhe waren. Die Route ist auf langsame Akklimatisierung ausgelegt, mit kurzen Tagen und Ruhetagen vor jedem Pass.`,
    highlights: [
      "Drei hohe Pässe: Kongma La, Cho La, Renjo La",
      "Everest Base Camp und Kala Patthar",
      "Die Gokyo-Seen und Gokyo Ri",
      "Querung des Ngozumpa-Gletschers",
      "Das ruhige Bhote-Koshi-Tal und das Dorf Thame auf dem Rückweg",
    ],
    contingency: `${luklaNote} Sehr einfache Lodges in Dzongla, Thagnak (Dragnag) und Lungden. Am Tag über den Kongma La gibt es zwischen Chhukung und Lobuche keine Lodge.`,
    acclimatizationNotes:
      "Der kurze Tag nach Chhukung hilft zusätzlich vor dem Kongma La.",
  },
  "everest-view-trek": {
    title: "Everest View Trek",
    subtitle: "Eine kurze Wanderung nach Namche und Tengboche mit dem Everest im Blick",
    overview: `Ein kurzer Trek in die Everest-Region für alle mit wenig Zeit oder die Bergblicke ohne große Höhe möchten. Schon der Flug nach Lukla ist ein Abenteuer; von dort folgt der Weg dem Dudh Kosi nach Namche Bazaar, dem lebhaften Handelsort der Sherpa.
Ein Akklimatisierungstag führt dich hinauf zur Terrasse des Hotel Everest View (etwa 3.880 m) und in die Dörfer Khumjung und Khunde, mit Everest, Lhotse und Ama Dablam im Blick. Dann wanderst du nach Tengboche, dem wichtigsten Kloster der Region, und zurück nach Lukla.
Die Tage dauern vier bis sieben Stunden, der Aufstieg nach Namche ist der steilste Teil. Der Trek passt für fitte Einsteiger und Familien und hat einen Reservetag für das Wetter in Lukla.`,
    highlights: [
      "Erste Blicke auf Everest, Lhotse, Ama Dablam und Thamserku",
      "Die Terrasse des Hotel Everest View auf etwa 3.880 m",
      "Namche Bazaar und das Sherpa-Museum",
      "Das Dorf Khumjung und sein Kloster",
      "Das Kloster Tengboche",
    ],
    contingency: `${luklaNote} Komfortablere Lodges gibt es in Phakding, Namche und bei Syangboche.`,
    acclimatizationNotes:
      "Kurzer Teehaus-Trek unter etwa 3.900 m; 4–7 Stunden Gehzeit am Tag. Der Aufstieg von Phakding nach Namche ist der steilste Abschnitt. Geeignet für fitte Trekking-Einsteiger.",
  },
  "ghorepani-poon-hill-trek": {
    title: "Ghorepani-Poon-Hill-Trek",
    subtitle: "Rhododendronwald und Sonnenaufgang über Dhaulagiri und Annapurna",
    overview: `Ein kurzer, wunderschöner Trek in den Vorbergen der Annapurna, ideal für Familien und Einsteiger oder als Ergänzung zu einer Nepal-Rundreise. Der Weg steigt über Steintreppen durch Magar- und Gurung-Dörfer und Wälder aus Rhododendron und Eichen, die im Frühjahr rot und rosa blühen.
Höhepunkt ist der Sonnenaufgang vom Poon Hill (3.210 m), wenn Dhaulagiri, Annapurna South und Machhapuchhre nacheinander aufleuchten. Die Runde führt über Tadapani nach Ghandruk, ein Gurung-Dorf mit Schieferdächern und Terrassenfeldern, und dann zurück nach Pokhara.
Die Höhen bleiben so niedrig, dass die meisten Wanderer keine besondere Akklimatisierung brauchen.`,
    highlights: [
      "Sonnenaufgang vom Poon Hill (3.210 m) über Dhaulagiri (8.167 m), Annapurna South und Machhapuchhre",
      "Rhododendron- und Eichenwald zwischen Ghorepani und Tadapani",
      "Das Gurung-Dorf Ghandruk und sein Kulturmuseum",
      "Das Magar-Dorf Ghorepani auf seinem Bergrücken",
    ],
    contingency: "Teehäuser an jedem Übernachtungsort.",
    acclimatizationNotes: "In diesen Höhen für die meisten Trekkenden nicht nötig.",
  },
  "gokyo-cho-la-everest-base-camp-trek": {
    title: "Gokyo, Cho La und Everest Base Camp",
    subtitle:
      "Die türkisfarbenen Gokyo-Seen, der Cho La und das Everest Base Camp auf einer Reise",
    overview: `Zwei der großen Täler des Khumbu, verbunden durch einen hohen Pass. Zuerst wanderst du zu den türkisfarbenen Gokyo-Seen und steigst auf den Gokyo Ri mit Blick auf Everest, Lhotse, Makalu und Cho Oyu; dann querst du den Ngozumpa-Gletscher und den Cho La (5.420 m) ins Everest-Tal, zum Basislager und zum Sonnenaufgang vom Kala Patthar.
Weil du zuerst nach Gokyo gehst, bist du vor Pass und Basislager gut akklimatisiert. Der Cho La hat einen kurzen Gletscherabschnitt und einen steilen Abstieg, deshalb tragen wir leichte Grödel und wählen den Tag der Überquerung nach dem Wetter.
Als Runde statt Hin- und Rückweg zeigt sie dir viel mehr von der Region als der klassische Base-Camp-Trek.`,
    highlights: [
      "Die Gokyo-Seen und das Panorama vom Gokyo Ri",
      "Der Cho-La-Pass und die Gletscherquerung",
      "Everest Base Camp und Kala Patthar",
      "Der Ngozumpa-Gletscher",
      "Eine Runde statt Hin- und Rückweg",
    ],
    contingency: `${luklaNote} Einfache Lodges in Thagnak und Dzongla.`,
    acclimatizationNotes:
      "Weil du zuerst nach Gokyo gehst, ist der Körper vor Cho La und EBC an etwa 4.800 m gewöhnt.",
  },
  "gokyo-lakes-trek": {
    title: "Trek zu den Gokyo-Seen",
    subtitle:
      "Türkisfarbene Seen, der Ngozumpa-Gletscher und vier Achttausender vom Gokyo Ri",
    overview: `Eine ruhigere Alternative zum Weg zum Everest Base Camp: das Tal des Dudh Kosi hinauf zu den türkisfarbenen Seen von Gokyo neben dem Ngozumpa-Gletscher, einem der längsten im Himalaya.
Von Gokyo aus zeigt ein steiler Morgenaufstieg auf den Gokyo Ri (5.357 m) vier Achttausender auf einmal: Everest, Lhotse, Makalu und Cho Oyu. Viele halten es für die schönste Aussicht im Khumbu.
Die Route führt durch Namche Bazaar und die Dörfer Dole und Machhermo, mit kurzen Tagen, die beim Akklimatisieren helfen, und einem ganzen Tag in Gokyo, um die Seen zu erkunden.`,
    highlights: [
      "Das Panorama vom Gokyo Ri mit vier Achttausendern (Everest, Lhotse, Makalu, Cho Oyu)",
      "Die Kette der türkisfarbenen Gokyo-Seen",
      "Ein ruhigeres Tal als der Hauptweg zum EBC",
      "Namche Bazaar und Khumjung",
    ],
    contingency: `${luklaNote} Die Lodges in Dole, Machhermo und Gokyo sind einfacher als auf dem Weg zum EBC.`,
    acclimatizationNotes:
      "Der kurze Tag nach Machhermo hilft beim Akklimatisieren; am Tag auf den Gokyo Ri gehst du hoch und schläfst wieder tiefer in Gokyo.",
  },
  "helambu-trek": {
    title: "Helambu-Trek",
    subtitle: "Hyolmo-Dörfer und Waldkämme nahe Kathmandu",
    overview: `Ein sanfter Trek, der zu Fuß am Rand von Kathmandu beginnt und durch die Wälder des Shivapuri-Nationalparks in die Hügel von Helambu steigt. Hier leben die Hyolmo, mit Klöstern, Gebetsfahnen und Apfelgärten rund um die Dörfer Tarkeghyang und Sermathang.
Der höchste Punkt ist Tharepati (etwa 3.640 m), und von den Kämmen bei Chisapani und Tharepati reicht der Blick über Langtang, Jugal und Dorje Lakpa.
Mit mäßigen Höhen und ohne Flüge ist er eine gute Wahl für eine kurze Reise, einen ersten Trek oder die ruhigeren Monate.`,
    highlights: [
      "Start zu Fuß am Rand von Kathmandu durch den Shivapuri-Nationalpark",
      "Hyolmo-Dörfer, Klöster und Apfelgärten in Tarkeghyang und Sermathang",
      "Blick auf Langtang, Jugal und Dorje Lakpa von Chisapani und Tharepati",
      "Geringe Höhen, ideal für eine kurze Reise oder einen ersten Trek",
    ],
    contingency:
      "Kein Flug und keine lange Fahrt nötig – der nächstgelegene mehrtägige Himalaya-Trek ab Kathmandu. Kontrollposten des Langtang-Nationalparks auf der Helambu-Seite gibt es in Kutumsang, Mangengoth und Bhotang.",
    acclimatizationNotes:
      "Im Standardplan ist kein eigener Akklimatisierungstag nötig; die 5-Tage-Version steigt an einem Tag etwa 1.400 m.",
  },
  "himlung-himal-expedition": {
    title: "Himlung-Himal-Expedition",
    subtitle: "Ein erster Siebentausender, erreicht durch das verborgene Nar-Phu-Tal",
    overview: `Der Himlung Himal (7.126 m) steht an der Grenze zwischen Nepal und Tibet über dem Nar-Phu-Tal. Er ist einer der besten ersten Siebentausender: technisch unkompliziert, aber hoch und abgelegen genug für eine echte Expedition.
Der Anmarsch folgt der Annapurna-Runde bis Koto und biegt dann ins verborgene Nar-Phu-Tal ab, mit seinen Schluchten, Kani-Torbögen und dem mittelalterlichen Dorf Phu. Vom Basislager führt die Route über Gletscher und Schneehänge durch drei Hochlager, mit Fixseilen an den steileren Abschnitten und spaltenreichem Gelände.
Ideal für Bergsteiger, die schon auf 6.000 m waren und sich auf einen Achttausender vorbereiten möchten.`,
    highlights: [
      "Ein Gipfel auf 7.126 m an der Grenze zwischen Nepal und Tibet",
      "Anmarsch durch das Nar-Phu-Tal und das mittelalterliche Dorf Phu",
      "Ein beliebter Vorbereitungsgipfel vor Achttausender-Expeditionen",
    ],
    contingency:
      "Teehäuser und Lodges auf dem Anmarsch bis Phu; Basislager und Hochlager in Zelten.",
    acclimatizationNotes:
      "Üblich sind ein Ruhetag in Phu, zwei bis drei Tage im Basislager und dann Rotationen vor dem Gipfelvorstoß.",
  },
  "island-peak-climbing": {
    title: "Besteigung des Island Peak",
    subtitle: "Ein erster Himalaya-Gipfel über dem Imja-Tal, nach dem Everest Base Camp",
    overview: `Ein erster Himalaya-Gipfel mit klassischem Anmarsch. Du wanderst den Khumbu hinauf zum Everest Base Camp und auf den Kala Patthar, um dich zu akklimatisieren, und biegst dann ins Imja-Tal zum Island Peak (Imja Tse, 6.165 m) ab, der wie eine Insel in einem Meer aus Eis unter der Südwand des Lhotse aufragt.
Nach einem Übungstag im Basislager mit Steigeisen, Eispickel und Steigklemme quert der Gipfeltag einen Gletscher, steigt an Fixseilen eine steile Schnee- und Eisflanke hinauf und folgt einem kurzen, luftigen Grat zum Gipfel. Ein Reservetag nach dem Gipfel gibt dir eine zweite Chance, falls das Wetter umschlägt.
Das ist eine echte Besteigung: Du brauchst gute Fitness und Schwindelfreiheit, aber keine Bergsteigererfahrung. Dein Bergführer entscheidet am Tag selbst, ob es sicher weitergeht.`,
    highlights: [
      "Der Gipfel des Island Peak (Imja Tse, 6.165 m)",
      "Everest Base Camp und Kala Patthar auf dem Akklimatisierungstrek",
      "Eine steile Schnee- und Eisflanke an Fixseilen, mit Reservetag für das Wetter",
      "Übung mit Steigeisen, Eispickel und Steigklemme im Basislager",
    ],
    contingency: `${luklaNote} Teehäuser auf dem Anmarsch; Zelte im Basislager (und im Hochlager, falls genutzt). Kletter-Sherpas fixieren die Seile an der Flanke.`,
    acclimatizationNotes:
      "Die Runde über EBC und Kala Patthar bringt vor der Besteigung mehrere Nächte auf fast 5.000 m.",
  },
  "kanchenjunga-base-camp-trek": {
    title: "Trek zum Kanchenjunga Base Camp (Runde über Nord- und Südbasislager)",
    subtitle: "Beide Basislager des dritthöchsten Bergs der Welt, im fernen Osten Nepals",
    overview: `Eine lange, abgelegene Reise zu beiden Basislagern des Kanchenjunga, des dritthöchsten Bergs der Welt, im fernen Osten Nepals. Nur wenige Trekkende kommen hierher; der Weg führt durch Limbu- und Rai-Dörfer, Kardamomfelder und Wald, bis er das tibetisch geprägte Dorf Ghunsa erreicht.
Auf der Nordseite steigst du nach Pangpema, zum Nördlichen Basislager (etwa 5.143 m), unter der gewaltigen Nordwand. Ein langer Tag über drei Pässe, Sele La, Sinion La und Mirgin La, bringt dich auf die Südseite und zum Aussichtspunkt Oktang über dem Yalung-Gletscher.
Ein Trek für erfahrene Wanderer, die echte Wildnis suchen. Die Lodges sind einfach, und Akklimatisierungstage in Ghunsa und Khambachen gehören zum Plan.`,
    highlights: [
      "Pangpema, das Nördliche Basislager des Kanchenjunga (etwa 5.143 m)",
      "Der Aussichtspunkt Oktang und der Yalung-Gletscher unter der Südwand",
      "Der Jannu (Kumbhakarna) von Khambachen aus",
      "Die Überquerung von Sele La, Sinion La und Mirgin La",
      "Das tibetisch geprägte Ghunsa und Limbu- und Rai-Dörfer in den unteren Tälern",
      "Wildtiere im Kanchenjunga-Schutzgebiet (Roter Panda, Lebensraum des Schneeleoparden)",
    ],
    contingency:
      "Auf dem größten Teil der Runde gibt es inzwischen einfache Teehäuser; stellenweise oder in der Nebensaison kann Zelten nötig sein.",
    acclimatizationNotes:
      "Bei Reisen ab 22 Tagen sind zwei Akklimatisierungstage vor Lhonak/Pangpema üblich.",
  },
  "kanchenjunga-expedition": {
    title: "Kanchenjunga-Expedition",
    subtitle: "Der dritthöchste Gipfel der Welt, von der Yalung-Seite",
    overview: `Der Kanchenjunga (8.586 m) ist der dritthöchste Berg der Welt und einer der abgelegensten, an Nepals Grenze zu Sikkim. George Band und Joe Brown bestiegen ihn erstmals am 25. Mai 1955 und blieben aus Respekt vor dem örtlichen Glauben kurz unterhalb des Gipfels stehen, eine Tradition, der viele Bergsteiger bis heute folgen.
Der lange Anmarsch quert die Hügel Ostnepals durch Limbu-Dörfer zum Yalung-Gletscher. Die Route durch die Südwestwand führt über Gletscher- und Séracgelände, steilen Schnee und Eis zu einem Hochlager und dann über kombiniertes Gelände zur Gipfelpyramide.
Nur wenige Teams versuchen den Kanchenjunga in jeder Saison; dies ist eine ernste, verbindliche Expedition für erfahrene Achttausender-Bergsteiger.`,
    highlights: [
      "Der dritthöchste Berg der Welt (8.586 m)",
      "Der Yalung-Gletscher und die Südwestwand, die Route der Erstbesteigung 1955",
      "Abgelegenes Ostnepal, mit weit weniger Teams als am Everest",
    ],
    contingency:
      "Lodges bis Tseram; etwa einen Monat im Zeltbasislager auf der Yalung-Moräne. Wer den südlichen Anmarsch ganz zu Fuß geht, zeltet in der Nebensaison oberhalb von Yamphudin teils noch. Keine Gebühr für den Khumbu-Eisbruch (SPCC).",
    acclimatizationNotes:
      "Bei SST reicht die Rotationsphase von Tag 11 bis 35, das Gipfelfenster liegt zwischen Tag 36 und 45. Teams mit Anmarsch zu Fuß gewinnen mit den Tagen in den unteren Tälern zusätzliche Akklimatisierung.",
  },
  "kathmandu-valley-heritage-tour": {
    title: "Kulturerbe-Tour im Kathmandu-Tal",
    subtitle: "Durbar-Plätze, Stupas und Tempel im Kathmandu-Tal",
    overview: `Das Kathmandu-Tal hat sieben Denkmalzonen, die zusammen ein UNESCO-Welterbe bilden, und diese Tour besucht die schönsten davon mit einem privaten Guide.
Du gehst durch die Paläste und Tempel am Durbar-Platz von Kathmandu, steigst hinauf nach Swayambhunath über der Stadt und umrundest die große Stupa von Boudhanath mit Pilgern, die Gebetsmühlen drehen. In Pashupatinath, Nepals heiligstem Hindu-Tempel, siehst du die Ghats am Ufer des Bagmati. In Patan und Bhaktapur, den alten Newar-Städten, findest du mehrstöckige Tempel, geschnitzte Holzfenster und Innenhöfe, in denen Handwerker noch arbeiten.
Die Tour passt an den Anfang oder das Ende eines Treks, das Tempo ist gemütlich.`,
    highlights: [
      "Die Durbar-Plätze von Kathmandu, Patan und Bhaktapur",
      "Die Stupas von Swayambhunath und Boudhanath",
      "Pashupatinath, Nepals heiligster Hindu-Tempel, am Bagmati",
      "Newar-Tempel, geschnitzte Holzfenster und Palasthöfe",
      "Changu Narayan, einer der ältesten Tempel im Tal",
    ],
    contingency:
      "Eintrittskarten werden an jeder Stätte einzeln gekauft; einen Kombipass gibt es nicht. Bewahre die Karten auf, solange du in einer Zone bist (in Bhaktapur wird an mehreren Gassen kontrolliert).",
  },
  "khopra-danda-trek": {
    title: "Khopra-Danda-Trek",
    subtitle: "Eine ruhige Kammwanderung gegenüber dem Dhaulagiri, abseits der Hauptwege",
    overview: `Eine ruhige Alternative zum Poon Hill, hinauf zu einem Kamm bei Khopra (3.660 m) gegenüber von Dhaulagiri, Annapurna South und Nilgiri über dem tiefen Kali Gandaki. Gemeindelodges entlang der Route unterstützen die Dörfer vor Ort.
Von Khopra aus kannst du eine lange Tageswanderung zum Khayer-See (4.660 m) machen, einem heiligen See unter der Annapurna South mit einem kleinen Hindu-Tempel. Der Weg ist rau und kann verschneit sein, deshalb entscheiden wir am Tag selbst mit deinem Guide; ohne den See ist der Trek mittelschwer.
Die Route kann auf dem Hin- oder Rückweg den Sonnenaufgang vom Poon Hill einschließen.`,
    highlights: [
      "Der Khopra-Kamm (3.660 m) gegenüber von Dhaulagiri, Annapurna South und Nilgiri, abseits des Andrangs am Poon Hill",
      "Der heilige Khayer-See (4.660 m) und der Tempel Khayer Barah",
      "Lodges, die von den Gemeinden betrieben werden",
      "Auf Wunsch mit Sonnenaufgang vom Poon Hill",
    ],
    contingency:
      "Gemeindelodges in Khopra und Chistibung (die Einnahmen bleiben in den Dörfern).",
    acclimatizationNotes:
      "Die empfohlene 9-Tage-Version hat einen Ruhetag in Khopra vor dem See.",
  },
};

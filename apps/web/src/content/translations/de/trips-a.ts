import type { TripTranslation } from "../types";

/** Shared opening of the contingency note on Khumbu trips that fly to Lukla. */
export const luklaNote =
  "Flüge nach Lukla und ab Ramechhap (Manthali) hängen vom Wetter ab. In der Hochsaison werden Flüge Kathmandu–Lukla oft über Manthali umgeleitet, nach einer 4–5-stündigen Fahrt vor Sonnenaufgang. Plane mindestens einen Puffertag vor dem internationalen Rückflug ein.";

/** German trip pages, A to E. */
export const tripsDeA: Record<string, TripTranslation> = {
  "ama-dablam-expedition": {
    title: "Ama-Dablam-Expedition",
    subtitle: "Das Matterhorn des Himalaya, über seinen Südwestgrat",
    overview: `Die Ama Dablam (6.812 m), die „Halskette der Mutter“, ist der markanteste Berg des Khumbu und eine der schönsten Besteigungen der Welt. Mike Gill, Wally Romanes, Barry Bishop und Mike Ward bestiegen sie 1961 erstmals über den Südwestgrat.
Der Anmarsch führt über Namche Bazaar und Tengboche zu einem grasigen Basislager mit Blick auf Everest, Lhotse und Nuptse. Die Route folgt dem Südwestgrat an Fixseilen über Granitplatten, den steilen Yellow Tower unterhalb von Lager 2 und den Schnee und das Eis des Mushroom Ridge zum Gipfel.
Das ist eine technische Besteigung, kein Trekkinggipfel. Du solltest sicher mit Steigklemme und Abseilen umgehen und mit Steigeisen im Fels klettern können. Zwei Rotationen am Berg bereiten dich auf den Gipfelvorstoß vor.`,
    highlights: [
      "Der klassische Südwestgrat, 1961 erstbestiegen",
      "Der Yellow Tower und der Mushroom Ridge",
      "Eine Wiese als Basislager gegenüber von Everest, Lhotse und Nuptse",
      "Das Kloster Tengboche auf dem Anmarsch",
    ],
    contingency: `${luklaNote} Teehäuser bis Pangboche; Basislager und Hochlager in Zelten. Zeltplätze in Lager 2 sind in den vollen Oktoberwochen knapp. Flaschensauerstoff ist bei kommerziellen Ama-Dablam-Besteigungen nicht üblich (anders als an Achttausendern).`,
    acclimatizationNotes:
      "Üblich sind zwei Rotationen vor dem Gipfelvorstoß, mit zusätzlichen Ruhetagen im Basislager dazwischen.",
  },
  "annapurna-base-camp-trek": {
    title: "Trek zum Annapurna Base Camp",
    subtitle: "Ins Annapurna Sanctuary, einen Ring aus Eiswänden über dem Wald",
    overview: `Ein Trek ins Annapurna Sanctuary, ein hohes Gletscherbecken, umgeben von einigen der eindrucksvollsten Wände des Himalaya: Annapurna I, Annapurna South, Hiunchuli, Gangapurna und der Fischschwanzgipfel des Machhapuchhre.
Die Route steigt von terrassierten Gurung-Dörfern in Ghandruk und Chhomrong durch Bambus- und Rhododendronwald in der Schlucht des Modi Khola. Wir übernachten im Machhapuchhre Base Camp vor dem letzten Wegstück ins Sanctuary. So wird der Aufstieg zum Annapurna Base Camp (4.130 m) schonender für den Körper, und du erlebst Sonnenuntergang und Sonnenaufgang zwischen den Gipfeln.
Auf dem Rückweg bleibt Zeit für die heißen Quellen in Jhinu Danda, bevor es zurück nach Pokhara geht.`,
    highlights: [
      "Das Amphitheater des Annapurna Sanctuary mit Annapurna I, Annapurna South, Hiunchuli, Gangapurna und Machhapuchhre",
      "Machhapuchhre Base Camp (3.700 m)",
      "Die Gurung-Dörfer Ghandruk und Chhomrong",
      "Rhododendron- und Bambuswald in der Schlucht des Modi Khola",
      "Die heißen Quellen von Jhinu Danda auf dem Abstieg",
    ],
    contingency:
      "Teehäuser an jedem Übernachtungsort; Chhomrong ist der letzte größere Ort mit Läden.",
    acclimatizationNotes:
      "Der Standardplan hat keinen eigenen Ruhetag; die Nacht im MBC (3.700 m) statt in Deurali teilt den Höhengewinn. Planungstools stufen die Akklimatisierung von Deurali zum ABC als knapp ein.",
  },
  "annapurna-circuit-trek": {
    title: "Annapurna-Runde",
    subtitle: "Rund um das Annapurna-Massiv und über den Thorong La",
    overview: `Eine der großen Wanderungen der Welt: einmal rund um das Annapurna-Massiv, von grünen Reisterrassen im Marsyangdi-Tal in die hohen, trockenen, tibetisch geprägten Landschaften von Manang und über den Thorong La auf 5.416 m.
Wir nehmen den oberen Weg über Pisang, Ghyaru und Ngawal wegen der Blicke auf Annapurna II und IV und verbringen einen ganzen Akklimatisierungstag in Manang mit einer Wanderung zum Ice Lake. Die Passüberquerung ist ein langer Tag mit frühem Start in Thorong Phedi; auf der anderen Seite liegt Muktinath, Hindus wie Buddhisten heilig, und die tiefe Schlucht des Kali Gandaki hinunter nach Kagbeni und Jomsom.
Straßen erreichen inzwischen Teile der Runde, deshalb folgen wir wo immer möglich den ruhigeren Seitenwegen und fliegen von Jomsom zurück nach Pokhara.`,
    highlights: [
      "Über den Thorong La (5.416 m) nach Muktinath",
      "Der obere Weg über Upper Pisang, Ghyaru und Ngawal",
      "Die tibetisch geprägten Dörfer von Manang, mit Ruhetag vor dem Pass",
      "Die Schlucht des Kali Gandaki, Kagbeni und Jomsom auf dem Abstieg",
    ],
    contingency:
      "Durchgehend Teehäuser. Die Straße führt inzwischen von Besisahar nach Manang und von Beni nach Muktinath; die NATT-Seitenwege (rot-weiße und blau-weiße Markierungen) umgehen einen Großteil davon.",
    acclimatizationNotes:
      "Üblich ist ein Ruhetag in Manang mit einer Wanderung auf etwa 4.600 m (Ice Lake); die Tilicho-Variante bringt zusätzliche Nächte über 4.000 m, die bei der Akklimatisierung für den Pass helfen.",
  },
  "annapurna-i-expedition": {
    title: "Annapurna-I-Expedition",
    subtitle: "Der erste je bestiegene Achttausender, über die Nordseite",
    overview: `Die Annapurna I (8.091 m) war der erste je bestiegene Achttausender, erreicht von Maurice Herzog und Louis Lachenal von der französischen Expedition am 3. Juni 1950. Sie gehört bis heute zu den ernstesten der hohen Gipfel und wird nur von erfahrenen Bergsteigern bestiegen.
Die Expedition nähert sich aus dem Kali-Gandaki-Tal einem abgelegenen Basislager auf der Nordseite. Die Route führt über Gletscher und steile Schneerampen durch vier Lager. Der Abschnitt unter den Eisabbrüchen, die als Sichel bekannt sind, ist Lawinen und Séracabbrüchen ausgesetzt, daher richtet sich jeder Schritt nach den Verhältnissen.
Wir planen mit mehreren Wochen Rotationen am Berg, sorgfältiger Wetterprognose und einem starken Team aus Kletter-Sherpas. Erfahrung an einem Achttausender wird vorausgesetzt.`,
    highlights: [
      "Der erste je bestiegene Achttausender (Herzog und Lachenal, 3. Juni 1950)",
      "Der zehnthöchste Berg der Welt",
      "Ein abgelegenes Basislager auf der Nordseite über dem Kali Gandaki",
    ],
    contingency:
      "Hotels in Kathmandu/Pokhara, Lodge in Dana, etwa 1 Monat im Zeltbasislager; Versorgung per Hubschrauber ist üblich.",
    acclimatizationNotes:
      "Die Rotationsphase reicht im kommerziellen Programm etwa von Tag 6 bis Tag 29.",
  },
  "bardia-national-park-safari": {
    title: "Safari im Bardia-Nationalpark",
    subtitle: "Tigerland im ruhigen fernen Westen Nepals",
    overview: `Bardia ist Nepals größter und wildester Nationalpark im Tiefland, eine ruhige Ecke im fernen Westen, wo Salwald, Grasland und die verzweigten Arme des Karnali eine der besten Tigerpopulationen Asiens tragen.
Die Tage verbringst du mit erfahrenen Naturführern auf der Suche nach Wildtieren: auf Jeepsafaris, im Schlauchboot oder auf langen Fußpirschen auf Tigerspuren. Neben Tigern leben in Bardia wilde Elefanten, Panzernashörner, Barasingha-Hirsche, Gaviale und Sumpfkrokodile und mit etwas Glück Flussdelfine im Karnali.
Die Lodges bei Thakurdwara sind einfach und liegen nahe an Tharu-Dörfern. Sichtungen sind nie garantiert, das Gefühl echter Wildnis schon.`,
    highlights: [
      "Einer der besten Orte Asiens, um wilde Bengaltiger zu sehen",
      "Fußpirsch mit erfahrenen Naturführern",
      "Wilde Elefanten, Panzernashörner, Barasingha-Hirsche und Hirschziegenantilopen",
      "Gaviale, Sumpfkrokodile und Flussdelfine im Karnali",
      "Tharu-Dörfer rund um Thakurdwara",
    ],
    contingency:
      "Die Parkverwaltung liegt in Thakurdwara. Weit weniger Besucher als in Chitwan (26.131 Besucher im Geschäftsjahr 2023/24).",
    acclimatizationNotes: "Park im Terai-Tiefland; die Höhe spielt keine Rolle.",
  },
  "bhutan-add-on-tour": {
    title: "Bhutan-Verlängerung ab Kathmandu",
    subtitle: "Dzongs, Gebetsfahnen und der Weg zum Tigernest",
    overview: `Eine kurze Reise ab Kathmandu in das Himalaya-Königreich Bhutan. Der Flug nach Paro führt am Himalaya entlang, und an klaren Tagen siehst du Everest und Kanchenjunga vom Fenster aus.
Die Tour führt nach Thimphu, Bhutans kleine Hauptstadt, über den Dochula-Pass mit seinen 108 Chörten und Bergblicken und zum Punakha Dzong am Zusammenfluss zweier Flüsse. Höhepunkt ist die Wanderung zum Paro Taktsang, dem Kloster Tigernest, das hoch über dem Paro-Tal an einer Felswand klebt. Der Aufstieg dauert in ruhigem Tempo zwei bis drei Stunden.
Besucher reisen in Bhutan mit einem lizenzierten bhutanischen Guide; Visum und Bhutans Sustainable Development Fee werden vor der Reise erledigt.`,
    highlights: [
      "Das Kloster Paro Taktsang (Tigernest) an einer Felswand über dem Paro-Tal",
      "Der Punakha Dzong am Zusammenfluss von Pho Chhu und Mo Chhu",
      "Der Dochula-Pass mit 108 Gedenk-Chörten und Himalaya-Blick",
      "Thimphu: Buddha Dordenma, Tashichho Dzong und National Memorial Chorten",
      "Der Panoramaflug Kathmandu–Paro am Himalaya entlang",
    ],
    contingency:
      "SDF und Visagebühr werden beim Online-Visumantrag bezahlt; die SDF wird bei Stornierung erstattet (abzüglich Bankgebühren).",
    acclimatizationNotes:
      "Die Übernachtungen liegen unter etwa 2.400 m; eine eigene Akklimatisierung ist nicht nötig.",
  },
  "bungee-and-canyon-swing-adventure": {
    title: "Bungee- und Canyon-Swing-Abenteuer",
    subtitle: "Ein Tag im freien Fall über der Schlucht des Bhote Koshi",
    overview: `Ein Tag voller Adrenalin in Nepals Schluchten. Der ursprüngliche Bungeesprung Nepals geht von einer Hängebrücke hoch über dem Bhote Koshi nahe der tibetischen Grenze, ein paar Fahrstunden von Kathmandu. Der Canyon Swing von derselben Brücke bietet einen langen freien Fall und einen riesigen Bogen über die Schlucht.
Wer von Pokhara aus springen möchte: In Kushma überspannen ein neuerer Bungee und Swing die tiefe Schlucht des Kali Gandaki.
Erfahrung brauchst du nicht, die Betreiber geben ausführliche Sicherheitseinweisungen. Es gelten Gewichtsgrenzen und gesundheitliche Einschränkungen, die wir bei der Buchung bestätigen.`,
    highlights: [
      "Nepals ursprünglicher Bungeesprung, von einer Hängebrücke über dem Bhote Koshi",
      "Ein Canyon Swing mit langem freiem Fall und riesigem Bogen über die Schlucht",
      "Ab Pokhara: Bungee und Swing über der Schlucht des Kali Gandaki in Kushma",
      "Ausführliche Sicherheitseinweisung, keine Erfahrung nötig",
    ],
    contingency:
      "The Last Resort liegt in Naya Pul bei Tatopani, Sindhupalchok; das Verkaufsbüro ist in Thamel. Der Platz in Kushma liegt etwa 500 m vom Basar in Kushma entfernt.",
  },
  "chitwan-national-park-safari": {
    title: "Safari im Chitwan-Nationalpark",
    subtitle: "Nashörner, Dschungelwanderungen und Tharu-Dörfer im Tiefland",
    overview: `Chitwan war Nepals erster Nationalpark und ist UNESCO-Welterbe, eine Tieflandwelt aus Salwald, hohem Grasland und Flüssen unterhalb der Himalaya-Vorberge. Es ist der beste Ort in Nepal, um Panzernashörner zu sehen, und Heimat von Bengaltigern, Lippenbären, Leoparden und Hunderten Vogelarten.
Du erkundest den Park auf Jeepsafaris, im Einbaum auf dem Rapti auf der Suche nach Gavialen und Sumpfkrokodilen und auf geführten Wanderungen mit erfahrenen Naturführern. Abends kannst du ein Tharu-Dorf besuchen und den traditionellen Stocktanz sehen.
Die Reise passt für Familien und alle, die Abwechslung von den Bergen suchen, und lässt sich gut mit Pokhara oder Lumbini verbinden.`,
    highlights: [
      "Panzernashörner in Nepals erstem Nationalpark, einem UNESCO-Welterbe",
      "Jeepsafaris im Revier von Tiger, Leopard und Lippenbär",
      "Gaviale und Sumpfkrokodile vom Einbaum auf dem Rapti",
      "Hunderte Vogelarten in Wald und Grasland",
      "Tharu-Dorfleben und der Stocktanz",
    ],
    contingency:
      "Die Parkverwaltung liegt in Kasara, 21 km von Bharatpur; die meisten Besucher wohnen in Sauraha am Nordrand des Parks.",
    acclimatizationNotes: "Park im Tiefland; die Höhe spielt keine Rolle.",
  },
  "cho-oyu-expedition": {
    title: "Cho-Oyu-Expedition",
    subtitle: "Der sechsthöchste Berg, an den breiten Flanken der türkisfarbenen Göttin",
    overview: `Der Cho Oyu (8.188 m), die „türkisfarbene Göttin“, ist der sechsthöchste Berg der Welt und gilt seit Langem als einer der machbarsten Achttausender. Er steht an der Grenze zwischen Nepal und Tibet westlich des Everest.
Die meisten Besteigungen folgen dem Nordwestgrat von Tibet aus: breite Schneehänge, eine kurze Felsstufe und ein langes Gipfelplateau, mit Fixseilen und drei Hochlagern. Der Anmarsch hängt davon ab, welche Seite und welcher Grenzübergang in der Saison offen sind; wir stimmen den Plan rechtzeitig vor der Abreise mit dir ab.
Er ist ein guter erster Achttausender für Bergsteiger mit Erfahrung auf 6.000 bis 7.000 m und eine häufige Vorbereitung auf den Everest.`,
    highlights: [
      "Der sechsthöchste Berg der Welt (8.188 m)",
      "Eine breite, moderate Route, einer der machbarsten Achttausender",
      "Eine starke Vorbereitung auf den Everest",
    ],
    contingency: `${luklaNote} Tibet: Hotels bis Tingri, Zelte im chinesischen Basislager und im vorgeschobenen Basislager. Nepalische Seite: Teehäuser bis Gokyo/Thame, danach Zelte. Die Gebühr der Icefall Doctors fällt nicht an (keine der beiden Normalrouten am Cho Oyu führt durch den Khumbu-Eisbruch).`,
    acclimatizationNotes:
      "Programme über Tibet setzen auf eine Anfahrt in Etappen und dann Rotationen ab dem vorgeschobenen Basislager. Ein Team von der nepalischen Seite akklimatisiert sich auf dem Anmarsch über Gokyo/Thame und mit Rotationen am Berg; eine übliche Zahl an Rotationen gibt es nicht.",
  },
  "chulu-west-peak-climbing": {
    title: "Besteigung des Chulu West",
    subtitle: "Ein hoher Schneegipfel über Manang, mit der Annapurna-Runde als Anmarsch",
    overview: `Eine vollwertige Himalaya-Expedition, verbunden mit der Annapurna-Runde. Der Chulu West (6.419 m) steht über Manang, und die Besteigung führt in Etappen über das Basislager und zwei höhere Lager, sodass du dich am Berg akklimatisieren kannst.
Der Anmarsch folgt dem Marsyangdi-Tal durch die Dörfer der Annapurna-Runde nach Manang, mit einem Ruhetag dort. Von Ledar steigst du zu den Lagern auf; der Gipfelvorstoß folgt dem Nordostgrat über Schnee und Eis, mit Fixseilen an den steileren Stellen. Der Gipfelblick reicht über die Annapurnas, Gangapurna, Tilicho Peak, Manaslu und Dhaulagiri.
Nach der Besteigung überquerst du den Thorong La und steigst nach Jomsom und Pokhara ab. Die Reise passt für fitte Bergsteiger mit etwas Erfahrung auf Steigeisen, die ein größeres Ziel suchen.`,
    highlights: [
      "Gipfelblick auf die Annapurna-Kette, Dhaulagiri, Gangapurna, Tilicho Peak und Manaslu",
      "Ein Gipfel über 6.400 m, verbunden mit der Annapurna-Runde und dem Thorong La",
      "Lager in Etappen erlauben eine schrittweise Akklimatisierung",
    ],
    contingency: "Teehäuser auf der Runde; Basislager, Lager I und Lager II in Zelten.",
    acclimatizationNotes:
      "Im Standardplan ein Ruhetag in Manang und ein weiterer in Lager I.",
  },
  "dhaulagiri-expedition": {
    title: "Dhaulagiri-I-Expedition",
    subtitle: "Der weiße Berg, über French Pass und Hidden Valley",
    overview: `Der Dhaulagiri I (8.167 m), der „weiße Berg“, ist der siebthöchste Berg der Welt. Er ragt gegenüber der Annapurna über der Schlucht des Kali Gandaki auf und wurde 1960 von einer schweizerisch-österreichischen Expedition über den Nordostgrat erstbestiegen, der bis heute die Normalroute ist.
Schon der Anmarsch ist ein Abenteuer: über Dhampus-Pass und French Pass durch das hohe, leere Hidden Valley zum Basislager. Am Berg führt die Route über einen Gletscher und Eisbruch zum Nordostsattel und folgt dann dem windausgesetzten Grat durch drei Hochlager.
Der Dhaulagiri ist ein anspruchsvoller Gipfel, der Erfahrung an einem Achttausender oder starke Erfahrung auf 7.000 m verlangt, dazu lange Rotationen und Geduld mit dem Wetter.`,
    highlights: [
      "Der siebthöchste Berg der Welt",
      "Anmarsch über Dhampus-Pass und French Pass durch das Hidden Valley",
      "Blick über die Schlucht des Kali Gandaki zur Annapurna I",
    ],
    contingency:
      "Lodges bis Marpha; ab Yak Kharka Zelte; etwa 1 Monat im Zeltbasislager mit Versorgung per Hubschrauber.",
    acclimatizationNotes:
      "Die Rotationsphase reicht im kommerziellen Programm etwa von Tag 9 bis Tag 27.",
  },
  "everest-base-camp-trek": {
    title: "Trek zum Everest Base Camp",
    subtitle: "Sherpa-Dörfer, Klöster und Sonnenaufgang am Everest vom Kala Patthar",
    overview: `Wandere ins Herz des Khumbu, der Heimat der Sherpa am Fuß des höchsten Bergs der Welt. Von der Landebahn in Lukla folgt der Weg dem Dudh Kosi hinauf nach Namche Bazaar, vorbei am Kloster Tengboche mit der Ama Dablam auf der anderen Talseite, und weiter zur Moräne neben dem Khumbu-Eisbruch am Everest Base Camp.
Den besten Blick auf den Everest selbst hast du am nächsten Morgen: beim Aufstieg zum Sonnenaufgang auf den Kala Patthar (5.545 m), mit Gipfel, Lhotse und Nuptse direkt vor dir.
Das ist ein Teehaus-Trek, keine Besteigung. Die Herausforderung ist die Höhe, deshalb hat der Plan zwei Akklimatisierungstage in Namche und Dingboche, jeweils mit einer Wanderung nach oben, bevor du tiefer schläfst. Dein privater Guide bestimmt das Tempo, und ein Reservetag schützt deinen Heimflug vor dem Wetter in Lukla.`,
    highlights: [
      "Everest Base Camp (5.364 m) neben dem Khumbu-Eisbruch",
      "Sonnenaufgang am Everest vom Kala Patthar",
      "Namche Bazaar und das Kloster Tengboche, gegenüber die Ama Dablam",
      "Die Sherpa-Dörfer im Sagarmatha-Nationalpark, einem UNESCO-Welterbe",
    ],
    contingency: `${luklaNote} Regen oder gesperrte Straßen können Trekkende in Manthali festhalten (Oktober 2025: über 150 Wartende nach Regenfällen).`,
    acclimatizationNotes:
      "An beiden Tagen gehst du hoch und schläfst tief (Hotel Everest View etwa 3.880 m; Nangkartshang etwa 5.083 m).",
  },
  "everest-expedition-south-col": {
    title: "Everest-Expedition über den Südsattel",
    subtitle: "Der höchste Gipfel der Erde, über die Südsattel-Route",
    overview: `Der Mount Everest (8.849 m), auf Nepali Sagarmatha und auf Tibetisch Chomolungma, über die Südsattel-Route, auf der Edmund Hillary und Tenzing Norgay 1953 die Erstbesteigung gelang.
Die Expedition beginnt mit dem Trek durch den Khumbu, vorbei an Namche Bazaar und Tengboche, zum Everest Base Camp. Am Berg führt die Route über Leitern und Fixseile durch den Khumbu-Eisbruch, quert das Western Cwm, steigt die Lhotse-Flanke hinauf zum Südsattel und folgt dem Südostgrat über den Südgipfel und den Hillary Step zum höchsten Punkt.
Für Akklimatisierungsrotationen, das Warten auf ein Gipfelfenster und den Rückweg brauchst du etwa zwei Monate. Du brauchst Höhenerfahrung, am besten an einem Sieben- oder Achttausender, und nutzt weit oben Flaschensauerstoff, unterstützt von erfahrenen Kletter-Sherpas.`,
    highlights: [
      "Der Gipfel des höchsten Bergs der Welt (8.849 m)",
      "Der Khumbu-Eisbruch, das Western Cwm und die Lhotse-Flanke",
      "Der Südsattel, der Südgipfel und der Hillary Step",
      "Der Anmarsch durch die Sherpa-Dörfer des Khumbu",
    ],
    contingency: `${luklaNote} Teehäuser und Lodges auf dem Anmarsch; ein voll ausgestattetes Expeditions-Basislager (Essenszelt, Kommunikation, medizinische Versorgung) und Hochlager in Zelten.`,
    acclimatizationNotes:
      "Rotationen zwischen Basislager und Lager 1–3 über etwa 3–4 Wochen vor dem Gipfelvorstoß.",
  },
};

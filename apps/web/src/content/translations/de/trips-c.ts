import type { TripTranslation } from "../types";
import { luklaNote } from "./trips-a";

/** German trip pages, L to M. */
export const tripsDeC: Record<string, TripTranslation> = {
  "langtang-gosainkunda-trek": {
    title: "Langtang-Gosainkunda-Trek",
    subtitle: "Das Gletschertal des Langtang und die heiligen Seen von Gosainkunda",
    overview: `Zwei Treks in einem: die Gletscher und Yakweiden des Langtang-Tals, dann die heiligen Seen von Gosainkunda, ein Pilgerort für Hindus und Buddhisten in einem Felskessel auf 4.380 m.
Nach der Akklimatisierung in Kyanjin Gompa und dem Aufstieg auf den Tserko Ri steigst du ab und wechselst hinüber nach Sing Gompa und Gosainkunda. Der Laurebina La (4.610 m) führt nach Helambu, mit Blick vom Langtang bis zum Manaslu und zu den Annapurnas, und der Weg endet zu Fuß durch den Shivapuri-Nationalpark am Rand von Kathmandu.
Der Passtag ist lang, und die Nächte um 4.000 m machen diesen Trek anspruchsvoller als den Langtang-Trek allein.`,
    highlights: [
      "Die heiligen Seen von Gosainkunda",
      "Der Laurebina La mit Blick vom Langtang bis zu den Annapurnas",
      "Kyanjin Gompa und das Langtang-Tal",
      "Die Hyolmo-Dörfer von Helambu",
      "Zu Fuß bis an den Rand von Kathmandu durch den Shivapuri-Nationalpark",
    ],
    contingency:
      "Kontrollposten des Parks gibt es unter anderem in Dhunche, Ghoda Tabela und auf der Helambu-Seite in Kutumsang/Mangengoth; die Shivapuri-Genehmigung wird in Sundarijal geprüft.",
    acclimatizationNotes:
      "Die Akklimatisierung im Langtang-Tal hilft vor der Überquerung bei Gosainkunda; Treks nur nach Gosainkunda ab Dhunche gewinnen sehr schnell an Höhe.",
  },
  "langtang-valley-trek": {
    title: "Langtang-Tal-Trek",
    subtitle:
      "Ein Tamang-Tal mit Yakweiden und Gletschern, eine Tagesfahrt von Kathmandu",
    overview: `Das große Himalaya-Tal, das Kathmandu am nächsten liegt, in einem Tag auf der Straße erreichbar. Der Weg steigt durch Wald, in dem Rote Pandas leben, zum wiederaufgebauten Dorf Langtang und weiter nach Kyanjin Gompa, einem kleinen Klosterdorf mit Käserei auf 3.870 m unter den Gletschern des Langtang Lirung.
Von Kyanjin steigst du auf einen der Aussichtspunkte des Tals, den Kyanjin Ri oder den höheren Tserko Ri (4.984 m), mit weitem Panorama über Gletscher und Gipfel entlang der tibetischen Grenze.
Der Langtang ist Tamang-Land, mit tibetisch-buddhistischer Kultur, Gebetsmauern und Yakweiden. Ein guter erster Himalaya-Trek, kurz und abwechslungsreich, ganz ohne Flug.`,
    highlights: [
      "Kyanjin Gompa unter dem Langtang Lirung",
      "Sonnenaufgang vom Tserko Ri und vom Kyanjin Ri",
      "Das wiederaufgebaute Dorf Langtang und die Tamang-Kultur",
      "Das große Himalaya-Tal, das Kathmandu auf der Straße am nächsten liegt",
      "Rote Pandas und Himalaya-Tahre im Langtang-Nationalpark",
    ],
    contingency:
      "Kontrollen der Genehmigungen in Dhunche (Armee/Park) und Ghoda Tabela; der Kontrollposten in Syabrubesi wurde laut Berichten beim Hochwasser im August 2026 weggerissen.",
    acclimatizationNotes:
      "Der Tag auf den Kyanjin Ri oder Tserko Ri ist zugleich der Akklimatisierungstag; am besten früh in Kyanjin ankommen und den Gipfel am nächsten Tag besteigen.",
  },
  "lhotse-expedition": {
    title: "Lhotse-Expedition",
    subtitle: "Der vierthöchste Gipfel der Welt, über die Lhotse-Flanke",
    overview: `Der Lhotse (8.516 m), der vierthöchste Berg der Welt, ist über den Südsattel mit dem Everest verbunden. Fritz Luchsinger und Ernst Reiss von der Schweizer Expedition bestiegen ihn erstmals am 18. Mai 1956.
Die Route teilt sich den Everest-Anmarsch durch den Khumbu-Eisbruch, das Western Cwm und die Lhotse-Flanke. Oberhalb von Lager 3 trennen sich die Wege: Während die Everest-Massen zum Südsattel ziehen, steigst du zu einem Hochlager unter dem Lhotse-Couloir. Das schmale Couloir aus steilem Schnee und Eis führt zum Gipfel.
Die Expedition folgt demselben Rotations- und Akklimatisierungsmuster wie am Everest, mit Flaschensauerstoff und Unterstützung durch Kletter-Sherpas, aber mit weit weniger Menschen weit oben am Berg. Erfahrung an einem Achttausender oder starke Erfahrung auf 7.000 m wird vorausgesetzt.`,
    highlights: [
      "Der vierthöchste Gipfel der Welt (8.516 m)",
      "Das schmale Lhotse-Couloir zum Gipfel",
      "Die Everest-Route durch Eisbruch und Western Cwm, mit weit weniger Menschen oberhalb von Lager 3",
    ],
    contingency: `${luklaNote} Teehäuser auf dem Anmarsch; ein voll ausgestattetes Zeltbasislager, das mit dem Everest geteilt wird; Hochlager im Eisbruch, im Cwm und in der Flanke. Die Route der Icefall Doctors ist dieselbe wie am Everest.`,
    acclimatizationNotes:
      "Dasselbe Rotationsmuster wie am Everest: Eingewöhnung im Eisbruch, Nächte in Lager 1–2, kurz bis Lager 3, Erholung im Basislager, dann der Vorstoß im Wetterfenster.",
  },
  "lobuche-east-peak-climbing": {
    title: "Besteigung des Lobuche East",
    subtitle: "Ein steiler Schneegipfel mit Logenplatz zum Everest",
    overview: `Der Lobuche East erhebt sich über dem Khumbu-Gletscher, direkt gegenüber von Everest, Lhotse und Nuptse. Er ist steiler und technischer als der Island Peak, und sein Grat bietet einen Logenplatz zu den höchsten Bergen der Welt.
Der Trek folgt der klassischen Route zum Everest Base Camp und auf den Kala Patthar, damit du gut akklimatisiert bist, bevor es ins Hochlager geht. Deine Guides üben mit dir vor dem Gipfeltag Steigeisen, Eispickel, Steigklemme und Abseilen.
Die Besteigung beginnt im Dunkeln, führt über Felsplatten und einen Gletscher und steigt an Fixseilen über steilen Schnee zum Gipfelgrat. Der eigentliche Gipfel liegt weiter entlang eines ausgesetzten Grats hinter dem ersten Vorgipfel; dein Guide entscheidet am Tag selbst, wie weit es sicher ist. Für fitte Trekkende, die mit Ausgesetztheit umgehen können.`,
    highlights: [
      "Der Gipfelgrat des Lobuche East (6.119 m) über dem Khumbu-Gletscher",
      "Nahe Blicke auf Everest, Lhotse, Nuptse und Ama Dablam",
      "Everest Base Camp und Kala Patthar auf dem Akklimatisierungstrek",
    ],
    contingency: `${luklaNote} Teehäuser auf dem Anmarsch; Zelte im Hochlager (und im Basislager, falls genutzt). In der Saison sind am oberen Grat Fixseile angebracht.`,
    acclimatizationNotes:
      "Die Runde über EBC und Kala Patthar bringt vor dem Hochlager Nächte auf fast 5.000 m. Eigenständige 15-Tage-Pläne nutzen trotzdem Ruhetage in Namche und Dingboche.",
  },
  "lower-dolpo-trek": {
    title: "Trek durch Lower Dolpo",
    subtitle: "Der Phoksundo-See und die hohen Pässe der Bön-Dörfer von Dolpo",
    overview: `Eine abgelegene Runde durch den Süden von Dolpo, die den Phoksundo-See, den tiefsten See Nepals, mit dem Tarap-Tal und zwei hohen Pässen verbindet. Die Dörfer hier folgen dem tibetischen Buddhismus und der älteren Bön-Religion, und die Landschaft ist ein trockenes, offenes Hochland, das nur wenige Trekkende sehen.
Von Juphal steigt der Weg durch die Schlucht des Tarap Khola nach Dho Tarap, wo dich ein Ruhetag auf Numa La (etwa 5.190 m) und Baga La (etwa 5.070 m) an zwei aufeinanderfolgenden Tagen vorbereitet. Zum Schluss erreichst du den Phoksundo-See in Ringmo und wanderst dann zurück nach Juphal.
Oberhalb von Dho Tarap wird großteils gezeltet, und die Flüge hin und zurück hängen vom Wetter ab, deshalb ist ein Reservetag eingeplant.`,
    highlights: [
      "Der Phoksundo-See, Nepals tiefster See, und der Phoksundo-Wasserfall",
      "Zwei hohe Pässe: Numa La und Baga La",
      "Dho Tarap und die buddhistische und Bön-Kultur des Tarap-Tals",
      "Die Schlucht des Tarap Khola",
      "Die Landschaften des Shey-Phoksundo-Nationalparks",
    ],
    contingency:
      "Einfache Lodges und Privatunterkünfte in den unteren Dörfern und in Ringmo; für den Abschnitt über Numa La und Baga La wird gezeltet.",
    acclimatizationNotes:
      "Der Ruhetag in Ringmo kommt erst nach den hohen Pässen; Dho Tarap ist der wichtigste Akklimatisierungsort vor den Pässen.",
  },
  "lumbini-pilgrimage-tour": {
    title: "Pilgerreise nach Lumbini",
    subtitle: "Der Geburtsort des Buddha und seine Klostergärten",
    overview: `Lumbini im Tiefland des südlichen Nepal ist der Geburtsort von Siddhartha Gautama, dem Buddha, und ein UNESCO-Welterbe, das Pilger aus aller Welt besuchen.
Der Maya-Devi-Tempel markiert den Ort seiner Geburt, neben dem heiligen Teich, in dem seine Mutter gebadet haben soll. In der Nähe steht die Säule, die Kaiser Ashoka errichten ließ; ihre Inschrift hält seinen Besuch am Geburtsort fest. Rund um den Heiligen Garten liegen die Klosterzonen mit Klöstern und Tempeln, die buddhistische Länder in ihrem eigenen Stil gebaut haben.
Das Gelände ist flach und wird zu Fuß, mit dem Fahrrad oder mit der Rikscha erkundet. Die Reise lässt sich gut mit Chitwan verbinden.`,
    highlights: [
      "Der Maya-Devi-Tempel am Geburtsort von Siddhartha Gautama (dem Buddha)",
      "Die Ashoka-Säule von Kaiser Ashoka (mit Inschrift zum Geburtsort)",
      "Der Heilige Garten und der Teich Puskarini",
      "Internationale Klöster in der östlichen und westlichen Klosterzone",
      "UNESCO-Welterbe",
    ],
    contingency:
      "Eintrittskarten gibt es bar, per QR-Code oder online unter tickets.lumbinidevtrust.gov.np.",
  },
  "makalu-base-camp-trek": {
    title: "Trek zum Makalu Base Camp",
    subtitle: "Das wilde Barun-Tal bis zum Fuß der Makalu-Südwand",
    overview: `Ein wilder Trek ins Barun-Tal bis zum Fuß der Makalu-Südwand, einer der eindrucksvollsten Bergwände des Himalaya. Die Route steigt von den Terrassendörfern des Arun-Tals durch rhododendronreichen Wald zu einer hohen Querung über Shipton La und Keke La, mit Bergseen und weiten Blicken.
Hinter den Pässen öffnet sich das Barun-Tal mit Wasserfällen, Gletschern und Felswänden bis zum Makalu Base Camp (4.870 m). An klaren Tagen siehst du knapp oberhalb des Lagers Everest und Lhotse.
Ein abgelegener Trek mit einfachen Lodges und teils Zelten. Akklimatisierungstage in Khongma Danda und im Barun-Tal sind eingeplant.`,
    highlights: [
      "Die Makalu-Südwand vom Basislager",
      "Gletscher, Wasserfälle und Felswände im Barun-Tal",
      "Die Querung über Shipton La und Keke La mit Bergseen",
      "Die Terrassendörfer des Arun-Tals",
      "Rhododendronwälder im Makalu-Barun-Nationalpark",
    ],
    contingency:
      "Das Nepal Tourism Board führt die Unterkünfte im Makalu-Barun-Nationalpark als Zeltlager.",
    acclimatizationNotes: "Ein Ruhetag in Khongma Danda vor dem Shipton La ist üblich.",
  },
  "makalu-expedition": {
    title: "Makalu-Expedition",
    subtitle: "Der fünfthöchste Berg, eine markante Granitpyramide",
    overview: `Der Makalu (8.485 m), der fünfthöchste Berg der Welt, ist eine frei stehende, vierseitige Granitpyramide südöstlich des Everest. Jean Couzy und Lionel Terray von der französischen Expedition bestiegen ihn erstmals am 15. Mai 1955; der Rest des Teams erreichte den Gipfel in den folgenden Tagen.
Der Anmarsch folgt dem Barun-Tal durch den Makalu-Barun-Nationalpark, eines der wildesten Gebiete Nepals. Vom vorgeschobenen Basislager steigt die Route zum Sattel Makalu La und dann über steilen Schnee und das French Couloir zu einem ausgesetzten Gipfelgrat.
Der Makalu ist ein schwerer, technischer Achttausender mit vier Hochlagern. Erfahrung über 7.000 m ist Voraussetzung.`,
    highlights: [
      "Der fünfthöchste Berg der Welt (8.485 m)",
      "Der Anmarsch durch das Barun-Tal und den Makalu-Barun-Nationalpark",
      "Der Makalu La und das French Couloir, auf der Route der Erstbesteigung 1955",
    ],
    contingency:
      "Einfache Lodges bis Tashigaon/Khongma; Zelte oder einfache Lodges im Barun-Tal; voll ausgestattetes vorgeschobenes Basislager in Zelten. Abgelegener als der Khumbu; Rettung ist auf Hubschrauber angewiesen.",
    acclimatizationNotes:
      "Bei SST reicht die Rotationsphase etwa von Tag 15 bis 30, danach folgt das Gipfelfenster. Programme mit Hubschrauberflug zum vorgeschobenen Basislager akklimatisieren sich zuerst im Khumbu (zum Beispiel in Chhukung) und fliegen dann hinüber.",
  },
  "manaslu-circuit-trek": {
    title: "Manaslu-Runde",
    subtitle: "Rund um den achthöchsten Berg und über den Larkya La",
    overview: `Eine wildere, ruhigere Runde um den Manaslu, den achthöchsten Berg der Welt. Es ist ein Sperrgebiet: Du darfst nur mit lizenziertem Guide und in einer Gruppe von mindestens zwei Personen gehen, deshalb ist der Weg weit weniger voll als an den Annapurnas.
Die Route folgt der Schlucht des Budhi Gandaki aus subtropischen Tälern hinauf in die tibetisch-buddhistischen Dörfer der Nubri-Region in Lho, Samagaon und Samdo. Akklimatisierungstage in Samagaon und Samdo mit Wanderungen weiter hinauf ins Tal bereiten dich auf den Larkya La (5.106 m) vor, mit dem Manaslu und seinen Nachbarn direkt über dir.
Der Abstieg führt über die Wiesen von Bimthang nach Dharapani, wo die Runde auf die Annapurna-Runde trifft.`,
    highlights: [
      "Über den Larkya La mit Blick auf den Manaslu (8.163 m) und die Gipfel ringsum",
      "Die Schlucht des Budhi Gandaki und die heißen Quellen von Tatopani",
      "Die tibetisch-buddhistischen Nubri-Dörfer (Lho, Samagaon, Samdo) und das Kloster Ribung",
      "Auf Wunsch eine Akklimatisierungswanderung zum Manaslu Base Camp oder nach Pungyen Gompa",
      "Trifft in Dharapani auf die Annapurna-Runde",
    ],
    contingency:
      "In Dharamsala (Larkya Phedi) gibt es nur einfache Schlafsaal-Lodges oder Zelte. Stand Mitte Oktober 2026 wurde die Bailey-Brücke in Arughat nach Hochwasserschäden neu gebaut.",
    acclimatizationNotes:
      "Üblich ist ein Ruhetag in Samagaon; längere Reisen haben einen zweiten (zum Beispiel in Samdo).",
  },
  "manaslu-expedition": {
    title: "Manaslu-Expedition",
    subtitle: "Der achthöchste Gipfel, ab Samagaon",
    overview: `Der Manaslu (8.163 m), der „Berg der Seele“, ist der achthöchste Berg der Welt. Toshio Imanishi und Gyalzen Norbu einer japanischen Expedition bestiegen ihn 1956 erstmals; heute ist er einer der beliebtesten Achttausender.
Ausgangspunkt der Expedition ist Samagaon, ein Nubri-Dorf mit tibetisch-buddhistischer Kultur, einem Kloster und Blick hinüber zum Berg. Die Route über die Nordostflanke führt durch vier Hochlager, vorbei an Eisabbrüchen unter Lager 4, zu einem ausgesetzten, überwechteten Grat, der zum eigentlichen Gipfel leitet.
Der Manaslu wird oft als erster Achttausender oder als Vorbereitung auf den Everest gewählt. Du solltest Erfahrung auf 6.000 bis 7.000 m haben und sicher an Fixseilen gehen.`,
    highlights: [
      "Der achthöchste Berg der Welt (8.163 m)",
      "Die klassische Route über die Nordostflanke mit vier Lagern",
      "Die tibetisch-buddhistische Nubri-Kultur in Samagaon",
      "Oft der erste Achttausender und eine Vorbereitung auf den Everest",
    ],
    contingency:
      "Lodges in Samagaon; Basislager und Hochlager in Zelten. Das Hochwasser am Budhi Gandaki am 11. Oktober 2026 hat den unteren Weg zwischen Jagat und Philim zerstört, was den Rückweg über Land betrifft.",
    acclimatizationNotes:
      "Mehrere Tage in Samagaon und im Basislager, dann Rotationen durch die Lager vor dem Gipfelfenster.",
  },
  "mardi-himal-trek": {
    title: "Mardi-Himal-Trek",
    subtitle: "Ein kurzer Kammtrek direkt auf die Wand des Machhapuchhre zu",
    overview: `Ein kurzer Kammtrek ab Pokhara, der dich direkt auf die Wand des Machhapuchhre zuführt, des heiligen Fischschwanzbergs. Der Weg verlässt das Ackerland über Pokhara für ruhigen Rhododendronwald und steigt dann auf einen offenen Graskamm, die Berge nah vor dir.
Der große Tag beginnt vor Sonnenaufgang im High Camp und führt zum Upper Viewpoint (4.200 m) oder weiter zum Mardi Himal Base Camp (etwa 4.500 m), zum Sonnenaufgang über Annapurna South, Hiunchuli und Machhapuchhre. Es ist steil und auf dem Kamm oft windig, deshalb gehen wir in ruhigem Tempo und planen eine zusätzliche Nacht ein, wo du sie brauchst.
Einfache Lodges, wenig Andrang und große Bergblicke in weniger als einer Woche.`,
    highlights: [
      "Nahe Blicke auf den Machhapuchhre (Fischschwanz) von Badal Danda und vom Kamm",
      "Sonnenaufgang über Annapurna South, Hiunchuli und Dhaulagiri vom Upper Viewpoint",
      "Ruhige Etappen durch Rhododendronwald",
      "Kurze Anreise ab Pokhara",
    ],
    contingency:
      "Einfache Teehäuser in Forest Camp, Low Camp, Badal Danda und High Camp; die Zimmer im High Camp sind einfach, mit Gemeinschaftsbad.",
    acclimatizationNotes:
      "Der 5-Tage-Standardplan hat keinen Ruhetag; langsameren Trekkenden empfehlen wir eine zusätzliche Nacht in Low Camp oder Badal Danda.",
  },
  "mera-peak-climbing": {
    title: "Besteigung des Mera Peak",
    subtitle: "Nepals höchster Trekkinggipfel, mit fünf Achttausendern im Blick",
    overview: `Der Mera Peak ist der höchste der Trekkinggipfel Nepals, und sein Gipfel bietet eine der großartigsten Aussichten im Himalaya: fünf Achttausender, Everest, Lhotse, Cho Oyu, Makalu und Kanchenjunga, in einem einzigen Panorama.
Der Anmarsch folgt dem ruhigen Hinku-Tal durch Wald und Yakweiden nach Khare, wo ein Ruhetag der Akklimatisierung und dem Üben mit Steigeisen, Eispickel und Seil dient. Vom Mera La steigst du auf den breiten Mera-Gletscher zu einem Hochlager auf einem Felsvorsprung.
Die Normalroute ist nicht steil, Fixseile braucht es selten. Die Herausforderung sind die Höhe und ein langer Gipfeltag, der in der Kälte vor Sonnenaufgang beginnt. Für fitte Trekkende mit etwas Höhenerfahrung, die ihren ersten großen Gipfel wollen.`,
    highlights: [
      "Der Gipfel von Nepals höchstem Trekkinggipfel",
      "Fünf Achttausender in einem Blick: Everest, Lhotse, Cho Oyu, Makalu und Kanchenjunga",
      "Das ruhige Hinku-Tal, abseits des Hauptwegs am Everest",
      "Der Mera La und der Mera-Gletscher",
    ],
    contingency: `${luklaNote} Teehäuser von Paiya bis Khare (einfacher als auf dem Weg zum EBC); Zelte im Hochlager. Manche Lodges schließen außerhalb der Hauptmonate.`,
    acclimatizationNotes:
      "Der Anmarsch durchs Hinku-Tal gewinnt langsam an Höhe. Standardpläne haben einen Ruhe- und Übungstag in Khare und manchmal einen zweiten Puffertag vor dem Hochlager. Programme mit 20–23 Tagen haben zusätzliche Tage in Khare.",
  },
  "mountain-biking-kathmandu-valley": {
    title: "Mountainbiken am Rand des Kathmandu-Tals",
    subtitle: "Kammwege, Dörfer und Tempel auf zwei Rädern",
    overview: `Eine Tour rund um den Rand des Kathmandu-Tals, auf Singletrails im Wald, Dorfwegen und ruhigen Straßen, mit Himalaya-Blick von den Kämmen.
Von den Wäldern des Shivapuri-Nagarjun-Nationalparks verbindet die Route Chisapani, Nagarkot und das buddhistische Kloster Namobuddha mit den alten Newar-Städten Dhulikhel und Panauti. Übernachtet wird in Dorflodges und kleinen Hotels.
Es gibt lange Anstiege und einige steile, technische Abfahrten, deshalb brauchst du gute Fahrtechnik und Fitness. An den meisten Tagen gibt es leichtere Varianten, und ein Begleitfahrzeug transportiert dein Gepäck.`,
    highlights: [
      "Singletrails durch die Wälder des Shivapuri-Nagarjun-Nationalparks",
      "Himalaya-Blick von Chisapani, Nagarkot und Lakuri Bhanjyang",
      "Das Kloster Namobuddha auf seinem Kamm",
      "Die Newar-Städte Dhulikhel und Panauti und Tamang-Dörfer",
    ],
    contingency:
      "Lodges und Resorts in Chisapani, Nagarkot, Namobuddha und Lakuri Bhanjyang. Räder kannst du in Thamel leihen.",
    acclimatizationNotes:
      "Die Strecke bleibt unter etwa 2.200 m; keine Akklimatisierung nötig.",
  },
};

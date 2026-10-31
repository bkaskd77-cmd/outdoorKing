import { departure } from "./shared";

const kathmanduSites =
  "Ein Tag mit deinem Guide an den Welterbestätten des Kathmandu-Tals: die Tempel und Palasthöfe am Durbar-Platz von Kathmandu (Hanuman Dhoka); Swayambhunath, die Stupa auf ihrem Hügel über der Stadt; Pashupatinath, der heiligste Hindu-Tempel Nepals, wo Nicht-Hindus die Ghats am Fluss vom anderen Ufer aus betrachten; und die große weiße Kuppel von Boudhanath, die Pilger in der Abenddämmerung umrunden.";
const chitwanDay =
  "Ein ganzer Tag im Chitwan-Nationalpark. Im Morgengrauen treibt ein Einbaum den Rapti hinunter, vorbei an Gavialen, Sumpfkrokodilen und Flussvögeln, dann folgt eine geführte Dschungelwanderung den Tierspuren. Am Nachmittag bietet eine Jeepsafari ins Grasland die besten Chancen auf Panzernashörner, Hirsche und mit viel Glück einen Tiger. Die Mittagshitze verbringst du ruhend in der Lodge.";

/** German day descriptions for the tours and adventures, keyed like the English. */
export const toursDe: Record<string, Record<string, string>> = {
  "bardia-national-park-safari": {
    "1": "Ein etwa einstündiger Flug nach Nepalgunj, dann rund drei Stunden Fahrt nach Thakurdwara am Rand des Bardia-Nationalparks. Am späten Nachmittag gehst du durch ein Tharu-Dorf oder besuchst die Parkverwaltung.",
    "2": "Ein ganzer Tag zu Fuß mit lizenzierten Naturführern: auf Tigerspuren an den Ufern des Karnali und mit stillem Warten auf Beobachtungstürmen über dem Grasland. Tigersichtungen sind nie garantiert, aber gerade die Chance darauf macht Bardia besonders.",
    "3": "Eine ganztägige Jeepsafari tief in den Park, mit einem Halt am Karnali auf der Suche nach Flussdelfinen, Gavialen und Sumpfkrokodilen sowie wilden Elefanten und Hirschen in Wald und Grasland.",
    "4": "Eine frühe Vogelwanderung am Rand des Parks, dann die Fahrt nach Nepalgunj und der Flug zurück nach Kathmandu.",
  },
  "bhutan-add-on-tour": {
    "1": "Ein Flug von Kathmandu nach Paro, an klaren Tagen mit Himalaya-Blick von der linken Seite des Flugzeugs. Dein bhutanischer Guide holt dich ab für die Fahrt nach Thimphu, der Hauptstadt.",
    "2": "In Thimphu besuchst du die riesige Buddha-Dordenma-Statue, den National Memorial Chorten und den Tashichho Dzong. Dann steigt die Straße zum Dochula-Pass mit seinen 108 Chörten und Bergblicken und führt hinunter ins warme Tal von Punakha.",
    "3": "Ein Besuch im Punakha Dzong, einer Klosterburg am Zusammenfluss zweier Flüsse, an der langen Hängebrücke daneben und in Chimi Lhakhang, bevor es über den Pass zurück nach Paro geht.",
    "4": "Die Wanderung zum Paro Taktsang, dem Tigernest, einem Kloster, das etwa 900 m über dem Tal an einer Felswand klebt. Der Aufstieg dauert in ruhigem Tempo zwei bis drei Stunden. Am Nachmittag kannst du den Rinpung Dzong oder das Nationalmuseum besuchen.",
    "5": "Der Flug von Paro zurück nach Kathmandu.",
  },
  "bungee-and-canyon-swing-adventure": {
    "1": "Eine drei- bis vierstündige Fahrt von Kathmandu über den Araniko Highway zu The Last Resort nahe der tibetischen Grenze. Nach einer ausführlichen Sicherheitseinweisung springst du von der Hängebrücke hoch über dem Bhote Koshi, am Bungee oder am Canyon Swing. Danach geht es zurück nach Kathmandu, oder du übernachtest in Zelten am Fluss.",
  },
  "chitwan-national-park-safari": {
    "1": "Ein kurzer Flug nach Bharatpur oder eine fünf- bis siebenstündige Fahrt nach Sauraha am Rand des Chitwan-Nationalparks. Am Nachmittag gehst du durch ein Tharu-Dorf, siehst den Sonnenuntergang über dem Rapti und abends den traditionellen Stocktanz der Tharu.",
    "2": `${chitwanDay} Du kannst auch die Elefanten-Aufzuchtstation besuchen.`,
    "3": "Auf Wunsch eine frühe Vogelwanderung, dann ein Flug von Bharatpur nach Kathmandu oder die Weiterfahrt nach Pokhara oder Lumbini.",
  },
  "everest-helicopter-tour": {
    "1": "Der Hubschrauber startet im ersten Licht in Kathmandu und fliegt am Himalaya entlang nach Lukla zum Tanken, dann das Khumbu-Tal hinauf über Namche Bazaar und Tengboche bis zum Everest Base Camp und zum Khumbu-Gletscher. Wenn Wetter und Vorschriften es erlauben, landest du am Kala Patthar gegenüber dem Everest für ein paar Minuten Fotos. Auf dem Rückweg frühstückst du im Hotel Everest View mit Everest und Ama Dablam im Blick und bist am späten Vormittag zurück in Kathmandu.",
  },
  "kathmandu-valley-heritage-tour": {
    "1": kathmanduSites,
    "2": "Der Durbar-Platz von Patan mit seinen Tempeln, Palasthöfen und dem Patan-Museum für sakrale Kunst; dann Bhaktapur, eine mittelalterliche Newar-Stadt aus Ziegelgassen, Töpferplätzen und mehrstöckigen Tempeln, für deren ganze Altstadt dein Ticket gilt. Der Tag endet in Changu Narayan, einem der ältesten Tempel im Tal, auf einem Hügel über den Feldern.",
  },
  "lumbini-pilgrimage-tour": {
    "1": "Ein kurzer Flug von Kathmandu nach Bhairahawa, dann etwa 22 km Fahrt nach Lumbini. Am Abend gehst du durch den Heiligen Garten, während der Gesang der Mönche die Luft erfüllt.",
    "2": "Ein Tag am Geburtsort des Buddha: der Maya-Devi-Tempel mit dem Stein, der seine Geburtsstelle markiert, die Ashoka-Säule und der Teich Puskarini, dann die Klöster, die buddhistische Länder in der östlichen und westlichen Klosterzone gebaut haben, und die Weltfriedenspagode. Im Tempel werden die Schuhe ausgezogen.",
    "3": "Auf Wunsch ein Besuch der Ruinen von Tilaurakot, die mit der alten Stadt Kapilavastu verbunden werden, dann der Flug von Bhairahawa zurück nach Kathmandu.",
  },
  "mountain-biking-kathmandu-valley": {
    "1": "Ein Transfer nach Budhanilkantha, dann eine Fahrt hinauf in den Wald des Shivapuri-Nagarjun-Nationalparks, vorbei an Mulkharka bis Chisapani am Talrand, mit der Langtang-Kette im Norden.",
    "2": "Über Jeeppisten und Dorfwege am nördlichen und östlichen Talrand entlang, durch Tamang-Dörfer und Terrassenfelder, nach Nagarkot zum Sonnenuntergang über dem Himalaya.",
    "3": "Großteils abseits der Straße von Nagarkot über Nala in die Altstadt von Dhulikhel, dann hinauf zum buddhistischen Kloster Namobuddha auf seinem bewaldeten Kamm.",
    "4": "Hinunter nach Panauti, einer Newar-Stadt mit alten Tempeln am Zusammenfluss zweier Flüsse, dann ein Anstieg zum Waldkamm von Lakuri Bhanjyang.",
    "5": "Singletrail auf dem Kamm und eine lange Abfahrt nach Godawari am Fuß des Phulchowki, dann ein Transfer zurück zu deinem Hotel in Kathmandu.",
  },
  "nepal-cultural-heritage-tour": {
    "1": "Ankunft in Kathmandu: Wir holen dich am Flughafen ab und bringen dich zu deinem Hotel. Der Abend ist frei, um Thamel zu erkunden.",
    "2": kathmanduSites,
    "3": "Der Durbar-Platz von Patan und die mittelalterliche Stadt Bhaktapur, dann eine Fahrt hinauf nach Nagarkot am Talrand zum Sonnenuntergang über dem Himalaya.",
    "4": "Sonnenaufgang über dem Himalaya in Nagarkot, dann eine Fahrt hinunter ins Tiefland nach Sauraha am Rand des Chitwan-Nationalparks.",
    "5": `${chitwanDay} Am Abend besuchst du ein Tharu-Dorf.`,
    "6": "Eine fünf- bis sechsstündige Fahrt durch die Hügel nach Pokhara am Phewa-See unter den Annapurnas.",
    "7": "Sonnenaufgang über den Annapurnas in Sarangkot, mit dem Boot zum Tal-Barahi-Tempel im Phewa-See, der Weg hinauf zur Weltfriedenspagode und Besuche bei den Davis Falls, der Gupteshwor-Mahadev-Höhle und im International Mountain Museum.",
    "8": "Etwa zwei Stunden Fahrt nach Bandipur, einem erhaltenen Newar-Bergbasar mit alten Häusern und Steinpflastergassen, mit Zeit zum Erkunden zu Fuß.",
    "9": "Sonnenaufgang über dem Himalaya in Bandipur, dann die Fahrt zurück nach Kathmandu.",
    "10": departure,
  },
  "nepal-white-water-rafting": {
    "1": "Etwa drei Stunden Fahrt von Kathmandu zur Einstiegsstelle am Trishuli. Nach einer Sicherheitseinweisung führen dich deine Flussguides durch Stromschnellen, die spannend, aber für Einsteiger geeignet sind; übernachtet wird im Lager am Fluss.",
    "2": "Ein weiterer Vormittag auf dem Trishuli bis zur Ausstiegsstelle bei Mugling, dann die Fahrt zurück nach Kathmandu oder weiter nach Pokhara oder Chitwan. Da der Fluss Richtung Chitwan fließt, lässt sich die Tour gut mit einer Safari verbinden.",
  },
  "pokhara-lakeside-tour": {
    "1": "Eine Fahrt vor Sonnenaufgang nach Sarangkot zum Sonnenaufgang über Annapurnas, Machhapuchhre und Dhaulagiri. Dann mit dem Boot über den Phewa-See zum Inseltempel Tal Barahi und weiter ans Südufer für den Weg hinauf zur Weltfriedenspagode, bevor du die Davis Falls und die Gupteshwor-Mahadev-Höhle besuchst.",
    "2": "Das International Mountain Museum, die tiefe, enge Schlucht des Seti, der Bindhyabasini-Tempel und der alte Basar von Pokhara, auf Wunsch mit einem Nachmittag am ruhigeren Begnas-See.",
  },
  "pokhara-paragliding": {
    "1": "Abholung an deinem Hotel in Pokhara und eine Jeepfahrt hinauf zum Startkamm in Sarangkot. Nach Einweisung und Gurtcheck mit deinem lizenzierten Piloten heben dich ein paar Laufschritte vom Hang ab zu einem Tandemflug über das Tal von Pokhara und den Phewa-See, die Annapurnas vor dir. Du landest am See in Khapaudi und wirst zurück zu deinem Hotel gefahren.",
  },
  "tibet-add-on-tour": {
    "1": "Ein Tag in Kathmandu, während das Gruppenvisum für Tibet fertiggestellt wird, mit einer Einweisung zur Reise und zur Höhe.",
    "2": "Ein Flug über den Himalaya zum Flughafen Lhasa Gonggar, wo dein tibetischer Guide dich mit dem Tibet Travel Permit abholt. Auf 3.656 m ist der Rest des Tages zum Ausruhen da, um die Akklimatisierung zu unterstützen.",
    "3": "Der Potala-Palast, einstiger Winterpalast der Dalai Lamas, der über der Stadt aufragt, dann der Jokhang-Tempel, der heiligste Tibets, und der Pilgerrundgang Barkhor um ihn herum.",
    "4": "Die großen Klöster Drepung und Sera. In Sera kannst du am Nachmittag die lebhaften Debatten der Mönche im Hof erleben.",
    "5": "Ein Tagesausflug über den Kamba-La-Pass zum Yamdrok-See (etwa 4.441 m), einem türkisfarbenen See zwischen hohen Bergen, oder mehr Zeit in Lhasa.",
    "6": "Der Flug von Lhasa zurück nach Kathmandu.",
  },
};

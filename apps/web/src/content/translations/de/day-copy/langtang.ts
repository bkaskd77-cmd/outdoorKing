const toSyabrubesi =
  "Eine sieben- bis neunstündige Fahrt von Kathmandu nach Norden, am Trishuli entlang und eine kurvige Bergstraße hinauf über Dhunche nach Syabrubesi, dem Ausgangspunkt am Zusammenfluss von Bhote Koshi und Langtang Khola.";
const toLamaHotel =
  "Der Weg überquert den Fluss und folgt dem Langtang Khola flussaufwärts durch Wald aus Eichen, Ahorn und Rhododendron, vorbei an Bamboo und Rimche, nach Lama Hotel. In diesen Wäldern leben Languren und mit etwas Glück Rote Pandas.";
const toLangtangVillage =
  "Der Wald lichtet sich, während sich das Tal hinter dem Armeeposten Ghoda Tabela weitet, darüber der Langtang Lirung. Das Dorf Langtang, beim Erdbeben 2015 von einer Lawine verschüttet, haben seine Tamang-Familien ein Stück weiter talaufwärts wieder aufgebaut.";
const toKyanjin =
  "Ein kurzer Weg vorbei an langen Mani-Mauern, Gebetsmühlen und dem Weiler Mundu nach Kyanjin Gompa (3.870 m), einem Lodgedorf um ein kleines Kloster, umgeben von Gletschern. Die Käserei vor Ort verkauft Yakkäse.";
const kyanjinHike =
  "Eine Tageswanderung ab Kyanjin Gompa: entweder auf den Kyanjin Ri (4.773 m), ein paar Stunden hin und zurück, oder der längere Aufstieg auf den Tserko Ri (4.984 m), den besten Aussichtspunkt im Tal, mit dem Langtang Lirung und den Gletschern rundum. Zum Schlafen kehrst du nach Kyanjin zurück.";
const kyanjinToLama =
  "Ein langer, leichter Abstieg durch das Tal zurück über das Dorf Langtang und Ghoda Tabela in den Wald bei Lama Hotel.";
const lamaToSyabrubesi =
  "Durch den Wald am Langtang Khola hinunter nach Syabrubesi, mit einer heißen Dusche am Ende des Wegs.";
const backToKathmandu =
  "Die Fahrt zurück nach Kathmandu über die Bergstraße und am Trishuli entlang, Ankunft am Nachmittag.";

/** German day descriptions for the Langtang and Helambu trips, keyed like the English. */
export const langtangDe: Record<string, Record<string, string>> = {
  "langtang-valley-trek": {
    "1": toSyabrubesi,
    "2": toLamaHotel,
    "3": toLangtangVillage,
    "4": toKyanjin,
    "5": kyanjinHike,
    "6": kyanjinToLama,
    "7": lamaToSyabrubesi,
    "8": backToKathmandu,
  },
  "langtang-gosainkunda-trek": {
    "1": toSyabrubesi,
    "2": toLamaHotel,
    "3": toLangtangVillage,
    "4": toKyanjin,
    "5": kyanjinHike,
    "6": kyanjinToLama,
    "7": "Das Tal hinunter, dann auf den oberen Weg quer über den Hang nach Thulo Syabru, einem Tamang-Dorf entlang eines Kamms, mit Blick zurück zum Langtang Lirung.",
    "8": "Ein stetiger Aufstieg durch den Wald vorbei an Dursagang nach Sing Gompa (Chandanbari) mit seinem kleinen Kloster und einer Käserei und den ersten Blicken auf den Ganesh Himal.",
    "9": "Oberhalb der Baumgrenze steigt der Weg über Cholangpati und Laurebina, mit Blick von den Annapurnas bis zu Manaslu und Ganesh Himal, nach Gosainkunda (4.380 m). Der heilige See, den Shiva geschaffen haben soll, zieht beim Vollmond im August Tausende Pilger an.",
    "10": "Der Weg führt an kleineren Seen vorbei und steigt zum Laurebina La (4.610 m), dem höchsten Punkt des Treks. Ein langer, felsiger Abstieg führt nach Helambu, über Phedi nach Ghopte.",
    "11": "Ein Aufstieg nach Tharepati mit Blick auf den Jugal Himal, dann durch den Wald hinunter vorbei an Mangengoth ins Dorf Kutumsang auf seinem Kamm.",
    "12": "Über den bewaldeten Kamm durch Gul Bhanjyang und Chipling nach Chisapani, dem Dorf des „kalten Wassers“, mit Blick nach Norden auf die Ketten von Langtang und Jugal.",
    "13": "Ein letzter Weg durch den Wald des Shivapuri-Nagarjun-Nationalparks, vorbei an Borlang Bhanjyang, hinunter nach Sundarijal am Rand des Kathmandu-Tals, dann eine kurze Fahrt zu deinem Hotel.",
  },
  "helambu-trek": {
    "1": "Eine kurze Fahrt nach Sundarijal am Rand des Kathmandu-Tals, dann ein Aufstieg durch den Wald des Shivapuri-Nagarjun-Nationalparks, vorbei an einem Stausee, nach Chisapani, mit Blick nach Norden auf die Ketten von Langtang und Jugal.",
    "2": "Über bewaldete Kämme und durch Bauerndörfer, vorbei an Pati Bhanjyang, nach Kutumsang, einem Dorf auf einem Kamm im Land der Hyolmo.",
    "3": "Ein Aufstieg durch Rhododendronwald, vorbei an den Hirtenhütten von Magen Goth, nach Tharepati (3.640 m), dem höchsten Punkt des Treks, mit weitem Blick auf den Himalaya vom Langtang bis zum Jugal Himal.",
    "4": "Ein steiler Abstieg durch den Wald nach Melamchi Gaon, dem ersten großen Hyolmo-Dorf, mit seinem Kloster über Terrassenfeldern.",
    "5": "Hinunter zum Melamchi Khola und auf der anderen Seite hinauf nach Tarkeghyang, einem großen Hyolmo-Dorf mit dicht gedrängten Steinhäusern und einem alten Kloster.",
    "6": "Eine leichte Wanderung am Hang entlang durch Wald und Apfelgärten nach Sermathang, einem ruhigen Dorf mit Kloster und Blick zurück talaufwärts.",
    "7": "Durch Terrassenfelder hinunter nach Melamchi Pul Bazaar, dann zwei bis drei Stunden Fahrt zurück nach Kathmandu.",
  },
  "tamang-heritage-trail": {
    "1": toSyabrubesi,
    "2": "Ein Aufstieg über Goljung nach Gatlang, einem großen Tamang-Dorf mit geschnitzten Holzhäusern. Bei Familien erlebst du den Alltag im Dorf und abends traditionelle Lieder und Tänze. Der kleine See Parvati Kunda liegt ein kurzes Stück entfernt.",
    "3": "Vorbei am Wasserkraftwerk Chilime und durch Wald hinauf nach Tatopani, wo natürliche heiße Quellen den Tag perfekt abschließen.",
    "4": "Ein Aufstieg zum Aussichtspunkt Nagthali (etwa 3.165 m), einer Hochwiese mit Blick auf Langtang, Ganesh Himal und die Berge Tibets, dann hinunter nach Thuman, einem traditionellen Tamang-Dorf.",
    "5": "Hinunter nach Timure an der alten Handelsroute nach Tibet, nahe der historischen Festung Rasuwagadhi und dem Grenzübergang.",
    "6": "Eine Wanderung am Hang entlang nach Briddim, einem Tamang-Dorf, in dem die Gemeinde Privatunterkünfte betreibt und Gäste mit einheimischem Essen empfängt.",
    "7": "Über Wangel hinunter nach Syabrubesi und zum Ende des Wegs.",
    "8": backToKathmandu,
  },
  "yala-peak-climbing": {
    "1": `${toSyabrubesi} Wir holen dich morgens in deinem Hotel in Kathmandu ab.`,
    "2": toLamaHotel,
    "3": toLangtangVillage,
    "4": toKyanjin,
    "5": "Ein Akklimatisierungstag in Kyanjin Gompa mit einer Wanderung auf den Kyanjin Ri (4.773 m) und Zeit für deinen Bergführer, die Ausrüstung zu prüfen und mit dir Steigeisen und Seil zu üben.",
    "6": "Ein Aufstieg über Kyanjin durch die Yakweiden von Yala Kharka zum Hochlager (etwa 4.600 m), wo du im Zelt schläfst, mit Blick auf den Langtang Lirung.",
    "7": "Start zum Gipfel vor Sonnenaufgang. Die Route quert Schneehänge und führt in leichter Kletterei über Fels zu einem kurzen, steilen Gipfelaufbau (5.732 m), mit dem Shishapangma, einem der vierzehn Achttausender, jenseits der Grenze in Tibet im Blick. Du steigst nach Kyanjin Gompa ab.",
    "8": "Ein Reservetag, falls das Wetter den Gipfel verzögert. Wird er nicht gebraucht, bleibt Zeit für eine Wanderung talaufwärts Richtung Langshisa-Gletscher.",
    "9": kyanjinToLama,
    "10": lamaToSyabrubesi,
    "11": backToKathmandu,
  },
};

import { arriveKathmandu, climbPermitDay as climbPrep } from "./shared";

// German for the days shared by the Khumbu treks and climbs.
const luklaFlight =
  "Ein früher Flug in die Berge landet auf der kurzen, steilen Piste von Lukla, einer der spektakulärsten der Welt. In den vollsten Monaten starten die Flüge nach einer Fahrt vor Sonnenaufgang in Manthali (Ramechhap). Von Lukla führt der Weg sanft bergab am Dudh Kosi entlang nach Phakding, ein kurzer erster Tag für den langsamen Aufstieg.";
const toNamche =
  "Der Weg folgt dem Dudh Kosi über schwankende Hängebrücken nach Monjo, wo du den Sagarmatha-Nationalpark betrittst, ein UNESCO-Welterbe. Nach der hohen Hillary-Brücke kommt der lange, steile Aufstieg nach Namche Bazaar, an klaren Tagen mit einem ersten Blick auf den Everest. Namche ist der Handelsort des Khumbu, gebaut in einem Hufeisen aus Terrassen.";
const namcheRest =
  "Ein Ruhetag zum Akklimatisieren nach der Regel: hoch gehen, tief schlafen. Eine Morgenwanderung führt hinauf nach Syangboche und zur Terrasse des Hotel Everest View (etwa 3.880 m) mit Panorama auf Everest, Lhotse und Ama Dablam, dann weiter nach Khumjung mit der Schule, die Edmund Hillary gegründet hat. Zurück in Namche bleibt Zeit für Bäckereien, Läden und das Sherpa-Museum.";
const toTengboche =
  "Ein Höhenweg hoch über dem Dudh Kosi, die Ama Dablam vor dir, führt nach Phunki Thanga am Fluss. Ein stetiger Aufstieg durch Rhododendron- und Kiefernwald erreicht dann Tengboche mit dem größten Kloster des Khumbu, auf einem Kamm gegenüber dem Everest. Wenn du rechtzeitig ankommst, kannst du beim Nachmittagsgebet der Mönche dabei sein.";
const toDingboche =
  "Der Weg fällt durch den Wald ab, quert den Imja Khola und steigt nach Pangboche, wo über dem Dorf das älteste Kloster der Region steht. Oberhalb der Baumgrenze öffnet sich das Tal bis Dingboche, einem Dorf mit steinummauerten Gerstenfeldern unter der Ama Dablam und der Lhotse-Wand.";
const dingbocheRest =
  "Ein zweiter Akklimatisierungstag. Am Morgen steigst du auf den Kamm des Nangkartshang hinter dem Dorf und gewinnst mehrere Hundert Meter mit Blick auf Makalu, Lhotse, Ama Dablam und Island Peak; dann geht es zum Ausruhen zurück nach Dingboche. Dein Guide prüft vor dem weiteren Aufstieg, wie es allen geht.";
const toLobuche =
  "Der Weg steigt auf die offene Hochfläche über Pheriche und erreicht Thukla (Dughla) am Fuß der Moräne des Khumbu-Gletschers. Ein steiler Aufstieg führt zum Thukla-Pass mit den Gedenksteinen für Bergsteiger, die am Everest gestorben sind, bevor ein leichterer Weg neben der Moräne nach Lobuche führt.";
const toBaseCamp =
  "Am Rand des Khumbu-Gletschers erreichst du Gorak Shep, die letzte Siedlung am Weg, neben einem gefrorenen Seebett. Nach dem Mittagessen gehst du weiter über die Moräne zum Everest Base Camp (5.364 m) am Fuß des Khumbu-Eisbruchs, wo sich im Frühjahr die Expeditionszelte sammeln, und kehrst zur Übernachtung nach Gorak Shep zurück.";
const kalaPatthar =
  "Früher Start zum Aufstieg auf den Kala Patthar (5.545 m), etwa 1,5 bis 2 Stunden über Gorak Shep, der beste Ort, um den Gipfel des Everest zu sehen, der vom Base Camp aus verdeckt ist. Der Sonnenaufgang lässt Everest, Nuptse und Pumori ringsum leuchten. Nach dem Frühstück in Gorak Shep steigst du ab, um tiefer zu schlafen.";
const phericheToNamche =
  "Ein langer, aber leichter Abstieg über Pangboche, dann wieder hinauf nach Tengboche und durch den Wald hinunter zum Dudh Kosi. Der letzte Anstieg bringt dich zurück nach Namche Bazaar, mit dichterer Luft und einer warmen Bäckerei.";
const namcheToLukla =
  "Der letzte Tag zu Fuß führt auf dem Hinweg zurück den Dudh Kosi hinunter, über die Hillary-Brücke und vorbei an Monjo und Phakding. Ein letzter Anstieg bringt dich nach Lukla, wo das Team das Ende des Treks meist gemeinsam feiert.";
const luklaToKathmandu =
  "Ein Morgenflug zurück nach Kathmandu oder nach Manthali mit anschließender Fahrt. Das Bergwetter kann Flüge verzögern, deshalb bleibt der Nachmittag frei. In Kathmandu ist Zeit für eine heiße Dusche und einen Bummel durch Thamel.";
const bufferDay =
  "Ein Reservetag in Kathmandu, falls das Wetter den Flug ab Lukla verzögert. Liefen die Flüge planmäßig, ist er frei für Besichtigungen im Kathmandu-Tal, zum Einkaufen oder Ausruhen vor deinem Heimflug.";

const machhermoRoute =
  "Von Namche steigt der Weg zum Mong La, einem Kamm mit einem Chörten und einem der schönsten Blicke auf die Ama Dablam. Dann geht es hinunter nach Phortse Thanga am Dudh Kosi und durch Rhododendronwald hinauf zur kleinen Siedlung Dole.";
const toMachhermo =
  "Ein kurzer Anstieg an der offenen Talflanke, vorbei an den Sommer-Yakweiden von Luza, bringt dich nach Machhermo mit Blick hinauf zum Cho Oyu. Der kurze Tag hilft beim Akklimatisieren, und der Nachmittag ist frei zum Ausruhen oder für eine kurze Wanderung über dem Dorf.";
const toGokyo =
  "Der Weg steigt auf die Moräne neben dem Ngozumpa, einem der längsten Gletscher des Himalaya, und führt am ersten und zweiten Gokyo-See vorbei. Das Dorf Gokyo liegt am Ufer des dritten Sees, Dudh Pokhari, dessen türkisfarbenes Wasser von Gipfeln umringt ist.";
const gokyoRi =
  "Vor Sonnenaufgang steigst du auf den Gokyo Ri (5.357 m) über dem Dorf. Vom Gipfel stehen Everest, Lhotse, Makalu und Cho Oyu, vier der sechs höchsten Berge der Welt, in einem Panorama über den Seen und dem Ngozumpa-Gletscher. Der Rest des Tages ist zum Ausruhen oder für eine Wanderung talaufwärts zum vierten und fünften See.";
const choLaFromThagnak =
  "Der schwerste Tag der Route beginnt vor Sonnenaufgang. Ein steiler, felsiger Aufstieg führt zum Cho La (5.420 m), gefolgt von einer kurzen Gletscherquerung auf der anderen Seite, bei der leichte Steigeisen oder Grödel helfen. Der Abstieg ist steil und lose, bevor der Weg sanfter nach Dzongla unter dem Cholatse führt.";
const gokyoToThagnak =
  "Ein kurzer Tag über den Ngozumpa-Gletscher auf einem markierten Pfad über schuttbedecktes Eis nach Thagnak (Dragnag) am Fuß des Cho La. Die frühe Ankunft lässt Zeit zum Ausruhen und zur Vorbereitung auf den Pass.";

/** German day descriptions for the Khumbu trips, keyed like the English. */
export const everestDe: Record<string, Record<string, string>> = {
  "everest-base-camp-trek": {
    "1": arriveKathmandu,
    "2": luklaFlight,
    "3": toNamche,
    "4": namcheRest,
    "5": toTengboche,
    "6": toDingboche,
    "7": dingbocheRest,
    "8": toLobuche,
    "9": toBaseCamp,
    "10": `${kalaPatthar} Heute wanderst du hinunter nach Pheriche, wo die Himalayan Rescue Association in der Saison eine Hilfsstation betreibt.`,
    "11": phericheToNamche,
    "12": namcheToLukla,
    "13": luklaToKathmandu,
    "14": bufferDay,
  },
  "everest-three-passes-trek": {
    "1": arriveKathmandu,
    "2": luklaFlight,
    "3": toNamche,
    "4": namcheRest,
    "5": toTengboche,
    "6": toDingboche,
    "7": dingbocheRest,
    "8": "Eine kurze Wanderung das Imja-Tal hinauf nach Chhukung, der letzten Siedlung unter der Lhotse-Südwand und dem Island Peak. Der Nachmittag ist frei für eine Akklimatisierungswanderung Richtung Chhukung Ri und zur Vorbereitung auf den ersten Pass.",
    "9": "Der längste und höchste Tag des Treks. Ein früher Start führt an kleinen Seen vorbei hinauf zum Kongma La (5.535 m), dem höchsten der drei Pässe, mit Blick über den Khumbu. Ein steiler Abstieg und eine mühsame Querung des schuttbedeckten Khumbu-Gletschers bringen dich nach Lobuche.",
    "10": toBaseCamp,
    "11": `${kalaPatthar} Heute steigst du nach Lobuche ab und biegst auf einem Höhenweg nach Westen ab nach Dzongla, gegenüber von Cholatse und Taboche.`,
    "12": "Der zweite Passtag, Start vor Sonnenaufgang. Ein felsiger Aufstieg führt zum Cho La (5.420 m); kurz unter dem Pass wird ein kurzer Gletscherabschnitt mit leichten Steigeisen oder Grödeln gequert, und der Abstieg nach Westen ist steil und lose. Dann führt der Weg sanfter hinunter nach Thagnak (Dragnag) neben dem Ngozumpa-Gletscher.",
    "13": "Ein kurzer Tag über den Ngozumpa-Gletscher auf einem markierten Pfad über schuttbedecktes Eis, dann am Seeufer entlang zum Dorf Gokyo am dritten See, Dudh Pokhari. Der Nachmittag ist frei zum Ausruhen am türkisfarbenen Wasser.",
    "14": gokyoRi,
    "15": "Der dritte Passtag. Der Weg steigt über dem See zum Renjo La (5.360 m), wo der Blick zurück über Gokyo zum Everest einer der schönsten in Nepal ist. Eine lange Steintreppe führt auf der anderen Seite hinunter nach Lungden im abgelegenen Bhote-Koshi-Tal.",
    "16": "Ein sanfter Abstieg durch das Bhote-Koshi-Tal auf der alten Handelsroute zum Nangpa La und nach Tibet, vorbei an Marlung, nach Thame. Das Dorf ist die Heimat vieler Everest-Sherpas, und sein Kloster liegt am Hang darüber.",
    "17": "Eine kurze, leichte Wanderung durch das Bhote-Koshi-Tal über das Dorf Thamo zurück nach Namche Bazaar, wo sich die Runde schließt.",
    "18": namcheToLukla,
    "19": luklaToKathmandu,
    "20": bufferDay,
  },
  "gokyo-cho-la-everest-base-camp-trek": {
    "1": arriveKathmandu,
    "2": luklaFlight,
    "3": toNamche,
    "4": namcheRest,
    "5": machhermoRoute,
    "6": toMachhermo,
    "7": toGokyo,
    "8": gokyoRi,
    "9": gokyoToThagnak,
    "10": choLaFromThagnak,
    "11": "Eine kurze Wanderung um den Hang von Dzongla, die Ama Dablam und das Khumbu-Tal vor dir, trifft in Lobuche auf den Hauptweg zum Everest Base Camp.",
    "12": toBaseCamp,
    "13": `${kalaPatthar} Heute wanderst du hinunter nach Pheriche, wo die Himalayan Rescue Association in der Saison eine Hilfsstation betreibt.`,
    "14": phericheToNamche,
    "15": namcheToLukla,
    "16": luklaToKathmandu,
    "17": bufferDay,
  },
  "gokyo-lakes-trek": {
    "1": arriveKathmandu,
    "2": luklaFlight,
    "3": toNamche,
    "4": namcheRest,
    "5": machhermoRoute,
    "6": toMachhermo,
    "7": toGokyo,
    "8": gokyoRi,
    "9": "Der Weg führt das Tal zurück hinunter, vorbei an den Seen und Machhermo, den Cho Oyu im Rücken, nach Dole.",
    "10": "Ein Abstieg durch Rhododendronwald nach Phortse Thanga, dann der Aufstieg über den Mong La und der Höhenweg zurück nach Namche Bazaar.",
    "11": namcheToLukla,
    "12": `${luklaToKathmandu} Wir empfehlen, vor deinem internationalen Flug einen Reservetag in Kathmandu einzuplanen.`,
  },
  "everest-view-trek": {
    "1": `${luklaFlight} Wir holen dich vor dem Flug in deinem Hotel in Kathmandu ab.`,
    "2": toNamche,
    "3": "Eine Akklimatisierungswanderung von Namche nach Syangboche und zur Terrasse des Hotel Everest View (etwa 3.880 m) mit Panorama auf Everest, Lhotse und Ama Dablam. Der Weg führt weiter nach Khumjung mit seinem Kloster und der Schule, die Edmund Hillary gegründet hat, und dann zurück nach Namche.",
    "4": toTengboche,
    "5": "Sonnenaufgang über Everest und Ama Dablam in Tengboche, dann führt der Weg durch den Wald hinunter zum Dudh Kosi und auf dem Höhenweg zurück nach Namche Bazaar.",
    "6": namcheToLukla,
    "7": luklaToKathmandu,
    "8": bufferDay,
  },
  "island-peak-climbing": {
    "1": arriveKathmandu,
    "2": climbPrep,
    "3": luklaFlight,
    "4": toNamche,
    "5": namcheRest,
    "6": toTengboche,
    "7": toDingboche,
    "8": dingbocheRest,
    "9": toLobuche,
    "10": toBaseCamp,
    "11": `${kalaPatthar} Heute geht der lange Abstieg weiter bis Dingboche, eine wohlverdiente Erholung vor der Besteigung.`,
    "12": "Eine kurze Wanderung das Imja-Tal hinauf nach Chhukung, der letzten Siedlung unter der Lhotse-Südwand, mit dem Island Peak vor dir. Der Nachmittag ist frei zum Ausruhen.",
    "13": "Eine sanfte Wanderung neben der Moräne des Imja-Gletschers zum Island Peak Base Camp (Pareshaya Gyab), wo du die nächsten Nächte mit einem Lagerteam in Zelten verbringst.",
    "14": "Ein Übungstag im Basislager. Dein Bergführer übt mit dir das Anlegen der Steigeisen, das Gehen im Schnee, die Steigklemme am Fixseil und das Abseilen, damit dir am Gipfeltag jeder Handgriff vertraut ist. Manche Teams steigen am Nachmittag ins Hochlager (etwa 5.600 m) auf.",
    "15": "Der Gipfeltag beginnt gegen Mitternacht. Eine felsige Rinne führt zum Steigeisendepot (etwa 5.800 m), dann quert die Route den Gletscher und steigt an Fixseilen die steile Schnee- und Eisflanke hinauf zu einem kurzen, luftigen Gipfelgrat. Vom Gipfel (6.165 m) ragt der Lhotse über dir auf. Du steigst bis nach Chhukung ab.",
    "16": "Ein Reservetag, falls Wetter oder Verhältnisse den ersten Gipfelversuch verhindern. Wird er nicht gebraucht, bleibt mehr Ruhe für den Abstieg.",
    "17": "Ein langer Abstieg durch das Imja-Tal, vorbei an Dingboche und Pangboche, dann der Aufstieg durch den Wald nach Tengboche.",
    "18": "Hinunter durch den Rhododendronwald zum Dudh Kosi und auf dem Höhenweg nach Namche Bazaar.",
    "19": namcheToLukla,
    "20": luklaToKathmandu,
    "21": bufferDay,
  },
  "lobuche-east-peak-climbing": {
    "1": arriveKathmandu,
    "2": climbPrep,
    "3": luklaFlight,
    "4": toNamche,
    "5": namcheRest,
    "6": toTengboche,
    "7": toDingboche,
    "8": dingbocheRest,
    "9": toLobuche,
    "10": toBaseCamp,
    "11": `${kalaPatthar} Heute wanderst du zurück nach Lobuche, an den Fuß des Gipfels.`,
    "12": "Ein Aufstieg über felsige Hänge zum Hochlager am Lobuche East (etwa 5.400 m) zwischen Felsblöcken unter dem Gletscher, wo du im Zelt schläfst. Am Nachmittag übt dein Bergführer mit dir Steigeisen, Steigklemme und Abseilen.",
    "13": "Der Gipfeltag beginnt vor 2 Uhr. Ein felsiger Pfad führt zum Steigeisendepot, dann quert die Route den Gletscher und steigt an Fixseilen über steilen Schnee zum Gipfelgrat, mit Everest, Lhotse und Nuptse nah auf der anderen Talseite. Nach dem Abseilen über die steilen Abschnitte steigst du nach Pheriche ab.",
    "14": "Ein Reservetag, falls das Wetter den ersten Gipfelversuch verhindert. Wird er nicht gebraucht, wird er zu einem ruhigen Erholungstag in Pheriche.",
    "15": phericheToNamche,
    "16": namcheToLukla,
    "17": luklaToKathmandu,
    "18": bufferDay,
  },
  "mera-peak-climbing": {
    "1": `${arriveKathmandu} Dein Bergführer prüft außerdem deine technische Ausrüstung und schließt die Besteigungsgenehmigung ab.`,
    "2": "Ein früher Flug nach Lukla, dann eine Wanderung nach Süden, weg vom Everest-Weg, durch Wald und Felder nach Paiya (Chutok). Von hier führt die Route ins ruhige Hinku-Tal.",
    "3": "Ein Tag mit vielen Auf und Ab durch Rhododendron- und Bambuswald, über den Kari-La-Pass zum Hangdorf Pangom, mit Blick zurück zum Dudh Kosi.",
    "4": "Der Weg umrundet bewaldete Kämme und quert Bäche bis Ningsow, einem kleinen Dorf im Mittelgebirge. Nur wenige Trekkende kommen hier vorbei, die Lodges sind einfach.",
    "5": "Ein Aufstieg durch dichten Wald, in dem Rote Pandas leben, dann hinunter nach Chhatra Khola, einer Siedlung am Fluss in einem engen Tal.",
    "6": "Der Weg biegt nach Norden ins Hinku-Tal ab und folgt dem Fluss durch den Wald, den Mera Peak vor Augen, nach Kothe.",
    "7": "Ein Akklimatisierungstag. Du wanderst das Hinku-Tal hinauf, um Höhe zu gewinnen, und kommst zum Schlafen zurück nach Kothe, nach der Regel: hoch gehen, tief schlafen.",
    "8": "Oberhalb der Baumgrenze weitet sich das Tal zu Yakweiden. Du kommst an der kleinen, in den Fels gehauenen Gompa von Lungsumgba vorbei, bevor du Thangnak unter dem Charpate-Gletscher erreichst.",
    "9": "Ein zweiter Akklimatisierungstag mit einer Wanderung über dem Dorf zum Charpate-Gletscher und seinem See, dann zurück nach Thangnak für die Nacht.",
    "10": "Ein kurzer, aber steiler Aufstieg neben dem Dig-Gletscher nach Khare unter dem Mera-Gletscher, mit der Nordwand des Mera Peak über dem Dorf.",
    "11": "Ein Akklimatisierungs- und Übungstag. Du wanderst Richtung Mera La, um Höhe zu gewinnen, dann übt dein Bergführer mit dir Steigeisen, Seiltechnik und das Gehen auf dem Gletscher.",
    "12": "Über den Mera La (etwa 5.415 m) und den breiten Mera-Gletscher hinauf zum Hochlager (etwa 5.780 m) auf einem Felsvorsprung, mit Blick auf Everest, Makalu und Kanchenjunga. Du schläfst im Zelt.",
    "13": "Der Gipfeltag beginnt nach Mitternacht. Am Seil steigst du mehrere Stunden über gleichmäßige Schneehänge auf dem Gletscher, ohne Steilflanke, und erreichst den Gipfel bei Tagesanbruch. Fünf Achttausender sind im Blick: Everest, Lhotse, Cho Oyu, Makalu und Kanchenjunga. Am selben Tag steigst du nach Khare ab.",
    "14": "Ein Reservetag, falls das Wetter den ersten Gipfelversuch verhindert. Wird er nicht gebraucht, ist er eine wohlverdiente Pause in Khare.",
    "15": "Das Hinku-Tal hinunter über die Weiden von Thangnak nach Kothe und zur Baumgrenze.",
    "16": "Ein Aufstieg aus dem Hinku-Tal Richtung Zatrwa La zu den Hochweiden von Thuli Kharka.",
    "17": "Über den Zatrwa La (etwa 4.610 m) mit einem letzten Blick auf die Hinku-Gipfel und das Dudh-Kosi-Tal, dann ein langer, steiler Abstieg nach Lukla.",
    "18": luklaToKathmandu,
    "19": bufferDay,
    "20": "Abreisetag. Wir bringen dich rechtzeitig zum Flughafen für deinen Heimflug.",
  },
};

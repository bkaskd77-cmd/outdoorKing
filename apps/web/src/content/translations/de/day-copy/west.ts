import { arriveRestricted, departure } from "./shared";

const toNepalgunj =
  "Ein etwa einstündiger Flug nach Westen über das Tiefland nach Nepalgunj, einer lebhaften Stadt nahe der indischen Grenze und Ausgangspunkt für Flüge in den fernen Westen. Der Rest des Tages ist frei, früh ins Bett vor dem Bergflug.";
const toDunai =
  "Ein Flug am frühen Morgen über die Vorberge zur Landebahn in Juphal, dann eine leichte Wanderung hinunter durch Dörfer und Terrassenfelder nach Dunai, dem Verwaltungssitz von Dolpa am Fluss Thuli Bheri. Bergflüge verzögern sich hier oft wegen des Wetters, deshalb bleibt der Plan flexibel.";
const ringmoRest =
  "Ein Ruhetag in Ringmo am Phoksundo-See, dem tiefsten See Nepals, mit leuchtend türkisfarbenem Wasser. Du kannst am Ufer entlang zum Kloster Tshowa der Bön-Religion gehen, einem der ältesten Glauben im Himalaya.";
const backFromJuphal =
  "Morgenflüge von Juphal nach Nepalgunj haben Anschluss nach Kathmandu. Das Bergwetter verzögert sie oft, deshalb planen wir vor deinem internationalen Flug Reservetage ein.";

/** German day descriptions for the Dolpo and Rara trips, keyed like the English. */
export const westDe: Record<string, Record<string, string>> = {
  "upper-dolpo-trek": {
    "1": toNepalgunj,
    "2": toDunai,
    "3": "Der Weg betritt den Shey-Phoksundo-Nationalpark, den größten Nationalpark Nepals, und folgt der engen Schlucht des Suli Gad flussaufwärts durch Wald und kleine Dörfer nach Chhepka.",
    "4": "Die Schlucht hinauf durch Kiefern- und Walnusswald, mehrmals über den Fluss, zur kleinen Siedlung Rechi.",
    "5": "Ein leichter Akklimatisierungstag mit einer kurzen Wanderung über dem Dorf, um vor dem Aufstieg zum Phoksundo-See Höhe zu gewinnen.",
    "6": "Ein Aufstieg vorbei am großen Wasserfall unterhalb des Phoksundo-Sees, dann der erste Blick auf den See vom Kamm, bevor es hinunter nach Ringmo geht, einem Dorf aus Steinhäusern und Chörten am Ufer.",
    "7": ringmoRest,
    "8": "Der Weg folgt dem Westufer des Sees auf einem schmalen, ausgesetzten Pfad, der hoch über dem Wasser in die Felswand gehauen ist, fällt dann zum Phoksundo Khola ab und folgt dem Tal flussaufwärts zum Lager.",
    "9": "Ein Akklimatisierungstag mit einer Wanderung talaufwärts Richtung Kang La, um Höhe zu gewinnen, dann zurück zum Schlafen ins Lager.",
    "10": "Der Weg verlässt den Fluss und steigt durch ein Seitental zum Lager in Phoksundo Bhanjyang unter dem Kang La.",
    "11": "Früher Start zum Kang La (5.360 m) mit Blick über die braunen Hügel von Upper Dolpo. Ein steiler Abstieg führt hinunter nach Shey Gompa, dem Kristallkloster, in seinem verborgenen Tal.",
    "12": "Ein Ruhetag in Shey Gompa unter dem Kristallberg, einem heiligen Gipfel, den Pilger umrunden. Es bleibt Zeit für das Kloster und die nahe Einsiedelei Tsakang.",
    "13": "Über den Saldang La (etwa 5.100 m) mit Blick über das Hochplateau von Upper Dolpo und hinunter nach Namgung mit seinem roten Kloster an der Felswand.",
    "14": "Ein kurzer Weg nach Saldang, dem größten Dorf von Upper Dolpo, ausgebreitet auf einem Kamm über dem Nagon Khola, mit Gersten- und Buchweizenfeldern.",
    "15": "Durch das Tal vorbei an Chörten und kleinen Klöstern nach Sibu, einem Dorf zwischen Terrassenfeldern.",
    "16": "Eine Wanderung talaufwärts durch Yakweiden zum Lager in Jeng La Phedi am Fuß des Passes.",
    "17": "Ein früher Aufstieg zum Jeng La (etwa 5.100 m) mit Blick auf die Dhaulagiri-Kette, dann ein Abstieg ins Tarap-Tal nach Tokyu.",
    "18": "Ein kurzer Weg talabwärts nach Dho Tarap, einem Dorf buddhistischer und Bön-Familien mit mehreren Klöstern.",
    "19": "Ein Ruhetag in Dho Tarap für die Klöster und das Dorfleben vor dem langen Rückweg.",
    "20": "Den Tarap Khola hinunter durch ein enger werdendes Tal mit Wacholder und Wildrosen nach Toltol.",
    "21": "Die Schlucht des Tarap Khola schneidet tief durch die Berge. Der Weg folgt ihr über Felsbänder und Brücken hinunter nach Khanigaon.",
    "22": "Hinunter zum Thuli Bheri und am Fluss entlang nach Tarakot, einem alten befestigten Dorf auf einem Hügel.",
    "23": "Eine leichte Wanderung am Thuli Bheri entlang zurück nach Dunai.",
    "24": "Eine Wanderung zurück hinauf zur Landebahn in Juphal für den Flug am nächsten Tag.",
    "25": backFromJuphal,
  },
  "lower-dolpo-trek": {
    "1": arriveRestricted,
    "2": "Ein Tag in Kathmandu, während die Genehmigung für das Sperrgebiet fertiggestellt wird, mit Zeit für das Kathmandu-Tal oder zum Packen.",
    "3": toNepalgunj,
    "4": toDunai,
    "5": "Eine leichte Wanderung am Thuli Bheri entlang nach Tarakot, einem alten befestigten Dorf auf einem Hügel.",
    "6": "Der Weg biegt ins Tal des Tarap Khola ab und steigt durch Wald nach Laini.",
    "7": "Durch die enge Schlucht des Tarap Khola, über Felsbänder und Brücken, nach Nawarpani.",
    "8": "Die Schlucht öffnet sich ins weite Tarap-Tal, und du erreichst Dho Tarap, ein Dorf buddhistischer und Bön-Familien.",
    "9": "Ein Ruhetag in Dho Tarap zum Akklimatisieren und für die Klöster des Tarap-Tals.",
    "10": "Ein Aufstieg über dem Tal zum Lager im Basislager des Numa La.",
    "11": "Über den Numa La (etwa 5.190 m) mit Blick Richtung Dhaulagiri-Kette und hinunter zum Lager in Pelung Tang.",
    "12": "Über den Baga La (etwa 5.070 m), den zweiten hohen Pass an zwei aufeinanderfolgenden Tagen, dann hinunter nach Dajok Tang.",
    "13": "Ein Abstieg durch den Wald nach Ringmo am Phoksundo-See.",
    "14": ringmoRest,
    "15": "Hinunter vorbei am großen Wasserfall unterhalb des Sees und durch den Wald am Suli Gad nach Shyanta.",
    "16": "Eine leichte Wanderung hinaus zur Landebahn in Juphal.",
    "17": backFromJuphal,
    "18": departure,
  },
  "rara-lake-trek": {
    "1": toNepalgunj,
    "2": "Ein kurzer Flug in die Berge zur Landebahn in Talcha, dann eine gemütliche Wanderung von ein paar Stunden durch Kiefernwald zum Rara-See, dem größten See Nepals, im Rara-Nationalpark.",
    "3": "Eine Wanderung um das Seeufer durch Wald aus Tränenkiefer, Fichte und Wacholder, mit Blick über das klare Wasser auf die Hügel. Auf dem See siehst du vielleicht Wasservögel, im Wald Moschustiere oder Languren.",
    "4": "Eine Wanderung auf den Murma Top (etwa 3.726 m) mit Blick über den ganzen See und an klaren Tagen auf die Schneegipfel des fernen Westens. Zur Übernachtung kehrst du an den See zurück.",
    "5": "Eine Wanderung zurück nach Talcha und ein Flug nach Nepalgunj.",
    "6": "Ein Flug von Nepalgunj zurück nach Kathmandu.",
  },
};

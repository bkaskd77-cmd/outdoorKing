/** German permit pages, keyed by permit slug. */

const restricted =
  "Dies ist ein Sperrgebiet. Nepal stellt Sperrgebietsgenehmigungen nur über eine registrierte Trekkingagentur aus, für Gruppen von mindestens zwei Trekkenden mit einem lizenzierten Guide. Wir beantragen sie in Kathmandu mit Kopien deines Reisepasses und Visums, plane daher nach der Ankunft einen Arbeitstag ein.";

const feeNote =
  "Gebühren für ausländische Staatsangehörige, wie 2026 veröffentlicht. Sie ändern sich von Zeit zu Zeit, daher bestätigt dein Angebot die aktuellen Beträge, und wir bezahlen sie für dich.";

const parkIntro =
  "Alle ausländischen Besucher zahlen eine Eintrittsgebühr, die wir vorab oder am Parkeingang organisieren.";

const parkFees = `## Gebühren
- NPR 3.000 pro Eintritt (SAARC-Staatsangehörige NPR 1.500).
- Kinder unter 10 Jahren: kostenlos.`;

export const permitsDe: Record<
  string,
  { name?: string; authority?: string; notes?: string }
> = {
  tims: {
    name: "TIMS-Karte",
    authority: "Nepal Tourism Board",
    notes: `Die TIMS-Karte (Trekkers' Information Management System) erfasst, wer wo unterwegs ist, damit Trekkende im Notfall gefunden werden können. Sie wird auf den meisten Trekkingrouten außerhalb der Everest-Region benötigt, wo stattdessen die lokale Khumbu-Trekkingkarte gilt.

Seit 2023 wird die Karte nur noch über registrierte Trekkingagenturen an Trekkende ausgegeben, die mit einem lizenzierten Guide gehen. Wir organisieren sie mit deinen anderen Permits.

## Gebühren
- NPR 2.000 (SAARC-Staatsangehörige NPR 1.000).
- In der Everest-Region nicht erhoben, dort gilt die Khumbu-Trekkingkarte.

${feeNote}`,
  },
  "sagarmatha-national-park": {
    name: "Eintritt Sagarmatha-Nationalpark",
    authority: "Department of National Parks and Wildlife Conservation",
    notes: `Der Sagarmatha-Nationalpark, ein UNESCO-Weltnaturerbe, schützt den oberen Khumbu rund um den Everest, von Monjo bis zu den hohen Gipfeln. ${parkIntro}

Das Permit wird am Parkeingang in Monjo kontrolliert, am zweiten Tag der meisten Everest-Treks, und ist für jeden Trek, jede Besteigung und jede Hubschrauberlandung im Park nötig.

## Gebühren
- NPR 3.000 pro Eintritt (SAARC-Staatsangehörige NPR 1.500).
- Kinder unter 10 Jahren: kostenlos.
- Hubschrauberlandungen zahlen eine eigene Gebühr, die dem Betreiber berechnet wird.

${feeNote}`,
  },
  "khumbu-trek-card": {
    name: "Khumbu Pasang Lhamu Trekkingkarte",
    authority: "Gemeinde Khumbu Pasang Lhamu",
    notes: `Die lokale Gemeinde des Khumbu erhebt von allen Trekkenden eine Eintrittsgebühr, die als Trekkingkarte in der Nähe von Lukla eingezogen wird. Sie finanziert Wege und Dienstleistungen in den Dörfern der Region und ersetzt die TIMS-Karte für Treks in der Everest-Region.

Wir organisieren sie zusammen mit deinem Permit für den Sagarmatha-Nationalpark.

## Gebühren
- NPR 3.000 (SAARC- und chinesische Staatsangehörige NPR 2.000), seit Juli 2024.

${feeNote}`,
  },
  acap: {
    name: "Annapurna Conservation Area Permit (ACAP)",
    authority: "National Trust for Nature Conservation",
    notes: `Das Annapurna Conservation Area ist das größte Schutzgebiet Nepals und umfasst die Annapurna-Kette von den Vorbergen bei Pokhara bis Manang und Mustang. Alle Trekkenden brauchen das ACAP-Permit, das Natur- und Gemeinschaftsprojekte in der Region finanziert.

Es wird für die Treks zum Annapurna Base Camp, die Annapurna-Runde, Poon Hill, Mardi Himal und Khopra benötigt, für Upper Mustang und Nar Phu zusätzlich zu deren Sperrgebietsgenehmigungen und für die letzten Tage der Manaslu-Runde. Das Permit wird an mehreren Stellen unterwegs kontrolliert und kostet dort mehr, daher organisieren wir es vorab.

## Gebühren
- NPR 3.000 pro Eintritt (SAARC-Staatsangehörige NPR 1.000).
- Kinder unter 10 Jahren: kostenlos.
- Die Gebühr verdoppelt sich, wenn das Permit an einem Kontrollposten unterwegs gekauft wird.

${feeNote}`,
  },
  "manaslu-rap": {
    name: "Sperrgebietsgenehmigung Manaslu",
    authority: "Department of Immigration",
    notes: `Das obere Tal des Budhi Gandaki rund um den Manaslu ist ein Sperrgebiet, das man auf der Manaslu-Runde bei Jagat betritt. ${restricted}

Außerdem brauchst du das Manaslu Conservation Area Permit und für den Abstieg nach Dharapani das Annapurna-Permit.

## Gebühren
- September bis November: USD 100 für die erste Woche, danach USD 15 pro Tag.
- Dezember bis August: USD 75 für die erste Woche, danach USD 10 pro Tag.
- Bergsteigende mit Expeditionsgenehmigung müssen sie besitzen, zahlen aber keine Gebühr.

${feeNote}`,
  },
  mcap: {
    name: "Manaslu Conservation Area Permit (MCAP)",
    authority: "National Trust for Nature Conservation",
    notes: `Das Manaslu Conservation Area schützt das Tal des Budhi Gandaki, Nubri und das Tsum-Tal. Alle Trekkenden auf der Manaslu-Runde oder im Tsum-Tal brauchen dieses Permit zusätzlich zur Sperrgebietsgenehmigung.

## Gebühren
- NPR 3.000 pro Eintritt (SAARC-Staatsangehörige NPR 1.000).

${feeNote}`,
  },
  "tsum-rap": {
    name: "Sperrgebietsgenehmigung Tsum-Tal",
    authority: "Department of Immigration",
    notes: `Das Tsum-Tal, ein heiliges tibetisch-buddhistisches Tal abseits des Manaslu-Wegs, wurde 2008 für Trekkende geöffnet und hat eine eigene Sperrgebietsgenehmigung, die in Lokpa kontrolliert wird. ${restricted}

Außerdem brauchst du das Manaslu Conservation Area Permit und, wenn du die Runde fortsetzt, die Sperrgebietsgenehmigung für Manaslu.

## Gebühren
- September bis November: USD 40 für die erste Woche, danach USD 7 pro Tag.
- Dezember bis August: USD 30 für die erste Woche, danach USD 7 pro Tag.

${feeNote}`,
  },
  "upper-mustang-rap": {
    name: "Sperrgebietsgenehmigung Upper Mustang",
    authority: "Department of Immigration",
    notes: `Upper Mustang, das frühere Königreich Lo nördlich von Kagbeni, ist ein Sperrgebiet. Die Genehmigung wird beim Verlassen von Kagbeni kontrolliert und für die Tage berechnet, die du im Gebiet verbringst. ${restricted}

Außerdem brauchst du das Annapurna Conservation Area Permit.

## Gebühren
- USD 50 pro Tag im Sperrgebiet, seit November 2025 (davor USD 500 für die ersten 10 Tage).

${feeNote}`,
  },
  "nar-phu-rap": {
    name: "Sperrgebietsgenehmigung Nar Phu",
    authority: "Department of Immigration",
    notes: `Die Täler von Nar und Phu nördlich der Annapurna-Runde sind ein Sperrgebiet, das man bei Koto betritt. Dieselbe Genehmigung gilt für den Anmarsch zum Himlung Himal. ${restricted}

Außerdem brauchst du das Annapurna Conservation Area Permit.

## Gebühren
- September bis November: USD 100 für die erste Woche, danach USD 15 pro Tag.
- Dezember bis August: USD 75 für die erste Woche, danach USD 15 pro Tag.
- Offizielle Quellen nennen leicht unterschiedliche Beträge; dein Angebot zeigt den berechneten Betrag.

${feeNote}`,
  },
  "kanchenjunga-rap": {
    name: "Sperrgebietsgenehmigung Kanchenjunga",
    authority: "Department of Immigration",
    notes: `Die oberen Täler rund um den Kanchenjunga im Distrikt Taplejung sind ein Sperrgebiet, das die Wege zum Nord- und zum Südbasislager umfasst. ${restricted}

Außerdem brauchst du die Eintrittsgenehmigung für das Kanchenjunga Conservation Area.

## Gebühren
- USD 20 pro Woche für die ersten vier Wochen, danach USD 25 pro Woche.

${feeNote}`,
  },
  "kanchenjunga-conservation-area": {
    name: "Eintritt Kanchenjunga Conservation Area",
    authority: "Kanchenjunga Conservation Area Management Council",
    notes: `Das Kanchenjunga Conservation Area schützt die Wälder, Gletscher und Dörfer rund um den dritthöchsten Berg der Welt und wird von den lokalen Gemeinden verwaltet. Alle Trekkenden zahlen zusätzlich zur Sperrgebietsgenehmigung eine Eintrittsgebühr.

## Gebühren
- NPR 2.000 pro Eintritt (SAARC-Staatsangehörige NPR 500).

${feeNote}`,
  },
  "makalu-rap": {
    name: "Sperrgebietsgenehmigung Makalu",
    authority: "Department of Immigration",
    notes: `Teile des oberen Arun-Tals im Distrikt Sankhuwasabha nahe der tibetischen Grenze sind ein Sperrgebiet. Die Standardrouten zum Makalu Base Camp und zum Makalu über Num und das Barun-Tal führen normalerweise nicht hinein, daher brauchen die meisten Makalu-Reisen diese Genehmigung nicht.

Wenn deine Route doch hineinführt, wird die Genehmigung nur über eine registrierte Trekkingagentur ausgestellt, für Gruppen von mindestens zwei Trekkenden mit einem lizenzierten Guide, und wir beantragen sie in Kathmandu mit Kopien deines Reisepasses und Visums.

## Gebühren
- USD 20 pro Woche für die ersten vier Wochen, danach USD 25 pro Woche.

${feeNote}`,
  },
  "makalu-barun-national-park": {
    name: "Eintritt Makalu-Barun-Nationalpark",
    authority: "Department of National Parks and Wildlife Conservation",
    notes: `Der Makalu-Barun-Nationalpark schützt das wilde Barun-Tal unter dem Makalu, vom tropischen Wald bis zu den Gletschern. ${parkIntro}

Das Permit wird in Seduwa auf dem Makalu-Weg registriert. Der Park umfasst auch das Hinku-Tal, daher wird es für den Mera Peak benötigt.

${parkFees}

${feeNote}`,
  },
  "langtang-national-park": {
    name: "Eintritt Langtang-Nationalpark",
    authority: "Department of National Parks and Wildlife Conservation",
    notes: `Der Langtang-Nationalpark schützt das Langtang-Tal, Gosainkunda und die oberen Grate von Helambu nördlich von Kathmandu. ${parkIntro}

Es wird für das Langtang-Tal, Gosainkunda, Helambu, den Tamang Heritage Trail und Yala Peak benötigt.

${parkFees}

${feeNote}`,
  },
  "rasuwa-rap": {
    name: "Sperrgebietsgenehmigung Rasuwa",
    authority: "Department of Immigration",
    notes: `Die Dörfer nahe der tibetischen Grenze im Distrikt Rasuwa, darunter Thuman und Timure auf dem Tamang Heritage Trail, sind ein Sperrgebiet. ${restricted}

## Gebühren
- USD 20 pro Woche.

${feeNote}`,
  },
  "shivapuri-nagarjun-national-park": {
    name: "Eintritt Shivapuri-Nagarjun-Nationalpark",
    authority: "Department of National Parks and Wildlife Conservation",
    notes: `Der Shivapuri-Nagarjun-Nationalpark schützt die bewaldeten Hügel am Nordrand des Kathmandu-Tals. ${parkIntro}

Er wird für den Helambu-Trek, für Treks mit Ziel in Sundarijal und für Mountainbiketouren durch den Park benötigt.

## Gebühren
- NPR 1.000 pro Eintritt (SAARC-Staatsangehörige NPR 600).
- Kinder unter 10 Jahren: kostenlos.

${feeNote}`,
  },
  "upper-dolpo-rap": {
    name: "Sperrgebietsgenehmigung Upper Dolpo",
    authority: "Department of Immigration",
    notes: `Upper Dolpo jenseits des Kang La ist eines der am strengsten kontrollierten Sperrgebiete Nepals. ${restricted}

Außerdem brauchst du das Permit für den Shey-Phoksundo-Nationalpark und die Genehmigung für Lower Dolpo für die Abschnitte der Route, die durch dieses Gebiet führen.

## Gebühren
- USD 500 für die ersten 10 Tage, danach USD 50 pro Tag.

${feeNote}`,
  },
  "lower-dolpo-rap": {
    name: "Sperrgebietsgenehmigung Lower Dolpo",
    authority: "Department of Immigration",
    notes: `Lower Dolpo, einschließlich des Tarap-Tals und der Pässe zum Phoksundo-See, ist ein Sperrgebiet. ${restricted}

Außerdem brauchst du das Permit für den Shey-Phoksundo-Nationalpark.

## Gebühren
- USD 20 für die erste Woche, danach USD 5 pro Woche.

${feeNote}`,
  },
  "shey-phoksundo-national-park": {
    name: "Eintritt Shey-Phoksundo-Nationalpark",
    authority: "Department of National Parks and Wildlife Conservation",
    notes: `Der Shey-Phoksundo-Nationalpark, der größte Nationalpark Nepals, schützt den Phoksundo-See, Shey Gompa und die Hochtäler von Dolpo. ${parkIntro}

${parkFees}

${feeNote}`,
  },
  "rara-national-park": {
    name: "Eintritt Rara-Nationalpark",
    authority: "Department of National Parks and Wildlife Conservation",
    notes: `Der Rara-Nationalpark schützt den Rara-See, den größten See Nepals, und die Kiefernwälder um ihn herum. ${parkIntro}

${parkFees}

${feeNote}`,
  },
  "chitwan-national-park": {
    name: "Eintritt Chitwan-Nationalpark",
    authority: "Department of National Parks and Wildlife Conservation",
    notes: `Der Chitwan-Nationalpark, ein UNESCO-Weltnaturerbe, schützt die Wälder, Graslandschaften und Flüsse des inneren Terai, die Heimat von Nashörnern, Tigern und Gangesgavialen. ${parkIntro}

## Gebühren
- NPR 2.000 pro Tag zuzüglich 13 % Mehrwertsteuer (SAARC-Staatsangehörige NPR 1.000).
- Kinder unter 10 Jahren: kostenlos.

${feeNote}`,
  },
  "bardia-national-park": {
    name: "Eintritt Bardia-Nationalpark",
    authority: "Department of National Parks and Wildlife Conservation",
    notes: `Der Bardia-Nationalpark schützt den Salwald, die Graslandschaften und die Flussarme des Karnali im fernen Westen, die Heimat von Tigern und wilden Elefanten. ${parkIntro}

## Gebühren
- NPR 1.500 pro Eintritt (SAARC-Staatsangehörige NPR 750).
- Kinder unter 10 Jahren: kostenlos.

${feeNote}`,
  },
  "nma-island-peak": {
    name: "NMA-Besteigungsgenehmigung für Trekkinggipfel",
    authority: "Nepal Mountaineering Association",
    notes: `Nepals Trekkinggipfel wie Island Peak, Mera Peak, Lobuche East, Pisang Peak, Chulu West und Yala Peak werden mit einer Genehmigung der Nepal Mountaineering Association bestiegen. Die Genehmigung wird für einen bestimmten Gipfel und eine Saison ausgestellt, und Bergsteigende hinterlegen außerdem eine rückzahlbare Müllkaution.

Die Gebühr hängt von Gipfel und Saison ab, und für einige Gipfel fällt keine an. Wir beantragen die Genehmigung in Kathmandu, und dein Bergführer hat sie am Berg dabei.

## Gebühren
- Island Peak, Mera Peak, Lobuche East, Pisang Peak und Chulu West: USD 350 im Frühling (März bis Mai), USD 175 im Herbst, Winter und Sommer, seit September 2025.
- Tharpu Chuli: keine Royalty.
- Yala Peak: derzeit wird keine Royalty erhoben.
- Für jede Genehmigung wird eine rückzahlbare Müllkaution gezahlt.

${feeNote}`,
  },
  "dot-expedition-permit": {
    name: "Expeditionsgenehmigung (Royalty)",
    authority: "Department of Tourism",
    notes: `Expeditionsgipfel, von Ama Dablam und Himlung bis zum Everest und den anderen Achttausendern, werden mit einer Genehmigung des nepalesischen Department of Tourism bestiegen. Die Gebühr, Royalty genannt, hängt von Berg, Route und Saison ab.

Expeditionen hinterlegen außerdem eine rückzahlbare Müllkaution, bekommen unter Umständen einen staatlichen Verbindungsoffizier zugeteilt und zahlen am Everest und Lhotse die Gebühr für die Route durch den Khumbu-Eisbruch. Der Antrag wird in Kathmandu gestellt, wo das Bergsteigerteam auch an einer Einweisung im Department of Tourism teilnimmt.

## Gebühren
- Everest, Normalroute: USD 15.000 im Frühling, USD 7.500 im Herbst, USD 3.750 im Winter und Sommer.
- Andere Achttausender (Lhotse, Makalu, Kanchenjunga, Cho Oyu, Dhaulagiri, Annapurna I): USD 3.000 im Frühling, USD 1.500 im Herbst, USD 750 im Winter und Sommer.
- Manaslu: USD 1.500 im Frühling, USD 3.000 im Herbst, USD 1.500 im Winter und Sommer.
- Gipfel von 7.001 bis 7.500 m, etwa Himlung Himal: USD 800 im Frühling, USD 400 im Herbst, USD 200 im Winter und Sommer.
- Ama Dablam: USD 1.000 im Frühling und Herbst, USD 500 im Winter und Sommer.
- Sätze seit September 2025. Wer Everest, Lhotse oder Nuptse besteigt, zahlt außerdem die Gebühr für die Route durch den Khumbu-Eisbruch von USD 600.
- Inhaber einer Expeditionsgenehmigung zahlen keine Gebühr für Sperrgebietsgenehmigungen.

${feeNote}`,
  },
  "kathmandu-valley-heritage-sites": {
    name: "Eintrittskarten für Kulturerbestätten im Kathmandu-Tal",
    authority: "Verwaltungskomitees der Stätten",
    notes: `Die Durbar-Plätze von Kathmandu, Patan und Bhaktapur, Swayambhunath, Boudhanath, Pashupatinath und Changu Narayan verlangen von ausländischen Besuchern jeweils Eintritt, der ihren Erhalt finanziert. Das Ticket für Bhaktapur gilt für die ganze Altstadt. Dein Guide kauft die Tickets am jeweiligen Tag.

## Gebühren
- Durbar-Platz Kathmandu: NPR 1.000.
- Durbar-Platz Patan: NPR 1.000.
- Altstadt Bhaktapur: NPR 2.000 oder USD 15, seit Juli 2025.
- Pashupatinath: NPR 1.000 pro Tag.
- Boudhanath: NPR 400.
- Changu Narayan: NPR 300.
- Swayambhunath: NPR 200.
- SAARC-Staatsangehörige zahlen überall weniger.

${feeNote}`,
  },
  "lumbini-entry": {
    name: "Eintritt Heiliger Garten Lumbini",
    authority: "Lumbini Development Trust",
    notes: `Besucher des Heiligen Gartens und des Maya-Devi-Tempels in Lumbini zahlen eine tägliche Eintrittsgebühr an den Lumbini Development Trust, der die Stätte pflegt. Dein Guide organisiert sie bei der Ankunft.

## Gebühren
- NPR 1.000 pro Tag, seit Mai 2026 (SAARC-Staatsangehörige NPR 700).

${feeNote}`,
  },
  "tibet-travel-permit": {
    name: "Tibet Travel Permit und Gruppenvisum",
    authority: "Tibet Tourism Bureau",
    notes: `Für Reisen von Nepal nach Tibet brauchst du ein chinesisches Gruppenvisum, das in Kathmandu ausgestellt wird, und ein Tibet Travel Permit, das eine lizenzierte tibetische Agentur besorgt. Besucher reisen mit einem tibetischen Guide auf einer festgelegten Route. Die Regeln können sich kurzfristig ändern, daher bestätigen wir sie mit dir vor der Buchung.

## Gebühren
- Für das Tibet Travel Permit gibt es keine veröffentlichte Gebühr; es ist im Tourpreis enthalten.
- Die Gebühr für das chinesische Gruppenvisum hängt von deiner Staatsangehörigkeit ab.

${feeNote}`,
  },
  "bhutan-visa": {
    name: "Visum für Bhutan und Sustainable Development Fee",
    authority: "Department of Immigration, Bhutan",
    notes: `Besucher Bhutans reisen mit einem lizenzierten bhutanischen Guide und einem vor der Ankunft beantragten Visum und zahlen für jede Nacht die Sustainable Development Fee, die Naturschutz und öffentliche Leistungen finanziert. Beides wird über einen lizenzierten bhutanischen Reiseveranstalter organisiert.

## Gebühren
- Sustainable Development Fee: USD 100 pro Nacht bis 31. August 2027 (regulärer Satz USD 200). Kinder von 6 bis 11 Jahren zahlen die Hälfte, unter 6 Jahren nichts.
- Visum: USD 40, einmalig.

${feeNote}`,
  },
};

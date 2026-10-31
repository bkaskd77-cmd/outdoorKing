import { peakSectionsDe } from "./peak-sections";

/** German peak introductions as first seeded, keyed by peak slug. Names stay as climbers know them. */
export const peakIntrosDe: Record<string, { name?: string; description?: string }> = {
  "island-peak": {
    name: "Island Peak (Imja Tse)",
    description: `Island Peak erhebt sich aus dem Imja-Tal unter der Südwand des Lhotse und steht wie eine Insel in einem Meer aus Eis, daher sein englischer Name. Er ist der beliebteste Trekkinggipfel Nepals und ein klassischer erster Himalaya-Gipfel.

Die Normalroute steigt durch eine Felsrinne vom Basislager zum Steigeisendepot, quert einen Gletscher und klettert an Fixseilen eine steile Schnee- und Eisflanke hinauf zu einem kurzen, ausgesetzten Gipfelgrat. Die meisten Bergsteigenden akklimatisieren sich vorher auf dem Trek zum Everest Base Camp.`,
  },
  "mera-peak": {
    name: "Mera Peak",
    description: `Der Mera Peak im Hinku-Tal südlich des Everest ist der höchste der Trekkinggipfel Nepals. Sein Gipfel bietet eine der schönsten Aussichten im Himalaya, mit fünf Achttausendern im Blick: Everest, Lhotse, Cho Oyu, Makalu und Kanchenjunga.

Die Normalroute überquert den Mera La und steigt von einem Hochlager über den breiten Mera-Gletscher auf. Sie ist nicht steil; die Herausforderung sind die Höhe und ein langer Gipfeltag.`,
  },
  "lobuche-east": {
    name: "Lobuche East",
    description: `Lobuche East erhebt sich über dem Khumbu-Gletscher gegenüber von Everest, Lhotse und Nuptse. Er ist steiler und technischer als Island Peak, und sein Gipfelgrat bietet einen nahen Blick auf die höchsten Berge der Welt.

Die Route führt über Felsplatten und einen Gletscher, dann steil über Schnee an Fixseilen zum Gipfelgrat. Der eigentliche Gipfel liegt entlang eines ausgesetzten Grats hinter dem ersten Vorgipfel.`,
  },
  "pisang-peak": {
    name: "Pisang Peak",
    description: `Der Pisang Peak ist eine Schneepyramide über dem Dorf Pisang im Marsyangdi-Tal, auf der Annapurna-Runde. Vom Gipfel reicht der Blick über Annapurna II, Gangapurna, Tilicho Peak und das Manang-Tal.

Die Normalroute steigt von Basis- und Hochlager über einen steilen, ausgesetzten Schnee- und Eishang mit Fixseilen zum Gipfel.`,
  },
  "chulu-west": {
    name: "Chulu West",
    description: `Der Chulu West steht über Manang, zwischen den Chulu-Gipfeln nördlich der Annapurna-Kette. Er ist ein größeres Ziel als die meisten Trekkinggipfel und wird in Etappen vom Basislager über zwei höhere Lager bestiegen.

Der Gipfelvorstoß folgt dem Nordostgrat über Schnee und Eis, mit Fixseilen an den steileren Abschnitten, und blickt hinüber zu den Annapurnas, Gangapurna, Tilicho Peak, Manaslu und Dhaulagiri.`,
  },
  "yala-peak": {
    name: "Yala Peak",
    description: `Der Yala Peak erhebt sich über Kyanjin Gompa im Langtang-Tal und ist einer der zugänglichsten Himalaya-Gipfel. Vom Gipfel siehst du den Shishapangma, einen der vierzehn Achttausender, jenseits der Grenze in Tibet.

Die Route quert Schneehänge und führt in leichter Kletterei über Fels zu einem kurzen, steilen Gipfelaufbau. Sie verlangt Fitness, aber keine technische Erfahrung.`,
  },
  "tharpu-chuli": {
    name: "Tharpu Chuli (Tent Peak)",
    description: `Tharpu Chuli, auch Tent Peak genannt, erhebt sich im Annapurna Sanctuary gegenüber dem Machhapuchhre, umgeben von Annapurna I, Annapurna South und Hiunchuli.

Die Normalroute vom Annapurna Base Camp quert einen Gletscher und steigt an Fixseilen durch steile Schneerinnen zu einem kurzen, schmalen Gipfelgrat. Sie ist anhaltender als Island Peak.`,
  },
  "ama-dablam": {
    name: "Ama Dablam",
    description: `Die Ama Dablam, die „Halskette der Mutter“, ist der markanteste Berg des Khumbu und erhebt sich über Pangboche und Tengboche. Sie wurde 1961 erstmals über ihren Südwestgrat bestiegen, der noch heute die Normalroute ist.

Der Aufstieg folgt dem Grat an Fixseilen über Granitplatten, den steilen Yellow Tower und den Schnee des Mushroom Ridge zum Gipfel. Es ist eine technische Expeditionsbesteigung, die Erfahrung in Fels, Schnee und Eis verlangt.`,
  },
  "himlung-himal": {
    name: "Himlung Himal",
    description: `Der Himlung Himal steht an der Grenze zu Tibet über dem verborgenen Nar-Phu-Tal. Er ist einer der besten ersten Siebentausender: technisch unkompliziert, aber hoch und abgelegen genug für eine echte Expedition.

Die Route führt über Gletscher und Schneehänge durch drei Hochlager, mit Fixseilen an den steileren Abschnitten.`,
  },
  everest: {
    name: "Mount Everest",
    description: `Der Mount Everest, auf Nepali Sagarmatha und auf Tibetisch Chomolungma, ist der höchste Berg der Erde. Edmund Hillary und Tenzing Norgay erreichten den Gipfel erstmals am 29. Mai 1953 über die Südsattel-Route von Nepal aus.

Die Route führt durch den Khumbu-Eisbruch, das Western Cwm und die Lhotse-Flanke zum Südsattel und folgt dann dem Südostgrat über den Südgipfel und den Hillary Step zum Gipfel.`,
  },
  lhotse: {
    name: "Lhotse",
    description: `Der Lhotse, der vierthöchste Berg der Welt, ist über den Südsattel mit dem Everest verbunden. Er wurde 1956 erstmals von Fritz Luchsinger und Ernst Reiss von der Schweizer Expedition bestiegen.

Die Normalroute teilt sich den Weg mit der Everest-Route bis zur Lhotse-Flanke und steigt dann durch das schmale Lhotse-Couloir zum Gipfel.`,
  },
  "cho-oyu": {
    name: "Cho Oyu",
    description: `Der Cho Oyu, die „türkisfarbene Göttin“, ist der sechsthöchste Berg der Welt, an der Grenze zwischen Nepal und Tibet westlich des Everest. Er wurde 1954 erstmals von Herbert Tichy, Sepp Jöchler und Pasang Dawa Lama bestiegen.

Die meisten Besteigungen folgen dem Nordwestgrat von Tibet aus, einer der moderatesten Routen an einem Achttausender.`,
  },
  makalu: {
    name: "Makalu",
    description: `Der Makalu, der fünfthöchste Berg der Welt, ist eine frei stehende, vierseitige Pyramide südöstlich des Everest. Er wurde 1955 erstmals von Jean Couzy und Lionel Terray von der französischen Expedition bestiegen.

Die Normalroute führt zum Makalu La und dann durch das French Couloir zu einem ausgesetzten Gipfelgrat. Er gehört zu den schwierigsten Achttausendern.`,
  },
  manaslu: {
    name: "Manaslu",
    description: `Der Manaslu, der „Berg der Seele“, ist der achthöchste Berg der Welt und erhebt sich über dem Nubri-Tal. Er wurde 1956 erstmals von Toshio Imanishi und Gyalzen Norbu einer japanischen Expedition bestiegen.

Die Route über die Nordostflanke führt durch vier Lager zu einem ausgesetzten, überwechteten Grat, der zum eigentlichen Gipfel leitet. Er wird oft als erster Achttausender gewählt.`,
  },
  dhaulagiri: {
    name: "Dhaulagiri I",
    description: `Der Dhaulagiri I, der „weiße Berg“, ist der siebthöchste Berg der Welt und ragt gegenüber der Annapurna über der Schlucht des Kali Gandaki auf. Er wurde 1960 erstmals von einer schweizerisch-österreichischen Expedition über den Nordostgrat bestiegen.

Der Anmarsch quert Dhampus-Pass und French Pass durch das Hidden Valley, und der Aufstieg folgt dem windausgesetzten Grat durch drei Hochlager.`,
  },
  kanchenjunga: {
    name: "Kanchenjunga",
    description: `Der Kanchenjunga an Nepals Grenze zu Sikkim ist der dritthöchste Berg der Welt. Er wurde am 25. Mai 1955 erstmals von George Band und Joe Brown bestiegen, die aus Respekt vor dem örtlichen Glauben kurz unterhalb des Gipfels stehen blieben.

Die übliche Route von Nepal aus steigt vom Yalung-Gletscher durch die Südwestwand, über Gletscher- und Séracgelände zur Gipfelpyramide.`,
  },
  "annapurna-i": {
    name: "Annapurna I",
    description: `Die Annapurna I war der erste je bestiegene Achttausender, erreicht von Maurice Herzog und Louis Lachenal von der französischen Expedition am 3. Juni 1950. Sie gehört bis heute zu den ernstesten der hohen Gipfel.

Die Route auf der Nordseite vom Kali Gandaki aus führt über Gletscher und steilen Schnee durch vier Lager, mit Abschnitten, die Lawinen und Séracabbrüchen ausgesetzt sind.`,
  },
};

/** German peak pages: the introduction, then the longer sections. */
export const peaksDe: Record<string, { name?: string; description?: string }> =
  Object.fromEntries(
    Object.entries(peakIntrosDe).map(([slug, peak]) => {
      const more = peakSectionsDe[slug];
      return [
        slug,
        more && peak.description
          ? { ...peak, description: `${peak.description}\n${more}` }
          : peak,
      ];
    }),
  );

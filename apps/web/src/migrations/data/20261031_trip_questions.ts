// Generated: questions chosen per trip, and eight new questions in English and German
// (October 2026). "before" is the list each trip was seeded with.
import type { CatalogDocSync, TripLinkSync } from "../lib/sync-catalog-links";
import type { TranslationSync } from "../lib/sync-translations";

export const newFaqDocs: CatalogDocSync[] = [
  {
    slug: "tour-fitness",
    after: {
      question: "How active are the tours and safaris?",
      answer:
        "No special fitness is needed. Tour days involve walking around heritage sites, with some stairs, such as the long staircase up to Swayambhunath, and safaris include a guided walk in the forest. The walk to the Tiger's Nest in Bhutan is the most demanding part of any tour, a climb of two to three hours. We set the pace for your group and can shorten any day.",
      category: "booking",
      order: 55,
    },
  },
  {
    slug: "climbing-experience",
    after: {
      question: "Do I need climbing experience for a trekking peak?",
      answer:
        "Not for most trekking peaks. You should be a fit, confident trekker who has walked above 4,000 m. Every climb includes a training day with your climbing guide on crampons, the ice axe, fixed ropes and abseiling, before summit day. Steeper peaks such as Lobuche East reward some experience on snow, and expeditions such as Ama Dablam or the 8,000 m peaks need previous climbing at altitude.",
      category: "booking",
      order: 75,
    },
  },
  {
    slug: "expedition-permit",
    after: {
      question: "Who arranges the expedition permit?",
      answer:
        "We do. Expeditions are climbed on a permit from Nepal's Department of Tourism, separate from the trekking-peak permits. The fee depends on the mountain and the season. We apply for it with your other permits, complete the formalities the rules require, and tell you in good time which documents and details we need from you.",
      category: "permits",
      order: 145,
    },
  },
  {
    slug: "how-cold",
    after: {
      question: "How cold does it get on the trek?",
      answer:
        "It depends on the altitude and the season. In spring and autumn the days on the trail are often pleasant, but nights above 4,000 m fall below freezing, and at the highest lodges they can drop to around -10 °C or lower. Rooms are not heated; the stove in the dining room is the warm place in the evening. A sleeping bag rated to about -10 °C, a down jacket, a warm hat and gloves keep you comfortable. Winter is colder still.",
      category: "packing",
      order: 155,
    },
  },
  {
    slug: "toilets-and-showers",
    after: {
      question: "What are the toilets and showers like?",
      answer:
        "Most teahouses have shared toilets, often squat toilets higher up, and more lodges in the lower villages now have Western toilets and some rooms with a private bathroom. Hot showers are available in most lodges for a small charge, heated by gas or the sun; higher up a shower may be a bucket of hot water, and in the coldest places many trekkers skip it. Carry toilet paper and hand sanitiser, and put paper in the bin, not the toilet. On camping treks the crew sets up a toilet tent.",
      category: "packing",
      order: 185,
    },
  },
  {
    slug: "helicopter-acclimatisation",
    after: {
      question: "Do I need to acclimatise for an Everest helicopter tour?",
      answer:
        "No. The helicopter climbs quickly, so the time spent above 5,000 m is kept to a few minutes, and the breakfast stop is lower, at about 3,880 m. Some people feel light-headed or short of breath at the highest point, which passes on the way down. If you have heart or lung conditions, or are pregnant, please check with your doctor before booking.",
      category: "altitude",
      order: 225,
    },
  },
  {
    slug: "wildlife-safety",
    after: {
      question: "Is a jungle safari safe?",
      answer:
        "Yes, with a good guide and a few simple rules. Safaris in Chitwan and Bardia are led by experienced naturalist guides, who brief you before every walk and keep a safe distance from rhinos, elephants and other large animals. Jeep safaris are the calmest way to see the park; walks on foot are the most exciting and need you to follow your guide closely. Wear muted colours, keep quiet and never approach animals for a photograph.",
      category: "safety",
      order: 285,
    },
  },
  {
    slug: "adventure-limits",
    after: {
      question: "Are there age or weight limits for bungee, rafting and paragliding?",
      answer:
        "Yes. The operators of bungee jumps, canyon swings, rafting trips and tandem paragliding set their own age, weight and health limits, and these can change. We check the current limits with the operator when you book. These activities are usually not suitable during pregnancy or with heart, back or neck problems, and every operator gives a full safety briefing before you start.",
      category: "safety",
      order: 287,
    },
  },
];

export const tripFaqLinks: TripLinkSync[] = [
  {
    slug: "ama-dablam-expedition",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "expedition-permit",
      "lukla-flights",
      "insurance-altitude",
      "rescue",
      "turn-back",
    ],
  },
  {
    slug: "annapurna-base-camp-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
      "how-cold",
    ],
  },
  {
    slug: "annapurna-circuit-trek",
    field: "faqs",
    before: [
      "do-i-need-insurance",
      "how-hard-is-altitude",
      "best-season",
      "what-is-tims",
    ],
    after: [
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
      "how-cold",
    ],
  },
  {
    slug: "annapurna-i-expedition",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: ["expedition-permit", "insurance-altitude", "rescue", "turn-back"],
  },
  {
    slug: "bardia-national-park-safari",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "wildlife-safety",
      "best-season",
      "children-and-families",
      "tour-fitness",
      "do-i-need-insurance",
    ],
  },
  {
    slug: "bhutan-add-on-tour",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "permit-documents",
      "how-hard-is-altitude",
      "best-season",
      "children-and-families",
      "change-itinerary",
    ],
  },
  {
    slug: "bungee-and-canyon-swing-adventure",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "adventure-limits",
      "tour-fitness",
      "best-season",
      "children-and-families",
      "change-itinerary",
    ],
  },
  {
    slug: "chitwan-national-park-safari",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "wildlife-safety",
      "best-season",
      "children-and-families",
      "tour-fitness",
      "do-i-need-insurance",
    ],
  },
  {
    slug: "cho-oyu-expedition",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "expedition-permit",
      "lukla-flights",
      "insurance-altitude",
      "rescue",
      "turn-back",
    ],
  },
  {
    slug: "chulu-west-peak-climbing",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "climbing-experience",
      "how-hard-is-altitude",
      "rent-gear",
      "turn-back",
      "insurance-altitude",
    ],
  },
  {
    slug: "dhaulagiri-expedition",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: ["expedition-permit", "insurance-altitude", "rescue", "turn-back"],
  },
  {
    slug: "everest-base-camp-trek",
    field: "faqs",
    before: [
      "lukla-flights",
      "do-i-need-insurance",
      "how-hard-is-altitude",
      "what-is-tims",
    ],
    after: [
      "lukla-flights",
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
    ],
  },
  {
    slug: "everest-expedition-south-col",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "expedition-permit",
      "lukla-flights",
      "insurance-altitude",
      "rescue",
      "turn-back",
    ],
  },
  {
    slug: "everest-helicopter-tour",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "helicopter-acclimatisation",
      "do-i-need-insurance",
      "best-season",
      "children-and-families",
    ],
  },
  {
    slug: "everest-three-passes-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "lukla-flights",
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
    ],
  },
  {
    slug: "everest-view-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "lukla-flights",
      "how-hard-is-altitude",
      "food-and-water",
      "do-i-need-insurance",
      "toilets-and-showers",
    ],
  },
  {
    slug: "ghorepani-poon-hill-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "how-hard-is-altitude",
      "food-and-water",
      "do-i-need-insurance",
      "toilets-and-showers",
    ],
  },
  {
    slug: "gokyo-cho-la-everest-base-camp-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "lukla-flights",
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
    ],
  },
  {
    slug: "gokyo-lakes-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "lukla-flights",
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
    ],
  },
  {
    slug: "helambu-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "how-hard-is-altitude",
      "food-and-water",
      "do-i-need-insurance",
      "toilets-and-showers",
    ],
  },
  {
    slug: "himlung-himal-expedition",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "expedition-permit",
      "restricted-area-group",
      "insurance-altitude",
      "rescue",
      "turn-back",
    ],
  },
  {
    slug: "island-peak-climbing",
    field: "faqs",
    before: ["how-hard-is-altitude", "do-i-need-insurance", "rescue", "guide-required"],
    after: [
      "climbing-experience",
      "lukla-flights",
      "how-hard-is-altitude",
      "rent-gear",
      "turn-back",
    ],
  },
  {
    slug: "kanchenjunga-base-camp-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "restricted-area-group",
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
    ],
  },
  {
    slug: "kanchenjunga-expedition",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "expedition-permit",
      "restricted-area-group",
      "insurance-altitude",
      "rescue",
      "turn-back",
    ],
  },
  {
    slug: "kathmandu-valley-heritage-tour",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "tour-fitness",
      "best-season",
      "children-and-families",
      "change-itinerary",
      "do-i-need-insurance",
    ],
  },
  {
    slug: "khopra-danda-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
      "how-cold",
    ],
  },
  {
    slug: "langtang-gosainkunda-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
      "how-cold",
    ],
  },
  {
    slug: "langtang-valley-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
      "how-cold",
    ],
  },
  {
    slug: "lhotse-expedition",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "expedition-permit",
      "lukla-flights",
      "insurance-altitude",
      "rescue",
      "turn-back",
    ],
  },
  {
    slug: "lobuche-east-peak-climbing",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "climbing-experience",
      "lukla-flights",
      "how-hard-is-altitude",
      "rent-gear",
      "turn-back",
    ],
  },
  {
    slug: "lower-dolpo-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "restricted-area-group",
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
    ],
  },
  {
    slug: "lumbini-pilgrimage-tour",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "tour-fitness",
      "best-season",
      "children-and-families",
      "change-itinerary",
      "do-i-need-insurance",
    ],
  },
  {
    slug: "makalu-base-camp-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
      "how-cold",
    ],
  },
  {
    slug: "makalu-expedition",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: ["expedition-permit", "insurance-altitude", "rescue", "turn-back"],
  },
  {
    slug: "manaslu-circuit-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "restricted-area-group",
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
    ],
  },
  {
    slug: "manaslu-expedition",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "expedition-permit",
      "restricted-area-group",
      "insurance-altitude",
      "rescue",
      "turn-back",
    ],
  },
  {
    slug: "mardi-himal-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
      "how-cold",
    ],
  },
  {
    slug: "mera-peak-climbing",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "climbing-experience",
      "lukla-flights",
      "how-hard-is-altitude",
      "rent-gear",
      "turn-back",
    ],
  },
  {
    slug: "mountain-biking-kathmandu-valley",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "tour-fitness",
      "best-season",
      "children-and-families",
      "change-itinerary",
      "do-i-need-insurance",
    ],
  },
  {
    slug: "nar-phu-valley-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "restricted-area-group",
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
    ],
  },
  {
    slug: "nepal-cultural-heritage-tour",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "tour-fitness",
      "best-season",
      "children-and-families",
      "change-itinerary",
      "do-i-need-insurance",
    ],
  },
  {
    slug: "nepal-white-water-rafting",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "adventure-limits",
      "tour-fitness",
      "best-season",
      "children-and-families",
      "change-itinerary",
    ],
  },
  {
    slug: "pisang-peak-climbing",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "climbing-experience",
      "how-hard-is-altitude",
      "rent-gear",
      "turn-back",
      "insurance-altitude",
    ],
  },
  {
    slug: "pokhara-lakeside-tour",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "tour-fitness",
      "best-season",
      "children-and-families",
      "change-itinerary",
      "do-i-need-insurance",
    ],
  },
  {
    slug: "pokhara-paragliding",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "adventure-limits",
      "tour-fitness",
      "best-season",
      "children-and-families",
      "change-itinerary",
    ],
  },
  {
    slug: "rara-lake-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "how-hard-is-altitude",
      "food-and-water",
      "do-i-need-insurance",
      "toilets-and-showers",
    ],
  },
  {
    slug: "tamang-heritage-trail",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "how-hard-is-altitude",
      "best-season",
      "children-and-families",
      "change-itinerary",
      "do-i-need-insurance",
    ],
  },
  {
    slug: "tharpu-chuli-tent-peak-climbing",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "climbing-experience",
      "how-hard-is-altitude",
      "rent-gear",
      "turn-back",
      "insurance-altitude",
    ],
  },
  {
    slug: "tibet-add-on-tour",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "permit-documents",
      "how-hard-is-altitude",
      "best-season",
      "children-and-families",
      "change-itinerary",
    ],
  },
  {
    slug: "tsum-valley-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "restricted-area-group",
      "how-hard-is-altitude",
      "food-and-water",
      "do-i-need-insurance",
      "toilets-and-showers",
    ],
  },
  {
    slug: "upper-dolpo-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "restricted-area-group",
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
    ],
  },
  {
    slug: "upper-mustang-trek",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "restricted-area-group",
      "how-hard-is-altitude",
      "food-and-water",
      "insurance-altitude",
      "toilets-and-showers",
    ],
  },
  {
    slug: "yala-peak-climbing",
    field: "faqs",
    before: ["do-i-need-insurance", "how-hard-is-altitude", "quote-sla"],
    after: [
      "climbing-experience",
      "how-hard-is-altitude",
      "rent-gear",
      "turn-back",
      "insurance-altitude",
    ],
  },
];

export const germanNewFaqs: TranslationSync[] = [
  {
    slug: "tour-fitness",
    data: {
      question: "Wie aktiv sind die Touren und Safaris?",
      answer:
        "Besondere Fitness brauchst du nicht. An Tourtagen gehst du zu Fuß durch Kulturstätten, mit einigen Treppen wie der langen Treppe hinauf nach Swayambhunath, und Safaris enthalten eine geführte Wanderung im Wald. Die Wanderung zum Tigernest in Bhutan ist der anstrengendste Teil aller Touren, ein Aufstieg von zwei bis drei Stunden. Wir passen das Tempo an deine Gruppe an und können jeden Tag verkürzen.",
    },
  },
  {
    slug: "climbing-experience",
    data: {
      question: "Brauche ich Klettererfahrung für einen Trekkinggipfel?",
      answer:
        "Für die meisten Trekkinggipfel nicht. Du solltest eine fitte, sichere Trekkerin oder ein fitter, sicherer Trekker sein und schon über 4.000 m gewandert sein. Jede Besteigung enthält vor dem Gipfeltag einen Übungstag mit deinem Bergführer: Steigeisen, Eispickel, Fixseile und Abseilen. Steilere Gipfel wie der Lobuche East belohnen etwas Erfahrung im Schnee, und Expeditionen wie die Ama Dablam oder die Achttausender verlangen bisherige Bergerfahrung in der Höhe.",
    },
  },
  {
    slug: "expedition-permit",
    data: {
      question: "Wer kümmert sich um die Expeditionsgenehmigung?",
      answer:
        "Wir. Expeditionen werden mit einer Genehmigung des Department of Tourism in Nepal bestiegen, getrennt von den Genehmigungen für Trekkinggipfel. Die Gebühr hängt vom Berg und von der Saison ab. Wir beantragen sie zusammen mit deinen anderen Genehmigungen, erledigen die vorgeschriebenen Formalitäten und sagen dir rechtzeitig, welche Unterlagen und Angaben wir von dir brauchen.",
    },
  },
  {
    slug: "how-cold",
    data: {
      question: "Wie kalt wird es auf dem Trek?",
      answer:
        "Das hängt von der Höhe und der Jahreszeit ab. Im Frühjahr und Herbst sind die Tage auf dem Weg oft angenehm, aber Nächte über 4.000 m liegen unter dem Gefrierpunkt, und in den höchsten Lodges kann es auf etwa -10 °C oder kälter fallen. Die Zimmer sind nicht beheizt; abends ist der Ofen im Gastraum der warme Ort. Ein Schlafsack bis etwa -10 °C, eine Daunenjacke, eine warme Mütze und Handschuhe halten dich warm. Im Winter ist es noch kälter.",
    },
  },
  {
    slug: "toilets-and-showers",
    data: {
      question: "Wie sind Toiletten und Duschen?",
      answer:
        "Die meisten Teehäuser haben Gemeinschaftstoiletten, weiter oben oft Hocktoiletten, und in den unteren Dörfern haben inzwischen mehr Lodges Sitztoiletten und einige Zimmer mit eigenem Bad. Warme Duschen gibt es in den meisten Lodges gegen eine kleine Gebühr, mit Gas oder Sonne erwärmt; weiter oben ist eine Dusche manchmal ein Eimer warmes Wasser, und an den kältesten Orten verzichten viele darauf. Nimm Toilettenpapier und Handdesinfektion mit und wirf das Papier in den Eimer, nicht in die Toilette. Bei Zelttreks baut das Team ein Toilettenzelt auf.",
    },
  },
  {
    slug: "helicopter-acclimatisation",
    data: {
      question: "Muss ich mich für einen Everest-Hubschrauberflug akklimatisieren?",
      answer:
        "Nein. Der Hubschrauber steigt schnell, deshalb bleibt die Zeit über 5.000 m auf wenige Minuten begrenzt, und der Frühstückshalt liegt tiefer, auf etwa 3.880 m. Manche spüren am höchsten Punkt leichten Schwindel oder Atemnot, der beim Abstieg vergeht. Wenn du Herz- oder Lungenerkrankungen hast oder schwanger bist, sprich bitte vor der Buchung mit deiner Ärztin oder deinem Arzt.",
    },
  },
  {
    slug: "wildlife-safety",
    data: {
      question: "Ist eine Dschungelsafari sicher?",
      answer:
        "Ja, mit einem guten Guide und ein paar einfachen Regeln. Safaris in Chitwan und Bardia werden von erfahrenen Naturführern geleitet, die dich vor jeder Wanderung einweisen und sicheren Abstand zu Nashörnern, Elefanten und anderen großen Tieren halten. Jeepsafaris sind die ruhigste Art, den Park zu sehen; Fußpirschen sind am spannendsten und verlangen, dass du deinem Guide genau folgst. Trag gedeckte Farben, sei leise und geh nie für ein Foto auf Tiere zu.",
    },
  },
  {
    slug: "adventure-limits",
    data: {
      question:
        "Gibt es Alters- oder Gewichtsgrenzen für Bungee, Rafting und Paragliding?",
      answer:
        "Ja. Die Betreiber von Bungeesprüngen, Canyon Swings, Rafting und Tandem-Paragliding legen eigene Grenzen für Alter, Gewicht und Gesundheit fest, und diese können sich ändern. Wir prüfen die aktuellen Grenzen bei der Buchung mit dem Betreiber. In der Schwangerschaft oder bei Herz-, Rücken- oder Nackenproblemen sind diese Aktivitäten meist nicht geeignet, und jeder Betreiber gibt vor dem Start eine ausführliche Sicherheitseinweisung.",
    },
  },
];

/** FAQ categories in the order the FAQ page shows them, each with a page to read next. */
export const faqGroups: {
  category: string;
  title: string;
  more?: { href: string; label: string };
}[] = [
  {
    category: "booking",
    title: "Planning and booking",
    more: { href: "/guides/choosing-your-trek", label: "How to choose a trek in Nepal" },
  },
  {
    category: "permits",
    title: "Permits and visas",
    more: { href: "/permits", label: "Nepal trekking permits" },
  },
  {
    category: "packing",
    title: "Gear and life on the trail",
    more: { href: "/guides/teahouse-trekking", label: "Teahouse trekking" },
  },
  {
    category: "altitude",
    title: "Altitude and health",
    more: {
      href: "/guides/acclimatization-explained",
      label: "Altitude sickness and acclimatisation",
    },
  },
  {
    category: "safety",
    title: "Safety and rescue",
    more: { href: "/trust/safety-and-rescue", label: "Our safety and rescue policy" },
  },
  {
    category: "insurance",
    title: "Insurance",
    more: { href: "/trust/insurance", label: "What your insurance needs to cover" },
  },
  { category: "payments", title: "Payments" },
];

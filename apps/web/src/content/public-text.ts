const CITATION = /\s*\[s\d+(?:\s*,\s*s\d+)*\]/gi;
const RESEARCH_NOTE =
  /\b(operators?|sources?|listed|given as|given variously|unverified|himalayan database|royalty table|quoted|figures?|some itineraries|one source|on many maps)\b/i;

// A reference to another fact file, such as "see langtang-valley-trek".
const INTERNAL_SLUG =
  /\b[a-z]+(?:-[a-z]+)*-(?:trek|tour|expedition|climbing|safari|trail|adventure)\b/;

/**
 * Turns a research note into public copy: drops citation markers like "[s4]" and any
 * sentence that is about the research (operator figures, source disagreements)
 * rather than about the trip.
 */
export function publicText(text: string | null | undefined): string {
  if (!text) return "";
  const withoutCitations = text
    .replace(CITATION, "")
    .replace(/\bapprox\.\s*/gi, "about ")
    .replace(/\be\.\s?g\.\s*/gi, "for example ")
    .replace(/\bi\.\s?e\.\s*/gi, "that is ")
    .replace(/~\s*(?=\d)/g, "about ")
    .trim();
  const sentences = withoutCitations.match(/[^.!?]+(?:[.!?]+|$)/g) ?? [];
  return sentences
    .map((sentence) => sentence.trim())
    .filter(
      (sentence) =>
        sentence && !RESEARCH_NOTE.test(sentence) && !INTERNAL_SLUG.test(sentence),
    )
    .join(" ")
    .trim();
}

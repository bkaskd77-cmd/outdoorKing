import type { GuideView } from "@/content/guides";
import { withoutPlaceholders } from "@/lib/placeholders";

/** A travel guide as a card: title and first paragraph. */
export function GuideCard({ guide }: { guide: GuideView }) {
  return (
    <a
      href={guide.path}
      className="block h-full rounded-xl border border-border bg-surface p-5 shadow-1 transition-shadow hover:shadow-2"
    >
      <span className="block font-semibold">{guide.title}</span>
      <span className="mt-2 line-clamp-3 text-small text-muted-foreground">
        {withoutPlaceholders(guide.summary)}
      </span>
    </a>
  );
}

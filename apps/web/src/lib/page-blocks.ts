import { withoutPlaceholders } from "./placeholders";

export type Block =
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "para"; text: string };

/**
 * Page text from the CMS. Plain lines are paragraphs; a line starting with "## " is a
 * heading and consecutive lines starting with "- " form a bullet list, so editors get
 * structure from the plain text box.
 */
export function blocksOf(text: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of withoutPlaceholders(text).split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("## ")) {
      blocks.push({ kind: "heading", text: line.slice(3).trim() });
    } else if (line.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      const item = line.slice(2).trim();
      if (last?.kind === "list") last.items.push(item);
      else blocks.push({ kind: "list", items: [item] });
    } else {
      blocks.push({ kind: "para", text: line });
    }
  }
  return blocks;
}

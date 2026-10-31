import { describe, expect, it } from "vitest";

import de from "../../messages/de.json";
import en from "../../messages/en.json";

type Messages = { [key: string]: string | Messages };

function flatten(messages: Messages, prefix = ""): Map<string, string> {
  const out = new Map<string, string>();
  for (const [key, value] of Object.entries(messages)) {
    if (typeof value === "string") out.set(prefix + key, value);
    else for (const [k, v] of flatten(value, `${prefix}${key}.`)) out.set(k, v);
  }
  return out;
}

/** Placeholder names in an ICU message, e.g. {count} or {trip}. */
const placeholders = (text: string) =>
  [...text.matchAll(/\{(\w+)[,}]/g)].map((match) => match[1]).sort();

describe("German messages", () => {
  const english = flatten(en as Messages);
  const german = flatten(de as Messages);

  it("cover every English message", () => {
    expect([...english.keys()].filter((key) => !german.has(key))).toEqual([]);
  });

  it("use the same placeholders as English", () => {
    for (const [key, text] of english) {
      const local = german.get(key);
      if (local !== undefined)
        expect([key, placeholders(local)]).toEqual([key, placeholders(text)]);
    }
  });
});

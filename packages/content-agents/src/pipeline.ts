import { runAlias } from "@ok/ai";
import { can } from "@ok/auth/rbac";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export const contentTypes = ["trip", "region", "post", "faq"] as const;
export type ContentType = (typeof contentTypes)[number];

export type Source = {
  url: string;
  title: string;
  accessedAt: string;
  note?: string;
};

export type AgentDraft = {
  type: ContentType;
  slug: string;
  title: string;
  body: string;
  status: "draft";
  sources: Source[];
  factCheck: { notes: string; checkedAt: string };
  seo: { title: string; description: string };
};

export type ContentWriter = {
  createDraft: (draft: AgentDraft) => Promise<{ id: string }>;
};

export type RunResult = {
  draft: AgentDraft;
  runPath: string;
  written: { id: string } | null;
  publishAllowed: boolean;
};

const mockFaq: Record<string, AgentDraft> = {
  "what-is-tims": {
    type: "faq",
    slug: "what-is-tims",
    title: "What is TIMS?",
    body: "TIMS is the Trekkers' Information Management System used in Nepal to register trekkers. OutdoorKing handles TIMS paperwork for private journeys. Fees and card types are [[TBD: 2026 TIMS fee table]] and must be confirmed against the official issuer before publish.",
    status: "draft",
    sources: [
      {
        url: "https://www.tourismdepartment.gov.np/",
        title: "Nepal Department of Tourism",
        accessedAt: "2026-10-20",
        note: "Issuer of trekking regulation; fee table not copied until verified.",
      },
    ],
    factCheck: {
      notes: "No numeric fees emitted. Placeholder retained for owner confirmation.",
      checkedAt: new Date().toISOString(),
    },
    seo: {
      title: "What is TIMS? | Nepal trekking permits",
      description:
        "TIMS is Nepal's Trekkers' Information Management System. Learn what it is and how licensed agencies handle it.",
    },
  },
};

export async function runPipeline(options: {
  type: ContentType;
  slug: string;
  brief?: string;
  writer?: ContentWriter;
  runsDir: string;
}): Promise<RunResult> {
  const stages = ["researcher", "writer", "fact-checker", "seo", "brand"] as const;
  const research = await runAlias(
    "content.write",
    `Research ${options.type} ${options.slug}\n${options.brief ?? ""}`,
    options.slug === "what-is-tims"
      ? "TIMS = Trekkers' Information Management System"
      : undefined,
  );
  const written = await runAlias(
    "content.write",
    `Write ${options.type} from research: ${research.text}`,
    mockFaq[options.slug]?.body,
  );
  const checked = await runAlias(
    "content.factcheck",
    `Fact-check: ${written.text}`,
    mockFaq[options.slug]?.factCheck.notes,
  );

  const draft: AgentDraft =
    mockFaq[options.slug] ??
    ({
      type: options.type,
      slug: options.slug,
      title: options.slug.replace(/-/g, " "),
      body: written.text,
      status: "draft",
      sources: [
        {
          url: "https://www.tourismdepartment.gov.np/",
          title: "Department of Tourism (placeholder source)",
          accessedAt: new Date().toISOString().slice(0, 10),
        },
      ],
      factCheck: { notes: checked.text, checkedAt: new Date().toISOString() },
      seo: { title: options.slug, description: written.text.slice(0, 140) },
    } satisfies AgentDraft);

  const date = new Date().toISOString().slice(0, 10);
  const runPath = join(options.runsDir, date, `${options.slug}.json`);
  await mkdir(dirname(runPath), { recursive: true });
  await writeFile(
    runPath,
    JSON.stringify({ stages, research, written, checked, draft }, null, 2),
    "utf8",
  );

  const created = options.writer ? await options.writer.createDraft(draft) : null;
  const publishAllowed = can({ role: "ai_agent" }, "content:publish");

  return { draft, runPath, written: created, publishAllowed };
}

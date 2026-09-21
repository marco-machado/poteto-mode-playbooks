import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import {
  PLAYBOOK_RAW,
  catalog,
  type CatalogItem,
} from "@/lib/catalog";
import { parsePlaybookMarkdown } from "@/lib/parse-playbook";

export type { PlaybookGroup } from "@/lib/catalog";
export type { PlaybookSection, PlaybookStep } from "@/lib/parse-playbook";
export {
  SOURCE_PLAYBOOKS,
  SOURCE_REPO,
  SKILL_SOURCE,
  catalog,
  groups,
} from "@/lib/catalog";

export type Playbook = CatalogItem & {
  intro: string;
  sections: import("@/lib/parse-playbook").PlaybookSection[];
  steps: import("@/lib/parse-playbook").PlaybookStep[];
  notes: string;
  reply: string;
};

const cache = new Map<string, Playbook>();

async function readMarkdown(slug: string): Promise<string> {
  const local = join(process.cwd(), "content/playbooks", `${slug}.md`);
  if (existsSync(local)) return readFileSync(local, "utf8");
  const response = await fetch(`${PLAYBOOK_RAW}/${slug}.md`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error(`Could not load playbook ${slug} (${response.status})`);
  }
  return response.text();
}

export function getCatalogItem(slug: string) {
  return catalog.find((item) => item.slug === slug);
}

export function neighbors(slug: string) {
  const index = catalog.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? catalog[index - 1] : null,
    next: index >= 0 && index < catalog.length - 1 ? catalog[index + 1] : null,
  };
}

export async function loadPlaybook(slug: string): Promise<Playbook | undefined> {
  const cached = cache.get(slug);
  if (cached) return cached;
  const meta = getCatalogItem(slug);
  if (!meta) return undefined;
  const markdown = await readMarkdown(slug);
  const parsed = parsePlaybookMarkdown(slug, markdown);
  const playbook: Playbook = {
    ...meta,
    title: parsed.title,
    own: parsed.own ?? meta.own,
    intro: parsed.intro,
    sections: parsed.sections,
    steps: parsed.steps,
    notes: parsed.notes,
    reply: parsed.reply,
  };
  cache.set(slug, playbook);
  return playbook;
}

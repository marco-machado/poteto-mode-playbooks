export type PlaybookStep = {
  n: number;
  title: string;
  body: string;
};

export type PlaybookSection = {
  heading: string;
  body: string;
};

export type ParsedPlaybook = {
  title: string;
  own: string | null;
  intro: string;
  sections: PlaybookSection[];
  steps: PlaybookStep[];
  notes: string;
  reply: string;
};

const OPENING_HEADINGS = new Set([
  "Worktree",
  "Commits",
  "PRs",
  "Titles",
  "Descriptions",
  "Forge",
  "Size and stacks",
  "Readiness",
  "Babysit",
]);

function splitSections(blob: string): { lead: string; sections: PlaybookSection[] } {
  const parts = blob.split(/^#### (.+)$/m);
  const lead = parts[0].trim();
  const sections: PlaybookSection[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i].trim();
    const body = (parts[i + 1] ?? "").trim();
    if (heading.toLowerCase() === "steps") continue;
    sections.push({ heading, body });
  }
  return { lead, sections };
}

function parseOpeningSections(text: string): { intro: string; steps: PlaybookStep[] } {
  const lines = text.split("\n");
  let i = 0;
  while (i < lines.length && !lines[i].startsWith("### ")) i += 1;
  i += 1;
  const bodyLines = lines.slice(i);
  const steps: PlaybookStep[] = [];
  let currentTitle: string | null = null;
  let currentBuf: string[] = [];
  const introBuf: string[] = [];
  let started = false;

  const flush = () => {
    if (currentTitle === null) return;
    steps.push({
      n: steps.length + 1,
      title: currentTitle,
      body: currentBuf.join("\n").trim(),
    });
    currentTitle = null;
    currentBuf = [];
  };

  for (const line of bodyLines) {
    const match = line.match(/^\*\*([^*]+)\.\*\*\s*(.*)$/);
    if (match && OPENING_HEADINGS.has(match[1])) {
      if (!started) started = true;
      else flush();
      currentTitle = match[1];
      const rest = match[2].trim();
      currentBuf = rest ? [rest] : [];
      continue;
    }
    if (!started) introBuf.push(line);
    else currentBuf.push(line);
  }
  flush();
  return { intro: introBuf.join("\n").trim(), steps };
}

function parseNumbered(text: string): {
  intro: string;
  steps: Array<PlaybookStep & { boldLead: boolean }>;
  trailing: string;
  reply: string;
} {
  const lines = text.split("\n");
  let i = 0;
  while (i < lines.length && !lines[i].startsWith("### ")) i += 1;
  i += 1;

  const introLines: string[] = [];
  while (i < lines.length) {
    if (/^\d+\.\s+/.test(lines[i])) break;
    if (lines[i].startsWith("#### Steps")) {
      i += 1;
      continue;
    }
    if (lines[i].trim() === "**Steps:**") {
      i += 1;
      continue;
    }
    introLines.push(lines[i]);
    i += 1;
  }

  const steps: Array<PlaybookStep & { boldLead: boolean }> = [];
  while (i < lines.length) {
    const match = lines[i].match(/^(\d+)\.\s+(.*)$/);
    if (!match) break;
    const n = Number(match[1]);
    const buf = [match[2]];
    i += 1;
    while (i < lines.length) {
      if (/^\d+\.\s+/.test(lines[i])) break;
      if (lines[i].startsWith("**Reply:")) break;
      if (lines[i].startsWith("#### ") && !lines[i].startsWith("#### Steps")) break;
      if (lines[i].startsWith("````")) break;
      buf.push(lines[i]);
      i += 1;
    }
    while (buf.length && buf[buf.length - 1].trim() === "") buf.pop();
    const raw = buf.join("\n").trim();
    const first = raw.split("\n", 1)[0].trim();
    const titleMatch = first.match(/^\*\*([^*]+)\.\*\*\s*(.*)$/);
    if (titleMatch) {
      const restFirst = titleMatch[2].trim();
      const rest = raw.includes("\n") ? raw.split("\n").slice(1).join("\n") : "";
      steps.push({
        n,
        title: titleMatch[1].trim(),
        body: (restFirst + (rest ? `\n${rest}` : "")).trim(),
        boldLead: true,
      });
    } else {
      steps.push({
        n,
        title: first,
        body: raw.includes("\n") ? raw.split("\n").slice(1).join("\n").trim() : "",
        boldLead: false,
      });
    }
  }

  const trailingLines: string[] = [];
  let reply = "";
  while (i < lines.length) {
    if (lines[i].startsWith("**Reply:")) {
      const replyParts = [lines[i].replace("**Reply:**", "").trim()];
      i += 1;
      while (i < lines.length) {
        replyParts.push(lines[i]);
        i += 1;
      }
      reply = replyParts.join("\n").trim();
      break;
    }
    trailingLines.push(lines[i]);
    i += 1;
  }

  let trailing = trailingLines.join("\n").trim();
  if (trailing.includes("````markdown")) {
    const before = trailing.split("````markdown", 1)[0].trim();
    trailing = `${before}\n\nThe remaining source is a filled-in plan skeleton (headings, program checklist, per-PR blocks, appendices). Copy it from the playbook file. Do not invent a plan.`.trim();
  }

  if (steps.length) {
    const last = steps[steps.length - 1];
    if (!last.boldLead && last.body && trailing === "") {
      trailing = last.body;
      last.body = "";
    }
  }

  return { intro: introLines.join("\n").trim(), steps, trailing, reply };
}

export function parsePlaybookMarkdown(slug: string, text: string): ParsedPlaybook {
  const titleMatch = text.match(/^###\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : slug;
  const ownMatch = text.match(/^\*\*(You own[^*]+)\*\*/m);
  const own = ownMatch ? ownMatch[1].trim() : null;

  let intro: string;
  let steps: PlaybookStep[];
  let trailing: string;
  let reply: string;

  if (slug === "opening-a-pr") {
    const parsed = parseOpeningSections(text);
    intro = parsed.intro;
    steps = parsed.steps;
    trailing = "";
    reply = "Post the URL and keep building. A subagent returns the URL and does not babysit.";
  } else {
    const parsed = parseNumbered(text);
    intro = parsed.intro;
    steps = parsed.steps.map(({ n, title: stepTitle, body }) => ({
      n,
      title: stepTitle,
      body,
    }));
    trailing = parsed.trailing;
    reply = parsed.reply;
  }

  const introSplit = splitSections(intro);
  const noteSplit = splitSections(trailing);

  return {
    title,
    own,
    intro: introSplit.lead,
    sections: [...introSplit.sections, ...noteSplit.sections],
    steps,
    notes: noteSplit.lead,
    reply,
  };
}

"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function ExamplePrompts({ prompts }: { prompts: readonly string[] }) {
  if (prompts.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Example prompts
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground text-pretty">
          Paste into Cursor. The mode matches a playbook from the request, not
          from this page.
        </p>
      </div>
      <ul className="flex flex-col gap-3">
        {prompts.map((prompt) => (
          <li key={prompt}>
            <PromptCard prompt={prompt} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function PromptCard({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex items-start gap-2 rounded-xl bg-card p-3 ring-1 ring-foreground/10 sm:p-4">
      <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-[13px] leading-relaxed text-pretty whitespace-pre-wrap text-foreground">
        {prompt}
      </pre>
      <Button
        type="button"
        size="icon-sm"
        variant="ghost"
        aria-label={copied ? "Copied" : "Copy prompt"}
        onClick={() => void copy()}
        className="shrink-0"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}

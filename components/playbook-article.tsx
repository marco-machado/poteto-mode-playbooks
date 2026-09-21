import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react";

import { ExamplePrompts } from "@/components/example-prompts";
import { PlaybookCanvas } from "@/components/scenes/dynamic-canvas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { examplePromptsFor } from "@/lib/example-prompts";
import { neighbors, type Playbook } from "@/lib/playbooks";
import { RichInline, RichText } from "@/lib/rich-text";

export function PlaybookArticle({ playbook }: { playbook: Playbook }) {
  const { prev, next } = neighbors(playbook.slug);

  return (
    <article className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <div className="flex flex-col gap-4">
        <Button
          nativeButton={false}
          variant="ghost"
          size="sm"
          className="w-fit"
          render={<Link href="/" />}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          All playbooks
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{playbook.groupLabel}</Badge>
          <span className="font-mono text-xs text-muted-foreground">
            {String(playbook.order).padStart(2, "0")} / 23
          </span>
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          {playbook.title}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground text-pretty sm:text-lg">
          {playbook.whenToUse}
        </p>
        {playbook.own ? (
          <p className="text-sm font-medium text-foreground">{playbook.own}</p>
        ) : null}
      </div>

      <PlaybookCanvas
        slug={playbook.slug}
        color={playbook.accent}
        caption={playbook.metaphor}
      />

      <ExamplePrompts prompts={examplePromptsFor(playbook.slug)} />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            In plain language
          </h2>
          <p className="text-lg leading-relaxed text-pretty">{playbook.idea}</p>
          <RichText text={playbook.intro} />
        </div>
        <div className="flex flex-col gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Reply contract
          </h2>
          <RichText text={playbook.reply} />
          <a
            href={playbook.sourceUrl}
            className="inline-flex items-center gap-1 text-sm text-foreground underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Source markdown
            <ExternalLinkIcon className="size-3.5" />
          </a>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Walkthrough
        </h2>
        <ol className="flex flex-col gap-3">
          {playbook.steps.map((step) => (
            <li
              key={step.n}
              className="flex gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground">
                {step.n}
              </span>
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="font-medium text-pretty leading-snug">
                  <RichInline text={step.title} className="text-foreground" />
                </h3>
                {step.body ? <RichText text={step.body} /> : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {playbook.notes ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Also in the source
          </h2>
          <RichText text={playbook.notes} />
        </section>
      ) : null}

      {playbook.sections.length > 0 ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Supporting sections
          </h2>
          <Accordion multiple className="rounded-xl bg-card px-4 ring-1 ring-foreground/10">
            {playbook.sections.map((section) => (
              <AccordionItem key={section.heading} value={section.heading}>
                <AccordionTrigger>{section.heading}</AccordionTrigger>
                <AccordionContent>
                  <RichText text={section.body} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ) : null}

      <Separator />

      <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {prev ? (
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href={`/playbooks/${prev.slug}`} />}
          >
            <ArrowLeftIcon data-icon="inline-start" />
            {prev.title}
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href={`/playbooks/${next.slug}`} />}
          >
            {next.title}
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        ) : null}
      </nav>
    </article>
  );
}

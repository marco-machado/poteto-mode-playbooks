import { HomeCanvas } from "@/components/scenes/dynamic-canvas";
import { PlaybookIndex } from "@/components/playbook-index";
import { SKILL_SOURCE, SOURCE_REPO } from "@/lib/catalog";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:py-16">
      <section className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col gap-5">
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Cursor pstack / poteto-mode
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Twenty-three playbooks. One sticky mode.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            `/poteto-mode` reads the task, matches a playbook, and runs pstack
            skills as the steps need them. The mode stays sticky until the work
            is done. This site walks each playbook with motion, not a second
            copy of the skill file.
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty">
            pstack is poteto&apos;s answer to slop: write less, verify more, and
            parallelize only when a single agent can be trusted. Content is
            from the public{" "}
            <a className="text-foreground underline-offset-4 hover:underline" href={SOURCE_REPO}>
              cursor/plugins pstack
            </a>{" "}
            repo (MIT). This is a walkthrough explainer, not an official Cursor
            product. Routing rules live in{" "}
            <a className="text-foreground underline-offset-4 hover:underline" href={SKILL_SOURCE}>
              poteto-mode/SKILL.md
            </a>
            .
          </p>
        </div>
        <HomeCanvas />
      </section>
      <PlaybookIndex />
    </div>
  );
}

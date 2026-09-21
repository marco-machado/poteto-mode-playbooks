import { SOURCE_PLAYBOOKS, SOURCE_REPO } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-start md:justify-between">
        <p className="max-w-xl text-pretty">
          Walkthrough explainer of{" "}
          <a className="text-foreground underline-offset-4 hover:underline" href={SOURCE_REPO}>
            poteto / Cursor pstack
          </a>
          , MIT licensed. This site is not an official Cursor product. Playbook steps are taken
          from the{" "}
          <a
            className="text-foreground underline-offset-4 hover:underline"
            href={SOURCE_PLAYBOOKS}
          >
            public playbook markdown
          </a>
          .
        </p>
        <p>Sticky mode, playbook routing, then verify on the real artifact.</p>
      </div>
    </footer>
  );
}

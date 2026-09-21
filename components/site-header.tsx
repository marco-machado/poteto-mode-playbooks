import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-medium tracking-tight">
          <span className="inline-flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs">
            P
          </span>
          <span>Poteto-mode playbooks</span>
        </Link>
        <Button
          nativeButton={false}
          variant="outline"
          size="sm"
          render={
            <a
              href="https://github.com/cursor/plugins/tree/main/pstack"
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          pstack source
        </Button>
      </div>
    </header>
  );
}

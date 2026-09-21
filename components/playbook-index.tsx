"use client";

import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  catalog,
  groups,
  type CatalogItem,
  type PlaybookGroup,
} from "@/lib/catalog";

function PlaybookCard({ playbook }: { playbook: CatalogItem }) {
  return (
    <Link href={`/playbooks/${playbook.slug}`} className="block h-full">
      <Card className="h-full transition-colors hover:bg-muted/40">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline">{playbook.groupLabel}</Badge>
            <span className="font-mono text-xs text-muted-foreground">
              {String(playbook.order).padStart(2, "0")}
            </span>
          </div>
          <CardTitle className="text-lg">{playbook.title}</CardTitle>
          <CardDescription>{playbook.whenToUse}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function PlaybookIndex() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<PlaybookGroup | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return catalog.filter((playbook) => {
      const groupOk = group === "all" || playbook.group === group;
      if (!groupOk) return false;
      if (!needle) return true;
      return (
        playbook.title.toLowerCase().includes(needle) ||
        playbook.whenToUse.toLowerCase().includes(needle) ||
        playbook.idea.toLowerCase().includes(needle) ||
        playbook.slug.includes(needle)
      );
    });
  }, [group, query]);

  return (
    <section className="flex flex-col gap-6" id="playbooks">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search 23 playbooks"
            aria-label="Search playbooks"
            className="pl-8"
          />
        </div>
        <ToggleGroup
          value={[group]}
          onValueChange={(value) => {
            const next = value[0] as PlaybookGroup | "all" | undefined;
            if (next) setGroup(next);
          }}
          variant="outline"
          size="sm"
          className="flex-wrap"
        >
          {groups.map((item) => (
            <ToggleGroupItem key={item.id} value={item.id}>
              {item.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      {filtered.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>No playbooks match</EmptyTitle>
            <EmptyDescription>
              Try another search term or clear the group filter.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((playbook) => (
            <PlaybookCard key={playbook.slug} playbook={playbook} />
          ))}
        </div>
      )}
    </section>
  );
}

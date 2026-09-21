import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PlaybookArticle } from "@/components/playbook-article";
import { catalog } from "@/lib/catalog";
import { assertExamplePrompts } from "@/lib/example-prompts";
import { loadPlaybook } from "@/lib/playbooks";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  assertExamplePrompts();
  return catalog.map((playbook) => ({ slug: playbook.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const playbook = await loadPlaybook(slug);
  if (!playbook) return { title: "Playbook" };
  return {
    title: playbook.title,
    description: playbook.whenToUse,
  };
}

export default async function PlaybookPage({ params }: Props) {
  const { slug } = await params;
  const playbook = await loadPlaybook(slug);
  if (!playbook) notFound();
  return <PlaybookArticle playbook={playbook} />;
}

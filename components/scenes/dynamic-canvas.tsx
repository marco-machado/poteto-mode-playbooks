"use client";

import dynamic from "next/dynamic";

function PlaybookFrame() {
  return (
    <div className="h-[240px] rounded-2xl bg-[#0c0c0e] ring-1 ring-foreground/10 sm:h-[320px] lg:h-[380px]" />
  );
}

function HomeFrame() {
  return (
    <div className="h-[220px] rounded-2xl bg-[#0c0c0e] ring-1 ring-foreground/10 sm:h-[280px] lg:h-[340px]" />
  );
}

export const PlaybookCanvas = dynamic(
  () => import("./playbook-canvas").then((mod) => mod.PlaybookCanvas),
  { ssr: false, loading: () => <PlaybookFrame /> }
);

export const HomeCanvas = dynamic(
  () => import("./playbook-canvas").then((mod) => mod.HomeCanvas),
  { ssr: false, loading: () => <HomeFrame /> }
);

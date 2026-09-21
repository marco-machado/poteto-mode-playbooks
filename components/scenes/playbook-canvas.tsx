"use client";

import { Canvas } from "@react-three/fiber";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Floor, HomeConstellation, Lights, sceneBySlug } from "@/components/scenes/scenes";
import { usePrefersReducedMotion } from "@/components/scenes/use-prefers-reduced-motion";

export function PlaybookCanvas({
  slug,
  color,
  caption,
}: {
  slug: string;
  color: string;
  caption: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);
  const still = reduced || paused;
  const Scene = useMemo(() => sceneBySlug[slug], [slug]);

  return (
    <figure className="overflow-hidden rounded-2xl ring-1 ring-foreground/10">
      <div className="relative h-[240px] bg-[#0c0c0e] sm:h-[320px] lg:h-[380px]">
        <Canvas
          dpr={[1, 1.6]}
          frameloop={still ? "demand" : "always"}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          camera={{ position: [0, 1.35, 5.4], fov: 42 }}
          onCreated={(state) => state.invalidate()}
        >
          <color attach="background" args={["#0c0c0e"]} />
          <fog attach="fog" args={["#0c0c0e", 7, 14]} />
          <Lights />
          <Floor />
          {Scene ? Scene({ color, paused: still }) : null}
        </Canvas>
        <div className="absolute top-3 right-3">
          <Button
            type="button"
            size="icon-sm"
            variant="secondary"
            aria-label={still ? "Play motion" : "Pause motion"}
            onClick={() => setPaused((value) => !value)}
            disabled={reduced}
          >
            {still ? <PlayIcon /> : <PauseIcon />}
          </Button>
        </div>
      </div>
      <figcaption className="flex items-start justify-between gap-3 border-t border-border bg-card px-4 py-3 text-sm text-muted-foreground">
        <span>{caption}</span>
        {reduced ? (
          <span className="shrink-0 text-xs tracking-wide uppercase">
            Reduced motion
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function HomeCanvas() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="relative h-[220px] overflow-hidden rounded-2xl bg-[#0c0c0e] ring-1 ring-foreground/10 sm:h-[280px] lg:h-[340px]">
        <Canvas
          dpr={[1, 1.5]}
          frameloop={reduced ? "demand" : "always"}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          camera={{ position: [0, 0.2, 6.2], fov: 40 }}
          onCreated={(state) => state.invalidate()}
        >
        <color attach="background" args={["#0c0c0e"]} />
        <fog attach="fog" args={["#0c0c0e", 8, 16]} />
        <Lights />
        <HomeConstellation paused={reduced} />
      </Canvas>
    </div>
  );
}

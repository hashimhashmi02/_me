"use client";

import dynamic from "next/dynamic";
import { SITE } from "@/lib/data";
import { useEffects } from "@/lib/effects";
import { Reveal } from "@/components/ui/reveal";
import Magnetic from "@/components/ui/magnetic";
import StaticHero from "@/components/three/static-hero";
import { scrollToTarget } from "@/components/providers/smooth-scroll";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <StaticHero />,
});

export default function Hero() {
  const { ready, reduced } = useEffects();

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      <div className="absolute inset-0">
        {ready && !reduced ? <HeroScene /> : <StaticHero />}
      </div>

      {/* readability scrim over the canvas, fading toward the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/55 via-transparent to-bg"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-24 md:px-8">
        <Reveal kind="mask" delay={0.15}>
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="pulse-dot" aria-hidden />
            {SITE.status} · {SITE.location}
          </p>
        </Reveal>

        <Reveal kind="mask" delay={0.3}>
          <h1 className="display-hero mt-6">
            Hashim<span className="text-signal">.</span>
          </h1>
        </Reveal>

        <Reveal kind="mask" delay={0.5}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/85 md:text-xl">
            {SITE.positioning}
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget("#work");
                }}
                data-cursor-label="work"
                className="border-signal inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:text-cyan"
              >
                See the work
                <span aria-hidden>↓</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={SITE.resume}
                data-cursor-label="pdf"
                className="eyebrow rounded-full px-5 py-3 text-muted transition-colors hover:text-ink"
              >
                Résumé ↗
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="eyebrow text-muted/70">scroll</span>
          <span className="scroll-cue block h-10 w-px bg-gradient-to-b from-cyan via-violet to-transparent" />
        </div>
      </div>
    </section>
  );
}

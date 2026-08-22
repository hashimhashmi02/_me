"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/data";
import { useEffects } from "@/lib/effects";
import { signal } from "@/lib/pointer";
import { hasRevealed, subscribeLoading } from "@/lib/loading";
import { Reveal } from "@/components/ui/reveal";
import Magnetic from "@/components/ui/magnetic";
import StaticHero from "@/components/three/static-hero";
import { scrollToTarget } from "@/components/providers/smooth-scroll";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <StaticHero />,
});

export default function Hero() {
  const { ready, reduced } = useEffects();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  // hero copy mounts only after the loader clears, so its mask reveals play
  // to a watching visitor instead of behind the boot screen
  const revealed = useSyncExternalStore(
    subscribeLoading,
    hasRevealed,
    () => false
  );

  // idle the canvas when the hero is far off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "25% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // pinned handoff: hold the hero, dolly the 3D camera, lift the copy out
  useEffect(() => {
    if (!ready || reduced || !revealed) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=65%",
          pin: true,
          scrub: 0.4,
          onUpdate: (self) => {
            signal.scroll = self.progress;
          },
        },
      });
      tl.to(
        contentRef.current,
        { yPercent: -16, opacity: 0, ease: "none" },
        0
      ).to(cueRef.current, { opacity: 0, ease: "none" }, 0);
    }, sectionRef);
    return () => {
      ctx.revert();
      signal.scroll = 0;
    };
  }, [ready, reduced, revealed]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {ready && !reduced ? <HeroScene active={active} /> : <StaticHero />}
      </div>

      {/* readability scrim over the canvas, fading toward the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/50 via-transparent to-bg"
      />

      <div
        ref={contentRef}
        key={revealed ? "revealed" : "booting"}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-20 md:px-8"
      >
        <Reveal kind="mask" delay={0.2}>
          <p className="eyebrow flex items-center gap-3 text-muted">
            <span className="pulse-dot" aria-hidden />
            {SITE.status} · {SITE.location}
          </p>
        </Reveal>

        <Reveal kind="mask" delay={0.34}>
          <h1 className="display-hero mt-6">
            Hashim<span className="text-signal">.</span>
          </h1>
        </Reveal>

        <Reveal kind="mask" delay={0.52}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/85 md:text-xl">
            Full-stack engineer building{" "}
            <span className="text-cyan">AI-integrated tools</span> that ship.
          </p>
        </Reveal>

        <Reveal delay={0.72}>
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

      <div
        ref={cueRef}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="eyebrow text-muted/70">scroll</span>
          <span className="scroll-cue block h-10 w-px bg-gradient-to-b from-cyan via-violet to-transparent" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import ProjectCard from "@/components/ui/project-card";
import { useEffects } from "@/lib/effects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Work() {
  const { ready, reduced } = useEffects();
  const sectionRef = useRef<HTMLElement>(null);
  const colA = useRef<HTMLDivElement>(null);
  const colB = useRef<HTMLDivElement>(null);

  // opposing column parallax, scrubbed by scroll
  useEffect(() => {
    if (!ready || reduced) return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        colA.current,
        { y: 0 },
        {
          y: -44,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
      gsap.fromTo(
        colB.current,
        { y: 0 },
        {
          y: 44,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [ready, reduced]);

  const left = PROJECTS.filter((_, i) => i % 2 === 0);
  const right = PROJECTS.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40"
    >
      <Reveal kind="mask">
        <p className="eyebrow text-violet">02 · work</p>
      </Reveal>
      <Reveal kind="mask" delay={0.08}>
        <h2 className="display-section mt-4 max-w-2xl">
          Built to be used, <span className="text-signal">not demoed</span>.
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-5 max-w-xl text-muted">
          Six projects, each with the one number or hard part that proves it
          runs in the real world.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
        <div ref={colA} className="flex flex-col gap-5 md:gap-6">
          {left.map((p, i) => (
            <Reveal key={p.slug} delay={0.08 * i} className="h-full">
              <ProjectCard project={p} index={PROJECTS.indexOf(p)} />
            </Reveal>
          ))}
        </div>
        <div ref={colB} className="flex flex-col gap-5 md:gap-6 md:mt-16">
          {right.map((p, i) => (
            <Reveal key={p.slug} delay={0.08 * i + 0.05} className="h-full">
              <ProjectCard project={p} index={PROJECTS.indexOf(p)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/data";
import { graphState } from "@/lib/graph-state";
import { useEffects } from "@/lib/effects";
import { Reveal } from "@/components/ui/reveal";

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const { reduced } = useEffects();
  const prefersReduced = useReducedMotion();
  const tiltEnabled = !reduced && !prefersReduced;

  // Tell the 3D system which subsystem to wake up.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          graphState.activeProject = index;
        } else if (graphState.activeProject === index) {
          graphState.activeProject = -1;
        }
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  // Pointer-tracked tilt + amber sheen. Direct style writes — no re-renders.
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled || e.pointerType !== "mouse") return;
    const card = cardRef.current;
    const sheen = sheenRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transition = "transform 80ms linear";
    card.style.transform = `perspective(1100px) rotateX(${(-py * 3.2).toFixed(2)}deg) rotateY(${(px * 4.2).toFixed(2)}deg)`;
    if (sheen) {
      sheen.style.opacity = "1";
      sheen.style.background = `radial-gradient(420px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,178,36,0.07), transparent 65%)`;
    }
  };

  const onPointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") graphState.activeProject = index;
  };

  const onPointerLeave = () => {
    const card = cardRef.current;
    const sheen = sheenRef.current;
    if (card) {
      card.style.transition = "transform 600ms cubic-bezier(0.21,0.65,0.32,1)";
      card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    }
    if (sheen) sheen.style.opacity = "0";
  };

  return (
    <article ref={ref}>
      <Reveal>
        <div
          ref={cardRef}
          onPointerMove={onPointerMove}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          className="panel group relative grid overflow-hidden rounded-xl will-change-transform md:grid-cols-2"
        >
          <div
            ref={sheenRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
          />
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden
            className={`relative block aspect-video overflow-hidden border-line max-md:border-b md:aspect-auto md:min-h-[300px] ${
              index % 2 === 1 ? "md:order-2 md:border-l" : "md:border-r"
            }`}
          >
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-bg/45 to-transparent" />
          </a>

          <div className="flex flex-col justify-center gap-5 p-7 sm:p-9">
            <div className="flex items-baseline justify-between gap-4">
              <p className="machine text-amber">{project.category}</p>
              <span className="machine text-faint">0{index + 1}</span>
            </div>

            <h3 className="display-section text-3xl">{project.title}</h3>

            <p className="leading-relaxed text-body">{project.description}</p>

            <p className="leading-relaxed text-body">
              <span className="font-medium text-ink">The hard part: </span>
              {project.hardPart}
            </p>

            <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="machine rounded border border-line px-2.5 py-1.5 text-faint"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-1 flex items-center gap-5">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="machine text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-amber hover:decoration-amber"
              >
                Live demo ↗
              </a>
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="machine text-faint underline decoration-line underline-offset-4 transition-colors hover:text-amber hover:decoration-amber"
              >
                Source ↗
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

export function Work() {
  // Clear the active cluster once the whole section scrolls away.
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) graphState.activeProject = -1;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-28 sm:px-8"
    >
      <Reveal>
        <p className="machine mb-3 text-amber">01 — selected work</p>
        <h2 id="work-heading" className="display-section text-4xl sm:text-5xl">
          Systems that ship.
        </h2>
        <p className="mt-4 max-w-xl text-body">
          Four products, four flavours of the same problem: an interface that
          has to stay honest with a system doing real work underneath.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-10">
        {PROJECTS.map((project, i) => (
          <ProjectCase key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

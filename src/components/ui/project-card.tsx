"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Project } from "@/lib/data";
import { useEffects } from "@/lib/effects";

const ACCENT = {
  cyan: "var(--color-cyan)",
  violet: "var(--color-violet)",
  magenta: "var(--color-magenta)",
} as const;

const GLOW = {
  cyan: "rgba(34, 227, 255, 0.14)",
  violet: "rgba(139, 92, 246, 0.16)",
  magenta: "rgba(255, 46, 151, 0.13)",
} as const;

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { reduced } = useEffects();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 3D tilt springs
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const rotateX = useTransform(rx, (v) => `${v}deg`);
  const rotateY = useTransform(ry, (v) => `${v}deg`);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rx.set((0.5 - py) * 7);
      ry.set((px - 0.5) * 9);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    },
    [reduced, rx, ry]
  );

  const onLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  // close the expanded panel on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const accent = ACCENT[project.accent];
  const glow = GLOW[project.accent];

  return (
    <>
      <div style={{ perspective: "1100px" }}>
        <motion.div
          ref={ref}
          layoutId={reduced ? undefined : `card-${project.slug}`}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={reduced ? undefined : { rotateX, rotateY }}
          className="group relative h-full"
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            data-cursor-label="open"
            aria-haspopup="dialog"
            className="panel relative block h-full w-full overflow-hidden rounded-2xl p-6 text-left transition-colors duration-300 md:p-8"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* pointer-tracked glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 65%)`,
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              }}
            />

            <span className="eyebrow block" style={{ color: accent }}>
              {String(index + 1).padStart(2, "0")} · {project.category}
            </span>
            <span className="display-card mt-4 block text-2xl md:text-3xl">
              {project.title}
            </span>
            <span className="mt-3 block max-w-md text-sm leading-relaxed text-muted">
              {project.description}
            </span>

            <span className="eyebrow mt-6 flex items-center gap-2 text-ink/90">
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full"
                style={{ background: accent }}
              />
              {project.proof}
            </span>

            <span className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="eyebrow rounded-full border border-line px-3 py-1.5 text-muted"
                >
                  {s}
                </span>
              ))}
            </span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[55] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close project details"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${project.title} details`}
              layoutId={reduced ? undefined : `card-${project.slug}`}
              initial={reduced ? { opacity: 0 } : undefined}
              animate={reduced ? { opacity: 1 } : undefined}
              className="panel relative w-full max-w-xl rounded-2xl p-8 md:p-10"
              style={{
                boxShadow: `0 0 80px -20px ${glow.replace("0.1", "0.3")}`,
              }}
            >
              <span className="eyebrow block" style={{ color: accent }}>
                {project.category}
              </span>
              <h3 className="display-card mt-3 text-3xl md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">
                {project.description}
              </p>
              <p className="eyebrow mt-5 flex items-center gap-2 text-ink/90">
                <span
                  aria-hidden
                  className="inline-block h-1 w-1 rounded-full"
                  style={{ background: accent }}
                />
                {project.proof}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="eyebrow rounded-full border border-line px-3 py-1.5 text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-label="visit"
                    className="border-signal rounded-full bg-surface-2 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:text-cyan"
                  >
                    Live ↗
                  </a>
                )}
                {project.source && (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-label="code"
                    className="eyebrow px-2 py-2 text-muted transition-colors hover:text-ink"
                  >
                    Source ↗
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="eyebrow ml-auto px-2 py-2 text-muted transition-colors hover:text-ink"
                >
                  Close · esc
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

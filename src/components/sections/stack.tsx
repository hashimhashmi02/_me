"use client";

import { useCallback, useRef } from "react";
import { STACK } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { useEffects } from "@/lib/effects";

/**
 * Reactive capability grid: every tile lights up in proportion to its
 * distance from the pointer — the whole board behaves like one instrument.
 */
export default function Stack() {
  const { reduced } = useEffects();
  const gridRef = useRef<HTMLUListElement>(null);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced) return;
      const grid = gridRef.current;
      if (!grid) return;
      for (const tile of Array.from(grid.children) as HTMLElement[]) {
        const r = tile.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.hypot(e.clientX - cx, e.clientY - cy);
        const heat = Math.max(0, 1 - d / 420);
        tile.style.setProperty("--heat", heat.toFixed(3));
        tile.style.setProperty(
          "--tx",
          `${((e.clientX - cx) / 420) * -4 * heat}px`
        );
        tile.style.setProperty(
          "--ty",
          `${((e.clientY - cy) / 420) * -4 * heat}px`
        );
      }
    },
    [reduced]
  );

  const onLeave = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    for (const tile of Array.from(grid.children) as HTMLElement[]) {
      tile.style.setProperty("--heat", "0");
      tile.style.setProperty("--tx", "0px");
      tile.style.setProperty("--ty", "0px");
    }
  }, []);

  return (
    <section
      id="stack"
      className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40"
    >
      <Reveal kind="mask">
        <p className="eyebrow text-magenta">03 · stack</p>
      </Reveal>
      <Reveal kind="mask" delay={0.08}>
        <h2 className="display-section mt-4 max-w-2xl">
          The board I play on.
        </h2>
      </Reveal>

      <ul
        ref={gridRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
      >
        {STACK.map((item, i) => (
          <li
            key={item.name}
            className="stack-tile panel rounded-xl p-5 md:p-6"
            style={{ animationDelay: `${(i % 4) * 0.7 + Math.floor(i / 4) * 0.35}s` }}
          >
            <span className="display-card block text-base md:text-lg">
              {item.name}
            </span>
            <span className="eyebrow mt-3 block text-muted/80">
              {item.note}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

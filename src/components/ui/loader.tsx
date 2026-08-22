"use client";

import { useEffect, useRef, useState } from "react";
import { useEffects } from "@/lib/effects";
import { isSceneReady, markRevealed, subscribeLoading } from "@/lib/loading";

const MIN_MS = 900; // never flash; the count should be readable
const MAX_MS = 4000; // never trap the visitor if WebGL never reports in

/**
 * Boot screen: counts 000 to 100 while fonts load and the WebGL scene
 * compiles, then wipes up. Holds scroll until it clears.
 */
export default function Loader() {
  const { ready, reduced } = useEffects();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ready) return;

    const start = performance.now();
    let fontsDone = false;
    let raf = 0;
    let shown = 0;
    let lastTick = start;

    document.fonts.ready.then(() => {
      fontsDone = true;
    });

    // Reduced mode renders no canvas, so nothing will ever report in.
    let unsub = () => {};
    if (reduced) {
      // fonts alone gate the boot
    } else {
      unsub = subscribeLoading(() => {});
    }

    const tick = () => {
      lastTick = performance.now();
      const elapsed = lastTick - start;
      const sceneDone = reduced || isSceneReady();

      // Each gate is worth part of the bar; time fills the rest so the
      // number always keeps moving even while waiting on the GPU.
      let target = Math.min(70, (elapsed / MIN_MS) * 70);
      if (fontsDone) target = Math.max(target, 78);
      if (sceneDone) target = Math.max(target, 92);
      if (fontsDone && sceneDone && elapsed >= MIN_MS) target = 100;
      if (elapsed >= MAX_MS) target = 100;

      shown += (target - shown) * 0.12;
      if (target === 100 && 100 - shown < 0.6) shown = 100;

      const rounded = Math.round(shown);
      setProgress(rounded);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${shown / 100})`;
      }

      if (shown >= 100) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Background tabs pause requestAnimationFrame entirely, which would leave
    // the loader parked over the page until the visitor came back to it.
    // Timers keep running, so use one to finish the boot if frames stall.
    const watchdog = setInterval(() => {
      if (performance.now() - lastTick > 1200) {
        setProgress(100);
        setDone(true);
      }
    }, 500);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(watchdog);
      unsub();
    };
  }, [ready, reduced]);

  // hold scroll while the loader is up
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  // start the hero intro clock once the wipe has played
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(markRevealed, 480);
    return () => clearTimeout(t);
  }, [done]);

  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setGone(true), 1000);
    return () => clearTimeout(t);
  }, [done]);

  if (gone) return null;

  return (
    <div
      aria-hidden={done}
      role="status"
      aria-live="polite"
      aria-label={done ? "Loaded" : `Loading ${progress} percent`}
      className={`fixed inset-0 z-[80] flex flex-col justify-end bg-bg transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        done ? "-translate-y-full opacity-0" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 pb-10 md:px-8 md:pb-14">
        <div className="flex items-end justify-between gap-6">
          <span className="eyebrow text-muted/70">
            hashim<span className="text-cyan">.</span>dev
          </span>
          <span
            className="font-mono text-[18vw] leading-[0.8] tracking-tighter text-ink md:text-[9rem]"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {String(progress).padStart(3, "0")}
          </span>
        </div>
        <span className="mt-6 block h-px w-full overflow-hidden bg-line">
          <span
            ref={barRef}
            className="block h-full w-full origin-left scale-x-0"
            style={{ background: "var(--gradient-signal)" }}
          />
        </span>
      </div>
    </div>
  );
}

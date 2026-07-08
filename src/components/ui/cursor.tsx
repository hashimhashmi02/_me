"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useEffects } from "@/lib/effects";

function subscribePointerType(onChange: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getFinePointer = () => window.matchMedia("(pointer: fine)").matches;
const getFinePointerServer = () => false;

/**
 * Custom cursor: a dot that sticks to the pointer and a trailing ring that
 * grows over interactive elements. Elements can label it via
 * [data-cursor-label]. Mounted only for fine pointers with effects on.
 */
export default function Cursor() {
  const { ready, reduced } = useEffects();
  const finePointer = useSyncExternalStore(
    subscribePointerType,
    getFinePointer,
    getFinePointerServer
  );
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const active = ready && !reduced && finePointer;

  useEffect(() => {
    if (!active) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.documentElement.classList.add("has-cursor");

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let seen = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!seen) {
        seen = true;
        rx = x;
        ry = y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        "a, button, [data-cursor-label], input, textarea, [role='button']"
      );
      if (el) {
        const text = el.getAttribute("data-cursor-label") ?? "";
        label.textContent = text;
        targetScale = text ? 3.2 : 2.2;
      } else {
        label.textContent = "";
        targetScale = 1;
      }
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.14;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [active]);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[65]">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-cyan opacity-0"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-cyan/40 opacity-0"
      >
        <span
          ref={labelRef}
          className="eyebrow scale-[0.3] whitespace-nowrap text-cyan"
        />
      </div>
    </div>
  );
}

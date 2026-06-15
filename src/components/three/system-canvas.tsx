"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { graphState, type GraphSection } from "@/lib/graph-state";
import { useEffects } from "@/lib/effects";
import { StaticSystem } from "./static-system";

const Scene = dynamic(() => import("./scene"), { ssr: false });

const SECTION_IDS: Array<[string, GraphSection]> = [
  ["top", "hero"],
  ["work", "work"],
  ["about", "about"],
  ["stack", "stack"],
  ["contact", "contact"],
];

/**
 * Fixed full-viewport layer behind the page. Renders the static poster
 * until the client decides effects are allowed, then lazily mounts the
 * WebGL canvas. Dims as the user scrolls past the hero so text always
 * wins, then comes back up for the contact convergence moment.
 */
export function SystemCanvas() {
  const { ready, reduced } = useEffects();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mountScene, setMountScene] = useState(false);

  // Defer the WebGL mount until after first paint so it never blocks LCP.
  useEffect(() => {
    if (!ready || reduced || mountScene) return;
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(() => setMountScene(true), { timeout: 1200 })
      : window.setTimeout(() => setMountScene(true), 350);
    return () => {
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [ready, reduced, mountScene]);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      graphState.scrollVh = window.scrollY / vh;
      const el = containerRef.current;
      if (el) {
        // Full strength in the hero, quiet mid-page, back up for contact.
        const fadeOut = Math.min(
          Math.max((window.scrollY - vh * 0.45) / (vh * 0.9), 0),
          1
        );
        const docEnd =
          document.documentElement.scrollHeight - vh - window.scrollY;
        const fadeIn = Math.min(Math.max(1 - docEnd / (vh * 1.2), 0), 1);
        el.style.opacity = String(1 - fadeOut * 0.62 * (1 - fadeIn * 0.85));
      }
    };
    const onPointer = (e: PointerEvent) => {
      graphState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      graphState.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
      graphState.pointerMovedAt = performance.now();
    };
    const onPointerDown = (e: PointerEvent) => {
      graphState.burstX = (e.clientX / window.innerWidth) * 2 - 1;
      graphState.burstY = -((e.clientY / window.innerHeight) * 2 - 1);
      graphState.burstSeq++;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  // Track which section owns the viewport — drives the graph's camera pose.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const match = SECTION_IDS.find(([id]) => id === entry.target.id);
          if (match) graphState.section = match[1];
        }
      },
      // A thin band around the viewport's vertical center decides ownership.
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTION_IDS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      {mountScene && ready && !reduced ? (
        <Scene />
      ) : (
        <div className="h-full w-full opacity-70">
          <StaticSystem />
        </div>
      )}
    </div>
  );
}

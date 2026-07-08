"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffects } from "@/lib/effects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Module-level handle so nav links can drive Lenis directly. */
let lenisInstance: Lenis | null = null;

export function scrollToTarget(target: string) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: 0 });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Lenis drives native scroll; GSAP's ticker drives Lenis; ScrollTrigger
 * listens to Lenis. (Modern Lenis keeps the real scrollbar, so no
 * scrollerProxy is needed — just the update hook.)
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready, reduced } = useEffects();

  useEffect(() => {
    if (!ready || reduced) return;

    const lenis = new Lenis({ lerp: 0.115, smoothWheel: true });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [ready, reduced]);

  return <>{children}</>;
}

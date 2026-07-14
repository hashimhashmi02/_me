"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffects } from "@/lib/effects";

const EASE = [0.22, 1, 0.36, 1] as const;

const variants: Record<"mask" | "fade", Variants> = {
  // line-level mask reveal: slides up from behind an overflow-hidden clip
  mask: {
    hidden: { y: "112%" },
    visible: (delay: number = 0) => ({
      y: "0%",
      transition: { duration: 0.9, ease: EASE, delay },
    }),
  },
  // block-level: fade + drift
  fade: {
    hidden: { opacity: 0, y: 28 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE, delay },
    }),
  },
};

export function Reveal({
  children,
  kind = "fade",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  kind?: "mask" | "fade";
  delay?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const { reduced } = useEffects();

  if (prefersReduced || reduced) {
    return <div className={className}>{children}</div>;
  }

  if (kind === "mask") {
    // whileInView must live on the clipping wrapper: the translated inner
    // element is fully clipped while hidden, so IntersectionObserver never
    // reports it as visible. The variant label propagates to the child.
    return (
      <motion.div
        className={`overflow-hidden ${className ?? ""}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-12% 0px" }}
        custom={delay}
      >
        <motion.div
          className="will-change-transform"
          variants={variants.mask}
          custom={delay}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants.fade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

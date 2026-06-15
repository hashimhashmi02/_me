export type GraphSection = "hero" | "work" | "about" | "stack" | "contact";

/**
 * Shared mutable state between the scrolling page and the 3D scene.
 * Written by DOM listeners / IntersectionObservers, read inside useFrame —
 * a plain object avoids re-rendering React on every scroll/pointer event.
 */
export const graphState = {
  /** Scroll position in viewport-heights (0 = top of page). */
  scrollVh: 0,
  /** Normalized pointer, -1..1, +x right, +y up. */
  pointerX: 0,
  pointerY: 0,
  /** performance.now() of the last pointer move — gates proximity glow. */
  pointerMovedAt: -1e9,
  /** Project index currently in view (0..3), or -1 when none. Maps to graph cluster index + 1. */
  activeProject: -1,
  /** Section currently occupying the viewport — drives the camera pose. */
  section: "hero" as GraphSection,
  /** Click/tap shockwave: bump seq and set ndc coords to fire one. */
  burstSeq: 0,
  burstX: 0,
  burstY: 0,
};

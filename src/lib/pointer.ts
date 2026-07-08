/**
 * Shared mutable state bridging DOM events (pointer, scroll, intro timeline)
 * into R3F's useFrame without triggering React re-renders.
 * Writers: hero section listeners + GSAP. Readers: three/ components per frame.
 */
export const signal = {
  /** pointer in NDC (-1..1), y up */
  x: 0,
  y: 0,
  /** smoothed pointer velocity magnitude (NDC units / s, clamped) */
  speed: 0,
  /** interaction energy 0..~1.5 — kicked by fast moves, decays in useFrame */
  energy: 0,
  /** hero scroll progress 0..1 (pin handoff) */
  scroll: 0,
  /** page-load settle progress 0..1 (driven by intro timeline) */
  intro: 0,
};

/** Per-event update from pointermove; dt in seconds. */
export function feedPointer(nx: number, ny: number, dt: number) {
  if (dt <= 0) dt = 1 / 120;
  const dx = nx - signal.x;
  const dy = ny - signal.y;
  const v = Math.min(Math.hypot(dx, dy) / dt, 8);
  // smooth the velocity, kick the energy
  signal.speed += (v - signal.speed) * 0.2;
  signal.energy = Math.min(signal.energy + v * 0.035, 1.5);
  signal.x = nx;
  signal.y = ny;
}

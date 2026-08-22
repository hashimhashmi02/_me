/**
 * Boot sequence state. The loader owns the screen until the WebGL scene has
 * compiled its shaders and fonts are in; the hero then plays its intro from
 * the moment the loader clears, not from page load.
 */

let sceneReady = false;
let revealAt = 0;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribeLoading(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Called once the R3F canvas exists and has rendered its first frame. */
export function markSceneReady() {
  if (sceneReady) return;
  sceneReady = true;
  emit();
}

export const isSceneReady = () => sceneReady;

/** Called when the loader finishes wiping away. Starts the hero intro clock. */
export function markRevealed() {
  if (revealAt) return;
  revealAt = performance.now();
  emit();
}

export const hasRevealed = () => revealAt !== 0;

/** Seconds since the loader cleared; 0 while still loading. */
export function revealElapsed() {
  return revealAt ? (performance.now() - revealAt) / 1000 : 0;
}

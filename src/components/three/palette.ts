import * as THREE from "three";

/**
 * Palette tokens for the WebGL layer — mirrors the @theme block in
 * src/app/globals.css (the canonical definition). Kept as constants because
 * reading CSS vars at canvas-mount time races stylesheet injection in dev.
 */
export const PALETTE = {
  bg: "#08080c",
  cyan: "#22e3ff",
  violet: "#8b5cf6",
  magenta: "#ff2e97",
  lime: "#b4ff39",
} as const;

export function paletteColor(name: keyof typeof PALETTE): THREE.Color {
  return new THREE.Color(PALETTE[name]);
}

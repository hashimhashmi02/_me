"use client";

import { Canvas } from "@react-three/fiber";

/**
 * The hero WebGL layer. Loaded via next/dynamic (ssr: false) from the hero
 * section — Three.js never ships to routes that don't render this.
 */
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ position: "absolute", inset: 0 }}
    />
  );
}

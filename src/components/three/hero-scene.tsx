"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import HeroBackground from "./hero-background";
import SignalCore from "./signal-core";
import { feedPointer, signal } from "@/lib/pointer";

/** Dolly the camera as the pinned hero scrolls out — the handoff shot. */
function CameraRig() {
  useFrame(({ camera }) => {
    const z = 4.2 + signal.scroll * 2.3;
    const y = signal.scroll * -0.45;
    camera.position.z += (z - camera.position.z) * 0.12;
    camera.position.y += (y - camera.position.y) * 0.12;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * The hero WebGL layer. Loaded via next/dynamic (ssr: false) from the hero
 * section — Three.js never ships to routes that don't render this.
 */
export default function HeroScene({ active = true }: { active?: boolean }) {
  // budget switch: phones get fewer verts/particles and a shorter fx chain
  const low = useMemo(
    () => window.matchMedia("(max-width: 768px)").matches,
    []
  );

  // bridge pointer → shared signal state (NDC + velocity)
  useEffect(() => {
    let last = performance.now();
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      feedPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
        dt
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.001), []);

  return (
    <Canvas
      flat
      frameloop={active ? "always" : "demand"}
      dpr={low ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <HeroBackground />
      <SignalCore low={low} />
      <CameraRig />
      {low ? (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.8} luminanceThreshold={0.24} mipmapBlur />
        </EffectComposer>
      ) : (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.95}
            luminanceThreshold={0.22}
            luminanceSmoothing={0.3}
            mipmapBlur
            radius={0.72}
          />
          <ChromaticAberration offset={caOffset} />
          <Vignette eskil={false} offset={0.28} darkness={0.58} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

"use client";

import { useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import {
  backgroundVertex,
  backgroundFragment,
} from "./shaders/background.glsl";
import { paletteColor } from "./palette";

// Mutable per-frame uniform state for the single background instance.
const uniforms = {
  uTime: { value: 0 },
  uAspect: { value: 1 },
  uBg: { value: paletteColor("bg") },
  uCyan: { value: paletteColor("cyan") },
  uViolet: { value: paletteColor("violet") },
  uMagenta: { value: paletteColor("magenta") },
};

export default function HeroBackground() {
  useFrame((state, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uAspect.value = state.size.width / state.size.height;
  });

  return (
    <ScreenQuad renderOrder={-10}>
      <shaderMaterial
        vertexShader={backgroundVertex}
        fragmentShader={backgroundFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </ScreenQuad>
  );
}

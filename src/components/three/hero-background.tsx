"use client";

import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import {
  backgroundVertex,
  backgroundFragment,
} from "./shaders/background.glsl";
import { paletteColor } from "./palette";

export default function HeroBackground() {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uBg: { value: paletteColor("bg") },
      uCyan: { value: paletteColor("cyan") },
      uViolet: { value: paletteColor("violet") },
      uMagenta: { value: paletteColor("magenta") },
    }),
    []
  );

  useFrame((state, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uAspect.value = state.size.width / state.size.height;
  });

  return (
    <ScreenQuad renderOrder={-10}>
      <shaderMaterial
        ref={mat}
        vertexShader={backgroundVertex}
        fragmentShader={backgroundFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </ScreenQuad>
  );
}

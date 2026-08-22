"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { coreVertex, coreFragment } from "./shaders/core.glsl";
import { signal } from "@/lib/pointer";
import { revealElapsed } from "@/lib/loading";
import { paletteColor } from "./palette";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** Deterministic PRNG so particle layout is stable across renders. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uIntro;
uniform float uPx;
attribute float aSeed;
attribute vec3 aColor;
varying vec3 vColor;
varying float vTw;

void main() {
  vColor = aColor;
  float tw = 0.5 + 0.5 * sin(uTime * (0.5 + aSeed * 1.3) + aSeed * 43.0);
  vTw = tw;
  vec4 mv = modelViewMatrix * vec4(position * (0.9 + 0.1 * uIntro), 1.0);
  float size = (0.7 + aSeed * 1.7) * uPx * (9.0 / max(-mv.z, 0.8)) * (0.2 + 0.8 * uIntro);
  gl_PointSize = min(size, 14.0 * uPx);
  gl_Position = projectionMatrix * mv;
}
`;

const particleFragment = /* glsl */ `
varying vec3 vColor;
varying float vTw;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = smoothstep(0.5, 0.06, length(c)) * (0.14 + 0.42 * vTw);
  gl_FragColor = vec4(vColor, a);
}
`;

// Uniform/scratch objects live at module scope: they are mutable per-frame
// state for the single hero instance, not render-derived values.
const coreUniforms = {
  uTime: { value: 0 },
  uIntro: { value: 0 },
  uEnergy: { value: 0 },
  uAmp: { value: 0.27 },
  uMouse: { value: new THREE.Vector3(99, 99, 0) },
  uCyan: { value: paletteColor("cyan") },
  uViolet: { value: paletteColor("violet") },
  uMagenta: { value: paletteColor("magenta") },
};

const particleUniforms = {
  uTime: { value: 0 },
  uIntro: { value: 0 },
  uPx: { value: 1 },
};

const mouseWorld = new THREE.Vector3();
const ray = new THREE.Vector3();

/** The signature object: shader-displaced icosahedron + orbiting dust. */
export default function SignalCore({ low }: { low: boolean }) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const camera = useThree((s) => s.camera);
  const dpr = useThree((s) => s.viewport.dpr);

  const basePos = useMemo(
    () => (low ? new THREE.Vector3(0, 0.45, 0) : new THREE.Vector3(1.05, 0.02, 0)),
    [low]
  );

  // Displacement is low-frequency, so the silhouette survives a much coarser
  // mesh. Detail 48 meant ~144k vertex invocations each running field() three
  // times at six noise calls apiece; 28 cuts that by about two thirds.
  const geometry = useMemo(
    () => new THREE.IcosahedronGeometry(1.15, low ? 14 : 28),
    [low]
  );

  const particleGeometry = useMemo(() => {
    const rand = mulberry32(low ? 1337 : 424242);
    const count = low ? 550 : 2200;
    const pos = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const palette = [
      paletteColor("cyan"),
      paletteColor("violet"),
      paletteColor("magenta"),
    ];
    for (let i = 0; i < count; i++) {
      // spherical shell around the core
      const u = rand() * 2 - 1;
      const phi = rand() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const r = 1.85 + Math.pow(rand(), 1.6) * 1.5;
      pos[i * 3] = s * Math.cos(phi) * r;
      pos[i * 3 + 1] = u * r * 0.82;
      pos[i * 3 + 2] = s * Math.sin(phi) * r;
      seeds[i] = rand();
      // mostly cyan/violet dust, occasional magenta spark
      const c = palette[rand() < 0.12 ? 2 : rand() < 0.5 ? 0 : 1];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [low]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    coreUniforms.uTime.value = t;

    // settle in once the loader clears, not while it still covers the screen
    const intro = easeOutCubic(
      Math.min(1, Math.max(0, (revealElapsed() - 0.1) / 1.6))
    );
    signal.intro = intro;
    coreUniforms.uIntro.value = intro;

    // interaction energy decays toward a faint idle simmer
    signal.energy *= Math.exp(-dt * 2.1);
    signal.speed *= Math.exp(-dt * 3.0);
    coreUniforms.uEnergy.value = signal.energy + 0.06;

    // cursor NDC → world point on the z=0 plane
    ray.set(signal.x, signal.y, 0.5).unproject(camera).sub(camera.position).normalize();
    const hit = ray.z < -1e-4 ? -camera.position.z / ray.z : 0;
    if (hit > 0) {
      mouseWorld.copy(camera.position).addScaledVector(ray, hit);
      coreUniforms.uMouse.value.lerp(mouseWorld, 0.22);
    }

    const g = group.current;
    if (g) {
      g.rotation.y += dt * 0.14;
      g.rotation.x += (signal.y * -0.2 - g.rotation.x) * 0.05;
      g.rotation.z += (signal.x * 0.07 - g.rotation.z) * 0.04;
      const scale = (0.5 + 0.5 * intro) * (low ? 0.72 : 1);
      g.scale.setScalar(scale);
      g.position.set(
        basePos.x,
        basePos.y - signal.scroll * 1.1,
        basePos.z - signal.scroll * 0.6
      );
    }

    particleUniforms.uTime.value = t;
    particleUniforms.uIntro.value = intro;
    particleUniforms.uPx.value = dpr;
    if (points.current) {
      points.current.rotation.y -= dt * 0.022;
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <shaderMaterial
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={coreUniforms}
        />
      </mesh>
      <points ref={points} geometry={particleGeometry}>
        <shaderMaterial
          vertexShader={particleVertex}
          fragmentShader={particleFragment}
          uniforms={particleUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

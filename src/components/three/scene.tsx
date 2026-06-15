"use client";

import { Canvas } from "@react-three/fiber";
import { NodeGraph } from "./node-graph";
import { Starfield } from "./starfield";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 6]} intensity={0.9} />
      <pointLight position={[0, 0, 0]} intensity={2.2} distance={8} color="#ffb224" />
      <Starfield />
      <NodeGraph />
    </Canvas>
  );
}

"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment, PerspectiveCamera, Float } from "@react-three/drei";
import { FloatingShape } from "./floating-shapes";
import { FLOATING_SHAPES, SCENE_CONFIG } from "@/lib/constants";

function Scene() {
    return (
        <>
            {/* Camera */}
            <PerspectiveCamera
                makeDefault
                position={SCENE_CONFIG.cameraPosition}
                fov={50}
            />

            {/* Lighting */}
            <ambientLight intensity={SCENE_CONFIG.ambientLightIntensity} />
            <pointLight
                position={[10, 10, 10]}
                intensity={SCENE_CONFIG.pointLightIntensity}
                color="#ffffff"
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
            <pointLight position={[0, 10, -5]} intensity={0.3} color="#8b5cf6" />

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* Physics world with zero gravity */}
            <Physics gravity={SCENE_CONFIG.gravity}>
                {FLOATING_SHAPES.map((shape, index) => (
                    <FloatingShape
                        key={index}
                        type={shape.type}
                        position={shape.position as [number, number, number]}
                        color={shape.color}
                        scale={shape.scale}
                    />
                ))}
            </Physics>
        </>
    );
}

// Loading fallback
function LoadingFallback() {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh>
                <icosahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color="#6366f1"
                    wireframe
                    emissive="#6366f1"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </Float>
    );
}

export function HeroCanvas() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={<LoadingFallback />}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}

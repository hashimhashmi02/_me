"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment, PerspectiveCamera, Float } from "@react-three/drei";
import { FloatingShape } from "./floating-shapes";
import { SCENE_CONFIG } from "@/lib/constants";

export interface ShapeConfig {
    type: string;
    position: [number, number, number];
    color: string;
    scale: number;
}

interface SectionCanvasProps {
    shapes: ShapeConfig[];
    intensity?: number;
    lightColor?: string;
    cameraPosition?: [number, number, number];
}

function Scene({ shapes, intensity = 0.5, lightColor = "#6366f1", cameraPosition = [0, 0, 10] }: SectionCanvasProps) {
    return (
        <>
            <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

            <ambientLight intensity={intensity} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color={lightColor} />

            <Environment preset="city" />

            <Physics gravity={[0, 0, 0]}>
                {shapes.map((shape, index) => (
                    <FloatingShape
                        key={index}
                        type={shape.type}
                        position={shape.position}
                        color={shape.color}
                        scale={shape.scale}
                    />
                ))}
            </Physics>
        </>
    );
}

export function SectionCanvas(props: SectionCanvasProps) {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas
                dpr={[1, 1.5]} // Lower DPI for sections to save performance
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
                camera={{ position: [0, 0, 10], fov: 50 }}
            >
                <Suspense fallback={null}>
                    <Scene {...props} />
                </Suspense>
            </Canvas>
        </div>
    );
}

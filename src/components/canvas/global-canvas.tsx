"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { useTheme } from "next-themes";
import { useSettings } from "@/components/settings-provider";
import { Suspense, useEffect, useState, useRef } from "react";
import * as THREE from "three";

function BackgroundScene() {
    const { theme } = useTheme();
    const { showParticles } = useSettings();
    const [mounted, setMounted] = useState(false);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        // Rotate the entire group slowly for a "moving universe" feel
        // Y-axis rotation makes them drift horizontally
        // Slight X-axis rotation adds some dynamic tilt
        groupRef.current.rotation.y += delta * 0.05; // Adjust speed here (was ~0.05 for "moving")
        groupRef.current.rotation.x += delta * 0.01;
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Default to dark theme colors if not mounted or theme is undefined
    const isDark = !mounted || theme === "dark" || theme === "system";

    if (!showParticles) return null;

    return (
        <group ref={groupRef}>
            {isDark && (
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={2}
                />
            )}
            <Sparkles
                count={100}
                scale={12}
                size={2}
                speed={0.8}
                opacity={0.5}
                color={isDark ? "#ffffff" : "#1e293b"}
            />
        </group>
    );
}

export function GlobalCanvas() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 1] }}
                gl={{ antialias: false, alpha: true }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={null}>
                    <BackgroundScene />
                </Suspense>
            </Canvas>
        </div>
    );
}

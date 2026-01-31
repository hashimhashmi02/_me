"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
    position: [number, number, number];
    color: string;
    scale: number;
    type: string;
}

// Geometry factory function (outside component for stability)
function createGeometry(type: string): THREE.BufferGeometry {
    switch (type) {
        case "sphere":
            return new THREE.SphereGeometry(1, 32, 32);
        case "torus":
            return new THREE.TorusGeometry(1, 0.4, 16, 32);
        case "box":
            return new THREE.BoxGeometry(1, 1, 1);
        case "icosahedron":
            return new THREE.IcosahedronGeometry(1);
        case "octahedron":
            return new THREE.OctahedronGeometry(1);
        case "dodecahedron":
            return new THREE.DodecahedronGeometry(1);
        case "cone":
            return new THREE.ConeGeometry(1, 1.5, 32);
        case "torusKnot":
            return new THREE.TorusKnotGeometry(0.8, 0.3, 64, 16);
        default:
            return new THREE.SphereGeometry(1, 32, 32);
    }
}

export function FloatingShape({
    position,
    color,
    scale,
    type,
}: FloatingShapeProps) {
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialPosition = useMemo(() => new THREE.Vector3(...position), [position[0], position[1], position[2]]);
    const time = useRef(Math.random() * 100);

    // Memoize geometry based on type
    const geometry = useMemo(() => createGeometry(type), [type]);

    useFrame((_, delta) => {
        if (!rigidBodyRef.current || !meshRef.current) return;

        time.current += delta;

        // Get current position
        const currentPos = rigidBodyRef.current.translation();
        const pos = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z);

        // Gentle floating motion
        const floatOffset = new THREE.Vector3(
            Math.sin(time.current * 0.5 + position[0]) * 0.02,
            Math.cos(time.current * 0.3 + position[1]) * 0.02,
            Math.sin(time.current * 0.4 + position[2]) * 0.02
        );

        // Drift back to initial position
        const driftForce = initialPosition
            .clone()
            .sub(pos)
            .multiplyScalar(0.1);

        // Apply gentle impulse
        rigidBodyRef.current.applyImpulse(
            {
                x: (driftForce.x + floatOffset.x) * 0.1,
                y: (driftForce.y + floatOffset.y) * 0.1,
                z: (driftForce.z + floatOffset.z) * 0.1,
            },
            true
        );

        // Damping
        const linvel = rigidBodyRef.current.linvel();
        rigidBodyRef.current.setLinvel(
            {
                x: linvel.x * 0.98,
                y: linvel.y * 0.98,
                z: linvel.z * 0.98,
            },
            true
        );

        // Slow rotation
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;
    });

    const handlePointerOver = () => {
        if (!rigidBodyRef.current) return;

        // Get current position
        const currentPos = rigidBodyRef.current.translation();

        // Calculate repulsion direction from center
        const repulsionDir = new THREE.Vector3(
            currentPos.x,
            currentPos.y,
            currentPos.z
        ).normalize();

        // Apply repulsion impulse
        rigidBodyRef.current.applyImpulse(
            {
                x: repulsionDir.x * 2,
                y: repulsionDir.y * 2,
                z: repulsionDir.z * 2,
            },
            true
        );
    };

    return (
        <RigidBody
            ref={rigidBodyRef}
            type="dynamic"
            position={position}
            colliders="ball"
            linearDamping={2}
            angularDamping={2}
            gravityScale={0}
        >
            <mesh
                ref={meshRef}
                scale={scale}
                onPointerOver={handlePointerOver}
                geometry={geometry}
            >
                <MeshDistortMaterial
                    color={color}
                    speed={2}
                    distort={0.4}
                    radius={1}
                />
            </mesh>
        </RigidBody>
    );
}

"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { graphState, type GraphSection } from "@/lib/graph-state";

/**
 * The living system: a core cluster + four satellite clusters (one per
 * project), rendered as three GPU layers so the whole graph costs a handful
 * of draw calls:
 *   1. nodes  — THREE.Points with a soft-glow shader, per-node pulse phase
 *   2. edges  — additive LineSegments, brightened per-cluster when active
 *   3. pulses — points interpolated along edges entirely in the vertex
 *               shader (data packets in transit)
 * Plus five real meshes (cluster hubs) with a physical material so the
 * scene has actual lit surfaces, not just sprites.
 *
 * Interaction layers (all GPU uniforms, no per-frame allocation):
 *   - cursor proximity: nearby nodes glow amber and shy away slightly
 *   - click/tap shockwave: a brightness ring ripples outward through
 *     nodes and edges from the clicked point
 *   - section poses: the graph glides to a different position per page
 *     section, and converges into a tight core behind the contact panel
 */

const CLUSTERS = 5; // 0 = core, 1..4 = projects in PROJECTS order
const AMBER = new THREE.Color("#ffb224");

/** Per-section graph pose; eased toward continuously, so the system
 *  visibly travels with the reader instead of sitting still. */
const POSES: Record<GraphSection, { x: number; y: number; z: number; converge: number }> = {
  hero: { x: 2.1, y: 0, z: -0.9, converge: 0 },
  work: { x: -1.7, y: 0.35, z: -2.3, converge: 0 },
  about: { x: 2.2, y: 0.15, z: -1.3, converge: 0 },
  stack: { x: 0, y: 1.35, z: -2.1, converge: 0.12 },
  contact: { x: 0, y: 0.1, z: -0.3, converge: 1 },
};

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type GraphData = {
  nodeGeometry: THREE.BufferGeometry;
  edgeGeometry: THREE.BufferGeometry;
  pulseGeometry: THREE.BufferGeometry;
  hubPositions: THREE.Vector3[];
};

function buildGraph(detail: number): GraphData {
  const rand = mulberry32(20260612);
  const gauss = () => (rand() + rand() + rand()) / 1.5 - 1; // approx normal, -1..1

  const centers = [new THREE.Vector3(0, 0, 0)];
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + 0.65;
    centers.push(
      new THREE.Vector3(
        Math.cos(angle) * 2.75,
        Math.sin(i * 1.9) * 0.95,
        Math.sin(angle) * 1.6
      )
    );
  }

  const counts = [Math.round(26 * detail), ...Array(4).fill(Math.round(17 * detail))];

  const positions: number[] = [];
  const sizes: number[] = [];
  const phases: number[] = [];
  const clusters: number[] = [];
  const warms: number[] = [];
  const nodeCluster: number[] = [];
  const clusterStart: number[] = [];

  centers.forEach((center, c) => {
    clusterStart.push(positions.length / 3);
    const spread = c === 0 ? 1.25 : 0.95;
    for (let i = 0; i < counts[c]; i++) {
      positions.push(
        center.x + gauss() * spread,
        center.y + gauss() * spread * 0.8,
        center.z + gauss() * spread * 0.85
      );
      sizes.push(0.05 + rand() * 0.11);
      phases.push(rand() * Math.PI * 2);
      clusters.push(c);
      // A few naturally warm nodes per cluster so amber reads as alive even at rest.
      warms.push(rand() < 0.12 ? 1 : 0);
      nodeCluster.push(c);
    }
  });

  const nodeCount = positions.length / 3;
  const nodeAt = (i: number) =>
    new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);

  // Edges: every node links toward its cluster hub region; some local links;
  // satellite hubs link back to the core hub; a few cross-cluster ties.
  const edges: Array<[number, number]> = [];
  for (let i = 0; i < nodeCount; i++) {
    const c = nodeCluster[i];
    const hub = clusterStart[c];
    if (i !== hub && rand() < 0.7) edges.push([i, hub]);
    if (rand() < 0.45) {
      // nearest same-cluster neighbour
      let best = -1;
      let bestD = Infinity;
      const pi = nodeAt(i);
      for (let j = clusterStart[c]; j < clusterStart[c] + counts[c]; j++) {
        if (j === i) continue;
        const d = pi.distanceToSquared(nodeAt(j));
        if (d < bestD) {
          bestD = d;
          best = j;
        }
      }
      if (best >= 0) edges.push([i, best]);
    }
  }
  for (let c = 1; c < CLUSTERS; c++) edges.push([clusterStart[c], clusterStart[0]]);
  for (let i = 0; i < 6; i++) {
    const a = Math.floor(rand() * nodeCount);
    const b = Math.floor(rand() * nodeCount);
    if (a !== b) edges.push([a, b]);
  }

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  nodeGeometry.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
  nodeGeometry.setAttribute("aPhase", new THREE.Float32BufferAttribute(phases, 1));
  nodeGeometry.setAttribute("aCluster", new THREE.Float32BufferAttribute(clusters, 1));
  nodeGeometry.setAttribute("aWarm", new THREE.Float32BufferAttribute(warms, 1));

  const edgePositions: number[] = [];
  const edgeClusters: number[] = [];
  edges.forEach(([a, b]) => {
    const pa = nodeAt(a);
    const pb = nodeAt(b);
    edgePositions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
    const c = nodeCluster[a] === nodeCluster[b] ? nodeCluster[a] : 0;
    edgeClusters.push(c, c);
  });
  const edgeGeometry = new THREE.BufferGeometry();
  edgeGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(edgePositions, 3)
  );
  edgeGeometry.setAttribute(
    "aCluster",
    new THREE.Float32BufferAttribute(edgeClusters, 1)
  );

  // Pulses: data packets travelling along a random subset of edges.
  const pulseCount = Math.round(Math.min(edges.length, 110 * detail));
  const pStarts: number[] = [];
  const pEnds: number[] = [];
  const pOffsets: number[] = [];
  const pSpeeds: number[] = [];
  const pClusters: number[] = [];
  const pSizes: number[] = [];
  for (let i = 0; i < pulseCount; i++) {
    const [a, b] = edges[Math.floor(rand() * edges.length)];
    const pa = nodeAt(a);
    const pb = nodeAt(b);
    pStarts.push(pa.x, pa.y, pa.z);
    pEnds.push(pb.x, pb.y, pb.z);
    pOffsets.push(rand());
    pSpeeds.push(0.05 + rand() * 0.1);
    pClusters.push(nodeCluster[a] === nodeCluster[b] ? nodeCluster[a] : 0);
    pSizes.push(0.05 + rand() * 0.05);
  }
  const pulseGeometry = new THREE.BufferGeometry();
  // Points require a position attribute even though the shader derives it.
  pulseGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(new Float32Array(pulseCount * 3), 3)
  );
  pulseGeometry.setAttribute("aStart", new THREE.Float32BufferAttribute(pStarts, 3));
  pulseGeometry.setAttribute("aEnd", new THREE.Float32BufferAttribute(pEnds, 3));
  pulseGeometry.setAttribute("aOffset", new THREE.Float32BufferAttribute(pOffsets, 1));
  pulseGeometry.setAttribute("aSpeed", new THREE.Float32BufferAttribute(pSpeeds, 1));
  pulseGeometry.setAttribute("aCluster", new THREE.Float32BufferAttribute(pClusters, 1));
  pulseGeometry.setAttribute("aSize", new THREE.Float32BufferAttribute(pSizes, 1));

  return {
    nodeGeometry,
    edgeGeometry,
    pulseGeometry,
    hubPositions: centers,
  };
}

/** Shared GLSL: convergence scaling + the expanding shockwave ring.
 *  Burst: a gaussian ring whose radius grows with age, fading out ~2.5s. */
const burstGlsl = /* glsl */ `
  uniform float uConverge;
  uniform vec3 uBurstPos;
  uniform float uBurstTime;
  vec3 convergePos(vec3 p) {
    return p * mix(1.0, 0.5, uConverge);
  }
  float burstRing(vec3 p) {
    float age = uTime - uBurstTime;
    float front = age * 3.4;
    float bd = distance(p, uBurstPos);
    return exp(-pow((bd - front) * 2.0, 2.0)) * max(0.0, 1.0 - age * 0.4);
  }
`;

const nodeVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uActive[${CLUSTERS}];
  uniform vec3 uPointer;
  uniform float uPointerStrength;
  attribute float aSize;
  attribute float aPhase;
  attribute float aCluster;
  attribute float aWarm;
  varying float vGlow;
  varying float vWarm;
  ${"${BURST}"}
  void main() {
    float act = uActive[int(aCluster)];
    float pulse = 0.78 + 0.22 * sin(uTime * 1.5 + aPhase);
    vec3 pos = convergePos(position);

    // Cursor proximity: glow up and shy away from the pointer.
    float pd = distance(pos, uPointer);
    float prox = smoothstep(1.5, 0.0, pd) * uPointerStrength;
    pos += normalize(pos - uPointer + vec3(0.0001)) * prox * 0.22;

    float ring = burstRing(pos);

    vGlow = pulse * (0.72 + 0.38 * act) * (1.0 + uConverge * 0.45)
          + prox * 0.9 + ring * 1.2;
    vWarm = max(aWarm, max(act * 0.85, max(prox, ring)));

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (1.0 + act * 0.6 + prox * 0.7) * pulse
                 * uPixelRatio * (430.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const nodeFragment = /* glsl */ `
  varying float vGlow;
  varying float vWarm;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.16, 0.04, d);
    float halo = smoothstep(0.5, 0.1, d);
    vec3 cool = vec3(0.42, 0.55, 0.76);
    vec3 warm = vec3(1.0, 0.7, 0.16);
    vec3 col = mix(cool, warm, vWarm);
    float a = (core * 0.95 + halo * 0.32) * vGlow;
    if (a < 0.012) discard;
    gl_FragColor = vec4(col, a);
  }
`;

const edgeVertex = /* glsl */ `
  uniform float uTime;
  uniform float uActive[${CLUSTERS}];
  attribute float aCluster;
  varying float vAct;
  varying float vBurst;
  ${"${BURST}"}
  void main() {
    vAct = uActive[int(aCluster)];
    vec3 pos = convergePos(position);
    vBurst = burstRing(pos);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const edgeFragment = /* glsl */ `
  varying float vAct;
  varying float vBurst;
  void main() {
    vec3 cool = vec3(0.35, 0.45, 0.62);
    vec3 warm = vec3(1.0, 0.72, 0.2);
    vec3 col = mix(cool, warm, min(vAct * 0.75 + vBurst, 1.0));
    gl_FragColor = vec4(col, 0.1 + 0.22 * vAct + 0.3 * vBurst);
  }
`;

const pulseVertex = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uActive[${CLUSTERS}];
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute float aOffset;
  attribute float aSpeed;
  attribute float aCluster;
  attribute float aSize;
  varying float vA;
  ${"${BURST}"}
  void main() {
    float t = fract(uTime * aSpeed + aOffset);
    vec3 pos = convergePos(mix(aStart, aEnd, t));
    float act = uActive[int(aCluster)];
    vA = sin(t * 3.14159) * (0.45 + 0.55 * act) * (1.0 + uConverge * 0.5);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (1.0 + act * 0.8) * uPixelRatio * (430.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const pulseFragment = /* glsl */ `
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.05, d);
    float a = glow * vA;
    if (a < 0.012) discard;
    gl_FragColor = vec4(1.0, 0.72, 0.2, a);
  }
`;

const withBurst = (src: string) => src.replace("${BURST}", burstGlsl);

export function NodeGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const hubsRef = useRef<THREE.InstancedMesh>(null);
  const activeLevels = useRef(new Float32Array(CLUSTERS));
  const smoothPointer = useRef({ x: 0, y: 0, strength: 0 });
  const poseRef = useRef({ x: 2.1, y: 0, z: -0.9, converge: 0 });
  const lastBurstSeq = useRef(0);
  const { gl, size } = useThree();

  // Scratch objects reused every frame — no per-frame allocation.
  const scratch = useRef({
    raycaster: new THREE.Raycaster(),
    plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    ndc: new THREE.Vector2(),
    point: new THREE.Vector3(),
    matrix: new THREE.Matrix4(),
  });

  const isNarrow = size.width < 768;
  const graph = useMemo(() => buildGraph(isNarrow ? 0.6 : 1), [isNarrow]);

  // Uniforms live in a ref: they're mutated every frame, never re-created.
  const uniformsRef = useRef<{
    uTime: { value: number };
    uPixelRatio: { value: number };
    uActive: { value: Float32Array };
    uPointer: { value: THREE.Vector3 };
    uPointerStrength: { value: number };
    uBurstPos: { value: THREE.Vector3 };
    uBurstTime: { value: number };
    uConverge: { value: number };
  } | null>(null);
  uniformsRef.current ??= {
    uTime: { value: 0 },
    uPixelRatio: { value: 1 },
    uActive: { value: new Float32Array(CLUSTERS) },
    uPointer: { value: new THREE.Vector3(99, 99, 99) },
    uPointerStrength: { value: 0 },
    uBurstPos: { value: new THREE.Vector3() },
    uBurstTime: { value: -100 },
    uConverge: { value: 0 },
  };
  const uniforms = uniformsRef.current;

  const nodeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: withBurst(nodeVertex),
        fragmentShader: nodeFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms]
  );
  const edgeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: withBurst(edgeVertex),
        fragmentShader: edgeFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms]
  );
  const pulseMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: withBurst(pulseVertex),
        fragmentShader: pulseFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms]
  );

  useEffect(() => {
    const u = uniformsRef.current;
    if (u) u.uPixelRatio.value = gl.getPixelRatio();
  }, [gl]);

  useEffect(() => {
    const { nodeGeometry, edgeGeometry, pulseGeometry } = graph;
    return () => {
      nodeGeometry.dispose();
      edgeGeometry.dispose();
      pulseGeometry.dispose();
    };
  }, [graph]);

  /** Unproject pointer ndc onto the graph's mid-plane, in group-local space. */
  const ndcToLocal = (
    ndcX: number,
    ndcY: number,
    camera: THREE.Camera,
    group: THREE.Group,
    out: THREE.Vector3
  ) => {
    const s = scratch.current;
    s.ndc.set(ndcX, ndcY);
    s.raycaster.setFromCamera(s.ndc, camera);
    s.plane.constant = -group.position.z;
    if (s.raycaster.ray.intersectPlane(s.plane, s.point)) {
      // Group-local space equals the shader's post-convergence space.
      out.copy(group.worldToLocal(s.point));
      return true;
    }
    return false;
  };

  useFrame(({ clock, camera }) => {
    const u = uniformsRef.current;
    const group = groupRef.current;
    if (!u || !group) return;
    const t = clock.elapsedTime;
    u.uTime.value = t;

    // Ease each cluster's activation toward its target: core idles warm,
    // the in-view project's cluster wakes up.
    const target = graphState.activeProject;
    const levels = activeLevels.current;
    for (let c = 0; c < CLUSTERS; c++) {
      const want = c === 0 ? 0.18 : target === c - 1 ? 1 : 0;
      levels[c] += (want - levels[c]) * 0.045;
    }
    u.uActive.value.set(levels);

    // Glide toward the active section's pose — the camera choreography.
    const pose = poseRef.current;
    const want = POSES[graphState.section];
    const wantX = isNarrow ? 0 : want.x;
    const wantZ = isNarrow ? want.z - 0.8 : want.z;
    pose.x += (wantX - pose.x) * 0.035;
    pose.y += (want.y - pose.y) * 0.035;
    pose.z += (wantZ - pose.z) * 0.035;
    pose.converge += (want.converge - pose.converge) * 0.03;
    u.uConverge.value = pose.converge;

    const sp = smoothPointer.current;
    sp.x += (graphState.pointerX - sp.x) * 0.04;
    sp.y += (graphState.pointerY - sp.y) * 0.04;

    const sc = Math.min(graphState.scrollVh, 5);
    // The converged core spins a little faster — system at full attention.
    group.rotation.y = t * (0.05 + pose.converge * 0.05) + sc * 0.25 + sp.x * 0.12;
    group.rotation.x = -0.08 + sp.y * 0.07;
    group.position.set(pose.x, pose.y, pose.z);

    camera.position.z = 7.4 + Math.min(sc, 4) * 0.3;
    camera.position.y = -Math.min(sc, 4) * 0.12;
    camera.lookAt(0, camera.position.y, 0);

    // Cursor proximity, only while the pointer is actually moving about.
    const strengthTarget =
      performance.now() - graphState.pointerMovedAt < 2500 ? 1 : 0;
    sp.strength += (strengthTarget - sp.strength) * 0.06;
    u.uPointerStrength.value = sp.strength;
    if (sp.strength > 0.01) {
      if (!ndcToLocal(graphState.pointerX, graphState.pointerY, camera, group, u.uPointer.value)) {
        u.uPointer.value.set(99, 99, 99);
      }
    } else {
      u.uPointer.value.set(99, 99, 99);
    }

    // New click/tap → fire a shockwave from that point.
    if (graphState.burstSeq !== lastBurstSeq.current) {
      lastBurstSeq.current = graphState.burstSeq;
      if (ndcToLocal(graphState.burstX, graphState.burstY, camera, group, u.uBurstPos.value)) {
        u.uBurstTime.value = t;
      }
    }

    const hubs = hubsRef.current;
    if (hubs) {
      const mat = hubs.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity =
        0.16 + Math.sin(t * 1.3) * 0.06 + pose.converge * 0.25;
      // Hubs follow the convergence contraction.
      const k = 1 - pose.converge * 0.5;
      const m = scratch.current.matrix;
      graph.hubPositions.forEach((p, i) => {
        m.makeTranslation(p.x * k, p.y * k, p.z * k);
        hubs.setMatrixAt(i, m);
      });
      hubs.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points
        geometry={graph.nodeGeometry}
        material={nodeMaterial}
        frustumCulled={false}
      />
      <lineSegments
        geometry={graph.edgeGeometry}
        material={edgeMaterial}
        frustumCulled={false}
      />
      <points
        geometry={graph.pulseGeometry}
        material={pulseMaterial}
        frustumCulled={false}
      />
      <instancedMesh
        ref={hubsRef}
        args={[undefined, undefined, CLUSTERS]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[0.085, 1]} />
        <meshPhysicalMaterial
          color="#1a2333"
          metalness={0.4}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.3}
          emissive={AMBER}
          emissiveIntensity={0.16}
          flatShading
        />
      </instancedMesh>
    </group>
  );
}

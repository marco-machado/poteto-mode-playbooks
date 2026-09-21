"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { mat, useClock, type SceneProps } from "./shared";

export function MultiPhasePlanScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const rings = useRef<THREE.Group>(null);
  useFrame(() => {
    const phase = Math.floor((t.current % 8) / 2);
    rings.current?.children.forEach((child, i) => {
      const on = i <= phase;
      child.scale.setScalar(on ? 1 : 0.82);
      const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = on ? 0.7 : 0.05;
      material.color.set(on ? color : "#3f3f46");
    });
  });
  return (
    <group ref={rings} rotation={[0.4, 0.2, 0]}>
      {[0.5, 0.9, 1.3, 1.7].map((r) => (
        <mesh key={r}>
          <torusGeometry args={[r, 0.045, 8, 48]} />
          {mat("#3f3f46")}
        </mesh>
      ))}
    </group>
  );
}

export function WorktreeCleanupScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const trees = useRef<THREE.Group>(null);
  useFrame(() => {
    const k = 0.5 + 0.5 * Math.sin(t.current * 0.7);
    trees.current?.children.forEach((child, i) => {
      const keep = i === 2 || i === 5;
      const s = keep ? 1 : 1 - k;
      child.scale.setScalar(Math.max(0.02, s));
      child.visible = s > 0.04;
    });
  });
  return (
    <group ref={trees}>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[(i % 4) * 0.9 - 1.35, -0.2, Math.floor(i / 4) * 0.9 - 0.4]}>
          <coneGeometry args={[0.28, 1.1, 6]} />
          {mat(i === 2 || i === 5 ? color : "#52525b")}
        </mesh>
      ))}
    </group>
  );
}

export function OpeningPrScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const card = useRef<THREE.Mesh>(null);
  const commits = useRef<THREE.Group>(null);
  useFrame(() => {
    const k = 0.5 + 0.5 * Math.sin(t.current * 0.8);
    commits.current?.children.forEach((child, i) => {
      child.position.lerp(new THREE.Vector3(0, -0.2, i * 0.02), k);
      child.scale.setScalar(1 - k * 0.7);
    });
    if (card.current) {
      card.current.position.y = -0.1 + k * 1.3;
      card.current.rotation.x = -0.5 + k * 0.3;
    }
  });
  return (
    <group>
      <group ref={commits}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-1.2 + i * 0.8, -0.9, 0]}>
            <boxGeometry args={[0.45, 0.2, 0.45]} />
            {mat("#52525b")}
          </mesh>
        ))}
      </group>
      <mesh ref={card} rotation={[-0.5, 0.2, 0]}>
        <boxGeometry args={[1.4, 0.08, 1.8]} />
        {mat(color, { emissive: color, emissiveIntensity: 0.4 })}
      </mesh>
    </group>
  );
}

export function HomeConstellation({ paused }: { paused: boolean }) {
  const t = useClock(paused, 0.35);
  const group = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const colors = [
      "#7dd3fc", "#fb7185", "#fbbf24", "#34d399", "#c084fc", "#a78bfa",
      "#60a5fa", "#2dd4bf", "#f472b6", "#e879f9", "#facc15", "#38bdf8",
      "#4ade80", "#f59e0b", "#818cf8", "#22d3ee", "#a3e635", "#fb923c",
      "#67e8f9", "#94a3b8", "#c4b5fd", "#86efac", "#fde68a",
    ];
    return colors.map((hex, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / colors.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        color: hex,
        x: Math.sin(phi) * Math.cos(theta) * 2.1,
        y: Math.cos(phi) * 2.1,
        z: Math.sin(phi) * Math.sin(theta) * 2.1,
      };
    });
  }, []);
  useFrame(() => {
    if (group.current) group.current.rotation.y = t.current;
  });
  return (
    <group ref={group}>
      {nodes.map((node) => (
        <mesh key={node.color} position={[node.x, node.y, node.z]}>
          <icosahedronGeometry args={[0.12, 0]} />
          {mat(node.color, { emissive: node.color, emissiveIntensity: 0.55 })}
        </mesh>
      ))}
    </group>
  );
}

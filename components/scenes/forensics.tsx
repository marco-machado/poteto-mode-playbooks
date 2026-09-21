"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { mat, useClock, type SceneProps } from "./shared";

export function RuntimeForensicsScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const core = useRef<THREE.Mesh>(null);
  const spike = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (core.current) core.current.rotation.y = t.current * 1.3;
    if (spike.current) {
      const lock = 0.5 + 0.5 * Math.sin(t.current * 3);
      spike.current.scale.set(1, 1 + lock, 1);
    }
  });
  return (
    <group>
      <mesh ref={core}>
        <torusKnotGeometry args={[0.7, 0.18, 80, 12]} />
        {mat(color, { emissive: color, emissiveIntensity: 0.4, wireframe: false })}
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 2.1) * 1.8,
            Math.sin(i * 1.3) * 0.4,
            Math.sin(i * 2.1) * 1.8,
          ]}
        >
          <octahedronGeometry args={[0.12, 0]} />
          {mat("#e2e8f0")}
        </mesh>
      ))}
      <mesh ref={spike} position={[0.9, 0.2, 0]}>
        <coneGeometry args={[0.08, 0.7, 8]} />
        {mat("#fb7185", { emissive: "#fb7185", emissiveIntensity: 0.8 })}
      </mesh>
    </group>
  );
}

export function TraceForensicsScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const plane = useRef<THREE.Mesh>(null);
  const heights = [0.4, 1.1, 0.7, 1.8, 0.9, 0.5, 1.4, 0.6];
  useFrame(() => {
    if (plane.current) {
      plane.current.position.x = Math.sin(t.current * 0.8) * 1.6;
    }
  });
  const hot = 3;
  return (
    <group>
      {heights.map((h, i) => (
        <mesh key={i} position={[-1.75 + i * 0.5, h / 2 - 0.6, 0]}>
          <boxGeometry args={[0.36, h, 0.36]} />
          {mat(i === hot ? color : "#3f3f46", {
            emissive: i === hot ? color : "#000000",
            emissiveIntensity: i === hot ? 0.6 : 0,
          })}
        </mesh>
      ))}
      <mesh ref={plane} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.04, 2.4, 1.4]} />
        {mat("#fde68a", { transparent: true, opacity: 0.55, emissive: "#fde68a", emissiveIntensity: 0.4 })}
      </mesh>
    </group>
  );
}

export function FeatureScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const group = useRef<THREE.Group>(null);
  const parts = useMemo(
    () => [
      { p: [-0.4, -0.2, 0] as const, s: [0.9, 0.9, 0.9] as const },
      { p: [0.5, -0.2, 0] as const, s: [0.7, 0.7, 0.7] as const },
      { p: [0.05, 0.6, 0] as const, s: [0.55, 0.55, 0.55] as const },
      { p: [0.9, 0.45, 0.2] as const, s: [0.3, 0.8, 0.3] as const },
    ],
    []
  );
  useFrame(() => {
    const k = 0.5 + 0.5 * Math.sin(t.current * 0.9);
    parts.forEach((part, i) => {
      const mesh = group.current?.children[i];
      if (!(mesh instanceof THREE.Mesh)) return;
      const spread = 1.8 * (1 - k);
      mesh.position.set(
        part.p[0] * (0.2 + k) + (i - 1.5) * spread * 0.25,
        part.p[1] * k + (1 - k) * 1.4,
        part.p[2]
      );
    });
  });
  return (
    <group ref={group}>
      {parts.map((part, i) => (
        <mesh key={i}>
          <boxGeometry args={part.s} />
          {mat(i === 2 ? color : i % 2 ? "#52525b" : "#3f3f46")}
        </mesh>
      ))}
    </group>
  );
}

export function RefactoringScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    const k = 0.5 + 0.5 * Math.sin(t.current * 0.65);
    group.current?.children.forEach((child, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const neat = new THREE.Vector3(col * 0.7 - 1.05, row * 0.7 - 0.7, 0);
      const messy = new THREE.Vector3(
        Math.sin(i * 2.1) * 1.4,
        Math.cos(i * 1.4) * 1.1,
        Math.sin(i) * 0.5
      );
      child.position.lerpVectors(messy, neat, k);
      child.rotation.y = (1 - k) * i * 0.4;
    });
  });
  return (
    <group ref={group}>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.48, 0.48, 0.48]} />
          {mat(i % 5 === 0 ? color : "#3f3f46")}
        </mesh>
      ))}
    </group>
  );
}

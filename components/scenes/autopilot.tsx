"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { mat, useClock, type SceneProps } from "./shared";

export function AutopilotFullScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const cars = useRef<THREE.Group>(null);
  useFrame(() => {
    cars.current?.children.forEach((child, i) => {
      const z = -1.6 + ((t.current * (0.5 + i * 0.12) + i) % 3.2);
      child.position.z = z;
      const ready = z > 0.7;
      const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      material.color.set(ready ? color : "#64748b");
    });
  });
  return (
    <group>
      {[-1.2, -0.4, 0.4, 1.2].map((x) => (
        <mesh key={x} position={[x, -0.85, 0]}>
          <boxGeometry args={[0.35, 0.05, 3.4]} />
          {mat("#27272a")}
        </mesh>
      ))}
      <group ref={cars}>
        {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
          <mesh key={x} position={[x, -0.55, 0]}>
            <boxGeometry args={[0.28, 0.2, 0.46]} />
            {mat(i === 0 ? color : "#64748b")}
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function AutopilotStackScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const discs = useRef<THREE.Group>(null);
  useFrame(() => {
    const n = Math.min(5, 1 + Math.floor((t.current % 8) / 1.4));
    discs.current?.children.forEach((child, i) => {
      const on = i < n;
      child.position.y = THREE.MathUtils.lerp(child.position.y, on ? -0.9 + i * 0.28 : 1.6, 0.1);
      const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      material.color.set(on ? color : "#3f3f46");
    });
  });
  return (
    <group ref={discs}>
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} rotation={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.9 - i * 0.04, 0.9 - i * 0.04, 0.18, 24]} />
          {mat("#3f3f46")}
        </mesh>
      ))}
    </group>
  );
}

export function SessionPickupScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const ghost = useRef<THREE.Mesh>(null);
  const next = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const k = 0.5 + 0.5 * Math.sin(t.current * 0.7);
    if (ghost.current) {
      ghost.current.position.set(-1.1 + k * 0.9, 0, 0);
      (ghost.current.material as THREE.MeshStandardMaterial).opacity = 0.7 * (1 - k);
    }
    if (next.current) next.current.position.set(-0.2 + k * 1.1, 0, 0);
  });
  return (
    <group>
      <mesh ref={ghost}>
        <sphereGeometry args={[0.48, 16, 16]} />
        <meshStandardMaterial color="#94a3b8" transparent opacity={0.5} />
      </mesh>
      <mesh ref={next}>
        <sphereGeometry args={[0.48, 16, 16]} />
        {mat(color, { emissive: color, emissiveIntensity: 0.5 })}
      </mesh>
    </group>
  );
}

export function PauseSafelyScene({ color, paused }: SceneProps) {
  const t = useClock(paused, paused ? 0 : 1);
  const bits = useRef<THREE.Group>(null);
  const frozen = useRef(false);
  useFrame(() => {
    const freeze = t.current % 6 > 2.8;
    frozen.current = freeze;
    bits.current?.children.forEach((child, i) => {
      if (!freeze) {
        const a = t.current * 1.2 + i;
        child.position.set(Math.cos(a) * 1.3, Math.sin(a * 1.4) * 0.7, Math.sin(a) * 1.3);
      }
    });
  });
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        {mat(color, { emissive: color, emissiveIntensity: 0.45 })}
      </mesh>
      <group ref={bits}>
        {Array.from({ length: 7 }, (_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.09, 10, 10]} />
            {mat("#94a3b8")}
          </mesh>
        ))}
      </group>
    </group>
  );
}

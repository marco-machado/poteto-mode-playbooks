"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { mat, useClock, type SceneProps } from "./shared";

export function BabysitScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const gauges = useRef<THREE.Group>(null);
  useFrame(() => {
    const cycle = t.current % 8;
    gauges.current?.children.forEach((child, i) => {
      if (!(child instanceof THREE.Mesh)) return;
      const fill = Math.min(1, Math.max(0, (cycle - i * 1.3) / 1.6));
      child.scale.y = 0.12 + fill * 1.5;
      child.position.y = -0.8 + child.scale.y / 2;
      const material = child.material as THREE.MeshStandardMaterial;
      const last = i === 3;
      material.color.set(fill > 0.85 ? (last ? "#fbbf24" : color) : "#3f3f46");
    });
  });
  return (
    <group ref={gauges}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[-1.35 + i * 0.9, 0, 0]}>
          <boxGeometry args={[0.45, 1, 0.45]} />
          {mat("#3f3f46")}
        </mesh>
      ))}
    </group>
  );
}

export function ShippingScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const stack = useRef<THREE.Group>(null);
  useFrame(() => {
    const cycle = t.current % 9;
    stack.current?.children.forEach((child, i) => {
      const landed = cycle > i * 1.3 + 0.4 && i < 3;
      const y = landed ? -1.1 + i * 0.42 : 1.4 - ((cycle * 0.7 + i) % 3);
      child.position.y = THREE.MathUtils.lerp(child.position.y, y, 0.12);
      const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      material.color.set(landed ? color : i === 3 ? "#fb7185" : "#52525b");
    });
  });
  return (
    <group>
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.12, 32]} />
        {mat("#27272a")}
      </mesh>
      <group ref={stack}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, 1, 0]}>
            <boxGeometry args={[1.1, 0.34, 1.1]} />
            {mat("#3f3f46")}
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function AutonomousRunScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const runner = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const a = t.current * 1.1;
    if (runner.current) {
      runner.current.position.set(Math.cos(a) * 1.5, Math.sin(a * 2) * 0.35, Math.sin(a) * 1.5);
    }
  });
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.035, 8, 64]} />
        {mat("#3f3f46")}
      </mesh>
      <mesh ref={runner}>
        <sphereGeometry args={[0.18, 16, 16]} />
        {mat(color, { emissive: color, emissiveIntensity: 0.9 })}
      </mesh>
    </group>
  );
}

export function OrchestrateScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const agents = useRef<THREE.Group>(null);
  const packets = useRef<THREE.Group>(null);
  useFrame(() => {
    const time = t.current;
    agents.current?.children.forEach((child, i) => {
      const a = time * 0.6 + i * ((Math.PI * 2) / 8);
      child.position.set(Math.cos(a) * 1.9, Math.sin(a * 2) * 0.25, Math.sin(a) * 1.9);
    });
    packets.current?.children.forEach((child, i) => {
      const k = (time * 0.8 + i * 0.2) % 1;
      const a = i * ((Math.PI * 2) / 8);
      child.position.set(Math.cos(a) * 1.9 * (1 - k), 0.2, Math.sin(a) * 1.9 * (1 - k));
      child.scale.setScalar(1 - k);
    });
  });
  return (
    <group>
      <mesh>
        <octahedronGeometry args={[0.42, 0]} />
        {mat(color, { emissive: color, emissiveIntensity: 0.7 })}
      </mesh>
      <group ref={agents}>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.12, 12, 12]} />
            {mat("#94a3b8")}
          </mesh>
        ))}
      </group>
      <group ref={packets}>
        {Array.from({ length: 8 }, (_, i) => (
          <mesh key={i}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            {mat("#fde68a")}
          </mesh>
        ))}
      </group>
    </group>
  );
}

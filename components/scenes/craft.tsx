"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { mat, useClock, type SceneProps } from "./shared";

export function PrototypeScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const phase = Math.floor((t.current % 6) / 2);
    const meshes = [a.current, b.current, c.current];
    meshes.forEach((mesh, i) => {
      if (!mesh) return;
      const on = i === phase;
      mesh.scale.setScalar(on ? 1 : 0.55);
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.opacity = on ? 0.95 : 0.18;
      material.wireframe = !on;
    });
  });
  return (
    <group>
      <mesh ref={a} position={[-1.4, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} transparent wireframe />
      </mesh>
      <mesh ref={b} position={[0, 0, 0]}>
        <sphereGeometry args={[0.62, 16, 16]} />
        <meshStandardMaterial color={color} transparent wireframe />
      </mesh>
      <mesh ref={c} position={[1.4, 0, 0]}>
        <torusGeometry args={[0.48, 0.16, 12, 24]} />
        <meshStandardMaterial color={color} transparent wireframe />
      </mesh>
    </group>
  );
}

export function VisualParityScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const k = 0.5 + 0.5 * Math.sin(t.current * 0.9);
    if (left.current) left.current.position.set(-0.55 + k * 0.48, 0.05 * (1 - k), 0);
    if (right.current) right.current.position.set(0.55 - k * 0.48, -0.05 * (1 - k), 0.02);
  });
  return (
    <group>
      <mesh ref={left}>
        <planeGeometry args={[1.6, 2]} />
        <meshStandardMaterial color={color} transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={right}>
        <planeGeometry args={[1.6, 2]} />
        <meshStandardMaterial color="#e2e8f0" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function AuthoringSkillScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const extra = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (extra.current) {
      const drop = 0.5 + 0.5 * Math.sin(t.current * 0.8);
      extra.current.position.y = 1.3 - drop * 1.8;
      extra.current.material = extra.current.material as THREE.MeshStandardMaterial;
      (extra.current.material as THREE.MeshStandardMaterial).opacity = 1 - drop;
    }
  });
  return (
    <group>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -0.5 + i * 0.12, i * 0.04]} rotation={[-0.4, 0.3, 0]}>
          <boxGeometry args={[1.6, 0.08, 2.1]} />
          {mat(i === 2 ? color : "#3f3f46")}
        </mesh>
      ))}
      <mesh ref={extra} rotation={[-0.5, 0.2, 0.2]}>
        <boxGeometry args={[1.5, 0.06, 1.9]} />
        <meshStandardMaterial color="#71717a" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export function EvalScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const time = t.current;
    if (a.current) a.current.position.z = -1.2 + ((time * 0.9) % 2.4);
    if (b.current) b.current.position.z = -1.2 + ((time * 0.75 + 0.4) % 2.4);
  });
  return (
    <group>
      <mesh>
        <octahedronGeometry args={[0.28, 0]} />
        {mat("#fde68a", { emissive: "#fde68a", emissiveIntensity: 0.8 })}
      </mesh>
      <mesh position={[-1.1, -0.9, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.08, 3]} />
        {mat("#27272a")}
      </mesh>
      <mesh position={[1.1, -0.9, 0]}>
        <boxGeometry args={[0.5, 0.08, 3]} />
        {mat("#27272a")}
      </mesh>
      <mesh ref={a} position={[-1.1, -0.55, 0]}>
        <boxGeometry args={[0.28, 0.28, 0.28]} />
        {mat(color)}
      </mesh>
      <mesh ref={b} position={[1.1, -0.55, 0]}>
        <boxGeometry args={[0.28, 0.28, 0.28]} />
        {mat("#64748b")}
      </mesh>
    </group>
  );
}

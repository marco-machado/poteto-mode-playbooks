"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export type SceneProps = { color: string; paused: boolean };

export function useClock(paused: boolean, speed = 1) {
  const time = useRef(paused ? 1.6 : 0);
  useFrame((_, delta) => {
    if (!paused) time.current += delta * speed;
  });
  return time;
}

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.32} />
      <directionalLight position={[4, 8, 3]} intensity={1.15} />
      <pointLight position={[-5, 2, -4]} intensity={0.55} color="#93c5fd" />
      <pointLight position={[3, -2, 5]} intensity={0.35} color="#fde68a" />
    </>
  );
}

export function Floor() {
  return (
    <gridHelper
      args={[14, 18, "#27272a", "#18181b"]}
      position={[0, -1.85, 0]}
    />
  );
}

export function mat(color: string, extra?: Partial<THREE.MeshStandardMaterialParameters>) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.38}
      metalness={0.22}
      {...extra}
    />
  );
}

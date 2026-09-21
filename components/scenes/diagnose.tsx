"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { mat, useClock, type SceneProps } from "./shared";

export function InvestigationScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const ring = useRef<THREE.Mesh>(null);
  const hit = useRef<THREE.Mesh>(null);
  useFrame(() => {
    const time = t.current;
    if (ring.current) {
      ring.current.position.y = Math.sin(time * 1.4) * 1.2;
      ring.current.rotation.z = time * 0.4;
    }
    if (hit.current) {
      const pulse = 0.5 + 0.5 * Math.sin(time * 4);
      hit.current.scale.setScalar(0.18 + pulse * 0.08);
    }
  });
  return (
    <group>
      <mesh rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#1c1917"
          wireframe
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.03, 8, 48]} />
        {mat(color, { emissive: color, emissiveIntensity: 0.8 })}
      </mesh>
      <mesh ref={hit} position={[0.85, 0.7, 0.55]}>
        <sphereGeometry args={[1, 16, 16]} />
        {mat("#fde68a", { emissive: "#fde68a", emissiveIntensity: 1.2 })}
      </mesh>
    </group>
  );
}

export function BugFixScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const probe = useRef<THREE.Mesh>(null);
  const root = useRef<THREE.Mesh>(null);
  const cubes = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        x: (i % 3) * 0.9 - 0.9,
        y: Math.floor(i / 3) * 0.9 - 0.6,
        z: (i % 2) * 0.5 - 0.2,
        root: i === 4,
      })),
    []
  );
  useFrame(() => {
    const cycle = t.current % 7;
    const target = new THREE.Vector3(0, 0.3, 0.3);
    if (probe.current) {
      if (cycle < 2.4) {
        probe.current.position.set(
          Math.sin(cycle * 3) * 1.6,
          0.8 + Math.cos(cycle * 2) * 0.5,
          1.4
        );
      } else {
        probe.current.position.lerp(target.clone().add(new THREE.Vector3(0, 0.55, 0.4)), 0.08);
      }
    }
    if (root.current) {
      const fixed = cycle > 3.4 && cycle < 6.4;
      const material = root.current.material as THREE.MeshStandardMaterial;
      material.color.set(fixed ? "#4ade80" : color);
      material.emissive.set(fixed ? "#4ade80" : color);
      material.emissiveIntensity = fixed ? 0.7 : 0.25;
    }
  });
  return (
    <group>
      {cubes.map((cube) => (
        <mesh
          key={`${cube.x}-${cube.y}`}
          ref={cube.root ? root : undefined}
          position={[cube.x, cube.y, cube.z]}
        >
          <boxGeometry args={[0.62, 0.62, 0.62]} />
          {mat(cube.root ? color : "#3f3f46")}
        </mesh>
      ))}
      <mesh ref={probe}>
        <octahedronGeometry args={[0.18, 0]} />
        {mat("#e2e8f0", { emissive: "#e2e8f0", emissiveIntensity: 0.8 })}
      </mesh>
    </group>
  );
}

export function PerfIssueScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const gate = useRef<THREE.Mesh>(null);
  const count = 42;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () => Array.from({ length: count }, () => Math.random()),
    []
  );
  useFrame(() => {
    const open = 0.22 + 0.7 * (0.5 + 0.5 * Math.sin(t.current * 0.7));
    if (gate.current) gate.current.scale.set(1, open, 1);
    if (!mesh.current) return;
    for (let i = 0; i < count; i += 1) {
      const u = (t.current * 0.55 + seeds[i] * 8) % 8;
      const x = -3.4 + u;
      const jammed = Math.abs(x) < 0.35 ? 0.15 : 1;
      dummy.position.set(
        x,
        Math.sin(seeds[i] * 12 + t.current) * 0.15 * jammed,
        (seeds[i] - 0.5) * 1.2 * jammed
      );
      dummy.scale.setScalar(0.9);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <group>
      <mesh position={[-0.05, 0, 0]} ref={gate}>
        <boxGeometry args={[0.18, 2.4, 2.2]} />
        {mat("#27272a")}
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
        />
      </instancedMesh>
    </group>
  );
}

export function HillclimbScene({ color, paused }: SceneProps) {
  const t = useClock(paused);
  const climber = useRef<THREE.Mesh>(null);
  const steps = [ -1.6, -0.7, 0.2, 1.1, 2.0 ];
  useFrame(() => {
    const cycle = t.current % 9;
    const index = Math.min(4, Math.floor(cycle / 1.5));
    const slip = cycle > 4.4 && cycle < 5.2;
    const y = slip ? steps[2] + 0.55 : steps[index] + 0.55;
    const x = slip ? index * 0.7 - 1.6 : index * 0.85 - 1.7;
    if (climber.current) {
      climber.current.position.lerp(new THREE.Vector3(x, y, 0), 0.12);
    }
  });
  return (
    <group>
      {steps.map((y, i) => (
        <mesh key={y} position={[i * 0.85 - 1.7, y, 0]}>
          <boxGeometry args={[0.9, 0.18, 0.9]} />
          {mat(i === 4 ? color : "#3f3f46")}
        </mesh>
      ))}
      <mesh ref={climber}>
        <sphereGeometry args={[0.22, 16, 16]} />
        {mat(color, { emissive: color, emissiveIntensity: 0.55 })}
      </mesh>
    </group>
  );
}

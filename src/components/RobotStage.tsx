import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Grid } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Rig({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const g = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.rotation.y += dt * 0.15 + pointer.current.x * 0.002;
    g.current.rotation.x = THREE.MathUtils.lerp(
      g.current.rotation.x,
      pointer.current.y * 0.1,
      0.05
    );
  });

  return (
    <group ref={g}>
      {/*
        Placeholder for @designcodeio/threeui RobotViewer.
        In a real build, we'd import a specific GLTF or use the library's component.
      */}
      <mesh>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color="#101418"
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

export function RobotStage() {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [3.2, 2.2, 4.2], fov: 38 }}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
      }}
      onPointerMove={(e) => {
        pointer.current = {
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        };
      }}
    >
      <color attach="background" args={["#F6F7F9"]} />
      <fog attach="fog" args={["#F6F7F9", 8, 16]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#2B5CFF" />
      <Suspense fallback={null}>
        <Rig pointer={pointer} />
        <Grid
          infiniteGrid
          sectionColor="#D4D9E1"
          cellColor="#E7EBF1"
          fadeDistance={14}
        />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.25} blur={2.4} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

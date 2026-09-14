import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Grid, Html } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// Viewpoints define the "scenes" the camera will visit
export const VIEWPOINTS = {
  HERO: { position: [3.2, 2.2, 4.2], target: [0, 0, 0], fov: 38 },
  WORK: { position: [-2, 1, 2], target: [0, 0, 0], fov: 30 },
  LAB: { position: [0, 3, 1], target: [0, 0, 0], fov: 45 },
  CONTACT: { position: [0, 0, 5], target: [0, 0, 0], fov: 35 },
};

function CameraController({ progress }: { progress: number }) {
  const { camera } = useThree();
  const camPos = useRef(new THREE.Vector3());
  const camTarget = useRef(new THREE.Vector3());

  useFrame(() => {
    // Interpolate between viewpoints based on scroll progress (0 to 1)
    // This is a simplified linear interpolation across 4 points
    const points = [VIEWPOINTS.HERO, VIEWPOINTS.WORK, VIEWPOINTS.LAB, VIEWPOINTS.CONTACT];
    const section = Math.min(Math.floor(progress * (points.length - 1)), points.length - 2);
    const sectionProgress = (progress * (points.length - 1)) - section;

    const start = points[section];
    const end = points[section + 1];

    // Lerp Position
    camPos.current.set(
      THREE.MathUtils.lerp(start.position[0], end.position[0], sectionProgress),
      THREE.MathUtils.lerp(start.position[1], end.position[1], sectionProgress),
      THREE.MathUtils.lerp(start.position[2], end.position[2], sectionProgress)
    );

    // Lerp Target
    camTarget.current.set(
      THREE.MathUtils.lerp(start.target[0], end.target[0], sectionProgress),
      THREE.MathUtils.lerp(start.target[1], end.target[1], sectionProgress),
      THREE.MathUtils.lerp(start.target[2], end.target[2], sectionProgress)
    );

    camera.position.copy(camPos.current);
    camera.lookAt(camTarget.current);
    camera.fov = THREE.MathUtils.lerp(start.fov, end.fov, sectionProgress);
    camera.updateProjectionMatrix();
  });

  return null;
}

function Rig({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const g = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (!g.current) return;
    // Gentle float motion + pointer influence
    g.current.rotation.y += dt * 0.1 + pointer.current.x * 0.001;
    g.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;

    if (ring1.current) ring1.current.rotation.z += dt * 0.5;
    if (ring2.current) ring2.current.rotation.x += dt * 0.3;
  });

  return (
    <group ref={g}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#101418" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshStandardMaterial color="#2B5CFF" emissive="#2B5CFF" emissiveIntensity={2} />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#2B5CFF" opacity={0.4} transparent />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshStandardMaterial color="#D4D9E1" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

function HudOverlay() {
  return (
    <Html position={[0, 1.5, 0]} center>
      <div className="pointer-events-none select-none flex flex-col gap-2">
        <div className="px-3 py-1 rounded-full bg-surface/60 border border-line backdrop-blur-md font-mono text-[10px] text-accent">
          CORE_STATUS: OPTIMAL
        </div>
        <div className="px-3 py-1 rounded-full bg-surface/60 border border-line backdrop-blur-md font-mono text-[10px] text-muted">
          SENSORS: ACTIVE / LINK: ESTABLISHED
        </div>
      </div>
    </Html>
  );
}

export function RobotStage({ scrollProgress }: { scrollProgress: number }) {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointer.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#F6F7F9"]} />
      <fog attach="fog" args={["#F6F7F9", 8, 16]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#2B5CFF" />
      <Suspense fallback={null}>
        <CameraController progress={scrollProgress} />
        <Rig pointer={pointer} />
        <HudOverlay />
        <Grid infiniteGrid sectionColor="#D4D9E1" cellColor="#E7EBF1" fadeDistance={14} />
        <ContactShadows position={[0, -1.2, 0]} opacity={0.25} blur={2.4} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

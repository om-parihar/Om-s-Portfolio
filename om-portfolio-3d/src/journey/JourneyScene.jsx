
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import JourneyObjects from "./JourneyObjects.jsx";
import JourneyCamera from "./JourneyCamera.jsx";

function FoundationObject() {
  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshStandardMaterial
          color="#17102f"
          metalness={0.75}
          roughness={0.2}
          wireframe
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0.3, 0]}>
        <torusGeometry args={[1.65, 0.012, 16, 120]} />
        <meshBasicMaterial color="#a78bfa" />
      </mesh>

      <mesh rotation={[0.7, 0, 0.7]}>
        <torusGeometry args={[1.9, 0.008, 16, 120]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}

function JourneyEnvironment() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 4]} intensity={30} color="#a78bfa" />
      <pointLight position={[-3, -2, 2]} intensity={20} color="#38bdf8" />

      <Stars
        radius={80}
        depth={40}
        count={1600}
        factor={3}
        saturation={0}
        fade
        speed={0.25}
      />

      <FoundationObject />
      <JourneyObjects />
    </>
  );
}

export default function JourneyScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.25]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <JourneyCamera />
      <JourneyEnvironment />
    </Canvas>
  );
}

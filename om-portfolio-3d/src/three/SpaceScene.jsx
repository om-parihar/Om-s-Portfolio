
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import FloatingPlanet from "./FloatingPlanet.jsx";
import CameraRig from "./CameraRig.jsx";

export default function SpaceScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.25]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.7} />

      <pointLight
        position={[4, 3, 4]}
        intensity={40}
        color="#a78bfa"
      />

      <pointLight
        position={[-4, -2, 2]}
        intensity={20}
        color="#38bdf8"
      />

      <CameraRig />

      <Stars
        radius={100}
        depth={50}
        count={1800}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />

      <FloatingPlanet />
    </Canvas>
  );
}

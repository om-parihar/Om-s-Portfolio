import { Float } from "@react-three/drei";

export default function FloatingPlanet() {
  return (
    <Float
      speed={1.2}
      rotationIntensity={0.25}
      floatIntensity={0.6}
    >
      <group position={[2, 0, 0]} rotation={[0.3, 0, 0.2]}>
        <mesh>
          <sphereGeometry args={[1.5, 40, 40]} />
          <meshStandardMaterial
            color="#392078"
            roughness={0.35}
            metalness={0.5}
            emissive="#17083d"
            emissiveIntensity={0.5}
          />
        </mesh>

        <mesh rotation={[1.15, 0.2, 0]}>
          <torusGeometry args={[2.15, 0.025, 10, 80]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#8b5cf6"
            emissiveIntensity={2}
          />
        </mesh>

        <mesh rotation={[1.15, 0.2, 0]}>
          <torusGeometry args={[1.9, 0.012, 10, 80]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
}


import { Float, Line } from "@react-three/drei";

function ProblemSolver() {
  const nodes = [
    [-0.7, 0.5, 0],
    [0.7, 0.5, 0],
    [0, -0.5, 0],
    [0, 0, 0.5],
  ];

  return (
    <group position={[1.5, 0.4, 0]}>
      {nodes.map((position, index) => (
        <mesh position={position} key={index}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#a78bfa" : "#38bdf8"}
            emissive={index % 2 === 0 ? "#7c3aed" : "#0284c7"}
            emissiveIntensity={2}
          />
        </mesh>
      ))}

      <Line points={[[ -0.7, 0.5, 0], [0, 0, 0.5], [0.7, 0.5, 0]]} color="#a78bfa" lineWidth={2} />
      <Line points={[[0, 0, 0.5], [0, -0.5, 0]]} color="#38bdf8" lineWidth={2} />
    </group>
  );
}

function Builder() {
  return (
    <group position={[2.5, -0.5, 0]}>
      <Float speed={1} rotationIntensity={0.15} floatIntensity={0.2}>
        <mesh>
          <boxGeometry args={[1.8, 1.2, 0.12]} />
          <meshStandardMaterial
            color="#17102f"
            metalness={0.6}
            roughness={0.25}
            wireframe
          />
        </mesh>

        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[1.5, 0.9]} />
          <meshBasicMaterial color="#101b35" />
        </mesh>

        <Line points={[[-0.55, 0.2, 0.1], [0.35, 0.2, 0.1]]} color="#38bdf8" lineWidth={2} />
        <Line points={[[-0.55, 0, 0.1], [0.55, 0, 0.1]]} color="#a78bfa" lineWidth={2} />
        <Line points={[[-0.55, -0.2, 0.1], [0.15, -0.2, 0.1]]} color="#38bdf8" lineWidth={2} />
      </Float>
    </group>
  );
}

function Intelligence() {
  const nodes = [
    [0, 0, 0],
    [-0.6, 0.4, 0],
    [0.6, 0.4, 0],
    [-0.6, -0.4, 0],
    [0.6, -0.4, 0],
    [0, 0, 0.6],
  ];

  return (
    <group position={[0.5, 1, 0]}>
      <mesh>
        <icosahedronGeometry args={[0.55, 2]} />
        <meshStandardMaterial
          color="#312e81"
          emissive="#7c3aed"
          emissiveIntensity={1.5}
          wireframe
        />
      </mesh>

      {nodes.map((position, index) => (
        <mesh position={position} key={index}>
          <sphereGeometry args={[0.1, 20, 20]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      ))}

      {nodes.slice(1).map((position, index) => (
        <Line
          key={index}
          points={[[0, 0, 0], position]}
          color="#a78bfa"
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function DestinationPortal() {
  return (
    <group position={[0, 0, -0.5]}>
      <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.15}>
        <mesh>
          <torusGeometry args={[1.2, 0.055, 24, 120]} />
          <meshBasicMaterial color="#a78bfa" />
        </mesh>

        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.95, 0.025, 16, 100]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </Float>

      <pointLight position={[0, 0, 1]} intensity={15} color="#a78bfa" />
    </group>
  );
}

export default function JourneyObjects() {
  return (
    <>
      <ProblemSolver />
      <Builder />
      <Intelligence />
      <DestinationPortal />
    </>
  );
}

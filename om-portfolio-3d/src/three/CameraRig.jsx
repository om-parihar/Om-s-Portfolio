
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils } from "three";

export default function CameraRig() {
  const group = useRef();

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;

    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.12,
      2.5,
      delta
    );

    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -pointer.y * 0.08,
      2.5,
      delta
    );
  });

  return <group ref={group} />;
}

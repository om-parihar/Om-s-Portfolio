
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const cameraPath = {
      x: 0,
      y: 0,
      z: 7,
      targetX: 0,
      targetY: 0,
      targetZ: 0,
    };

    const updateCamera = () => {
      camera.position.set(
        cameraPath.x,
        cameraPath.y,
        cameraPath.z
      );

      camera.lookAt(
        cameraPath.targetX,
        cameraPath.targetY,
        cameraPath.targetZ
      );
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#journey",
        start: "top top",
        end: "+=5000",
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(cameraPath, {
        x: 1.5,
        y: 0.4,
        z: 5.5,
        targetX: 1.5,
        targetY: 0.4,
        duration: 1,
        onUpdate: updateCamera,
      })
      .to(cameraPath, {
        x: 2.5,
        y: -0.5,
        z: 5.5,
        targetX: 2.5,
        targetY: -0.5,
        duration: 1,
        onUpdate: updateCamera,
      })
      .to(cameraPath, {
        x: 0.5,
        y: 1,
        z: 5.5,
        targetX: 0.5,
        targetY: 1,
        duration: 1,
        onUpdate: updateCamera,
      })
      .to(cameraPath, {
        x: 0,
        y: 0,
        z: 4.5,
        targetX: 0,
        targetY: 0,
        targetZ: -0.5,
        duration: 1,
        onUpdate: updateCamera,
      });

    updateCamera();

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [camera]);

  return null;
}

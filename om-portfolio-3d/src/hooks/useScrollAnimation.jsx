
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function useScrollAnimation(selector, options = {}) {
  const { y = 45, duration = 0.8, stagger = 0.15 } = options;

  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elements[0],
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [selector, y, duration, stagger]);
}

export default useScrollAnimation;

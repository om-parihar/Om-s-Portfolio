
import { useEffect, useRef } from "react";
import { Code2, BrainCircuit, Globe, Rocket } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JourneyScene from "../journey/JourneyScene.jsx";
import "./Journey.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    number: "01",
    title: "The Foundation",
    subtitle: "Where it all began",
    description:
      "Building a strong foundation in programming, learning C++, JavaScript, Python, and the fundamentals of computer science.",
    icon: Code2,
    label: "Programming",
  },
  {
    number: "02",
    title: "The Problem Solver",
    subtitle: "Thinking beyond the obvious",
    description:
      "Strengthening problem-solving skills through Data Structures and Algorithms, patterns, complexity analysis, and 500+ LeetCode problems.",
    icon: BrainCircuit,
    label: "DSA & Algorithms",
  },
  {
    number: "03",
    title: "The Builder",
    subtitle: "Turning ideas into products",
    description:
      "Building full-stack applications with React, Node.js, Express, and MongoDB, transforming ideas into real-world projects.",
    icon: Globe,
    label: "Full-Stack Development",
  },
  {
    number: "04",
    title: "The Intelligence",
    subtitle: "Exploring the next frontier",
    description:
      "Exploring Machine Learning, Generative AI, neural networks, and intelligent applications.",
    icon: BrainCircuit,
    label: "AI & Machine Learning",
  },
  {
    number: "05",
    title: "The Destination",
    subtitle: "Software Engineering × AI",
    description:
      "Working towards becoming a software engineer who builds scalable systems and intelligent products.",
    icon: Rocket,
    label: "Future Goal",
  },
];

export default function Journey() {
  const sectionRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel, index) => {
        if (!panel) return;

        gsap.set(panel, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 35,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1,
        },
      });

      milestones.forEach((_, index) => {
        if (index === 0) return;

        timeline
          .to(
            panelsRef.current[index - 1],
            { autoAlpha: 0, y: -35, duration: 0.35 },
            index
          )
          .to(
            panelsRef.current[index],
            { autoAlpha: 1, y: 0, duration: 0.35 },
            index
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="journey-section" id="journey" ref={sectionRef}>
      <div className="journey-stage">
        <div className="journey-canvas">
          <JourneyScene />
        </div>

        <div className="journey-heading">
          <span>THE EVOLUTION</span>
          <h2>My Journey</h2>
        </div>

        <div className="journey-content">
          {milestones.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                className="journey-panel"
                key={item.number}
                ref={(element) => {
                  panelsRef.current[index] = element;
                }}
              >
                <div className="journey-number">{item.number}</div>
                <div className="journey-icon">
                  <Icon size={25} />
                </div>
                <span className="journey-label">{item.label}</span>
                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>
                <p>{item.description}</p>
                <div className="journey-progress">
                  0{index + 1} <span>/ 05</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="journey-scroll-hint">
          SCROLL TO EXPLORE <span>↓</span>
        </div>
      </div>
    </section>
  );
}

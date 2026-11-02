import useScrollAnimation from "../hooks/useScrollAnimation.jsx";
import { useState } from "react";
import {
  Code2,
  Globe,
  Server,
  BrainCircuit,
  Wrench,
  ArrowUpRight
} from "lucide-react";

const categories = [
  {
    name: "Programming Languages",
    short: "Languages",
    icon: Code2,
    description: "The languages I use to solve problems.",
    skills: ["C++", "JavaScript", "Python", "SQL"]
  },
  {
    name: "Frontend Development",
    short: "Frontend",
    icon: Globe,
    description: "Building interactive user experiences.",
    skills: ["HTML5", "CSS3", "React", "Tailwind CSS"]
  },
  {
    name: "Backend Development",
    short: "Backend",
    icon: Server,
    description: "Building APIs and server-side applications.",
    skills: ["Node.js", "Express.js", "MongoDB", "Oracle SQL"]
  },
  {
    name: "AI & Machine Learning",
    short: "AI & ML",
    icon: BrainCircuit,
    description: "Exploring intelligent systems and AI.",
    skills: ["Machine Learning", "Generative AI", "NumPy", "Pandas"]
  },
  {
    name: "Tools & Technologies",
    short: "Tools",
    icon: Wrench,
    description: "Tools that power my development workflow.",
    skills: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Netlify"]
  }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(null);

  const selected = categories.find(
    (category) => category.short === activeCategory
  );

  useScrollAnimation(".skill-category", {
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    });

  return (
    <section className="skills-section" id="skills">
      <div className="section-container">

        <div className="section-heading">
          <span className="section-tag">MY TECH UNIVERSE</span>
          <h2>Skills & <span>Technologies.</span></h2>
          <p>
            Explore the technologies behind the things I build.
          </p>
        </div>

        <div className="skill-category-grid">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.short;

            return (
              <button
                key={category.short}
                className={`skill-category-card ${isActive ? "selected" : ""}`}
                onClick={() =>
                  setActiveCategory(isActive ? null : category.short)
                }
                aria-expanded={isActive}
              >
                <div className="category-card-top">
                  <div className="category-icon">
                    <Icon size={23} />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="category-arrow"
                  />
                </div>

                <div className="category-card-bottom">
                  <span>0{index + 1} / CATEGORY</span>
                  <h3>{category.name}</h3>
                  <p>{category.skills.length} technologies</p>
                </div>
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="selected-skills" key={selected.short}>
            <div className="selected-skills-heading">
              <div>
                <span className="section-tag">EXPLORE CATEGORY</span>
                <h3>{selected.name}</h3>
                <p>{selected.description}</p>
              </div>

              <button
                className="close-skills"
                onClick={() => setActiveCategory(null)}
                aria-label="Close skills"
              >
                ✕
              </button>
            </div>

            <div className="skill-chip-list">
              {selected.skills.map((skill, index) => (
                <div
                  className="skill-chip"
                  key={skill}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <span className="chip-dot"></span>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {!selected && (
          <p className="skill-explorer-hint">
            SELECT A CATEGORY TO EXPLORE MY TECH STACK ↗
          </p>
        )}

      </div>
    </section>
  );
}

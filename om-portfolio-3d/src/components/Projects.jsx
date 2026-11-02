import { GitBranch, ExternalLink, ArrowUpRight } from "lucide-react";
import useScrollAnimation from "../hooks/useScrollAnimation.jsx";

const projects = [
  {
    number: "01",
    name: "DevConnect",
    category: "FULL STACK DEVELOPMENT",
    image: "/images/DevConnect.png",
    description:
      "A platform where developers can explore, share and manage software projects with authentication and ownership-based access.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/om-parihar/DevConnect",
    demo: "https://devconnectapi.netlify.app/",
    featured: true
  },
  {
    number: "02",
    name: "AgroTek",
    category: "WEB DEVELOPMENT",
    image: "/images/Agrotek.png",
    description:
      "An agricultural technology project focused on building useful digital experiences for the agriculture domain.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "https://agrotek-solutions.netlify.app/"
  },
  {
    number: "03",
    name: "Classco",
    category: "WEB DEVELOPMENT",
    image: "/images/Classco.png",
    description:
      "An education-focused project designed to improve the digital learning experience.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "https://classco.vercel.app/"
  },
  {
    number: "04",
    name: "Movie Recommendation System",
    category: "MACHINE LEARNING",
    image: "/images/MovieRecommendation.png",
    description:
      "A machine learning project exploring recommendation techniques to suggest movies based on user preferences.",
    technologies: ["Python", "Pandas", "Machine Learning"],
    github: "#",
    demo: "https://movies-recommendation-system-green.vercel.app/"
  },
  {
    number: "05",
    name: "YouTube Clone",
    category: "FRONTEND DEVELOPMENT",
    image: "/images/YouTubeClone.png",
    description:
      "A frontend project recreating the familiar YouTube interface and video browsing experience.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "#"
  },
  {
    number: "06",
    name: "My Portfolio",
    category: "WEB DEVELOPMENT",
    image: "/images/Portfolio.png",
    description:
      "My earlier personal portfolio showcasing my skills, projects and development journey.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/om-parihar/Om-s-Portfolio",
    demo: "https://om-s-portfolio.netlify.app/"
  }
];

export default function Projects() {
  useScrollAnimation(".project-card", {
    y: 55,
    duration: 0.9,
    stagger: 0.2,
  });

  return (
    <section className="projects-section" id="projects">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-tag">SELECTED WORK</span>
          <h2>Things I've <span>Built.</span></h2>
          <p>
            A collection of projects, experiments and ideas
            brought to life through code.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              className={`project-card ${project.featured ? "featured-project" : ""}`}
              key={project.number}
            >
              <div className="project-visual project-image-visual">
                <img
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  className="project-screenshot"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <div className="project-visual-glow"></div>

                <span className="project-category">
                  {project.category}
                </span>
              </div>

              <div className="project-details">
                <div className="project-title-row">
                  <h3>{project.name}</h3>
                  <ArrowUpRight size={21} />
                </div>

                <p>{project.description}</p>

                <div className="project-tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GitBranch size={17} />
                      Source Code
                    </a>
                  )}

                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import gsap from "gsap";
import { useEffect, useState } from "react";
import SpaceScene from "./three/SpaceScene.jsx";
import "./App.css";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Journey from "./components/Journey.jsx";

function App() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll(
      "#about, #journey, #skills, #projects, #contact"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

useEffect(() => {
  const timeline = gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.45,
    },
  });

  timeline
    .from(".navbar", {
      y: -20,
      opacity: 0,
      duration: 0.4,
    })
    .from(
      ".hero-content .eyebrow",
      {
        y: 15,
        opacity: 0,
      },
      "-=0.2"
    )
    .from(
      ".hero-content h1",
      {
        y: 25,
        opacity: 0,
        duration: 0.55,
      },
      "-=0.2"
    )
    .from(
      ".hero-description",
      {
        y: 15,
        opacity: 0,
      },
      "-=0.25"
    )
    .from(
      ".hero-buttons, .hero-stats",
      {
        y: 15,
        opacity: 0,
        stagger: 0.1,
      },
      "-=0.2"
    );

  return () => timeline.revert();
}, []);


const navLinks = [
  { name: "About", id: "about" },
  { name: "Journey", id: "journey" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

  return (
    <main>
      <section className="hero" id="home">
        <div className="space-background">
          <SpaceScene />
        </div>

        
    <nav className="navbar">
      <div className="logo">
        Om Parihar<span>.</span>
      </div>

      <div className="nav-links">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={activeSection === link.id ? "active" : ""}
            aria-current={activeSection === link.id ? "location" : undefined}
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="nav-actions">
        <a
          href="/SDE_Resume%20nov.pdf"
          target="_blank"
          rel="noreferrer"
          className="resume-nav-button"
        >
          Resume ↗
        </a>

        <a
          href="/previous-portfolio/index.html"
          className="previous-version-button"
        >
          Previous Version ↗
        </a>

        <a href="#contact" className="nav-button">
          Let's Connect
        </a>
      </div>
    </nav>


        <div className="hero-content">
          <p className="eyebrow">
            <span className="status-dot"></span>
            AVAILABLE FOR INTERNSHIPS
          </p>

          <h1>
            Building the
            <br />
            <span>Future</span> with Code.
          </h1>

          <p className="hero-description">
            Hi, I'm Om Parihar — a Computer Science student,
            software developer and problem solver exploring
            the intersection of software engineering and AI.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="primary-button">
              Explore My Work ↗
            </a>

            <a
              href="/SDE_Resume%20nov.pdf"
              download="Om_Parihar_Resume.pdf"
              className="secondary-button"
            >
              Download Resume ↓
            </a>

            <a
              href="https://github.com/om-parihar"
              target="_blank"
              rel="noreferrer"
              className="secondary-button"
            >
              GitHub ↗
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>500+</strong>
              <span>LeetCode</span>
            </div>

            <div>
              <strong>3rd</strong>
              <span>Year CSE</span>
            </div>

            <div>
              <strong>6+</strong>
              <span>Projects</span>
            </div>
          </div>
        </div>

        <div className="hero-caption">
          <span>01 / INTRODUCTION</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <About />
      <Journey />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;

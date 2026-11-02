import useScrollAnimation from "../hooks/useScrollAnimation.jsx";
import { Code2, BrainCircuit, Rocket } from "lucide-react";


export default function About() {
    useScrollAnimation(".developer-card, .about-content, .highlight", {
        y: 45,
        duration: 0.9,
        stagger: 0.2,
        });
  return (
    <section className="about-section" id="about">
      <div className="section-container">

        <div className="section-heading">
          <span className="section-tag">GET TO KNOW ME</span>
          <h2>Beyond the <span>Code.</span></h2>
          <p>A little about the developer behind the screen.</p>
        </div>

        <div className="about-grid">

          <div className="developer-card">
            <div className="card-top">
              <span>DEVELOPER PROFILE</span>
              <span className="online-dot"></span>
            </div>

            <div className="orbit-container">
              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>
              <div className="orbit-center">
                <img
                  src="/images/pfp.jpg"
                  alt="Om Parihar"
                  className="profile-photo"
                />
              </div>
              <div className="orbit-satellite"></div>
            </div>

            <h3>Om Parihar</h3>
            <p>Software Developer & AI Explorer</p>

            <div className="card-footer">
              <span><span className="online-dot"></span> OPEN TO OPPORTUNITIES</span>
              <span>INDIA</span>
            </div>
          </div>

          <div className="about-content">
            <span className="about-greeting">HELLO, WORLD! 👋</span>

            <h3>
              I turn ideas into
              <span> digital experiences.</span>
            </h3>

            <p>
              I'm Om Parihar, a Computer Science undergraduate
              passionate about software engineering, problem solving
              and emerging technologies.
            </p>

            <p>
              I enjoy building full-stack applications, exploring
              Artificial Intelligence and understanding how things
              work under the hood. I believe in learning by building
              and improving through consistent practice.
            </p>

            <div className="interest-list">
              <div className="interest-item">
                <Code2 size={19} />
                <span>Software Engineering</span>
              </div>

              <div className="interest-item">
                <BrainCircuit size={19} />
                <span>AI & Machine Learning</span>
              </div>

              <div className="interest-item">
                <Rocket size={19} />
                <span>Building Products</span>
              </div>
            </div>

          </div>
        </div>

        <div className="about-highlights">
          <div className="highlight">
            <strong>500+</strong>
            <span>Problems Solved</span>
          </div>

          <div className="highlight">
            <strong>MERN</strong>
            <span>Full Stack Development</span>
          </div>

          <div className="highlight">
            <strong>AI + SDE</strong>
            <span>Career Direction</span>
          </div>
        </div>

      </div>
    </section>
  );
}

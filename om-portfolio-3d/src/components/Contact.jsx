import useScrollAnimation from "../hooks/useScrollAnimation.jsx";
import { Mail, GitBranch, ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "omparihar1011@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  
  useScrollAnimation(".contact-heading, .contact-email-card, .contact-social-area", {
    y: 40,
    duration: 0.9,
    stagger: 0.2,
    });

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-heading">
          <span className="section-eyebrow">GET IN TOUCH</span>

          <h2>
            Let's build something <span>remarkable.</span>
          </h2>

          <p>
            I'm open to discussing software engineering, AI/ML opportunities,
            interesting projects, and collaborations. Have an idea? Let's connect.
          </p>
        </div>

        <div className="contact-email-card">
          <div className="contact-email-left">
            <div className="contact-email-icon">
              <Mail size={22} />
            </div>

            <div className="contact-email-info">
              <span>DROP ME AN EMAIL</span>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>

          <button className="copy-email" onClick={copyEmail}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="contact-social-area">
          <span className="contact-social-label">FIND ME ON</span>

          <div className="contact-socials">
            <a
              href="https://github.com/om-parihar"
              target="_blank"
              rel="noreferrer"
            >
              <GitBranch size={19} />
              <span>GitHub</span>
              <ArrowUpRight size={15} />
            </a>

            <a
              href="https://www.linkedin.com/in/om-parihar-b58472339/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="linkedin-icon">in</span>
              <span>LinkedIn</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

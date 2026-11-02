
import { GitBranch, ArrowUp, ArrowUpRight } from "lucide-react";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            Om Parihar<span>.</span>
          </a>
          <p>Building ideas into reality, one line at a time.</p>
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/om-parihar"
            target="_blank"
            rel="noreferrer"
          >
            <GitBranch size={17} />
            GitHub
            <ArrowUpRight size={13} />
          </a>

          <a
            href="https://www.linkedin.com/in/om-parihar-b58472339/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="linkedin-icon">in</span>
            LinkedIn
            <ArrowUpRight size={13} />
          </a>
        </div>

        <a href="#home" className="back-to-top">
          Back to top
          <ArrowUp size={15} />
        </a>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Om Parihar</span>
        <span>Designed & built with curiosity.</span>
      </div>
    </footer>
  );
}

export default Footer;

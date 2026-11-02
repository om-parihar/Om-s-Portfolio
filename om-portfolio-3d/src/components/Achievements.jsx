
import { Code2, ExternalLink, Trophy, Award, Medal } from "lucide-react";
import useScrollAnimation from "../hooks/useScrollAnimation.jsx";
import "./Achievements.css";

const profiles = [
  {
    name: "LeetCode",
    username: "om-parihar",
    description: "Data Structures, Algorithms and Competitive Programming.",
    url: "https://leetcode.com/u/om-parihar",
    icon: Code2,
    label: "CODING PROFILE",
    className: "leetcode-card",
  },
  {
    name: "GeeksforGeeks",
    username: "omparihar",
    description: "Practice, problem solving and computer science fundamentals.",
    url: "https://www.geeksforgeeks.org/profile/omparihar",
    icon: Trophy,
    label: "CODING PROFILE",
    className: "gfg-card",
  },
];

export default function Achievements() {
  useScrollAnimation(".achievement-card, .achievement-heading", {
    y: 40,
    duration: 0.8,
    stagger: 0.15,
  });

  return (
    <section className="achievements-section" id="achievements">
      <div className="achievements-container">

        <div className="section-heading achievement-heading">
          <span className="section-tag">MILESTONES & PROGRESS</span>
          <h2>Achievements & <span>Profiles.</span></h2>
          <p>
            Every problem solved, skill learned and milestone achieved
            is part of the journey.
          </p>
        </div>

        <div className="coding-profiles">
          <div className="achievement-subheading">
            <Code2 size={20} />
            <h3>Coding Profiles</h3>
          </div>

          <div className="achievement-profile-grid">
            {profiles.map((profile) => {
              const Icon = profile.icon;

              return (
                <article
                  className={`achievement-card ${profile.className}`}
                  key={profile.name}
                >
                  <div className="achievement-card-top">
                    <div className="achievement-icon">
                      <Icon size={25} />
                    </div>
                    <span>{profile.label}</span>
                  </div>

                  <h3>{profile.name}</h3>
                  <span className="achievement-username">
                    @{profile.username}
                  </span>

                  <p>{profile.description}</p>

                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="achievement-link"
                  >
                    View Profile <ExternalLink size={15} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>

        <div className="achievement-gallery">
          <div className="achievement-subheading">
            <Award size={20} />
            <h3>Certificates & Awards</h3>
          </div>

          <div className="achievement-empty-state">
            <Medal size={35} />
            <h3>Your achievements belong here.</h3>
            <p>
              Certificates, platform badges, hackathon achievements
              and other milestones will appear here.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

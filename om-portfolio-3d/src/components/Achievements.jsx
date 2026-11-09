
import GfgDashboard from "./GfgDashboard.jsx";
import { useEffect, useMemo, useState } from "react";
import {
  Code2,
  ExternalLink,
  Trophy,
  Award,
  Flame,
  Activity,
  FileText,
  ShieldCheck,
  X,
} from "lucide-react";
import useScrollAnimation from "../hooks/useScrollAnimation.jsx";
import "./Achievements.css";

const STATS_URL =
  "https://leetcode-stats.tashif.codes/om-parihar/stats";

const profiles = [
  {
    name: "LeetCode",
    username: "om-parihar",
    description: "Data Structures, Algorithms and Competitive Programming.",
    url: "https://leetcode.com/u/om-parihar",
    icon: Code2,
    className: "leetcode-card",
  },
  {
    name: "GeeksforGeeks",
    username: "omparihar",
    description: "Practice, problem solving and computer science fundamentals.",
    url: "https://www.geeksforgeeks.org/profile/omparihar",
    icon: Trophy,
    className: "gfg-card",
  },
];

const badges = [
  {
    title: "AWS Academy Graduate",
    subtitle: "Machine Learning Foundations",
    image: "/badges/AWS_BADGE.png",
    issuer: "Amazon Web Services",
    verifyUrl:
      "https://www.credly.com/badges/6069e9f9-1894-4d83-a210-672367cae56e/print",
  },
  {
    title: "50 Days Badge",
    subtitle: "2025",
    image: "/badges/50_Days_Badge_2025.png",
    issuer: "LeetCode",
    profileUrl:
      "https://leetcode.com/om-parihar/?showBadge=50-days-badge-2025",
  },
  {
    title: "50 Days Badge",
    subtitle: "2026",
    image: "/badges/50_Days_Badge_2026.png",
    issuer: "LeetCode",
    profileUrl:
      "https://leetcode.com/om-parihar/?showBadge=50-days-badge-2026",
  },
  {
    title: "100 Days Badge",
    subtitle: "Consistency Achievement",
    image: "/badges/100_Days_Badge.png",
    issuer: "LeetCode",
    profileUrl:
      "https://leetcode.com/om-parihar/?showBadge=100-days-badge",
  },
  {
    title: "October Badge",
    subtitle: "2026",
    image: "/badges/Oct_Badge_2026.png",
    issuer: "LeetCode",
    profileUrl:
      "https://leetcode.com/om-parihar/?showBadge=october-badge-2026",
  },
];

const certificates = [
  {
    title: "Oracle Certificate",
    issuer: "Oracle",
    file: "/certificates/AgenticAiOracle.pdf",
    type: "PDF",
  },
  {
    title: "CSS Certificate",
    file: "/certificates/css%20certificate.pdf",
    issuer: "Certificate",
  },
  {
    title: "Deloitte Job Simulation",
    issuer: "Deloitte",
    file: "/certificates/Deloitte%20Job%20Simulation%20Certificate.pdf",
    type: "PDF",
  },
  {
    title: "Generative AI",
    issuer: "Google",
    file: "/certificates/Gen%20Ai.pdf",
    type: "PDF",
  },
  {
    title: "JavaScript Basic Certificate",
    issuer: "Hackerrank",
    file: "/certificates/javascript_basic%20certificate.pdf",
    type: "PDF",
  },
];

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createHeatmap(calendar = {}) {
  const today = new Date();
  const start = new Date(today);

  start.setDate(today.getDate() - 364);
  start.setDate(start.getDate() - start.getDay());

  const contributions = {};

  Object.entries(calendar).forEach(([timestamp, count]) => {
    const date = new Date(Number(timestamp) * 1000);
    const key = date.toISOString().slice(0, 10);
    contributions[key] = Number(count);
  });

  const days = [];
  const current = new Date(start);

  while (current <= today) {
    const key = getDateKey(current);
    const count = contributions[key] || 0;

    days.push({
      date: key,
      count,
      level:
        count === 0 ? 0 :
        count <= 2 ? 1 :
        count <= 5 ? 2 :
        count <= 10 ? 3 : 4,
    });

    current.setDate(current.getDate() + 1);
  }

  return days;
}

export default function Achievements() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  useScrollAnimation(".achievement-card, .achievement-heading", {
    y: 40,
    duration: 0.8,
    stagger: 0.15,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(STATS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to fetch LeetCode statistics.");
        }

        const result = await response.json();

        if (result.status !== "success") {
          throw new Error("LeetCode statistics are currently unavailable.");
        }

        setStats(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!preview) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPreview(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [preview]);

  const heatmap = useMemo(
    () => createHeatmap(stats?.submissionCalendar),
    [stats]
  );

  const totalSubmissions = useMemo(
    () => heatmap.reduce((sum, day) => sum + day.count, 0),
    [heatmap]
  );

  const statItems = stats
    ? [
        { label: "Total Solved", value: stats.totalSolved },
        { label: "Easy", value: stats.easySolved },
        { label: "Medium", value: stats.mediumSolved },
        { label: "Hard", value: stats.hardSolved },
      ]
    : [];

  return (
    <section className="achievements-section" id="achievements">
      <div className="achievements-container">

        <div className="section-heading achievement-heading">
          <span className="section-tag">MILESTONES & PROGRESS</span>
          <h2>
            Achievements & <span>Profiles.</span>
          </h2>
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
                    <span>CODING PROFILE</span>
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

        <div className="leetcode-dashboard">
          <div className="achievement-subheading">
            <Activity size={20} />
            <h3>LeetCode Dashboard</h3>
            <span className="live-indicator">
              <span></span> LIVE DATA
            </span>
          </div>

          {loading && (
            <div className="leetcode-message">
              Loading your LeetCode statistics...
            </div>
          )}

          {error && (
            <div className="leetcode-message error">
              {error}
              <button onClick={() => window.location.reload()}>
                Retry
              </button>
            </div>
          )}

          {stats && (
            <>
              <div className="leetcode-overview">
                {statItems.map((item) => (
                  <div className="leetcode-stat" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>

              <div className="leetcode-extra-stats">
                <div>
                  <span>Acceptance Rate</span>
                  <strong>{stats.acceptanceRate}%</strong>
                </div>

                <div>
                  <span>Global Ranking</span>
                  <strong>
                    {Number(stats.ranking).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>Contribution Points</span>
                  <strong>{stats.contributionPoints}</strong>
                </div>
              </div>

              <div className="leetcode-heatmap-card">
                <div className="heatmap-heading">
                  <div>
                    <h4>Submission Activity</h4>
                    <p>
                      {totalSubmissions.toLocaleString("en-IN")} submissions
                      in the displayed period
                    </p>
                  </div>
                  <Flame size={22} />
                </div>

                <div className="heatmap-scroll">
                  <div className="leetcode-heatmap">
                    {heatmap.map((day) => (
                      <div
                        key={day.date}
                        className={`heatmap-day level-${day.level}`}
                        title={`${day.count} submissions on ${day.date}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="heatmap-legend">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`heatmap-day level-${level}`}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>

              <a
                href="https://leetcode.com/u/om-parihar"
                target="_blank"
                rel="noreferrer"
                className="achievement-link"
              >
                Explore LeetCode Profile <ExternalLink size={15} />
              </a>
            </>
          )}
        </div>

        <GfgDashboard />

        <div className="achievement-gallery">
          <div className="achievement-subheading">
            <Award size={20} />
            <h3>Certificates & Awards</h3>
          </div>

          <div className="achievement-subheading gallery-subheading">
            <Trophy size={18} />
            <h4>Badges & Achievements</h4>
          </div>

          <div className="achievement-badge-grid">
            {badges.map((badge) => (
              <article
                className="achievement-card badge-card"
                key={badge.image}
              >
                <button
                  type="button"
                  className="badge-image-link"
                  onClick={() =>
                    setPreview({
                      type: "image",
                      src: badge.image,
                      title: `${badge.title} ${badge.subtitle}`,
                    })
                  }
                  title={`Preview ${badge.title}`}
                >
                  <img
                    src={badge.image}
                    alt={`${badge.title} ${badge.subtitle}`}
                    className="achievement-badge-image"
                    loading="lazy"
                  />
                </button>

                <span className="badge-category">
                  {badge.issuer}
                </span>

                <h3>{badge.title}</h3>
                <h4>{badge.subtitle}</h4>

                {badge.verifyUrl && (
                  <a
                    href={badge.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="achievement-link"
                  >
                    <ShieldCheck size={15} />
                    Verify on Credly <ExternalLink size={15} />
                  </a>
                )}

                {badge.profileUrl && (
                  <a
                    href={badge.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="achievement-link"
                  >
                    View on LeetCode <ExternalLink size={15} />
                  </a>
                )}
              </article>
            ))}
          </div>

          <div className="achievement-subheading gallery-subheading">
            <FileText size={18} />
            <h4>Certificates</h4>
          </div>

          <div className="certificate-grid">
            {certificates.map((certificate) => (
              <div className="certificate-card" key={certificate.title}>
                <div
                  className="certificate-preview"
                  role="button"
                  tabIndex={0}
                  title={`Preview ${certificate.title}`}
                  onClick={() =>
                    setPreview({
                      type: "pdf",
                      src: certificate.file,
                      title: certificate.title,
                    })
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setPreview({
                        type: "pdf",
                        src: certificate.file,
                        title: certificate.title,
                      });
                    }
                  }}
                >
                  <iframe
                    src={`${certificate.file}#toolbar=0&navpanes=0&view=FitH`}
                    title={certificate.title}
                  />
                </div>

                <div className="certificate-info">
                  <h3>{certificate.title}</h3>
                  <p>{certificate.issuer}</p>

                  <a
                    href={certificate.file}
                    target="_blank"
                    rel="noreferrer"
                    className="achievement-link"
                  >
                    View Full Certificate ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {preview && (
        <div
          className="achievement-lightbox"
          onClick={() => setPreview(null)}
        >
          <div
            className="achievement-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="lightbox-header">
              <h3>{preview.title}</h3>

              <button
                type="button"
                className="lightbox-close"
                onClick={() => setPreview(null)}
                aria-label="Close preview"
              >
                <X size={21} />
              </button>
            </div>

            {preview.type === "image" ? (
              <img
                src={preview.src}
                alt={preview.title}
                className="lightbox-image"
              />
            ) : (
              <iframe
                src={`${preview.src}#toolbar=1&navpanes=0&view=FitH`}
                title={preview.title}
                className="lightbox-pdf"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

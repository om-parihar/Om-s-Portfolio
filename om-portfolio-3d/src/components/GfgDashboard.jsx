
import { useEffect, useMemo, useState } from "react";
import { Trophy, Flame, Activity, ExternalLink } from "lucide-react";

const STATS_URL =
  "https://gfg-stats.tashif.codes/omparihar/stats";

const HEATMAP_URL =
  "https://gfg-stats.tashif.codes/omparihar/heatmap?view=last_365";

function buildHeatmap(contributions = []) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 364);
  start.setDate(start.getDate() - start.getDay());

  const contributionMap = Object.fromEntries(
    contributions.map((item) => [item.date, item])
  );

  const days = [];
  const current = new Date(start);

  while (current <= today) {
    const date = [
      current.getFullYear(),
      String(current.getMonth() + 1).padStart(2, "0"),
      String(current.getDate()).padStart(2, "0"),
    ].join("-");

    const item = contributionMap[date];

    days.push({
      date,
      count: item?.count || 0,
      level: item?.level || 0,
    });

    current.setDate(current.getDate() + 1);
  }

  return days;
}

export default function GfgDashboard() {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchGfgData() {
      try {
        setLoading(true);
        setError("");

        const [statsResponse, heatmapResponse] = await Promise.all([
          fetch(STATS_URL, { signal: controller.signal }),
          fetch(HEATMAP_URL, { signal: controller.signal }),
        ]);

        if (!statsResponse.ok || !heatmapResponse.ok) {
          throw new Error("Unable to fetch GFG data.");
        }

        const [statsResult, heatmapResult] = await Promise.all([
          statsResponse.json(),
          heatmapResponse.json(),
        ]);

        if (
          statsResult.status !== "success" ||
          heatmapResult.status !== "success"
        ) {
          throw new Error("GFG data is currently unavailable.");
        }

        setStats(statsResult.data);
        setActivity(heatmapResult.data);
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

    fetchGfgData();

    return () => controller.abort();
  }, []);

  const heatmap = useMemo(
    () => buildHeatmap(activity?.dailyContributions),
    [activity]
  );

  const difficulties = [
    { label: "Basic", value: stats?.byDifficulty?.basic },
    { label: "Easy", value: stats?.byDifficulty?.easy },
    { label: "Medium", value: stats?.byDifficulty?.medium },
    { label: "Hard", value: stats?.byDifficulty?.hard },
  ];

  return (
    <div className="gfg-dashboard">
      <div className="achievement-subheading">
        <Trophy size={20} />
        <h3>GeeksforGeeks Dashboard</h3>
        <span className="live-indicator">
          <span></span> LIVE DATA
        </span>
      </div>

      {loading && (
        <div className="leetcode-message">
          Loading your GFG statistics...
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

      {stats && activity && (
        <>
          <div className="gfg-overview">
            <div className="gfg-total-card">
              <span>PROBLEMS SOLVED</span>
              <strong>{stats.totalSolved}</strong>
              <p>Across different difficulty levels</p>
            </div>

            <div className="gfg-streak-card">
              <Flame size={25} />
              <span>LONGEST STREAK</span>
              <strong>{activity.longestStreak} Days</strong>
              <p>Current streak: {activity.currentStreak} days</p>
            </div>
          </div>

          <div className="gfg-difficulty-grid">
            {difficulties.map((item) => (
              <div className="gfg-difficulty" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value ?? 0}</strong>
              </div>
            ))}
          </div>

          <div className="gfg-activity-info">
            <div>
              <Activity size={17} />
              <span>
                {activity.totalSubmissions} total submissions
              </span>
            </div>

            <div>
              <span>{activity.totalActiveDays} active days</span>
            </div>
          </div>

          <div className="leetcode-heatmap-card">
            <div className="heatmap-heading">
              <div>
                <h4>GFG Contribution Activity</h4>
                <p>
                  {activity.totalSubmissions} submissions in the last 365 days
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
            href="https://www.geeksforgeeks.org/profile/omparihar"
            target="_blank"
            rel="noreferrer"
            className="achievement-link"
          >
            Explore GFG Profile <ExternalLink size={15} />
          </a>
        </>
      )}
    </div>
  );
}

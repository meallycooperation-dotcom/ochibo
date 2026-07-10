import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type Week = ContributionDay[];

const levels = [
  "bg-neutral-100",
  "bg-green-200",
  "bg-green-400",
  "bg-green-500",
  "bg-green-700",
];

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string;
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME as string;

const fetchContributions = async (): Promise<Week[]> => {
  const now = new Date();
  const endDate = now.toISOString().split("T")[0];
  const startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0];

  const query = `
    query ($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { login: GITHUB_USERNAME, from: startDate + "T00:00:00Z", to: endDate + "T23:59:59Z" },
    }),
  });

  const json = await res.json();
  const weeks =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  return weeks.map((week: { contributionDays: { date: string; contributionCount: number }[] }) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: day.contributionCount === 0
        ? 0
        : day.contributionCount <= 3
          ? 1
          : day.contributionCount <= 6
            ? 2
            : day.contributionCount <= 9
              ? 3
              : 4,
    }))
  );
};

const GitHubContributions = () => {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchContributions();
        setWeeks(data);
        setTotal(
          data.flat().reduce((sum, day) => sum + day.count, 0)
        );
      } catch (e) {
        console.error("Failed to load GitHub contributions:", e);
      }
      setLoading(false);
    };

    void load();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading contributions...</p>;
  }

  if (weeks.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container mx-auto px-6"
    >
      <div className="rounded-3xl border border-orange-200 bg-white p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-orange-500 uppercase tracking-widest text-sm">
              Open Source
            </p>
            <h2 className="text-3xl font-bold mt-2">
              GitHub Contributions
            </h2>
          </div>

          <p className="text-gray-500 text-sm">
            {total.toLocaleString()} contributions in the last year
          </p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex gap-[3px] min-w-fit">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.count} contributions on ${day.date}`}
                    className={`h-[13px] w-[13px] rounded-[3px] ${levels[day.level]}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 justify-end">
          <span>Less</span>
          {levels.map((cls, i) => (
            <div key={i} className={`h-3 w-3 rounded-[2px] ${cls}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </motion.section>
  );
};

export default GitHubContributions;

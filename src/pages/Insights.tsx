import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
} from "recharts";

import BottomNav from "../components/BottomNav";

type Profile = {
  name: string;
  quitDate: string;
  urgesResisted: number;
  createdAt: string;
};

type Log = {
  mood: string;
  craving: number;
  smoked: boolean;
  urges: number;
  notes: string;
  time: string;
};

export default function Insights() {
  const navigate = useNavigate();

  const profile: Profile | null = JSON.parse(
    localStorage.getItem("profile") || "null"
  );

  const logs: Log[] = JSON.parse(
    localStorage.getItem("logs") || "[]"
  );

  const totalCheckIns = logs.length;

  const smokeFree = logs.filter(
    (log) => !log.smoked
  ).length;

  const averageCraving =
    totalCheckIns > 0
      ? (
          logs.reduce(
            (sum, log) => sum + log.craving,
            0
          ) / totalCheckIns
        ).toFixed(1)
      : "—";

  const successRate =
    totalCheckIns > 0
      ? Math.round((smokeFree / totalCheckIns) * 100)
      : 0;

  const quitDate = profile
    ? new Date(profile.quitDate)
    : new Date();

  const smokeFreeDays = Math.max(
    0,
    Math.floor(
      (Date.now() - quitDate.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const chartData = [...logs]
    .reverse()
    .slice(-7)
    .map((log, index) => ({
      day: index + 1,
      craving: log.craving,
    }));

  const milestones = [
    {
      title: "Carbon monoxide returning to normal",
      done: smokeFreeDays >= 1,
    },
    {
      title: "Nicotine has left your body",
      done: smokeFreeDays >= 2,
    },
    {
      title: "Circulation is improving",
      done: smokeFreeDays >= 14,
    },
    {
      title: "Lungs continue to heal",
      done: smokeFreeDays >= 90,
    },
    {
      title: "One full year smoke-free",
      done: smokeFreeDays >= 365,
    },
  ];

  return (
    <main className="min-h-screen max-w-md mx-auto bg-slate-50 px-6 py-8 pb-32">
      <button
        onClick={() => navigate("/")}
        className="mb-8 text-slate-500"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-slate-800">
        Progress
      </h1>

      <p className="mt-2 mb-10 text-slate-500">
        A quiet look back at how things have been.
      </p>

      <section className="mb-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex justify-between">
          <span className="text-slate-500">
            Smoke-free days
          </span>

          <span className="font-semibold text-[#315A8B]">
            {smokeFreeDays}
          </span>
        </div>

        <div className="mb-5 flex justify-between">
          <span className="text-slate-500">
            Urges resisted
          </span>

          <span className="font-semibold text-slate-800">
            {profile?.urgesResisted ?? 0}
          </span>
        </div>

        <div className="mb-5 flex justify-between">
          <span className="text-slate-500">
            Check-ins
          </span>

          <span className="font-semibold">
            {totalCheckIns}
          </span>
        </div>

        <div className="mb-5 flex justify-between">
          <span className="text-slate-500">
            Average craving
          </span>

          <span className="font-semibold">
            {averageCraving}/10
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">
            Smoke-free rate
          </span>

          <span className="font-semibold text-green-600">
            {successRate}%
          </span>
        </div>
      </section>

      <section className="mb-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-6 font-semibold">
          Recent cravings
        </h2>

        {chartData.length > 1 ? (
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <XAxis dataKey="day" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="craving"
                  stroke="#315A8B"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-slate-500">
            Keep checking in to reveal your patterns.
          </p>
        )}
      </section>

      <section className="mb-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-semibold">
          Recent check-ins
        </h2>

        {logs.length === 0 ? (
          <p className="text-slate-500">
            No check-ins yet.
          </p>
        ) : (
          logs.slice(0, 5).map((log, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0"
            >
              <div>
                <p className="font-medium">
                  {log.mood || "No mood selected"}
                </p>

                <p className="text-sm text-slate-400">
                  {new Date(log.time).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p>{log.craving}/10</p>

                <p className="text-xs text-slate-400">
                  {log.urges} urges
                </p>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="mb-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-semibold">
          Recovery milestones
        </h2>

        <div className="space-y-4">
          {milestones.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3"
            >
              <span className="text-xl">
                {item.done ? "✓" : "○"}
              </span>

              <span
                className={
                  item.done
                    ? "text-slate-800"
                    : "text-slate-400"
                }
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <p className="leading-7 italic text-slate-600">
          Progress isn't about perfection.
          It's about choosing yourself again and again.
        </p>
      </section>

      <BottomNav />
    </main>
  );
}
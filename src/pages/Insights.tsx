import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip,
} from "recharts";

import BottomNav from "../components/BottomNav";

export default function Insights() {
  const navigate = useNavigate();

  const logs = JSON.parse(localStorage.getItem("logs") || "[]");

  const totalCheckIns = logs.length;

  const smokeFree = logs.filter((log: any) => !log.smoked).length;

  const smoked = logs.filter((log: any) => log.smoked).length;

  const averageCraving =
    totalCheckIns > 0
      ? (
          logs.reduce(
            (sum: number, log: any) => sum + (log.craving || 0),
            0
          ) / totalCheckIns
        ).toFixed(1)
      : "—";

  const successRate =
    totalCheckIns > 0
      ? Math.round((smokeFree / totalCheckIns) * 100)
      : 0;

  const chartData = [...logs]
    .reverse()
    .slice(-7)
    .map((log: any, index: number) => ({
      day: index + 1,
      craving: log.craving,
    }));

  const milestones = [
    {
      title: "Carbon monoxide returning to normal",
      done: smokeFree >= 1,
    },
    {
      title: "Nicotine has left your body",
      done: smokeFree >= 2,
    },
    {
      title: "Circulation is improving",
      done: smokeFree >= 5,
    },
    {
      title: "Lungs continue to heal",
      done: smokeFree >= 10,
    },
    {
      title: "You're building healthier habits",
      done: smokeFree >= 20,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 max-w-md mx-auto px-6 py-8 pb-32">

      <button
        onClick={() => navigate("/")}
        className="text-slate-500 mb-8"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-slate-800">
        Progress
      </h1>

      <p className="text-slate-500 mt-2 mb-10">
        A quiet look back at how things have been.
      </p>

      {/* Summary */}

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">

        <div className="flex justify-between mb-5">
          <span className="text-slate-500">
            Check-ins
          </span>

          <span className="font-semibold text-slate-800">
            {totalCheckIns}
          </span>
        </div>

        <div className="flex justify-between mb-5">
          <span className="text-slate-500">
            Smoke-free
          </span>

          <span className="font-semibold text-green-600">
            {smokeFree}
          </span>
        </div>

        <div className="flex justify-between mb-5">
          <span className="text-slate-500">
            Smoked
          </span>

          <span className="font-semibold text-red-500">
            {smoked}
          </span>
        </div>

        <div className="flex justify-between mb-5">
          <span className="text-slate-500">
            Average craving
          </span>

          <span className="font-semibold text-slate-800">
            {averageCraving}/10
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">
            Smoke-free rate
          </span>

          <span className="font-semibold text-[#315A8B]">
            {successRate}%
          </span>
        </div>

      </section>

      {/* Craving Chart */}

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">

        <h2 className="font-semibold text-slate-800 mb-6">
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
            Keep checking in and you'll start to see patterns here.
          </p>
        )}

      </section>

      {/* Recent Check-ins */}

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">

        <h2 className="font-semibold text-slate-800 mb-5">
          Recent check-ins
        </h2>

        {logs.length === 0 ? (
          <p className="text-slate-500">
            No check-ins yet.
          </p>
        ) : (
          logs.slice(0, 5).map((log: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b last:border-0 border-slate-100"
            >
              <div>
                <p className="font-medium text-slate-800">
                  {log.mood || "No mood selected"}
                </p>

                <p className="text-sm text-slate-400">
                  {new Date(log.time).toLocaleDateString()}
                </p>
              </div>

              <span className="text-slate-500">
                {log.craving}/10
              </span>
            </div>
          ))
        )}

      </section>

      {/* Recovery */}

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">

        <h2 className="font-semibold text-slate-800 mb-5">
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

      {/* Closing */}

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">

        <p className="italic text-slate-600 leading-7">
          Progress isn't about being perfect.
          It's about noticing the moments you've already made it through.
        </p>

      </section>

      <BottomNav />

    </main>
  );
}
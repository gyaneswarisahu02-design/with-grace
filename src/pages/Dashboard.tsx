import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import HeroCard from "../components/HeroCard";
import BottomNav from "../components/BottomNav";

import {
  requestNotificationPermission,
  runDailyReminder,
} from "../notifications";

type Log = {
  mood: string;
  craving: number;
  smoked: boolean;
  notes: string;
  time: string;
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [logs, setLogs] = useState<Log[]>([]);
  const [reflection, setReflection] = useState("");
  const [savedReflection, setSavedReflection] = useState("");

  useEffect(() => {
    try {
      const savedLogs = localStorage.getItem("logs");

      if (savedLogs) {
        setLogs(JSON.parse(savedLogs));
      }
    } catch {
      setLogs([]);
    }

    const today = new Date().toDateString();
    const savedReflection = localStorage.getItem("reflection");

    if (savedReflection) {
      const parsed = JSON.parse(savedReflection);

      if (parsed.date === today) {
        setSavedReflection(parsed.text);
      } else {
        localStorage.removeItem("reflection");
      }
    }

    requestNotificationPermission();
    runDailyReminder();
  }, []);

  const saveReflection = () => {
    if (!reflection.trim()) return;

    const data = {
      date: new Date().toDateString(),
      text: reflection,
    };

    localStorage.setItem("reflection", JSON.stringify(data));
    setSavedReflection(reflection);
    setReflection("");
  };

  const lastSmoke = [...logs].reverse().find((log) => log.smoked);

  const startDate = lastSmoke
    ? new Date(lastSmoke.time)
    : logs.length > 0
    ? new Date(logs[logs.length - 1].time)
    : new Date();

  const diff = Date.now() - startDate.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

  let streak = 0;

  if (lastSmoke) {
    const last = new Date(lastSmoke.time);
    last.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    streak = Math.max(
      0,
      Math.floor(
        (today.getTime() - last.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
  } else {
    streak = logs.length;
  }

  const totalLogs = logs.length;

  const averageCraving =
    totalLogs > 0
      ? (
          logs.reduce((sum, log) => sum + (log.craving || 0), 0) /
          totalLogs
        ).toFixed(1)
      : "—";

  const latestMood =
    logs.length > 0 ? logs[0].mood : "No check-in yet";

  const hour = new Date().getHours();

  let greeting = "Welcome back.";

  if (hour < 12) greeting = "Good morning.";
  else if (hour < 17) greeting = "Hope your day's going well.";
  else if (hour < 22) greeting = "Good evening.";
  else greeting = "You're up late.";

  function getHealthUpdate() {
    if (days < 1) {
      return "Carbon monoxide levels are returning to normal.";
    }

    if (days < 2) {
      return "Nicotine has now left your body.";
    }

    if (days < 14) {
      return "Your circulation is beginning to improve.";
    }

    if (days < 90) {
      return "Your lungs are continuing to heal.";
    }

    return "Your body continues to recover every smoke-free day.";
  }

  const thoughts = [
    "One moment at a time.",
    "Progress isn't always visible.",
    "Take today as it comes.",
    "Small steps still count.",
    "Rest is part of progress.",
    "You don't have to rush this.",
    "Every check-in tells part of your story.",
    "One difficult moment doesn't erase your progress.",
    "Showing up is enough today.",
  ];

  const thought =
    thoughts[new Date().getDate() % thoughts.length];

  return (
    <main className="min-h-screen bg-slate-50 max-w-md mx-auto px-6 py-8 pb-32">

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          With Grace
        </h1>

        <p className="text-slate-500 mt-3">
          {greeting}
        </p>
      </header>

      <HeroCard
        days={days}
        hours={hours}
        onCheckIn={() => navigate("/log")}
      />

      <Card title="Current streak">
        <h2 className="text-3xl font-bold text-slate-800">
          {streak} {streak === 1 ? "day" : "days"}
        </h2>
      </Card>

      <Card title="Today's check-in">
        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="text-slate-500">
              Mood
            </span>

            <span className="font-medium text-slate-800">
              {latestMood}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Average craving
            </span>

            <span className="font-medium text-slate-800">
              {averageCraving}/10
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Total check-ins
            </span>

            <span className="font-medium text-slate-800">
              {totalLogs}
            </span>
          </div>

        </div>
      </Card>

      <Card title="Your body today">
        <p className="text-slate-600 leading-7">
          {getHealthUpdate()}
        </p>
      </Card>

      <Card title="A small reminder">
        <p className="italic text-slate-600">
          {thought}
        </p>
      </Card>

      <Card title="A moment for yourself">
        {savedReflection ? (
          <>
            <p className="italic text-slate-700 leading-7">
              "{savedReflection}"
            </p>

            <p className="text-xs text-slate-400 mt-4">
              Saved for today
            </p>
          </>
        ) : (
          <>
            <p className="text-slate-500 mb-4">
              How are you feeling right now?
            </p>

            <textarea
              rows={4}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write a few words..."
              className="w-full rounded-2xl border border-slate-200 p-4 resize-none outline-none"
            />

            <button
              onClick={saveReflection}
              className="mt-4 w-full rounded-full bg-[#315A8B] py-3 text-white font-medium"
            >
              Save reflection
            </button>
          </>
        )}
      </Card>

      <div className="mt-8 space-y-3">

        <button
          onClick={() => navigate("/log")}
          className="w-full rounded-full bg-[#315A8B] py-4 text-white font-medium active:scale-95 transition"
        >
          Check in
        </button>

        <button
          onClick={() => navigate("/pause")}
          className="w-full rounded-full border border-slate-200 bg-white py-4 text-slate-700 active:scale-95 transition"
        >
          Take a minute
        </button>

        <button
          onClick={() => navigate("/insights")}
          className="w-full rounded-full border border-slate-200 bg-white py-4 text-slate-700 active:scale-95 transition"
        >
          View progress
        </button>

      </div>

      <BottomNav />

    </main>
  );
}
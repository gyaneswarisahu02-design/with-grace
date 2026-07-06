import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import HeroCard from "../components/HeroCard";
import BottomNav from "../components/BottomNav";

import {
  requestNotificationPermission,
  runDailyReminder,
} from "../notifications";

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

export default function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [reflection, setReflection] = useState("");
  const [savedReflection, setSavedReflection] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    const savedLogs = localStorage.getItem("logs");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }

    const today = new Date().toDateString();
    const saved = localStorage.getItem("reflection");

    if (saved) {
      const parsed = JSON.parse(saved);

      if (parsed.date === today) {
        setSavedReflection(parsed.text);
      } else {
        localStorage.removeItem("reflection");
      }
    }

    requestNotificationPermission();
    runDailyReminder();
  }, []);

  function saveReflection() {
    if (!reflection.trim()) return;

    const data = {
      date: new Date().toDateString(),
      text: reflection.trim(),
    };

    localStorage.setItem("reflection", JSON.stringify(data));

    setSavedReflection(data.text);
    setReflection("");
  }

  // ONLY use profile.quitDate
  const quitDate = profile
    ? new Date(profile.quitDate)
    : new Date();

  const diff = Date.now() - quitDate.getTime();

  const days = Math.max(
    0,
    Math.floor(diff / (1000 * 60 * 60 * 24))
  );

  const hours = Math.max(
    0,
    Math.floor((diff / (1000 * 60 * 60)) % 24)
  );

  const totalLogs = logs.length;

  const averageCraving =
    totalLogs > 0
      ? (
          logs.reduce((sum, log) => sum + log.craving, 0) /
          totalLogs
        ).toFixed(1)
      : "—";

  const latestMood =
    logs.length > 0 ? logs[0].mood : "No check-in yet";

  const smokeFreeLogs = logs.filter(
    (log) => !log.smoked
  ).length;

  const totalSmokedLogs = logs.filter(
    (log) => log.smoked
  ).length;

  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {
    greeting = profile?.name
      ? `Good morning, ${profile.name}. Take today one moment at a time. 💙`
      : "Good morning. Take today one moment at a time. 💙";
  } else if (hour < 17) {
    greeting = profile?.name
      ? `I'm glad you're here today, ${profile.name}. 💙`
      : "I'm glad you're here today. 💙";
  } else if (hour < 22) {
    greeting = profile?.name
      ? `Good evening, ${profile.name}. Be kind to yourself today. 💙`
      : "Good evening. Be kind to yourself today. 💙";
  } else {
    greeting = profile?.name
      ? `It's been a long day, ${profile.name}. I hope you're taking a moment for yourself. 💙`
      : "It's been a long day. I hope you're taking a moment for yourself. 💙";
  }

  function getHealthUpdate() {
    if (days < 1)
      return "Carbon monoxide levels are returning to normal.";

    if (days < 2)
      return "Nicotine has now left your body.";

    if (days < 14)
      return "Your circulation is beginning to improve.";

    if (days < 90)
      return "Your lungs are continuing to heal.";

    if (days < 365)
      return "Your heart and lungs continue getting stronger every day.";

    return "Your body continues healing with every smoke-free day.";
  }

  const thoughts = [
    "One moment at a time.",
    "Progress isn't always visible.",
    "Small steps still count.",
    "Rest is productive too.",
    "You don't have to be perfect.",
    "One craving resisted is a victory.",
    "Showing up today is enough.",
    "Healing isn't linear.",
    "You are building a different future.",
  ];

  const thought =
    thoughts[new Date().getDate() % thoughts.length];

  return (
    <main className="min-h-screen max-w-md mx-auto bg-slate-50 px-6 py-8 pb-32">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Project Cee
        </h1>

        <p className="mt-3 text-slate-500">
          {greeting}
        </p>
      </header>

      <HeroCard
        profile={profile}
        days={days}
        hours={hours}
        onCheckIn={() => navigate("/log")}
      />

      <Card title="Your progress">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-slate-500">
              Urges resisted
            </span>

            <span className="font-semibold">
              {profile?.urgesResisted ?? 0}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Smoke-free check-ins
            </span>

            <span className="font-semibold">
              {smokeFreeLogs}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Smoked check-ins
            </span>

            <span className="font-semibold">
              {totalSmokedLogs}
            </span>
          </div>
        </div>
      </Card>

      <Card title="Today's check-in">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-slate-500">Mood</span>

            <span className="font-medium">
              {latestMood}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Average craving
            </span>

            <span className="font-medium">
              {averageCraving}/10
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Total check-ins
            </span>

            <span className="font-medium">
              {totalLogs}
            </span>
          </div>
        </div>
      </Card>

      <Card title="Your body today">
        <p className="leading-7 text-slate-600">
          {getHealthUpdate()}
        </p>
      </Card>

      <Card title="A small reminder">
        <p className="italic text-slate-600">
          {thought}
        </p>
      </Card>

      <Card
        title={
          profile?.name
            ? `A moment for yourself, ${profile.name}`
            : "A moment for yourself"
        }
      >
        {savedReflection ? (
          <>
            <p className="italic leading-7 text-slate-700">
              "{savedReflection}"
            </p>

            <p className="mt-4 text-xs text-slate-400">
              Saved for today
            </p>
          </>
        ) : (
          <>
            <p className="mb-4 text-slate-500">
              {profile?.name
                ? `${profile.name}, what's on your mind today? 💙`
                : "What's on your mind today? 💙"}
            </p>

            <textarea
              rows={4}
              value={reflection}
              onChange={(e) =>
                setReflection(e.target.value)
              }
              placeholder="Write a few words..."
              className="w-full resize-none rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#315A8B]"
            />

            <button
              onClick={saveReflection}
              className="mt-4 w-full rounded-full bg-[#315A8B] py-3 font-medium text-white transition active:scale-95"
            >
              Save reflection
            </button>
          </>
        )}
      </Card>

      <div className="mt-8 space-y-3">
        <button
          onClick={() => navigate("/log")}
          className="w-full rounded-full bg-[#315A8B] py-4 font-medium text-white transition active:scale-95"
        >
          Check in
        </button>

        <button
          onClick={() => navigate("/pause")}
          className="w-full rounded-full border border-slate-200 bg-white py-4 text-slate-700 transition active:scale-95"
        >
          Take a minute
        </button>

        <button
          onClick={() => navigate("/insights")}
          className="w-full rounded-full border border-slate-200 bg-white py-4 text-slate-700 transition active:scale-95"
        >
          View progress
        </button>
      </div>

      <BottomNav />
    </main>
  );
}
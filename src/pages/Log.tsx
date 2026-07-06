import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Log() {
  const navigate = useNavigate();

  const [mood, setMood] = useState("");
  const [craving, setCraving] = useState(0);
  const [smoked, setSmoked] = useState<boolean | null>(null);
  const [urges, setUrges] = useState(0);
  const [notes, setNotes] = useState("");

  function saveLog() {
    if (smoked === null) {
      alert("Please let us know whether you smoked.");
      return;
    }

    const logs: Log[] = JSON.parse(localStorage.getItem("logs") || "[]");

    const newLog: Log = {
      mood,
      craving,
      smoked,
      urges,
      notes,
      time: new Date().toISOString(),
    };

    logs.unshift(newLog);
    localStorage.setItem("logs", JSON.stringify(logs));

    const profile: Profile | null = JSON.parse(
      localStorage.getItem("profile") || "null"
    );

    if (profile) {
      profile.urgesResisted += urges;
      localStorage.setItem("profile", JSON.stringify(profile));
    }

    navigate("/");
  }

  const moods = [
    "😊 Calm",
    "🙂 Okay",
    "😕 Stressed",
    "😔 Low",
    "😣 Overwhelmed",
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
        Check in
      </h1>

      <p className="mt-2 mb-10 text-slate-500">
        Take a moment. There's no right or wrong answer.
      </p>

      <section className="mb-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-semibold">
          How are you arriving today?
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {moods.map((item) => (
            <button
              key={item}
              onClick={() => setMood(item)}
              className={`rounded-2xl border p-4 transition ${
                mood === item
                  ? "border-[#315A8B] bg-[#315A8B] text-white"
                  : "border-slate-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="font-semibold">
          How strong is the craving right now?
        </h2>

        <input
          type="range"
          min={0}
          max={10}
          value={craving}
          onChange={(e) => setCraving(Number(e.target.value))}
          className="mt-6 w-full"
        />

        <div className="flex justify-between text-xs text-slate-400">
          <span>0</span>
          <span>10</span>
        </div>

        <p className="mt-4 text-center text-3xl font-bold text-[#315A8B]">
          {craving}/10
        </p>
      </section>

      <section className="mb-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-semibold">
          Did you smoke?
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSmoked(false)}
            className={`rounded-2xl py-4 transition ${
              smoked === false
                ? "bg-green-600 text-white"
                : "bg-slate-100"
            }`}
          >
            No
          </button>

          <button
            onClick={() => setSmoked(true)}
            className={`rounded-2xl py-4 transition ${
              smoked === true
                ? "bg-red-500 text-white"
                : "bg-slate-100"
            }`}
          >
            Yes
          </button>
        </div>
      </section>

      <section className="mb-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold">
          How many urges did you successfully resist today?
        </h2>

        <input
          type="number"
          min={0}
          value={urges}
          onChange={(e) =>
            setUrges(Math.max(0, Number(e.target.value)))
          }
          className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#315A8B]"
        />
      </section>

      <section className="mb-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold">
          Anything you'd like to remember?
        </h2>

        <textarea
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Maybe what happened, how you're feeling, or what's on your mind..."
          className="w-full resize-none rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#315A8B]"
        />
      </section>

      <button
        onClick={saveLog}
        className="w-full rounded-full bg-[#315A8B] py-4 font-medium text-white transition active:scale-95"
      >
        Save check-in
      </button>

      <BottomNav />
    </main>
  );
}
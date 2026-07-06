import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Log() {
  const navigate = useNavigate();

  const [mood, setMood] = useState("");
  const [craving, setCraving] = useState(0);
  const [smoked, setSmoked] = useState<boolean | null>(null);
  const [notes, setNotes] = useState("");

  function saveLog() {
    if (smoked === null) {
      alert("Please let us know whether you smoked.");
      return;
    }

    const previous = JSON.parse(localStorage.getItem("logs") || "[]");

    previous.unshift({
      mood,
      craving,
      smoked,
      notes,
      time: new Date().toISOString(),
    });

    localStorage.setItem("logs", JSON.stringify(previous));

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
    <main className="min-h-screen bg-slate-50 max-w-md mx-auto px-6 py-8 pb-32">

      <button
        onClick={() => navigate("/")}
        className="text-slate-500 mb-8"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-slate-800">
        Check in
      </h1>

      <p className="text-slate-500 mt-2 mb-10">
        Take a moment. There's no right or wrong answer.
      </p>

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">

        <h2 className="font-semibold mb-5">
          How are you arriving today?
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {moods.map((item) => (
            <button
              key={item}
              onClick={() => setMood(item)}
              className={`rounded-2xl border p-4 ${
                mood === item
                  ? "bg-[#315A8B] text-white border-[#315A8B]"
                  : "border-slate-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

      </section>

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">

        <h2 className="font-semibold">
          How strong is the craving right now?
        </h2>

        <input
          type="range"
          min="0"
          max="10"
          value={craving}
          onChange={(e) => setCraving(Number(e.target.value))}
          className="w-full mt-6"
        />

        <div className="flex justify-between text-xs text-slate-400">
          <span>0</span>
          <span>10</span>
        </div>

        <p className="text-center text-3xl font-bold mt-4 text-[#315A8B]">
          {craving}/10
        </p>

      </section>

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">

        <h2 className="font-semibold mb-5">
          Did you smoke?
        </h2>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => setSmoked(false)}
            className={`rounded-2xl py-4 ${
              smoked === false
                ? "bg-green-600 text-white"
                : "bg-slate-100"
            }`}
          >
            No
          </button>

          <button
            onClick={() => setSmoked(true)}
            className={`rounded-2xl py-4 ${
              smoked === true
                ? "bg-red-500 text-white"
                : "bg-slate-100"
            }`}
          >
            Yes
          </button>

        </div>

      </section>

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-8">

        <h2 className="font-semibold mb-4">
          Anything you'd like to remember?
        </h2>

        <textarea
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Maybe what happened, how you're feeling, or what's on your mind..."
          className="w-full rounded-2xl border border-slate-200 p-4 resize-none outline-none"
        />

      </section>

      <button
        onClick={saveLog}
        className="w-full rounded-full bg-[#315A8B] py-4 text-white font-medium"
      >
        Save check-in
      </button>

      <BottomNav />

    </main>
  );
}
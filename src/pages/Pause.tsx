import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Pause() {
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const messages = [
    "You don't have to solve everything right now.",
    "One minute is enough for now.",
    "This feeling will pass.",
    "Notice the craving without judging it.",
    "You're doing better than you think.",
  ];

  const message =
    messages[new Date().getDate() % messages.length];

  const breathing =
    seconds % 8 < 4 ? "Breathe in..." : "Breathe out...";

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-8 pb-28">

      <h1 className="text-4xl font-bold text-slate-800">
        Take a minute
      </h1>

      <p className="text-center text-slate-500 mt-4 leading-7 max-w-sm">
        {message}
      </p>

      <div
        className={`mt-14 w-44 h-44 rounded-full bg-[#315A8B] transition-all duration-[4000]
        ${
          seconds % 8 < 4
            ? "scale-110 opacity-90"
            : "scale-90 opacity-60"
        }`}
      />

      <p className="mt-10 text-xl font-medium text-slate-700">
        {breathing}
      </p>

      <p className="text-slate-400 mt-2">
        {seconds} seconds remaining
      </p>

      {seconds === 0 && (
        <button
          onClick={() => navigate("/")}
          className="mt-10 rounded-full bg-[#315A8B] px-8 py-3 text-white"
        >
          Return home
        </button>
      )}

      <BottomNav />

    </main>
  );
}
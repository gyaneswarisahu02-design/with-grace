import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );

  const [name, setName] = useState(
    localStorage.getItem("name") || ""
  );

  function saveName() {
    if (!name.trim()) return;

    localStorage.setItem("name", name.trim());

    alert("Your name has been updated. 💙");
  }

  function toggleNotifications() {
    const value = !notifications;

    setNotifications(value);

    localStorage.setItem(
      "notifications",
      value.toString()
    );
  }

  function clearReflection() {
    localStorage.removeItem("reflection");

    alert("Today's reflection has been cleared.");
  }

  function clearLogs() {
    const confirmed = window.confirm(
      "Are you sure? This will permanently delete every check-in."
    );

    if (!confirmed) return;

    localStorage.removeItem("logs");

    alert("Your check-ins have been deleted.");

    navigate("/");
  }

  function resetApp() {
    const confirmed = window.confirm(
      "Reset Project Cee? This will remove your name, reflections and all check-ins."
    );

    if (!confirmed) return;

    localStorage.clear();

    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-slate-50 max-w-md mx-auto px-6 py-8 pb-32">

      <h1 className="text-4xl font-bold text-slate-800">
        Settings
      </h1>

      <p className="text-slate-500 mt-2 mb-10">
        Make Project Cee feel like yours.
      </p>

      <section className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-5">

        <h2 className="font-medium mb-4">
          Your name
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#315A8B]"
        />

        <button
          onClick={saveName}
          className="mt-4 w-full rounded-full bg-[#315A8B] py-3 text-white font-medium"
        >
          Save name
        </button>

      </section>

      <section className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-5">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="font-medium">
              Daily reminders
            </h2>

            <p className="text-sm text-slate-500">
              Receive a reminder each evening.
            </p>
          </div>

          <button
            onClick={toggleNotifications}
            className={`px-4 py-2 rounded-full ${
              notifications
                ? "bg-[#315A8B] text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {notifications ? "On" : "Off"}
          </button>

        </div>

      </section>

      <section className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-5">

        <button
          onClick={clearReflection}
          className="w-full text-left"
        >
          <h2 className="font-medium">
            Clear today's reflection
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Remove today's journal entry.
          </p>
        </button>

      </section>

      <section className="bg-white rounded-3xl border border-red-200 p-6 shadow-sm mb-5">

        <button
          onClick={clearLogs}
          className="w-full text-left"
        >
          <h2 className="font-medium text-red-600">
            Clear all check-ins
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            This cannot be undone.
          </p>
        </button>

      </section>

      <section className="bg-white rounded-3xl border border-red-200 p-6 shadow-sm">

        <button
          onClick={resetApp}
          className="w-full text-left"
        >
          <h2 className="font-medium text-red-600">
            Reset Project Cee
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Start over from the beginning.
          </p>
        </button>

      </section>

      <div className="mt-10 text-center text-sm text-slate-400">
        Project Cee 💙
        <br />
        Version 1.0
      </div>

      <BottomNav />

    </main>
  );
}
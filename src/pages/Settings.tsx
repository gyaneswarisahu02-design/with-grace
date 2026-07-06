import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );

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

  return (
    <main className="min-h-screen bg-slate-50 max-w-md mx-auto px-6 py-8 pb-32">

      <h1 className="text-4xl font-bold text-slate-800">
        Settings
      </h1>

      <p className="text-slate-500 mt-2 mb-10">
        A few things you can change.
      </p>

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

      <section className="bg-white rounded-3xl border border-red-200 p-6 shadow-sm">

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

      <div className="mt-10 text-center text-sm text-slate-400">
        With Grace
        <br />
        Version 1.0
      </div>

      <BottomNav />

    </main>
  );
}
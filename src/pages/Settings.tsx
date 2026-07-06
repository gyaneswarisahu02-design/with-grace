import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

type Profile = {
  name: string;
  quitDate: string;
  urgesResisted: number;
  createdAt: string;
};

export default function Settings() {
  const navigate = useNavigate();

  const savedProfile: Profile | null = JSON.parse(
    localStorage.getItem("profile") || "null"
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );

  const [name, setName] = useState(savedProfile?.name ?? "");

  const [quitDate, setQuitDate] = useState(
    savedProfile?.quitDate
      ? new Date(savedProfile.quitDate)
          .toISOString()
          .split("T")[0]
      : ""
  );

  function saveProfile() {
    if (!savedProfile) return;

    if (!name.trim() || !quitDate) {
      alert("Please complete all fields.");
      return;
    }

    const updatedProfile: Profile = {
      ...savedProfile,
      name: name.trim(),
      quitDate: new Date(quitDate).toISOString(),
    };

    localStorage.setItem(
      "profile",
      JSON.stringify(updatedProfile)
    );

    alert("Profile updated. 💙");
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
      "Delete every check-in? This cannot be undone."
    );

    if (!confirmed) return;

    localStorage.setItem("logs", JSON.stringify([]));

    alert("All check-ins have been deleted.");

    navigate("/");
  }

  function resetApp() {
    const confirmed = window.confirm(
      "Reset Project Cee? This will remove your profile, reflections and every check-in."
    );

    if (!confirmed) return;

    localStorage.clear();

    window.location.href = "/";
  }

  return (
    <main className="min-h-screen max-w-md mx-auto bg-slate-50 px-6 py-8 pb-32">
      <h1 className="text-4xl font-bold text-slate-800">
        Settings
      </h1>

      <p className="mt-2 mb-10 text-slate-500">
        Make Project Cee feel like yours.
      </p>

      <section className="mb-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-medium">
          Your profile
        </h2>

        <label className="mb-2 block text-sm text-slate-500">
          Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="mb-5 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#315A8B]"
        />

        <label className="mb-2 block text-sm text-slate-500">
          Quit date
        </label>

        <input
          type="date"
          value={quitDate}
          onChange={(e) => setQuitDate(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#315A8B]"
        />

        <button
          onClick={saveProfile}
          className="mt-5 w-full rounded-full bg-[#315A8B] py-3 font-medium text-white"
        >
          Save profile
        </button>
      </section>

      <section className="mb-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
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
            className={`rounded-full px-4 py-2 ${
              notifications
                ? "bg-[#315A8B] text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {notifications ? "On" : "Off"}
          </button>
        </div>
      </section>

      <section className="mb-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <button
          onClick={clearReflection}
          className="w-full text-left"
        >
          <h2 className="font-medium">
            Clear today's reflection
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Remove today's journal entry.
          </p>
        </button>
      </section>

      <section className="mb-5 rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
        <button
          onClick={clearLogs}
          className="w-full text-left"
        >
          <h2 className="font-medium text-red-600">
            Clear all check-ins
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your profile and quit date will be kept.
          </p>
        </button>
      </section>

      <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
        <button
          onClick={resetApp}
          className="w-full text-left"
        >
          <h2 className="font-medium text-red-600">
            Reset Project Cee
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Completely start over.
          </p>
        </button>
      </section>

      <div className="mt-10 text-center text-sm text-slate-400">
        Project Cee 💙
        <br />
        Version 2.0
      </div>

      <BottomNav />
    </main>
  );
}
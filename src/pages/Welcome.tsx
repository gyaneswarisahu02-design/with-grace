import { useState } from "react";

type Profile = {
  name: string;
  quitDate: string;
  urgesResisted: number;
  createdAt: string;
};

export default function Welcome() {
  const [name, setName] = useState("");
  const [quitDate, setQuitDate] = useState("");

  function continueApp() {
    if (!name.trim() || !quitDate) return;

    const now = new Date().toISOString();

    const profile: Profile = {
      name: name.trim(),
      quitDate: new Date(quitDate).toISOString(),
      urgesResisted: 0,
      createdAt: now,
    };

    localStorage.setItem("profile", JSON.stringify(profile));

    if (!localStorage.getItem("logs")) {
      localStorage.setItem("logs", JSON.stringify([]));
    }

    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="mb-3 text-4xl font-bold text-slate-800">
          Project Cee 💙
        </h1>

        <p className="mb-10 leading-7 text-slate-500">
          Welcome.
          <br />
          I'm glad you're here.
          <br />
          <br />
          What should I call you, and when did you quit smoking?
        </p>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Your name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-[#315A8B]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Quit date
            </label>

            <input
              type="date"
              value={quitDate}
              onChange={(e) => setQuitDate(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none transition focus:border-[#315A8B]"
            />
          </div>
        </div>

        <button
          onClick={continueApp}
          disabled={!name.trim() || !quitDate}
          className="mt-8 w-full rounded-full bg-[#315A8B] py-4 font-medium text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
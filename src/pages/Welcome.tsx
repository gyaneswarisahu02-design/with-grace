import { useState } from "react";

export default function Welcome() {
  const [name, setName] = useState("");

  function continueApp() {
    if (!name.trim()) return;

    localStorage.setItem("name", name.trim());

    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Project Cee 💙
        </h1>

        <p className="text-slate-500 leading-7 mb-10">
          Welcome.
          <br />
          I'm glad you're here.
          <br />
          <br />
          What should I call you?
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#315A8B]"
        />

        <button
          onClick={continueApp}
          className="mt-6 w-full rounded-full bg-[#315A8B] py-4 text-white font-medium transition active:scale-95"
        >
          Continue
        </button>

      </div>

    </main>
  );
}
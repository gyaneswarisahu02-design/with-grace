type Profile = {
  name: string;
  quitDate: string;
  urgesResisted: number;
  createdAt: string;
};

type HeroCardProps = {
  profile: Profile | null;
  days: number;
  hours: number;
  onCheckIn: () => void;
};

const messages = [
  "One day at a time.",
  "Every hour matters.",
  "Keep going gently.",
  "Today's enough.",
  "You're showing up.",
  "Small steps still count.",
  "Recovery is built one choice at a time.",
  "You're stronger than this moment.",
];

export default function HeroCard({
  profile,
  days,
  hours,
  onCheckIn,
}: HeroCardProps) {
  const message =
    messages[new Date().getDate() % messages.length];

  return (
    <section className="mb-6 rounded-[32px] bg-[#315A8B] p-8 text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-white/70">
        {profile?.name
          ? `${profile.name}'s smoke-free journey`
          : "Smoke-free journey"}
      </p>

      <div className="mt-6">
        <div className="flex items-end gap-2">
          <span className="text-6xl font-bold">
            {days}
          </span>

          <span className="mb-2 text-white/70">
            {days === 1 ? "day" : "days"}
          </span>
        </div>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-semibold">
            {hours}
          </span>

          <span className="text-white/70">
            {hours === 1 ? "hour" : "hours"}
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-2 rounded-2xl bg-white/10 p-4">
        <div className="flex justify-between">
          <span className="text-white/70">
            Urges resisted
          </span>

          <span className="font-semibold">
            {profile?.urgesResisted ?? 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-white/70">
            Quit date
          </span>

          <span className="font-semibold">
            {profile
              ? new Date(
                  profile.quitDate
                ).toLocaleDateString()
              : "—"}
          </span>
        </div>
      </div>

      <p className="mt-8 text-white/80">
        {message}
      </p>

      <button
        onClick={onCheckIn}
        className="mt-8 w-full rounded-full bg-white py-4 font-semibold text-[#315A8B] transition active:scale-95"
      >
        Check in
      </button>
    </section>
  );
}
type HeroCardProps = {
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
];

export default function HeroCard({
  days,
  hours,
  onCheckIn,
}: HeroCardProps) {
  const message =
    messages[new Date().getDate() % messages.length];

  return (
    <section className="rounded-[32px] bg-[#315A8B] p-8 text-white mb-6">

      <p className="text-white/70 uppercase tracking-[0.2em] text-xs">
        Smoke-free for
      </p>

      <div className="mt-6">

        <div className="flex items-end gap-2">

          <span className="text-6xl font-bold">
            {days}
          </span>

          <span className="text-white/70 mb-2">
            days
          </span>

        </div>

        <div className="flex items-end gap-2 mt-2">

          <span className="text-3xl font-semibold">
            {hours}
          </span>

          <span className="text-white/70">
            hours
          </span>

        </div>

      </div>

      <p className="text-white/80 mt-8">
        {message}
      </p>

      <button
        onClick={onCheckIn}
        className="mt-8 w-full rounded-full bg-white py-4 text-[#315A8B] font-semibold"
      >
        Check in
      </button>

    </section>
  );
}
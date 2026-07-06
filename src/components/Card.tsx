type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <section className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-5">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
        {title}
      </p>

      {children}
    </section>
  );
}
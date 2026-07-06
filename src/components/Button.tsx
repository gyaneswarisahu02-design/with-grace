type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-full bg-[#315A8B] py-4 text-white font-medium text-lg active:scale-95 transition"
    >
      {children}
    </button>
  );
}
type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
};

export function Button({
  children,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-full bg-[#d42367] px-6 py-3 font-medium text-white transition-colors hover:bg-[#b91d58] ${className}`}
    >
      {children}
    </button>
  );
}
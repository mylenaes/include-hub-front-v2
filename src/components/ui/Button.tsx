interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        w-1/2
        self-center
        py-2
        px-4
        bg-[#2A2E42]
        text-white
        font-semibold
        rounded-lg
        transition
        hover:bg-orange-700
        active:scale-[0.98]
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {children}
    </button>
  );
};

export default Button;
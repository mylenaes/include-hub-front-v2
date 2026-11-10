interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variante?: "padrao" | "login";
}

const estilos = {
  padrao: `
    w-1/2 self-center py-2 px-4 bg-[#2A2E42] text-white font-semibold
    rounded-lg transition hover:bg-orange-700 active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  login: `
    mt-6 w-2/3 self-center rounded-2xl bg-[#282D43] py-4 text-xl
    font-semibold text-[#F2EBB5] transition hover:bg-[#33385A]
    active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed
  `,
};

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variante = "padrao",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={estilos[variante]}
    >
      {children}
    </button>
  );
};
export default Button;
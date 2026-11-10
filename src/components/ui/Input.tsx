import { useId } from "react";

interface InputProps {
  label?: string;
  erro?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  variante?: "padrao" | "login";
}

const estilos = {
  padrao: (erro?: string) => `
    w-full px-4 py-2 bg-[#2A2E42] border
    ${erro ? "border-red-500" : "border-gray-300"}
    rounded-lg outline-none transition text-white placeholder-gray-400
    focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50
  `,
  login: () => `
    w-full rounded-2xl bg-[#282D43] px-6 py-4 text-lg font-medium text-white
    placeholder:text-[#656877] outline-none transition
    focus:ring-2 focus:ring-[#A5AED8] disabled:opacity-50
  `,
};

const Input = ({
  label,
  erro,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  autoComplete,
  required = false,
  disabled,
  min,
  max,
  step,
  variante = "padrao",
}: InputProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={id} className="text-sm text-[#A5AED8]">
          {label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={estilos[variante](erro)}
      />

      {erro && <span className="text-xs text-red-500">{erro}</span>}
    </div>
  );
};
export default Input;
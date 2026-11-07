import { useId } from "react";

interface Opcao {
  valor: string;
  texto: string;
}

interface SelectProps {
  label?: string;
  erro?: string;
  placeholder?: string;
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  opcoes: Opcao[];
  required?: boolean;
  disabled?: boolean;
}

const Select = ({
  label,
  erro,
  placeholder = "Selecione",
  name,
  value,
  onChange,
  opcoes,
  required = false,
  disabled,
}: SelectProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={id} className="text-sm text-[#A5AED8]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`
            w-full
            appearance-none
            px-4
            py-2
            pr-10
            bg-[#2A2E42]
            border
            ${erro ? "border-red-500" : "border-gray-300"}
            rounded-lg
            outline-none
            transition
            text-white
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            disabled:opacity-50
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {opcoes.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.texto}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {erro && <span className="text-xs text-red-500">{erro}</span>}
    </div>
  );
};
export default Select;
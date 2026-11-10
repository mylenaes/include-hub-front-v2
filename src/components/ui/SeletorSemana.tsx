import { formatarSemana } from "../../utils/formatadores";

interface SeletorSemanaProps {
  semana: string; 
  onAnterior: () => void;
  onProxima: () => void;
  onHoje: () => void;
}

const SeletorSemana = ({ semana, onAnterior, onProxima, onHoje }: SeletorSemanaProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-lg border border-[#A5AED8]/30 bg-[#2A2E42] px-2 py-1.5 text-white">
        <button
          type="button"
          onClick={onAnterior}
          aria-label="Semana anterior"
          className="px-2 text-[#A5AED8] transition hover:text-white"
        >
          &lt;
        </button>
        <span className="px-3 text-sm font-medium">{formatarSemana(semana)}</span>
        <button
          type="button"
          onClick={onProxima}
          aria-label="Próxima semana"
          className="px-2 text-[#A5AED8] transition hover:text-white"
        >
          &gt;
        </button>
      </div>
      <button
        type="button"
        onClick={onHoje}
        className="rounded-lg border border-[#A5AED8]/30 bg-[#2A2E42] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-[#33385A]"
      >
        Esta semana
      </button>
    </div>
  );
};

export default SeletorSemana;
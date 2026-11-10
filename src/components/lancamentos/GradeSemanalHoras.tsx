import { formatarHoras } from "../../utils/formatadores";

export interface ValorLinha {
  horas: string;
  descricao: string;
}
export type ValoresGrade = Record<number, ValorLinha>;

interface Linha {
  id: number;
  nome: string;
  horasPrevistasSemana: number | null;
}

interface GradeSemanalHorasProps {
  linhas: Linha[];
  valores: ValoresGrade;
  disabled: boolean;
  onChange: (projetoId: number, campo: keyof ValorLinha, valor: string) => void;
}

const campo =
  "w-full rounded-md bg-[#909AD1] px-3 py-2 font-medium text-[#1E2132] outline-none placeholder:text-[#1E2132]/40 focus:ring-2 focus:ring-white disabled:opacity-50";

const GradeSemanalHoras = ({ linhas, valores, disabled, onChange }: GradeSemanalHorasProps) => {

  const total = linhas.reduce((soma, l) => soma + (Number(valores[l.id]?.horas) || 0), 0);

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#A5AED8]/50 bg-[#2A2E42] px-6 py-4">
      <table className="w-full min-w-[560px] text-left">
        <thead>
          <tr className="border-b border-white/20 text-lg text-[#A5AED8]">
            <th className="py-4 pr-4 font-semibold">Projeto ou atividade</th>
            <th className="py-4 pr-4 font-semibold">Previstas</th>
            <th className="py-4 pr-4 font-semibold">Horas</th>
            <th className="py-4 font-semibold">Descrição (opcional)</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map((l) => (
            <tr key={l.id} className="border-b border-white/20 text-white">
              <td className="py-4 pr-4">{l.nome}</td>
              <td className="py-4 pr-4 text-[#A5AED8]">
                {l.horasPrevistasSemana === null ? "—" : formatarHoras(l.horasPrevistasSemana)}
              </td>
              <td className="py-4 pr-4">
                <input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.5}
                  value={valores[l.id]?.horas ?? ""}
                  placeholder="0"
                  disabled={disabled}
                  aria-label={`Horas em ${l.nome}`}
                  onChange={(e) => onChange(l.id, "horas", e.target.value)}
                  className={`${campo} w-24 text-center`}
                />
              </td>
              <td className="py-4">
                <input
                  type="text"
                  maxLength={200}
                  value={valores[l.id]?.descricao ?? ""}
                  placeholder="O que foi feito"
                  disabled={disabled}
                  aria-label={`Descrição em ${l.nome}`}
                  onChange={(e) => onChange(l.id, "descricao", e.target.value)}
                  className={campo}
                />
              </td>
            </tr>
          ))}
          <tr className="text-white">
            <td className="py-4 pr-4 font-semibold">Total da semana</td>
            <td />
            <td className="py-4 pr-4 font-bold">{formatarHoras(total)}</td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default GradeSemanalHoras;
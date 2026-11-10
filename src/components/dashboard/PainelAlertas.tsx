import type { Alerta } from "../../types/dashboard";

interface PainelAlertasProps {
  titulo: string;
  alertas: Alerta[];
}

const estilos: Record<Alerta["severidade"], string> = {
  VERMELHO: "border-l-red-600 text-red-300",
  AMARELO: "border-l-yellow-500 text-yellow-300",
};

export default function PainelAlertas({ titulo, alertas }: PainelAlertasProps) {
  return (
    <div className="w-full rounded-2xl border border-[#A5AED8]/50 bg-[#2A2E42] p-6">
      <h2 className="mb-4 text-2xl font-semibold text-white">{titulo}</h2>

      {alertas.length === 0 ? (
        <p className="text-sm text-[#A5AED8]">Nada exige atenção</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {alertas.map((alerta, i) => (
            <li
              key={i}
              className={`rounded-md border-l-4 bg-[#1E2132] px-4 py-3 text-sm ${estilos[alerta.severidade]}`}
            >
              {alerta.mensagem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
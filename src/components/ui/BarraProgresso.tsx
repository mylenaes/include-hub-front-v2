import type { CorRotulo } from "../../types/rotulos";
const cores: Record<CorRotulo | "neutro", string> = {
  green: "bg-[#3ddc84]",
  orange: "bg-[#ecc13a]",
  cyan: "bg-[#22d3ee]",
  red: "bg-[#e0161c]",
  neutro: "bg-[#8b93d6]",
};

interface BarraProgressoProps {
  percentual: number;
  cor?: CorRotulo;
  rotulo?: string;
}

const BarraProgresso = ({ percentual, cor, rotulo }: BarraProgressoProps) => {
  const largura = Math.min(100, Math.max(0, percentual));
  return (
    <div className="w-full min-w-[140px]">
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(largura)}
        aria-label={rotulo}
        className="h-3 w-full overflow-hidden rounded-full bg-[#4a4f6a]"
      >
        <div
          className={`h-full rounded-full ${cores[cor ?? "neutro"]}`}
          style={{ width: `${largura}%` }}
        />
      </div>
      {rotulo && <p className="mt-1 text-xs text-[#A5AED8]">{rotulo}</p>}
    </div>
  );
};
export default BarraProgresso;
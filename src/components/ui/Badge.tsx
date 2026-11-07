import type { CorRotulo } from "../../utils/formatadores";

const estilos: Record<CorRotulo, { caixa: string; ponto: string }> = {
  green: { caixa: "bg-[#12301f] text-[#4ade80]", ponto: "bg-[#4ade80]" },
  orange: { caixa: "bg-[#3d3012] text-[#f5c518]", ponto: "bg-[#f5c518]" },
  cyan: { caixa: "bg-[#0f2f3a] text-[#22d3ee]", ponto: "bg-[#22d3ee]" },
  red: { caixa: "bg-[#3d1620] text-[#ff6b6b]", ponto: "bg-[#ff6b6b]" },
};

interface BadgeProps {
  texto: string;
  cor: CorRotulo;
}

const Badge = ({ texto, cor }: BadgeProps) => {
  const e = estilos[cor];
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${e.caixa}`}>
      <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${e.ponto}`} />
      {texto}
    </span>
  );
};
export default Badge;
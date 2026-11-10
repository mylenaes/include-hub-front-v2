import { useEffect, useState } from "react";
import Card from "../ui/Card";
import PainelAlertas from "./PainelAlertas";
import { dashboardService } from "../../services/dashboardService";
import { HttpError } from "../../services/http";
import type { DashboardAdmin as DashboardAdminDados } from "../../types/dashboard";
import { formatarHoras, formatarPercentual, infoRotulo } from "../../utils/formatadores";

export type VarianteDashboard = "admin" | "gerente";

const textos = {
  admin: {
    titulo: "Dashboard Admin",
    cardProjetos: "Projetos ativos",
    distribuicao: "Distribuição dos projetos",
    ocupacao: "Ocupação da equipe",
  },
  gerente: {
    titulo: "Dashboard Gerente",
    cardProjetos: "Projetos alocados",
    distribuicao: "Distribuição dos meus projetos",
    ocupacao: "Ocupação da minha equipe",
  },
} as const;

const corBarra = {
  green: "bg-green-500",
  orange: "bg-orange-600",
  cyan: "bg-cyan-500",
  red: "bg-red-600",
} as const;

function Barra({ percentual, cor }: { percentual: number; cor: keyof typeof corBarra }) {
  const largura = Math.min(100, Math.max(0, percentual));
  return (
    <div className="h-4 w-full overflow-hidden rounded-full bg-[#484F6B]">
      <div className={`h-full rounded-full ${corBarra[cor]}`} style={{ width: `${largura}%` }} />
    </div>
  );
}

export default function DashboardAdmin({ variante = "admin" }: { variante?: VarianteDashboard }) {
  const t = textos[variante];
  const [dados, setDados] = useState<DashboardAdminDados | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        const resposta = await dashboardService.buscarAdmin();
        if (ativo) setDados(resposta);
      } catch (error) {
        if (ativo) {
          setErro(
            error instanceof HttpError
              ? error.message
              : "Não foi possível carregar os dados do Dashboard.",
          );
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarDados();
    return () => {
      ativo = false;
    };
  }, []);

  if (carregando) return <div className="p-6 text-white">Carregando Dashboard...</div>;
  if (erro) return <div className="p-6 text-red-400">{erro}</div>;
  if (!dados) return <div className="p-6 text-white">Nenhum dado disponível.</div>;

  const totalProjetos = dados.projetosPorStatus.reduce((s, p) => s + p.quantidade, 0);

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-4xl font-bold text-white">{t.titulo}</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="w-full [&>div]:w-full">
          <Card title={t.cardProjetos} value={dados.projetosAtivos} color="green" />
        </div>
        <div className="w-full [&>div]:w-full">
          <Card title="Colaboradores" value={dados.colaboradores} color="orange" />
        </div>
        <div className="w-full [&>div]:w-full">
          <Card title="Horas registradas" value={formatarHoras(dados.horasRegistradas)} color="cyan" />
        </div>
        <div className="w-full [&>div]:w-full">
          <Card title="Projetos em risco" value={dados.projetosEmRisco} color="red" />
        </div>
      </div>

      <div className="w-full rounded-2xl border border-[#A5AED8]/50 bg-[#2A2E42] p-6">
        <h2 className="mb-4 text-2xl font-semibold text-white">{t.distribuicao}</h2>
        <div className="flex flex-col gap-4">
          {dados.projetosPorStatus.map((p) => {
            const info = infoRotulo(p.status);
            const percentual = totalProjetos > 0 ? (p.quantidade / totalProjetos) * 100 : 0;
            return (
              <div
                key={p.status}
                className="grid grid-cols-[7rem_1fr_2rem] items-center gap-4 text-white sm:grid-cols-[10rem_1fr_3rem]"
              >
                <span className="text-lg">{info.texto}</span>
                <Barra percentual={percentual} cor={info.cor} />
                <span className="text-right text-lg">{p.quantidade}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PainelAlertas titulo="Precisam de atenção" alertas={dados.alertas} />

        <div className="rounded-2xl border border-[#A5AED8]/50 bg-[#2A2E42] p-6">
          <h2 className="mb-4 text-2xl font-semibold text-white">{t.ocupacao}</h2>
          {dados.ocupacaoEquipe.length === 0 ? (
            <p className="text-sm text-[#A5AED8]">Nenhuma pessoa na equipe.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {dados.ocupacaoEquipe.map((p) => {
                const info = infoRotulo(p.ocupacaoRealizada.rotulo);
                return (
                  <div
                    key={p.id}
                    className="grid grid-cols-[6rem_1fr_3rem] items-center gap-3 text-white"
                  >
                    <span className="truncate">{p.nome}</span>
                    <Barra percentual={p.ocupacaoRealizada.percentual} cor={info.cor} />
                    <span className="text-right">
                      {formatarPercentual(p.ocupacaoRealizada.percentual)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
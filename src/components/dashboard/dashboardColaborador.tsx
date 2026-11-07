
//import { useEffect, useState } from "react";
import Card from "../ui/Card";
import BarraProgresso from "../ui/BarraProgresso";
//import { dashboardService } from "../../services/dashboardService";
//import { HttpError } from "../../services/http";
import type { DashboardColaborador as DashboardColaboradorDados } from "../../types/dashboard";

import {
  formatarHoras,
  formatarPercentual,
} from "../../utils/formatadores";

// Dados fictícios para desenvolvimento
const dadosFicticios: DashboardColaboradorDados = {
  projetosAtivos: 3,
  horasRegistradas: 120,
  percentualOcupacao: 110,
};

export default function DashboardColaborador() {
  const dados = dadosFicticios;

  /*
  // Integração com API - ativar quando o backend estiver disponível

  const [dados, setDados] = useState<DashboardColaboradorDados | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        const resposta = await dashboardService.buscarDados();

        if (ativo) {
          setDados(resposta);
        }
      } catch (error) {
        if (ativo) {
          if (error instanceof HttpError) {
            setErro(error.message);
          } else {
            setErro("Não foi possível carregar os dados do Dashboard.");
          }
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, []);

  if (carregando) {
    return (
      <div className="p-6 text-white">
        Carregando Dashboard...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-6 text-red-400">
        {erro}
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="p-6 text-white">
        Nenhum dado disponível.
      </div>
    );
  }
  */

  const disponibilidadeRestante = Math.max(
    0,
    100 - dados.percentualOcupacao
  );

  return (
    <div className="w-full min-h-screen bg-[#111827] p-6 flex flex-col gap-6">

      <h1 className="text-3xl font-bold text-white mb-6">
        Dashboard Colaborador
      </h1>

      {/* Cartões de informações */}
      <div className="grid grid-cols-2 gap-4">

        <div className="w-full [&>div]:w-full">
          <Card
            title="Projetos ativos"
            value={dados.projetosAtivos}
            color="green"
          />
        </div>

        <div className="w-full [&>div]:w-full">
          <Card
            title="Horas registradas"
            value={formatarHoras(dados.horasRegistradas)}
            color="orange"
          />
        </div>

      </div>

      {/* Ocupação semanal */}
      <div className="w-full bg-[#2A2E42] border border-[#3A4059] rounded-lg p-5">

        <h2 className="text-lg font-semibold text-white mb-4">
          Ocupação semanal
        </h2>

        <BarraProgresso
          percentual={dados.percentualOcupacao}
          cor="red"
          rotulo={`${formatarPercentual(dados.percentualOcupacao)} de ocupação semanal`}
        />

        <p className="text-sm text-[#A5AED8] mt-3">
          Disponibilidade restante: {formatarPercentual(disponibilidadeRestante)}
        </p>

        {dados.percentualOcupacao > 100 && (
          <p className="text-sm text-red-400 mt-3">
            Você está acima de 100% de ocupação. Fale com seu gerente.
          </p>
        )}

      </div>

    </div>
  );
}

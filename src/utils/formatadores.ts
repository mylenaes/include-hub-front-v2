import type { Papel } from "../types/auth";
import type { TipoProjeto } from "../types/projeto";
import type { Rotulo, CorRotulo } from "../types/rotulos";

const nomesPapel: Record<Papel, string> = {
  ADMIN: "Admin",
  GERENTE: "Gerente",
  COLABORADOR: "Colaborador",
};

const nomesTipo: Record<TipoProjeto, string> = {
  CLIENTE: "Cliente",
  INTERNO: "Interno",
};

export const formatarPapel = (papel: Papel) => nomesPapel[papel];
export const formatarTipo = (tipo: TipoProjeto) => nomesTipo[tipo];

export const formatarHoras = (horas: number) =>
  `${horas.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}h`;

export const formatarPercentual = (valor: number) => `${Math.round(valor)}%`;

export const formatarData = (data: string | null | undefined) => {
  if (!data) return "—";
  const [ano, mes, dia] = data.slice(0, 10).split("-");
  return `${dia}/${mes}/${ano}`;
};

export const formatarDataHora = (instante: string) =>
  new Date(instante).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

const rotulos: Record<Rotulo, { texto: string; cor: CorRotulo }> = {
  SOBRECARREGADO: { texto: "Sobrecarregado", cor: "red" },
  NORMAL: { texto: "Normal", cor: "cyan" },
  DISPONIVEL: { texto: "Disponível", cor: "green" }, 

  NO_PRAZO: { texto: "No prazo", cor: "green" },
  EM_RISCO: { texto: "Em risco", cor: "orange" },
  ATRASADO: { texto: "Atrasado", cor: "red" },

  OK: { texto: "OK", cor: "green" },
  ATENCAO: { texto: "Atenção", cor: "orange" },
  ESTOURADO: { texto: "Estourado", cor: "red" },

  ENVIADO: { texto: 'Enviado', cor: 'green' },
  PENDENTE: { texto: 'Pendente', cor: 'orange' },
};

export const infoRotulo = (rotulo: Rotulo) => rotulos[rotulo];

export const formatarIntervaloSemana = (segunda: string) => {
  const [ano, mes, dia] = segunda.split("-").map(Number);
  const ini = new Date(Date.UTC(ano, mes - 1, dia));
  const fim = new Date(ini.getTime() + 6 * 86400000);
  const fmt = (d: Date) =>
    `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  return `${fmt(ini)} – ${fmt(fim)}`;
  
};

const mesesCurtos = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

export const formatarSemana = (segunda: string) => {
  const [ano, mes, dia] = segunda.slice(0, 10).split('-').map(Number)
  const ini = new Date(Date.UTC(ano, mes - 1, dia))
  const fim = new Date(ini.getTime() + 6 * 86_400_000)
  const d = (x: Date) => String(x.getUTCDate()).padStart(2, '0')
  const m = (x: Date) => mesesCurtos[x.getUTCMonth()]

  return m(ini) === m(fim)
    ? `${d(ini)} a ${d(fim)} de ${m(fim)} de ${fim.getUTCFullYear()}`
    : `${d(ini)} de ${m(ini)} a ${d(fim)} de ${m(fim)} de ${fim.getUTCFullYear()}`
}
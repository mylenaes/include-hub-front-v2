import { api } from './http'
import type { ConsultaHoras, LancamentoSemana, SalvarSemana } from '../types/lancamento'

export const lancamentosService = {
  obterSemana: (semana: string) =>
    api.get<LancamentoSemana>(`/lancamentos?semana=${semana}`),
  salvarSemana: (dados: SalvarSemana) =>
    api.put<LancamentoSemana>('/lancamentos', dados),
  consultar: (semana: string) =>
    api.get<ConsultaHoras>(`/lancamentos?semana=${semana}`),
}
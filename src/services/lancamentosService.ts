import { api } from './http'
import type { ConsultaHoras, LancamentoSemana, SalvarSemana } from '../types/lancamento'

export const lancamentosService = {
  obterSemana: (semana: string, pessoaId: number) =>
    api.get<LancamentoSemana>(`/lancamentos?semana=${semana}&pessoaId=${pessoaId}`),
  salvarSemana: (dados: SalvarSemana) =>
    api.put<LancamentoSemana>('/lancamentos', dados),
  consultar: (semana: string) =>
    api.get<ConsultaHoras>(`/lancamentos?semana=${semana}`),
}
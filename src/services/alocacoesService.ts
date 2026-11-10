import { api } from './http'
import type { Alocacao, MinhasAlocacoes, NovaAlocacao } from '../types/alocacao'

export const alocacoesService = {
  minhas: (semana: string) =>
    api.get<MinhasAlocacoes>(`/alocacoes/minhas?semana=${semana}`),
  listar: (projetoId: number) =>
    api.get<Alocacao[]>(`/projetos/${projetoId}/alocacoes`),
  criar: (projetoId: number, dados: NovaAlocacao) =>
    api.post<Alocacao>(`/projetos/${projetoId}/alocacoes`, dados),
}
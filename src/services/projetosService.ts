import { api } from './http'
import type { NovoProjeto, Projeto } from '../types/projeto'
import type { RotuloSaude } from '../utils/formatadores'

export const projetosService = {
  listar: () => api.get<Projeto[]>('/projetos'),
  buscar: (id: number) => api.get<Projeto>(`/projetos/${id}`),
  criar: (dados: NovoProjeto) => api.post<Projeto>('/projetos', dados),
  atualizar: (id: number, dados: Partial<NovoProjeto> & { ativo?: boolean }) =>
    api.patch<Projeto>(`/projetos/${id}`, dados),
  alterarStatus: (id: number, status: RotuloSaude, justificativa?: string) =>
    api.patch<Projeto>(`/projetos/${id}/status`, { status, justificativa }),
}
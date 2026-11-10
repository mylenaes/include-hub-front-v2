import { api } from './http'
import type {
  AlterarStatus,
  EditarProjeto,
  NovoProjeto,
  Projeto,
  ProjetoDetalhe,
} from '../types/projeto'
import type { RotuloSaude } from '../types/rotulos'

export const projetosService = {
  listar: () => api.get<Projeto[]>('/projetos'),

  buscar: (id: number) => api.get<ProjetoDetalhe>(`/projetos/${id}`),

 
  criar: (dados: NovoProjeto) => api.post<Projeto>('/projetos', dados),

  atualizar: (id: number, dados: EditarProjeto) =>
    api.patch<Projeto>(`/projetos/${id}`, dados),

  alterarStatus: (id: number, status: RotuloSaude, justificativa?: string) => {
    const corpo: AlterarStatus = { status, justificativa }
    return api.patch<Projeto>(`/projetos/${id}/status`, corpo)
  },
}
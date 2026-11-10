import { api } from './http'
import type { EditarPessoa, NovaPessoa, Pessoa } from '../types/pessoa'

export const pessoasService = {
  listar: () => api.get<Pessoa[]>('/pessoas'),
  listarGerentes: () => api.get<Pessoa[]>('/pessoas?papel=GERENTE'),
  criar: (dados: NovaPessoa) => api.post<Pessoa>('/pessoas', dados),
  atualizar: (id: number, dados: EditarPessoa) =>
    api.patch<Pessoa>(`/pessoas/${id}`, dados),
}
import { api } from './http'
import type { Pessoa } from '../types/pessoa'

export const pessoasService = {
  listarGerentes: () => api.get<Pessoa[]>('/pessoas?papel=GERENTE'),
}
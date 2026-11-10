import { api } from './http'
import type { Categoria } from '../types/categoria'

export const categoriasService = {
  listar: () => api.get<Categoria[]>('/categorias'),
}
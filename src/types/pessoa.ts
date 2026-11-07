import type { Usuario } from './auth'

export interface Pessoa extends Usuario {
  ativo: boolean
}
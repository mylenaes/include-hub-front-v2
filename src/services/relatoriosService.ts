import { api } from './http'
import type { Disponibilidade } from '../types/disponibilidade'

export const relatoriosService = {
  disponibilidade: (semana?: string) =>
    api.get<Disponibilidade>(
      semana
        ? `/relatorios/disponibilidade?semana=${semana}`
        : '/relatorios/disponibilidade',
    ),
}
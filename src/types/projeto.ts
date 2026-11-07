import type { RotuloHoras, RotuloSaude } from '../utils/formatadores'

export interface Projeto {
  id: number
  nome: string
  cliente: string
  gerenteId: number
  gerenteNome: string
  status: RotuloSaude
  horasContratadas: number
  horasUsadas: number
  // Só vem se o back devolver o rótulo de estouro de horas
  rotuloHoras?: RotuloHoras
  interno: boolean
  ativo: boolean
}

export interface NovoProjeto {
  nome: string
  cliente: string
  gerenteId: number
  horasContratadas: number
}
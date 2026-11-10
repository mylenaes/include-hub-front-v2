import type { RotuloSaude } from './rotulos'
import type { PessoaResumo } from './pessoa'

export type TipoProjeto = 'CLIENTE' | 'INTERNO'

export interface Projeto {
  id: number
  nome: string
  cliente?: string | null 
  tipo: TipoProjeto
  gerente: PessoaResumo
  status: RotuloSaude
  horasContratadas: number | null
  inicio: string 
  fimPrevisto: string 
  ativo: boolean
}

export interface HistoricoStatus {
  status: RotuloSaude
  justificativa: string | null
  alteradoPor: PessoaResumo
  criadoEm: string 
}

export interface ProjetoDetalhe extends Projeto {
  historicoStatus: HistoricoStatus[]
}

export interface NovoProjeto {
  nome: string
  cliente: string
  tipo: TipoProjeto
  gerenteId: number
  horasContratadas: number
  inicio: string 
  fimPrevisto: string 
}

export type EditarProjeto = Partial<NovoProjeto> & { ativo?: boolean }

export interface AlterarStatus {
  status: RotuloSaude
  justificativa?: string
}
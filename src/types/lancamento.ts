import type { PessoaResumo } from './pessoa'

export interface LancamentoItem {
  id: number
  projetoId: number
  horas: number
  descricao: string | null
}

export interface LancamentoSemana {
  semanaInicio: string
  totalHoras: number
  itens: LancamentoItem[]
}

export interface SalvarItem {
  projetoId: number
  horas: number
  descricao?: string
}

export interface SalvarSemana {
  semanaInicio: string
  itens: SalvarItem[]
}

export interface LancamentoConsulta extends LancamentoItem {
  pessoa?: PessoaResumo 
  projeto?: { id: number; nome: string }
}

export interface ConsultaHoras {
  semanaInicio: string
  totalHoras: number
  itens: LancamentoConsulta[]
}
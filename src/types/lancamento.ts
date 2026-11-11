import type { PessoaResumo } from './pessoa'
import type { TipoProjeto } from './projeto'

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
  pessoaId: number
  semanaInicio: string
  pessoa: PessoaResumo
  projeto: { id: number; nome: string; tipo: TipoProjeto }
}

export interface ConsultaHoras {
  semanaInicio: string
  totalHoras: number
  itens: LancamentoConsulta[]
}
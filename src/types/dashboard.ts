import type { RotuloOcupacao, RotuloSaude } from './rotulos'
export type SeveridadeAlerta = 'VERMELHO' | 'AMARELO'

export interface Alerta {
  severidade: SeveridadeAlerta
  mensagem: string 
}

export interface OcupacaoComRotulo {
  percentual: number
  rotulo: RotuloOcupacao
}

export interface DashboardColaborador {
  semana: string
  projetosAtivos: number
  horasRegistradas: number
  ocupacaoRealizada: OcupacaoComRotulo
  disponibilidadeRestante: number
  alertas: Alerta[]
}

export interface ProjetosPorStatus {
  status: RotuloSaude
  quantidade: number
}

export interface OcupacaoPessoa {
  id: number
  nome: string
  ocupacaoRealizada: OcupacaoComRotulo
}

export interface DashboardAdmin {
  semana: string
  projetosAtivos: number
  colaboradores: number
  horasRegistradas: number
  projetosEmRisco: number
  projetosPorStatus: ProjetosPorStatus[]
  ocupacaoEquipe: OcupacaoPessoa[]
  alertas: Alerta[]
}
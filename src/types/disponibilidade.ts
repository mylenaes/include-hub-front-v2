import type { Categoria } from './categoria'
import type { RotuloOcupacao } from './rotulos'

export interface Ocupacao {
  percentual: number
  rotulo: RotuloOcupacao
}

export interface PessoaDisponibilidade {
  id: number
  nome: string
  categoria: Categoria | null
  horasSemanais: number
  projetosAtuais: number
  ocupacaoRealizada: Ocupacao
  ocupacaoPlanejada: Ocupacao
  horasLivres: number
  disponibilidadeRestante: number
}

export interface Disponibilidade {
  semana: string
  pessoas: PessoaDisponibilidade[]
}
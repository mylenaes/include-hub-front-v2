import type { Categoria } from './categoria'
import type { TipoProjeto } from './projeto'

export interface Alocacao {
  id: number
  pessoa: { id: number; nome: string; horasSemanais: number }
  categoria: Categoria
  horasPrevistasSemana: number
  inicio: string
  fim: string | null 
}

export interface NovaAlocacao {
  pessoaId: number
  categoriaId: number
  horasPrevistasSemana: number
  inicio?: string 
  fim?: string 
}

export interface ProjetoMinhasAlocacoes {
  id: number
  nome: string
  tipo: TipoProjeto
  horasPrevistasSemana: number | null
}

export interface MinhasAlocacoes {
  semana: string
  projetos: ProjetoMinhasAlocacoes[]
}
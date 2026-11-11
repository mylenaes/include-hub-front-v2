import type { Usuario } from './auth'
import type { Categoria } from './categoria'

export interface PessoaResumo {
  id: number
  nome: string
}

export interface Pessoa extends Usuario {
  ativo: boolean
  categoria?: Categoria | null
  horasSemanais?: number 
}

export interface NovaPessoa {
  nome: string
  email: string
  senha: string 
  papel: Usuario['papel']
  categoriaId?: number 
  horasSemanais: number 
}

export type EditarPessoa = Partial<Omit<NovaPessoa, 'senha'>> & { ativo?: boolean }
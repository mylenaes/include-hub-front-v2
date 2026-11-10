export type Papel = 'ADMIN' | 'GERENTE' | 'COLABORADOR'

export interface Usuario {
  id: number
  nome: string
  email: string
  papel: Papel
}

export interface LoginResposta {
  token: string
  usuario: Usuario
}

export interface Categoria {
  id: number
  nome: string
}
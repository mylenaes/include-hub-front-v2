export type Papel = 'ADMIN' | 'GERENTE' | 'COLABORADOR'

export interface Usuario {
  id: number
  nome: string
  email: string
  papel: Papel
}
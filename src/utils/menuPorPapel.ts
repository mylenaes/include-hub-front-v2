import type { Papel } from '../types/auth'
export interface ItemMenu {
  label: string
  path: string
}

export const menuPorPapel: Record<Papel, ItemMenu[]> = {
  ADMIN: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Projetos', path: '/projetos' },
    { label: 'Equipe', path: '/equipe' },
    { label: 'Alocações', path: '/alocacoes' },
    { label: 'Horas', path: '/horas' },
    { label: 'Disponibilidade', path: '/disponibilidade' },
  ],
  GERENTE: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Meus projetos', path: '/projetos' },
    { label: 'Registrar horas', path: '/lancamentos' },
    { label: 'Minha equipe', path: '/equipe' },
    { label: 'Alocações', path: '/alocacoes' },
    { label: 'Saúde', path: '/saude' },
    { label: 'Disponibilidade', path: '/disponibilidade' },
  ],
  COLABORADOR: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Meus projetos', path: '/projetos' },
    { label: 'Registrar horas', path: '/lancamentos' },
    { label: 'Minha disponibilidade', path: '/disponibilidade' },
  ],
}
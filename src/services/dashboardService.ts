import { api } from './http'
import type { DashboardColaborador } from '../types/dashboard'

export const dashboardService = {
  buscarDados: () =>
    api.get<DashboardColaborador>('/dashboard/colaborador'),
}
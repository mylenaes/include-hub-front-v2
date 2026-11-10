import { api } from './http'
import type { DashboardAdmin, DashboardColaborador } from '../types/dashboard'

export const dashboardService = {
  buscarDados: () =>
    api.get<DashboardColaborador>('/dashboard?periodo=semana'),
  buscarAdmin: () =>
    api.get<DashboardAdmin>('/dashboard?periodo=semana'),
}
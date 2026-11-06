import { api } from './http'
import type { Usuario } from '../types/auth'

export const authService = {
  login: (email: string, senha: string) =>
    api.post<{ token: string }>('/auth/login', { email, senha }),
  me: () => api.get<Usuario>('/auth/me'),
}
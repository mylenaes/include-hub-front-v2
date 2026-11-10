import { api } from './http'
import type { LoginResposta, Usuario } from '../types/auth'

export const authService = {
  login: (email: string, senha: string) =>
    api.post<LoginResposta>('/auth/login', { email, senha }),
  me: () => api.get<Usuario>('/auth/me'),
}
// Guarda quem está logado e disponibiliza para o app todo
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { authService } from '../services/authService'
import type { Usuario } from '../types/auth'

interface AuthContexto {
  user: Usuario | null
  carregando: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
}

const Contexto = createContext<AuthContexto | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      setCarregando(false)
      return
    }
    authService
      .me()
      .then(setUser)
      .catch(() => sessionStorage.removeItem('token'))
      .finally(() => setCarregando(false))
  }, [])

  async function login(email: string, senha: string) {
  const resposta = await authService.login(email, senha)
  sessionStorage.setItem('token', resposta.token)
  setUser(resposta.usuario)
}

  function logout() {
    sessionStorage.removeItem('token')
    setUser(null)
  }

  return (
    <Contexto.Provider value={{ user, carregando, login, logout }}>
      {children}
    </Contexto.Provider>
  )
}

export function useAuth() {
  const contexto = useContext(Contexto)
  if (!contexto) {
    throw new Error('useAuth precisa estar dentro do AuthProvider')
  }
  return contexto
}
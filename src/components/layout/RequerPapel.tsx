import { Navigate, Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../../context/AuthContext'
import type { Papel } from '../../types/auth'

interface Props {
  papeis?: Papel[]
  children?: ReactNode
}

export default function RequerPapel({ papeis, children }: Props) {
  const { user, carregando } = useAuth()
  if (carregando) return <p>Carregando...</p>
  if (!user) return <Navigate to="/login" replace />
  if (papeis && !papeis.includes(user.papel)) {
    return <Navigate to="/dashboard" replace />
  }

  return children ? <>{children}</> : <Outlet />
}
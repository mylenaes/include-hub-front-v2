import { useAuth } from '../context/AuthContext'
import DashboardAdmin from '../components/dashboard/DashboardAdmin'
import DashboardGerente from '../components/dashboard/DashboardGerente'
import DashboardColaborador from '../components/dashboard/DashboardColaborador'

export default function Dashboard() {
  const { user } = useAuth()
  if (user?.papel === 'ADMIN') return <DashboardAdmin />
  if (user?.papel === 'GERENTE') return <DashboardGerente />
  if (user?.papel === 'COLABORADOR') return <DashboardColaborador />
  return null
}
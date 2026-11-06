import { Routes, Route, Navigate } from 'react-router-dom'
import RequerPapel from './components/layout/RequerPapel'
import LayoutBase from './components/layout/LayoutBase'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Projetos from './pages/Projetos'
import Equipe from './pages/Equipe'
import Alocacoes from './pages/Alocacoes'
import Lancamentos from './pages/Lancamentos'
import Horas from './pages/Horas'
import Disponibilidade from './pages/Disponibilidade'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Tudo aqui dentro exige tá logado e aparece com sidebar e header */}
      <Route element={<RequerPapel />}>
        <Route element={<LayoutBase />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/projetos/:id" element={<Projetos />} />
          <Route path="/disponibilidade" element={<Disponibilidade />} />

          <Route element={<RequerPapel papeis={['GERENTE', 'COLABORADOR']} />}>
            <Route path="/lancamentos" element={<Lancamentos />} />
          </Route>

          <Route element={<RequerPapel papeis={['ADMIN', 'GERENTE']} />}>
            <Route path="/alocacoes" element={<Alocacoes />} />
          </Route>

          <Route element={<RequerPapel papeis={['ADMIN']} />}>
            <Route path="/equipe" element={<Equipe />} />
            <Route path="/horas" element={<Horas />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<p>Página não encontrada</p>} />
    </Routes>
  )
}
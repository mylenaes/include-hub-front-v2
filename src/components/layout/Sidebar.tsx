import { NavLink } from 'react-router-dom'
import logo from '../../assets/IncludeHub-.png'
import { useAuth } from '../../context/AuthContext'
import { menuPorPapel } from '../../utils/menuPorPapel'

// Provisório: trocar pelo mapa de papel do utils/formatadores.ts quando ele existir
const nomePapel = {
  ADMIN: 'Admin',
  GERENTE: 'Gerente',
  COLABORADOR: 'Colaborador',
}

export default function Sidebar() {
  const { user } = useAuth()
  if (!user) return null
  const items = menuPorPapel[user.papel]

  return (
    <aside className="w-64 min-h-screen bg-[#2A2E42] flex flex-col p-4">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src={logo} alt="IncludeHub" className="w-40 h-auto object-contain" />
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2 flex-1">
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg font-medium transition ${
                isActive
                  ? 'bg-[#484F6B] text-white'
                  : 'text-[#A5AED8] hover:bg-[#3A4059] hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Usuário */}
      <div className="border-t border-[#656877] pt-4 mt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#A5AED8] flex items-center justify-center text-[#2A2E42] font-semibold">
          {user.nome.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <span className="text-white text-sm font-medium">{user.nome}</span>
          <span className="text-[#A5AED8] text-xs">{nomePapel[user.papel]}</span>
        </div>
      </div>
    </aside>
  )
}
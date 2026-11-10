import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/IncludeHub-.png";
import { useAuth } from "../../context/AuthContext";
import { menuPorPapel } from "../../utils/menuPorPapel";
import { formatarPapel } from "../../utils/formatadores";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setAberto(false);
  }, [pathname]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    document.addEventListener("keydown", aoTeclar);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  if (!user) return null;
  const items = menuPorPapel[user.papel];

  function sair() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-30 h-16 bg-[#2A2E42] flex items-center justify-between px-4 md:hidden">
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          aria-controls="menu-lateral"
          className="p-2 rounded-lg text-white transition hover:bg-[#3A4059]"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path
              d={aberto ? "M6 6l12 12M18 6L6 18" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        <img
          src={logo}
          alt="IncludeHub"
          className="h-11 w-auto max-w-[60%] shrink-0 object-contain"
        />
      </div>
      {aberto && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setAberto(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="menu-lateral"
        className={`w-64 min-h-screen bg-[#2A2E42] flex flex-col p-4 fixed inset-y-0 left-0 z-40 overflow-y-auto transition-transform duration-200 md:static md:z-auto md:translate-x-0 md:overflow-visible ${
          aberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="IncludeHub"
            className="w-40 h-auto object-contain"
          />
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-[#484F6B] text-white"
                    : "text-[#A5AED8] hover:bg-[#3A4059] hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[#656877] pt-4 mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#A5AED8] flex items-center justify-center text-[#2A2E42] font-semibold">
              {user.nome.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-medium">{user.nome}</span>
              <span className="text-[#A5AED8] text-xs">
                {formatarPapel(user.papel)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={sair}
            className="w-full rounded-lg px-3 py-2 text-left font-medium text-[#A5AED8] transition hover:bg-[#3A4059] hover:text-white"
          >
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
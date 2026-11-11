import { useEffect, useState } from 'react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ModalNovoProjeto from '../components/projetos/ModalNovoProjeto'
import { useAuth } from '../context/AuthContext'
import { HttpError } from '../services/http'
import { pessoasService } from '../services/pessoasService'
import { projetosService } from '../services/projetosService'
import { formatarTipo, infoRotulo } from '../utils/formatadores'
import type { Pessoa } from '../types/pessoa'
import type { NovoProjeto, Projeto } from '../types/projeto'

export default function Projetos() {
  const { user } = useAuth()
  const ehAdmin = user?.papel === 'ADMIN'
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [gerentes, setGerentes] = useState<Pessoa[]>([])
  const [salvando, setSalvando] = useState(false)
  const [errosCampos, setErrosCampos] = useState<Record<string, string>>({})
  const [erroModal, setErroModal] = useState<string | null>(null)

  async function carregar() {
    try {
      setCarregando(true)
      setErro(null)
      setProjetos((await projetosService.listar()) ?? [])
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao carregar')
    } finally {
      setCarregando(false)
    }
  }
  useEffect(() => {
    carregar()
  }, [])

  async function abrirModal() {
    setErrosCampos({})
    setErroModal(null)
    setModalAberto(true)
    try {
      setGerentes((await pessoasService.listarGerentes()) ?? [])
    } catch (e) {
      setErroModal(e instanceof Error ? e.message : 'Não foi possível carregar gerentes')
    }
  }
  async function salvar(dados: NovoProjeto) {
    try {
      setSalvando(true)
      setErrosCampos({})
      setErroModal(null)
      await projetosService.criar(dados)
      setModalAberto(false)
      await carregar()
    } catch (e) {
      if (e instanceof HttpError && e.campos) setErrosCampos(e.campos)
      else setErroModal(e instanceof Error ? e.message : 'Erro ao salvar o projeto')
    } finally {
      setSalvando(false)
    }
  }
  const titulo = ehAdmin ? 'Projetos' : 'Meus projetos'
  const total = projetos.length

  return (
    <section>
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">{titulo}</h1>
          {!carregando && !erro && (
            <p className="mt-2 text-xl text-[#A5AED8]">
              {total} {total === 1 ? 'projeto ativo' : 'projetos ativos'}
            </p>
          )}
        </div>
        {ehAdmin && (
          <button
            type="button"
            onClick={abrirModal}
            className="rounded-lg border border-[#f07a4a] bg-[#e2531b] px-6 py-2 font-semibold text-white transition hover:bg-[#cf4915] active:scale-[0.98]"
          >
            Novo projeto
          </button>
        )}
      </header>
      <div className="min-h-[60vh] rounded-2xl border border-[#A5AED8]/50 bg-[#2A2E42] px-6 py-4">
        {carregando && <p className="py-10 text-center text-[#A5AED8]">Carregando projetos...</p>}
        {erro && !carregando && (
          <div role="alert" className="flex flex-col items-center gap-4 py-10">
            <p className="text-red-500">{erro}</p>
            <Button onClick={carregar}>Tentar de novo</Button>
          </div>
        )}
        {!carregando && !erro && total === 0 && (
          <p className="py-10 text-center text-[#A5AED8]">
            {ehAdmin
              ? 'Nenhum projeto ainda. Clique em "Novo projeto" para cadastrar.'
              : 'Você ainda não possui projetos.'}
          </p>
        )}
        {!carregando && !erro && total > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20 text-lg text-[#A5AED8]">
                  <th className="py-4 pr-4 font-medium">Projeto</th>
                  <th className="py-4 pr-4 font-medium">Cliente</th>
                  {ehAdmin && <th className="py-4 pr-4 font-medium">Gerente</th>}
                  <th className="py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {projetos.map((p) => {
                  const status = infoRotulo(p.status)
                  return (
                    <tr key={p.id} className="border-b border-white/20 text-white last:border-b-0">
                      <td className="py-5 pr-4">{p.nome}</td>
                      <td className="py-5 pr-4">
                        {p.tipo === 'INTERNO' ? (
                          <span className="text-[#A5AED8]">{formatarTipo(p.tipo)}</span>
                        ) : (
                          p.cliente ?? '—'
                        )}
                      </td>
                      {ehAdmin && <td className="py-5 pr-4">{p.gerente?.nome ?? '—'}</td>}
                      <td className="py-5">
                        <Badge texto={status.texto} cor={status.cor} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modalAberto && (
        <ModalNovoProjeto
          gerentes={gerentes}
          salvando={salvando}
          erros={errosCampos}
          erroGeral={erroModal}
          onSalvar={salvar}
          onFechar={() => setModalAberto(false)}
        />
      )}
    </section>
  )
}
import { useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import ModalAlocarColaborador from '../components/equipe/ModalAlocarColaborador'
import { useAuth } from '../context/AuthContext'
import { alocacoesService } from '../services/alocacoesService'
import { categoriasService } from '../services/categoriasService'
import { HttpError } from '../services/http'
import { pessoasService } from '../services/pessoasService'
import { projetosService } from '../services/projetosService'
import { formatarPercentual } from '../utils/formatadores'
import type { Alocacao, NovaAlocacao } from '../types/alocacao'
import type { Categoria } from '../types/categoria'
import type { Pessoa } from '../types/pessoa'
import type { Projeto } from '../types/projeto'

type LinhaAlocacao = Alocacao & { projetoNome: string }

export default function Alocacoes() {
  const { user } = useAuth()
  const ehAdmin = user?.papel === 'ADMIN'
  const [linhas, setLinhas] = useState<LinhaAlocacao[]>([])
  const [projetos, setProjetos] = useState<Projeto[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [colaboradores, setColaboradores] = useState<Pessoa[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [salvando, setSalvando] = useState(false)
  const [errosCampos, setErrosCampos] = useState<Record<string, string>>({})
  const [erroModal, setErroModal] = useState<string | null>(null)

  async function carregar() {
    try {
      setCarregando(true)
      setErro(null)
      const todos = (await projetosService.listar()) ?? []
      const alvo = todos.filter((p) => p.tipo !== 'INTERNO')
      setProjetos(alvo)
      const listas = await Promise.all(
        alvo.map(async (p) => {
          const alocacoes = (await alocacoesService.listar(p.id)) ?? []
          return alocacoes.map((a) => ({ ...a, projetoNome: p.nome }))
        }),
      )
      setLinhas(listas.flat())
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
      const [todasPessoas, todasCategorias] = await Promise.all([
        pessoasService.listar(),
        categoriasService.listar(),
      ])
      setColaboradores(
        (todasPessoas ?? []).filter((p) => p.papel === 'COLABORADOR' && p.ativo),
      )
      setCategorias(todasCategorias ?? [])
    } catch (e) {
      setErroModal(e instanceof Error ? e.message : 'Não foi possível carregar os dados')
    }
  }

  async function salvar(projetoId: number, dados: NovaAlocacao) {
    try {
      setSalvando(true)
      setErrosCampos({})
      setErroModal(null)
      await alocacoesService.criar(projetoId, dados)
      setModalAberto(false)
      await carregar()
    } catch (e) {
      if (e instanceof HttpError && e.campos) setErrosCampos(e.campos)
      else setErroModal(e instanceof Error ? e.message : 'Erro ao alocar o colaborador')
    } finally {
      setSalvando(false)
    }
  }

  const total = linhas.length

  return (
    <section>
      <header className="mb-8 flex items-end justify-between gap-4">
        <h1 className="text-4xl font-bold text-white">Alocação</h1>
        {ehAdmin && (
          <button
            type="button"
            onClick={abrirModal}
            className="rounded-lg border border-[#f07a4a] bg-[#e2531b] px-6 py-2 font-semibold text-white transition hover:bg-[#cf4915] active:scale-[0.98]"
          >
            Alocar colaborador
          </button>
        )}
      </header>

      <div className="min-h-[60vh] rounded-2xl border border-[#A5AED8]/50 bg-[#2A2E42] px-6 py-4">
        {carregando && <p className="py-10 text-center text-[#A5AED8]">Carregando alocações...</p>}
        {erro && !carregando && (
          <div role="alert" className="flex flex-col items-center gap-4 py-10">
            <p className="text-red-500">{erro}</p>
            <Button onClick={carregar}>Tentar de novo</Button>
          </div>
        )}
        {!carregando && !erro && total === 0 && (
          <p className="py-10 text-center text-[#A5AED8]">Nenhuma alocação ainda.</p>
        )}
        {!carregando && !erro && total > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20 text-lg text-[#A5AED8]">
                  <th className="py-4 pr-4 font-medium">Colaborador</th>
                  <th className="py-4 pr-4 font-medium">Categoria</th>
                  <th className="py-4 pr-4 font-medium">Projetos</th>
                  <th className="py-4 font-medium">Alocação</th>
                </tr>
              </thead>
              <tbody>
                {linhas.map((a) => (
                  <tr key={a.id} className="border-b border-white/20 text-white last:border-b-0">
                    <td className="py-5 pr-4">{a.pessoa.nome}</td>
                    <td className="py-5 pr-4">{a.categoria.nome}</td>
                    <td className="py-5 pr-4">{a.projetoNome}</td>
                    <td className="py-5">
                      {formatarPercentual((a.horasPrevistasSemana / a.pessoa.horasSemanais) * 100)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modalAberto && (
        <ModalAlocarColaborador
          pessoas={colaboradores}
          projetos={projetos}
          categorias={categorias}
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
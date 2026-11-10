import { useEffect, useState } from 'react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ModalNovoMembro from '../components/equipe/ModalNovoMembro'
import { useAuth } from '../context/AuthContext'
import { categoriasService } from '../services/categoriasService'
import { HttpError } from '../services/http'
import { pessoasService } from '../services/pessoasService'
import { relatoriosService } from '../services/relatoriosServices'
import { formatarPercentual, infoRotulo } from '../utils/formatadores'
import type { Categoria } from '../types/categoria'
import type { PessoaDisponibilidade } from '../types/disponibilidade'
import type { NovaPessoa } from '../types/pessoa'

export default function Equipe() {
  const { user } = useAuth()
  const ehAdmin = user?.papel === 'ADMIN'
  const [pessoas, setPessoas] = useState<PessoaDisponibilidade[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativa, setTentativa] = useState(0)

  const [modalAberto, setModalAberto] = useState(false)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [salvando, setSalvando] = useState(false)
  const [errosCampos, setErrosCampos] = useState<Record<string, string>>({})
  const [erroModal, setErroModal] = useState<string | null>(null)

  useEffect(() => {
    let ativo = true

    async function carregar() {
      try {
        setCarregando(true)
        setErro(null)
        const resposta = await relatoriosService.disponibilidade()
        if (ativo) setPessoas(resposta?.pessoas ?? [])
      } catch (e) {
        if (ativo) setErro(e instanceof Error ? e.message : 'Erro ao carregar')
      } finally {
        if (ativo) setCarregando(false)
      }
    }
    carregar()
    return () => {
      ativo = false
    }
  }, [tentativa])

  const recarregar = () => setTentativa((t) => t + 1)

  async function abrirModal() {
    setErrosCampos({})
    setErroModal(null)
    setModalAberto(true)
    if (categorias.length === 0) {
      try {
        setCategorias((await categoriasService.listar()) ?? [])
      } catch (e) {
        setErroModal(e instanceof Error ? e.message : 'Não foi possível carregar as categorias')
      }
    }
  }

  async function salvar(dados: NovaPessoa) {
    try {
      setSalvando(true)
      setErrosCampos({})
      setErroModal(null)
      await pessoasService.criar(dados)
      setModalAberto(false)
      recarregar()
    } catch (e) {
      if (e instanceof HttpError && e.campos) setErrosCampos(e.campos)
      else setErroModal(e instanceof Error ? e.message : 'Erro ao cadastrar o membro')
    } finally {
      setSalvando(false)
    }
  }

  const titulo = ehAdmin ? 'Equipe' : 'Minha equipe'
  const total = pessoas.length

  return (
    <section>
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">{titulo}</h1>
          {!carregando && !erro && (
            <p className="mt-2 text-xl text-[#A5AED8]">
              {total} {total === 1 ? 'pessoa' : 'pessoas'}
            </p>
          )}
        </div>
        {ehAdmin && (
          <button
            type="button"
            onClick={abrirModal}
            className="rounded-lg border border-[#f07a4a] bg-[#e2531b] px-6 py-2 font-semibold text-white transition hover:bg-[#cf4915] active:scale-[0.98]"
          >
            Novo membro
          </button>
        )}
      </header>

      <div className="min-h-[60vh] rounded-2xl border border-[#A5AED8]/50 bg-[#2A2E42] px-6 py-4">
        {carregando && <p className="py-10 text-center text-[#A5AED8]">Carregando equipe...</p>}

        {erro && !carregando && (
          <div role="alert" className="flex flex-col items-center gap-4 py-10">
            <p className="text-red-500">{erro}</p>
            <Button onClick={recarregar}>Tentar de novo</Button>
          </div>
        )}

        {!carregando && !erro && total === 0 && (
          <p className="py-10 text-center text-[#A5AED8]">Nenhuma pessoa na equipe.</p>
        )}

        {!carregando && !erro && total > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20 text-lg text-[#A5AED8]">
                  <th className="py-4 pr-4 font-medium">Nome</th>
                  <th className="py-4 pr-4 font-medium">Categoria</th>
                  <th className="py-4 pr-4 font-medium">Projetos atuais</th>
                  <th className="py-4 font-medium">Ocupação</th>
                </tr>
              </thead>
              <tbody>
                {pessoas.map((p) => {
                  const ocupacao = infoRotulo(p.ocupacaoRealizada.rotulo)
                  return (
                    <tr key={p.id} className="border-b border-white/20 text-white last:border-b-0">
                      <td className="py-5 pr-4">{p.nome}</td>
                      <td className="py-5 pr-4">{p.categoria?.nome ?? '—'}</td>
                      <td className="py-5 pr-4">{p.projetosAtuais}</td>
                      <td className="py-5">
                        <Badge
                          texto={formatarPercentual(p.ocupacaoRealizada.percentual)}
                          cor={ocupacao.cor}
                        />
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
        <ModalNovoMembro
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
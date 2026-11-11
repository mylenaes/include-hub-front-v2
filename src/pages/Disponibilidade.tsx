import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import SeletorSemana from '../components/ui/SeletorSemana'
import { useAuth } from '../context/AuthContext'
import { relatoriosService } from '../services/relatoriosService'
import { formatarHoras, formatarPercentual, infoRotulo } from '../utils/formatadores'
import { deslocarSemana, segundaDaSemana, semanaAtual } from '../utils/semana'
import type { PessoaDisponibilidade } from '../types/disponibilidade'

export default function Disponibilidade() {
  const { user } = useAuth()
  const ehColaborador = user?.papel === 'COLABORADOR'

  const [searchParams, setSearchParams] = useSearchParams()
  const semanaParam = searchParams.get('semana')
  const semana = segundaDaSemana(semanaParam)

  const [pessoas, setPessoas] = useState<PessoaDisponibilidade[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    if (semanaParam !== semana) {
      setSearchParams({ semana }, { replace: true })
    }
  }, [semana, semanaParam, setSearchParams])

  useEffect(() => {
    let ativo = true

    async function carregar() {
      try {
        setCarregando(true)
        setErro(null)
        const resposta = await relatoriosService.disponibilidade(semana)
        if (ativo) setPessoas(resposta?.pessoas ?? [])
      } catch (e) {
        if (ativo) setErro(e instanceof Error ? e.message : 'Erro ao carregar disponibilidade')
      } finally {
        if (ativo) setCarregando(false)
      }
    }
    carregar()
    return () => {
      ativo = false
    }
  }, [semana, tentativa])

  const seletor = (
    <SeletorSemana
      semana={semana}
      onAnterior={() => setSearchParams({ semana: deslocarSemana(semana, -1) })}
      onProxima={() => setSearchParams({ semana: deslocarSemana(semana, 1) })}
      onHoje={() => setSearchParams({ semana: semanaAtual() })}
    />
  )

  const estadoErro = erro && !carregando && (
    <div role="alert" className="flex flex-col items-start gap-4">
      <p className="text-red-500">{erro}</p>
      <Button onClick={() => setTentativa((t) => t + 1)}>Tentar de novo</Button>
    </div>
  )

  if (ehColaborador) {
    const eu = pessoas[0]

    return (
      <section>
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">Minha disponibilidade</h1>
          <div className="mt-4">{seletor}</div>
        </header>
        {carregando && <p className="text-[#A5AED8]">Carregando disponibilidade...</p>}
        {estadoErro}
        {!carregando && !erro && !eu && (
          <p className="text-[#A5AED8]">Nenhum registro para esta semana.</p>
        )}

        {!carregando && !erro && eu && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-4 rounded-xl border border-[#A5AED8]/30 bg-[#2A2E42] p-6">
              <span className="text-sm text-[#A5AED8]">Realizada</span>
              <div>
                <Badge
                  texto={formatarPercentual(eu.ocupacaoRealizada.percentual)}
                  cor={infoRotulo(eu.ocupacaoRealizada.rotulo).cor}
                />
              </div>
              <p className="text-lg font-semibold text-white">
                {infoRotulo(eu.ocupacaoRealizada.rotulo).texto}
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-[#A5AED8]/30 bg-[#2A2E42] p-6">
              <span className="text-sm text-[#A5AED8]">Planejada</span>
              <div>
                <Badge
                  texto={formatarPercentual(eu.ocupacaoPlanejada.percentual)}
                  cor={infoRotulo(eu.ocupacaoPlanejada.rotulo).cor}
                />
              </div>
              <p className="text-lg font-semibold text-white">
                {infoRotulo(eu.ocupacaoPlanejada.rotulo).texto}
              </p>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-[#A5AED8]/30 bg-[#2A2E42] p-6">
              <span className="text-sm text-[#A5AED8]">Horas livres</span>
              <p className="text-3xl font-bold text-white">{formatarHoras(eu.horasLivres)}</p>
              <p className="text-sm text-[#A5AED8]">
                Disponibilidade restante: {formatarPercentual(eu.disponibilidadeRestante)}
              </p>
            </div>
          </div>
        )}
      </section>
    )
  }

  const total = pessoas.length
  const legenda = (['DISPONIVEL', 'NORMAL', 'SOBRECARREGADO'] as const).map(infoRotulo)

  return (
    <section>
      <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold text-white">Disponibilidade</h1>
          <p className="mt-2 text-xl text-[#A5AED8]">Taxa de ocupação por semana</p>
        </div>
        {seletor}
      </header>
      <div className="min-h-[50vh] rounded-2xl border border-[#A5AED8]/50 bg-[#2A2E42] px-6 py-4">
        {carregando && (
          <p className="py-10 text-center text-[#A5AED8]">Carregando disponibilidade...</p>
        )}
        {estadoErro}

        {!carregando && !erro && total === 0 && (
          <p className="py-10 text-center text-[#A5AED8]">Nenhum registro encontrado.</p>
        )}
        {!carregando && !erro && total > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20 text-lg text-[#A5AED8]">
                  <th className="py-4 pr-4 font-medium">Membro</th>
                  <th className="py-4 pr-4 font-medium">Categoria</th>
                  <th className="py-4 pr-4 text-center font-medium">Realizada</th>
                  <th className="py-4 pr-4 text-center font-medium">Planejada</th>
                  <th className="py-4 font-medium">Horas livres</th>
                </tr>
              </thead>
              <tbody>
                {pessoas.map((p) => (
                  <tr key={p.id} className="border-b border-white/20 text-white last:border-b-0">
                    <td className="py-5 pr-4">{p.nome}</td>
                    <td className="py-5 pr-4">{p.categoria?.nome ?? '—'}</td>
                    <td className="py-5 pr-4 text-center">
                      <Badge
                        texto={formatarPercentual(p.ocupacaoRealizada.percentual)}
                        cor={infoRotulo(p.ocupacaoRealizada.rotulo).cor}
                      />
                    </td>
                    <td className="py-5 pr-4 text-center">
                      <Badge
                        texto={formatarPercentual(p.ocupacaoPlanejada.percentual)}
                        cor={infoRotulo(p.ocupacaoPlanejada.rotulo).cor}
                      />
                    </td>
                    <td className="py-5">{formatarHoras(p.horasLivres)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <footer className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#A5AED8]">
        <span className="font-medium text-white">Legenda:</span>
        {legenda.map((l) => (
          <Badge key={l.texto} texto={l.texto} cor={l.cor} />
        ))}
        <span>
          <strong className="text-white">Realizada</strong>: quem está sobrecarregado.{' '}
          <strong className="text-white">Planejada</strong>: quem pode entrar num projeto novo.
        </span>
      </footer>
    </section>
  )
}
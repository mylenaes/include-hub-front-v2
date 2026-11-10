import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import SeletorSemana from '../components/ui/SeletorSemana'
import { lancamentosService } from '../services/lancamentosService'
import { formatarHoras } from '../utils/formatadores'
import { deslocarSemana, segundaDaSemana, semanaAtual } from '../utils/semana'
import type { LancamentoConsulta } from '../types/lancamento'

export default function Horas() {
  const [searchParams, setSearchParams] = useSearchParams()
  const semanaParam = searchParams.get('semana')
  const semana = segundaDaSemana(semanaParam)
  const [itens, setItens] = useState<LancamentoConsulta[]>([])
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
        const resposta = await lancamentosService.consultar(semana)
        if (ativo) setItens(resposta?.itens ?? [])
      } catch (e) {
        if (ativo) setErro(e instanceof Error ? e.message : 'Erro ao carregar as horas')
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregar()
    return () => {
      ativo = false
    }
  }, [semana, tentativa])
  const total = itens.length

  return (
    <section>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Horas</h1>
        <div className="mt-4">
          <SeletorSemana
            semana={semana}
            onAnterior={() => setSearchParams({ semana: deslocarSemana(semana, -1) })}
            onProxima={() => setSearchParams({ semana: deslocarSemana(semana, 1) })}
            onHoje={() => setSearchParams({ semana: semanaAtual() })}
          />
        </div>
      </header>

      <div className="min-h-[60vh] rounded-2xl border border-[#A5AED8]/50 bg-[#2A2E42] px-6 py-4">
        {carregando && <p className="py-10 text-center text-[#A5AED8]">Carregando horas...</p>}
        {erro && !carregando && (
          <div role="alert" className="flex flex-col items-center gap-4 py-10">
            <p className="text-red-500">{erro}</p>
            <Button onClick={() => setTentativa((t) => t + 1)}>Tentar de novo</Button>
          </div>
        )}
        {!carregando && !erro && total === 0 && (
          <p className="py-10 text-center text-[#A5AED8]">Nenhum lançamento nesta semana.</p>
        )}

        {!carregando && !erro && total > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20 text-lg text-[#A5AED8]">
                  <th className="py-4 pr-4 font-medium">Colaborador</th>
                  <th className="py-4 pr-4 font-medium">Projeto</th>
                  <th className="py-4 font-medium">Horas na semana</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((i) => (
                  <tr key={i.id} className="border-b border-white/20 text-white last:border-b-0">
                    <td className="py-5 pr-4">{i.pessoa?.nome ?? '—'}</td>
                    <td className="py-5 pr-4">{i.projeto?.nome ?? `#${i.projetoId}`}</td>
                    <td className="py-5">{formatarHoras(i.horas)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
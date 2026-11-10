import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import SeletorSemana from '../components/ui/SeletorSemana'
import GradeSemanalHoras from '../components/lancamentos/GradeSemanalHoras'
import type { ValoresGrade, ValorLinha } from '../components/lancamentos/GradeSemanalHoras'
import { alocacoesService } from '../services/alocacoesService'
import { lancamentosService } from '../services/lancamentosService'
import { deslocarSemana, segundaDaSemana, semanaAtual } from '../utils/semana'
import type { ProjetoMinhasAlocacoes } from '../types/alocacao'
import type { LancamentoItem } from '../types/lancamento'

// Linhas da grade (vindas do back) + o que já foi lançado na semana
function montarValores(linhas: ProjetoMinhasAlocacoes[], itens: LancamentoItem[]): ValoresGrade {
  const valores: ValoresGrade = {}
  for (const p of linhas) valores[p.id] = { horas: '', descricao: '' }
  for (const i of itens) {
    if (valores[i.projetoId]) {
      valores[i.projetoId] = { horas: String(i.horas), descricao: i.descricao ?? '' }
    }
  }
  return valores
}

export default function Lancamentos() {
  // A semana fica na URL e é sempre normalizada para a segunda-feira
  const [searchParams, setSearchParams] = useSearchParams()
  const semanaParam = searchParams.get('semana')
  const semana = segundaDaSemana(semanaParam)

  const [projetos, setProjetos] = useState<ProjetoMinhasAlocacoes[]>([])
  const [valores, setValores] = useState<ValoresGrade>({})
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativa, setTentativa] = useState(0)

  const [salvando, setSalvando] = useState(false)
  const [salvo, setSalvo] = useState<number | null>(null) 
  const [erroSalvar, setErroSalvar] = useState<string | null>(null)

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
        setSalvo(null)
        setErroSalvar(null)
        const [minhas, lancadas] = await Promise.all([
          alocacoesService.minhas(semana),
          lancamentosService.obterSemana(semana),
        ])
        if (!ativo) return
        const linhas = minhas?.projetos ?? []
        setProjetos(linhas)
        setValores(montarValores(linhas, lancadas?.itens ?? []))
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
  }, [semana, tentativa])

  function alterar(projetoId: number, campo: keyof ValorLinha, valor: string) {
    setSalvo(null)
    setValores((v) => ({ ...v, [projetoId]: { ...v[projetoId], [campo]: valor } }))
  }

  async function salvar() {
    try {
      setSalvando(true)
      setSalvo(null)
      setErroSalvar(null)
      const resposta = await lancamentosService.salvarSemana({
        semanaInicio: semana,
        itens: projetos.map((p) => {
          const descricao = valores[p.id]?.descricao.trim()
          return {
            projetoId: p.id,
            horas: Number(valores[p.id]?.horas) || 0,
            ...(descricao ? { descricao } : {}),
          }
        }),
      })
      setValores(montarValores(projetos, resposta?.itens ?? []))
      setSalvo(resposta?.totalHoras ?? 0)
    } catch (e) {
      setErroSalvar(e instanceof Error ? e.message : 'Erro ao salvar a semana')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <section>
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Registrar horas</h1>
        <div className="mt-4">
          <SeletorSemana
            semana={semana}
            onAnterior={() => setSearchParams({ semana: deslocarSemana(semana, -1) })}
            onProxima={() => setSearchParams({ semana: deslocarSemana(semana, 1) })}
            onHoje={() => setSearchParams({ semana: semanaAtual() })}
          />
        </div>
      </header>

      {carregando && <p className="py-10 text-center text-[#A5AED8]">Carregando horas...</p>}

      {erro && !carregando && (
        <div role="alert" className="flex flex-col items-start gap-4">
          <p className="text-red-500">{erro}</p>
          <Button onClick={() => setTentativa((t) => t + 1)}>Tentar de novo</Button>
        </div>
      )}

      {!carregando && !erro && projetos.length === 0 && (
        <p className="py-10 text-center text-[#A5AED8]">
          Você não tem projetos ou atividades nesta semana.
        </p>
      )}

      {!carregando && !erro && projetos.length > 0 && (
        <div className="flex flex-col gap-4">
          <GradeSemanalHoras
            linhas={projetos}
            valores={valores}
            disabled={salvando}
            onChange={alterar}
          />
          {erroSalvar && (
            <p role="alert" className="text-sm text-red-500">
              {erroSalvar}
            </p>
          )}
          {salvo !== null && (
            <p role="status" className="text-sm text-green-400">
              Semana salva. Total registrado: {salvo}h.
            </p>
          )}
          <button
            type="button"
            onClick={salvar}
            disabled={salvando}
            className="w-full self-center rounded-lg bg-[#609DDD] px-8 py-3 font-semibold text-white transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-end"
          >
            {salvando ? 'Salvando...' : 'Salvar semana'}
          </button>
        </div>
      )}
    </section>
  )
}
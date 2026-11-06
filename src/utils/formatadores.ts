import type { Papel } from '../types/auth'

const nomesPapel: Record<Papel, string> = {
  ADMIN: 'Admin',
  GERENTE: 'Gerente',
  COLABORADOR: 'Colaborador',
}

export const formatarPapel = (papel: Papel) => nomesPapel[papel]

//40 -> "40h" | 7.5 -> "7,5h"
export const formatarHoras = (horas: number) =>
  `${horas.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}h`

//76.4 -> "76%"
export const formatarPercentual = (valor: number) => `${Math.round(valor)}%`

// "2026-11-02" -> "02/11/2026"
export const formatarData = (data: string) => {
  const [ano, mes, dia] = data.slice(0, 10).split('-')
  return `${dia}/${mes}/${ano}`
}

//Rótulos da API
export type RotuloOcupacao = 'SOBRECARREGADO' | 'NORMAL' | 'DISPONIVEL'
export type RotuloSaude = 'NO_PRAZO' | 'EM_RISCO' | 'ATRASADO'
export type RotuloHoras = 'OK' | 'ATENCAO' | 'ESTOURADO'
export type Rotulo = RotuloOcupacao | RotuloSaude | RotuloHoras

export type CorRotulo = 'green' | 'orange' | 'cyan' | 'red'

const rotulos: Record<Rotulo, { texto: string; cor: CorRotulo }> = {
  SOBRECARREGADO: { texto: 'Sobrecarregado', cor: 'red' },
  NORMAL: { texto: 'Normal', cor: 'green' },
  DISPONIVEL: { texto: 'Disponível', cor: 'cyan' },

  NO_PRAZO: { texto: 'No prazo', cor: 'green' },
  EM_RISCO: { texto: 'Em risco', cor: 'orange' },
  ATRASADO: { texto: 'Atrasado', cor: 'red' },

  OK: { texto: 'OK', cor: 'green' },
  ATENCAO: { texto: 'Atenção', cor: 'orange' },
  ESTOURADO: { texto: 'Estourado', cor: 'red' },
}
export const infoRotulo = (rotulo: Rotulo) => rotulos[rotulo]
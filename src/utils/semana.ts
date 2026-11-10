const MS_DIA = 24 * 60 * 60 * 1000

function paraUTC(data: string): Date {
  const [ano, mes, dia] = data.slice(0, 10).split('-').map(Number)
  return new Date(Date.UTC(ano, mes - 1, dia))
}

function paraTexto(d: Date): string {
  const ano = d.getUTCFullYear()
  const mes = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dia = String(d.getUTCDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

export function hoje(): string {
  const n = new Date()
  const mes = String(n.getMonth() + 1).padStart(2, '0')
  const dia = String(n.getDate()).padStart(2, '0')
  return `${n.getFullYear()}-${mes}-${dia}`
}

export function segundaDaSemana(data?: string | null): string {
  const valida = data && /^\d{4}-\d{2}-\d{2}/.test(data) ? data : hoje()
  const base = paraUTC(valida)
  const diff = (base.getUTCDay() + 6) % 7
  return paraTexto(new Date(base.getTime() - diff * MS_DIA))
}

export const semanaAtual = (): string => segundaDaSemana()

export function deslocarSemana(data: string, semanas: number): string {
  return paraTexto(new Date(paraUTC(data).getTime() + semanas * 7 * MS_DIA))
}
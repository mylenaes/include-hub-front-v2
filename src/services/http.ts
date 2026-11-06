const API_URL = import.meta.env.VITE_API_URL

export class HttpError extends Error {
  status: number
  campos?: Record<string, string>

  constructor(status: number, mensagem: string, campos?: Record<string, string>) {
    super(mensagem)
    this.status = status
    this.campos = campos
  }
}

export const api = {
  async chamar<T>(metodo: string, caminho: string, dados?: unknown): Promise<T> {
    const token = sessionStorage.getItem('token')
    const resposta = await fetch(API_URL + caminho, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: dados ? JSON.stringify(dados) : undefined,
    })

    if (!resposta.ok) {
      if (resposta.status === 401 && caminho !== '/auth/login') {
        sessionStorage.clear()
        window.location.href = '/login'
      }
      const corpo = await resposta.json().catch(() => null)
      throw new HttpError(
        resposta.status,
        corpo?.mensagem ?? `Erro ${resposta.status}: Falha na requisição`,
        corpo?.erros,
      )
    }return resposta.json().catch(() => null)
  },

  get: <T>(caminho: string) => api.chamar<T>('GET', caminho),
  post: <T>(caminho: string, dados?: unknown) => api.chamar<T>('POST', caminho, dados),
  put: <T>(caminho: string, dados: unknown) => api.chamar<T>('PUT', caminho, dados),
  patch: <T>(caminho: string, dados: unknown) => api.chamar<T>('PATCH', caminho, dados),
  delete: <T>(caminho: string) => api.chamar<T>('DELETE', caminho),
}
export interface DetalheErro {
  campo: string
  mensagem: string
}

export interface ErroApi {
  erro: string
  detalhes?: DetalheErro[]
}
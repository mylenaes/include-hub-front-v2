export type RotuloOcupacao = 'SOBRECARREGADO' | 'NORMAL' | 'DISPONIVEL'
export type RotuloSaude = 'NO_PRAZO' | 'EM_RISCO' | 'ATRASADO'
export type RotuloHoras = 'OK' | 'ATENCAO' | 'ESTOURADO'
export type RotuloSituacao = 'ENVIADO' | 'PENDENTE'
export type Rotulo = RotuloOcupacao | RotuloSaude | RotuloHoras | RotuloSituacao

export type CorRotulo = 'green' | 'orange' | 'cyan' | 'red'
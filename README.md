# Include Hub: Front-end

Sistema de **alocação de pessoas e lançamento de horas** para projetos. Mostra ocupação, disponibilidade e saúde dos projetos, com uma visão diferente para cada papel: **Admin**, **Gerente** e **Colaborador**.

O back-end é uma API REST em TypeScript + Express (repositório separado). Este repositório contém apenas o front.

## Stack
- React + Vite + TypeScript
- React Router
- Tailwind CSS
- `fetch` nativo (cliente em `src/services/http.ts`)
- Context API (usuário logado)

## Requisitos
- Node.js 20 ou superior
- Back-end do Include Hub rodando (veja a seção de integração)

## Como rodar
```bash
npm install
```

Crie o arquivo `.env.local` na raiz do projeto:

```
VITE_API_URL=http://localhost:3000/api
```

A URL deve terminar em `/api`, porque os services chamam caminhos como `/projetos` e `/auth/login`. Depois de alterar o `.env.local`, reinicie o servidor.

```bash
npm run dev
```

Acesse http://localhost:5173

## Alguns Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |

## Funcionalidades por papel
| Tela | Admin | Gerente | Colaborador |
| --- | --- | --- | --- |
| Dashboard | sim | sim | sim |
| Projetos (lista e cadastro) | todos | os que gerencia | onde está alocado |
| Equipe (cadastro de membro) | sim | sua equipe | não |
| Alocações | sim (aloca) | nos seus projetos | não |
| Saúde dos projetos | não | sim | não |
| Registrar horas | não | sim | sim |
| Horas (consulta) | sim | não | não |
| Disponibilidade | todos | sua equipe | só a própria |

As permissões são aplicadas no back. O front apenas esconde o que o papel não pode usar.

## Estrutura das pastas

```
src/
├── pages/        telas (buscam dados e controlam modais)
├── components/   ui, layout, dashboard, equipe, saude, lancamentos...
├── services/     um arquivo por módulo do back (único lugar com URLs)
├── context/      AuthContext (usuário logado)
├── utils/        semana (UTC), formatadores, menu por papel
├── types/        tipos das respostas da API e dos rótulos
├── App.tsx       rotas e proteção por papel
└── main.tsx
```

## Decisões de arquitetura
- **O back decide, o front exibe.** Ocupação, rótulos (`SOBRECARREGADO`, `NO_PRAZO`...), alertas e permissões vêm prontos da API. O front só mapeia rótulo para texto e cor (`utils/formatadores.ts`).
- **Páginas orquestram, components desenham, services falam com a API.** Components não chamam `fetch`.
- **Datas como texto `AAAA-MM-DD`, métodos UTC.** Evita que o fuso (UTC-3) mude o dia da semana. A semana é sempre a segunda-feira e fica na URL (`?semana=`).
- **Erros em formato único:** `{ erro, detalhes?: [{ campo, mensagem }] }`. Erros por campo aparecem nos inputs, e regras de negócio aparecem em banner.
- **Autenticação:** JWT de 8 horas no `sessionStorage`, sem refresh token.

### Risco aceito nesse MVP
O token no `sessionStorage` pode ser lido por qualquer script da página (XSS). Mitigações: sem `dangerouslySetInnerHTML`, sem scripts de terceiros e dependências mínimas. A melhoria futura é migrar para cookie `httpOnly`, o que exige configuração de CORS e cookies no back.

## O que ficou fora do MVP
- Estouro de horas (80% e 100%) e barra de horas dos projetos.
- Detalhe do projeto com histórico de status (`/projetos/:id`) e edição/desativação.
- Troca de senha, refresh token e exportação de relatórios em PDF.

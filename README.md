# Teste Tecnico - Full Stack (SuperSign)

Repositorio da solucao para o teste tecnico da SuperSign.
A solucao entrega uma API em Node.js + Fastify + Prisma + PostgreSQL e uma interface web em Next.js para gerenciamento de documentos.

## Stack

- Backend: Node.js, TypeScript, Fastify, Prisma, PostgreSQL, Zod, Vitest, Supertest
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Axios, react-hot-toast
- Arquitetura: Clean Architecture (domain, application, infra, presentation)

#### Backend
- `POST /documents`: cria documento
- `GET /documents`: lista documentos (com paginação e busca)
- `PATCH /documents/:id`: atualiza status do documento
- `DELETE /documents/:id`: remove documento

- Entidade Documento:
  - `id`
  - `titulo`
  - `descricao`
  - `status` (`PENDENTE`, `ASSINADO`)
  - `criado_em`

- Validacao de entrada com Zod
- Tratamento de erros e respostas padronizadas

### Frontend

- Listagem de documentos em tabela
- Criacao de documento via modal
- Atualizacao de status via select
- Exclusao com modal de confirmacao
- Busca por titulo/descricao
- Paginacao na lista

### Arquitetura e Decisoes Tecnicas

O backend segue separacao por camadas:
- `domain`: entidades e contratos (interfaces)
- `application`: use cases e DTOs
- `infra`: implementacao do repositorio com Prisma
- `presentation`: controllers, rotas e adaptacao HTTP

Principais pontos:
- uso de DTO + Zod para validacao de entrada
- uso de repository pattern para desacoplamento
- respostas HTTP consistentes e tratamento de erro padronizado
- Swagger em `/docs` para documentacao da API

### Qualidade e Testes

- testes unitarios de use cases
- testes de integracao dos endpoints
- build e testes validados em backend e frontend

### Diferenciais aplicados

- Clean Architecture / separacao domain e infra
- DTOs e validacao robusta
- testes automatizados
- boas praticas REST
- Swagger/OpenAPI

## Como rodar

### Pre-requisitos

- Node.js 18+
- Docker e Docker Compose

### 1. Banco (PostgreSQL)

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

Backend roda em `http://localhost:3000`.
Swagger UI: `http://localhost:3000/docs`.

### 3. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend roda em `http://localhost:3001`.

## Testes

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

## Observacoes

- Nao inclui autenticacao (fora do escopo do teste).
- Nao inclui deploy (fora do escopo do teste).


<img width="1658" height="896" alt="image" src="https://github.com/user-attachments/assets/e33e2d4b-a473-408f-a676-e190b981081f" />
<img width="1702" height="675" alt="image" src="https://github.com/user-attachments/assets/0fc57554-fcbb-432a-beee-5f10f968ee61" />


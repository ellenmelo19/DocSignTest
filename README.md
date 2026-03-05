# Teste Tecnico - Full Stack (SuperSign)

Repositorio da solucao para o teste tecnico da SuperSign.

## Stack

- Backend: Node.js, TypeScript, Fastify, Prisma, PostgreSQL, Zod, Vitest, Supertest
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Axios, react-hot-toast
- Arquitetura: Clean Architecture (domain, application, infra, presentation)

## Requisitos Atendidos

### Backend

- Entidade Documento:
  - `id`
  - `titulo`
  - `descricao`
  - `status` (`PENDENTE`, `ASSINADO`)
  - `criado_em`
- Endpoints:
  - `POST /documents` (criar)
  - `GET /documents` (listar)
  - `PATCH /documents/:id` (atualizar status)
  - `DELETE /documents/:id` (deletar)
- Validacao de entrada com Zod
- Tratamento basico de erros e respostas padronizadas

### Frontend

- Listagem de documentos em tabela
- Criacao de documento via modal
- Atualizacao de status via select
- Exclusao com modal de confirmacao
- Busca por titulo/descricao
- Paginacao na lista

## Diferenciais

- Separacao de responsabilidades por camadas
- DTOs para validacao e contrato
- Testes unitarios e de integracao
- Boas praticas REST (status codes e contratos consistentes)

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

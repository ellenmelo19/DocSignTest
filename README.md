# Teste Técnico - Desenvolvedor(a) Full Stack | SuperSign

Repositório da solução para o teste técnico da SuperSign (plataforma de assinatura digital acelerada pelo Google Startups).

**Autor:** Ellen de Oliveira  

## Objetivo do Desafio

Criar uma pequena API (backend) + interface web (frontend) para gerenciamento de documentos, atendendo exatamente aos requisitos do teste.

### Tecnologias Utilizadas

**Backend**
- Node.js + TypeScript
- Fastify (framework leve e performático)
- Prisma ORM + PostgreSQL
- Zod (validação de DTOs)
- Vitest + Supertest (testes unitários e de integração)
- Docker Compose (infraestrutura do banco)

**Frontend**
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Headless UI + Heroicons
- Axios + react-hot-toast

**Arquitetura Geral**
- Clean Architecture / Hexagonal (separação domain / application / infra / presentation)
- Monorepo (backend + frontend no mesmo repositório)

## Como Rodar o Projeto (Passo a Passo)

### Pré-requisitos
- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clonar o repositório
```bash
git clone https://github.com/ellenmelo19/DocSignTest.git
cd DocSignTest
```
### 2. Rodar o banco PostgreSQL (é preciso Docker)
```bash
docker compose up -d
```
### 3. Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```
### 4. Frontend
Em outro terminal:
```bash
cd ../frontend
npm install
npm run dev
```
Acesse http://localhost:3000 para ver a interface

### 5. Testes (Backend)
```bash
cd backend
npm test
```
ou

```bash
npm run test:coverage
```
para ver a cobertura de código.

# Atendimento aos Requisitos do Teste
## 1. Objetivo Geral
* API + interface web para gerenciar documentos (criar, listar, atualizar status, deletar)

## 2. Backend (Node.js + Fastify)

* Entidade Document:
  
   Campos: id (uuid), titulo, descricao, status (enum PENDENTE/ASSINADO), criado_em (default now)
  
* Endpoints obrigatórios (todos implementados com REST correto):
  
  POST /documents → Criar
  
  GET /documents → Listar (ordenado por criado_em desc)
  
  PATCH /documents/:id → Atualizar status
  
  DELETE /documents/:id → Deletar (204 No Content)

* Banco PostgreSQL + Prisma → ✅ (migrações, client gerado, queries tipadas)

## 3. Frontend (Next.js)

* Listar documentos (tabela responsiva com Tailwind)
* Criar documento (modal com Headless UI + form validado)
* Alterar status (dropdown na tabela com atualização imediata)
* Interface simples mas profissional (cores por status, toasts de feedback, loading state, mensagens de vazio)

## 4. Critérios de Avaliação – Obrigatórios

- Organização de pastas → Estrutura clara e separada (monorepo com /backend e /frontend)
- Separação de responsabilidades → Clean Architecture completa (domain, application, infra, presentation)
- Uso correto do Prisma → Model com enum, uuid, migrações, repository pattern
- Tratamento básico de erros → Try/catch, Zod validation, responses padronizadas {success, data/error}

## 5. Diferenciais Implementados

- Arquitetura Limpa / Hexagonal → Camadas independentes:
- domain: entidades + interfaces de repositório
- application: use cases + DTOs com validação
- infra: implementação Prisma + controllers
- presentation: rotas Fastify + server

- Separação domain / infra → Repository abstrato + implementação concreta
- Uso de DTOs → Interfaces tipadas + Zod schemas (backend) para validação forte de inputs
- Testes automatizados →
  
  Unitários (Vitest): use cases mockando repositório
  
  Integração (Supertest): endpoints reais com banco

- Boas práticas REST →
  
  Status codes corretos (201, 200, 204, 400, 404, 500)
  
  Respostas consistentes { success: boolean, data | error }
  
  CORS configurado corretamente

## 6. O que NÃO foi feito (conforme especificado)

- Sistema de autenticação
- Deploy da aplicação
- Design avançado ou sofisticado (mantido simples, mas limpo e acessível)

# Decisões de Design e Porquês

* Por que Clean Architecture?
  
Independência de frameworks (fácil trocar Fastify/Prisma no futuro), testabilidade alta, foco na regra de negócio no centro.

* Por que Zod no backend?
  
Validação declarativa, mensagens claras, integração nativa com TypeScript.

* Por que Headless UI no frontend?
  
Componentes acessíveis e customizáveis sem CSS pesado.

* Por que Docker para o banco?
  
Ambiente reproduzível, isolamento, diferencial de infra (como pedido no anúncio da vaga).

## Próximos Passos (se fosse produção)

Adicionar autenticação JWT

Paginação na lista

Busca/filtro

Deploy (Vercel para frontend + Railway/Fly.io para backend + banco)

Obrigada pela oportunidade!
Qualquer dúvida, estou à disposição.
Ellen de Oliveira


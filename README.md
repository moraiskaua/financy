# 💰 Financy - Gestão de Finanças Pessoais

![Node](https://img.shields.io/badge/node-20.x-green.svg)
![React](https://img.shields.io/badge/react-19.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)

## 🎯 Sobre o Projeto

**Financy** é uma aplicação web full-stack para gestão de finanças pessoais que permite aos usuários:

- Criar uma conta segura com autenticação JWT
- Organizar transações financeiras em categorias personalizadas
- Registrar receitas e despesas
- Visualizar e filtrar transações por categoria e período
- Gerenciar perfil de usuário

O projeto foi desenvolvido utilizando as melhores práticas de engenharia de software, incluindo arquitetura MVVM no frontend, TypeScript para type-safety, GraphQL para API flexível e Docker para facilitar o deployment.

## ✨ Funcionalidades

### 🔐 Autenticação e Autorização
- ✅ Registro de novos usuários com validação de dados
- ✅ Login seguro com JWT (JSON Web Tokens)
- ✅ Proteção de rotas privadas
- ✅ Atualização de perfil do usuário
- ✅ Logout com limpeza de sessão

### 📊 Gestão de Transações
- ✅ Criar transações de receita ou despesa
- ✅ Editar transações existentes
- ✅ Excluir transações
- ✅ Visualizar lista completa de transações
- ✅ Filtrar transações por categoria
- ✅ Ordenação por data

### 🏷️ Categorias Personalizadas
- ✅ Criar categorias customizadas
- ✅ Editar nome, descrição, ícone e cor das categorias
- ✅ Excluir categorias (com validação de transações vinculadas)
- ✅ Organizar transações por categoria

### 💼 Dashboard
- ✅ Visão geral das finanças
- ✅ Navegação intuitiva entre funcionalidades
- ✅ Interface responsiva e moderna

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19.2.0** - Biblioteca para construção de interfaces
- **TypeScript 5.9.3** - Superset JavaScript com tipagem estática
- **Vite 7.2.4** - Build tool moderna e rápida
- **Apollo Client 4.0.11** - Cliente GraphQL com cache inteligente
- **React Router DOM 7.11.0** - Roteamento SPA
- **React Hook Form 7.70.0** - Gerenciamento de formulários
- **Zod 4.3.5** - Validação de schemas TypeScript-first
- **TailwindCSS 4.1.18** - Framework CSS utility-first
- **Lucide React 0.562.0** - Biblioteca de ícones
- **TanStack React Query 5.90.16** - Data fetching e cache

### Backend
- **Node.js 20** - Runtime JavaScript
- **TypeScript 5.9.3** - Desenvolvimento type-safe
- **Apollo Server 5.2.0** - Servidor GraphQL
- **Prisma 5.22.0** - ORM type-safe para banco de dados
- **SQLite** - Banco de dados relacional leve
- **JWT** - Autenticação segura com tokens
- **bcryptjs** - Hash de senhas

### DevOps
- **Docker & Docker Compose** - Containerização da aplicação
- **Nginx** - Servidor web para frontend em produção
- **Multi-stage builds** - Otimização de imagens Docker
- **Alpine Linux** - Imagens Docker otimizadas e seguras

## 🏗️ Arquitetura

### Frontend - MVVM (Model-View-ViewModel)

O frontend segue o padrão MVVM para separação clara de responsabilidades:

```
features/
├── auth/
│   ├── login.view.tsx          # View: Componente visual
│   ├── use-login.model.tsx     # Model: Lógica e GraphQL
│   └── login.view-model.tsx     # ViewModel: Conecta Model e View
```

- **View**: Componentes React puros focados apenas em renderização
- **Model**: Hooks customizados com lógica de negócio e chamadas GraphQL
- **ViewModel**: Conecta Model e View, gerencia eventos

### Backend - GraphQL + Prisma

```
backend/
├── src/
│   ├── graphql/
│   │   ├── typeDefs/            # Schemas GraphQL
│   │   └── resolvers/            # Resolvers com lógica de negócio
│   ├── config/                  # Configurações (Prisma, etc)
│   └── utils/                    # Utilidades (auth, errors)
```

### Fluxo de Dados

```
┌─────────────┐      GraphQL       ┌──────────────┐      Prisma      ┌──────────┐
│   React     │ ◄─────────────────►│ Apollo       │ ◄───────────────►│ SQLite   │
│   Frontend  │   Apollo Client    │ Server       │   ORM            │ Database │
└─────────────┘                    └──────────────┘                  └──────────┘
      │                                    │
      │                                    │
      └─────── JWT Authentication ─────────┘
```

## 📦 Pré-requisitos

### Para executar com Docker (Recomendado)
- Docker 20.x ou superior
- Docker Compose 2.x ou superior

### Para desenvolvimento local
- Node.js 20.x ou superior
- npm 10.x ou superior

## 🔧 Instalação e Execução

### Usando Docker (Recomendado)

Esta é a forma mais simples de executar o projeto completo em produção.

#### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd financy
```

#### 2. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env e adicione um JWT_SECRET seguro
# Gere um secret com: openssl rand -base64 32
nano .env
```

#### 3. Execute com Docker Compose
```bash
# Build e start de todos os serviços
docker-compose up -d

# Acompanhe os logs (opcional)
docker-compose logs -f
```

#### 4. Acesse a aplicação
- **Frontend**: http://localhost (porta 80)
- **Backend GraphQL**: http://localhost:4000

🎉 Pronto! A aplicação está rodando em containers Docker!

#### 5. Credenciais de Acesso (Dados Demo)

A aplicação já vem com dados de demonstração pré-carregados:

```
Email: demo@financy.com
Senha: demo123
```

**O que está incluído nos dados demo:**
- ✅ 1 usuário pronto para usar
- ✅ 8 categorias pré-configuradas (Alimentação, Transporte, Mercado, Investimento, Entretenimento, Utilidades, Salário, Saúde)
- ✅ 29 transações de exemplo dos últimos 35 dias
- ✅ Exemplos de receitas e despesas variadas

> **Nota**: Você também pode criar sua própria conta clicando em "Criar conta" na tela de login.

#### 6. Comandos úteis do Docker
```bash
# Parar os serviços
docker-compose down

# Parar e remover volumes (limpa o banco de dados)
docker-compose down -v

# Rebuild das imagens
docker-compose up -d --build

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Acessar o shell de um container
docker-compose exec backend sh
docker-compose exec frontend sh
```

### Desenvolvimento Local

Para desenvolvimento local sem Docker:

#### 1. Clone e configure o backend
```bash
cd backend

# Copie as variáveis de ambiente
cp .env.example .env

# Instale as dependências
npm install

# Gere o Prisma Client
npx prisma generate

# Execute as migrations
npx prisma migrate dev

# (Opcional) Popule o banco com dados de exemplo
npm run seed

# Inicie o servidor
npm run dev
```

O backend estará disponível em http://localhost:4000

#### 2. Configure e execute o frontend
```bash
cd frontend

# Copie as variáveis de ambiente
cp .env.example .env

# Instale as dependências
npm install

# Inicie o dev server
npm run dev
```

## 📁 Estrutura do Projeto

```
financy/
├── frontend/                        # Aplicação React
│   ├── src/
│   │   ├── features/               # Features organizadas em MVVM
│   │   │   ├── auth/               # Autenticação (Login/Register)
│   │   │   ├── dashboard/          # Dashboard principal
│   │   │   ├── transactions/       # Gestão de transações
│   │   │   ├── categories/         # Gestão de categorias
│   │   │   └── profile/            # Perfil do usuário
│   │   ├── components/             # Componentes reutilizáveis
│   │   │   └── ui/                  # Componentes UI base
│   │   ├── graphql/                # Queries e Mutations GraphQL
│   │   ├── config/                 # Configurações (Apollo Client)
│   │   ├── types/                  # Tipos TypeScript
│   │   └── utils/                   # Funções utilitárias
│   ├── Dockerfile                  # Dockerfile para produção
│   ├── nginx.conf                  # Configuração Nginx
│   └── package.json
│
├── backend/                         # API GraphQL
│   ├── src/
│   │   ├── graphql/
│   │   │   ├── typeDefs/           # Schemas GraphQL
│   │   │   │   ├── user.typeDefs.ts
│   │   │   │   ├── category.typeDefs.ts
│   │   │   │   └── transaction.typeDefs.ts
│   │   │   └── resolvers/           # Resolvers
│   │   │       ├── auth.resolver.ts
│   │   │       ├── category.resolver.ts
│   │   │       └── transaction.resolver.ts
│   │   ├── config/
│   │   │   └── database.ts          # Configuração Prisma
│   │   ├── utils/
│   │   │   ├── auth.ts             # JWT e password hashing
│   │   │   └── error-handler.ts    # Tratamento de erros
│   │   ├── types/
│   │   │   └── context.ts          # Tipos do Context GraphQL
│   │   └── main.ts                  # Entry point do servidor
│   ├── prisma/
│   │   ├── schema.prisma           # Schema do banco de dados
│   │   └── migrations/             # Migrations Prisma
│   ├── Dockerfile                  # Dockerfile para produção
│   └── package.json
│
├── docker-compose.yml               # Orquestração dos serviços
├── .env.example                     # Exemplo de variáveis de ambiente
└── README.md                        # Este arquivo
```

## 🔐 Variáveis de Ambiente

### Raiz do Projeto (.env)
```env
# JWT Secret - OBRIGATÓRIO
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### Backend (backend/.env)
```env
# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server
PORT=4000
NODE_ENV=development
```

### Frontend (frontend/.env)
```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:4000
```

## 🔌 API GraphQL

### Endpoints Principais

**Base URL**: http://localhost:4000

#### Autenticação
```graphql
# Registro
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    token
    user { id name email }
  }
}

# Login
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user { id name email }
  }
}
```

#### Categorias
```graphql
# Listar categorias
query GetCategories {
  categories {
    id name description icon color
  }
}

# Criar categoria
mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    id name description icon color
  }
}
```

#### Transações
```graphql
# Listar transações
query GetTransactions($categoryId: ID) {
  transactions(categoryId: $categoryId) {
    id description amount type createdAt
    category { id name icon color }
  }
}

# Criar transação
mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    id description amount type
  }
}
```
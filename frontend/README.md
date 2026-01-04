# Financy Frontend

Aplicação React para gerenciamento de finanças pessoais desenvolvida com TypeScript, GraphQL e Vite.

## Tecnologias

- React 19
- TypeScript
- Vite
- GraphQL (Apollo Client)
- TailwindCSS
- React Hook Form
- Zod
- React Router DOM
- Lucide React

## Arquitetura

Este projeto segue o padrão **MVVM (Model-View-ViewModel)** com organização por features.

```
src/features/[feature-name]/
├── [feature].view.tsx          # Componente visual puro (UI)
├── use-[feature].model.tsx     # Hook com lógica de negócio e estado
├── [feature].view-model.tsx    # Conector que injeta o Model na View
└── [feature].schema.ts         # Validação com Zod (se aplicável)
```

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para mais detalhes sobre os padrões adotados.

## Funcionalidades Implementadas

### Autenticação
- [x] Login de usuário
- [x] Cadastro de novo usuário (Register)
- [x] Proteção de rotas (Redirecionamento se não autenticado)
- [x] Logout

### Transações
- [x] Listar todas as transações
- [x] Criar nova transação (Receita ou Despesa)
- [x] Editar transação existente
- [x] Deletar transação
- [x] Filtro por categoria (via criação/edição)

### Categorias
- [x] Listar todas as categorias
- [x] Criar nova categoria
- [x] Editar categoria existente
- [x] Deletar categoria

### Dashboard
- [x] Visão geral do usuário logado
- [x] Navegação entre Transações e Categorias

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```bash
VITE_BACKEND_URL=http://localhost:4000
```

## Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Build

Para compilar o projeto para produção:

```bash
npm run build
```

## Estrutura de Rotas

- `/login` - Tela de Login
- `/register` - Tela de Cadastro
- `/` - Redireciona para `/transactions` se logado
- `/transactions` - Gerenciamento de Transações
- `/categories` - Gerenciamento de Categorias

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/            # Componentes reutilizáveis (Button, Input, Select)
│   │   └── ...            # Outros componentes (ProtectedRoute)
│   ├── config/            # Configuração do Apollo Client
│   ├── features/          # Funcionalidades (MVVM)
│   │   ├── auth/
│   │   │   ├── login/     # Feature de Login
│   │   │   └── register/  # Feature de Register
│   │   ├── categories/    # Feature de Categorias
│   │   ├── dashboard/     # Layout do Dashboard
│   │   └── transactions/  # Feature de Transações
│   ├── graphql/           # Definições de Queries e Mutations
│   ├── types/             # Definições de Tipos Globais
│   └── utils/             # Utilitários (cn, auth)
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Licença

ISC
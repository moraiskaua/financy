# Financy Frontend

Aplicação React para gerenciamento de finanças pessoais desenvolvida com TypeScript, GraphQL e Vite.

## Tecnologias

- React 18
- TypeScript
- Vite
- GraphQL (Apollo Client)
- TailwindCSS
- Shadcn UI
- React Hook Form
- Zod
- React Router DOM

## Arquitetura

Este projeto segue o padrão **MVVM (Model-View-ViewModel)** com organização por features.

```
src/features/[feature-name]/
├── [feature].view.tsx          # Componente visual puro
├── use-[feature].model.tsx     # Hook com lógica de negócio
├── [feature].view-model.tsx    # Conecta Model e View
└── [feature].schema.ts         # Validação com Zod
```

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para mais detalhes.

## Funcionalidades

### Autenticação
- [x] O usuário pode criar uma conta e fazer login
- [ ] O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele

### Transações
- [ ] Deve ser possível criar uma transação
- [ ] Deve ser possível deletar uma transação
- [ ] Deve ser possível editar uma transação
- [ ] Deve ser possível listar todas as transações

### Categorias
- [ ] Deve ser possível criar uma categoria
- [ ] Deve ser possível deletar uma categoria
- [ ] Deve ser possível editar uma categoria
- [ ] Deve ser possível listar todas as categorias

### Requisitos Técnicos
- [x] É obrigatória a criação de uma aplicação React usando GraphQL para consultas na API e Vite como bundler
- [ ] Siga o mais fielmente possível o layout do Figma

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

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Build

```bash
npm run build
```

## Páginas

- `/` - Login (se deslogado) ou Dashboard (se logado)
- `/register` - Cadastro de novo usuário
- `/dashboard` - Dashboard principal com transações
- `/categories` - Gerenciamento de categorias
- `/transactions` - Gerenciamento de transações

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   └── ui/            # Componentes Shadcn UI
│   ├── config/
│   │   └── apollo-client.ts
│   ├── features/
│   │   ├── auth/          # Autenticação
│   │   ├── dashboard/     # Dashboard
│   │   ├── categories/    # Categorias
│   │   └── transactions/  # Transações
│   ├── graphql/           # Queries e Mutations
│   ├── types/             # TypeScript types
│   └── utils/             # Utilitários
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Licença

ISC

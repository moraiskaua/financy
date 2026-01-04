# Financy Backend

API GraphQL para gerenciamento de finanças pessoais desenvolvida com TypeScript, Apollo Server e Prisma.

## Tecnologias

- TypeScript
- GraphQL (Apollo Server)
- Prisma ORM
- SQLite
- JWT (JSON Web Tokens)
- bcryptjs

## Funcionalidades

- [x] O usuário pode criar uma conta e fazer login
- [x] O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [x] Deve ser possível criar uma transação
- [x] Deve ser possível deletar uma transação
- [x] Deve ser possível editar uma transação
- [x] Deve ser possível listar todas as transações
- [x] Deve ser possível criar uma categoria
- [x] Deve ser possível deletar uma categoria
- [x] Deve ser possível editar uma categoria
- [x] Deve ser possível listar todas as categorias

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
```

## Migrations

Execute as migrations do banco de dados:

```bash
npm run prisma:migrate
```

## Desenvolvimento

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:4000`

## Build

Para compilar o projeto:

```bash
npm run build
```

## Produção

Para executar em produção:

```bash
npm start
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa o servidor compilado
- `npm run prisma:generate` - Gera o Prisma Client
- `npm run prisma:migrate` - Executa as migrations do banco de dados
- `npm run prisma:studio` - Abre o Prisma Studio para visualizar o banco de dados

## Estrutura do Projeto

```
backend/
├── prisma/
│   ├── migrations/        # Migrations do banco de dados
│   └── schema.prisma      # Schema do Prisma
├── src/
│   ├── config/
│   │   └── database.ts    # Configuração do Prisma Client
│   ├── graphql/
│   │   ├── resolvers/     # Resolvers do GraphQL
│   │   │   ├── auth.resolver.ts
│   │   │   ├── category.resolver.ts
│   │   │   ├── transaction.resolver.ts
│   │   │   └── index.ts
│   │   └── typeDefs/      # Type definitions do GraphQL
│   │       └── index.ts
│   ├── types/
│   │   └── context.ts     # Tipos TypeScript
│   ├── utils/
│   │   └── auth.ts        # Utilitários de autenticação
│   └── main.ts            # Ponto de entrada da aplicação
├── .env                   # Variáveis de ambiente (não versionado)
├── .env.example           # Exemplo de variáveis de ambiente
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## API GraphQL

### Autenticação

#### Register
```graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    token
    user {
      id
      email
      createdAt
      updatedAt
    }
  }
}
```

#### Login
```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      email
      createdAt
      updatedAt
    }
  }
}
```

#### Me
```graphql
query Me {
  me {
    id
    email
    createdAt
    updatedAt
  }
}
```

### Categorias

#### Listar Categorias
```graphql
query Categories {
  categories {
    id
    name
    createdAt
    updatedAt
  }
}
```

#### Criar Categoria
```graphql
mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    id
    name
    createdAt
    updatedAt
  }
}
```

#### Atualizar Categoria
```graphql
mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
  updateCategory(id: $id, input: $input) {
    id
    name
    createdAt
    updatedAt
  }
}
```

#### Deletar Categoria
```graphql
mutation DeleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
```

### Transações

#### Listar Transações
```graphql
query Transactions {
  transactions {
    id
    description
    amount
    type
    category {
      id
      name
    }
    createdAt
    updatedAt
  }
}
```

#### Criar Transação
```graphql
mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    id
    description
    amount
    type
    categoryId
    createdAt
    updatedAt
  }
}
```

#### Atualizar Transação
```graphql
mutation UpdateTransaction($id: ID!, $input: UpdateTransactionInput!) {
  updateTransaction(id: $id, input: $input) {
    id
    description
    amount
    type
    categoryId
    createdAt
    updatedAt
  }
}
```

#### Deletar Transação
```graphql
mutation DeleteTransaction($id: ID!) {
  deleteTransaction(id: $id)
}
```

## Autenticação

Para acessar endpoints protegidos, inclua o token JWT no header `Authorization`:

```
Authorization: Bearer <seu-token-jwt>
```

## Licença

ISC

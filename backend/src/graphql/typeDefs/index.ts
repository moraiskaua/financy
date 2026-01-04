export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    id: ID!
    name: String!
    userId: String!
    createdAt: String!
    updatedAt: String!
  }

  type Transaction {
    id: ID!
    description: String!
    amount: Float!
    type: String!
    categoryId: String!
    category: Category!
    userId: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String!
  }

  input CreateTransactionInput {
    description: String!
    amount: Float!
    type: String!
    categoryId: String!
  }

  input UpdateTransactionInput {
    description: String
    amount: Float
    type: String
    categoryId: String
  }

  type Query {
    me: User
    categories: [Category!]!
    category(id: ID!): Category
    transactions: [Transaction!]!
    transaction(id: ID!): Transaction
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!

    createCategory(input: CreateCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!

    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(id: ID!, input: UpdateTransactionInput!): Transaction!
    deleteTransaction(id: ID!): Boolean!
  }
`;

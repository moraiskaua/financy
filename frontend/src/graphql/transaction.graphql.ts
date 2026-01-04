import { gql } from '@apollo/client';

export const GET_TRANSACTIONS_QUERY = gql`
  query Transactions {
    transactions {
      id
      description
      amount
      type
      categoryId
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_TRANSACTION_QUERY = gql`
  query Transaction($id: ID!) {
    transaction(id: $id) {
      id
      description
      amount
      type
      categoryId
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TRANSACTION_MUTATION = gql`
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
`;

export const UPDATE_TRANSACTION_MUTATION = gql`
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
`;

export const DELETE_TRANSACTION_MUTATION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;

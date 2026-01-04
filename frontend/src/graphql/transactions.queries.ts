import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
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

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
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

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: ID!, $input: UpdateTransactionInput!) {
    updateTransaction(id: $id, input: $input) {
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

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;

import { gql } from '@apollo/client';

export const GET_CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORY_QUERY = gql`
  query Category($id: ID!) {
    category(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: string;
  categoryId: string;
  category: Category;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateCategoryInput {
  name: string;
}

export interface UpdateCategoryInput {
  name: string;
}

export interface CreateTransactionInput {
  description: string;
  amount: number;
  type: string;
  categoryId: string;
}

export interface UpdateTransactionInput {
  description?: string;
  amount?: number;
  type?: string;
  categoryId?: string;
}

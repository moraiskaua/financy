export interface Context {
  token: string;
}

export interface AuthPayload {
  token: string;
  user: {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
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

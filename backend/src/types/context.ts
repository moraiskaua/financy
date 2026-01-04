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

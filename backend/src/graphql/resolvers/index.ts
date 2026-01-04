import { authResolvers } from './auth.resolver';
import { categoryResolvers } from './category.resolver';
import { transactionResolvers } from './transaction.resolver';

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...categoryResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
  Transaction: {
    ...transactionResolvers.Transaction,
  },
};

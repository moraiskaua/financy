import { GraphQLError } from 'graphql';
import { prisma } from '../../config/database';
import { getUserIdFromContext } from '../../utils/auth';

export const transactionResolvers = {
  Query: {
    transactions: async (_: any, __: any, context: any) => {
      const userId = getUserIdFromContext(context);

      const transactions = await prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return transactions;
    },
    transaction: async (_: any, { id }: any, context: any) => {
      const userId = getUserIdFromContext(context);

      const transaction = await prisma.transaction.findFirst({
        where: { id, userId },
      });

      if (!transaction) {
        throw new GraphQLError('Transaction not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return transaction;
    },
  },
  Mutation: {
    createTransaction: async (_: any, { input }: any, context: any) => {
      const userId = getUserIdFromContext(context);
      const { description, amount, type, categoryId } = input;

      const category = await prisma.category.findFirst({
        where: { id: categoryId, userId },
      });

      if (!category) {
        throw new GraphQLError('Category not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const transaction = await prisma.transaction.create({
        data: {
          description,
          amount,
          type,
          categoryId,
          userId,
        },
      });

      return transaction;
    },
    updateTransaction: async (_: any, { id, input }: any, context: any) => {
      const userId = getUserIdFromContext(context);

      const transaction = await prisma.transaction.findFirst({
        where: { id, userId },
      });

      if (!transaction) {
        throw new GraphQLError('Transaction not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      if (input.categoryId) {
        const category = await prisma.category.findFirst({
          where: { id: input.categoryId, userId },
        });

        if (!category) {
          throw new GraphQLError('Category not found', {
            extensions: { code: 'NOT_FOUND' },
          });
        }
      }

      const updatedTransaction = await prisma.transaction.update({
        where: { id },
        data: {
          description: input.description,
          amount: input.amount,
          type: input.type,
          categoryId: input.categoryId,
        },
      });

      return updatedTransaction;
    },
    deleteTransaction: async (_: any, { id }: any, context: any) => {
      const userId = getUserIdFromContext(context);

      const transaction = await prisma.transaction.findFirst({
        where: { id, userId },
      });

      if (!transaction) {
        throw new GraphQLError('Transaction not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      await prisma.transaction.delete({
        where: { id },
      });

      return true;
    },
  },
  Transaction: {
    category: async (parent: any) => {
      const category = await prisma.category.findUnique({
        where: { id: parent.categoryId },
      });

      return category;
    },
  },
};

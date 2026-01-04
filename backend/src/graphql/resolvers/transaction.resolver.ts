import { Category, Transaction } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/database';
import {
  Context,
  CreateTransactionInput,
  UpdateTransactionInput,
} from '../../types/context';
import { getUserIdFromContext } from '../../utils/auth';

export const transactionResolvers = {
  Query: {
    transactions: async (
      _: unknown,
      __: unknown,
      context: Context
    ): Promise<Transaction[]> => {
      const userId = getUserIdFromContext(context);

      const transactions = await prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return transactions;
    },
    transaction: async (
      _: unknown,
      { id }: { id: string },
      context: Context
    ): Promise<Transaction> => {
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
    createTransaction: async (
      _: unknown,
      { input }: { input: CreateTransactionInput },
      context: Context
    ): Promise<Transaction> => {
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
    updateTransaction: async (
      _: unknown,
      { id, input }: { id: string; input: UpdateTransactionInput },
      context: Context
    ): Promise<Transaction> => {
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
    deleteTransaction: async (
      _: unknown,
      { id }: { id: string },
      context: Context
    ): Promise<boolean> => {
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
    category: async (parent: Transaction): Promise<Category | null> => {
      const category = await prisma.category.findUnique({
        where: { id: parent.categoryId },
      });
      return category;
    },
    createdAt: (parent: Transaction): string => {
      return new Date(parent.createdAt).toISOString();
    },
    updatedAt: (parent: Transaction): string => {
      return new Date(parent.updatedAt).toISOString();
    },
  },
};

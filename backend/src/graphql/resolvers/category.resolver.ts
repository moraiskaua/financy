import { GraphQLError } from 'graphql';
import { prisma } from '../../config/database';
import { getUserIdFromContext } from '../../utils/auth';
import { Context, CreateCategoryInput, UpdateCategoryInput } from '../../types/context';
import { Category } from '@prisma/client';

export const categoryResolvers = {
  Query: {
    categories: async (_: unknown, __: unknown, context: Context): Promise<Category[]> => {
      const userId = getUserIdFromContext(context);

      const categories = await prisma.category.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return categories;
    },
    category: async (_: unknown, { id }: { id: string }, context: Context): Promise<Category> => {
      const userId = getUserIdFromContext(context);

      const category = await prisma.category.findFirst({
        where: { id, userId },
      });

      if (!category) {
        throw new GraphQLError('Category not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return category;
    },
  },
  Mutation: {
    createCategory: async (_: unknown, { input }: { input: CreateCategoryInput }, context: Context): Promise<Category> => {
      const userId = getUserIdFromContext(context);
      const { name } = input;

      const existingCategory = await prisma.category.findFirst({
        where: { name, userId },
      });

      if (existingCategory) {
        throw new GraphQLError('Category with this name already exists', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const category = await prisma.category.create({
        data: {
          name,
          userId,
        },
      });

      return category;
    },
    updateCategory: async (_: unknown, { id, input }: { id: string; input: UpdateCategoryInput }, context: Context): Promise<Category> => {
      const userId = getUserIdFromContext(context);
      const { name } = input;

      const category = await prisma.category.findFirst({
        where: { id, userId },
      });

      if (!category) {
        throw new GraphQLError('Category not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const existingCategory = await prisma.category.findFirst({
        where: {
          name,
          userId,
          id: { not: id },
        },
      });

      if (existingCategory) {
        throw new GraphQLError('Category with this name already exists', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name },
      });

      return updatedCategory;
    },
    deleteCategory: async (_: unknown, { id }: { id: string }, context: Context): Promise<boolean> => {
      const userId = getUserIdFromContext(context);

      const category = await prisma.category.findFirst({
        where: { id, userId },
      });

      if (!category) {
        throw new GraphQLError('Category not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      await prisma.category.delete({
        where: { id },
      });

      return true;
    },
  },
};

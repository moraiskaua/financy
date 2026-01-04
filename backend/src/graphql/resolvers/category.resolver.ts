import { Category } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { prisma } from '../../config/database';
import { Context, CreateCategoryInput, UpdateCategoryInput } from '../../types/context';
import { getUserIdFromContext } from '../../utils/auth';

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
      const { name, description, icon, color } = input;

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
          description,
          icon: icon || 'briefcase',
          color: color || 'green',
          userId,
        },
      });

      return category;
    },
    updateCategory: async (_: unknown, { id, input }: { id: string; input: UpdateCategoryInput }, context: Context): Promise<Category> => {
      const userId = getUserIdFromContext(context);
      const { name, description, icon, color } = input;

      const category = await prisma.category.findFirst({
        where: { id, userId },
      });

      if (!category) {
        throw new GraphQLError('Category not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: {
          name: name || undefined,
          description: description || undefined,
          icon: icon || undefined,
          color: color || undefined,
        },
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

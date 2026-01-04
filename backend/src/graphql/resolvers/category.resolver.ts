import { GraphQLError } from 'graphql';
import { prisma } from '../../config/database';
import { getUserIdFromContext } from '../../utils/auth';

export const categoryResolvers = {
  Query: {
    categories: async (_: any, __: any, context: any) => {
      const userId = getUserIdFromContext(context);

      const categories = await prisma.category.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return categories;
    },
    category: async (_: any, { id }: any, context: any) => {
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
    createCategory: async (_: any, { input }: any, context: any) => {
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
    updateCategory: async (_: any, { id, input }: any, context: any) => {
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
    deleteCategory: async (_: any, { id }: any, context: any) => {
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

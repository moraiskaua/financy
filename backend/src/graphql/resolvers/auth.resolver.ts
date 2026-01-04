import { GraphQLError } from 'graphql';
import { prisma } from '../../config/database';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../../utils/auth';

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      const token = context.token.replace('Bearer ', '');

      if (!token) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const payload = verifyToken(token);

      if (!payload) {
        throw new GraphQLError('Invalid token', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return user;
    },
  },
  Mutation: {
    register: async (_: any, { input }: any) => {
      const { email, password } = input;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new GraphQLError('Email already in use', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const token = generateToken(user.id);

      return { token, user };
    },
    login: async (_: any, { input }: any) => {
      const { email, password } = input;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const isValidPassword = await comparePassword(password, user.password);

      if (!isValidPassword) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const token = generateToken(user.id);

      return { token, user };
    },
  },
};

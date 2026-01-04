import { GraphQLError } from 'graphql';
import { prisma } from '../../config/database';
import { hashPassword, comparePassword, generateToken, getUserIdFromContext } from '../../utils/auth';
import { Context, RegisterInput, LoginInput, AuthPayload } from '../../types/context';
import { User } from '@prisma/client';

export const authResolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: Context): Promise<User> => {
      const userId = getUserIdFromContext(context);

      const user = await prisma.user.findUnique({
        where: { id: userId },
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
    register: async (_: unknown, { input }: { input: RegisterInput }): Promise<AuthPayload> => {
      const { name, email, password } = input;

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
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = generateToken(user.id);

      return { token, user };
    },
    login: async (_: unknown, { input }: { input: LoginInput }): Promise<AuthPayload> => {
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

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      throw new Error('Not implemented yet');
    },
  },
  Mutation: {
    register: async (_: any, { input }: any) => {
      throw new Error('Not implemented yet');
    },
    login: async (_: any, { input }: any) => {
      throw new Error('Not implemented yet');
    },
  },
};

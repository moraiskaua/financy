export const categoryResolvers = {
  Query: {
    categories: async (_: any, __: any, context: any) => {
      throw new Error('Not implemented yet');
    },
    category: async (_: any, { id }: any, context: any) => {
      throw new Error('Not implemented yet');
    },
  },
  Mutation: {
    createCategory: async (_: any, { input }: any, context: any) => {
      throw new Error('Not implemented yet');
    },
    updateCategory: async (_: any, { id, input }: any, context: any) => {
      throw new Error('Not implemented yet');
    },
    deleteCategory: async (_: any, { id }: any, context: any) => {
      throw new Error('Not implemented yet');
    },
  },
};

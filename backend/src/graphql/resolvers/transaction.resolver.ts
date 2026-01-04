export const transactionResolvers = {
  Query: {
    transactions: async (_: any, __: any, context: any) => {
      throw new Error('Not implemented yet');
    },
    transaction: async (_: any, { id }: any, context: any) => {
      throw new Error('Not implemented yet');
    },
  },
  Mutation: {
    createTransaction: async (_: any, { input }: any, context: any) => {
      throw new Error('Not implemented yet');
    },
    updateTransaction: async (_: any, { id, input }: any, context: any) => {
      throw new Error('Not implemented yet');
    },
    deleteTransaction: async (_: any, { id }: any, context: any) => {
      throw new Error('Not implemented yet');
    },
  },
  Transaction: {
    category: async (parent: any, _: any, context: any) => {
      throw new Error('Not implemented yet');
    },
  },
};

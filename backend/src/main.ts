import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import 'dotenv/config';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { Context } from './types/context';

async function bootstrap() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }: StandaloneServerContextFunctionArgument): Promise<Context> => {
      const token = req.headers.authorization || '';
      return { token };
    },
  });

  console.log(`Server ready at ${url}`);
}

bootstrap();

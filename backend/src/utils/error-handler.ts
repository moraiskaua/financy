import { GraphQLError } from 'graphql';

export function formatError(
  formattedError: GraphQLError,
  error: any
): GraphQLError {
  if (formattedError.extensions?.code) {
    return formattedError;
  }

  if (error?.message?.includes('Unique constraint failed')) {
    return new GraphQLError('Este registro já existe.', {
      extensions: { code: 'CONFLICT' },
    });
  }

  if (error?.message?.includes('Unknown argument')) {
    return new GraphQLError('Erro interno no servidor.', {
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });
  }

  return new GraphQLError(
    'Ocorreu um erro interno. Tente novamente mais tarde.',
    {
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    }
  );
}

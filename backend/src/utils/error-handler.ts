import { type GraphQLFormattedError } from 'graphql';

export function formatError(
  formattedError: GraphQLFormattedError,
  error: any
): GraphQLFormattedError {
  const base = {
    message: formattedError.message,
    locations: formattedError.locations,
    path: formattedError.path,
    extensions: formattedError.extensions ?? {},
  };

  if (error?.message?.includes('Unique constraint failed')) {
    return {
      ...base,
      message: 'Este registro já existe.',
      extensions: { ...base.extensions, code: 'CONFLICT' },
    };
  }

  if (error?.message?.includes('Unknown argument')) {
    return {
      ...base,
      message: 'Erro interno no servidor.',
      extensions: { ...base.extensions, code: 'INTERNAL_SERVER_ERROR' },
    };
  }

  return {
    ...base,
    message: 'Ocorreu um erro interno. Tente novamente mais tarde.',
    extensions: { ...base.extensions, code: 'INTERNAL_SERVER_ERROR' },
  };
}

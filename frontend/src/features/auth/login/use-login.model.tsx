import { useState, useCallback } from 'react';
import { apolloClient } from '@/config/apollo-client';
import { LOGIN_MUTATION } from '@/graphql/auth.queries';
import type { LoginInput } from '@/types';

export const useLoginModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (email: string, password: string) => {
    const input: LoginInput = { email, password };

    try {
      setIsLoading(true);
      setError(null);

      const { data } = await apolloClient.mutate<{
        login: { token: string; user: { id: string; email: string } };
      }>({
        mutation: LOGIN_MUTATION,
        variables: { input },
      });

      if (data?.login) {
        localStorage.setItem('token', data.login.token);
        return true;
      }

      throw new Error('Login failed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    onSubmit: handleSubmit,
  };
};

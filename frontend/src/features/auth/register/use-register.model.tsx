import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apolloClient } from '@/config/apollo-client';
import { REGISTER_MUTATION } from '@/graphql/auth.queries';
import type { RegisterInput } from '@/types';

export const useRegisterModel = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (email: string, password: string) => {
    const input: RegisterInput = { email, password };

    try {
      setIsLoading(true);
      setError(null);

      const { data } = await apolloClient.mutate<{
        register: { token: string; user: { id: string; email: string } };
      }>({
        mutation: REGISTER_MUTATION,
        variables: { input },
      });

      if (data?.register) {
        localStorage.setItem('token', data.register.token);
        navigate('/');
        return true;
      }

      throw new Error('Registration failed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return {
    isLoading,
    error,
    onSubmit: handleSubmit,
  };
};
import { apolloClient } from '@/config/apollo-client';
import { REGISTER_MUTATION } from '@/graphql/auth.queries';
import type { RegisterInput } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { type RegisterFormData, registerSchema } from './register.schema';

export const useRegisterModel = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit: handleHookFormSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const navigateToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      const input: RegisterInput = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      try {
        setIsLoading(true);
        setError(null);

        const { data: responseData } = await apolloClient.mutate<{
          register: { token: string; user: { id: string; email: string } };
        }>({
          mutation: REGISTER_MUTATION,
          variables: { input },
        });

        if (responseData?.register) {
          localStorage.setItem('token', responseData.register.token);
          navigate('/');
        } else {
          throw new Error('Falha ao criar conta');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao criar conta');
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  return {
    isLoading,
    error,
    register,
    errors,
    handleSubmit: handleHookFormSubmit(onSubmit),
    showPassword,
    togglePasswordVisibility,
    navigateToLogin,
  };
};
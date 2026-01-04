import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { apolloClient } from '@/config/apollo-client';
import { LOGIN_MUTATION } from '@/graphql/auth.queries';
import type { LoginInput } from '@/types';
import { loginSchema, type LoginFormData } from './login.schema';

export const useLoginModel = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit: handleHookFormSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: LoginFormData) => {
    const input: LoginInput = { email: data.email, password: data.password };

    try {
      setIsLoading(true);
      setError(null);

      const { data: responseData } = await apolloClient.mutate<{
        login: { token: string; user: { id: string; email: string } };
      }>({
        mutation: LOGIN_MUTATION,
        variables: { input },
      });

      if (responseData?.login) {
        localStorage.setItem('token', responseData.login.token);
        navigate('/');
        return true;
      }

      throw new Error('Falha ao fazer login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao fazer login');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const navigateToRegister = () => navigate('/register');
  const navigateToForgotPassword = () => navigate('/forgot-password');

  return {
    isLoading,
    error,
    showPassword,
    register,
    errors,
    handleSubmit: handleHookFormSubmit(onSubmit),
    togglePasswordVisibility,
    navigateToRegister,
    navigateToForgotPassword,
  };
};
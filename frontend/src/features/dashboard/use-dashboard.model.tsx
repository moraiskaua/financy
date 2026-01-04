import { useQuery } from '@apollo/client/react';
import { ME_QUERY } from '@/graphql/auth.queries';
import type { User } from '@/types';

export const useDashboardModel = () => {
  const { data, loading, error } = useQuery<{ me: User }>(ME_QUERY);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return {
    user: data?.me,
    isLoading: loading,
    error: error ? error.message : null,
    logout,
  };
};
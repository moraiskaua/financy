import { ME_QUERY, UPDATE_USER_MUTATION } from '@/graphql/auth.queries';
import type { User } from '@/types';
import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useProfileModel() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<{ me: User }>(ME_QUERY);
  const [updateUser, { loading: isUpdating }] = useMutation(UPDATE_USER_MUTATION);

  const [name, setName] = useState('');

  const user = data?.me;
  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  const handleSave = async () => {
    try {
      await updateUser({
        variables: {
          input: {
            name,
          },
        },
        refetchQueries: [{ query: ME_QUERY }],
      });
      // Optional: Add success toast/notification here
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return {
    isLoading: loading || isUpdating,
    user,
    name,
    setName,
    initials,
    handleSave,
    handleLogout,
  };
}

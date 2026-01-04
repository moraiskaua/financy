import { useQuery, useMutation } from '@apollo/client';
import { GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '@/graphql/categories.queries';
import { Category, CreateCategoryInput, UpdateCategoryInput } from '@/types';
import { useState } from 'react';

export const useCategoriesModel = () => {
  const { data, loading: isLoadingCategories, refetch } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);
  
  const [createMutation] = useMutation(CREATE_CATEGORY);
  const [updateMutation] = useMutation(UPDATE_CATEGORY);
  const [deleteMutation] = useMutation(DELETE_CATEGORY);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = async (name: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const input: CreateCategoryInput = { name };
      await createMutation({
        variables: { input },
      });
      await refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateCategory = async (id: string, name: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const input: UpdateCategoryInput = { name };
      await updateMutation({
        variables: { id, input },
      });
      await refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await deleteMutation({
        variables: { id },
      });
      await refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    categories: data?.categories || [],
    isLoading: isLoadingCategories || isSubmitting,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

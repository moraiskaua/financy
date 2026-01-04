import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from '@/graphql/categories.queries';
import { GET_TRANSACTIONS } from '@/graphql/transactions.queries';
import type { Category, CreateCategoryInput, Transaction, UpdateCategoryInput } from '@/types';
import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo, useState } from 'react';

export const useCategoriesModel = () => {
  const { data, loading: isLoadingCategories, refetch } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);
  const { data: transactionsData, loading: isLoadingTransactions } = useQuery<{ transactions: Transaction[] }>(GET_TRANSACTIONS);
  
  const [createMutation] = useMutation(CREATE_CATEGORY);
  const [updateMutation] = useMutation(UPDATE_CATEGORY);
  const [deleteMutation] = useMutation(DELETE_CATEGORY);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const categories = data?.categories ?? [];

  const { totalTransactions, mostUsedCategoryName, categoryCounts } = useMemo(() => {
    const currentCategories = data?.categories ?? [];
    const currentTransactions = transactionsData?.transactions ?? [];
    
    const counts: Record<string, number> = {};
    
    currentTransactions.forEach((t) => {
      counts[t.categoryId] = (counts[t.categoryId] || 0) + 1;
    });

    let maxCount = 0;
    let mostUsedId = '';

    Object.entries(counts).forEach(([id, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostUsedId = id;
      }
    });

    const mostUsed = currentCategories.find((c) => c.id === mostUsedId);

    return {
      totalTransactions: currentTransactions.length,
      mostUsedCategoryName: mostUsed?.name || 'Nenhuma',
      categoryCounts: counts,
    };
  }, [data?.categories, transactionsData?.transactions]);

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
      setError(err instanceof Error ? err.message : 'Falha ao criar categoria');
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
      setError(err instanceof Error ? err.message : 'Falha ao atualizar categoria');
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
      setError(err instanceof Error ? err.message : 'Falha ao excluir categoria');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCreateSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newCategoryName.trim()) return;
    const success = await createCategory(newCategoryName);
    if (success) {
      setNewCategoryName('');
      setIsCreateModalOpen(false);
    }
  };

  const onStartEditing = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const onCancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  const onUpdateSubmit = async () => {
    if (!editingId || !editingName.trim()) return;
    const success = await updateCategory(editingId, editingName);
    if (success) {
      setEditingId(null);
      setEditingName('');
    }
  };

  return {
    categories,
    isLoading: isLoadingCategories || isLoadingTransactions || isSubmitting,
    error,
    
    totalTransactions,
    mostUsedCategoryName,
    categoryCounts,

    newCategoryName,
    editingId,
    editingName,
    isCreateModalOpen,
    
    setNewCategoryName,
    setEditingName,
    setIsCreateModalOpen,
    onCreateSubmit,
    onStartEditing,
    onCancelEditing,
    onUpdateSubmit,
    deleteCategory,
  };
};
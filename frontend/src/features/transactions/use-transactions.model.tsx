import { useQuery, useMutation } from '@apollo/client';
import { GET_TRANSACTIONS, CREATE_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from '@/graphql/transactions.queries';
import { Transaction, CreateTransactionInput, UpdateTransactionInput } from '@/types';
import { useState } from 'react';

export const useTransactionsModel = () => {
  const { data, loading: isLoadingTransactions, refetch } = useQuery<{ transactions: Transaction[] }>(GET_TRANSACTIONS);
  
  const [createMutation] = useMutation(CREATE_TRANSACTION);
  const [updateMutation] = useMutation(UPDATE_TRANSACTION);
  const [deleteMutation] = useMutation(DELETE_TRANSACTION);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTransaction = async (input: CreateTransactionInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createMutation({
        variables: { input },
      });
      await refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create transaction');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTransaction = async (id: string, input: UpdateTransactionInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await updateMutation({
        variables: { id, input },
      });
      await refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update transaction');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTransaction = async (id: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await deleteMutation({
        variables: { id },
      });
      await refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete transaction');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    transactions: data?.transactions || [],
    isLoading: isLoadingTransactions || isSubmitting,
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

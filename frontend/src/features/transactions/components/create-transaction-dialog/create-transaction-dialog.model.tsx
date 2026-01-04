import { useCategoriesModel } from '@/features/categories/use-categories.model';
import { useTransactionsModel } from '@/features/transactions/use-transactions.model';
import { useCallback, useState } from 'react';

interface UseCreateTransactionDialogProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function useCreateTransactionDialogModel({ onClose, onSuccess }: UseCreateTransactionDialogProps) {
  const { createTransaction } = useTransactionsModel();
  const { categories } = useCategoriesModel();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'entrada' | 'saida'>('saida');
  const [categoryId, setCategoryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !categoryId) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await createTransaction({
        description,
        amount: parseFloat(amount),
        type,
        categoryId,
      });

      setDescription('');
      setAmount('');
      setType('saida');
      setCategoryId('');
      
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar transação');
    } finally {
      setIsLoading(false);
    }
  }, [description, amount, type, categoryId, createTransaction, onSuccess, onClose]);

  return {
    description,
    setDescription,
    amount,
    setAmount,
    type,
    setType,
    categoryId,
    setCategoryId,
    isLoading,
    error,
    categoryOptions,
    handleSubmit,
  };
}

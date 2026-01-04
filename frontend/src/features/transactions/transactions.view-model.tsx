import { useTransactionsModel } from './use-transactions.model';
import { useCategoriesModel } from '@/features/categories/use-categories.model';
import { TransactionsView } from './transactions.view';

export default function TransactionsViewModel() {
  const {
    transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError,
    createTransaction,
    deleteTransaction,
  } = useTransactionsModel();

  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategoriesModel();

  const isLoading = isTransactionsLoading || isCategoriesLoading;
  const error = transactionsError || categoriesError;

  return (
    <TransactionsView
      transactions={transactions}
      categories={categories}
      isLoading={isLoading}
      error={error}
      onCreate={createTransaction}
      onDelete={deleteTransaction}
    />
  );
}

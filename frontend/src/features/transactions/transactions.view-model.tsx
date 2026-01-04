import { useTransactionsModel } from './use-transactions.model';
import { useCategoriesModel } from '@/features/categories/use-categories.model';
import { TransactionsView } from './transactions.view';

export default function TransactionsViewModel() {
  const transactionsModel = useTransactionsModel();
  const categoriesModel = useCategoriesModel();

  const isLoading = transactionsModel.isLoading || categoriesModel.isLoading;
  const error = transactionsModel.error || categoriesModel.error;

  return (
    <TransactionsView
      {...transactionsModel}
      categories={categoriesModel.categories}
      isLoading={isLoading}
      error={error}
    />
  );
}
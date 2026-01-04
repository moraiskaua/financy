import { useTransactionsModel } from './use-transactions.model';
import { useCategoriesModel } from '@/features/categories/use-categories.model';

export const useTransactionsPageModel = () => {
  const transactionsModel = useTransactionsModel();
  const categoriesModel = useCategoriesModel();

  const isLoading = transactionsModel.isLoading || categoriesModel.isLoading;
  const error = transactionsModel.error || categoriesModel.error;

  return {
    ...transactionsModel,
    categories: categoriesModel.categories,
    isLoading,
    error,
  };
};

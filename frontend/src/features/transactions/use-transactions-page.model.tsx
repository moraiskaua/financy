import { useMemo, useState } from 'react';
import { useTransactionsModel } from './use-transactions.model';
import { useCategoriesModel } from '@/features/categories/use-categories.model';
import type { Transaction } from '@/types';

const ITEMS_PER_PAGE = 10;

export const useTransactionsPageModel = () => {
  const transactionsModel = useTransactionsModel();
  const categoriesModel = useCategoriesModel();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const isLoading = transactionsModel.isLoading || categoriesModel.isLoading;
  const error = transactionsModel.error || categoriesModel.error;

  const typeOptions = [
    { value: 'entrada', label: 'Entrada' },
    { value: 'saida', label: 'Saída' },
  ];

  const allTypeOptions = [
    { value: '', label: 'Todos' },
    ...typeOptions,
  ];

  const categoryOptions = [
    { value: '', label: 'Todas' },
    ...categoriesModel.categories.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })),
  ];

  const filteredTransactions = useMemo(() => {
    return transactionsModel.transactions
      .filter((transaction: Transaction) => {
        const matchesSearch = transaction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesType = !filterType || transaction.type === filterType;
        const matchesCategory =
          !filterCategory || transaction.categoryId === filterCategory;
        return matchesSearch && matchesType && matchesCategory;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [
    transactionsModel.transactions,
    searchQuery,
    filterType,
    filterCategory,
  ]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, end);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredTransactions.length
  );

  const resetFilters = () => {
    setSearchQuery('');
    setFilterType('');
    setFilterCategory('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return {
    ...transactionsModel,
    categories: categoriesModel.categories,
    isLoading,
    error,
    typeOptions,
    allTypeOptions,
    categoryOptions,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    filteredTransactions,
    paginatedTransactions,
    totalPages,
    currentPage,
    startItem,
    endItem,
    resetFilters,
    handlePageChange,
    handleFilterChange,
  };
};

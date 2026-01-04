import { useQuery } from '@apollo/client/react';
import { ME_QUERY } from '@/graphql/auth.queries';
import { GET_TRANSACTIONS } from '@/graphql/transactions.queries';
import { GET_CATEGORIES } from '@/graphql/categories.queries';
import type { User, Transaction, Category } from '@/types';
import { useMemo } from 'react';

const RECENT_TRANSACTIONS_LIMIT = 5;
const CATEGORIES_WITH_STATS_LIMIT = 5;

export const useDashboardModel = () => {
  const { data: userData, loading: userLoading, error: userError } = useQuery<{ me: User }>(ME_QUERY);
  const { data: transactionsData, loading: transactionsLoading } = useQuery<{ transactions: Transaction[] }>(GET_TRANSACTIONS);
  const { data: categoriesData, loading: categoriesLoading } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

  const transactions = transactionsData?.transactions || [];
  const categories = categoriesData?.categories || [];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const { totalBalance, monthlyIncome, monthlyExpenses } = useMemo(() => {
    const monthlyTransactions = transactions.filter((t) => {
      const date = new Date(t.createdAt);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const income = monthlyTransactions
      .filter((t) => t.type === 'entrada')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = monthlyTransactions
      .filter((t) => t.type === 'saida')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return {
      totalBalance: balance,
      monthlyIncome: income,
      monthlyExpenses: expenses,
    };
  }, [transactions, currentMonth, currentYear]);

  const recentTransactions = useMemo(() => {
    return transactions
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, RECENT_TRANSACTIONS_LIMIT);
  }, [transactions]);

  const categoriesWithStats = useMemo(() => {
    return categories
      .map((category) => {
        const categoryTransactions = transactions.filter(
          (t) => t.categoryId === category.id
        );
        return {
          ...category,
          count: categoryTransactions.length,
          total: categoryTransactions.reduce((sum, t) => sum + t.amount, 0),
        };
      })
      .filter((c) => c.count > 0)
      .slice(0, CATEGORIES_WITH_STATS_LIMIT);
  }, [categories, transactions]);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const isLoading = userLoading || transactionsLoading || categoriesLoading;
  const error = userError ? userError.message : null;

  return {
    user: userData?.me,
    transactions,
    categories,
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    recentTransactions,
    categoriesWithStats,
    isLoading,
    error,
    logout,
  };
};
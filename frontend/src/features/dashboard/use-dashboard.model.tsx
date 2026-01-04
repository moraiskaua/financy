import { ME_QUERY } from '@/graphql/auth.queries';
import { GET_CATEGORIES } from '@/graphql/categories.queries';
import { GET_TRANSACTIONS } from '@/graphql/transactions.queries';
import type { Category, Transaction, User } from '@/types';
import {
    getCategoryColor,
    getCategoryIcon,
} from '@/utils/transaction-helpers';
import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';

const RECENT_TRANSACTIONS_LIMIT = 5;
const CATEGORIES_WITH_STATS_LIMIT = 5;

const iconBgClasses: Record<string, string> = {
  blue: 'bg-blue-light',
  purple: 'bg-purple-light',
  orange: 'bg-orange-light',
  green: 'bg-green-light',
  pink: 'bg-pink-light',
  yellow: 'bg-yellow-light',
  gray: 'bg-gray-200',
};

const iconColorClasses: Record<string, string> = {
  blue: 'text-blue-base',
  purple: 'text-purple-base',
  orange: 'text-orange-base',
  green: 'text-green-base',
  pink: 'text-pink-base',
  yellow: 'text-yellow-base',
  gray: 'text-gray-600',
};

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
      .slice(0, RECENT_TRANSACTIONS_LIMIT)
      .map((transaction) => {
        const colorVariant = getCategoryColor(transaction.category.name);
        return {
          ...transaction,
          icon: getCategoryIcon(transaction.category.name),
          isIncome: transaction.type === 'entrada',
          colorVariant,
          iconBgClass: iconBgClasses[colorVariant] || iconBgClasses.gray,
          iconColorClass: iconColorClasses[colorVariant] || iconColorClasses.gray,
        };
      });
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
          colorVariant: getCategoryColor(category.name),
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

  const isDashboard = window.location.pathname === '/';
  const isTransactions = window.location.pathname === '/transactions';
  const isCategories = window.location.pathname === '/categories';

  const userInitials = useMemo(() => {
    const name = userData?.me?.name;
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [userData]);

  return {
    user: userData?.me,
    userInitials,
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
    isDashboard,
    isTransactions,
    isCategories,
  };
};
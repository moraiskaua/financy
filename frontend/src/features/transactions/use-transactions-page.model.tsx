import { useCategoriesModel } from '@/features/categories/use-categories.model';
import type { Transaction } from '@/types';
import { getCategoryColor, getIconByName, parseDate } from '@/utils/transaction-helpers';
import { useMemo, useState } from 'react';
import { useTransactionsModel } from './use-transactions.model';

const ITEMS_PER_PAGE = 10;

const iconBgClasses: Record<string, string> = {
  blue: 'bg-blue-light',
  purple: 'bg-purple-light',
  orange: 'bg-orange-light',
  green: 'bg-green-light',
  pink: 'bg-pink-light',
  yellow: 'bg-yellow-light',
  red: 'bg-red-light',
  gray: 'bg-gray-200',
};

const iconColorClasses: Record<string, string> = {
  blue: 'text-blue-base',
  purple: 'text-purple-base',
  orange: 'text-orange-base',
  green: 'text-green-base',
  pink: 'text-pink-base',
  yellow: 'text-yellow-base',
  red: 'text-red-base',
  gray: 'text-gray-600',
};

export const useTransactionsPageModel = () => {
  const transactionsModel = useTransactionsModel();
  const categoriesModel = useCategoriesModel();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterPeriod, setFilterPeriod] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'entrada' | 'saida'>('saida');
  const [categoryId, setCategoryId] = useState('');

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

  const periodOptions = useMemo(() => {
    const now = new Date();
    const res: { value: string; label: string }[] = [{ value: '', label: 'Todos' }];
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      res.push({ value: `${y}-${m}`, label: `${months[d.getMonth()]} / ${y}` });
    }
    return res;
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactionsModel.transactions
      .filter((transaction: Transaction) => {
        const matchesSearch = transaction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesType = !filterType || transaction.type === filterType;
        const matchesCategory =
          !filterCategory || transaction.categoryId === filterCategory;
        const d = parseDate(transaction.createdAt || transaction.updatedAt);
        const period = d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` : null;
        const matchesPeriod = !filterPeriod || (period !== null && period === filterPeriod);
        return matchesSearch && matchesType && matchesCategory && matchesPeriod;
      })
      .sort(
        (a, b) => {
          const db = parseDate(b.createdAt || b.updatedAt)?.getTime() ?? 0;
          const da = parseDate(a.createdAt || a.updatedAt)?.getTime() ?? 0;
          return db - da;
        }
      );
  }, [
    transactionsModel.transactions,
    searchQuery,
    filterType,
    filterCategory,
    filterPeriod,
  ]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const slice = filteredTransactions.slice(start, end);
    
    return slice.map(t => {
      const category = categoriesModel.categories.find(c => c.id === t.categoryId);
      const categoryName = category?.name || 'Outros';
      const color = (category?.color as keyof typeof iconBgClasses) || getCategoryColor(categoryName);
      return {
        ...t,
        categoryName,
        Icon: getIconByName(category?.icon || 'briefcase'),
        iconBgClass: iconBgClasses[color] || iconBgClasses.gray,
        iconColorClass: iconColorClasses[color] || iconColorClasses.gray,
        colorVariant: color,
      };
    });
  }, [filteredTransactions, currentPage, categoriesModel.categories]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const totalCount = filteredTransactions.length;
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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    handleFilterChange();
  };

  const handleTypeFilterChange = (value: string) => {
    setFilterType(value);
    handleFilterChange();
  };

  const handleCategoryFilterChange = (value: string) => {
    setFilterCategory(value);
    handleFilterChange();
  };
  const handlePeriodFilterChange = (value: string) => {
    setFilterPeriod(value);
    handleFilterChange();
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setCategoryId('');
    setType('saida');
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!description || !amount || !categoryId) return;

    if (editingId) {
      const success = await transactionsModel.updateTransaction(editingId, {
        description,
        amount: parseFloat(amount),
        type,
        categoryId,
      });
      if (success) resetForm();
    }
  };

  const startEditing = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setDescription(transaction.description);
    setAmount(transaction.amount.toString());
    setType(transaction.type as 'entrada' | 'saida');
    setCategoryId(transaction.categoryId);
    setIsDialogOpen(true);
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await transactionsModel.deleteTransaction(deleteId);
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  return {
    ...transactionsModel,
    categories: categoriesModel.categories,
    isLoading,
    error,
    typeOptions,
    allTypeOptions,
    categoryOptions,
    periodOptions,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    filterPeriod,
    setFilterPeriod,
    filteredTransactions,
    paginatedTransactions,
    totalPages,
    currentPage,
    startItem,
    endItem,
    totalCount,
    resetFilters,
    handlePageChange,
    handleFilterChange,
    
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isDialogOpen,
    setIsDialogOpen,
    editingId,
    description,
    setDescription,
    amount,
    setAmount,
    type,
    setType: (val: string) => setType(val as 'entrada' | 'saida'),
    categoryId,
    setCategoryId,
    
    handleSubmit,
    startEditing,
    handleDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    confirmDelete,
    cancelDelete,
    handleSearchChange,
    handleTypeFilterChange,
    handleCategoryFilterChange,
    handlePeriodFilterChange,
  };
};

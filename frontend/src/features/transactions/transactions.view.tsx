import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { PaginationButton } from '@/components/ui/pagination-button';
import { Select } from '@/components/ui/select';
import { Tag } from '@/components/ui/tag';
import { Type } from '@/components/ui/type';
import type { Transaction } from '@/types';
import { cn } from '@/utils/cn';
import {
  formatCurrency,
  formatDate,
  getCategoryColor,
  getCategoryIcon,
} from '@/utils/transaction-helpers';
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Search,
  Trash2,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
import type { useTransactionsPageModel } from './use-transactions-page.model';

type TransactionsViewProps = ReturnType<typeof useTransactionsPageModel>;

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

export function TransactionsView({
  isLoading,
  error,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  typeOptions,
  allTypeOptions,
  categoryOptions,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  paginatedTransactions,
  totalPages,
  currentPage,
  startItem,
  endItem,
  handlePageChange,
  handleFilterChange,
}: TransactionsViewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'entrada' | 'saida'>('saida');
  const [categoryId, setCategoryId] = useState('');

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setCategoryId('');
    setType('saida');
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !categoryId) return;

    if (editingId) {
      const success = await updateTransaction(editingId, {
        description,
        amount: parseFloat(amount),
        type,
        categoryId,
      });
      if (success) resetForm();
    } else {
      const success = await createTransaction({
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

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      await deleteTransaction(id);
    }
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
          <p className="text-sm text-gray-600 mt-1">
            Gerencie todas as suas transações financeiras
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={() => setIsDialogOpen(true)}
        >
          Nova transação
        </Button>
      </div>

      {error && (
        <div className="bg-red-light p-4 border border-danger rounded-md">
          <p className="text-sm text-danger">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Buscar"
            icon={Search}
            placeholder="Buscar por descrição"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <Select
            label="Tipo"
            options={allTypeOptions}
            value={filterType}
            onChange={handleTypeFilterChange}
            placeholder="Todos"
          />
          <Select
            label="Categoria"
            options={categoryOptions}
            value={filterCategory}
            onChange={handleCategoryFilterChange}
            placeholder="Todas"
          />
          <Select
            label="Período"
            options={[{ value: 'current', label: 'Novembro / 2025' }]}
            value="current"
            onChange={() => {}}
            placeholder="Período"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Carregando...
                  </td>
                </tr>
              ) : paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhuma transação encontrada
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((transaction) => {
                  const Icon = getCategoryIcon(transaction.category.name);
                  const colorVariant = getCategoryColor(transaction.category.name);
                  const isIncome = transaction.type === 'entrada';

                  return (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-lg flex items-center justify-center',
                              iconBgClasses[colorVariant] || iconBgClasses.gray
                            )}
                          >
                            <Icon
                              className={cn(
                                'w-5 h-5',
                                iconColorClasses[colorVariant] ||
                                  iconColorClasses.gray
                              )}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-800">
                            {transaction.description}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {formatDate(transaction.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Tag variant={colorVariant}>
                          {transaction.category.name}
                        </Tag>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Type type={transaction.type as 'entrada' | 'saida'} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {isIncome ? (
                            <>
                              <TrendingUp className="w-4 h-4 text-brand-base" />
                              <span className="text-sm font-medium text-brand-base">
                                + {formatCurrency(transaction.amount)}
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-4 h-4 text-danger" />
                              <span className="text-sm font-medium text-gray-800">
                                - {formatCurrency(transaction.amount)}
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <IconButton
                            icon={Edit}
                            variant="default"
                            size="sm"
                            onClick={() => startEditing(transaction)}
                            disabled={isLoading}
                          />
                          <IconButton
                            icon={Trash2}
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(transaction.id)}
                            disabled={isLoading}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {startItem} a {endItem} | {paginatedTransactions.length} resultados
            </div>
            <div className="flex items-center gap-2">
              <PaginationButton
                disabled={currentPage === 1}
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </PaginationButton>
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                let pageNum;
                if (totalPages <= 3) {
                  pageNum = i + 1;
                } else if (currentPage === 1) {
                  pageNum = i + 1;
                } else if (currentPage === totalPages) {
                  pageNum = totalPages - 2 + i;
                } else {
                  pageNum = currentPage - 1 + i;
                }
                return (
                  <PaginationButton
                    key={pageNum}
                    active={currentPage === pageNum}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationButton>
                );
              })}
              <PaginationButton
                disabled={currentPage === totalPages}
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
              >
                <ChevronRight className="w-4 h-4" />
              </PaginationButton>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle>
            {editingId ? 'Editar Transação' : 'Nova Transação'}
          </DialogTitle>
          <DialogDescription>
            {editingId
              ? 'Atualize os dados da transação'
              : 'Preencha os dados para criar uma nova transação'}
          </DialogDescription>
          <DialogClose onClose={resetForm} />
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div className="space-y-4">
              <Input
                label="Descrição"
                placeholder="Descrição da transação"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                required
              />
              <Input
                label="Valor"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isLoading}
                required
              />
              <Select
                label="Tipo"
                options={typeOptions}
                value={type}
                onChange={(val) => setType(val as 'entrada' | 'saida')}
                disabled={isLoading}
                placeholder="Selecione o tipo"
              />
              <Select
                label="Categoria"
                options={categoryOptions.filter((opt) => opt.value !== '')}
                value={categoryId}
                onChange={(val) => setCategoryId(val)}
                disabled={isLoading}
                placeholder="Selecione a categoria"
              />
            </div>
          </DialogContent>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={resetForm}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading || !description || !amount || !categoryId}
            >
              {isLoading
                ? editingId
                  ? 'Salvando...'
                  : 'Criando...'
                : editingId
                  ? 'Salvar'
                  : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

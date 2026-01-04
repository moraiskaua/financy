import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
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
import { cn } from '@/utils/cn';
import { formatCurrency, formatDate } from '@/utils/transaction-helpers';
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Search,
  Trash2
} from 'lucide-react';
import { CreateTransactionDialog } from './components/create-transaction-dialog';
import type { useTransactionsPageModel } from './use-transactions-page.model';

type TransactionsViewProps = ReturnType<typeof useTransactionsPageModel>;

export function TransactionsView({
  isLoading,
  error,
  typeOptions,
  allTypeOptions,
  categoryOptions,
  periodOptions,
  searchQuery,
  filterType,
  filterCategory,
  filterPeriod,
  paginatedTransactions,
  totalPages,
  currentPage,
  startItem,
  endItem,
  totalCount,
  
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  isDialogOpen,
  setIsDialogOpen,
  description,
  setDescription,
  amount,
  setAmount,
  type,
  setType,
  categoryId,
  setCategoryId,
  
  handleSubmit,
  startEditing,
  handleDelete,
  handlePageChange,
  handleSearchChange,
  handleTypeFilterChange,
  handleCategoryFilterChange,
  handlePeriodFilterChange,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  confirmDelete,
  cancelDelete,
}: TransactionsViewProps) {

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
            onClick={() => setIsCreateDialogOpen(true)}
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
            options={periodOptions}
            value={filterPeriod}
            onChange={handlePeriodFilterChange}
            placeholder="Selecione"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Descrição
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Carregando transações...
                  </td>
                </tr>
              ) : paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={cn(
                            'p-2 rounded-lg mr-3',
                            transaction.iconBgClass,
                            transaction.iconColorClass
                          )}
                        >
                          <transaction.Icon size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {transaction.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(transaction.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Tag variant={transaction.colorVariant}>{transaction.categoryName}</Tag>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Type type={transaction.type as 'entrada' | 'saida'} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          transaction.type === 'entrada'
                            ? 'text-success'
                            : 'text-danger'
                        )}
                      >
                        {(transaction.type === 'entrada' ? '+' : '-') + ' ' + formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <IconButton
                          icon={Edit}
                          onClick={() => startEditing(transaction)}
                          title="Editar"
                        />
                        <IconButton
                          icon={Trash2}
                          variant="danger"
                          onClick={() => handleDelete(transaction.id)}
                          title="Excluir"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && paginatedTransactions.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="text-sm text-gray-500">
              <span className="font-medium">{startItem}</span> a{' '}
              <span className="font-medium">{endItem}</span> {' '}|{' '}
              <span className="font-medium">{totalCount}</span> resultados
            </div>
            <div className="flex space-x-2">
              <PaginationButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </PaginationButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationButton
                  key={page}
                  active={currentPage === page}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationButton>
              ))}
              <PaginationButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </PaginationButton>
            </div>
          </div>
        )}
      </div>

      <CreateTransactionDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={() => setIsCreateDialogOpen(false)}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px] p-0">
          <DialogHeader>
            <DialogTitle>
              Editar Transação
            </DialogTitle>
            <DialogDescription>
              Edite os detalhes da transação abaixo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 px-6 py-4">
              <Input
                label="Descrição"
                placeholder="Ex: Compras no mercado"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Input
                label="Valor (R$)"
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Tipo"
                  options={typeOptions}
                  value={type}
                  onChange={setType}
                  placeholder="Selecione o tipo"
                />
                <Select
                  label="Categoria"
                  options={categoryOptions}
                  value={categoryId}
                  onChange={setCategoryId}
                  placeholder="Selecione a categoria"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  setIsDialogOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="p-0 overflow-hidden bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir transação</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Tem certeza que deseja excluir esta transação?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="danger" onClick={confirmDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

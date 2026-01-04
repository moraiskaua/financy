import { Link } from '@/components/ui/link';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/utils/cn';
import { formatCurrency, formatDate } from '@/utils/transaction-helpers';
import { Plus, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import type { useDashboardModel } from './use-dashboard.model';

type DashboardModel = ReturnType<typeof useDashboardModel>;

interface HomeViewProps {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  recentTransactions: DashboardModel['recentTransactions'];
  categoriesWithStats: DashboardModel['categoriesWithStats'];
  isLoading: boolean;
}

export function HomeView({
  totalBalance,
  monthlyIncome,
  monthlyExpenses,
  recentTransactions,
  categoriesWithStats,
  isLoading,
}: HomeViewProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-light flex items-center justify-center">
              <Wallet className="w-5 h-5 text-purple-base" />
            </div>
          </div>
          <p className="text-xs font-medium text-gray-600 uppercase mb-1">
            SALDO TOTAL
          </p>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(totalBalance)}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-light flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-brand-base" />
            </div>
          </div>
          <p className="text-xs font-medium text-gray-600 uppercase mb-1">
            RECEITAS DO MÊS
          </p>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(monthlyIncome)}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-light flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-danger" />
            </div>
          </div>
          <p className="text-xs font-medium text-gray-600 uppercase mb-1">
            DESPESAS DO MÊS
          </p>
          <p className="text-2xl font-bold text-gray-800">
            {formatCurrency(monthlyExpenses)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-gray-800 uppercase">
              Transações Recentes
            </h2>
            <Link to="/transactions" className="text-sm">
              Ver todas &gt;
            </Link>
          </div>

          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhuma transação encontrada
              </p>
            ) : (
              recentTransactions.map((transaction) => {
                const Icon = transaction.icon;

                return (
                  <div key={transaction.id} className="flex items-center gap-4">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        transaction.iconBgClass
                      )}
                    >
                      <Icon
                        className={cn('w-5 h-5', transaction.iconColorClass)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                    <Tag variant={transaction.colorVariant}>
                      {transaction.category.name}
                    </Tag>
                    <div className="flex items-center gap-1">
                      {transaction.isIncome ? (
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
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              to="/transactions"
              className="flex items-center justify-center gap-2 text-brand-base text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Nova transação
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-gray-800 uppercase">
              Categorias
            </h2>
            <Link to="/categories" className="text-sm">
              Gerenciar &gt;
            </Link>
          </div>

          <div className="space-y-4">
            {categoriesWithStats.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhuma categoria encontrada
              </p>
            ) : (
              categoriesWithStats.map((category) => {
                return (
                  <div
                    key={category.id}
                    className="flex items-center justify-between"
                  >
                    <Tag variant={category.colorVariant}>{category.name}</Tag>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {category.count} itens
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {formatCurrency(category.total)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


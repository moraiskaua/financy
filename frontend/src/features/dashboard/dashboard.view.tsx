import logo from '@/assets/logo.svg';
import { Link } from '@/components/ui/link';
import { cn } from '@/utils/cn';
import { Outlet } from 'react-router-dom';
import type { useDashboardModel } from './use-dashboard.model';

type DashboardViewProps = ReturnType<typeof useDashboardModel>;

export function DashboardView({ isDashboard, isTransactions, isCategories, userInitials }: DashboardViewProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8 flex-1">
              <div className="flex items-center">
                <img src={logo} alt="FINANCY" className="h-8" />
              </div>
              <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
                <Link
                  to="/"
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isDashboard ? 'text-brand-base' : 'text-gray-800 hover:text-brand-base'
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  to="/transactions"
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isTransactions ? 'text-brand-base' : 'text-gray-800 hover:text-brand-base'
                  )}
                >
                  Transações
                </Link>
                <Link
                  to="/categories"
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isCategories ? 'text-brand-base' : 'text-gray-800 hover:text-brand-base'
                  )}
                >
                  Categorias
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-white">{userInitials}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
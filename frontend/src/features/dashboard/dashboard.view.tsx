import { Outlet, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { Receipt, Tag, LogOut, User as UserIcon } from 'lucide-react';
import type { useDashboardModel } from './use-dashboard.model';

type DashboardViewProps = ReturnType<typeof useDashboardModel>;

export function DashboardView({ user, logout }: DashboardViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-brand-base">Financy</span>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                      isActive
                        ? "border-brand-base text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    )
                  }
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Transactions
                </NavLink>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                      isActive
                        ? "border-brand-base text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    )
                  }
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Categories
                </NavLink>
              </nav>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-dark">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <span className="hidden md:inline">{user?.name || user?.email}</span>
                  </div>
                  <Button
                    onClick={logout}
                    variant="secondary"
                    size="sm"
                    className="ml-4"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
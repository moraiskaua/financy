import logo from '@/assets/logo.svg';
import { cn } from '@/utils/cn';
import { NavLink, Outlet } from 'react-router-dom';
import type { useDashboardModel } from './use-dashboard.model';

type DashboardViewProps = ReturnType<typeof useDashboardModel>;

export function DashboardView({ userInitials }: DashboardViewProps) {
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
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-medium transition-colors',
                      isActive ? 'text-brand-base' : 'text-gray-800 hover:text-brand-base'
                    )
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-medium transition-colors',
                      isActive ? 'text-brand-base' : 'text-gray-800 hover:text-brand-base'
                    )
                  }
                >
                  Transações
                </NavLink>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    cn(
                      'text-sm font-medium transition-colors',
                      isActive ? 'text-brand-base' : 'text-gray-800 hover:text-brand-base'
                    )
                  }
                >
                  Categorias
                </NavLink>
              </nav>
            </div>
            <div className="flex items-center">
              <NavLink to="/profile">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors cursor-pointer">
                  <span className="text-sm font-medium text-white">{userInitials}</span>
                </div>
              </NavLink>
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
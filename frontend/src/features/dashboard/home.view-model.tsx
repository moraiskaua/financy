import { HomeView } from './home.view';
import { useDashboardModel } from './use-dashboard.model';

export default function HomeViewModel() {
  const {
    totalBalance,
    monthlyIncome,
    monthlyExpenses,
    recentTransactions,
    categoriesWithStats,
    loading,
  } = useDashboardModel();

  return (
    <HomeView
      totalBalance={totalBalance}
      monthlyIncome={monthlyIncome}
      monthlyExpenses={monthlyExpenses}
      recentTransactions={recentTransactions}
      categoriesWithStats={categoriesWithStats}
      isLoading={loading}
    />
  );
}

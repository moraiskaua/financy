import { useDashboardModel } from './use-dashboard.model';
import { DashboardView } from './dashboard.view';

export default function DashboardViewModel() {
  const model = useDashboardModel();

  return <DashboardView {...model} />;
}
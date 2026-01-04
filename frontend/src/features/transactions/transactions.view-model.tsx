import { useTransactionsPageModel } from './use-transactions-page.model';
import { TransactionsView } from './transactions.view';

export default function TransactionsViewModel() {
  const model = useTransactionsPageModel();

  return <TransactionsView {...model} />;
}

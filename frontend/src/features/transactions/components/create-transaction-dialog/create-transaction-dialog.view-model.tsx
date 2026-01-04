import { CreateTransactionDialogView } from './create-transaction-dialog.view';
import { useCreateTransactionDialogModel } from './create-transaction-dialog.model';

interface CreateTransactionDialogViewModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateTransactionDialogViewModel(props: CreateTransactionDialogViewModelProps) {
  const model = useCreateTransactionDialogModel(props);
  return <CreateTransactionDialogView {...model} {...props} />;
}

import { CreateCategoryDialogView } from './create-category-dialog.view';
import { useCreateCategoryDialogModel } from './create-category-dialog.model';

interface CreateCategoryDialogViewModelProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateCategoryDialogViewModel(props: CreateCategoryDialogViewModelProps) {
  const model = useCreateCategoryDialogModel(props);
  return <CreateCategoryDialogView {...model} {...props} />;
}

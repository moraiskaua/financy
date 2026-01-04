import { EditCategoryDialogView } from './edit-category-dialog.view';
import { useEditCategoryDialogModel } from './edit-category-dialog.model';
import type { Category } from '@/types';

interface EditCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  onSuccess?: () => void;
}

export function EditCategoryDialog({ isOpen, onClose, category, onSuccess }: EditCategoryDialogProps) {
  const model = useEditCategoryDialogModel({ category, onClose, onSuccess });

  return (
    <EditCategoryDialogView
      isOpen={isOpen}
      onClose={onClose}
      {...model}
    />
  );
}

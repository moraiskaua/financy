import { useCategoriesModel } from './use-categories.model';
import { CategoriesView } from './categories.view';

export default function CategoriesViewModel() {
  const {
    categories,
    isLoading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoriesModel();

  return (
    <CategoriesView
      categories={categories}
      isLoading={isLoading}
      error={error}
      onCreate={createCategory}
      onUpdate={updateCategory}
      onDelete={deleteCategory}
    />
  );
}

import { useCategoriesModel } from './use-categories.model';
import { CategoriesView } from './categories.view';

export default function CategoriesViewModel() {
  const model = useCategoriesModel();

  return <CategoriesView {...model} />;
}
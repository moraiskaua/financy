import { useState } from 'react';
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { useCategoriesModel } from './use-categories.model';

type CategoriesViewProps = ReturnType<typeof useCategoriesModel>;

export function CategoriesView({
  categories,
  isLoading,
  error,
  createCategory,
  updateCategory,
  deleteCategory,
}: CategoriesViewProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    
    const success = await createCategory(newCategoryName);
    if (success) {
      setNewCategoryName('');
    }
  };

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleUpdate = async () => {
    if (!editingId || !editingName.trim()) return;
    
    const success = await updateCategory(editingId, editingName);
    if (success) {
      setEditingId(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Categories</h1>

      {error && (
        <div className="bg-red-50 text-danger p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">New Category</h2>
        <form onSubmit={handleCreate} className="flex gap-4">
          <Input
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !newCategoryName.trim()}>
            {isLoading ? 'Creating...' : 'Add Category'}
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
          >
            {editingId === category.id ? (
              <div className="flex-1 flex gap-4 mr-4">
                <Input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                />
                <Button onClick={handleUpdate} disabled={isLoading} size="sm">
                  Save
                </Button>
                <Button
                  onClick={cancelEditing}
                  variant="secondary"
                  size="sm"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <span className="text-gray-700 font-medium">{category.name}</span>
                <div className="flex gap-2">
                  <Button
                    onClick={() => startEditing(category)}
                    variant="secondary"
                    size="sm"
                    disabled={isLoading}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteCategory(category.id)}
                    variant="danger"
                    size="sm"
                    disabled={isLoading}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        
        {categories.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 py-8">
            No categories found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}

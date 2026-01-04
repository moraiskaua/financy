import { useCategoriesModel } from '@/features/categories/use-categories.model';
import type { Category } from '@/types';
import { useCallback, useEffect, useState } from 'react';

interface UseEditCategoryDialogProps {
  category: Category | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function useEditCategoryDialogModel({ category, onClose, onSuccess }: UseEditCategoryDialogProps) {
  const { updateCategory } = useCategoriesModel();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('briefcase');
  const [selectedColor, setSelectedColor] = useState('green');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || '');
      setSelectedIcon(category.icon || 'briefcase');
      setSelectedColor(category.color || 'green');
    }
  }, [category]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    
    if (!name.trim()) {
      setError('O nome da categoria é obrigatório');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const success = await updateCategory(category.id, {
        name,
        description,
        icon: selectedIcon,
        color: selectedColor,
      });
      
      if (success) {
        onSuccess?.();
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar categoria');
    } finally {
      setIsLoading(false);
    }
  }, [category, name, description, selectedIcon, selectedColor, updateCategory, onSuccess, onClose]);

  return {
    name,
    setName,
    description,
    setDescription,
    selectedIcon,
    setSelectedIcon,
    selectedColor,
    setSelectedColor,
    isLoading,
    error,
    handleSubmit,
  };
}

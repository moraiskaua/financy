import { useCategoriesModel } from '@/features/categories/use-categories.model';
import { useCallback, useState } from 'react';

interface UseCreateCategoryDialogProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function useCreateCategoryDialogModel({ onClose, onSuccess }: UseCreateCategoryDialogProps) {
  const { createCategory } = useCategoriesModel();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('briefcase');
  const [selectedColor, setSelectedColor] = useState('green');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('O nome da categoria é obrigatório');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const success = await createCategory(name, description, selectedIcon, selectedColor);
      
      if (success) {
        setName('');
        setDescription('');
        setSelectedIcon('briefcase');
        setSelectedColor('green');
        onSuccess?.();
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar categoria');
    } finally {
      setIsLoading(false);
    }
  }, [name, description, selectedIcon, selectedColor, createCategory, onSuccess, onClose]);

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

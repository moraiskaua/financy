import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import type { Category } from '@/types';
import { cn } from '@/utils/cn';
import {
  ArrowUpDown,
  Edit2,
  Plus,
  Tag,
  Trash2,
  Utensils
} from 'lucide-react';
import { useState } from 'react';
import { CreateCategoryDialog } from './components/create-category-dialog';
import { EditCategoryDialog } from './components/edit-category-dialog';
import type { useCategoriesModel } from './use-categories.model';

type CategoriesViewProps = ReturnType<typeof useCategoriesModel>;

export function CategoriesView({
  categories,
  isLoading,
  error,
  totalTransactions,
  mostUsedCategoryName,
  isCreateModalOpen,
  setIsCreateModalOpen,
  deleteCategory,
  categoriesWithIcons,
}: CategoriesViewProps) {
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmationId(id);
  };

  const confirmDelete = async () => {
    if (deleteConfirmationId) {
      await deleteCategory(deleteConfirmationId);
      setDeleteConfirmationId(null);
    }
  };

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
            <p className="text-gray-500 mt-1">Organize suas transações por categorias</p>
        </div>
        <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setIsCreateModalOpen(true)}
        >
            Nova categoria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
                <Tag className="w-6 h-6 text-gray-600" />
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total de categorias</p>
            </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
                <ArrowUpDown className="w-6 h-6 text-purple-600" />
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total de transações</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
                <Utensils className="w-6 h-6 text-blue-600" />
            </div>
            <div>
                <p className="text-lg font-bold text-gray-900">{mostUsedCategoryName}</p>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Categoria mais utilizada</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoriesWithIcons.map((category) => {
            const iconColorClass = category.color ? `text-${category.color}-600` : 'text-blue-600';
            const bgColorClass = category.color ? `bg-${category.color}-50` : 'bg-blue-50';
            
            return (
                <div key={category.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className={cn("p-3 rounded-lg", bgColorClass, iconColorClass)}>
                            <category.Icon className="w-6 h-6" />
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleDeleteClick(category.id)}
                                className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                                disabled={isLoading}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => handleEditClick(category)}
                                className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                                disabled={isLoading}
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                    
                    <div className="flex justify-between items-center mt-4">
                        <span className={cn("px-3 py-1 text-xs font-medium rounded-full", bgColorClass, iconColorClass)}>
                            {category.name}
                        </span>
                        <span className="text-xs text-gray-500">
                            {category.count} {category.count === 1 ? 'item' : 'itens'}
                        </span>
                    </div>
                </div>
            );
        })}
        
        {categories.length === 0 && !isLoading && (
            <div className="col-span-full text-center py-12 text-gray-500">
                Nenhuma categoria encontrada. Crie uma nova para começar.
            </div>
        )}
      </div>

      <CreateCategoryDialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => setIsCreateModalOpen(false)}
      />

      <EditCategoryDialog
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        category={editingCategory}
        onSuccess={() => setEditingCategory(null)}
      />

      <AlertDialog open={!!deleteConfirmationId} onOpenChange={(open) => !open && setDeleteConfirmationId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente a categoria
              e removerá os dados de nossos servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Sim, excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

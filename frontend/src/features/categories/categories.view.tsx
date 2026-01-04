import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';
import {
    ArrowUpDown,
    Car,
    Edit2,
    Heart,
    Home,
    Plus,
    ShoppingCart,
    Tag,
    Trash2,
    Utensils,
    Wallet,
    Zap
} from 'lucide-react';
import type { useCategoriesModel } from './use-categories.model';

type CategoriesViewProps = ReturnType<typeof useCategoriesModel>;

const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('aliment')) return Utensils;
  if (lower.includes('entreten')) return Tag;
  if (lower.includes('invest')) return Wallet;
  if (lower.includes('mercado')) return ShoppingCart;
  if (lower.includes('salário') || lower.includes('salario')) return Wallet;
  if (lower.includes('saúde') || lower.includes('saude')) return Heart;
  if (lower.includes('transporte')) return Car;
  if (lower.includes('utilidades')) return Zap;
  if (lower.includes('casa') || lower.includes('moradia')) return Home;
  return Tag;
};

export function CategoriesView({
  categories,
  isLoading,
  error,
  totalTransactions,
  mostUsedCategoryName,
  categoryCounts,
  newCategoryName,
  editingId,
  editingName,
  isCreateModalOpen,
  setNewCategoryName,
  setEditingName,
  setIsCreateModalOpen,
  onCreateSubmit,
  onStartEditing,
  onCancelEditing,
  onUpdateSubmit,
  deleteCategory,
}: CategoriesViewProps) {
  
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
        <Button onClick={() => setIsCreateModalOpen(true)} className="bg-green-600 hover:bg-green-700 text-white border-none">
            <Plus className="w-4 h-4 mr-2" />
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
        {categories.map((category) => {
            const Icon = getCategoryIcon(category.name);
            const count = categoryCounts[category.id] || 0;
            return (
                <div key={category.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className={cn("p-3 rounded-lg bg-blue-50 text-blue-600")}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => deleteCategory(category.id)}
                                className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                                disabled={isLoading}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => onStartEditing(category)}
                                className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
                                disabled={isLoading}
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                    
                    <div className="flex justify-between items-center mt-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                            {category.name}
                        </span>
                        <span className="text-xs text-gray-500">
                            {count} {count === 1 ? 'item' : 'itens'}
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

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Nova Categoria</DialogTitle>
            </DialogHeader>
            <form onSubmit={onCreateSubmit} className="space-y-4 mt-4">
                <div>
                    <Input 
                        placeholder="Nome da categoria" 
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        autoFocus
                    />
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancelar</Button>
                    <Button type="submit" disabled={isLoading || !newCategoryName.trim()}>Criar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingId} onOpenChange={(open) => !open && onCancelEditing()}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Editar Categoria</DialogTitle>
            </DialogHeader>
             <form onSubmit={(e) => { e.preventDefault(); onUpdateSubmit(); }} className="space-y-4 mt-4">
                <div>
                    <Input 
                        placeholder="Nome da categoria" 
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        autoFocus
                    />
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={onCancelEditing}>Cancelar</Button>
                    <Button type="submit" disabled={isLoading || !editingName.trim()}>Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';
import { Book, Briefcase, Car, Dumbbell, FileText, Gift, Heart, Home, LayoutGrid, PawPrint, ShoppingBag, ShoppingCart, Ticket, Utensils, X } from 'lucide-react';
import type { useCreateCategoryDialogModel } from './create-category-dialog.model';

type CreateCategoryDialogViewProps = ReturnType<typeof useCreateCategoryDialogModel> & {
  isOpen: boolean;
  onClose: () => void;
};

const ICONS = [
  { name: 'briefcase', Icon: Briefcase },
  { name: 'car', Icon: Car },
  { name: 'heart', Icon: Heart },
  { name: 'home', Icon: Home },
  { name: 'cart', Icon: ShoppingCart },
  { name: 'ticket', Icon: Ticket },
  { name: 'gift', Icon: Gift },
  { name: 'food', Icon: Utensils },
  { name: 'pet', Icon: PawPrint },
  { name: 'gym', Icon: Dumbbell },
  { name: 'book', Icon: Book },
  { name: 'shopping', Icon: ShoppingBag },
  { name: 'bill', Icon: FileText },
  { name: 'other', Icon: LayoutGrid },
];

const COLORS = [
  { name: 'green', class: 'bg-green-500' },
  { name: 'blue', class: 'bg-blue-500' },
  { name: 'purple', class: 'bg-purple-500' },
  { name: 'pink', class: 'bg-pink-500' },
  { name: 'red', class: 'bg-red-500' },
  { name: 'orange', class: 'bg-orange-500' },
  { name: 'yellow', class: 'bg-yellow-500' },
];

export function CreateCategoryDialogView({
  isOpen,
  onClose,
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
}: CreateCategoryDialogViewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white max-h-[90vh] overflow-y-auto">
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Nova categoria
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <DialogDescription className="text-gray-500 mb-6">
            Organize suas transações com categorias
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Título</label>
              <Input
                placeholder="Ex. Alimentação"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <Input
                placeholder="Descrição da categoria"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white"
              />
              <span className="text-xs text-gray-400">Opcional</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ícone</label>
              <div className="grid grid-cols-7 gap-2">
                {ICONS.map(({ name: iconName, Icon }) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setSelectedIcon(iconName)}
                    className={cn(
                      "w-10 h-10 rounded-lg border flex items-center justify-center transition-all",
                      selectedIcon === iconName
                        ? "border-green-600 bg-green-50 text-green-600"
                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Cor</label>
              <div className="flex gap-2">
                {COLORS.map(({ name: colorName, class: bgClass }) => (
                  <button
                    key={colorName}
                    type="button"
                    onClick={() => setSelectedColor(colorName)}
                    className={cn(
                      "w-8 h-8 rounded-full transition-all ring-offset-2",
                      bgClass,
                      selectedColor === colorName
                        ? "ring-2 ring-gray-400 scale-110"
                        : "hover:scale-105"
                    )}
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="pt-4 pb-6">
              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white py-6 text-base"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

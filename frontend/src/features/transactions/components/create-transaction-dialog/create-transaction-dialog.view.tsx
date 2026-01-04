import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { cn } from '@/utils/cn';
import { ArrowDownCircle, ArrowUpCircle, X } from 'lucide-react';
import type { useCreateTransactionDialogModel } from './create-transaction-dialog.model';

type CreateTransactionDialogViewProps = ReturnType<typeof useCreateTransactionDialogModel> & {
  isOpen: boolean;
  onClose: () => void;
};

export function CreateTransactionDialogView({
  isOpen,
  onClose,
  description,
  setDescription,
  amount,
  setAmount,
  type,
  setType,
  categoryId,
  setCategoryId,
  isLoading,
  error,
  categoryOptions,
  handleSubmit,
}: CreateTransactionDialogViewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white">
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Nova transação
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <DialogDescription className="text-gray-500 mb-6">
            Registre sua despesa ou receita
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setType('saida')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all",
                  type === 'saida'
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                )}
              >
                <ArrowDownCircle className="w-5 h-5" />
                <span className="font-medium">Despesa</span>
              </button>
              <button
                type="button"
                onClick={() => setType('entrada')}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all",
                  type === 'entrada'
                    ? "border-green-500 bg-green-50 text-green-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                )}
              >
                <ArrowUpCircle className="w-5 h-5" />
                <span className="font-medium">Receita</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Descrição</label>
                <Input
                  placeholder="Ex. Almoço no restaurante"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Valor</label>
                <Input
                  type="number"
                  placeholder="R$ 0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Categoria</label>
                <Select
                  options={categoryOptions}
                  value={categoryId}
                  onChange={setCategoryId}
                  placeholder="Selecione"
                  className="bg-white"
                />
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

import { cn } from '@/utils/cn';
import { Plus, Minus } from 'lucide-react';

export type TransactionType = 'entrada' | 'saida';

export interface TypeProps {
  type: TransactionType;
  className?: string;
}

const typeConfig: Record<TransactionType, { label: string; icon: typeof Plus; colorClass: string }> = {
  entrada: {
    label: 'Entrada',
    icon: Plus,
    colorClass: 'text-brand-base',
  },
  saida: {
    label: 'Saída',
    icon: Minus,
    colorClass: 'text-danger',
  },
};

export function Type({ type, className }: TypeProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <div
        className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center',
          type === 'entrada' ? 'bg-brand-base' : 'bg-danger'
        )}
      >
        <Icon className="w-4 h-4 text-white" />
      </div>
      <span className={cn('text-sm font-medium', config.colorClass)}>
        {config.label}
      </span>
    </div>
  );
}


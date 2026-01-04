import { cn } from '@/utils/cn';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export type TransactionType = 'entrada' | 'saida';

export interface TypeProps {
  type: TransactionType;
  className?: string;
}

const typeConfig: Record<TransactionType, { label: string; icon: typeof ArrowUpCircle; colorClass: string }> = {
  entrada: {
    label: 'Entrada',
    icon: ArrowUpCircle,
    colorClass: 'text-brand-base',
  },
  saida: {
    label: 'Saída',
    icon: ArrowDownCircle,
    colorClass: 'text-danger',
  },
};

export function Type({ type, className }: TypeProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <Icon className={cn('w-5 h-5', config.colorClass)} />
      <span className={cn('text-sm font-medium', config.colorClass)}>
        {config.label}
      </span>
    </div>
  );
}

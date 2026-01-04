import {
  PiggyBank,
  Utensils,
  Fuel,
  ShoppingCart,
  Briefcase,
  Home,
  Ticket,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const categoryIcons: Record<string, LucideIcon> = {
  Alimentação: Utensils,
  Transporte: Fuel,
  Mercado: ShoppingCart,
  Investimento: Briefcase,
  Receita: PiggyBank,
  Salário: Briefcase,
  Utilidades: Home,
  Entretenimento: Ticket,
  default: Briefcase,
};

export const categoryColors: Record<
  string,
  'blue' | 'purple' | 'orange' | 'green' | 'pink' | 'yellow' | 'gray'
> = {
  Alimentação: 'blue',
  Transporte: 'purple',
  Mercado: 'orange',
  Investimento: 'green',
  Receita: 'green',
  Salário: 'green',
  Entretenimento: 'pink',
  Utilidades: 'yellow',
  default: 'gray',
};

export function getCategoryIcon(categoryName: string): LucideIcon {
  return categoryIcons[categoryName] || categoryIcons.default;
}

export function getCategoryColor(
  categoryName: string
): 'blue' | 'purple' | 'orange' | 'green' | 'pink' | 'yellow' | 'gray' {
  return categoryColors[categoryName] || categoryColors.default;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(date);
}


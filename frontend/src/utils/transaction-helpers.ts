import type { LucideIcon } from 'lucide-react';
import {
  Briefcase,
  Car,
  Fuel,
  Heart,
  Home,
  PiggyBank,
  ShoppingCart,
  Tag,
  Ticket,
  Utensils,
  Wallet,
  Zap,
} from 'lucide-react';

export const categoryIcons: Record<string, LucideIcon> = {
  Alimentação: Utensils,
  Transporte: Fuel,
  Mercado: ShoppingCart,
  Investimento: Briefcase,
  Receita: PiggyBank,
  Salário: Briefcase,
  Utilidades: Home,
  Entretenimento: Ticket,
  default: Tag,
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

export function getCategoryIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  if (lower.includes('aliment')) return Utensils;
  if (lower.includes('entreten')) return Ticket;
  if (lower.includes('invest')) return Briefcase;
  if (lower.includes('mercado')) return ShoppingCart;
  if (lower.includes('salário') || lower.includes('salario')) return Wallet;
  if (lower.includes('saúde') || lower.includes('saude')) return Heart;
  if (lower.includes('transporte')) return Car;
  if (lower.includes('utilidades')) return Zap;
  if (lower.includes('casa') || lower.includes('moradia')) return Home;
  
  return categoryIcons[name] || categoryIcons.default;
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


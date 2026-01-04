import type { LucideIcon } from 'lucide-react';
import {
  Book,
  Briefcase,
  Car,
  Dumbbell,
  FileText,
  Fuel,
  Gift,
  Heart,
  Home,
  LayoutGrid,
  PawPrint,
  PiggyBank,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Ticket,
  Utensils,
  Wallet,
  Zap,
} from 'lucide-react';

export const ICONS_MAP: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  car: Car,
  heart: Heart,
  home: Home,
  cart: ShoppingCart,
  ticket: Ticket,
  gift: Gift,
  food: Utensils,
  pet: PawPrint,
  gym: Dumbbell,
  book: Book,
  shopping: ShoppingBag,
  bill: FileText,
  other: LayoutGrid,
  // Legacy mappings
  alimentacao: Utensils,
  transporte: Car,
  mercado: ShoppingCart,
  investimento: Briefcase,
  receita: PiggyBank,
  salario: Wallet,
  utilidades: Zap,
  entretenimento: Ticket,
  default: Tag,
};

export function getIconByName(name: string): LucideIcon {
  return ICONS_MAP[name] || ICONS_MAP.default;
}

export const categoryIcons: Record<string, LucideIcon> = {
  // Keeping for backward compatibility if needed, but pointing to new map
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
  if (!dateString || isNaN(date.getTime())) return '-';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(date);
}

import { cn } from '@/utils/cn';

export type TagVariant = 'gray' | 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green';

export interface TagProps {
  variant?: TagVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<TagVariant, string> = {
  gray: 'bg-gray-200 text-gray-800',
  blue: 'bg-blue-light text-blue-base',
  purple: 'bg-purple-light text-purple-base',
  pink: 'bg-pink-light text-pink-base',
  red: 'bg-red-light text-red-base',
  orange: 'bg-orange-light text-orange-base',
  yellow: 'bg-yellow-light text-yellow-base',
  green: 'bg-green-light text-green-base',
};

export function Tag({ variant = 'gray', children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}


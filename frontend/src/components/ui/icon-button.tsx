import { cn } from '@/utils/cn';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { type LucideIcon } from 'lucide-react';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: LucideIcon;
  variant?: 'default' | 'danger';
  size?: 'sm' | 'md';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon: Icon, variant = 'default', size = 'md', disabled, ...props }, ref) => {
    const baseStyles = 'rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';

    const variants = {
      default: cn(
        'text-gray-800',
        'hover:bg-gray-100 hover:text-gray-700',
        'disabled:text-gray-400 disabled:cursor-not-allowed',
        'focus:ring-gray-400'
      ),
      danger: cn(
        'text-danger',
        'hover:bg-red-light',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:ring-danger'
      ),
    };

    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
    };

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <Icon className={iconSizes[size]} />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';


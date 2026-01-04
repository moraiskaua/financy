import { cn } from '@/utils/cn';
import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { type LucideIcon } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon: Icon, iconPosition = 'left', children, disabled, ...props }, ref) => {
    const baseStyles = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2';

    const variants = {
      primary: cn(
        'bg-brand-base text-white',
        'hover:bg-brand-dark',
        'disabled:bg-brand-base disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:ring-brand-base'
      ),
      ghost: cn(
        'bg-white text-gray-800 border border-gray-300',
        'hover:bg-gray-100 hover:border-gray-400',
        'disabled:bg-white disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed',
        'focus:ring-gray-400'
      ),
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
    };

    const iconElement = Icon && <Icon className="w-4 h-4" />;

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {Icon && iconPosition === 'left' && iconElement}
        {children}
        {Icon && iconPosition === 'right' && iconElement}
      </button>
    );
  }
);

Button.displayName = 'Button';

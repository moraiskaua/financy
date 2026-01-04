import { cn } from '@/utils/cn';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

export interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ className, active, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'w-8 h-8 rounded-md text-sm font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-base',
          active
            ? 'bg-brand-base text-white'
            : disabled
              ? 'bg-gray-100 border border-gray-300 text-gray-400 cursor-not-allowed'
              : cn(
                  'bg-gray-100 border border-gray-300 text-gray-600',
                  'hover:bg-gray-200'
                ),
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PaginationButton.displayName = 'PaginationButton';


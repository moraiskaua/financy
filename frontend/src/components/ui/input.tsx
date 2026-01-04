import { cn } from '@/utils/cn';
import { type LucideIcon } from 'lucide-react';
import { type InputHTMLAttributes, forwardRef, useState } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'disabled'> {
  label?: string;
  helper?: string;
  error?: string;
  icon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
  disabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helper, error, icon: Icon, rightIcon: RightIcon, onRightIconClick, disabled, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = !!error;
    const hasValue = !!props.value || (typeof props.value === 'string' && props.value.length > 0);
    const isActive = isFocused;
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const paddingLeft = Icon ? 'pl-10' : 'pl-3';
    const paddingRight = RightIcon ? 'pr-10' : 'pr-3';
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              'block text-sm font-medium mb-1 transition-colors',
              isActive && !hasError ? 'text-brand-base' : hasError ? 'text-danger' : 'text-gray-800'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors pointer-events-none',
                disabled
                  ? 'text-gray-500'
                  : isActive && !hasError
                    ? 'text-brand-base'
                    : hasError
                      ? 'text-danger'
                      : hasValue
                        ? 'text-gray-800'
                        : 'text-gray-400'
              )}
            />
          )}
          <input
            ref={ref}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              'w-full rounded-md text-sm transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              paddingLeft,
              paddingRight,
              'py-2',
              disabled
                ? 'bg-gray-100 border-gray-300 text-gray-800 cursor-not-allowed opacity-50'
                : hasError
                  ? 'border border-danger text-gray-800 focus:border-danger focus:ring-danger'
                  : isActive
                    ? 'border border-brand-base text-gray-800 focus:border-brand-base focus:ring-brand-base'
                    : hasValue
                      ? 'border border-gray-300 text-gray-800 focus:border-brand-base focus:ring-brand-base'
                      : 'border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-brand-base focus:ring-brand-base',
              className
            )}
            {...props}
          />
          {RightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              disabled={disabled}
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors cursor-pointer',
                disabled
                  ? 'text-gray-500 cursor-not-allowed'
                  : hasError
                    ? 'text-danger'
                    : hasValue
                      ? 'text-gray-800'
                      : 'text-gray-400'
              )}
            >
              <RightIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        {(helper || error) && (
          <p className={cn('mt-1 text-sm', error ? 'text-danger' : 'text-gray-500')}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

import { cn } from '@/utils/cn';
import { useState, useRef, useEffect } from 'react';
import { type LucideIcon, ChevronDown, ChevronUp, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  helper?: string;
  error?: string;
  icon?: LucideIcon;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  helper,
  error,
  icon: Icon,
  placeholder = 'Selecione uma opção',
  options,
  value,
  onChange,
  disabled,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === (value ?? internalValue));

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const hasError = !!error;
  const hasValue = !!selectedOption;

  const handleSelect = (optionValue: string) => {
    setInternalValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          className={cn(
            'block text-sm font-medium mb-1 transition-colors',
            isOpen && !hasError ? 'text-brand-base' : hasError ? 'text-danger' : 'text-gray-800'
          )}
        >
          {label}
        </label>
      )}
      <div className="relative" ref={containerRef}>
        {Icon && (
          <Icon
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 transition-colors',
              disabled
                ? 'text-gray-500'
                : isOpen && !hasError
                  ? 'text-brand-base'
                  : hasError
                    ? 'text-danger'
                    : hasValue
                      ? 'text-gray-800'
                      : 'text-gray-400'
            )}
          />
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            'w-full rounded-md text-sm transition-colors text-left',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            Icon ? 'pl-10 pr-10 py-2' : 'px-3 pr-10 py-2',
            disabled
              ? 'bg-gray-100 border-gray-300 text-gray-800 cursor-not-allowed opacity-50'
              : hasError
                ? 'border border-danger text-gray-800 focus:border-danger focus:ring-danger'
                : hasValue
                  ? 'border border-gray-300 text-gray-800 focus:border-brand-base focus:ring-brand-base'
                  : 'border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:border-brand-base focus:ring-brand-base'
          )}
        >
          <span className={cn('block truncate', !selectedOption && 'text-gray-400')}>
            {selectedOption?.label || placeholder}
          </span>
        </button>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-800" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="py-1 max-h-60 overflow-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'w-full px-3 py-2 text-sm text-left flex items-center justify-between hover:bg-gray-100 transition-colors',
                    selectedOption?.value === option.value && 'bg-gray-50'
                  )}
                >
                  <span className="text-gray-800">{option.label}</span>
                  {selectedOption?.value === option.value && (
                    <Check className="w-4 h-4 text-brand-base" />
                  )}
                </button>
              ))}
            </div>
          </div>
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


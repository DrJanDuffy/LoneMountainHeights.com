'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  options?: Array<{ value: string; label: string }>;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  autoComplete?: string;
  'aria-describedby'?: string;
}

export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, FormFieldProps>(
  (
    {
      id,
      name,
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      required = false,
      disabled = false,
      className = '',
      options = [],
      rows = 3,
      min,
      max,
      step,
      pattern,
      autoComplete,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    const fieldId = `${id}-field`;
    const errorId = `${id}-error`;
               const describedBy = [ariaDescribedBy, error && errorId].filter(Boolean).join(' ');
           const ariaInvalid: 'true' | 'false' = error ? 'true' : 'false';

    const baseInputClasses = cn(
      'w-full px-4 py-3 border rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
      error
        ? 'border-red-300 focus:ring-red-500 focus:border-red-300'
        : 'border-gray-300 focus:border-blue-500',
      className
    );

    const renderField = () => {
      const commonProps = {
        id: fieldId,
        name,
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
          onChange?.(e.target.value),
        onBlur,
        disabled,
        required,
                       'aria-describedby': describedBy || undefined,
               'aria-invalid': ariaInvalid,
        autoComplete,
      };

      switch (type) {
        case 'textarea':
          return (
            <textarea
              {...commonProps}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={cn(baseInputClasses, 'resize-vertical min-h-[120px]')}
              placeholder={placeholder}
              rows={rows}
            />
          );

        case 'select':
          return (
            <select
              {...commonProps}
              ref={ref as React.Ref<HTMLSelectElement>}
              className={cn(baseInputClasses, 'appearance-none bg-white')}
            >
              <option value="">{placeholder || 'Select an option'}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );

        default:
          return (
            <input
              {...commonProps}
              ref={ref as React.Ref<HTMLInputElement>}
              type={type}
              className={baseInputClasses}
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
              pattern={pattern}
            />
          );
      }
    };

    return (
      <div className="space-y-2">
        <label
          htmlFor={fieldId}
          className={cn(
            'block text-sm font-medium text-gray-700',
            required && 'after:content-["*"] after:ml-1 after:text-red-500'
          )}
        >
          {label}
        </label>
        
        <div className="relative">
          {renderField()}
          {type === 'select' && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField'; 
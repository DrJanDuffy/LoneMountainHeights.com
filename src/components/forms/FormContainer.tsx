'use client';

import React from 'react';
import { cn } from '@/utils/cn';

export interface FormContainerProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
  title?: string;
  description?: string;
  errors?: string[];
  isLoading?: boolean;
  'aria-describedby'?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  onSubmit,
  className = '',
  title,
  description,
  errors = [],
  isLoading = false,
  'aria-describedby': ariaDescribedBy,
}) => {
  const errorId = 'form-errors';
  const describedBy = [ariaDescribedBy, errors.length > 0 && errorId].filter(Boolean).join(' ');

  return (
    <div className={cn('bg-white rounded-xl shadow-lg p-6 md:p-8', className)}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          )}
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>
      )}

      {errors.length > 0 && (
        <div
          id={errorId}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          role="alert"
          aria-live="polite"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                There were errors with your submission
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="space-y-6"
        aria-describedby={describedBy || undefined}
        noValidate
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-xl z-10">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-600">Processing...</span>
            </div>
          </div>
        )}
        
        {children}
      </form>
    </div>
  );
}; 
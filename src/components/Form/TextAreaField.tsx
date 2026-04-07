import React, { TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const defaultId = id || label.replace(/\s+/g, '-').toLowerCase();

    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <label htmlFor={defaultId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          id={defaultId}
          ref={ref}
          className={cn(
            'flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);
TextAreaField.displayName = 'TextAreaField';

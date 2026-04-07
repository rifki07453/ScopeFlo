import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="flex flex-col md:flex-row md:gap-8 border-b border-gray-100 py-8 last:border-0 last:pb-0 first:pt-0">
      <div className="md:w-1/3 mb-6 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="md:w-2/3 space-y-4">
        {children}
      </div>
    </div>
  );
}

import React from 'react';
import { cn } from '@/utils/helpers';

export function Container({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("container mx-auto px-4 max-w-5xl", className)} {...props}>
      {children}
    </div>
  );
}

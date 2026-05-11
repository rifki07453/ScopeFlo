import React from 'react';
import { ItemStatus } from '@/types/review';

interface StatusBadgeProps {
  status: ItemStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getBadgeStyle = (status: ItemStatus) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'revision':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLabel = (status: ItemStatus) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'in_review': return 'In Review';
      case 'approved': return 'Approved';
      case 'revision': return 'Revision Needed';
      default: return 'Unknown';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle(status)}`}>
      {getLabel(status)}
    </span>
  );
}

import React from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';

export function SummaryCards() {
  const { documents } = useDashboardStore();

  const activeDocsCount = documents.filter(doc => doc.status !== 'Draft' && doc.status !== 'Expired').length;
  const totalValue = documents
    .filter(doc => doc.status === 'Signed')
    .reduce((sum, doc) => sum + doc.total_value, 0);
  
  const totalSent = documents.filter(doc => ['Sent', 'Viewed', 'Signed'].includes(doc.status)).length;
  const signedCount = documents.filter(doc => doc.status === 'Signed').length;
  const signedPercentage = totalSent > 0 ? Math.round((signedCount / totalSent) * 100) : 0;
  
  const pendingCount = documents.filter(doc => doc.status === 'Viewed').length;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <span className="text-sm font-medium text-gray-500 mb-2">Active Documents</span>
        <span className="text-3xl font-bold text-gray-900">{activeDocsCount}</span>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <span className="text-sm font-medium text-gray-500 mb-2">Total Value (Signed)</span>
        <span className="text-3xl font-bold text-gray-900">{formatCurrency(totalValue)}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <span className="text-sm font-medium text-gray-500 mb-2">Signed Rate</span>
        <span className="text-3xl font-bold text-gray-900">{signedPercentage}%</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <span className="text-sm font-medium text-gray-500 mb-2">Pending Action (Viewed)</span>
        <span className="text-3xl font-bold text-orange-600">{pendingCount}</span>
      </div>
    </div>
  );
}

'use client';
import React from 'react';
import { DocumentTable } from '@/components/Dashboard/DocumentTable';
import { useDashboardStore } from '@/store/useDashboardStore';

export default function DocumentsPage() {
  const { filterCategory, setFilterCategory } = useDashboardStore();
  const filterOptions = ['All', 'SOW', 'Quotation', 'Contract'];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All Documents</h2>
          <p className="text-gray-500 mt-1">Manage all your generated and sent documents.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-gray-500 mr-2">Filter by:</span>
        {filterOptions.map(option => (
          <button
            key={option}
            onClick={() => setFilterCategory(option)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filterCategory === option 
                ? 'bg-[#5a32fa] text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <DocumentTable />
    </div>
  );
}

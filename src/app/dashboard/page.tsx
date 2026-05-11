'use client';

import React from 'react';
import { SummaryCards } from '@/components/Dashboard/SummaryCards';
import { DocumentTable } from '@/components/Dashboard/DocumentTable';
import { ActivityLog } from '@/components/Dashboard/ActivityLog';
import { useDashboardStore } from '@/store/useDashboardStore';

export default function DashboardPage() {
  const { filterCategory, setFilterCategory } = useDashboardStore();

  const filterOptions = ['All', 'SOW', 'Quotation', 'Contract'];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
        <p className="text-gray-500 mt-1">Here's what's happening with your documents today.</p>
      </div>

      <SummaryCards />

      {/* Filter Section */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DocumentTable />
        </div>
        <div className="lg:col-span-1">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
}

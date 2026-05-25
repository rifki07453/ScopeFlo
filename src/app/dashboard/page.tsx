'use client';

import React from 'react';
import { SummaryCards } from '@/components/Dashboard/SummaryCards';
import { DocumentTable } from '@/components/Dashboard/DocumentTable';
import { ActivityLog } from '@/components/Dashboard/ActivityLog';
import { NewDocumentModal } from '@/components/Dashboard/NewDocumentModal';
import { Button } from '@/components/UI/Button';
import { Plus } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function DashboardPage() {
  const { filterCategory, setFilterCategory } = useDashboardStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const filterOptions = ['All', 'SOW', 'Quotation', 'Contract'];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h2>
          <p className="text-gray-500 mt-1">Here's what's happening with your documents today.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5a32fa] hover:bg-[#4b27d4] text-white shadow-md shadow-[#5a32fa]/20 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Document
        </Button>
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

      <NewDocumentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

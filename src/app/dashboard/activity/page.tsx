'use client';
import React from 'react';
import { ActivityLog } from '@/components/Dashboard/ActivityLog';

export default function ActivityPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Activity History</h2>
        <p className="text-gray-500 mt-1">Track all interactions with your documents.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
        <ActivityLog />
      </div>
    </div>
  );
}

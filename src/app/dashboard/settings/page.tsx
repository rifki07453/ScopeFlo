'use client';
import React from 'react';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account preferences and defaults.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <p className="text-gray-600">Settings implementation goes here (Profile, Billing, Notifications).</p>
      </div>
    </div>
  );
}

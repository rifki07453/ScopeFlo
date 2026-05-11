"use client";

import React, { useState } from 'react';
import { Search, FileCheck, Clock, CheckCircle2 } from 'lucide-react';

export function DocumentTracker() {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'found'>('idle');
  const [docType, setDocType] = useState('SOW');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setStatus('searching');
    // Simulate API call
    setTimeout(() => {
      // Simple mock logic based on input
      if (trackingId.toLowerCase().includes('prop')) {
        setDocType('Proposal');
      } else {
        setDocType('SOW');
      }
      setStatus('found');
    }, 1500);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Search className="w-6 h-6 text-purple-400" />
        Track Document
      </h3>
      <p className="text-gray-300 text-sm mb-6">
        Enter your tracking ID to check the status of your SOW, Proposal, or other documents.
      </p>

      <form onSubmit={handleTrack} className="flex flex-col gap-4 relative z-10">
        <div className="relative">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="e.g. SOW-2024-001"
            className="w-full bg-black/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === 'searching' || !trackingId.trim()}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
        >
          {status === 'searching' ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            'Track Status'
          )}
        </button>
      </form>

      {status === 'found' && (
        <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in relative z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-sm uppercase tracking-wider">{docType} STATUS</span>
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Approved
            </span>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-0 z-10">
                <FileCheck className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-3 rounded-lg ml-4 md:ml-0 md:mr-4 z-10">
                <h4 className="text-white text-sm font-medium">Document Signed</h4>
                <p className="text-gray-400 text-xs mt-1">Today, 10:42 AM</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-700 text-gray-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-0 z-10">
                <Clock className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-3 rounded-lg ml-4 md:ml-0 md:ml-4 md:text-right z-10">
                <h4 className="text-gray-300 text-sm font-medium">Sent for Review</h4>
                <p className="text-gray-500 text-xs mt-1">Yesterday, 14:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

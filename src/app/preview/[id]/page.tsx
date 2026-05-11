"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useReviewStore } from '@/store/useReviewStore';
import { generateSowDocument } from '@/lib/generator/sowTemplate';
import { DiscussionPanel } from '@/components/Review/DiscussionPanel';
import { StatusBadge } from '@/components/Review/StatusBadge';
import { Button } from '@/components/UI/Button';
import { ArrowLeft, Send } from 'lucide-react';

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;
  
  const { getItem, sendPreviewForReview, currentUser, setCurrentUserRole } = useReviewStore();
  const item = getItem(itemId);
  
  const [sowHtml, setSowHtml] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (item) {
      setSowHtml(generateSowDocument(item.content));
    }
  }, [item]);

  if (!isMounted) return null;

  if (!item) {
    return (
      <div className="flex h-[60vh] items-center justify-center flex-col gap-4">
        <p className="text-gray-500 text-lg">Item not found.</p>
        <Button variant="outline" onClick={() => router.push('/generator')}>
          Go to Generator
        </Button>
      </div>
    );
  }

  const isCreator = currentUser.id === item.created_by;

  const handleSendForReview = () => {
    sendPreviewForReview(item.id);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Panel: Content Preview */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/generator')} 
              className="text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Document Preview</h1>
              <div className="flex items-center gap-3 mt-1">
                <StatusBadge status={item.status} />
                <span className="text-sm text-gray-500">{item.content.projectTitle}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mock User Switcher for Testing */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1 mr-4">
              <button 
                onClick={() => setCurrentUserRole('creator')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${currentUser.role === 'creator' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                Creator
              </button>
              <button 
                onClick={() => setCurrentUserRole('reviewer')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${currentUser.role === 'reviewer' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                Reviewer
              </button>
            </div>

            {item.status === 'draft' && isCreator && (
              <Button onClick={handleSendForReview}>
                <Send className="w-4 h-4 mr-2" />
                Send for Review
              </Button>
            )}
            
            {item.status === 'approved' && (
              <Button onClick={() => router.push(`/result/${item.id}`)} className="bg-green-600 hover:bg-green-700">
                Generate Final Result
              </Button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="bg-white shadow-sm ring-1 ring-gray-100 rounded-lg p-8 max-w-4xl mx-auto min-h-full">
            <div dangerouslySetInnerHTML={{ __html: sowHtml }} />
          </div>
        </main>
      </div>

      {/* Right Panel: Discussion */}
      <div className="w-[400px] shrink-0 border-l border-gray-200 bg-white">
        <DiscussionPanel item={item} />
      </div>
    </div>
  );
}

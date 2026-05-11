"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/Layout/Container';
import { Button } from '@/components/UI/Button';
import { useReviewStore } from '@/store/useReviewStore';
import { generateSowDocument } from '@/lib/generator/sowTemplate';
import { exportToPDF } from '@/utils/pdfExport';
import { Download, ArrowLeft, Copy, Check, Lock } from 'lucide-react';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params.id as string;
  
  const { getItem } = useReviewStore();
  const item = getItem(itemId);

  const [sowHtml, setSowHtml] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (item && item.status === 'approved') {
      setSowHtml(generateSowDocument(item.content));
    }
  }, [item]);

  if (!isMounted) return null;

  if (!item) {
    return (
      <div className="flex h-[60vh] items-center justify-center flex-col gap-4">
        <p className="text-gray-500 text-lg">Document not found.</p>
        <Button variant="outline" onClick={() => router.push('/generator')}>
          Go to Generator
        </Button>
      </div>
    );
  }

  // Security check: only allow generation if approved
  if (item.status !== 'approved') {
    return (
      <Container className="py-20">
        <div className="max-w-md mx-auto text-center flex flex-col items-center bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500 mb-8">
            The final result cannot be generated because this document has not been approved yet. Current status: <strong>{item.status}</strong>.
          </p>
          <Button onClick={() => router.push(`/preview/${item.id}`)}>
            Back to Preview
          </Button>
        </div>
      </Container>
    );
  }

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDF('sow-document', `${item.content.clientName.replace(/\s+/g, '_')}_SOW.pdf`);
    } catch (error) {
      console.error('Failed to export PDF', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = () => {
    const el = document.getElementById('sow-document');
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Container className="py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <button 
            onClick={() => router.push(`/preview/${item.id}`)} 
            className="flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Preview
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Official Document</h1>
          <p className="text-gray-500 text-sm mt-1">This document has been approved and is ready for use.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleCopy} className="bg-white">
            {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied' : 'Copy Text'}
          </Button>
          <Button onClick={handleExportPDF} isLoading={isExporting}>
            {!isExporting && <Download className="w-4 h-4 mr-2" />}
            Download PDF
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden border border-gray-100 flex justify-center py-10 px-4 md:px-10 lg:px-20 mx-auto w-full">
        <div 
          id="sow-document" 
          className="w-full max-w-[800px] bg-white ring-1 ring-gray-100 p-8 shadow-sm"
          dangerouslySetInnerHTML={{ __html: sowHtml }}
        />
      </div>
    </Container>
  );
}

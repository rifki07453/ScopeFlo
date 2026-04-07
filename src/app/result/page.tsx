"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/Layout/Container';
import { Button } from '@/components/UI/Button';
import { useSowStore } from '@/store/useSowStore';
import { generateSowDocument } from '@/lib/generator/sowTemplate';
import { exportToPDF } from '@/utils/pdfExport';
import { Download, ArrowLeft, Copy, Check } from 'lucide-react';

export default function ResultPage() {
  const router = useRouter();
  const { data } = useSowStore();
  const [sowHtml, setSowHtml] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // To avoid unstyled flashes or issues, we wait for hydration to show content
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!data) {
      router.replace('/generator');
    } else {
      setSowHtml(generateSowDocument(data));
    }
  }, [data, router]);

  if (!isMounted || !data) {
    return (
      <div className="flex h-[60vh] items-center justify-center flex-col gap-4">
        <p className="text-gray-500 text-lg">No data found. Please generate a document first.</p>
        <Button variant="outline" onClick={() => router.push('/generator')}>
          Go to Generator
        </Button>
      </div>
    );
  }

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDF('sow-document', `${data.clientName.replace(/\s+/g, '_')}_SOW.pdf`);
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
            onClick={() => router.back()} 
            className="flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Edit
          </button>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Document is Ready</h1>
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

import React from 'react';
import { Button } from '../UI/Button';
import { X, PlusCircle } from 'lucide-react';
import { useDocumentGeneratorStore } from '@/store/useDocumentGeneratorStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CLAUSES = [
  {
    title: 'Non-Disclosure (NDA)',
    content: 'The Receiving Party ([Client]) shall not disclose, directly or indirectly, any Confidential Information to any third party without the prior written consent of the Disclosing Party ([Provider]).',
  },
  {
    title: 'Intellectual Property Rights',
    content: 'All Intellectual Property Rights created or developed by [Provider] during the course of the Services shall remain the exclusive property of [Provider] until full payment has been received from [Client].',
  },
  {
    title: 'Termination for Convenience',
    content: 'Either Party may terminate this Agreement at any time by providing thirty (30) days prior written notice to the other Party. Upon termination, [Client] shall pay for all Services rendered by [Provider] up to the date of termination.',
  },
  {
    title: 'Force Majeure',
    content: 'Neither [Provider] nor [Client] shall be liable for any failure or delay in performing its obligations under this Agreement if such failure or delay is caused by circumstances beyond its reasonable control, including but not limited to acts of God, war, or natural disasters.',
  }
];

export function ClauseLibraryModal({ isOpen, onClose }: Props) {
  const { draft, updateField } = useDocumentGeneratorStore();

  if (!isOpen) return null;

  const handleAddClause = (content: string) => {
    // Dynamic Variable Substitution
    const providerStr = draft.providerName || '[Provider Name]';
    const clientStr = draft.clientName || '[Client Name]';
    
    const substitutedContent = content
      .replace(/\[Provider\]/g, providerStr)
      .replace(/\[Client\]/g, clientStr);

    const currentText = draft.legalClauses || '';
    const newText = currentText ? `${currentText}\n\n${substitutedContent}` : substitutedContent;
    updateField('legalClauses', newText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Clause Library</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <p className="text-gray-500 text-sm mb-4">Click to inject standard legal clauses directly into your contract.</p>
          
          {CLAUSES.map((clause, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">{clause.title}</h3>
                <Button 
                  onClick={() => handleAddClause(clause.content)}
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200 py-1.5 px-3 rounded-lg text-xs font-bold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <PlusCircle className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{clause.content}</p>
            </div>
          ))}
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <Button onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-6">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

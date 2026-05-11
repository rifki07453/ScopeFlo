import React from 'react';
import { useDocumentGeneratorStore } from '@/store/useDocumentGeneratorStore';
import { useAuthStore } from '@/store/useAuthStore';

interface Props {
  docType: string;
}

export function DocumentPreview({ docType }: Props) {
  const { draft, calculateTotal } = useDocumentGeneratorStore();
  const { subtotal, taxAmount, finalTotal } = calculateTotal();
  const { isLoggedIn } = useAuthStore();

  // Helper to safely render multiline text
  const renderText = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));
  };

  const getDocTypeName = () => {
    switch(docType) {
      case 'quotation': return 'QUOTATION';
      case 'proposal': return 'PROPOSAL';
      case 'sow': return 'STATEMENT OF WORK';
      case 'sla': return 'SERVICE LEVEL AGREEMENT';
      case 'msa': return 'MASTER SERVICE AGREEMENT';
      case 'nda': return 'NON-DISCLOSURE AGREEMENT';
      case 'contract': return 'CONTRACT AGREEMENT';
      case 'cr': return 'CHANGE REQUEST';
      case 'progress_report': return 'PROGRESS REPORT';
      case 'invoice': return 'INVOICE';
      case 'bast': return 'HANDOVER (BAST)';
      default: return 'DOCUMENT';
    }
  };

  return (
    <div 
      id="pdf-document"
      className="bg-white shadow-lg mx-auto w-full max-w-[800px] min-h-[1130px] p-12 text-gray-900 relative pb-24"
      style={{ fontFamily: draft.fontFamily, fontSize: '14px', lineHeight: '1.6' }}
    >
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start mb-12 border-b-4 pb-6" style={{ borderColor: draft.themeColor }}>
        <div className="w-1/2 flex items-center justify-start">
          {draft.providerLogo ? (
            <img src={draft.providerLogo} alt="Provider Logo" className="max-w-[150px] max-h-[80px] object-contain" />
          ) : (
            <h2 className="text-2xl font-black tracking-tighter text-gray-900">
              {draft.providerName || 'YOUR COMPANY'}
            </h2>
          )}
        </div>
        <div className="w-1/2 flex flex-col items-end text-right">
          <h1 className="text-3xl font-light tracking-widest text-gray-500 mb-2">
            {getDocTypeName()}
          </h1>
          <div className="text-sm">
            <p><span className="font-bold">Date:</span> {draft.date ? new Date(draft.date).toLocaleDateString() : 'N/A'}</p>
            <p><span className="font-bold">Ref ID:</span> {draft.id}</p>
            {draft.referenceNumber && <p><span className="font-bold">Reference:</span> {draft.referenceNumber}</p>}
          </div>
        </div>
      </div>

      {/* META INFO */}
      <div className="flex justify-between mb-10">
        <div className="w-1/2">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Prepared For</h3>
          <div className="flex items-center gap-4">
            {draft.clientLogo && (
              <img src={draft.clientLogo} alt="Client Logo" className="w-12 h-12 object-contain" />
            )}
            <div>
              <p className="font-bold text-lg">{draft.clientName || 'Client Name'}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 text-right">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Project</h3>
          <p className="font-bold text-lg">{draft.title || 'Untitled Project'}</p>
        </div>
      </div>

      {/* SUMMARY */}
      {draft.summary && (
        <div className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Summary</h3>
          <p className="text-gray-700">{renderText(draft.summary)}</p>
        </div>
      )}

      {/* DYNAMIC CONTENT BASED ON TYPE */}
      
      {/* Phase 1: Pra-Proyek */}
      {docType === 'quotation' && draft.quotationDetails && (
        <div className="mb-8">
          <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>Service Description</h3>
          <div className="text-gray-800">{renderText(draft.quotationDetails)}</div>
        </div>
      )}
      {docType === 'proposal' && (
        <div className="space-y-8 mb-12">
          {draft.proposalSolutions && (
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>Proposed Solutions</h3>
              <div className="text-gray-800">{renderText(draft.proposalSolutions)}</div>
            </div>
          )}
          {draft.proposalPortfolio && (
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>Portfolio / Why Us</h3>
              <div className="text-gray-800">{renderText(draft.proposalPortfolio)}</div>
            </div>
          )}
        </div>
      )}

      {/* Phase 2: Kesepakatan */}
      {docType === 'sow' && (
        <div className="space-y-8 mb-12">
          {draft.scopeOfWork && (
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>1. Scope of Work</h3>
              <div className="text-gray-800">{renderText(draft.scopeOfWork)}</div>
            </div>
          )}
          {draft.deliverables && (
            <div style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>2. Deliverables</h3>
              <div className="text-gray-800">{renderText(draft.deliverables)}</div>
            </div>
          )}
          {draft.timeline && (
            <div style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>3. Timeline & Milestones</h3>
              <div className="text-gray-800">{renderText(draft.timeline)}</div>
            </div>
          )}
        </div>
      )}
      {docType === 'sla' && draft.slaTerms && (
        <div className="mb-12">
          <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>Service Level Terms</h3>
          <div className="text-gray-800">{renderText(draft.slaTerms)}</div>
        </div>
      )}
      {docType === 'msa' && draft.msaTerms && (
        <div className="mb-12">
          <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>Master Service Terms</h3>
          <div className="text-gray-800">{renderText(draft.msaTerms)}</div>
        </div>
      )}
      {docType === 'nda' && draft.ndaTerms && (
        <div className="mb-12">
          <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>Non-Disclosure Terms</h3>
          <div className="text-gray-800">{renderText(draft.ndaTerms)}</div>
        </div>
      )}
      {docType === 'contract' && (
        <div className="space-y-8 mb-12">
          {draft.agreementTerms && (
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>1. Agreement Terms</h3>
              <div className="text-gray-800">{renderText(draft.agreementTerms)}</div>
            </div>
          )}
          {draft.legalClauses && (
            <div style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>2. Legal Clauses & Conditions</h3>
              <div className="text-gray-800 text-sm">{renderText(draft.legalClauses)}</div>
            </div>
          )}
        </div>
      )}

      {/* Phase 3: Eksekusi */}
      {docType === 'cr' && (
        <div className="space-y-8 mb-12">
          {draft.crReason && (
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>Reason for Change</h3>
              <div className="text-gray-800">{renderText(draft.crReason)}</div>
            </div>
          )}
          {draft.crDescription && (
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>Change Description</h3>
              <div className="text-gray-800">{renderText(draft.crDescription)}</div>
            </div>
          )}
        </div>
      )}
      {docType === 'progress_report' && (
        <div className="space-y-8 mb-12">
          {draft.progressReportPeriod && (
            <div>
              <p className="font-bold text-gray-900 mb-4">Report Period: <span className="font-normal">{draft.progressReportPeriod}</span></p>
            </div>
          )}
          {draft.progressCompleted && (
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>Completed Work</h3>
              <div className="text-gray-800">{renderText(draft.progressCompleted)}</div>
            </div>
          )}
          {draft.progressBlockers && (
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-3 text-red-600" style={{ borderColor: 'red' }}>Blockers / Needs Action</h3>
              <div className="text-gray-800">{renderText(draft.progressBlockers)}</div>
            </div>
          )}
        </div>
      )}

      {/* Phase 4: Penutupan */}
      {docType === 'invoice' && draft.invoiceDue && (
        <div className="mb-8">
          <p className="font-bold text-lg text-gray-900 border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>
            Due Date: <span className="font-normal text-gray-800">{new Date(draft.invoiceDue).toLocaleDateString()}</span>
          </p>
        </div>
      )}
      {docType === 'bast' && draft.handoverNotes && (
        <div className="mb-12">
          <h3 className="text-lg font-bold border-b pb-2 mb-3" style={{ borderColor: draft.themeColor, color: draft.themeColor }}>Handover Notes</h3>
          <div className="text-gray-800">{renderText(draft.handoverNotes)}</div>
        </div>
      )}

      {/* PRICING TABLE (Used in all types if items exist, but most critical for Quotation) */}
      {draft.items.length > 0 && draft.items[0].name !== '' && (
        <div className="mb-12" style={{ pageBreakInside: 'avoid' }}>
          <h3 className="text-lg font-bold border-b border-gray-200 pb-2 mb-4 text-gray-900">
            {docType === 'quotation' ? 'Investment & Pricing' : 'Cost Breakdown'}
          </h3>
          <table className="w-full text-left mb-6 border-collapse">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="p-3 font-bold border border-gray-200">Description</th>
                <th className="p-3 font-bold border border-gray-200 w-20 text-center">Qty</th>
                <th className="p-3 font-bold border border-gray-200 w-32 text-right">Unit Price</th>
                <th className="p-3 font-bold border border-gray-200 w-32 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {draft.items.map((item, i) => (
                <tr key={i}>
                  <td className="p-3 border border-gray-200 text-gray-800">{item.name}</td>
                  <td className="p-3 border border-gray-200 text-center text-gray-800">{item.quantity}</td>
                  <td className="p-3 border border-gray-200 text-right text-gray-800">
                    {item.price.toLocaleString()}
                  </td>
                  <td className="p-3 border border-gray-200 text-right text-gray-800 font-medium">
                    {(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTALS */}
          <div className="flex justify-end">
            <div className="w-1/2 max-w-[300px]">
              <div className="flex justify-between py-2 text-gray-700">
                <span>Subtotal:</span>
                <span>{draft.currency} {subtotal.toLocaleString()}</span>
              </div>
              {draft.discountAmount > 0 && (
                <div className="flex justify-between py-2 text-gray-700">
                  <span>Discount:</span>
                  <span>- {draft.currency} {draft.discountAmount.toLocaleString()}</span>
                </div>
              )}
              {draft.taxRate > 0 && (
                <div className="flex justify-between py-2 text-gray-700 border-b border-gray-200">
                  <span>Tax ({draft.taxRate}%):</span>
                  <span>{draft.currency} {taxAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between py-3 text-lg font-bold text-gray-900 border-t-2 border-gray-900 mt-1">
                <span>Total Due:</span>
                <span>{draft.currency} {finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRICING NOTES */}
      {draft.pricingNotes && (
        <div className="mb-12" style={{ pageBreakInside: 'avoid' }}>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Payment Terms & Notes</h3>
          <div className="text-gray-700 text-sm bg-gray-50 p-4 border border-gray-100 rounded">
            {renderText(draft.pricingNotes)}
          </div>
        </div>
      )}

      {/* SIGNATURES */}
      {draft.showSignatures && (
        <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between" style={{ pageBreakInside: 'avoid' }}>
          <div className="w-[45%]">
            <p className="font-bold text-gray-900 mb-12">For {draft.clientName || 'Client'}</p>
            <div className="border-b border-gray-400 mb-2"></div>
            <p className="text-sm text-gray-500">Authorized Signature & Date</p>
          </div>
          <div className="w-[45%]">
            <p className="font-bold text-gray-900 mb-12">For {draft.providerName || 'Provider'}</p>
            <div className="border-b border-gray-400 mb-2"></div>
            <p className="text-sm text-gray-500">Authorized Signature & Date</p>
          </div>
        </div>
      )}

      {/* WATERMARK */}
      {!isLoggedIn && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400 font-medium">
          Generated securely by ScopeFlo
        </div>
      )}
    </div>
  );
}

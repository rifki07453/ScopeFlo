"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FormSection } from '@/components/Form/FormSection';
import { InputField } from '@/components/Form/InputField';
import { TextAreaField } from '@/components/Form/TextAreaField';
import { Button } from '@/components/UI/Button';
import { ArrowLeft, Download, FileText, Settings, Lock, BookOpen, Save, UploadCloud, Loader2, FileCheck } from 'lucide-react';

import { useDocumentGeneratorStore } from '@/store/useDocumentGeneratorStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useHistoryStore } from '@/store/useHistoryStore';
import { ImageUpload } from '@/components/Generator/ImageUpload';
import { ItemizedPricingTable } from '@/components/Generator/ItemizedPricingTable';
import { DocumentPreview } from '@/components/Generator/DocumentPreview';
import { exportToPDF } from '@/utils/pdfExport';
import { exportToDocx } from '@/utils/docxExport';
import { ClauseLibraryModal } from '@/components/Generator/ClauseLibraryModal';
import { DocumentType } from '@/types/document';

function GeneratorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { draft, updateField } = useDocumentGeneratorStore();
  
  const [docType, setDocType] = React.useState<DocumentType>((draft.docType || searchParams.get('type') || 'sow') as DocumentType);

  React.useEffect(() => {
    if (draft.docType && draft.docType !== docType) {
      setDocType(draft.docType as DocumentType);
    }
  }, [draft.docType, docType]);

  const { isLoggedIn, toggleLogin } = useAuthStore();
  const { saveProject } = useHistoryStore();
  
  const [showClauseModal, setShowClauseModal] = React.useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false);

  // Document Import / Conversion State
  const [isImporting, setIsImporting] = React.useState(false);
  const [importSuccess, setImportSuccess] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportSuccess(false);

    // Simulate AI parsing/extraction delay
    setTimeout(() => {
      setIsImporting(false);
      setImportSuccess(true);
      
      // Simulate auto-populating fields based on the uploaded document
      updateField('clientName', 'Imported Client Ltd.');
      updateField('title', file.name.replace(/\.[^/.]+$/, "")); // use filename as title
      updateField('summary', 'This summary was automatically extracted from the uploaded document using ScopeFlo AI.');
      
      if (docType === 'sow') {
        updateField('scopeOfWork', '1. Initial phase setup\n2. Design mockups and review\n3. Final delivery (Extracted from document)');
      }

      // Reset success state after 3 seconds
      setTimeout(() => setImportSuccess(false), 3000);
      
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 2000);
  };

  const handleSaveDraft = () => {
    saveProject(draft);
    alert('Project saved to your Dashboard!');
  };

  const handleExportPDF = async () => {
    await exportToPDF('pdf-document', `${draft.title || docType}_ScopeFlow.pdf`);
  };

  const handleExportDocx = async () => {
    if (!isLoggedIn) {
      setShowUpgradeModal(true);
      return;
    }
    await exportToDocx(draft, docType);
  };

  const handleESign = () => {
    if (!isLoggedIn) {
      setShowUpgradeModal(true);
      return;
    }
    alert("Mock E-Signature: Document sent to client's email for signature!");
  };

  const handleOpenLibrary = () => {
    if (isLoggedIn) setShowClauseModal(true);
    else setShowUpgradeModal(true);
  };

  const DOCUMENT_TYPES = [
    { id: 'quotation', label: 'Quotation', phase: 'Phase 1: Pre-Project' },
    { id: 'proposal', label: 'Proposal', phase: 'Phase 1: Penawaran' },
    { id: 'sow', label: 'Statement of Work (SOW)', phase: 'Phase 2: Agreement' },
    { id: 'sla', label: 'Service Level Agreement (SLA)', phase: 'Phase 2: Agreement' },
    { id: 'msa', label: 'Master Service Agreement (MSA)', phase: 'Phase 2: Agreement' },
    { id: 'nda', label: 'Non-Disclosure Agreement (NDA)', phase: 'Phase 2: Agreement' },
    { id: 'contract', label: 'Contract Agreement', phase: 'Phase 2: Agreement' },
    { id: 'cr', label: 'Change Request Form', phase: 'Phase 3: Execution' },
    { id: 'progress_report', label: 'Progress Report', phase: 'Phase 3: Execution' },
    { id: 'invoice', label: 'Invoice', phase: 'Phase 4: Closing' },
    { id: 'bast', label: 'BAST / Handover', phase: 'Phase 4: Penutupan' },
  ];

  const currentTypeObj = DOCUMENT_TYPES.find(t => t.id === docType) || DOCUMENT_TYPES[0];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
      {/* Left Panel: Configuration Form */}
      <div className="w-1/2 flex flex-col h-full overflow-y-auto border-r border-gray-200 bg-white shadow-xl z-20">
        <div className="px-8 py-6 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <button onClick={() => router.push('/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <div className="text-xs font-bold text-purple-600 mb-1">{currentTypeObj.phase}</div>
              <select 
                value={docType}
                onChange={(e) => {
                  const newType = e.target.value as DocumentType;
                  setDocType(newType);
                  updateField('docType', newType);
                }}
                className="text-2xl font-bold tracking-tight text-gray-900 bg-transparent border-none outline-none cursor-pointer hover:bg-gray-50 rounded px-1 -ml-1 appearance-none focus:ring-0"
              >
                {DOCUMENT_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
              <p className="text-gray-500 text-sm mt-1">Select a document type to change the template format.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLogin}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${isLoggedIn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              title="Toggle Login State (Mock)"
            >
              {isLoggedIn ? 'Premium Mode' : 'Guest Mode'}
            </button>
            <Button onClick={handleSaveDraft} variant="outline" className="border-[#5a32fa] text-[#5a32fa] hover:bg-[#5a32fa]/10">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handleExportPDF} className="bg-[#5a32fa] hover:bg-[#4b27d4] shadow-md shadow-[#5a32fa]/20">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="p-8 flex-1 space-y-8">
          
          {/* IMPORT DOCUMENT DROPZONE (iLovePDF Style) */}
          <div 
            className="border-2 border-dashed border-[#5a32fa]/30 bg-[#5a32fa]/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all hover:bg-[#5a32fa]/10 cursor-pointer"
            onClick={() => !isImporting && fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".pdf,.doc,.docx"
            />
            
            {isImporting ? (
              <div className="flex flex-col items-center space-y-4 animate-pulse">
                <Loader2 className="w-12 h-12 text-[#5a32fa] animate-spin" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Analyzing Document...</h3>
                  <p className="text-sm text-gray-500">ScopeFlo AI is extracting your template data</p>
                </div>
              </div>
            ) : importSuccess ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-700">Migration Successful!</h3>
                  <p className="text-sm text-green-600/80">Your form has been populated with the extracted data.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-2">
                  <UploadCloud className="w-8 h-8 text-[#5a32fa]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-1">Migrate from Word or PDF</h3>
                  <p className="text-sm text-gray-500">Drop your existing document here to automatically extract and populate the ScopeFlo template.</p>
                </div>
                <Button className="mt-2 bg-[#5a32fa] hover:bg-[#4b27d4] shadow-md shadow-[#5a32fa]/20 pointer-events-none">
                  Select File
                </Button>
              </div>
            )}
          </div>
          
          {/* SECTION: BRANDING & META */}
          <FormSection title="1. Branding & Meta" description="Logos and basic document identifiers.">
            <div className="flex gap-8 mb-6">
              <ImageUpload label="Your Logo (Provider)" value={draft.providerLogo} onChange={(val) => updateField('providerLogo', val)} />
              <ImageUpload label="Client Logo" value={draft.clientLogo} onChange={(val) => updateField('clientLogo', val)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField id="id" label="Document ID" value={draft.id} onChange={(e) => updateField('id', e.target.value)} />
              <InputField id="date" label="Date" type="date" value={draft.date} onChange={(e) => updateField('date', e.target.value)} />
            </div>
            <InputField id="referenceNumber" label="Reference Number (Optional)" placeholder="e.g. REF-2026-001" value={draft.referenceNumber} onChange={(e) => updateField('referenceNumber', e.target.value)} />
          </FormSection>

          {/* SECTION: GENERAL INFO */}
          <FormSection title="2. General Information" description="Who is this for and what is the project.">
            <InputField id="providerName" label="Provider / Your Company Name" placeholder="e.g. ScopeFlow Agency" value={draft.providerName} onChange={(e) => updateField('providerName', e.target.value)} />
            <InputField id="clientName" label="Client Name" placeholder="e.g. Acme Corp" value={draft.clientName} onChange={(e) => updateField('clientName', e.target.value)} />
            <InputField id="title" label="Project / Document Title" placeholder="e.g. Website Redesign" value={draft.title} onChange={(e) => updateField('title', e.target.value)} />
            <TextAreaField id="summary" label="Summary / Introduction" placeholder="Brief overview of the document..." className="min-h-[80px]" value={draft.summary} onChange={(e) => updateField('summary', e.target.value)} />
          </FormSection>

          {/* SECTION: MAIN CONTENT (DYNAMIC) */}
          <FormSection title="3. Main Content" description="The core details of your document.">
            {/* Quotation */}
            {docType === 'quotation' && (
              <div className="space-y-4">
                <TextAreaField id="quotationDetails" label="Services Being Quoted" placeholder="List and describe all services included in this quotation." className="min-h-[120px]" value={draft.quotationDetails} onChange={(e) => updateField('quotationDetails', e.target.value)} />
                <InputField id="quotationValidity" label="Quote Validity" placeholder="e.g. Valid for 30 days from the date above" value={draft.quotationValidity} onChange={(e) => updateField('quotationValidity', e.target.value)} />
              </div>
            )}
            {/* Proposal */}
            {docType === 'proposal' && (
              <div className="space-y-4">
                <TextAreaField id="clientProblem" label="Client Problem / Challenge" placeholder="Describe the client's pain point or goal you're addressing." className="min-h-[100px]" value={draft.clientProblem} onChange={(e) => updateField('clientProblem', e.target.value)} />
                <TextAreaField id="proposalSolutions" label="Proposed Solution" placeholder="How will you solve the problem? What will you deliver?" className="min-h-[120px]" value={draft.proposalSolutions} onChange={(e) => updateField('proposalSolutions', e.target.value)} />
                <TextAreaField id="proposalMethodology" label="Methodology & Approach" placeholder="Your process, tools, team structure, or workflow." className="min-h-[100px]" value={draft.proposalMethodology} onChange={(e) => updateField('proposalMethodology', e.target.value)} />
                <TextAreaField id="proposalPortfolio" label="Why Us? / Portfolio" placeholder="Relevant past work, case studies, or competitive advantages." className="min-h-[100px]" value={draft.proposalPortfolio} onChange={(e) => updateField('proposalPortfolio', e.target.value)} />
              </div>
            )}
            {/* SOW */}
            {docType === 'sow' && (
              <div className="space-y-4">
                <TextAreaField id="scopeOfWork" label="Scope of Work" placeholder="Describe exactly what work will be done. Be specific." required className="min-h-[130px]" value={draft.scopeOfWork} onChange={(e) => updateField('scopeOfWork', e.target.value)} />
                <TextAreaField id="deliverables" label="Deliverables" placeholder="List all final outputs: e.g. Figma files, deployed website, source code." className="min-h-[100px]" value={draft.deliverables} onChange={(e) => updateField('deliverables', e.target.value)} />
                <TextAreaField id="timeline" label="Timeline & Milestones" placeholder="e.g. Week 1: Wireframes. Week 3: Design. Week 6: Launch." className="min-h-[100px]" value={draft.timeline} onChange={(e) => updateField('timeline', e.target.value)} />
                <TextAreaField id="assumptions" label="Assumptions & Dependencies" placeholder="e.g. Client provides brand assets by Day 3. Hosting is client-managed." className="min-h-[80px]" value={draft.assumptions} onChange={(e) => updateField('assumptions', e.target.value)} />
                <TextAreaField id="exclusions" label="Out of Scope (Exclusions)" placeholder="e.g. Mobile app, SEO optimization, and content writing are NOT included." className="min-h-[80px]" value={draft.exclusions} onChange={(e) => updateField('exclusions', e.target.value)} />
                <TextAreaField id="acceptanceCriteria" label="Acceptance Criteria" placeholder="e.g. Client approves final design before handover." className="min-h-[80px]" value={draft.acceptanceCriteria} onChange={(e) => updateField('acceptanceCriteria', e.target.value)} />
              </div>
            )}
            {/* Contract */}
            {docType === 'contract' && (
              <div className="space-y-4">
                <TextAreaField id="agreementTerms" label="Main Agreement Terms" placeholder="e.g. Provider will deliver services as per SOW. Payment due within 14 days of invoice." className="min-h-[130px]" value={draft.agreementTerms} onChange={(e) => updateField('agreementTerms', e.target.value)} />
                <TextAreaField id="terminationClause" label="Termination Clause" placeholder="e.g. Either party may terminate with 14 days written notice. Work completed to date will be billed." className="min-h-[100px]" value={draft.terminationClause} onChange={(e) => updateField('terminationClause', e.target.value)} />
                <TextAreaField id="intellectualProperty" label="Intellectual Property (IP)" placeholder="e.g. All IP transfers to client upon full payment. Until then, work remains property of provider." className="min-h-[100px]" value={draft.intellectualProperty} onChange={(e) => updateField('intellectualProperty', e.target.value)} />
                <div className="relative">
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Additional Legal Clauses</label>
                    <button onClick={handleOpenLibrary} className="text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                      {!isLoggedIn && <Lock className="w-3 h-3" />}
                      <BookOpen className="w-3 h-3" />
                      Clause Library
                    </button>
                  </div>
                  <TextAreaField id="legalClauses" label="" placeholder="Confidentiality, liability cap, force majeure, etc." className="min-h-[120px]" value={draft.legalClauses} onChange={(e) => updateField('legalClauses', e.target.value)} />
                </div>
                <InputField id="governingLaw" label="Governing Law & Jurisdiction" placeholder="e.g. Governed by the laws of Indonesia, Jakarta courts." value={draft.governingLaw} onChange={(e) => updateField('governingLaw', e.target.value)} />
              </div>
            )}
            {/* SLA */}
            {docType === 'sla' && (
              <div className="space-y-4">
                <TextAreaField id="slaTerms" label="Service Level Terms & Metrics" placeholder="e.g. System uptime 99.5% monthly. Response to critical issues within 2 hours." className="min-h-[130px]" value={draft.slaTerms} onChange={(e) => updateField('slaTerms', e.target.value)} />
                <InputField id="responseTime" label="Response Time Targets" placeholder="e.g. Critical: 2hrs | High: 8hrs | Medium: 24hrs | Low: 72hrs" value={draft.responseTime} onChange={(e) => updateField('responseTime', e.target.value)} />
                <InputField id="uptimeGuarantee" label="Uptime Guarantee" placeholder="e.g. 99.5% monthly uptime, measured 24/7" value={draft.uptimeGuarantee} onChange={(e) => updateField('uptimeGuarantee', e.target.value)} />
                <TextAreaField id="slaPenalties" label="Penalties & Remedies for Breach" placeholder="e.g. For each 1% below guaranteed uptime, client receives a 5% service credit." className="min-h-[100px]" value={draft.slaPenalties} onChange={(e) => updateField('slaPenalties', e.target.value)} />
              </div>
            )}
            {/* MSA */}
            {docType === 'msa' && (
              <div className="space-y-4">
                <TextAreaField id="msaTerms" label="Master Service Terms" placeholder="General terms governing all future project engagements between both parties." className="min-h-[150px]" value={draft.msaTerms} onChange={(e) => updateField('msaTerms', e.target.value)} />
                <TextAreaField id="disputeResolution" label="Dispute Resolution" placeholder="e.g. Disputes resolved by negotiation first; if unresolved in 30 days, proceed to mediation." className="min-h-[100px]" value={draft.disputeResolution} onChange={(e) => updateField('disputeResolution', e.target.value)} />
                <InputField id="governingLaw" label="Governing Law & Jurisdiction" placeholder="e.g. Governed by the laws of Indonesia, Jakarta courts." value={draft.governingLaw} onChange={(e) => updateField('governingLaw', e.target.value)} />
              </div>
            )}
            {/* NDA */}
            {docType === 'nda' && (
              <div className="space-y-4">
                <TextAreaField id="ndaTerms" label="Definition of Confidential Information" placeholder="e.g. All business data, trade secrets, client lists, technical docs shared between parties." className="min-h-[130px]" value={draft.ndaTerms} onChange={(e) => updateField('ndaTerms', e.target.value)} />
                <InputField id="ndaDuration" label="Agreement Duration" placeholder="e.g. 2 years from the date of signing" value={draft.ndaDuration} onChange={(e) => updateField('ndaDuration', e.target.value)} />
                <TextAreaField id="ndaExclusions" label="Exclusions from Confidentiality" placeholder="e.g. Information already publicly known, or independently developed by either party." className="min-h-[100px]" value={draft.ndaExclusions} onChange={(e) => updateField('ndaExclusions', e.target.value)} />
              </div>
            )}
            {/* Change Request */}
            {docType === 'cr' && (
              <div className="space-y-4">
                <TextAreaField id="crReason" label="Reason for Change" placeholder="Why is this change needed? What triggered this request?" className="min-h-[80px]" value={draft.crReason} onChange={(e) => updateField('crReason', e.target.value)} />
                <TextAreaField id="crDescription" label="Description of Change" placeholder="What exactly is changing? Describe the new scope clearly." className="min-h-[120px]" value={draft.crDescription} onChange={(e) => updateField('crDescription', e.target.value)} />
                <InputField id="crImpactTimeline" label="Impact on Timeline" placeholder="e.g. Adds 1 week — new deadline: Nov 15" value={draft.crImpactTimeline} onChange={(e) => updateField('crImpactTimeline', e.target.value)} />
                <InputField id="crImpactCost" label="Impact on Budget" placeholder="e.g. Additional cost: IDR 5,000,000" value={draft.crImpactCost} onChange={(e) => updateField('crImpactCost', e.target.value)} />
              </div>
            )}
            {/* Progress Report */}
            {docType === 'progress_report' && (
              <div className="space-y-4">
                <InputField id="progressReportPeriod" label="Report Period" placeholder="e.g. Week 3 — Oct 15 to Oct 21, 2025" value={draft.progressReportPeriod} onChange={(e) => updateField('progressReportPeriod', e.target.value)} />
                <InputField id="progressPercentage" label="Overall Completion %" placeholder="e.g. 65% complete" value={draft.progressPercentage} onChange={(e) => updateField('progressPercentage', e.target.value)} />
                <TextAreaField id="progressCompleted" label="Work Completed This Period" placeholder="List tasks finished. e.g. Homepage design done. API integration tested." className="min-h-[100px]" value={draft.progressCompleted} onChange={(e) => updateField('progressCompleted', e.target.value)} />
                <TextAreaField id="progressNextSteps" label="Next Steps / Planned Work" placeholder="What will be done next? e.g. Deploy staging. User testing session." className="min-h-[80px]" value={draft.progressNextSteps} onChange={(e) => updateField('progressNextSteps', e.target.value)} />
                <TextAreaField id="progressBlockers" label="Blockers / Issues" placeholder="e.g. Waiting for client to provide CMS credentials." className="min-h-[80px]" value={draft.progressBlockers} onChange={(e) => updateField('progressBlockers', e.target.value)} />
              </div>
            )}
            {/* Invoice */}
            {docType === 'invoice' && (
              <div className="space-y-4">
                <InputField id="invoiceDue" label="Payment Due Date" type="date" value={draft.invoiceDue} onChange={(e) => updateField('invoiceDue', e.target.value)} />
                <InputField id="paymentMethod" label="Payment Method" placeholder="e.g. Bank Transfer / PayPal / Wise" value={draft.paymentMethod} onChange={(e) => updateField('paymentMethod', e.target.value)} />
                <TextAreaField id="bankAccount" label="Payment Details / Bank Account" placeholder="e.g. Bank BCA | Account: 1234567890 | Name: Your Agency" className="min-h-[80px]" value={draft.bankAccount} onChange={(e) => updateField('bankAccount', e.target.value)} />
              </div>
            )}
            {/* BAST */}
            {docType === 'bast' && (
              <div className="space-y-4">
                <TextAreaField id="deliverablesList" label="List of Delivered Items" placeholder="e.g. 1. Website source code (GitHub)
2. Design files (Figma)
3. Admin credentials" className="min-h-[130px]" value={draft.deliverablesList} onChange={(e) => updateField('deliverablesList', e.target.value)} />
                <TextAreaField id="handoverNotes" label="Handover Notes & Conditions" placeholder="e.g. Client tested and verified all features. All credentials transferred." className="min-h-[100px]" value={draft.handoverNotes} onChange={(e) => updateField('handoverNotes', e.target.value)} />
                <TextAreaField id="acceptanceStatement" label="Acceptance Statement" placeholder="e.g. By signing below, the client acknowledges full receipt and acceptance of all deliverables." className="min-h-[80px]" value={draft.acceptanceStatement} onChange={(e) => updateField('acceptanceStatement', e.target.value)} />
              </div>
            )}
          </FormSection>

          {/* SECTION: PRICING — only for docs that involve cost */}
          {['quotation', 'proposal', 'sow', 'contract', 'cr', 'invoice'].includes(docType) && (
          <FormSection title="4. Pricing & Investment" description="Itemized costs, discounts, and taxes.">
            <ItemizedPricingTable />
            <div className="mt-4">
              <TextAreaField id="pricingNotes" label="Payment Terms & Notes" placeholder="e.g. 50% upfront, remaining 50% on delivery. Net 14 days." className="min-h-[80px]" value={draft.pricingNotes} onChange={(e) => updateField('pricingNotes', e.target.value)} />
            </div>
          </FormSection>
          )}

          {/* SECTION: SETTINGS */}
          <FormSection title="5. Document Settings" description="Final touches and approvals.">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <input 
                type="checkbox" 
                id="showSignatures" 
                checked={draft.showSignatures} 
                onChange={(e) => updateField('showSignatures', e.target.checked)}
                className="w-5 h-5 text-[#5a32fa] rounded border-gray-300 focus:ring-[#5a32fa]"
              />
              <label htmlFor="showSignatures" className="font-medium text-gray-700 cursor-pointer flex-1">
                Include Signature Blocks
              </label>
            </div>
          </FormSection>

          {/* SECTION: DESIGN & BRANDING */}
          <FormSection title="6. Design & Branding" description="Premium customization features.">
            <div className={`space-y-4 ${!isLoggedIn ? 'opacity-60 pointer-events-none' : ''}`}>
              {!isLoggedIn && (
                <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200 font-medium">
                  <Lock className="w-4 h-4" /> Unlock Premium to customize colors and remove watermarks.
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Theme Color</label>
                  <input 
                    type="color" 
                    value={draft.themeColor} 
                    onChange={(e) => updateField('themeColor', e.target.value)}
                    className="w-full h-10 p-1 bg-white border border-gray-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Typography</label>
                  <select 
                    value={draft.fontFamily} 
                    onChange={(e) => updateField('fontFamily', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5a32fa]"
                  >
                    <option value="sans-serif">Modern (Sans-Serif)</option>
                    <option value="serif">Classic (Serif)</option>
                    <option value="monospace">Technical (Monospace)</option>
                  </select>
                </div>
              </div>
            </div>
          </FormSection>

        </div>
      </div>

      {/* Right Panel: Live Preview */}
      <div className="w-1/2 bg-gray-100/50 flex flex-col h-full relative">
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <FileText className="w-5 h-5 text-[#5a32fa]" />
            Live Preview
          </div>
          <div className="flex items-center gap-2">
            {!isLoggedIn && (
              <div className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1 mr-2">
                <Lock className="w-3 h-3" /> Guest Preview
              </div>
            )}
            
            <Button onClick={handleExportDocx} variant="outline" className={`py-1.5 h-auto text-sm ${!isLoggedIn ? 'opacity-50' : ''}`}>
              {!isLoggedIn && <Lock className="w-3 h-3 mr-1.5" />}
              Export DOCX
            </Button>
            <Button onClick={handleESign} className={`bg-[#00D06C] hover:bg-[#00B55E] border-0 text-white py-1.5 h-auto text-sm shadow-md shadow-[#00D06C]/20 ${!isLoggedIn ? 'opacity-50' : ''}`}>
              {!isLoggedIn && <Lock className="w-3 h-3 mr-1.5" />}
              Send for E-Sign
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-[#525659]">
          {/* Container simulating A4 Paper with shadow */}
          <div className="transform origin-top scale-[0.85] 2xl:scale-100 transition-transform pb-20">
             <DocumentPreview docType={docType} />
          </div>
        </div>
      </div>

      <ClauseLibraryModal isOpen={showClauseModal} onClose={() => setShowClauseModal(false)} />

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Feature</h2>
            <p className="text-gray-500 mb-8">
              This feature is only available for Logged In users. Toggle the "Guest Mode" button in the top bar to simulate being logged in.
            </p>
            <div className="flex gap-4 w-full">
              <Button onClick={() => setShowUpgradeModal(false)} variant="outline" className="flex-1">
                Close
              </Button>
              <Button 
                onClick={() => {
                  toggleLogin();
                  setShowUpgradeModal(false);
                }} 
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                Simulate Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GeneratorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-white"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5a32fa]"></div></div>}>
      <GeneratorContent />
    </Suspense>
  );
}


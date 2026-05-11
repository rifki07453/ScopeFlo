export type DocumentPhase = 'pra-proyek' | 'kesepakatan' | 'eksekusi' | 'penutupan';

export type DocumentType = 
  | 'quotation' | 'proposal' // Pra-Proyek
  | 'sow' | 'sla' | 'msa' | 'nda' | 'contract' // Kesepakatan
  | 'cr' | 'progress_report' // Eksekusi
  | 'invoice' | 'bast'; // Penutupan

export interface PricingItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
}

export interface DocumentDraft {
  // Global Fields
  id: string;
  docType: DocumentType;
  status: string;
  title: string;
  date: string;
  clientName: string;
  providerName: string;
  summary: string; // Used as Introduction / Summary for most docs
  referenceNumber: string;

  // Branding & Design
  clientLogo: string | null; // base64
  providerLogo: string | null; // base64
  themeColor: string;
  fontFamily: string;

  // Pricing & Currency
  currency: string;
  taxRate: number; // percentage
  discountAmount: number; // flat amount
  items: PricingItem[];
  pricingNotes: string; // payment terms, etc.

  // --- Specific Fields (Used conditionally based on docType) ---
  
  // Phase 1: Pre-Project
  quotationDetails: string;      // Quotation: service description
  quotationValidity: string;     // Quotation: how long quote is valid (e.g. 30 days)
  clientProblem: string;         // Proposal: client's problem/challenge
  proposalMethodology: string;   // Proposal: approach & methodology
  proposalSolutions: string;     // Proposal: proposed solutions
  proposalPortfolio: string;     // Proposal: portfolio / why us

  // Phase 2: Agreement
  // SOW
  scopeOfWork: string;
  deliverables: string;
  timeline: string;
  assumptions: string;           // SOW: assumptions & dependencies
  exclusions: string;            // SOW: what is NOT included
  acceptanceCriteria: string;    // SOW: definition of done

  // Contract
  agreementTerms: string;
  terminationClause: string;     // Contract: how either party can terminate
  intellectualProperty: string;  // Contract: who owns the IP/output
  legalClauses: string;
  governingLaw: string;          // Contract/MSA: governing law & jurisdiction

  // SLA
  slaTerms: string;
  responseTime: string;          // SLA: response time targets
  uptimeGuarantee: string;       // SLA: uptime % guarantee
  slaPenalties: string;          // SLA: penalties for breaches

  // MSA
  msaTerms: string;
  disputeResolution: string;     // MSA: dispute resolution process

  // NDA
  ndaTerms: string;
  ndaDuration: string;           // NDA: agreement duration (e.g. 2 years)
  ndaExclusions: string;         // NDA: what is NOT confidential

  // Phase 3: Execution
  // Change Request
  crReason: string;
  crDescription: string;
  crImpactTimeline: string;      // CR: impact on project timeline
  crImpactCost: string;          // CR: impact on budget/cost

  // Progress Report
  progressReportPeriod: string;
  progressPercentage: string;    // Progress: overall completion %
  progressCompleted: string;
  progressNextSteps: string;     // Progress: planned next steps
  progressBlockers: string;

  // Phase 4: Closing
  // Invoice
  invoiceDue: string;
  paymentMethod: string;         // Invoice: bank transfer, PayPal, etc.
  bankAccount: string;           // Invoice: bank account details

  // BAST / Handover
  deliverablesList: string;      // BAST: list of all delivered items
  handoverNotes: string;         // BAST: conditions & notes
  acceptanceStatement: string;   // BAST: client acceptance declaration

  // Approval & Notes
  internalNotes: string;
  clientComments: string;
  showSignatures: boolean;
}

import { create } from 'zustand';
import { DocumentDraft, PricingItem } from '@/types/document';

interface DocumentGeneratorState {
  draft: DocumentDraft;
  updateField: (field: keyof DocumentDraft, value: any) => void;
  addItem: () => void;
  updateItem: (id: string, field: keyof PricingItem, value: any) => void;
  removeItem: (id: string) => void;
  resetDraft: () => void;
  loadDraft: (draft: DocumentDraft) => void;
  calculateTotal: () => { subtotal: number; taxAmount: number; finalTotal: number };
}

const initialDraft: DocumentDraft = {
  id: `DOC-${Math.floor(Math.random() * 10000)}`,
  docType: 'sow',
  status: 'Draft',
  title: '',
  date: new Date().toISOString().split('T')[0],
  clientName: '',
  providerName: '',
  summary: '',
  referenceNumber: '',

  // Branding & Design
  clientLogo: null,
  providerLogo: null,
  themeColor: '#1A0B2E',
  fontFamily: 'sans-serif',

  // Pricing & Currency
  currency: 'IDR',
  taxRate: 0,
  discountAmount: 0,
  items: [
    { id: '1', name: '', description: '', quantity: 1, price: 0 }
  ],
  pricingNotes: '',

  // Phase 1
  quotationDetails: '',
  quotationValidity: '',
  clientProblem: '',
  proposalMethodology: '',
  proposalSolutions: '',
  proposalPortfolio: '',

  // Phase 2
  scopeOfWork: '',
  deliverables: '',
  timeline: '',
  assumptions: '',
  exclusions: '',
  acceptanceCriteria: '',

  agreementTerms: '',
  terminationClause: '',
  intellectualProperty: '',
  legalClauses: '',
  governingLaw: '',

  slaTerms: '',
  responseTime: '',
  uptimeGuarantee: '',
  slaPenalties: '',

  msaTerms: '',
  disputeResolution: '',

  ndaTerms: '',
  ndaDuration: '',
  ndaExclusions: '',

  // Phase 3
  crReason: '',
  crDescription: '',
  crImpactTimeline: '',
  crImpactCost: '',

  progressReportPeriod: '',
  progressPercentage: '',
  progressCompleted: '',
  progressNextSteps: '',
  progressBlockers: '',

  // Phase 4
  invoiceDue: '',
  paymentMethod: '',
  bankAccount: '',

  deliverablesList: '',
  handoverNotes: '',
  acceptanceStatement: '',

  // Approval & Notes
  internalNotes: '',
  clientComments: '',
  showSignatures: true,
};

export const useDocumentGeneratorStore = create<DocumentGeneratorState>((set, get) => ({
  draft: initialDraft,
  
  updateField: (field, value) => 
    set((state) => ({
      draft: { ...state.draft, [field]: value }
    })),

  addItem: () =>
    set((state) => ({
      draft: {
        ...state.draft,
        items: [
          ...state.draft.items,
          { id: Math.random().toString(36).substring(7), name: '', quantity: 1, price: 0 }
        ]
      }
    })),

  updateItem: (id, field, value) =>
    set((state) => ({
      draft: {
        ...state.draft,
        items: state.draft.items.map(item => 
          item.id === id ? { ...item, [field]: value } : item
        )
      }
    })),

  removeItem: (id) =>
    set((state) => ({
      draft: {
        ...state.draft,
        items: state.draft.items.filter(item => item.id !== id)
      }
    })),

  resetDraft: () => set({ draft: initialDraft }),

  loadDraft: (draft) => set({ draft }),

  calculateTotal: () => {
    const { items, taxRate, discountAmount } = get().draft;
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discounted = Math.max(0, subtotal - discountAmount);
    const taxAmount = discounted * (taxRate / 100);
    const finalTotal = discounted + taxAmount;
    
    return { subtotal, taxAmount, finalTotal };
  }
}));

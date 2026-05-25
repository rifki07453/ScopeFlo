import { create } from 'zustand';

export type DocStatus = 'Draft' | 'Sent' | 'Viewed' | 'Signed' | 'Expired';
export type DocType = 'SOW' | 'Quotation' | 'Contract';

export interface DashboardDocument {
  id: string;
  document_name: string;
  client_name: string;
  type: DocType;
  status: DocStatus;
  total_value: number;
  last_modified: string;
}

export interface ActivityLog {
  id: string;
  document_id: string;
  action_type: 'CREATED' | 'UPDATED' | 'STATUS_CHANGED' | 'VIEWED' | 'SIGNED';
  description: string;
  timestamp: string;
  metadata: any;
}

interface DashboardState {
  documents: DashboardDocument[];
  activities: ActivityLog[];
  filterCategory: string;
  setFilterCategory: (category: string) => void;
}

const mockDocuments: DashboardDocument[] = [
  { id: '1', document_name: 'Website Redesign', client_name: 'PT Nusantara Jaya', type: 'SOW', status: 'Viewed', total_value: 12000000, last_modified: '2026-04-26T14:30:00Z' },
  { id: '2', document_name: 'Q3 Marketing Campaign', client_name: 'TechFlow Inc', type: 'Quotation', status: 'Sent', total_value: 45000000, last_modified: '2026-04-25T09:15:00Z' },
  { id: '3', document_name: 'Mobile App Development', client_name: 'Maju Bersama', type: 'Contract', status: 'Signed', total_value: 85000000, last_modified: '2026-04-24T11:20:00Z' },
  { id: '4', document_name: 'SEO Optimization', client_name: 'RetailKU', type: 'SOW', status: 'Draft', total_value: 5000000, last_modified: '2026-04-27T08:00:00Z' },
];

const mockActivities: ActivityLog[] = [
  {
    id: 'a1',
    document_id: '1',
    action_type: 'VIEWED',
    description: 'PT Nusantara Jaya melihat SOW Website Redesign.',
    timestamp: '2026-04-26T14:35:00Z',
    metadata: { location: 'Jakarta', device: 'Desktop - Chrome' }
  },
  {
    id: 'a2',
    document_id: '3',
    action_type: 'SIGNED',
    description: 'Maju Bersama menyetujui dan menandatangani Mobile App Development.',
    timestamp: '2026-04-24T16:00:00Z',
    metadata: { user: 'Client' }
  },
  {
    id: 'a3',
    document_id: '2',
    action_type: 'STATUS_CHANGED',
    description: 'Anda mengirim Quotation ke TechFlow Inc.',
    timestamp: '2026-04-25T09:15:00Z',
    metadata: { user: 'Admin' }
  }
];

export const useDashboardStore = create<DashboardState>((set) => ({
  documents: mockDocuments,
  activities: mockActivities,
  filterCategory: 'All',
  setFilterCategory: (category) => set({ filterCategory: category }),
}));

import { create } from 'zustand';
import { SowData } from '@/types/project';

interface SowStore {
  data: SowData | null;
  setSowData: (data: SowData) => void;
  clearSowData: () => void;
}

export const useSowStore = create<SowStore>((set) => ({
  data: null,
  setSowData: (data) => set({ data }),
  clearSowData: () => set({ data: null }),
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DocumentDraft } from '@/types/document';

interface HistoryState {
  projects: DocumentDraft[];
  saveProject: (draft: DocumentDraft) => void;
  deleteProject: (id: string) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      projects: [],
      
      saveProject: (draft) => set((state) => {
        const exists = state.projects.find(p => p.id === draft.id);
        if (exists) {
          // Update existing project
          return {
            projects: state.projects.map(p => p.id === draft.id ? draft : p)
          };
        } else {
          // Add new project
          return {
            projects: [draft, ...state.projects]
          };
        }
      }),

      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id)
      })),
    }),
    {
      name: 'scopeflo-history-storage',
    }
  )
);

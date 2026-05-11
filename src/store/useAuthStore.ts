import { create } from 'zustand';

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  toggleLogin: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false, // Default to guest
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  toggleLogin: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
}));

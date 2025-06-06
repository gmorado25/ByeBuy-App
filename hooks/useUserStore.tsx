import { create } from 'zustand';

type UserStore = {
  savedAmount: number;
  addSavedAmount: (amount: number) => void;
  resetSavings: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  savedAmount: 0,
  addSavedAmount: (amount) => set((state) => ({ savedAmount: state.savedAmount + amount })),
  resetSavings: () => set({ savedAmount: 0 }),
}));
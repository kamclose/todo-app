import { create } from 'zustand';

const useCurrentCategoryStore = create((set) => ({
  category: 'all',
  setCategory: (category) => set(() => ({ category: category })),
}));

export default useCurrentCategoryStore;

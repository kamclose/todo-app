import { create } from 'zustand';

const useContactFormStore = create((set) => ({
  formState: {
    firstName: '',
    lastName: '',
    email: '',
    comments: '',
  },

  setFormState: (newState) =>
    set((state) => ({ formState: { ...state.formState, ...newState } })),

  resetForm: () => {
    set(() => ({
      formState: {
        firstName: '',
        lastName: '',
        email: '',
        comments: '',
      },
    }));
    localStorage.removeItem('formState');
  },
}));

export default useContactFormStore;

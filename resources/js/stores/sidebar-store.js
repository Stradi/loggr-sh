import { create } from "zustand";

const useSidebarStore = create((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useSidebarStore;

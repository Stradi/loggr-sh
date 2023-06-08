import { create } from "zustand";

const useEditorStore = create((set) => ({
  title: "Untitled Entry",
  content: "",
  status: "idle",
  characterCount: 0,
  wordCount: 0,
  lastSavedAt: new Date(),

  setTitle: (title) => set(() => ({ title })),
  setContent: (content) => set(() => ({ content })),
  setStatus: (status) => set(() => ({ status })),
  setCharacterCount: (characterCount) => set(() => ({ characterCount })),
  setWordCount: (wordCount) => set(() => ({ wordCount })),
  setLastSavedAt: (lastSavedAt) => set(() => ({ lastSavedAt })),
}));

export default useEditorStore;

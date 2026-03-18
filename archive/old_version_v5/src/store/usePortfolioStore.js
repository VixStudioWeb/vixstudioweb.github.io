import { create } from 'zustand';

const usePortfolioStore = create((set) => ({
  activeProject: null,
  projectProgress: 0,

  setActiveProject: (project) => set({ activeProject: project }),
  setProjectProgress: (progress) => set({ projectProgress: progress }),
}));

export default usePortfolioStore;

import { create } from 'zustand';

const useScrollStore = create((set) => ({
  // Current scroll progress (0 to 1)
  progress: 0,
  // Current scroll direction: 'vertical' | 'diagonal-right' | 'diagonal-left'
  direction: 'vertical',
  // Current section index
  currentSection: 0,
  // Scroll velocity
  velocity: 0,
  // Whether user is scrolling
  isScrolling: false,
  // Diagonal angle in degrees
  diagonalAngle: 0,

  setProgress: (progress) => set({ progress }),
  setDirection: (direction) => set({ direction }),
  setCurrentSection: (currentSection) => set({ currentSection }),
  setVelocity: (velocity) => set({ velocity }),
  setIsScrolling: (isScrolling) => set({ isScrolling }),
  setDiagonalAngle: (diagonalAngle) => set({ diagonalAngle }),
}));

export default useScrollStore;

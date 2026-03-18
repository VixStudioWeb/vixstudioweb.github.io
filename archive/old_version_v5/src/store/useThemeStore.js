import { create } from 'zustand';
import gsap from 'gsap';

const defaultTheme = {
  primary: '#f5c518',
  secondary: '#ffffff',
  background: '#0a0a0a',
  text: '#f5f5f5',
  accent: '#f5c518',
  pattern: 'default',
};

const useThemeStore = create((set, get) => ({
  currentTheme: { ...defaultTheme },
  isTransitioning: false,

  setTheme: (theme) => {
    const current = get().currentTheme;
    // Skip if already same theme
    if (current.background === theme.background && current.primary === theme.primary) return;

    set({ isTransitioning: true });
    // Smoothly animate body background for full-page immersion
    gsap.to(document.body, {
      backgroundColor: theme.background,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => set({ isTransitioning: false }),
    });
    set({ currentTheme: theme });
  },

  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),

  resetTheme: () => {
    const current = get().currentTheme;
    // Skip if already default
    if (current.background === defaultTheme.background && current.primary === defaultTheme.primary) return;

    gsap.to(document.body, {
      backgroundColor: defaultTheme.background,
      duration: 0.6,
      ease: 'power2.out',
    });
    set({ currentTheme: { ...defaultTheme }, isTransitioning: false });
  },
}));

export default useThemeStore;

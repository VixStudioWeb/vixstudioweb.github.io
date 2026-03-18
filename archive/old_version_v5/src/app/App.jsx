import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ScrollController from './ScrollController';
import HeroParticles from '../scenes/HeroParticles/HeroParticles';
import Services from '../scenes/Services/Services';
import Process from '../scenes/Process/Process';
import Audience from '../scenes/Audience/Audience';
import Portfolio from '../scenes/Portfolio/Portfolio';
import About from '../scenes/About/About';
import useThemeStore from '../store/useThemeStore';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const currentTheme = useThemeStore((s) => s.currentTheme);

  useEffect(() => {
    // Smooth scroll-to for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      e.preventDefault();
      const id = target.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        gsap.to(window, {
          scrollTo: { y: el, offsetY: 0 },
          duration: 1.5,
          ease: 'power3.inOut',
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <ScrollController>
      <main
        id="main-content"
        className="app-wrapper"
        style={{
          '--theme-bg': currentTheme.background,
          '--theme-text': currentTheme.text,
          '--theme-accent': currentTheme.accent,
        }}
      >
        <HeroParticles />
        <Services />
        <Process />
        <Audience />
        <Portfolio />
        <About />
      </main>
    </ScrollController>
  );
}

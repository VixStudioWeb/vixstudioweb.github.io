import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticlesCanvas from './ParticlesCanvas';
import AnimatedText from '../../components/AnimatedText';
import './hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroParticles() {
  const sectionRef = useRef(null);
  const particlesRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleReconstruct = useCallback(() => {
    if (particlesRef.current) {
      particlesRef.current.reconstruct();
      // Scroll back to top if needed
      if (window.scrollY > 100) {
        gsap.to(window, {
          scrollTo: { y: 0 },
          duration: 1.2,
          ease: 'power3.inOut',
        });
      }
    }
  }, []);

  // Keyboard shortcut (R key) to reconstruct logo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'r' || e.key === 'R') {
        // Don't trigger if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        handleReconstruct();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReconstruct]);

  return (
    <section ref={sectionRef} className="hero-section" id="hero">
      <div className="hero-particles-bg">
        <ParticlesCanvas ref={particlesRef} scrollProgress={scrollProgress} />
      </div>

      <div className="hero-content">
        <div className="hero-tagline">
          <AnimatedText
            text="Vix Studio Web"
            tag="h1"
            animation="split"
            className="hero-title"
            scrollTrigger={false}
            delay={0.5}
          />
          <AnimatedText
            text="Créateurs d'expériences digitales immersives"
            tag="p"
            animation="fade"
            className="hero-subtitle"
            scrollTrigger={false}
            delay={1.2}
          />
        </div>

        <button
          className="hero-reconstruct-btn"
          onClick={handleReconstruct}
          data-cursor-hover
          title="Reconstruire le logo (touche R)"
          aria-label="Reconstruire le logo"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>

        <div className="hero-scroll-hint">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line">
            <div className="scroll-line-inner" />
          </div>
        </div>
      </div>
    </section>
  );
}

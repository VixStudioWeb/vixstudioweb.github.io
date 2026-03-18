import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import useScrollStore from '../store/useScrollStore';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Global scroll controller.
 * - Manages section tracking
 * - Subtle soft-snap toward section centers when scroll stops
 * - Velocity tracking
 * - Scroll deceleration when section center is near viewport center
 */
export default function ScrollController({ children }) {
  const wrapperRef = useRef(null);
  const setCurrentSection = useScrollStore((s) => s.setCurrentSection);
  const setVelocity = useScrollStore((s) => s.setVelocity);
  const setIsScrolling = useScrollStore((s) => s.setIsScrolling);

  useEffect(() => {
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.8,
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    let lastScrollY = window.scrollY;
    let scrollTimer;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const velocity = Math.abs(currentY - lastScrollY);
      lastScrollY = currentY;
      setVelocity(velocity);
      setIsScrolling(true);

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
        setVelocity(0);
        
        // Soft-snap: when scroll stops, gently nudge toward nearest section center
        softSnapToSection();
      }, 200);
    };

    // Soft-snap: if a section center is close to viewport center, nudge toward it
    const softSnapToSection = () => {
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const sectionIds = ['hero', 'services', 'process', 'audience', 'portfolio', 'about'];
      let closestDist = Infinity;
      let closestCenter = null;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const sectionCenter = window.scrollY + rect.top + rect.height / 2;
        const dist = Math.abs(viewportCenter - sectionCenter);
        
        // Only snap if section center is within 15% of viewport height
        if (dist < window.innerHeight * 0.15 && dist < closestDist) {
          closestDist = dist;
          closestCenter = sectionCenter;
        }
      });

      if (closestCenter !== null && closestDist > 5) {
        const snapTarget = closestCenter - window.innerHeight / 2;
        gsap.to(window, {
          scrollTo: { y: snapTarget },
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Section tracking with IDs
    const sectionIds = ['hero', 'services', 'process', 'audience', 'portfolio', 'about'];

    sectionIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setCurrentSection(i),
        onEnterBack: () => setCurrentSection(i),
      });
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [setCurrentSection, setVelocity, setIsScrolling]);

  return (
    <div ref={wrapperRef} className="smooth-scroll-wrapper">
      {children}
    </div>
  );
}

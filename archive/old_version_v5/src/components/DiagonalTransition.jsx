import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DiagonalTransition.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a diagonal scroll transition between sections.
 * @param {string} direction - 'right' (bas-droite) or 'left' (bas-gauche)
 * @param {string} nextTitle - Title of the next section that slides in
 * @param {React.ReactNode} children - Content to render during diagonal scroll
 */
export default function DiagonalTransition({ direction = 'right', nextTitle = '', children }) {
  const containerRef = useRef(null);
  const bgPatternRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isRight = direction === 'right';
    const translateX = isRight ? '-30vw' : '30vw';
    const angle = isRight ? -8 : 8;

    const ctx = gsap.context(() => {
      // Diagonal movement on the content wrapper
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Move the background pattern to enhance diagonal feel
      tl.fromTo(
        container.querySelector('.diagonal-bg-pattern'),
        { x: 0, y: 0 },
        { x: translateX, y: '-20vh', ease: 'none' },
        0
      );

      // Animate the title sliding in fast then slowing
      const titleEl = container.querySelector('.diagonal-next-title');
      if (titleEl) {
        gsap.fromTo(
          titleEl,
          { x: isRight ? '80vw' : '-80vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, [direction]);

  const isRight = direction === 'right';
  const angle = isRight ? -8 : 8;

  return (
    <div
      ref={containerRef}
      className={`diagonal-transition diagonal-${direction}`}
    >
      <div ref={bgPatternRef} className="diagonal-bg-pattern">
        {/* Geometric pattern background */}
        <svg className="diagonal-pattern-svg" viewBox="0 0 800 600" preserveAspectRatio="none">
          <defs>
            <pattern id={`diag-grid-${direction}`} width="60" height="60" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="60" y2="60" stroke="rgba(245,197,24,0.06)" strokeWidth="0.5" />
              <line x1="60" y1="0" x2="0" y2="60" stroke="rgba(245,197,24,0.03)" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1" fill="rgba(245,197,24,0.08)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#diag-grid-${direction})`} />
        </svg>
        {/* Floating geometric shapes */}
        <div className="diagonal-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
          <div className="shape shape-4" />
        </div>
      </div>

      {nextTitle && (
        <h2 className="diagonal-next-title">{nextTitle}</h2>
      )}

      <div className="diagonal-content" style={{ transform: `skewY(${angle}deg)` }}>
        <div style={{ transform: `skewY(${-angle}deg)` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

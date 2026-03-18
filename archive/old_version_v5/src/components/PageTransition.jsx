import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import './PageTransition.css';

export default function PageTransition({ children, locationKey }) {
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevKeyRef = useRef(locationKey);
  const pendingChildrenRef = useRef(children);

  // Always keep latest children ref updated
  pendingChildrenRef.current = children;

  useEffect(() => {
    // Same route — just update displayed children directly
    if (locationKey === prevKeyRef.current) {
      setDisplayChildren(children);
      return;
    }

    if (isAnimating) return;

    setIsAnimating(true);
    prevKeyRef.current = locationKey;

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayChildren(pendingChildrenRef.current);
        setIsAnimating(false);
      },
    });

    // Exit animation
    tl.to(contentRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: 'power2.in',
    });

    tl.fromTo(
      overlayRef.current,
      { scaleY: 0, transformOrigin: 'bottom' },
      {
        scaleY: 1,
        duration: 0.5,
        ease: 'power4.inOut',
      },
      '-=0.2'
    );

    tl.set(overlayRef.current, { transformOrigin: 'top' });
    tl.to(overlayRef.current, {
      scaleY: 0,
      duration: 0.5,
      ease: 'power4.inOut',
    });

  }, [locationKey]); // Only trigger on route change, not on children re-renders

  useEffect(() => {
    if (!isAnimating && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      // Scroll to top on page change
      window.scrollTo(0, 0);
    }
  }, [displayChildren, isAnimating]);

  return (
    <>
      <div ref={contentRef} className="page-transition-content">
        {displayChildren}
      </div>
      <div ref={overlayRef} className="page-transition-overlay" />
    </>
  );
}

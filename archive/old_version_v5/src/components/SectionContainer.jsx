import { useRef, useEffect, Children } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Wrapper for sections with scroll-triggered entrance animations
 */
export default function SectionContainer({
  children,
  id,
  className = '',
  background = 'transparent',
  style = {},
}) {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`section ${className}`}
      style={{ background, ...style }}
    >
      <div className="section-inner">{children}</div>
    </section>
  );
}

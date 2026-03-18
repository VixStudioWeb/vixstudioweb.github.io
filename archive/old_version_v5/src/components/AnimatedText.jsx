import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedText component with reveal/split effects
 * @param {string} text - Text to animate
 * @param {string} tag - HTML tag (h1, h2, p, etc.)
 * @param {string} animation - 'reveal' | 'split' | 'fade'
 * @param {number} delay - Animation delay in seconds
 * @param {string} className - Additional CSS classes
 * @param {boolean} scrollTrigger - Whether to use scroll trigger
 */
export default function AnimatedText({
  text,
  tag: Tag = 'h2',
  animation = 'reveal',
  delay = 0,
  className = '',
  scrollTrigger = true,
  stagger = 0.03,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      const triggerConfig = scrollTrigger
        ? {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        : {};

      if (animation === 'reveal') {
        const inner = el.querySelector('.text-reveal-inner');
        if (inner) {
          gsap.fromTo(
            inner,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.2,
              delay,
              ease: 'power4.out',
              ...triggerConfig,
            }
          );
        }
      } else if (animation === 'split') {
        const chars = el.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger,
            delay,
            ease: 'power3.out',
            ...triggerConfig,
          }
        );
      } else if (animation === 'fade') {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: 'power2.out',
            ...triggerConfig,
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [animation, delay, scrollTrigger, stagger]);

  if (animation === 'reveal') {
    return (
      <Tag ref={containerRef} className={`animated-text ${className}`}>
        <span className="text-reveal" style={{ overflow: 'hidden', display: 'inline-block' }}>
          <span className="text-reveal-inner" style={{ display: 'inline-block' }}>
            {text}
          </span>
        </span>
      </Tag>
    );
  }

  if (animation === 'split') {
    return (
      <Tag ref={containerRef} className={`animated-text ${className}`}>
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="char"
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={containerRef} className={`animated-text ${className}`}>
      {text}
    </Tag>
  );
}

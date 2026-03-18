import { useEffect, useRef, useCallback } from 'react';
import { lerp } from '../utils/lerp';

/**
 * Custom hook for magnetic effect on elements
 * Elements get attracted towards cursor on hover
 */
export default function useMagneticEffect(strength = 0.3) {
  const ref = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      posRef.current = { x: deltaX, y: deltaY };
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    posRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX = lerp(currentX, posRef.current.x, 0.1);
      currentY = lerp(currentY, posRef.current.y, 0.1);
      el.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}

import { useEffect, useRef } from 'react';
import { lerp } from '../utils/lerp';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  useEffect(() => {
    // Hide on mobile
    if ('ontouchstart' in window) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const onMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => {
      isClicking.current = true;
      cursor.classList.add('clicking');
    };

    const onMouseUp = () => {
      isClicking.current = false;
      cursor.classList.remove('clicking');
    };

    const handleHoverables = () => {
      const hoverables = document.querySelectorAll(
        'a, button, .glass-card, .btn-glow, [data-cursor-hover]'
      );
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          isHovering.current = true;
          cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
          isHovering.current = false;
          cursor.classList.remove('hovering');
        });
      });
    };

    // Observe DOM changes to re-bind hoverables
    const observer = new MutationObserver(handleHoverables);
    observer.observe(document.body, { childList: true, subtree: true });
    handleHoverables();

    let raf;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);

      cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      dot.style.transform = `translate(${target.current.x}px, ${target.current.y}px)`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="custom-cursor-dot" />
    </>
  );
}

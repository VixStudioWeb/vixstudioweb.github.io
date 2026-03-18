import { useEffect, useRef, useState } from 'react';

/**
 * Track section visibility progress using IntersectionObserver
 */
export default function useSectionProgress(threshold = 0.1) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            setProgress(entry.intersectionRatio);
          }
        });
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, progress, isVisible };
}

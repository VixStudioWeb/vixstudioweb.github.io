import { forwardRef, useCallback } from 'react';
import useMagneticEffect from '../hooks/useMagneticEffect';
import './GlowCard.css';

const GlowCard = forwardRef(function GlowCard(
  { children, className = '', magnetic = true, glowColor, ...props },
  externalRef
) {
  const magneticRef = useMagneticEffect(magnetic ? 0.15 : 0);

  // Merge refs so both magnetic and external ref work
  const mergedRef = useCallback(
    (node) => {
      magneticRef.current = node;
      if (typeof externalRef === 'function') {
        externalRef(node);
      } else if (externalRef) {
        externalRef.current = node;
      }
    },
    [magneticRef, externalRef]
  );

  return (
    <div
      ref={magnetic ? mergedRef : externalRef}
      className={`glass-card glow-card ${className}`}
      style={glowColor ? { '--card-glow': glowColor } : {}}
      data-cursor-hover
      {...props}
    >
      {children}
    </div>
  );
});

export default GlowCard;

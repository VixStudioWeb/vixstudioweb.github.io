import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import useParticles from './useParticles';
import './hero.css';

const ParticlesCanvas = forwardRef(function ParticlesCanvas({ scrollProgress = 0 }, ref) {
  const canvasRef = useRef(null);
  const { init, setScrollProgress, reconstruct } = useParticles(
    canvasRef,
    '/images/logo.png'
  );

  useImperativeHandle(ref, () => ({
    reconstruct,
  }));

  useEffect(() => {
    const cleanup = init();
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, [init]);

  useEffect(() => {
    setScrollProgress(scrollProgress);
  }, [scrollProgress, setScrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      aria-hidden="true"
    />
  );
});

export default ParticlesCanvas;

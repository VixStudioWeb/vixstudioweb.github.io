import { useEffect, useRef, useCallback } from 'react';
import { lerp } from '../../utils/lerp';
import { distance, randomFloat } from '../../utils/helpers';
import { clamp } from '../../utils/clamp';
import { getPerformanceTier } from '../../utils/performanceMonitor';

/**
 * Particle system that forms the VIX logo
 * Features:
 * - Mouse attraction/repulsion
 * - Click explosion
 * - Hold for vortex/gravity
 * - Fast movement trail
 * - Color changes based on velocity
 * - Smooth dispersal on scroll
 */
export default function useParticles(canvasRef, logoImageUrl) {
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isDown: false, speed: 0, prevX: 0, prevY: 0 });
  const scrollProgressRef = useRef(0);
  const animFrameRef = useRef(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const logoPointsRef = useRef([]);
  const isInitializedRef = useRef(false);

  /**
   * Extract points from the logo image to use as particle targets
   */
  const extractLogoPoints = useCallback((img, canvasWidth, canvasHeight) => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    // Scale logo to fit nicely in the center
    const scale = Math.min(canvasWidth * 0.5 / img.width, canvasHeight * 0.6 / img.height);
    const logoW = img.width * scale;
    const logoH = img.height * scale;
    tempCanvas.width = logoW;
    tempCanvas.height = logoH;

    tempCtx.drawImage(img, 0, 0, logoW, logoH);
    const imageData = tempCtx.getImageData(0, 0, logoW, logoH);
    const data = imageData.data;
    const points = [];

    // Sample every N pixels — adjust based on device performance
    const tier = getPerformanceTier();
    const gapMultiplier = tier === 'low' ? 2.0 : tier === 'medium' ? 1.3 : 1.0;
    const gap = Math.max(3, Math.floor(Math.min(logoW, logoH) / 120 * gapMultiplier));

    const offsetX = (canvasWidth - logoW) / 2;
    const offsetY = (canvasHeight - logoH) / 2;

    for (let y = 0; y < logoH; y += gap) {
      for (let x = 0; x < logoW; x += gap) {
        const i = (y * logoW + x) * 4;
        const alpha = data[i + 3];
        if (alpha > 128) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          points.push({
            x: x + offsetX,
            y: y + offsetY,
            color: { r, g, b },
          });
        }
      }
    }

    return points;
  }, []);

  /**
   * Create particles from logo points
   */
  const createParticles = useCallback((points, canvasWidth, canvasHeight) => {
    return points.map((pt) => ({
      // Current position (start scattered)
      x: randomFloat(0, canvasWidth),
      y: randomFloat(0, canvasHeight),
      // Target position (logo formation)
      targetX: pt.x,
      targetY: pt.y,
      // Velocity
      vx: 0,
      vy: 0,
      // Original color from logo
      baseColor: pt.color,
      // Current rendered color
      color: { ...pt.color },
      // Size
      size: randomFloat(1.5, 3),
      baseSize: randomFloat(1.5, 3),
      // Life properties
      friction: randomFloat(0.85, 0.95),
      ease: randomFloat(0.02, 0.06),
      // For scroll dispersal
      disperseX: randomFloat(-canvasWidth * 0.8, canvasWidth * 0.8),
      disperseY: randomFloat(-canvasHeight * 0.8, canvasHeight * 0.8),
      // Trail
      trail: [],
      maxTrail: 5,
    }));
  }, []);

  /**
   * Set scroll progress (called from outside)
   */
  const setScrollProgress = useCallback((progress) => {
    scrollProgressRef.current = clamp(progress, 0, 1);
  }, []);

  /**
   * Reconstruct logo formation
   */
  const reconstruct = useCallback(() => {
    scrollProgressRef.current = 0;
    const particles = particlesRef.current;
    particles.forEach((p) => {
      p.vx = 0;
      p.vy = 0;
    });
  }, []);

  /**
   * Main animation loop
   */
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = dimensionsRef.current;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const scrollP = scrollProgressRef.current;

    ctx.clearRect(0, 0, width, height);

    // Calculate mouse speed
    const dx = mouse.x - mouse.prevX;
    const dy = mouse.y - mouse.prevY;
    mouse.speed = Math.sqrt(dx * dx + dy * dy);
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;

    const mouseRadius = 120;
    const isMouseActive = mouse.x > 0 && mouse.y > 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Calculate target based on scroll progress (disperse as user scrolls)
      const tx = lerp(p.targetX, p.targetX + p.disperseX, scrollP);
      const ty = lerp(p.targetY, p.targetY + p.disperseY, scrollP);

      // Base movement towards target
      p.vx += (tx - p.x) * p.ease;
      p.vy += (ty - p.y) * p.ease;

      // Mouse interaction
      if (isMouseActive) {
        const dist = distance(p.x, p.y, mouse.x, mouse.y);

        if (dist < mouseRadius) {
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
          const force = (mouseRadius - dist) / mouseRadius;

          if (mouse.isDown) {
            // Vortex effect — pull towards mouse with rotation
            const vortexAngle = angle + Math.PI / 2;
            p.vx += Math.cos(vortexAngle) * force * 3 - Math.cos(angle) * force * 1.5;
            p.vy += Math.sin(vortexAngle) * force * 3 - Math.sin(angle) * force * 1.5;
          } else {
            // Repulsion
            p.vx += Math.cos(angle) * force * 4;
            p.vy += Math.sin(angle) * force * 4;
          }
        }
      }

      // Apply friction
      p.vx *= p.friction;
      p.vy *= p.friction;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Compute velocity magnitude for color shift
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

      // Color shift based on speed
      const speedFactor = clamp(speed / 10, 0, 1);
      p.color.r = Math.round(lerp(p.baseColor.r, 245, speedFactor));
      p.color.g = Math.round(lerp(p.baseColor.g, 197, speedFactor));
      p.color.b = Math.round(lerp(p.baseColor.b, 24, speedFactor));

      // Size pulse based on speed
      p.size = lerp(p.baseSize, p.baseSize * 2, speedFactor * 0.5);

      // Trail management
      if (mouse.speed > 8 && speed > 2) {
        p.trail.push({ x: p.x, y: p.y, alpha: 0.4 });
        if (p.trail.length > p.maxTrail) p.trail.shift();
      } else if (p.trail.length > 0) {
        p.trail.shift();
      }

      // Render trail
      for (let t = 0; t < p.trail.length; t++) {
        const trail = p.trail[t];
        const trailAlpha = (t / p.trail.length) * 0.3 * (1 - scrollP);
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${trailAlpha})`;
        ctx.fill();
      }

      // Render particle
      const alpha = clamp(1 - scrollP * 1.5, 0, 1);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
      ctx.fill();

      // Glow for fast particles
      if (speed > 3) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${0.05 * alpha})`;
        ctx.fill();
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);
  }, [canvasRef]);

  /**
   * Handle click explosion
   */
  const handleClick = useCallback((e) => {
    const particles = particlesRef.current;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const explosionRadius = 200;

    particles.forEach((p) => {
      const dist = distance(p.x, p.y, mx, my);
      if (dist < explosionRadius) {
        const angle = Math.atan2(p.y - my, p.x - mx);
        const force = ((explosionRadius - dist) / explosionRadius) * 15;
        p.vx += Math.cos(angle) * force;
        p.vy += Math.sin(angle) * force;
      }
    });
  }, [canvasRef]);

  /**
   * Initialize the particle system
   */
  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isInitializedRef.current) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { width: rect.width, height: rect.height };
    };

    resize();

    // Load logo and extract points
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const { width, height } = dimensionsRef.current;
      const points = extractLogoPoints(img, width, height);
      logoPointsRef.current = points;
      particlesRef.current = createParticles(points, width, height);
      isInitializedRef.current = true;

      // Start animation
      animate();
    };
    img.src = logoImageUrl;

    // Mouse events
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onMouseDown = () => { mouseRef.current.isDown = true; };
    const onMouseUp = () => { mouseRef.current.isDown = false; };
    const onMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.isDown = false;
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', resize);

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [canvasRef, logoImageUrl, extractLogoPoints, createParticles, animate, handleClick]);

  return { init, setScrollProgress, reconstruct };
}

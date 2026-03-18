/**
 * Performance monitor — detects low-end devices and provides
 * a quality tier that components can use to reduce animation complexity.
 *
 * Usage:
 *   import { getPerformanceTier, shouldReduceMotion } from '../utils/performanceMonitor';
 *   const tier = getPerformanceTier(); // 'high' | 'medium' | 'low'
 */

let cachedTier = null;

export function getPerformanceTier() {
  if (cachedTier) return cachedTier;

  // Check prefers-reduced-motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cachedTier = 'low';
    return cachedTier;
  }

  let score = 0;

  // Device memory (Chrome, Edge)
  if (navigator.deviceMemory) {
    if (navigator.deviceMemory >= 8) score += 3;
    else if (navigator.deviceMemory >= 4) score += 2;
    else score += 1;
  } else {
    score += 2; // assume medium
  }

  // Hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency) {
    if (navigator.hardwareConcurrency >= 8) score += 3;
    else if (navigator.hardwareConcurrency >= 4) score += 2;
    else score += 1;
  } else {
    score += 2;
  }

  // Screen resolution (high-res = more GPU pressure)
  const dpr = window.devicePixelRatio || 1;
  const pixels = window.screen.width * window.screen.height * dpr * dpr;
  if (pixels > 8000000) score -= 1; // 4K+ screens penalized slightly

  // Mobile detection
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || ('ontouchstart' in window && window.innerWidth < 1024);
  if (isMobile) score -= 1;

  // Connection quality (if available)
  if (navigator.connection) {
    const conn = navigator.connection;
    if (conn.saveData) score -= 2;
    if (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') score -= 1;
  }

  if (score >= 5) cachedTier = 'high';
  else if (score >= 3) cachedTier = 'medium';
  else cachedTier = 'low';

  return cachedTier;
}

export function shouldReduceMotion() {
  return getPerformanceTier() === 'low';
}

export function getParticleCount() {
  const tier = getPerformanceTier();
  if (tier === 'high') return null; // use default (auto from image)
  if (tier === 'medium') return 1500;
  return 800;
}

/**
 * FPS monitor — call startFPSMonitor() to begin tracking.
 * If FPS drops consistently, it calls the callback with the tier.
 */
export function startFPSMonitor(onLowFPS, thresholdFPS = 30, sampleDuration = 3000) {
  let frames = 0;
  let startTime = performance.now();
  let raf;
  let stopped = false;

  const countFrame = () => {
    if (stopped) return;
    frames++;
    const elapsed = performance.now() - startTime;

    if (elapsed >= sampleDuration) {
      const fps = (frames / elapsed) * 1000;
      if (fps < thresholdFPS) {
        onLowFPS?.(fps);
      }
      // Reset
      frames = 0;
      startTime = performance.now();
    }

    raf = requestAnimationFrame(countFrame);
  };

  raf = requestAnimationFrame(countFrame);

  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
  };
}

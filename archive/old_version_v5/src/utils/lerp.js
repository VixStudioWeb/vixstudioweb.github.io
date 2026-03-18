/**
 * Linear interpolation
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} factor - Interpolation factor (0 to 1)
 * @returns {number}
 */
export const lerp = (start, end, factor) => start + (end - start) * factor;

/**
 * Lerp with delta time for frame-independent movement
 */
export const lerpDt = (start, end, factor, dt = 1 / 60) => {
  const f = 1 - Math.pow(1 - factor, dt * 60);
  return start + (end - start) * f;
};

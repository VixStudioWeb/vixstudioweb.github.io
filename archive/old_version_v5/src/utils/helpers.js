/**
 * Map a value from one range to another
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
};

/**
 * Get distance between two points
 */
export const distance = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

/**
 * Random float between min and max
 */
export const randomFloat = (min, max) => Math.random() * (max - min) + min;

/**
 * Random integer between min and max (inclusive)
 */
export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Debounce function
 */
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

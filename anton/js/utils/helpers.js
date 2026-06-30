/**
 * Creates a debounced version of a function that delays its execution until after
 * a delay period has elapsed since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} waitMs - Delay in milliseconds.
 * @returns {Function} Debounced function.
 */
export function debounce(func, waitMs) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, waitMs);
  };
}

/**
 * Perform a deep merge of objects.
 * @param {Object} target - The target object.
 * @param {Object} source - The source object.
 * @returns {Object} Deeply merged object.
 */
export function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return source;

  const result = { ...target };
  
  for (const [key, val] of Object.entries(source)) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      result[key] = deepMerge(result[key] || {}, val);
    } else {
      result[key] = val;
    }
  }
  
  return result;
}

/**
 * Deep clones any JSON-serializable object.
 * @template T
 * @param {T} obj - The object to clone.
 * @returns {T} Cloned object.
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

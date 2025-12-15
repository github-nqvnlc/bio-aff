/**
 * Safely parse a JSON string.
 *
 * @param {string | null | undefined} value - Raw JSON string.
 * @param {any} [fallback=null] - Fallback value when parsing fails.
 * @returns {any} Parsed JSON or fallback value.
 */
export function safeParseJSON(value, fallback = null) {
  if (typeof value !== 'string') return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Create a DOM element with optional classes and attributes.
 *
 * @param {string} tag - Tag name to create.
 * @param {string[]} [classNames] - CSS class names to apply.
 * @param {Record<string, string>} [attributes] - Attributes to set.
 * @returns {HTMLElement}
 */
export function createElement(tag, classNames = [], attributes = {}) {
  const el = document.createElement(tag);
  classNames.forEach((name) => el.classList.add(name));
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
}



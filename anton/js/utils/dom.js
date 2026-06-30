/**
 * Safely creates an HTML element with specified attributes, class names, children, and event listeners.
 * @param {string} tag - The HTML tag name (e.g. 'div', 'button').
 * @param {Object} [props] - HTML attributes and properties.
 * @param {string} [props.className] - CSS class names.
 * @param {Object} [props.dataset] - Data attributes mapping.
 * @param {Object} [props.on] - Event listeners mapping (e.g., { click: callback }).
 * @param {Array<HTMLElement|string>|HTMLElement|string} [children] - Inner elements or text content.
 * @returns {HTMLElement} The created DOM element.
 */
export function el(tag, props = {}, children = []) {
  const element = document.createElement(tag);

  // Set properties/attributes
  for (const [key, val] of Object.entries(props)) {
    if (key === 'className') {
      element.className = val;
    } else if (key === 'dataset' && typeof val === 'object') {
      for (const [dKey, dVal] of Object.entries(val)) {
        element.dataset[dKey] = dVal;
      }
    } else if (key === 'on' && typeof val === 'object') {
      for (const [evtName, callback] of Object.entries(val)) {
        element.addEventListener(evtName, callback);
      }
    } else if (key === 'style' && typeof val === 'object') {
      Object.assign(element.style, val);
    } else {
      element.setAttribute(key, val);
    }
  }

  // Append children safely
  const childrenArray = Array.isArray(children) ? children : [children];
  for (const child of childrenArray) {
    if (child === null || child === undefined) continue;
    if (child instanceof HTMLElement || child instanceof SVGElement) {
      element.appendChild(child);
    } else {
      element.appendChild(document.createTextNode(String(child)));
    }
  }

  return element;
}

/**
 * Creates an SVG element referencing a symbol in the central icon sheet.
 * @param {string} iconId - Symbol ID in icons.svg (e.g., 'icon-lock').
 * @param {string} [className] - Optional custom CSS classes.
 * @returns {SVGElement} The SVG DOM node.
 */
export function icon(iconId, className = 'nav-icon') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', className);

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `assets/icons/icons.svg#${iconId}`);
  
  svg.appendChild(use);
  return svg;
}

/**
 * Clears all children from a DOM node.
 * @param {HTMLElement} element - The node to empty.
 */
export function clearContainer(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

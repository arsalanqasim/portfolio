/**
 * Formats a Date object or ISO date string into a standard Pixar/Figma dashboard label.
 * @param {Date|string} dateInput - The date to format.
 * @returns {string} Formatted date string (e.g. "JUN 30, 2026").
 */
export function formatDashboardDate(dateInput) {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return 'UNKNOWN';

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

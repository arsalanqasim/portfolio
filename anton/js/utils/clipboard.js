/**
 * Copies plain text to the user's system clipboard.
 * Uses the navigator.clipboard API if available, with a fallback.
 * @param {string} text - Text to copy.
 * @returns {Promise<boolean>} Resolves to true on success, false on failure.
 */
export async function copyToClipboard(text) {
  if (!navigator.clipboard) {
    return fallbackCopyToClipboard(text);
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Clipboard API failed, using fallback copy:', err);
    return fallbackCopyToClipboard(text);
  }
}

function fallbackCopyToClipboard(text) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback clipboard write failed:', err);
    return false;
  }
}

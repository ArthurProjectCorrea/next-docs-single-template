/**
 * Table of Contents utility functions
 * DOM manipulation and navigation helpers
 */

/**
 * Applies a highlight animation to the target element when navigating via TOC
 * Uses CSS class 'hash-highlight' for animation styling
 *
 * @param id - The element ID to highlight (without #)
 */
export function highlightElement(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;

  // Remove any existing highlight
  element.classList.remove('hash-highlight');
  // Force reflow to restart animation
  void element.offsetWidth;
  // Add highlight class
  element.classList.add('hash-highlight');

  // Remove highlight after animation completes
  setTimeout(() => {
    element.classList.remove('hash-highlight');
  }, 2000);
}

/**
 * Scrolls to element with smooth behavior
 *
 * @param id - The element ID to scroll to (without #)
 */
export function scrollToElement(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

/**
 * Handles TOC item click navigation
 * Scrolls to element, updates URL hash, and applies highlight
 *
 * @param url - The URL with hash (e.g., "#section-id")
 */
export function handleTocNavigation(url: string): void {
  const id = url.slice(1); // Remove leading #
  scrollToElement(id);
  window.history.pushState(null, '', url);
  highlightElement(id);
}

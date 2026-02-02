'use client';

import { useEffect } from 'react';
import { scrollToElement, highlightElement } from '@/lib/toc-utils';

interface UseHashHighlightOptions {
  /**
   * Delay in ms before highlighting (allows content to render)
   * @default 100
   */
  delay?: number;
  /**
   * Whether the hook is enabled
   * @default true
   */
  enabled?: boolean;
}

/**
 * Custom hook to highlight element when page loads with a hash in URL
 * Useful for deep-linking to specific sections
 *
 * @param options - Configuration options
 *
 * @example
 * ```tsx
 * // Highlights #getting-started on page load if URL has that hash
 * useHashHighlight();
 * ```
 */
export function useHashHighlight({
  delay = 100,
  enabled = true,
}: UseHashHighlightOptions = {}): void {
  useEffect(() => {
    if (!enabled || !window.location.hash) return;

    const id = window.location.hash.slice(1);
    // Small delay to ensure element is rendered
    const timeoutId = setTimeout(() => {
      scrollToElement(id);
      highlightElement(id);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay, enabled]);
}

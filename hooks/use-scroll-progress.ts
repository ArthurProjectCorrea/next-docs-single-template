'use client';

import { useState, useEffect } from 'react';

interface UseScrollProgressOptions {
  /**
   * ID of the scrollable container element
   */
  containerId: string;
}

/**
 * Custom hook to track scroll progress of a container
 * Returns a percentage (0-100) indicating how far the user has scrolled
 *
 * @param options - Configuration options including container ID
 * @returns Progress percentage (0-100)
 *
 * @example
 * ```tsx
 * const progress = useScrollProgress({ containerId: 'docs-content' });
 * // progress = 50 means user is halfway through the content
 * ```
 */
export function useScrollProgress({
  containerId,
}: UseScrollProgressOptions): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;

    const updateProgress = () => {
      const scrollTop = root.scrollTop;
      const scrollHeight = root.scrollHeight - root.clientHeight;
      const calculatedProgress =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(calculatedProgress);
    };

    root.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial calculation

    return () => root.removeEventListener('scroll', updateProgress);
  }, [containerId]);

  return progress;
}

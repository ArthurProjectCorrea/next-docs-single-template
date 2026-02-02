'use client';

import { useEffect } from 'react';

interface UseSearchKeyboardOptions {
  /**
   * Callback function to toggle search dialog
   */
  onToggle: () => void;
  /**
   * Key to trigger the search (default: 'k')
   */
  key?: string;
  /**
   * Whether the shortcut is enabled (default: true)
   */
  enabled?: boolean;
}

/**
 * Custom hook for handling keyboard shortcuts to open/close search
 * Listens for Ctrl+K (Windows/Linux) or Cmd+K (Mac)
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 * useSearchKeyboard({
 *   onToggle: () => setOpen((prev) => !prev),
 * });
 * ```
 */
export function useSearchKeyboard({
  onToggle,
  key = 'k',
  enabled = true,
}: UseSearchKeyboardOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onToggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onToggle, key, enabled]);
}

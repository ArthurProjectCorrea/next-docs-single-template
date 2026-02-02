'use client';

import { useCallback, useSyncExternalStore } from 'react';
import type { TOCItem } from '@/types/global';

/**
 * Custom hook to manage TOC state
 * Uses useSyncExternalStore for proper synchronization with window.toc
 *
 * @returns Current TOC items array
 */
export function useToc(): TOCItem[] {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('toc-update', callback);
    return () => window.removeEventListener('toc-update', callback);
  }, []);

  const getSnapshot = useCallback(() => {
    return window.toc || [];
  }, []);

  const getServerSnapshot = useCallback(() => {
    return [] as TOCItem[];
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

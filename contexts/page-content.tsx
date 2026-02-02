'use client';

import { useEffect } from 'react';
import type { TOCItem } from '@/types/global';

/**
 * Wrapper component that syncs TOC data to window for external components
 * Used by page.tsx to provide TOC to DocToc (which lives in layout)
 */
export function PageContent({
  toc,
  children,
}: {
  toc: TOCItem[];
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.toc = toc;
    // Dispatch custom event to notify DocToc
    window.dispatchEvent(new CustomEvent('toc-update'));
  }, [toc]);

  return <>{children}</>;
}

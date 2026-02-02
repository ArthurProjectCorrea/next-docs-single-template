'use client';

import { TOCProvider } from '@/contexts/toc-context';
import { useEffect } from 'react';
import type { TOCItem } from '@/types/global';

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

  return <TOCProvider toc={toc}>{children}</TOCProvider>;
}

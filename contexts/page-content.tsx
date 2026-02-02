'use client';

import { TOCProvider } from '@/contexts/toc-context';
import { useEffect } from 'react';

declare global {
  interface Window {
    toc?: { title: React.ReactNode; url: string; depth: number }[];
  }
}

export function PageContent({
  toc,
  children,
}: {
  toc: { title: React.ReactNode; url: string; depth: number }[];
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.toc = toc;
  }, [toc]);

  return <TOCProvider toc={toc}>{children}</TOCProvider>;
}

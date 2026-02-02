import type { ReactNode } from 'react';

export interface TOCItem {
  title: ReactNode;
  url: string;
  depth: number;
}

declare global {
  interface Window {
    toc?: TOCItem[];
  }
}

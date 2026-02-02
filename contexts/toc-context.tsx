'use client';

import { createContext, useContext } from 'react';
import type { TOCItem } from '@/types/global';

const TOCContext = createContext<TOCItem[]>([]);

export const TOCProvider = ({
  children,
  toc,
}: {
  children: React.ReactNode;
  toc: TOCItem[];
}) => <TOCContext.Provider value={toc}>{children}</TOCContext.Provider>;

export const useTOC = () => useContext(TOCContext);

'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n';

// Client-side i18n config (no server-only imports)
export const locales = ['en', 'pt'] as const;
export const defaultLocale = 'en' as const;

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  pt: '🇧🇷',
};

interface DictionaryContextValue {
  dictionary: Dictionary;
  locale: Locale;
  t: (template: string, variables?: Record<string, string | number>) => string;
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null);

interface DictionaryProviderProps {
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
}

// Helper to interpolate variables in translation strings
function interpolate(
  template: string,
  variables?: Record<string, string | number>,
): string {
  if (!variables) return template;

  return Object.entries(variables).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }, template);
}

export function DictionaryProvider({
  children,
  dictionary,
  locale,
}: DictionaryProviderProps) {
  const value: DictionaryContextValue = {
    dictionary,
    locale,
    t: interpolate,
  };

  return (
    <DictionaryContext.Provider value={value}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary(): DictionaryContextValue {
  const context = useContext(DictionaryContext);

  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }

  return context;
}

// Hook to get just the locale
export function useLocale(): Locale {
  const { locale } = useDictionary();
  return locale;
}

// Hook to get just the t function
export function useTranslation() {
  const { dictionary, t } = useDictionary();
  return { dictionary, t };
}

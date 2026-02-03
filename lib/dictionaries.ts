import 'server-only';
import type { Locale } from '@/lib/i18n';

// Dictionary type based on the JSON structure
export interface Dictionary {
  common: {
    search: string;
    searchPlaceholder: string;
    searchNoResults: string;
    loading: string;
    error: string;
    notFound: string;
    backToHome: string;
    language: string;
    theme: string;
    lightMode: string;
    darkMode: string;
    systemMode: string;
  };
  navigation: {
    home: string;
    docs: string;
    blog: string;
    about: string;
    contact: string;
    getStarted: string;
  };
  docs: {
    tableOfContents: string;
    previousPage: string;
    nextPage: string;
    editOnGitHub: string;
    lastUpdated: string;
    version: string;
    filterByVersion: string;
    searchInVersion: string;
    allVersions: string;
  };
  home: {
    title: string;
    subtitle: string;
    getStarted: string;
    viewOnGitHub: string;
    features: {
      title: string;
      versioning: string;
      versioningDesc: string;
      search: string;
      searchDesc: string;
      darkMode: string;
      darkModeDesc: string;
      mdx: string;
      mdxDesc: string;
    };
  };
  footer: {
    copyright: string;
    builtWith: string;
  };
  errors: {
    404: {
      title: string;
      description: string;
    };
    500: {
      title: string;
      description: string;
    };
  };
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  pt: () => import('@/dictionaries/pt.json').then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

// Helper to interpolate variables in translation strings
export function t(
  template: string,
  variables?: Record<string, string | number>,
): string {
  if (!variables) return template;

  return Object.entries(variables).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }, template);
}

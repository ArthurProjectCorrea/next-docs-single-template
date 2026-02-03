import 'server-only';

export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  pt: '🇧🇷',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | undefined {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return undefined;
}

export function removeLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (locale) {
    return pathname.replace(`/${locale}`, '') || '/';
  }
  return pathname;
}

export function addLocaleToPathname(pathname: string, locale: Locale): string {
  const cleanPathname = removeLocaleFromPathname(pathname);
  return `/${locale}${cleanPathname === '/' ? '' : cleanPathname}`;
}

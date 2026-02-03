import { NextResponse, type NextRequest } from 'next/server';

const locales = ['en', 'pt'] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = 'en';

function getLocaleFromHeaders(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');

  if (!acceptLanguage) return defaultLocale;

  // Parse accept-language header
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, quality = 'q=1'] = lang.trim().split(';');
      const q = parseFloat(quality.replace('q=', ''));
      return { locale: locale.split('-')[0].toLowerCase(), q };
    })
    .sort((a, b) => b.q - a.q);

  // Find first matching locale
  for (const { locale } of languages) {
    if (locales.includes(locale as Locale)) {
      return locale as Locale;
    }
  }

  return defaultLocale;
}

function getLocaleFromPathname(pathname: string): Locale | undefined {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && locales.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }

  return undefined;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameLocale = getLocaleFromPathname(pathname);

  if (pathnameLocale) {
    // Locale already in URL, continue
    return NextResponse.next();
  }

  // No locale in pathname, redirect to appropriate locale
  const locale = getLocaleFromHeaders(request);

  // Build new URL with locale
  const newPathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  const newUrl = new URL(newPathname, request.url);
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};

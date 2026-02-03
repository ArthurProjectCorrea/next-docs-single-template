import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import TopLoader from '@/components/next-top-loader';
import AppHeader from '@/components/app-header';
import { isValidLocale, locales } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import { notFound } from 'next/navigation';
import { DictionaryProvider } from '@/contexts/dictionary-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: 'Next Docs Template',
      template: '%s | Next Docs Template',
    },
    description:
      'A modern documentation template built with Next.js, Fumadocs, and shadcn/ui',
    keywords: ['documentation', 'next.js', 'react', 'fumadocs', 'mdx'],
    authors: [{ name: 'Your Name' }],
    creator: 'Your Name',
    openGraph: {
      type: 'website',
      siteName: 'Next Docs Template',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DictionaryProvider dictionary={dictionary} locale={locale}>
            <TopLoader />
            <AppHeader />
            <main className="flex flex-1 min-h-0 w-full">{children}</main>
          </DictionaryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

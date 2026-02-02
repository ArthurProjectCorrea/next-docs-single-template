import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import TopLoader from '@/components/next-top-loader';
import AppHeader from '@/components/app-header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
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
    locale: 'pt_BR',
    siteName: 'Next Docs Template',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopLoader />
          <AppHeader />
          <main className="flex flex-1 min-h-0 w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

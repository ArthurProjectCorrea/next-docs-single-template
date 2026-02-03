import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <div className="flex flex-1 items-center justify-center bg-muted font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between px-6 py-16 sm:items-start sm:px-12 md:px-16 md:py-32">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground">
            {dict.home.title}
          </h1>
          <p className="max-w-md text-lg leading-8 text-muted-foreground">
            {dict.home.subtitle}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-primary-foreground transition-colors hover:bg-primary/90 md:w-40"
            href={`/${locale}/docs/latest`}
          >
            {dict.home.getStarted}
          </Link>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-border px-5 transition-colors hover:border-transparent hover:bg-accent md:w-40"
            href="https://github.com/your-repo/next-docs-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.home.viewOnGitHub}
          </a>
        </div>
      </main>
    </div>
  );
}

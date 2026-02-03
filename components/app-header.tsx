'use client';

import AppNavbar from './app-navbar';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { AppSearch } from './app-search';
import { AppSidebar } from './app-sidebar';
import { LanguageSwitcher } from './language-switcher';
import { useLocale } from '@/contexts/dictionary-context';

export default function AppHeader() {
  const locale = useLocale();

  return (
    <header className="h-[--header-height] px-6 py-2 bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Logo */}
        <Link href={`/${locale}`} aria-label="Home" className="shrink-0">
          <Image
            src="/next.svg"
            alt="Next.js"
            width={90}
            height={18}
            className="dark:invert"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <AppNavbar />
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <AppSearch />
          <LanguageSwitcher />
          <ModeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <AppSidebar />
        </div>
      </div>
    </header>
  );
}

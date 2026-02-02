'use client';

import AppNavbar from './app-navbar';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { AppSearch } from './app-search';
import { AppSidebar } from './app-sidebar';

export default function AppHeader() {
  return (
    <header className="p-4 bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <Image
            src="/next.svg"
            alt="Next.js"
            width={99}
            height={20}
            className="dark:invert"
          />
        </Link>
        <div>
          <AppNavbar />
        </div>
        <div className="md:hidden">
          <AppSidebar />
        </div>
        <div className="hidden md:flex items-center gap-2">
          <AppSearch />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

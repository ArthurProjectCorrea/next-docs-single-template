'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import Link from 'next/link';
import navbarData from '@/database/app-navbar.json';
import { ModeToggle } from './mode-toggle';

export function AppSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="h-9 w-9 md:hidden"
      >
        <Menu className="size-4" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="p-4 flex flex-col h-full">
          <SheetHeader>
            <div className="flex items-center justify-between w-full">
              <SheetTitle>Menu</SheetTitle>
              <SheetClose />
            </div>
          </SheetHeader>

          <nav className="mt-6">
            <ul className="flex flex-col gap-3">
              {navbarData.map((item: { label: string; href: string }) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`block w-full rounded-md px-3 py-2 text-base hover:bg-accent ${
                        isActive ? 'bg-accent text-primary font-medium' : ''
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto pt-4">
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import {
  useDictionary,
  locales,
  localeNames,
  localeFlags,
} from '@/contexts/dictionary-context';
import type { Locale } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { locale: currentLocale, dictionary } = useDictionary();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Replace the locale in the pathname
    const segments = pathname.split('/').filter(Boolean);

    // Check if the first segment is a locale
    if (locales.includes(segments[0] as Locale)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPath = '/' + segments.join('/');
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
          <span className="sr-only">{dictionary.common.language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLocale(locale)}
            className={
              locale === currentLocale
                ? 'bg-accent text-primary font-medium'
                : ''
            }
          >
            <span className="mr-2">{localeFlags[locale]}</span>
            {localeNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

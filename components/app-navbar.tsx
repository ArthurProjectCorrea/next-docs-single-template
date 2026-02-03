'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useDictionary, useLocale } from '@/contexts/dictionary-context';

export default function AppNavbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const { dictionary } = useDictionary();

  // Define navigation items with translations
  const navItems = [
    { label: dictionary.navigation.home, href: `/${locale}` },
    { label: dictionary.navigation.docs, href: `/${locale}/docs/latest` },
    { label: dictionary.navigation.blog, href: `/${locale}/blog` },
    { label: dictionary.navigation.about, href: `/${locale}/about` },
  ];

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navItems.map((item) => {
          const isActive =
            item.href === `/${locale}`
              ? pathname === `/${locale}` || pathname === `/${locale}/`
              : pathname.startsWith(item.href);
          return (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  className={isActive ? 'text-primary font-medium' : ''}
                >
                  {item.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

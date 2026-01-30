import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import navbarData from '@/database/app-navbar.json';

export default function AppNavbar() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navbarData.map((item: { label: string; href: string }) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink asChild>
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

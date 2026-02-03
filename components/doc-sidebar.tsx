'use client';

import * as React from 'react';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';

import type { NavItem, VersionInfo } from '@/types/sidebar';
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { VersionSwitcher } from './app-version-switcher';

interface DocSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navItems: NavItem[];
  versionsInfo: VersionInfo[];
  currentVersionInfo: VersionInfo;
  locale: Locale;
  dictionary: Dictionary;
}

export function DocSidebar({
  navItems,
  versionsInfo,
  currentVersionInfo,
  locale,
  ...props
}: DocSidebarProps) {
  const pathname = usePathname();

  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>(
    {},
  );

  const toggleOpen = (id: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const elements: React.ReactNode[] = [];
  navItems.forEach((item) => {
    if (item.group) {
      elements.push(
        <SidebarGroupLabel key={`label-${item.title}`}>
          {item.group}
        </SidebarGroupLabel>,
      );
    }
    if (item.items?.length) {
      const isOpen =
        openStates[item.id || item.title] ?? item.defaultOpen ?? false;
      elements.push(
        <Collapsible
          key={item.title}
          open={isOpen}
          onOpenChange={() => toggleOpen(item.id || item.title)}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                {item.title}{' '}
                <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    {subItem.url ? (
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.url}
                      >
                        <Link href={subItem.url}>{subItem.title}</Link>
                      </SidebarMenuSubButton>
                    ) : (
                      <SidebarMenuSubButton isActive={false}>
                        {subItem.title}
                      </SidebarMenuSubButton>
                    )}
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>,
      );
    } else {
      elements.push(
        <SidebarMenuItem key={item.title}>
          {item.url ? (
            <SidebarMenuButton asChild isActive={pathname === item.url}>
              <Link href={item.url}>{item.title}</Link>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton isActive={false}>{item.title}</SidebarMenuButton>
          )}
        </SidebarMenuItem>,
      );
    }
  });

  return (
    <Sidebar
      className="sticky top-[var(--header-height)] left-0 z-30  hidden h-[calc(100svh-var(--header-height))] overscroll-none bg-background  md:flex"
      collapsible="none"
      {...props}
    >
      <SidebarHeader>
        <VersionSwitcher
          versionsInfo={versionsInfo}
          currentVersionInfo={currentVersionInfo}
          locale={locale}
        />
      </SidebarHeader>
      <SidebarContent className="no-scrollbar overflow-x-hidden px-2">
        <SidebarGroup>
          <SidebarMenu>{elements}</SidebarMenu>
        </SidebarGroup>
        <div className="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t blur-xs" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

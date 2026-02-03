'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronsUpDown, Sparkles, Archive } from 'lucide-react';

import type { VersionInfo } from '@/types/sidebar';
import type { Locale } from '@/lib/i18n';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function VersionSwitcher({
  versionsInfo,
  currentVersionInfo,
  locale,
}: {
  versionsInfo: VersionInfo[];
  currentVersionInfo: VersionInfo;
  locale: Locale;
}) {
  const router = useRouter();

  // Get version slug from version info for navigation
  const getVersionSlug = (info: VersionInfo) => {
    if (info.isLatest) return 'latest';
    // Extract version number from name like "Version 1" -> "v1"
    const versionNum = info.name.replace('Version ', '');
    return `v${versionNum}`;
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {currentVersionInfo.isLatest ? (
                  <Sparkles className="size-4" />
                ) : (
                  <Archive className="size-4" />
                )}
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">{currentVersionInfo.name}</span>
                <span className="text-xs text-muted-foreground">
                  {currentVersionInfo.semver}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {versionsInfo.map((versionInfo) => (
              <DropdownMenuItem
                key={versionInfo.name}
                onSelect={() => {
                  const slug = getVersionSlug(versionInfo);
                  router.push(`/${locale}/docs/${slug}`);
                }}
                className="flex items-center gap-2"
              >
                <div className="flex aspect-square size-6 items-center justify-center rounded bg-muted">
                  {versionInfo.isLatest ? (
                    <Sparkles className="size-3" />
                  ) : (
                    <Archive className="size-3" />
                  )}
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium text-sm">
                    {versionInfo.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {versionInfo.semver}
                  </span>
                </div>
                {versionInfo.name === currentVersionInfo.name && (
                  <Check className="ml-auto size-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

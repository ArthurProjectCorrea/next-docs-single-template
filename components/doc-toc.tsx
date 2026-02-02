'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import { AnchorProvider, TOCItem } from 'fumadocs-core/toc';

import { cn } from '@/lib/utils';
import { handleTocNavigation } from '@/lib/toc-utils';
import { useToc } from '@/hooks/use-toc';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { useHashHighlight } from '@/hooks/use-hash-highlight';
import type { TOCItem as TOCItemType } from '@/types/global';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarRail,
} from '@/components/ui/sidebar';

function DocsTableOfContents({
  toc,
  variant = 'list',
  className,
  onNavigate,
}: {
  toc: TOCItemType[];
  variant?: 'dropdown' | 'list';
  className?: string;
  onNavigate?: (url: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  if (!toc?.length) {
    return null;
  }

  const handleItemClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    handleTocNavigation(url);
    onNavigate?.(url);
  };

  if (variant === 'dropdown') {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn('h-8 md:h-7', className)}
          >
            <Menu /> On This Page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="no-scrollbar max-h-[70svh]"
        >
          {toc.map((item) => (
            <DropdownMenuItem
              key={item.url}
              data-depth={item.depth}
              className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
            >
              <TOCItem
                href={item.url}
                onClick={(e) => {
                  handleItemClick(e, item.url);
                  setOpen(false);
                }}
              >
                {item.title}
              </TOCItem>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2 p-4 pt-0 text-sm', className)}>
      <p className="text-muted-foreground bg-background sticky top-0 h-6 text-xs font-medium">
        Índice
      </p>
      {toc.map((item) => (
        <TOCItem
          key={item.url}
          href={item.url}
          onClick={(e) => handleItemClick(e, item.url)}
          className="text-muted-foreground hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground text-[0.8rem] no-underline transition-colors data-[active=true]:font-medium data-[depth=3]:pl-4 data-[depth=4]:pl-6 rounded px-2 py-1"
          data-depth={item.depth}
        >
          {item.title}
        </TOCItem>
      ))}
    </div>
  );
}

export function DocToc({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Use extracted hooks for state management
  const toc = useToc();
  const progress = useScrollProgress({ containerId: 'docs-content' });

  // Highlight element when page loads with hash
  useHashHighlight();

  return (
    <Sidebar
      className="sticky top-[var(--header-height)] right-0 z-30 hidden h-[calc(100svh-var(--header-height))] overscroll-none bg-background xl:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden px-2 relative">
        <div
          className="absolute right-0 top-0 bottom-0 w-1 bg-primary rounded-full transition-all duration-300"
          style={{ height: `${progress}%` }}
        />
        <div className="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-8 shrink-0 bg-linear-to-b blur-xs" />
        <SidebarGroup>
          <AnchorProvider toc={toc}>
            <DocsTableOfContents toc={toc} variant="list" />
          </AnchorProvider>
        </SidebarGroup>
        <div className="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t blur-xs" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

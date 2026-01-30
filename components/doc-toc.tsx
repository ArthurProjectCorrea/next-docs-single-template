'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
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

import data from '../database/doc-toc.json';

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const root = document.getElementById('docs-content');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { root, rootMargin: '0% 0% -80% 0%' },
    );

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [itemIds]);

  return activeId;
}

function DocsTableOfContents({
  toc,
  variant = 'list',
  className,
}: {
  toc: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[];
  variant?: 'dropdown' | 'list';
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace('#', '')),
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);

  if (!toc?.length) {
    return null;
  }

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
              asChild
              onClick={() => {
                setOpen(false);
              }}
              data-depth={item.depth}
              className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
            >
              <a href={item.url}>{item.title}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2 p-4 pt-0 text-sm', className)}>
      <p className="text-muted-foreground bg-background sticky top-0 h-6 text-xs font-medium">
        On This Page
      </p>
      {toc.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] no-underline transition-colors data-[active=true]:font-medium data-[depth=3]:pl-4 data-[depth=4]:pl-6"
          data-active={item.url === `#${activeHeading}`}
          data-depth={item.depth}
        >
          {item.title}
        </a>
      ))}
    </div>
  );
}

export function DocToc({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const toc = data.map((item) => ({
    title: item.title,
    url: item.url,
    depth: item.type === 'h1' ? 1 : item.type === 'h2' ? 2 : 3,
  }));

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-6rem)] overscroll-none bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden px-2">
        <div className="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-8 shrink-0 bg-linear-to-b blur-xs" />
        <SidebarGroup>
          <DocsTableOfContents toc={toc} variant="list" />
        </SidebarGroup>
        <div className="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t blur-xs" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

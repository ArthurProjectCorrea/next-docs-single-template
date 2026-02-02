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
import { AnchorProvider, TOCItem } from 'fumadocs-core/toc';
import type { TOCItem as TOCItemType } from '@/types/global';

/**
 * Applies a highlight animation to the target element when navigating via TOC
 */
function highlightElement(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  // Remove any existing highlight
  element.classList.remove('hash-highlight');
  // Force reflow to restart animation
  void element.offsetWidth;
  // Add highlight class
  element.classList.add('hash-highlight');

  // Remove highlight after animation completes
  setTimeout(() => {
    element.classList.remove('hash-highlight');
  }, 2000);
}

/**
 * Scrolls to element with proper offset
 */
function scrollToElement(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

function DocsTableOfContents({
  toc,
  variant = 'list',
  className,
}: {
  toc: TOCItemType[];
  variant?: 'dropdown' | 'list';
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

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
              data-depth={item.depth}
              className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
            >
              <TOCItem
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  const id = item.url.slice(1);
                  scrollToElement(id);
                  window.history.pushState(null, '', item.url);
                  highlightElement(id);
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
          onClick={(e) => {
            e.preventDefault();
            const id = item.url.slice(1);
            scrollToElement(id);
            // Update URL hash without triggering navigation
            window.history.pushState(null, '', item.url);
            // Apply highlight animation
            highlightElement(id);
          }}
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
  const [toc, setToc] = React.useState<TOCItemType[]>([]);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Initial load
    setToc(window.toc || []);

    // Listen for TOC updates
    const handleTocUpdate = () => {
      setToc(window.toc || []);
    };

    window.addEventListener('toc-update', handleTocUpdate);
    return () => window.removeEventListener('toc-update', handleTocUpdate);
  }, []);

  // Highlight element when page loads with hash
  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      // Small delay to ensure element is rendered
      setTimeout(() => {
        scrollToElement(id);
        highlightElement(id);
      }, 100);
    }
  }, []);

  React.useEffect(() => {
    const root = document.getElementById('docs-content');
    if (!root) return;
    const updateProgress = () => {
      const scrollTop = root.scrollTop;
      const scrollHeight = root.scrollHeight - root.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(progress);
    };
    root.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => root.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-1rem)] overscroll-none bg-transparent xl:flex"
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

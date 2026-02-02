'use client';

import * as React from 'react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { SearchIcon, FileTextIcon, HashIcon, TextIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { groupSearchResults, parseHighlightParts } from '@/lib/search-utils';
import { useSearchKeyboard } from '@/hooks/use-search-keyboard';
import type { SearchResultGroup } from '@/types/search';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Kbd } from '@/components/ui/kbd';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

/**
 * Renders highlighted text with query matches
 * UI-only function that uses parseHighlightParts from lib
 */
function HighlightedText({
  text,
  query,
}: {
  text: string;
  query: string;
}): React.ReactNode {
  const parts = parseHighlightParts(text, query);

  return parts.map((part) =>
    part.type === 'mark' ? (
      <mark
        key={part.key}
        className="bg-transparent text-primary font-medium underline underline-offset-2 decoration-primary/50"
      >
        {part.content}
      </mark>
    ) : (
      part.content
    ),
  );
}

export function AppSearch() {
  const [open, setOpen] = React.useState(false);
  const [versionFilter, setVersionFilter] = React.useState<'current' | 'all'>(
    'current',
  );
  const pathname = usePathname();
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
  });

  // Extract current version from URL (e.g., /docs/latest/... -> 'latest')
  const currentVersion = React.useMemo(() => {
    const match = pathname.match(/^\/docs\/([^/]+)/);
    return match ? match[1] : 'latest';
  }, [pathname]);

  // Filter results based on version selection
  const filteredData = React.useMemo(() => {
    const results = query.data && query.data !== 'empty' ? query.data : [];
    if (versionFilter === 'all') {
      return results;
    }
    // Filter to only include results from current version
    return results.filter((result) => {
      const url = result.url || '';
      return (
        url.startsWith(`/docs/${currentVersion}/`) ||
        url === `/docs/${currentVersion}`
      );
    });
  }, [query.data, versionFilter, currentVersion]);

  // Memoized grouped results using extracted utility
  const groupedResults = React.useMemo<SearchResultGroup[]>(() => {
    return groupSearchResults(filteredData, search);
  }, [filteredData, search]);

  // Keyboard shortcut using extracted hook
  useSearchKeyboard({
    onToggle: React.useCallback(() => setOpen((prev) => !prev), []),
  });

  const handleSelect = () => {
    setOpen(false);
    setSearch('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative h-9 w-56 justify-start gap-2 text-sm text-muted-foreground"
        >
          <SearchIcon className="size-4" />
          <span>Search docs...</span>
          <Kbd className="pointer-events-none absolute right-2 hidden h-5 select-none sm:flex">
            <span className="text-xs">⌘</span>K
          </Kbd>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-2xl gap-0 p-0 top-[20%] translate-y-0"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search Documentation</DialogTitle>
          <DialogDescription>
            Search through our documentation to find what you need.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between border-b px-3 py-2">
          <ToggleGroup
            type="single"
            value={versionFilter}
            onValueChange={(value) => {
              if (value) setVersionFilter(value as 'current' | 'all');
            }}
            size="sm"
            variant="outline"
          >
            <ToggleGroupItem value="current" className="text-xs">
              Versão atual
            </ToggleGroupItem>
            <ToggleGroupItem value="all" className="text-xs">
              Todas as versões
            </ToggleGroupItem>
          </ToggleGroup>
          <Badge variant="secondary" className="text-xs">
            {currentVersion}
          </Badge>
        </div>

        <div className="flex items-center gap-2 border-b px-3 py-2">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documentation..."
            className="h-12 px-2 border-0 shadow-none focus-visible:ring-0"
          />
          {query.isLoading && <Spinner className="size-4" />}
        </div>

        <ScrollArea className="max-h-[400px] overflow-y-auto">
          {search.trim() === '' ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Type to search documentation...
            </div>
          ) : search.trim().length < 2 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Please type at least 2 characters to search...
            </div>
          ) : query.isLoading ? (
            <div className="flex items-center justify-center gap-2 p-6">
              <Spinner className="size-4" />
              <span className="text-sm text-muted-foreground">
                Searching...
              </span>
            </div>
          ) : groupedResults.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No results found for &quot;{search}&quot;
            </div>
          ) : (
            <div className="p-2">
              {groupedResults.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-4 last:mb-0">
                  {/* Page Title */}
                  <Link
                    href={group.pageUrl}
                    onClick={handleSelect}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-3 py-2',
                      'hover:bg-accent transition-colors',
                      'text-sm font-semibold',
                    )}
                  >
                    <FileTextIcon className="size-4 text-primary" />
                    <span>{group.pageTitle}</span>
                  </Link>

                  {/* Tags */}
                  {group.tags && group.tags.length > 0 && (
                    <div className="ml-7 flex flex-wrap gap-1">
                      {group.tags
                        .filter((tag) =>
                          tag.toLowerCase().includes(search.toLowerCase()),
                        )
                        .map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            <HighlightedText text={tag} query={search} />
                          </Badge>
                        ))}
                    </div>
                  )}

                  {/* Sections */}
                  {group.sections.map((section, sectionIndex) => (
                    <div
                      key={sectionIndex}
                      className="ml-4 border-l-2 border-border pl-2"
                    >
                      {/* Section Heading */}
                      <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-muted-foreground">
                        <HashIcon className="size-3" />
                        <span>{section.heading}</span>
                      </div>

                      {/* Matches */}
                      {section.matches.length > 0 ? (
                        <ul className="ml-2 space-y-1">
                          {section.matches.map((match, matchIndex) => (
                            <li key={matchIndex}>
                              <Link
                                href={match.url}
                                onClick={handleSelect}
                                className={cn(
                                  'block rounded-md px-3 py-1.5 text-sm',
                                  'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                                  'transition-colors',
                                )}
                              >
                                <span className="inline-flex items-start gap-1.5 text-xs">
                                  <TextIcon className="size-3 shrink-0 mt-0.5" />
                                  <span className="inline">
                                    <HighlightedText
                                      text={match.content}
                                      query={search}
                                    />
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Link
                          href={`${group.pageUrl}#${section.heading.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={handleSelect}
                          className={cn(
                            'block rounded-md px-3 py-1.5 text-sm ml-2',
                            'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                            'transition-colors',
                          )}
                        >
                          <span className="inline-flex items-start gap-1.5 text-xs">
                            <TextIcon className="size-3 shrink-0 mt-0.5" />
                            <span className="inline">
                              <HighlightedText
                                text={section.heading}
                                query={search}
                              />
                            </span>
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer with keyboard hints */}
        <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Kbd>↵</Kbd>
            <span>to select</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <span>to navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <Kbd>esc</Kbd>
            <span>to close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

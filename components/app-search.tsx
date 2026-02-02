'use client';

import * as React from 'react';
import { useDocsSearch } from 'fumadocs-core/search/client';
import type { SortedResult } from 'fumadocs-core/search';
import { SearchIcon, FileTextIcon, HashIcon, TextIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
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

interface SearchResultGroup {
  pageTitle: string;
  pageUrl: string;
  sections: {
    heading: string;
    matches: {
      content: string;
      url: string;
    }[];
  }[];
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi',
  );
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark
        key={index}
        className="bg-transparent text-primary font-medium underline underline-offset-2 decoration-primary/50"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function truncateWithContext(
  text: string,
  query: string,
  contextLength: number = 40,
): string {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) return text.slice(0, contextLength * 2);

  const start = Math.max(0, matchIndex - contextLength);
  const end = Math.min(text.length, matchIndex + query.length + contextLength);

  let result = text.slice(start, end);

  if (start > 0) result = '... ' + result;
  if (end < text.length) result = result + ' ...';

  return result;
}

/**
 * Converts a URL hash (e.g., "getting-started") to a readable title (e.g., "Getting Started")
 */
function formatHashToTitle(hash: string): string {
  return hash
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Checks if a result is relevant based on the query
 * Filters out results that only match single characters or very common words
 */
function isRelevantResult(content: string, query: string): boolean {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedContent = content.toLowerCase();

  // Ignore queries shorter than 2 characters
  if (normalizedQuery.length < 2) return false;

  // Check if the content contains the full query as a word or phrase
  const queryWords = normalizedQuery.split(/\s+/);

  // For single word queries, check if it appears as a word (not just a letter match)
  if (queryWords.length === 1) {
    // Create a regex that matches the word with word boundaries or at least 3 consecutive chars
    const wordRegex = new RegExp(
      `\\b${normalizedQuery}|${normalizedQuery}\\b`,
      'i',
    );
    return wordRegex.test(normalizedContent) || normalizedQuery.length >= 3;
  }

  // For multi-word queries, check if all words are present
  return queryWords.every((word) =>
    word.length < 2 ? true : normalizedContent.includes(word),
  );
}

/**
 * Calculates a relevance score for sorting results
 */
function calculateRelevanceScore(content: string, query: string): number {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedContent = content.toLowerCase();
  let score = 0;

  // Exact match gets highest score
  if (normalizedContent.includes(normalizedQuery)) {
    score += 100;
  }

  // Word boundary match gets bonus
  const wordBoundaryRegex = new RegExp(`\\b${normalizedQuery}\\b`, 'i');
  if (wordBoundaryRegex.test(content)) {
    score += 50;
  }

  // Title/heading matches get bonus (shorter content = likely heading)
  if (content.length < 50) {
    score += 25;
  }

  // Penalize very long content (likely less focused)
  if (content.length > 200) {
    score -= 10;
  }

  return score;
}

function groupSearchResults(
  results: SortedResult[],
  query: string,
): SearchResultGroup[] {
  const groups: Map<string, SearchResultGroup> = new Map();

  // Skip grouping if query is too short
  if (query.trim().length < 2) {
    return [];
  }

  // First pass: collect all headings by their hash
  const headingsByHash: Map<string, string> = new Map();
  results.forEach((result) => {
    if (result.type === 'heading' && result.url.includes('#')) {
      const hash = result.url.split('#')[1];
      headingsByHash.set(hash, result.content);
    }
  });

  // Filter and sort results by relevance
  const relevantResults = results
    .filter((result) => isRelevantResult(result.content, query))
    .sort(
      (a, b) =>
        calculateRelevanceScore(b.content, query) -
        calculateRelevanceScore(a.content, query),
    );

  // Limit total results to prevent overwhelming UI
  const limitedResults = relevantResults.slice(0, 30);

  limitedResults.forEach((result) => {
    const pageUrl =
      result.type === 'page' ? result.url : result.url.split('#')[0];
    const pageTitle =
      result.type === 'page'
        ? result.content
        : (results.find((r) => r.type === 'page' && r.url === pageUrl)
            ?.content ?? 'Untitled');

    if (!groups.has(pageUrl)) {
      groups.set(pageUrl, {
        pageTitle,
        pageUrl,
        sections: [],
      });
    }

    const group = groups.get(pageUrl)!;

    if (result.type === 'heading' || result.type === 'text') {
      // For text results, try to find the heading from the URL hash
      let heading: string;
      if (result.type === 'heading') {
        heading = result.content;
      } else {
        // Extract hash from URL and find corresponding heading
        const hash = result.url.includes('#') ? result.url.split('#')[1] : '';
        heading = hash
          ? headingsByHash.get(hash) || formatHashToTitle(hash)
          : 'Content';
      }

      let section = group.sections.find((s) => s.heading === heading);
      if (!section) {
        section = { heading, matches: [] };
        group.sections.push(section);
      }

      if (result.type === 'text') {
        // Avoid duplicate content in same section
        const existingContent = section.matches.map((m) => m.content);
        const truncatedContent = truncateWithContext(result.content, query);
        if (!existingContent.includes(truncatedContent)) {
          section.matches.push({
            content: truncatedContent,
            url: result.url,
          });
        }
      }
    }
  });

  // Limit matches per section and remove empty sections
  return Array.from(groups.values()).map((group) => ({
    ...group,
    sections: group.sections
      .filter((s) => s.matches.length > 0 || s.heading !== 'Content')
      .map((s) => ({
        ...s,
        matches: s.matches.slice(0, 3), // Max 3 matches per section
      })),
  }));
}

export function AppSearch() {
  const [open, setOpen] = React.useState(false);
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
  });

  const groupedResults = React.useMemo(() => {
    const results = query.data && query.data !== 'empty' ? query.data : [];
    return groupSearchResults(results, search);
  }, [query.data, search]);

  // Keyboard shortcut to open search (Ctrl+K or Cmd+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

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
          className="relative h-8 w-full justify-start gap-2 text-sm text-muted-foreground sm:w-40 md:w-64"
        >
          <SearchIcon className="size-4" />
          <span className="hidden sm:inline-flex">Search docs...</span>
          <span className="inline-flex sm:hidden">Search...</span>
          <Kbd className="pointer-events-none absolute right-1.5 hidden h-5 select-none sm:flex">
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

        <div className="flex items-center gap-2 border-b px-3">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documentation..."
            className="h-12 border-0 px-0 shadow-none focus-visible:ring-0"
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
                                    {highlightMatch(match.content, search)}
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
                              {highlightMatch(section.heading, search)}
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

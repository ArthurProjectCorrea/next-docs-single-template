import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PaginationData } from '@/lib/pagination-utils';
import type { Dictionary } from '@/lib/dictionaries';

interface DocPaginationProps {
  pagination: PaginationData;
  variant?: 'mini' | 'full';
  dictionary?: Dictionary;
}

export function DocPagination({
  pagination,
  variant = 'full',
}: DocPaginationProps) {
  const { prev, next } = pagination;

  if (!prev && !next) return null;

  if (variant === 'mini') {
    return (
      <div className="flex items-center gap-1">
        {prev ? (
          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
            <Link href={prev.url} title={prev.title}>
              <ChevronLeftIcon className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronLeftIcon className="size-4" />
          </Button>
        )}
        {next ? (
          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
            <Link href={next.url} title={next.title}>
              <ChevronRightIcon className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronRightIcon className="size-4" />
          </Button>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-between border-t pt-6"
    >
      {prev ? (
        <Button variant="outline" className="h-8" asChild>
          <Link href={prev.url} title={prev.title}>
            <ChevronLeftIcon className="size-4" />
            {prev.title}
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {next ? (
        <Button variant="outline" className="h-8" asChild>
          <Link href={next.url} title={next.title}>
            {next.title}
            <ChevronRightIcon className="size-4" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </nav>
  );
}

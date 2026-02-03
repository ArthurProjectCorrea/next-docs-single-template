'use client';

import { Badge } from '@/components/ui/badge';
import { DocPagination } from '@/components/doc-pagination';
import { DocBreadcrumbs } from '@/components/doc-breadcrumbs';
import type { PaginationData } from '@/lib/pagination-utils';
import type { Locale } from '@/lib/i18n';
import { useDictionary } from '@/contexts/dictionary-context';

interface DocHeaderProps {
  title?: string;
  description?: string;
  tags?: string[];
  lastUpdated?: string;
  pagination?: PaginationData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tree?: any;
  locale?: Locale;
}

export function DocHeader({
  title,
  description,
  tags,
  lastUpdated,
  pagination,
  tree,
  locale,
}: DocHeaderProps) {
  const { dictionary } = useDictionary();

  if (!title) return null;

  const formatDate = (dateString: string, localeCode: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(localeCode === 'pt' ? 'pt-BR' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <header className="mb-8">
      {tree && <DocBreadcrumbs tree={tree} pageTitle={title} locale={locale} />}
      <div className="flex items-start justify-between gap-4 mt-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {pagination && <DocPagination pagination={pagination} variant="mini" />}
      </div>
      {description && (
        <p className="mt-2 text-lg text-muted-foreground">{description}</p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {tags && tags.length > 0 && (
          <>
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </>
        )}
        {lastUpdated && (
          <span className="text-sm text-muted-foreground ml-auto">
            {dictionary.docs.lastUpdated}:{' '}
            {formatDate(lastUpdated, locale || 'en')}
          </span>
        )}
      </div>
    </header>
  );
}

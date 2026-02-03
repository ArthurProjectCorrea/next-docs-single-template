import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DocPagination } from '@/components/doc-pagination';
import { DocBreadcrumbs } from '@/components/doc-breadcrumbs';
import type { PaginationData } from '@/lib/pagination-utils';

interface DocHeaderProps {
  title?: string;
  description?: string;
  tags?: string[];
  pagination?: PaginationData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tree?: any;
}

export function DocHeader({
  title,
  description,
  tags,
  pagination,
  tree,
}: DocHeaderProps) {
  if (!title) return null;

  return (
    <header className="mb-8">
      {tree && <DocBreadcrumbs tree={tree} pageTitle={title} />}
      <div className="flex items-start justify-between gap-4 mt-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {pagination && <DocPagination pagination={pagination} variant="mini" />}
      </div>
      {description && (
        <p className="mt-2 text-lg text-muted-foreground">{description}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <Separator className="my-6" />
    </header>
  );
}

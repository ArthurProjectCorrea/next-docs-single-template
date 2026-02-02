import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DocPagination } from '@/components/doc-pagination';
import type { PaginationData } from '@/lib/pagination-utils';

interface DocHeaderProps {
  title?: string;
  description?: string;
  tags?: string[];
  pagination?: PaginationData;
}

export function DocHeader({
  title,
  description,
  tags,
  pagination,
}: DocHeaderProps) {
  if (!title) return null;

  return (
    <header className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
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

import { getSource } from '@/lib/source';
import { getVersions, versionExists } from '@/lib/source';
import { notFound } from 'next/navigation';
import components from '@/mdx-components';
import type { Metadata } from 'next';
import { PageContent } from '@/contexts/page-content';
import { DocHeader } from '@/components/doc-header';
import { DocPagination } from '@/components/doc-pagination';
import { getPaginationData } from '@/lib/pagination-utils';
import type { TOCItem } from '@/types/global';
import type { MDXContent } from 'mdx/types';

interface PageData {
  title?: string;
  description?: string;
  tags?: string[];
  body: MDXContent;
  toc: TOCItem[];
}

interface PageProps {
  params: Promise<{ version: string; slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { version, slug } = await params;

  if (!versionExists(version)) {
    notFound();
  }

  const source = getSource(version);
  const page = source.getPage(slug);
  if (!page) notFound();

  const data = page.data as unknown as PageData;
  const MDX = data.body;
  const pagination = getPaginationData(page.url, version);
  const tree = source.getPageTree();

  return (
    <PageContent toc={data.toc}>
      <div className="prose prose-lg max-w-none">
        <DocHeader
          title={data.title}
          description={data.description}
          tags={data.tags}
          pagination={pagination}
          tree={tree}
        />
        <MDX components={components} />
        <DocPagination pagination={pagination} variant="full" />
      </div>
    </PageContent>
  );
}

export function generateStaticParams() {
  const versions = getVersions();
  const allParams: { version: string; slug?: string[] }[] = [];

  for (const version of versions) {
    const source = getSource(version);
    const pages = source.generateParams();
    for (const page of pages) {
      allParams.push({
        version,
        slug: page.slug,
      });
    }
  }

  return allParams;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { version, slug } = await params;

  if (!versionExists(version)) {
    return { title: 'Not Found' };
  }

  const source = getSource(version);
  const page = source.getPage(slug);
  if (!page) {
    return { title: 'Not Found' };
  }

  const data = page.data as unknown as PageData;

  return {
    title: data.title,
    description: data.description,
  };
}

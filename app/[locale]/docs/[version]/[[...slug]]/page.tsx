import { getSource } from '@/lib/source';
import { getVersions, versionExists } from '@/lib/source';
import { notFound } from 'next/navigation';
import components from '@/mdx-components';
import type { Metadata } from 'next';
import { PageContent } from '@/contexts/page-content';
import { DocHeader } from '@/components/doc-header';
import { DocPagination } from '@/components/doc-pagination';
import { getPaginationData } from '@/lib/pagination-utils';
import { isValidLocale, locales, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import type { TOCItem } from '@/types/global';
import type { MDXContent } from 'mdx/types';

interface PageData {
  title?: string;
  description?: string;
  tags?: string[];
  lastUpdated?: string;
  body: MDXContent;
  toc: TOCItem[];
}

interface PageProps {
  params: Promise<{ locale: string; version: string; slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { locale, version, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  if (!versionExists(version, locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const source = getSource(version, locale);
  const page = source.getPage(slug);
  if (!page) notFound();

  const data = page.data as unknown as PageData;
  const MDX = data.body;
  const pagination = getPaginationData(page.url, version, locale);
  const tree = source.getPageTree();

  return (
    <PageContent toc={data.toc}>
      <div className="prose prose-lg max-w-none ">
        <DocHeader
          title={data.title}
          description={data.description}
          tags={data.tags}
          lastUpdated={data.lastUpdated}
          pagination={pagination}
          tree={tree}
          locale={locale as Locale}
        />
        <MDX components={components} />
        <DocPagination
          pagination={pagination}
          variant="full"
          dictionary={dict}
        />
      </div>
    </PageContent>
  );
}

export function generateStaticParams() {
  const allParams: { locale: string; version: string; slug?: string[] }[] = [];

  for (const locale of locales) {
    const versions = getVersions(locale);
    for (const version of versions) {
      const source = getSource(version, locale);
      const pages = source.generateParams();
      for (const page of pages) {
        allParams.push({
          locale,
          version,
          slug: page.slug,
        });
      }
    }
  }

  return allParams;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, version, slug } = await params;

  if (!isValidLocale(locale) || !versionExists(version, locale)) {
    return { title: 'Not Found' };
  }

  const source = getSource(version, locale);
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

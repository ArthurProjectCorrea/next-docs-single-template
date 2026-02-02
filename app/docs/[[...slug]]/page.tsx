import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import components from '@/mdx-components';
import type { Metadata } from 'next';
import { PageContent } from '@/contexts/page-content';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  console.log('Page TOC:', page.data.toc);

  return (
    <PageContent toc={page.data.toc}>
      <div className="prose prose-lg max-w-none p-8">
        <div className="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-8 shrink-0 bg-linear-to-b blur-xs" />
        <MDX components={components} />
      </div>
      <div className="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-8 shrink-0 bg-linear-to-b blur-xs" />
    </PageContent>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

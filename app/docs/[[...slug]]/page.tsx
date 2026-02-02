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

  return (
    <PageContent toc={page.data.toc}>
      <div className="prose prose-lg max-w-none p-8">
        <MDX components={components} />
      </div>
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

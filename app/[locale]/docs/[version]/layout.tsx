import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DocSidebar } from '@/components/doc-sidebar';
import { DocToc } from '@/components/doc-toc';
import { getSource, getVersionInfo, getAllVersionsInfo } from '@/lib/source';
import { sortPageTree, convertTreeToNav } from '@/lib/sidebar-utils';
import { getVersions, versionExists } from '@/lib/source';
import { notFound } from 'next/navigation';
import { isValidLocale, locales, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';
import type { PageTreeNode, TreeNode } from '@/types/sidebar';

interface DocsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string; version: string }>;
}

export default async function DocsLayout({
  children,
  params,
}: DocsLayoutProps) {
  const { locale, version } = await params;

  // Check if locale is valid
  if (!isValidLocale(locale)) {
    notFound();
  }

  // Check if version exists for this locale
  if (!versionExists(version, locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const source = getSource(version, locale);
  const tree = source.getPageTree();
  const sortedTree = {
    ...tree,
    children: sortPageTree(tree.children as unknown as PageTreeNode[], version),
  };

  // Convert tree to nav items on server (since sidebar-utils is server-only)
  const navItems = convertTreeToNav(
    sortedTree.children as unknown as TreeNode[],
    version,
    locale,
  );

  // Get version metadata for this locale
  const versionsInfo = getAllVersionsInfo(locale);
  const currentVersionInfo = getVersionInfo(version, locale);

  return (
    <div className="flex h-full w-full">
      <SidebarProvider className="flex w-full justify-between">
        <DocSidebar
          navItems={navItems}
          versionsInfo={versionsInfo}
          currentVersionInfo={currentVersionInfo}
          locale={locale as Locale}
          dictionary={dict}
        />

        <SidebarInset
          id="docs-content"
          className="flex-1 overflow-y-auto flex justify-center items-center"
          style={{ scrollPaddingTop: '1.5rem' }}
        >
          <div className="w-full max-w-3xl py-6">{children}</div>
        </SidebarInset>

        <DocToc dictionary={dict} />
      </SidebarProvider>
    </div>
  );
}

export function generateStaticParams() {
  const allParams: { locale: string; version: string }[] = [];

  for (const locale of locales) {
    const versions = getVersions(locale);
    for (const version of versions) {
      allParams.push({ locale, version });
    }
  }

  return allParams;
}

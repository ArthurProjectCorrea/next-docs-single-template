import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DocSidebar } from '@/components/doc-sidebar';
import { DocToc } from '@/components/doc-toc';
import { getSource, getVersionInfo, getAllVersionsInfo } from '@/lib/source';
import { sortPageTree, convertTreeToNav } from '@/lib/sidebar-utils';
import { getVersions, versionExists } from '@/lib/source';
import { notFound } from 'next/navigation';
import type { PageTreeNode, TreeNode } from '@/types/sidebar';

interface DocsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ version: string }>;
}

export default async function DocsLayout({
  children,
  params,
}: DocsLayoutProps) {
  const { version } = await params;

  // Check if version exists
  if (!versionExists(version)) {
    notFound();
  }

  const source = getSource(version);
  const tree = source.getPageTree();
  const sortedTree = {
    ...tree,
    children: sortPageTree(tree.children as unknown as PageTreeNode[], version),
  };

  // Convert tree to nav items on server (since sidebar-utils is server-only)
  const navItems = convertTreeToNav(
    sortedTree.children as unknown as TreeNode[],
    version,
  );

  // Get version metadata
  const versionsInfo = getAllVersionsInfo();
  const currentVersionInfo = getVersionInfo(version);

  return (
    <div className="flex h-full w-full">
      <SidebarProvider className="flex w-full justify-between">
        <DocSidebar
          navItems={navItems}
          versionsInfo={versionsInfo}
          currentVersionInfo={currentVersionInfo}
        />

        <SidebarInset
          id="docs-content"
          className="flex-1 overflow-y-auto flex justify-center items-center"
          style={{ scrollPaddingTop: '1.5rem' }}
        >
          <div className="w-full max-w-3xl px-8 py-8">{children}</div>
        </SidebarInset>

        <DocToc />
      </SidebarProvider>
    </div>
  );
}

export function generateStaticParams() {
  const versions = getVersions();
  return versions.map((version) => ({ version }));
}

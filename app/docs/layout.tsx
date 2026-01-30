import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/doc-sidebar';
import { DocToc } from '@/components/doc-toc';
import { source } from '@/lib/source';

interface PageTreeNode {
  $id?: string;
  $ref?: { file: string };
  children?: PageTreeNode[];
  [key: string]: unknown;
}

function sortTree(nodes: PageTreeNode[]): PageTreeNode[] {
  return nodes
    .map((node) => ({
      ...node,
      children: node.children ? sortTree(node.children) : undefined,
    }))
    .sort((a, b) => {
      const aKey = a.$ref?.file || a.$id || '';
      const bKey = b.$ref?.file || b.$id || '';

      // Prioritize index files
      const aIsIndex =
        aKey.includes('index.mdx') || aKey.endsWith('/index.mdx');
      const bIsIndex =
        bKey.includes('index.mdx') || bKey.endsWith('/index.mdx');

      if (aIsIndex && !bIsIndex) return -1;
      if (!aIsIndex && bIsIndex) return 1;

      return aKey.localeCompare(bKey, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = source.getPageTree();
  const sortedTree = {
    ...tree,
    children: sortTree(tree.children),
  };

  return (
    <div className="container mx-auto flex h-full">
      <SidebarProvider className="flex">
        <AppSidebar tree={sortedTree} />

        <SidebarInset
          id="docs-content"
          className="overflow-y-auto"
          style={{ scrollPaddingTop: 'var(--header-height)' }}
        >
          {children}
        </SidebarInset>

        <DocToc />
      </SidebarProvider>
    </div>
  );
}

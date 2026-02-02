import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/doc-sidebar';
import { DocToc } from '@/components/doc-toc';
import { source } from '@/lib/source';

interface PageTreeNode {
  type: 'page' | 'folder';
  name: string;
  url?: string;
  children?: PageTreeNode[];
  index?: { url: string };
  $id?: string;
  $ref?: { file: string };
  [key: string]: unknown;
}

function sortTree(nodes: PageTreeNode[]): PageTreeNode[] {
  const sorted = nodes
    .map((node) => ({
      ...node,
      children: node.children ? sortTree(node.children) : undefined,
    }))
    .sort((a, b) => {
      const getOrder = (node: PageTreeNode) => {
        if (node.type === 'page' && node.url) {
          const slug =
            node.url === '/docs' ? '' : node.url.replace('/docs/', '');
          const path = slug === '' ? [] : slug.split('/');
          const page = source.getPage(path);
          return page?.data?.order as number | undefined;
        } else if (node.type === 'folder' && node.index) {
          const slug = node.index.url.replace('/docs/', '');
          const path = slug === '' ? [] : slug.split('/');
          const page = source.getPage(path);
          return page?.data?.order as number | undefined;
        }
        return undefined;
      };

      const aOrder = getOrder(a);
      const bOrder = getOrder(b);

      if (aOrder !== undefined && bOrder !== undefined) {
        return aOrder - bOrder;
      }

      if (aOrder !== undefined) return -1;
      if (bOrder !== undefined) return 1;

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
  return sorted;
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = source.getPageTree();
  const sortedTree = {
    ...tree,
    children: sortTree(tree.children as unknown as PageTreeNode[]),
  };

  return (
    <div className="container mx-auto flex h-full">
      <SidebarProvider className="flex">
        <AppSidebar tree={sortedTree} />

        <SidebarInset
          id="docs-content"
          className="overflow-y-auto"
          style={{ scrollPaddingTop: '1.5rem' }}
        >
          {children}
        </SidebarInset>

        <DocToc />
      </SidebarProvider>
    </div>
  );
}

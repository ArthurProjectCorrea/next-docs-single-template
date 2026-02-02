import { getSource } from '@/lib/source';
import { sortPageTree } from '@/lib/sidebar-utils';
import type { PageTreeNode } from '@/types/sidebar';

export interface PaginationLink {
  title: string;
  url: string;
}

export interface PaginationData {
  prev: PaginationLink | null;
  next: PaginationLink | null;
}

/**
 * Flattens a page tree into a linear array of pages
 * Used for navigation between pages
 * Skips folder index pages except for root /docs
 */
function flattenPageTree(nodes: PageTreeNode[]): PaginationLink[] {
  const result: PaginationLink[] = [];

  for (const node of nodes) {
    if (node.type === 'page' && node.url) {
      result.push({
        title: String(node.name) || 'Untitled',
        url: node.url,
      });
    } else if (node.type === 'folder') {
      // Skip folder index pages (except root /docs which is handled as 'page' type)
      // Only add children
      if (node.children) {
        result.push(...flattenPageTree(node.children));
      }
    }
  }

  return result;
}

/**
 * Gets pagination data for a given URL
 * Returns previous and next page links based on sidebar order
 */
export function getPaginationData(
  currentUrl: string,
  version: string = 'latest',
): PaginationData {
  const source = getSource(version);
  const tree = source.getPageTree();
  const sortedTree = sortPageTree(tree.children as unknown as PageTreeNode[]);
  const flatPages = flattenPageTree(sortedTree);

  const currentIndex = flatPages.findIndex((page) => page.url === currentUrl);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? flatPages[currentIndex - 1] : null;
  const next =
    currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : null;

  return { prev, next };
}

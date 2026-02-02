/**
 * Sidebar utilities for documentation navigation
 * This module is server-only as it uses fumadocs source
 */
import 'server-only';

import { getSource } from '@/lib/source';
import type { TreeNode, NavItem, PageTreeNode } from '@/types/sidebar';

/**
 * Custom page data interface for frontmatter fields
 */
interface CustomPageData {
  is_open?: boolean;
  group?: string;
  order?: number;
}

/**
 * Extracts version from a docs URL
 * e.g., /docs/latest/components -> 'latest'
 */
function extractVersionFromUrl(url: string): string {
  const match = url.match(/^\/docs\/([^/]+)/);
  return match ? match[1] : 'latest';
}

/**
 * Converts a tree structure to navigation items
 * Recursively processes nodes and extracts metadata from source
 * This function runs on the server and returns serializable data
 *
 * @param tree - Array of tree nodes from the documentation structure
 * @param version - The documentation version
 * @returns Array of navigation items ready for rendering
 */
export function convertTreeToNav(tree: TreeNode[], version: string): NavItem[] {
  const result: NavItem[] = [];
  const source = getSource(version);

  tree.forEach((node) => {
    let defaultOpen = false;
    let group: string | undefined;

    if (node.type === 'folder' && node.index && node.index.url) {
      // Extract slug from URL, removing /docs/version/ prefix
      const slugMatch = node.index.url.match(/^\/docs\/[^/]+\/?(.*)/);
      const slug = slugMatch ? slugMatch[1] : '';
      const slugs = slug === '' ? [] : slug.split('/');
      const indexPage = source.getPage(slugs);
      const data = indexPage?.data as unknown as CustomPageData | undefined;
      defaultOpen = data?.is_open ?? false;
      group = data?.group;
    } else if (node.type === 'page' && node.url) {
      const slugMatch = node.url.match(/^\/docs\/[^/]+\/?(.*)/);
      const slug = slugMatch ? slugMatch[1] : '';
      const slugs = slug === '' ? [] : slug.split('/');
      const page = source.getPage(slugs);
      const data = page?.data as unknown as CustomPageData | undefined;
      group = data?.group;
    }

    result.push({
      title: String(node.name) || 'Untitled',
      url: node.url,
      items: node.children
        ? convertTreeToNav(node.children, version)
        : undefined,
      defaultOpen,
      id: node.$id,
      group,
    });
  });

  return result;
}

/**
 * Sorts a page tree recursively by order, index priority, and alphabetically
 * Used to organize sidebar navigation items
 *
 * @param nodes - Array of page tree nodes to sort
 * @param version - The documentation version (optional, extracted from first URL if not provided)
 * @returns Sorted array of page tree nodes
 */
export function sortPageTree(
  nodes: PageTreeNode[],
  version?: string,
): PageTreeNode[] {
  // Try to extract version from the first node's URL if not provided
  const extractedVersion =
    version ||
    (() => {
      const firstUrl = nodes[0]?.url || nodes[0]?.index?.url || '';
      return extractVersionFromUrl(firstUrl);
    })();
  const source = getSource(extractedVersion);

  const sorted = nodes
    .map((node) => ({
      ...node,
      children: node.children
        ? sortPageTree(node.children, extractedVersion)
        : undefined,
    }))
    .sort((a, b) => {
      const getOrder = (node: PageTreeNode) => {
        if (node.type === 'page' && node.url) {
          // Extract slug from URL, removing /docs/version/ prefix
          const slugMatch = node.url.match(/^\/docs\/[^/]+\/?(.*)/);
          const slug = slugMatch ? slugMatch[1] : '';
          const path = slug === '' ? [] : slug.split('/');
          const page = source.getPage(path);
          const data = page?.data as unknown as CustomPageData | undefined;
          return data?.order;
        } else if (node.type === 'folder' && node.index) {
          const slugMatch = node.index.url.match(/^\/docs\/[^/]+\/?(.*)/);
          const slug = slugMatch ? slugMatch[1] : '';
          const path = slug === '' ? [] : slug.split('/');
          const page = source.getPage(path);
          const data = page?.data as unknown as CustomPageData | undefined;
          return data?.order;
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

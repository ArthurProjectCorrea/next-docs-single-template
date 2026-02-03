'use client';

import { usePathname } from 'next/navigation';
import { useBreadcrumb } from 'fumadocs-core/breadcrumb';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { Locale } from '@/lib/i18n';
import { useDictionary } from '@/contexts/dictionary-context';

interface PageTreeNode {
  type: 'page' | 'folder';
  name: string;
  url?: string;
  children?: PageTreeNode[];
  index?: { url: string };
}

interface DocBreadcrumbsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tree: any; // PageTree.Root
  pageTitle?: string; // Título da página atual
  locale?: Locale;
}

// Helper para encontrar se um URL é um index (pasta)
function isIndexUrl(url: string | undefined, tree: PageTreeNode): boolean {
  if (!url) return false;

  const findNode = (node: PageTreeNode, targetUrl: string): boolean => {
    if (node.type === 'folder' && node.index?.url === targetUrl) {
      return true;
    }

    if (node.children) {
      return node.children.some((child) => findNode(child, targetUrl));
    }

    return false;
  };

  return findNode(tree, url);
}

export function DocBreadcrumbs({
  tree,
  pageTitle,
  locale,
}: DocBreadcrumbsProps) {
  const pathname = usePathname();
  const items = useBreadcrumb(pathname, tree);
  const { dictionary } = useDictionary();

  // Adicionar Home no início with locale prefix
  const localePrefix = locale ? `/${locale}` : '';
  const homeItem = {
    name: dictionary.navigation.home,
    url: localePrefix || '/',
  };

  // Remover URLs dos itens que são index (pastas)
  const modifiedItems = items.map((item) => {
    const isIndex = isIndexUrl(item.url, tree);
    // Add locale prefix to URLs
    const localizedUrl = item.url ? `${localePrefix}${item.url}` : undefined;
    return isIndex
      ? { ...item, url: undefined }
      : { ...item, url: localizedUrl };
  });

  // Adicionar a página atual ao final se houver pageTitle e não for um index
  const allItems = [homeItem, ...modifiedItems];

  if (pageTitle && !isIndexUrl(pathname, tree)) {
    const lastItem = modifiedItems[modifiedItems.length - 1];
    // Se a última item é diferente da página atual, adiciona a página atual
    if (lastItem?.name !== pageTitle) {
      allItems.push({ name: pageTitle, url: undefined });
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {allItems.map((item, i) => (
          <BreadcrumbItem key={i}>
            {i > 0 && <BreadcrumbSeparator />}
            {item.url ? (
              <BreadcrumbLink asChild>
                <Link href={item.url}>{item.name}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.name}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

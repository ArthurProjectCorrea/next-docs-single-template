'use client';

import { usePathname } from 'next/navigation';
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

interface BreadcrumbEntry {
  name: string;
  url?: string;
}

// Encontra todos os índices de pastas no caminho do pathname
function findBreadcrumbsWithIndexes(
  tree: PageTreeNode,
  pathname: string,
  localePrefix: string,
): BreadcrumbEntry[] {
  const results: BreadcrumbEntry[] = [];
  // Remove locale prefix from pathname for matching
  const cleanPathname = localePrefix
    ? pathname.replace(localePrefix, '')
    : pathname;

  const traverse = (node: PageTreeNode): boolean => {
    // Verifica se o pathname atual começa com a URL deste nó
    if (node.type === 'folder' && node.index?.url) {
      const nodeUrl = node.index.url;
      // O pathname deve começar com a URL do índice ou ser exatamente igual
      if (
        cleanPathname === nodeUrl ||
        cleanPathname.startsWith(nodeUrl + '/')
      ) {
        results.push({
          name: node.name,
          url: `${localePrefix}${nodeUrl}`,
        });

        // Continua buscando nos filhos
        if (node.children) {
          for (const child of node.children) {
            traverse(child);
          }
        }
        return true;
      }
    } else if (node.type === 'page' && node.url) {
      if (cleanPathname === node.url) {
        // Página atual, não adiciona (será adicionada como pageTitle)
        return true;
      }
    }

    // Busca nos filhos
    if (node.children) {
      for (const child of node.children) {
        if (traverse(child)) {
          return true;
        }
      }
    }

    return false;
  };

  // Busca na árvore principal
  if (tree.children) {
    for (const child of tree.children) {
      traverse(child);
    }
  }

  return results;
}

export function DocBreadcrumbs({
  tree,
  pageTitle,
  locale,
}: DocBreadcrumbsProps) {
  const pathname = usePathname();
  const { dictionary } = useDictionary();

  // Adicionar Home no início with locale prefix
  const localePrefix = locale ? `/${locale}` : '';
  const homeItem: BreadcrumbEntry = {
    name: dictionary.navigation.home,
    url: localePrefix || '/',
  };

  // Encontra todos os índices no caminho
  const pathItems = findBreadcrumbsWithIndexes(tree, pathname, localePrefix);

  // Monta a lista final
  const allItems: BreadcrumbEntry[] = [homeItem, ...pathItems];

  // Adiciona a página atual se houver pageTitle
  if (pageTitle) {
    const lastItem = pathItems[pathItems.length - 1];
    // Se a última item é diferente da página atual, adiciona
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

'use client';

import * as React from 'react';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { source } from '@/lib/source';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';

type TreeNode = {
  $id?: string;
  name?: React.ReactNode;
  children?: TreeNode[];
  url?: string;
  type?: string;
  index?: TreeNode;
};

type NavItem = {
  title: string;
  url?: string;
  items?: NavItem[];
  defaultOpen?: boolean;
  id?: string;
  group?: string;
};

function convertTreeToNav(tree: TreeNode[], pathname: string): NavItem[] {
  const result: NavItem[] = [];
  tree.forEach((node) => {
    let defaultOpen = false;
    let group: string | undefined;
    if (node.type === 'folder' && node.index && node.index.url) {
      const slugs =
        node.index.url === '/docs' ? [] : node.index.url.split('/').slice(2);
      const indexPage = source.getPage(slugs);
      defaultOpen = indexPage?.data?.is_open ?? false;
      group = indexPage?.data?.group;
    } else if (node.type === 'page' && node.url) {
      const slugs = node.url === '/docs' ? [] : node.url.split('/').slice(2);
      const page = source.getPage(slugs);
      group = page?.data?.group;
    }
    result.push({
      title: String(node.name) || 'Untitled',
      url: node.url,
      items: node.children
        ? convertTreeToNav(node.children, pathname)
        : undefined,
      defaultOpen,
      id: node.$id,
      group,
    });
  });
  return result;
}

export function AppSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree?: { children: TreeNode[] } }) {
  const pathname = usePathname();
  const navMain: NavItem[] = tree
    ? convertTreeToNav(tree.children, pathname)
    : [];

  const [openStates, setOpenStates] = React.useState<Record<string, boolean>>(
    {},
  );

  React.useEffect(() => {
    // const stored = localStorage.getItem('sidebar-open-states');
    // if (stored) {
    //   setOpenStates(JSON.parse(stored));
    // }
  }, []);

  const toggleOpen = (id: string) => {
    setOpenStates((prev) => {
      const newStates = { ...prev, [id]: !prev[id] };
      // localStorage.setItem('sidebar-open-states', JSON.stringify(newStates));
      return newStates;
    });
  };

  const elements: React.ReactNode[] = [];
  navMain.forEach((item) => {
    if (item.group) {
      elements.push(
        <SidebarGroupLabel key={`label-${item.title}`}>
          {item.group}
        </SidebarGroupLabel>,
      );
    }
    if (item.items?.length) {
      const isOpen =
        openStates[item.id || item.title] ?? item.defaultOpen ?? false;
      elements.push(
        <Collapsible
          key={item.title}
          open={isOpen}
          onOpenChange={() => toggleOpen(item.id || item.title)}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                {item.title}{' '}
                <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    {subItem.url ? (
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.url}
                      >
                        <Link href={subItem.url}>{subItem.title}</Link>
                      </SidebarMenuSubButton>
                    ) : (
                      <SidebarMenuSubButton isActive={false}>
                        {subItem.title}
                      </SidebarMenuSubButton>
                    )}
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>,
      );
    } else {
      elements.push(
        <SidebarMenuItem key={item.title}>
          {item.url ? (
            <SidebarMenuButton asChild isActive={pathname === item.url}>
              <Link href={item.url}>{item.title}</Link>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton isActive={false}>{item.title}</SidebarMenuButton>
          )}
        </SidebarMenuItem>,
      );
    }
  });

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-1rem)] overscroll-none bg-transparent md:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-x-hidden px-2">
        <div className="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-8 shrink-0 bg-linear-to-b blur-xs" />
        <SidebarGroup>
          <SidebarMenu>{elements}</SidebarMenu>
        </SidebarGroup>
        <div className="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t blur-xs" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
